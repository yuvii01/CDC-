const express = require('express');
const fileUpload = require('express-fileupload');
const productController = require('../Controllers/Product');

const productRouter = express.Router();
productRouter.get(
  "/best-seller/:id?",

  (req, res) => {
    const result = new productController().readBest(req.params.id);
    result
      .then((success) => {
        res.send(success);
      })
      .catch((error) => {
        res.send(error);
      });
  }
);
productRouter.get(
    "/:id?",

     (req,res)=>{
        const result = new productController().read(req.params.id , req.query);
        result.then(
            (success)=>{
                res.send(success);
            }
        ).catch((error)=>{
            res.send(error);
        })   
    }
)
productRouter.post(
  "/create",
  fileUpload({
    createParentPath: true,
  }),
  (req, res) => {
        // console.log(req.files.image);

    const result = new productController().create(req.body, req.files.image);
    result
      .then((success) => {
        res.send(success);
      })
      .catch((error) => {
        res.send(error);
      });
  }
);
productRouter.post(
  "edit",
  (req,res)=>{
    const { id, name, price, description, category, colors } = req.body;
    const result = new productController().edit(id, { name, price, description, category, colors });
    result
     .then((success) => {
        res.send(success);
      })
     .catch((error) => {
        res.send(error);
      });
  }
)
productRouter.put("/change-status/:id/:new_status", (req, res) => {
  // console.log(req)
  const result = new productController().changeStatus(
    req.params.id,
    req.params.new_status
  );
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});
productRouter.put("/change-BestSellerStatus/:id/:new_status", (req, res) => {
  // console.log(req)
const result = new productController().changeBestsellerStatus(
  req.params.id,
  req.params.new_status
);
result
  .then((success) => {
    res.send(success);
  })
  .catch((err) => {
    res.send(err);
  });
});

module.exports = productRouter;