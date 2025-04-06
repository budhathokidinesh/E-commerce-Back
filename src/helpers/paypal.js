import paypal from "@paypal/checkout-server-sdk";

paypal.configure({
  mode: "sandbox",
  clint_id:
    "AZGyXu0L1WkL94IOv-m_XKJ5zBGTXnFffGKFlPeSHk2O0ElgNE3mtC8hLtbd9wvbCDJVSvlkCcltcWV5",
  client_secret:
    "ECaMY19sKcaA-cYUp0UArQFCibrxbkIHkEfCtFiT4DeYUVGFcwr9niqfB4iM2inPBp-SjZ9A1eNGYXhN",
});

module.exports = paypal;
