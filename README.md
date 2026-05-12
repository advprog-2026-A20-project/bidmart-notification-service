# bidmart-notification-service

Service ini adalah **notification service** untuk migrasi BidMart dari monolith ke arsitektur microservice multi-repo.

## Status

**Skeleton (bootstrap awal)**.

> Asumsi: pada branch sumber `feat/auction-query-rollout`, implementasi notification dedicated service belum matang/terpisah, jadi repo ini disiapkan sebagai baseline service contract + endpoint minimal.

## Tanggung Jawab Service Boundary

Service ini bertanggung jawab untuk:
- Menyimpan dan menyajikan notifikasi user.
- Menandai notifikasi sebagai sudah dibaca.
- Menyimpan preferensi notifikasi user (email/push/realtime).
- Menjadi konsumen event domain dari service lain (event-driven, bukan tight coupling via direct synchronous call).

Di luar scope service ini:
- Logika bidding command.
- Logika wallet transaction.
- Listing query detail.
- Auth (token issuance/verification authority tetap di auth service).

## Event Contract yang Dikonsumsi

Event yang perlu dikonsumsi service ini:
- `BidPlaced`
- `AuctionExtended`
- `WinnerDetermined`
- `AuctionClosed`
- `AuctionUnsold`
- `WalletBalanceChanged` *(opsional tergantung wallet service mem-publish event)*

Kontrak event ada di `src/events/contracts.js`.

## Endpoint Minimal

- `GET /notifications?userId={userId}`
- `PATCH /notifications/{id}/read`
- `GET /notification-preferences`
- `PUT /notification-preferences`
- `GET /health`

## Menjalankan Lokal

Prasyarat: Node.js 20+.

```bash
npm install
npm run dev
```

Service berjalan default pada port `8086`.

## Menjalankan Test

```bash
npm test
```

## Environment Variable

Salin `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

## Dependency ke Service Lain

Saat ini masih stub/in-memory, namun kontrak integrasi yang direncanakan:
- Message broker (mis. RabbitMQ/Kafka/NATS) untuk consume domain event.
- Auth service untuk validasi identity/context user (gateway-level auth passthrough).
- API Gateway/legacy facade untuk routing endpoint publik.

## Keterbatasan Saat Ini

- Belum ada persistence database (masih in-memory).
- Belum ada integrasi real email provider / push provider / websocket channel.
- Belum ada consumer broker aktual (baru event contract declaration).
- Belum ada retry/dead-letter strategy.

## TODO Berikutnya

1. Tambahkan adapter message broker dan implement handler per event.
2. Tambahkan persistence (PostgreSQL + migration).
3. Tambahkan outbox/inbox pattern untuk idempotency event.
4. Tambahkan provider email (mis. SES/Sendgrid) + push (FCM) + realtime channel.
5. Tambahkan observability: structured logging, metrics, tracing.
6. Tambahkan test integration dan contract test lintas service.
