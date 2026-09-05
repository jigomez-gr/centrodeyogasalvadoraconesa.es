-- ==============================================================================
-- 01. TABLA DE TRAZABILIDAD Y LOGS DE SMS ZADARMA
-- Esquema: public
-- Base de datos: CRM Salvadora Conesa
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.zadarmasmsrespuesta (
    id SERIAL PRIMARY KEY,
    fecharegistro TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    httpstatuscode INTEGER,
    status VARCHAR(50),
    messages INTEGER DEFAULT 1,
    costtotal NUMERIC(10, 4) DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'EUR',
    callerid VARCHAR(50) DEFAULT 'Teamsale',
    numerodestino VARCHAR(64) NOT NULL,
    cost NUMERIC(10, 4) DEFAULT 0,
    costmin NUMERIC(10, 4) DEFAULT 0,
    costmax NUMERIC(10, 4) DEFAULT 0,
    mensaje TEXT,
    parts INTEGER DEFAULT 1,
    rawjsonrespuesta TEXT
);

CREATE INDEX IF NOT EXISTS idx_zadarmasms_destino ON public.zadarmasmsrespuesta (numerodestino);
CREATE INDEX IF NOT EXISTS idx_zadarmasms_fecha ON public.zadarmasmsrespuesta (fecharegistro DESC);
