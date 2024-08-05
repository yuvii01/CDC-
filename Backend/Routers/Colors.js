const { Router } = require("express");
const colorController = require("../Controllers/Colors");

const colorRouter = Router();

colorRouter.get("/:id?", (req, res) => {
  const result = new colorController().read(req.params.id);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});
colorRouter.post("/create", (req, res) => {
  const result = new colorController().create(req.body);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});
colorRouter.delete("/delete/:id", (req, res) => {
  const result = new colorController().delete(req.params.id);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});
colorRouter.post("/edit/:id", (req, res) => {
  const { name, colorr } = req.body;

  const result = new colorController().edit(req.params.id, { name, colorr });
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});
colorRouter.put("/change-status/:id/:new_status", (req, res) => {
  const result = new colorController().changeStatus(
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
colorRouter.put("/change-status/:id/:new_status", (req, res) => {
  const result = new colorController().changeStatus(
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
module.exports = colorRouter;
