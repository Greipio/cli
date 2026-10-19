# Changelog

## 3.0.0 — 2026-03-19

### Breaking

- CLI targets **Greip API v2** (`https://v2.greipapi.com`) with **Bearer** auth after `ggip login`.
- Updated paths for lookup, IP score (`threats`), bulk, country, ASN, BIN, IBAN, email, phone, and POST profanity.
- JSON output reflects v2 `data` field shapes.

### Added

- Live Jest integration tests (`GREIP_TOKEN` required).
