const Cart = require("../Models/cart");
class cartController {
  //function to accomodate changes in qty by button only after user is logged in
  changeQty({ user_id, pId, newQty }) {
    return new Promise(async (resolve, reject) => {
      try {
        await Cart.updateOne({ user_id: user_id, pId: pId }, { qty: newQty });
        resolve({
          msg: "Quantity changed",
          status: 1,
        });
      } catch (err) {
        reject({
          msg: "Error fetching data",
          status: 0,
          error: err.message,
        });
      }
    });
  }
  stateToCart(user_id, { state_cart }) {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log(user_id , {state_cart});
        for (let sc of state_cart) {
          //particular user ki cart se data dhundna
          const existingCart = await Cart.findOne({
            pId: sc.pId,
            user_id: user_id,
          });
          if (existingCart) {
            await Cart.updateOne(
              { _id: existingCart._id },
              {
                qty: sc.qty + existingCart.qty,
              }
            );
          } else {
            await Cart({
              pId: sc.pId,
              qty: sc.qty,
              user_id: user_id,
            }).save();
          }
        }
        //populate so that toal price can be calculated as we can get whole info of the product after that
        const userCart = await Cart.find({ user_id: user_id }).populate("pId");
        resolve({
          msg: "Data added to cart",
          status: 1,
          userCart,
        });
      } catch (err) {
        reject({
          msg: "Error fetching data",
          status: 0,
          error: err.message,
        });
      }
    });
  }
  addToCart({ user_id, pId }) {
    return new Promise(async (resolve, reject) => {
      try {
        const currentCart = await Cart.findOne({ user_id: user_id, pId: pId });
        if (currentCart) {
          await Cart.updateOne(
            { _id: currentCart._id },
            {
              qty: currentCart.qty + 1,
            }
          );
        } else {
          const cart = new Cart({
            pId: pId,
            qty: 1,
            user_id: user_id,
          })
            .save()
            .then(() => {
              resolve({
                msg: "Product added to cart",
                status: 1,
              });
            })
            .catch(() => {
              reject({
                msg: "Error adding product to cart",
                status: 0,
              });
            });
        }
      } catch (err) {
        reject({
          msg: "Error fetching data",
          status: 0,
          error: err.message,
        });
      }
    });
  }

  removeFromCart({pId,user_id}) {
    return new Promise(async (resolve, reject) => {
      try {
        await Cart.deleteOne({ user_id: user_id, pId: pId });
        resolve({
          msg: "deleted",
          status: 1,
        });
      } catch (err) {
        reject({
          msg: "Error fetching data",
          status: 0,
          error: err.message,
        });
      }
    });
  }
}
module.exports = cartController;
