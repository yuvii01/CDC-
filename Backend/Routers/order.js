const { Router } = require("express");
const OrderController = require("../Controllers/order");
const AdminAuth = require("../middleware/adminAuth");

const OrderRouter = Router();

OrderRouter.post("/place-order", (req, res) => {
  const result = new OrderController().placeOrder(req.body);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
});

OrderRouter.post("/payment-success", (req, res) => {
  const result = new OrderController().paymentSuccess(req.body);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
});
OrderRouter.post("/payment-failed", (req, res) => {
  const result = new OrderController().paymentFailed(req.body);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
});

OrderRouter.post("/get-orders", (req, res) => {
  const result = new OrderController().getOrders(req.query);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = OrderRouter;
 