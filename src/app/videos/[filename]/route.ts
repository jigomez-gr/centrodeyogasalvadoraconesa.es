import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * Streaming HTTP 206 Partial Content for video/document playback.
 * Serves media from external storage directory (MEDIA_STORAGE_ROOT)
 * and resolves physical path via PostgreSQL (media_assets) or direct filename lookup.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    if (!filename) {
      return new NextResponse("Filename is required", { status: 400 });
    }

    const storageRoot =
      process.env.MEDIA_STORAGE_ROOT || "d:/tmp/antigraviti/salvadora/media_base";
    const videosDir =
      process.env.MEDIA_VIDEOS_DIR || path.join(storageRoot, "videos");
    const docsDir =
      process.env.MEDIA_DOCUMENTS_DIR || path.join(storageRoot, "documentos");

    let physicalPath = "";
    let mimeType = "video/mp4";

    // 1. Try resolving via PostgreSQL ccmfalla.media_assets
    try {
      const assetKey = filename.replace(/\.[^/.]+$/, "");
      const rows: any = await prisma.$queryRaw`
        SELECT physical_path, mime_type 
        FROM ccmfalla.media_assets 
        WHERE key = ${assetKey} OR public_url LIKE ${"%" + filename} OR physical_path LIKE ${"%" + filename}
        LIMIT 1
      `;
      if (rows && rows.length > 0) {
        physicalPath = rows[0].physical_path;
        mimeType = rows[0].mime_type || mimeType;
      }
    } catch (dbErr) {
      // Non-blocking fallback to direct filesystem
    }

    // 2. Direct filesystem fallback if not in DB or DB path not found
    if (!physicalPath || !fs.existsSync(physicalPath)) {
      const possibleVideo = path.join(videosDir, filename);
      const possibleDoc = path.join(docsDir, filename);

      if (fs.existsSync(possibleVideo)) {
        physicalPath = possibleVideo;
        mimeType = filename.endsWith(".mp4") ? "video/mp4" : "application/octet-stream";
      } else if (fs.existsSync(possibleDoc)) {
        physicalPath = possibleDoc;
        mimeType = filename.endsWith(".pdf") ? "application/pdf" : "text/plain";
      }
    }

    if (!physicalPath || !fs.existsSync(physicalPath)) {
      return new NextResponse("Media asset not found", { status: 404 });
    }

    const stat = fs.statSync(physicalPath);
    const fileSize = stat.size;
    const range = req.headers.get("range");

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize) {
        return new NextResponse("Requested range not satisfiable", {
          status: 416,
          headers: {
            "Content-Range": `bytes */${fileSize}`,
          },
        });
      }

      const chunkSize = end - start + 1;
      const fileStream = fs.createReadStream(physicalPath, { start, end });

      const headers = new Headers({
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize.toString(),
        "Content-Type": mimeType,
      });

      return new NextResponse(fileStream as any, {
        status: 206,
        headers,
      });
    }

    const fileStream = fs.createReadStream(physicalPath);
    const headers = new Headers({
      "Content-Length": fileSize.toString(),
      "Content-Type": mimeType,
      "Accept-Ranges": "bytes",
    });

    return new NextResponse(fileStream as any, {
      status: 200,
      headers,
    });
  } catch (err: any) {
    console.error("Error streaming media:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
