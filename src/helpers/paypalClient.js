// config/paypalClient.js
import paypal from "@paypal/checkout-server-sdk";

// 1. Environment setup
function environment() {
  const clientId =
    "AZGyXu0L1WkL94IOv-m_XKJ5zBGTXnFffGKFlPeSHk2O0ElgNE3mtC8hLtbd9wvbCDJVSvlkCcltcWV5";
  const clientSecret =
    "ECaMY19sKcaA-cYUp0UArQFCibrxbkIHkEfCtFiT4DeYUVGFcwr9niqfB4iM2inPBp-SjZ9A1eNGYXhN";

  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
  // For live: return new paypal.core.LiveEnvironment(clientId, clientSecret);
}

// 2. PayPal client setup
function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

export default client();
