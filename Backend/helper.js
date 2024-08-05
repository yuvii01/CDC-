const Cryptr = require("cryptr");
// const cryptr = new Cryptr(process.env.SECRET_KEY);
const cryptr = new Cryptr("asheshjyoti@2004");
const secret_key = "asheshjyoti@2004";
const jwt = require("jsonwebtoken");
//npm i uuid install in backend to help with token creation
//using uuid is statefull authentication token thereby its value resets when the server is restarted
const encryptPassowrd = (password) => {
  return cryptr.encrypt(password);
};
const decryptPassowrd = (password) => {
  return cryptr.decrypt(password);
};

const getToken = (user_data) => {
    //userdata aur secret key dene pe ye token banake deta hai 
  const token = jwt.sign(user_data, secret_key,{expiresIn:"2h"});
  return token;
};

const verifyToken = (token) => {
  try {
    //secret key aur token dene pe ye data banake de deta hai
    //try catch lagaya jis se agar format change bhi hoga entered key to bhi runtime erro nahi aegi
    // console.log(jwt.verify(token, secret_key));
    return jwt.verify(token, secret_key);
  } catch (err) {
    return false; // Throw error when token verification fails
  }
};

module.exports = {
  encryptPassowrd,
  decryptPassowrd,
  getToken,
  verifyToken,
};
//stateful auth -> data kahi save karna hi padega , for eg ek register me sabke token number note karna , par agar register gum ho gaya to sab data gaya 

//stateless auth -> algo ke through token encrypt aur decrypt hota rahega , backend ka koi role nahi hai 
//jwt library ke help se implement hoga 
//npm i jsonwebtoken backend me
