# BidMart Notification Service

Repository ini adalah target bounded context untuk notification BidMart. Service ini akan menjadi consumer event dari domain lain dan mengirim notifikasi tanpa mengganggu transaksi utama.

## Service Boundary

Notification service akan menangani:

- Consume event domain seperti `BidPlaced`, `AuctionClosed`, `WinnerDetermined`, dan `AuctionUnsold`.
- Mengirim email atau notification internal.
- Menyimpan status delivery jika dibutuhkan.

Notification service tidak boleh menjadi bagian dari transaksi sinkron place bid atau close auction.

## Status Migrasi

Saat ini belum ada notification delivery terpisah di monolith. Repo ini menyediakan scaffold dan boundary awal.

## Run Lokal

```bash
./gradlew bootRun
```

Default port:

```text
8086
```

## Test

```bash
./gradlew test
```

## Dependency Service Lain

- Bidding command service mem-publish event auction/bid.
- Wallet/auth/listing dapat mem-publish event domain di fase berikutnya.
- Gateway tidak perlu memanggil notification service untuk request normal.
