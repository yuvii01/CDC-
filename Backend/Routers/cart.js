const express = require("express");
const cartRouter = express.Router();
const cartController = require("../Controllers/cart");

cartRouter.post("/state-to-cart/:user_id", (req, res) => {
  // console.log(req.body)
  const result = new cartController().stateToCart(req.params.user_id, req.body);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});
cartRouter.put("/change-quantity", (req, res) => {
  const result = new cartController().changeQty(req.body);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});
cartRouter.post(
  "/add-to-cart",
  (req,res)=>{
      const result = new cartController().addToCart(req.body);
      result
        .then((success) => {
          res.send(success);
        })
        .catch((err) => {
          res.send(err);
        });
  },
)
  cartRouter.post(
  "/remove-from-cart",
  (req,res)=>{
      const result = new cartController().removeFromCart(req.body);
      result
        .then((success) => {
          res.send(success);
        })
        .catch((err) => {
          res.send(err);
        });
  }
)
module.exports = cartRouter;
