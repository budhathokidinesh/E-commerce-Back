// config/paypalClient.js
import paypal from "@paypal/checkout-server-sdk";

// 1. Environment setup
function environment() {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
  // For live: return new paypal.core.LiveEnvironment(clientId, clientSecret);
}

// 2. PayPal client setup
function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

export default client();
