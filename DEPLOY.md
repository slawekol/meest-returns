# Meest Returns — uruchomienie i deploy (MVP)

## Co się zmieniło (lipiec 2026)
- **Backend API działa end-to-end**: lookup zamówienia → utworzenie zwrotu + QR →
  weryfikacja w punkcie → przyjęcie do kontenera → **natychmiastowy refund** (webhook,
  depozyt merchanta, prowizja 1,5%) → tracking na żywo.
- **Wszystkie 3 frontendy podpięte do API** (koniec z danymi na sztywno):
  consumer (pełny flow + prawdziwy QR), pudo (skan/kod ręczny → weryfikacja →
  refund → kontener), merchant (pulpit + lista zwrotów odświeżane co 5 s).
- **Prisma 6 w trybie bez silników binarnych** (driver adapter `pg`) — działa
  wszędzie identycznie, w tym na Railway.
- Migracja SQL: `packages/db/prisma/migrations/20260707000000_init/`
- Seed danych demo: `packages/db/prisma/seed.ts` (Modivo pilot + Vestiro,
  4 punkty PUDO Warszawa/Wrocław, 46 historycznych zwrotów).

## Krok 0 — na Twoim Macu (jednorazowo)
```bash
cd ~/meest-returns
pnpm install          # odtworzy node_modules dla macOS
```

## Krok 1 — baza (Supabase)
1. Utwórz projekt na supabase.com (region EU).
2. Skopiuj z Settings → Database connection string (URI, port 5432 = direct
   oraz pooler 6543 = pooled).
3. Utwórz plik `.env` w katalogu głównym repo (skopiuj z `.env.example`)
   i wklej oba adresy:
   - `DATABASE_URL` = pooler (6543, pgbouncer)
   - `DIRECT_URL`   = direct (5432)
4. Migracja + seed:
```bash
cd ~/meest-returns
cp .env packages/db/.env
cp .env apps/api/.env
pnpm --filter @meest/db prisma:generate
pnpm --filter @meest/db exec prisma migrate deploy
pnpm --filter @meest/db db:seed
```

## Krok 2 — API na Railway
1. railway.app → New Project → Deploy from GitHub → wybierz `slawekol/meest-returns`.
2. Settings → Root Directory: `apps/api`.
3. Build Command: `cd ../.. && pnpm install && pnpm --filter @meest/db prisma:generate && pnpm --filter @meest/api build`
4. Start Command: `node dist/index.js`
5. Variables: `DATABASE_URL` (pooler z Supabase), `JWT_SECRET` (długi losowy string), `PORT` zostaw Railway.
6. Po deployu skopiuj publiczny URL, np. `https://meest-returns-api.up.railway.app`.
7. Test: otwórz `https://<railway-url>/health` — ma zwrócić `{"status":"ok"}`.

## Krok 3 — frontendy na Vercel (już podpięte projekty)
W każdym z trzech projektów Vercel (consumer / pudo / merchant):
1. Settings → Environment Variables → dodaj:
   - `NEXT_PUBLIC_API_URL` = URL API z Railway (bez ukośnika na końcu)
   - (pudo, opcjonalnie) `NEXT_PUBLIC_PUDO_CODE` = `MB-WAW-001`
2. Redeploy (Deployments → ⋯ → Redeploy).

## Krok 4 — test demo (scenariusz na pitch)
1. **Consumer** → formularz jest wstępnie wypełniony (MOD-2026-0042893) →
   Znajdź zamówienie → wybierz produkty → powód → punkt → wygeneruj QR.
2. **PUDO** (`/scan`) → "Symuluj wykrycie kodu" (znajdzie ten zwrot) →
   odhacz 3 checkboxy → Przyjmij paczkę → ekran "Zwrot przyjęty, refund wypłacony".
3. **Merchant** (`/dashboard`) → w ciągu 5 sekund zwrot pojawia się w tabeli
   ze statusem "Oddany w punkcie" i zielonym refundem; saldo depozytu spada.
4. **Consumer** (`/tracking`) → status "Środki zwrócone" na żywo.

## Dane demo
- Zamówienia: `MOD-2026-0042893` (anna.kowalska@example.com),
  `MOD-2026-0051277` (jan.nowak@example.com), `VST-2026-0007731` (maria.wisniewska@example.com).
- Kody punktów: MB-WAW-001, MB-WAW-002, MB-WRO-001, MB-WRO-002.
- Merchant API key (nagłówek `x-api-key`): `demo-modivo-key` (bez nagłówka = Modivo).

## Architektura refundu (dla pytań inwestora)
- Polityka merchanta `INSTANT_AT_PUDO`: refund w momencie przyjęcia w punkcie
  (90%+ przypadków), finansowany z depozytu merchanta + prowizja 1,5% (wariant faktoringowy).
- Klient oznaczony (fraud flag): refund wstrzymany do weryfikacji w hubie (24–48 h).
- Każde przyjęcie: wpis WebhookDelivery (event `return.refunded`) + transakcje
  depozytowe (REFUND_PAYOUT + FEE) + pełny audit trail w ReturnEvent.
