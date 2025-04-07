import paypal from "@paypal/checkout-server-sdk";
import paypalClient from "../../helpers/paypalClient.js";
import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";
export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "AUD",
            value: totalAmount.toFixed(2),
          },
        },
      ],
      application_context: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
    });

    const order = await paypalClient.execute(request);

    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paypalOrderId: order.result.id,
    });

    await newlyCreatedOrder.save();

    const approvalURL = order.result.links.find(
      (link) => link.rel === "approve"
    ).href;

    res.status(201).json({
      success: true,
      approvalURL,
      orderId: newlyCreatedOrder._id,
    });
  } catch (error) {
    console.error("PayPal order creation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create PayPal order",
    });
  }
};

export const capturePayment = async (req, res) => {
  try {
    const { token, payerId, orderId } = req.body;
    //this is for capturing the paypal payment
    const request = new paypal.orders.OrdersCaptureRequest(token);
    request.requestBody({});
    const capture = await paypalClient.execute(request);
    //this is for finding and update order in DB
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }
    //this is for updating the detail
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.payerId = payerId;
    order.paypalCaptureId =
      capture.result?.purchase_units?.[0]?.payments?.captures?.[0].id || null;
    const getCartId = order.cartId;

    //this is for clearing the cart after saved
    if (order.cartId) {
      await Cart.findByIdAndDelete(order.cartId);
    }
    //this is for saving
    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment captured and Order confirmed",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to capture payment",
    });
  }
};
