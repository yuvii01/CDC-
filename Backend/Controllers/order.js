  const Order = require("../Models/order");
const Cart = require("../Models/cart");
const Razorpay = require("razorpay");
//signature verification karne ke liye inbuilt package
const crypto = require("crypto");
const Transaction = require("../Models/transaction");

var instance = new Razorpay({
  key_id: "rzp_test_2qgRJ9mQue9a9P",
  key_secret: "64ytPROqX2g3RA9M1bwFeo26",
});
class OrderController {
  // Function to generate HMAC SHA256 signature
  //razorpay orderid id, payment id aur signature ata hai op me
  verifySignature(order_id, razorpay_payment_id, razorpay_signature) {
    const secret = "64ytPROqX2g3RA9M1bwFeo26";
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(`${order_id}|${razorpay_payment_id}`)
      .digest("hex");
    // console.log(generated_signature);
    return generated_signature === razorpay_signature;
  }
  placeOrder({
    user_id,
    product_details,
    order_total,
    shipping_details,
    payment_mode,
  }) {
    return new Promise((resolve, reject) => {
      try {
        const order = new Order({
          user_id,
          product_details,
          order_total,
          shipping_details,
          payment_mode,
        });
        order
          .save()
          .then(async (success) => {
            // console.log(success.data);
            if (payment_mode == 2) {
              //order creation on razorpay server
              // Define the options object
              const options = {
                amount: order_total * 100, // Amount in smallest currency unit
                currency: "INR",
                receipt: order._id, // Unique identifier for the order
              };

              // Creating the order
              instance.orders.create(options, async (err, razor_order) => {
                if (err) {
                  reject({
                    msg: "Error creating order on Razorpay server",
                    status: 0,
                    error: err.message,
                  });
                } else {
                  console.log("Order created successfully:", order);
                  await Cart.deleteMany({ user_id: user_id });
                  resolve({
                    msg: "Order placed successfully",
                    status: 1,
                    razor_order,
                    order_id: order._id,
                  });
                }
              });
            } else {
              await Cart.deleteMany({ user_id: user_id });
              resolve({
                order_id: order._id,
                msg: "Order placed successfully",
                status: 1,
              });
            }
          })
          .catch((err) => {
            reject({
              msg: "Error while placing order",
              status: 0,
              error: err.message,
            });
          });
      } catch (err) {
        reject({
          msg: "error while creating order",
          status: 0,
          error: err.message,
        });
      }
    });
  }
  paymentSuccess({ order_id, razorpay_response = null }) {
    return new Promise(async (res, rej) => {
      try {
        const verified = this.verifySignature(
          razorpay_response.razorpay_order_id,
          razorpay_response.razorpay_payment_id,
          razorpay_response.razorpay_signature
        );
        if (verified) {
          const orderDetails = await Order.findById(order_id);
          const transaction = new Transaction({
            orderId: order_id,
            userId: orderDetails.user_id,
            amount: orderDetails.order_total,
            type: orderDetails.payment_mode,
            paymentStatus: 1,
            razorpayResponse: razorpay_response,
          });
          transaction
            .save()
            .then(async () => {
              await Order.updateOne(
                { _id: order_id },
                {
                  transaction_id: transaction._id,
                  order_status: 2,
                }
              );
              res({
                msg: "Order placed",
                order_id,
                status: 1,
              });
            })
            .catch(() => {
              res({
                msg: "Unable to place order",
                status: 0,
              });
            });
        } else {
          rej({
            msg: "Invalid payment signature",
            status: 0,
          });
        }
      } catch (err) {
        rej({
          msg: "Internal server error",
          status: 0,
        });
      }
    });
  }
  paymentFailed({ order_id, razorpay_response }) {
        return new Promise(
            async (res, rej) => {
                try {
                    const orderDetails = await Order.findById(order_id);
                    const transaction = new Transaction({
                        orderId: order_id,
                        userId: orderDetails.user_id,
                        amount: orderDetails.order_total,
                        type: orderDetails.payment_mode,
                        paymentStatus: 0,
                        razorpayResponse: razorpay_response
                    })
                    transaction.save()
                        .then(
                            () => {
                                res({
                                    msg: "Order payment failed",
                                    order_id,
                                    status: 0
                                })
                            }
                        ).catch(
                            () => {
                                res({
                                    msg: "Unable to place order",
                                    status: 0
                                })
                            }
                        )
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }


    getOrders(url_query) {
      // console.log(url_query)
        return new Promise(
            async (res, rej) => {
                try {
                    const query = {};
                    if (url_query.order_id != "null" && url_query.order_id != null) {
                        query._id = url_query.order_id;
                    }
                    if (url_query.user_id != "null" && url_query.user_id != null) {
                        query.user_id = url_query.user_id;
                    }
                    if (url_query.start_date && url_query.end_date) {
                        query.createdAt = {
                            $gte: new Date(new Date(url_query.start_date).setHours(0, 0, 0)),
                            $lt: new Date(new Date(url_query.end_date).setHours(23, 59, 59))
                        }
                    }
                    const orders = await Order.find(query).populate(['transaction_id', 'user_id']);
                    res({
                        msg: "Orders",
                        total: orders.length,
                        status: 1,
                        orders
                    })
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
}

module.exports = OrderController;
