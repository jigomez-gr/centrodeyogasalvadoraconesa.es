# Centro de Yoga Salvadora Conesa auth.md

Authentication and authorization specifications for AI agents interacting with Centro de Yoga y Bienestar Salvadora Conesa APIs and services.

## Agent Audience & Access Policy
Public read access is granted for discovering schedules, class descriptions, sound bath dates, and studio information without requiring credentials.
Transactional operations (such as session reservations or CRM lead synchronization) use API key or OTP verification.

## Endpoints
- **Public Discovery**: `/.well-known/agent-skills/index.json`, `/.well-known/mcp/server-card.json`, `/.well-known/api-catalog`
- **Booking Submission**: `POST /api/reservas`
- **SMS & OTP Verification**: `POST /api/auth/otp/send` and `POST /api/auth/otp/verify`
- **Voice Agent Handshake**: `POST /api/vapi/call`

## Credentials & Token Usage
When interacting with secured endpoints, pass the authorization bearer token or API key in the standard `Authorization: Bearer <token>` header.
