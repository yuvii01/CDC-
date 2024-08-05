const { encryptPassowrd, decryptPassowrd, getToken } = require("../helper");
const User = require("../Models/user");

class userController {
  register(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
          reject({
            msg: "Email already registered",
            status: 0,
          });
        } else {
          const user = new User({
            name: data.name,
            email: data.email,
            password: encryptPassowrd(data.password),
          });
          user
            .save()
            .then((success) => {
              resolve({
                msg: "User registered successfully",
                status: 1,
                user,
              });
            })
            .catch((err) => {
              reject({
                msg: "Error while registering user",
                status: 0,
                error: err.message,
              });
            });
        }
      } catch (err) {
        reject({
          msg: "Error registering user",
          status: 0,
          error: err.message,
        });
      }
    });
  }
  login(data) {
    return new Promise(async (res, rej) => {
      try {
        const user = await User.findOne({ email: data.email });
        if (user) {
          if (decryptPassowrd(user.password) == data.password) {
            const token = getToken(user.toObject());
            res({
              msg: "Login successful",
              status: 1,
              user,
              token,
            });
          } else {
            rej({
              msg: "Wrong password",
              status: 0,
            });
          }
        } else {
          rej({
            msg: "Invalid email",
            status: 0,
          });
        }
      } catch (err) {
        console.log(err.message);
        rej({
          msg: "Internal server error",
          status: 0,
        });
      }
    });
  }
  edit(name,email,userId) {
    return new Promise(async (resolve, reject) => {
      console.log(name,email,userId);
      try {
        resolve(data.name);
        // const user = await User.findById(userId);
        // if (user) {
        //   user.name = name;
        //   user.email = email;
        //   user.image = image;
        //   await user.save();
        //   res.status(200).json({ message: "User updated successfully" });
        // }
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
module.exports = userController;
