"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Maximize, Play, Pause } from "lucide-react";

export default function HeroMedia() {
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true); // video playing
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Sync state with video muting
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = isMuted;
    }, [isMuted]);

    // Ambient dynamic backdrop that projects subtle blurred colors on widescreen displays
    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        let animId: number;
        let lastUpdate = 0;

        const renderAmbient = (time: number) => {
            // Update every ~100ms (10fps is plenty for a blurred ambient glow, negligible CPU)
            if (time - lastUpdate > 100) {
                if (!video.paused && !video.ended && video.readyState >= 2) {
                    try {
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    } catch {
                        // Ignore potential initial frame errors
                    }
                }
                lastUpdate = time;
            }
            animId = requestAnimationFrame(renderAmbient);
        };

        animId = requestAnimationFrame(renderAmbient);
        return () => cancelAnimationFrame(animId);
    }, []);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleFullscreen = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if ((video as any).webkitRequestFullscreen) {
            (video as any).webkitRequestFullscreen();
        } else if ((video as any).msRequestFullscreen) {
            (video as any).msRequestFullscreen();
        }
    };

    const togglePlayVideo = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
            setIsPlaying(false);
        } else {
            video.play().catch(() => { });
            setIsPlaying(true);
        }
    };

    return (
        <div className="relative w-full aspect-video sm:aspect-[20/9] rounded-md overflow-hidden bg-[#181214] border border-stone-200 group">
            {/* Ambient Dynamic Background for Widescreen viewports (sm and up) */}
            <canvas
                ref={canvasRef}
                width={32}
                height={18}
                aria-hidden="true"
                className="hidden sm:block absolute inset-0 w-full h-full object-cover blur-3xl scale-125 opacity-70 pointer-events-none transition-opacity duration-700 select-none"
            />

            {/* Subtle darkening veil on the ambient glow for cinematic contrast */}
            <div className="hidden sm:block absolute inset-0 bg-black/20 pointer-events-none" />

            {/* Crisp Main Video: 100% complete, uncropped */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="relative w-full h-full object-contain select-none z-10"
            >
                <source src="/videos/hero.mp4" type="video/mp4" />
            </video>

            {/* Controls Overlay */}
            <div className="absolute inset-0 bg-transparent flex flex-col justify-between p-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                {/* Top Control Bar */}
                <div className="flex items-center justify-between w-full pointer-events-auto">
                    {/* Audio toggle button */}
                    <button
                        onClick={toggleMute}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#800020]/90 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-[#800020] shadow-md transition duration-200"
                        title={isMuted ? "Activar música de fondo" : "Desactivar música de fondo"}
                    >
                        {isMuted ? (
                            <>
                                <VolumeX className="w-3.5 h-3.5" />
                                <span>Música Desactivada</span>
                            </>
                        ) : (
                            <>
                                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                                <span>Música Activada</span>
                            </>
                        )}
                    </button>

                    {/* Fullscreen button (mobile specific but useful, shows on all screens or custom md:hidden) */}
                    <button
                        onClick={handleFullscreen}
                        className="p-2 rounded-full bg-white/95 text-[#1C1C1C] hover:bg-[#800020] hover:text-white shadow-md transition duration-200"
                        title="Pantalla Completa"
                    >
                        <Maximize className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Center Play/Pause Indicator (Optional but premium) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <button
                        onClick={togglePlayVideo}
                        className="pointer-events-auto p-4 rounded-full bg-black/45 text-white/90 hover:bg-[#800020]/80 transition opacity-0 group-hover:opacity-100 duration-200"
                    >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
