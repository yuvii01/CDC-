const Color = require("../Models/Colors");

class colorController {
  read(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let colors = [];
        if (id) {
          colors = await Color.findById(id);
        } else {
          colors = await Color.find();
        }
        resolve({
          msg: "Data fetched successfully",
          status: 1,
          data: colors,
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

  create(data) {
    return new Promise((resolve, reject) => {
      try {
        const colora = new Color({
          name: data.name,
          code: data.colorr,
        });
        colora
          .save()
          .then(() => {
            resolve({
              msg: "Color added successfully",
              status: 1,
              data: colora,
            });
          })
          .catch((err) => {
            reject({
              msg: "Error adding color",
              status: 0,
              error: err.message,
            });
          });
      } catch (err) {
        reject({
          msg: "Error sending data",
          status: 0,
          error: err.message,
        });
      }
    });
  }
  update(id, data) {
    return new Promise((resolve, reject) => {
      try {
      } catch (err) {
        reject({
          msg: "Error fetching data",
          status: 0,
          error: err.message,
        });
      }
    });
  }
  edit(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(data);
        let color = await Color.findByIdAndUpdate(
          id,
          {
            name: data.name,
            colorr: data.colorr,
          },
          { new: true }
        ) 
          .then((success) => {
            resolve({
              msg: "Color updated successfully",
              status: 1,
              data: { name: success.name, colorr: success.colorr },
            });
          })
          .catch((err) => {
            reject({
              msg: "Error updating color",
              status: 0,
              error: err.message,
            });
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
  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await Color.findByIdAndDelete(id)
          .then(
            resolve({
              msg: "Category deleted",
              status: 1,
            })
          )
          .catch((error) => {
            reject({
              msg: "Error while deleting category",
              status: 0,
              error: error.message,
            });
          });
      } catch (error) {
        reject({
          msg: "internal error while deleting category",
          status: 0,
          error: err.message,
        });
      }
    });
  }

  changeStatus(id, new_status) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await Color.updateOne({ _id: id }, { status: new_status })
          .then(
            resolve({
              msg: "Status changed",
              status: 1,
            })
          )
          .catch((error) => {
            reject({
              msg: "Error while changing status",
              status: 0,
              error: error.message,
            });
          });
      } catch (error) {
        reject({
          msg: "internal error while changing status",
          status: 0,
          error: err.message,
        });
      }
    });
  }
}
module.exports = colorController;
