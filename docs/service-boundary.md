# Notification Service Boundary

## Tanggung Jawab

- Consume event domain.
- Kirim email atau notification internal secara async.
- Simpan audit delivery bila diperlukan.

## Tidak Ditangani

- Place bid.
- Wallet settlement.
- Auth token.
- Query auction/listing.

## Event Awal

- `BidPlaced`
- `AuctionExtended`
- `AuctionClosed`
- `WinnerDetermined`
- `AuctionUnsold`
