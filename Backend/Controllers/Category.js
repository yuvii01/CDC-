const Category = require("../Models/Category");
class categoryController {
  create(data, image) {
    return new Promise((resolve, reject) => {
      try {
        const imageName =
          new Date().getTime() + Math.random() * 10 + image.name;
        const destination = "./Public/Images/Category/" + imageName;
        image.mv(destination, (err) => {
          if (err) {
            reject({
              msg: "Error while uploading image",
              status: 0,
              error: err.message,
            });
          } else {
            const category = new Category({
              name: data.name,
              slug: data.slug,
              image: imageName,
            });
            category
              .save()
              .then((success) => {
                resolve({
                  msg: "Category added",
                  status: 1,
                });
              })
              .catch((err) => {
                reject({
                  msg: "Error while adding category",
                  status: 0,
                  error: err.message,
                });
              });
          }
        });
      } catch (error) {
        reject({
          msg: "internal error while adding category",
          status: 0,
          error: err.message,
        });
      }
    });
  }
  read(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = "";
        if (id) {
          data = await Category.findById(id);
        } else {
          data = await Category.find();
        }
        resolve({
          category: data,
          status: 1,
          imageBaseUrl: "/Images/Category/",
        });
      } catch (error) {
        reject({
          msg: "internal error while fetching category",
          status: 0,
          error: err.message,
        });
      }
    });
  }
  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await Category.findByIdAndDelete(id)
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
        let data = await Category.updateOne({ _id: id }, { status: new_status })
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
    edit(id, data) {
      return new Promise(async (resolve, reject) => {
        try {
          let color = await Category.findByIdAndUpdate(id, data, { status: new_status})
            .then((success) => {
              resolve({
                msg: "Color updated successfully",
                status: 1,
                data: color,
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
  }
module.exports = categoryController;
