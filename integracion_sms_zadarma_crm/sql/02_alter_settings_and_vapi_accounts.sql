-- ==============================================================================
-- 02. PARAMETRIZACIÓN DE CLAVES API ZADARMA EN EL CRM
-- Añadir campos a la configuración del CRM (vapi_accounts o app_settings)
-- ==============================================================================

-- Opción A: Guardar claves en vapi_accounts
ALTER TABLE public.vapi_accounts 
ADD COLUMN IF NOT EXISTS "zadarmaApiKey" VARCHAR(100) DEFAULT '45dc42d6f22439899024',
ADD COLUMN IF NOT EXISTS "zadarmaApiSecret" VARCHAR(100) DEFAULT '34061190a934a453aa99',
ADD COLUMN IF NOT EXISTS "zadarmaSmsSender" VARCHAR(50) DEFAULT 'Teamsale',
ADD COLUMN IF NOT EXISTS "smsAutoConfirmation" BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS "smsConfirmationTemplate" TEXT DEFAULT '¡Hola! Tu plaza en Salvadora Conesa está confirmada. Si deseas recibir el recordatorio por email, respóndenos con tu correo.';

-- Opción B: Guardar claves en app_settings
ALTER TABLE public.app_settings
ADD COLUMN IF NOT EXISTS "zadarmaApiKey" VARCHAR(100),
ADD COLUMN IF NOT EXISTS "zadarmaApiSecret" VARCHAR(100),
ADD COLUMN IF NOT EXISTS "zadarmaSmsSender" VARCHAR(50) DEFAULT 'Teamsale',
ADD COLUMN IF NOT EXISTS "smsAutoConfirmation" BOOLEAN DEFAULT true;
