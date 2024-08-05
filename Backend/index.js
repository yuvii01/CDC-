const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const categoryRouter = require('./Routers/Category');
const colorRouter = require('./Routers/Colors');
const productRouter = require('./Routers/Product');
const userRouter = require('./Routers/user');
const cartRouter = require('./Routers/cart');
const orderRouter = require('./Routers/order');
const AdminAuth = require('./middleware/adminAuth');
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");


const app = express();

//app.use(express.json()); will work when we are sending json files but as we are submitting a form containing image we need to install fileUpload package (done on router page )
app.use(cookieParser());
app.use(express.json());
app.use(cors(
    // {
    //     origin: "http://localhost:3000",
    //     credentials: true,
    // }
));
//now in order to make the pictures in the public folder usable in the frontend , we need to tell the server to surf the folder as per the request
app.use(express.static("Public"));

app.use("/category",categoryRouter)
app.use("/colors",colorRouter)
app.use("/product",productRouter);
app.use("/user", userRouter);
app.use("/cart",cartRouter);
app.use("/order",orderRouter)

app.get("/test" , 
    //req ke beech me admin auth middleware add kara
    AdminAuth, 
    (req,res)=>{
        res.send("You are authenticated and have access to this route")
    }
)

mongoose.connect(
    "mongodb://localhost:27017/",
    {
        dbName:"sneaker",
    }
).then((result)=>{
    app.listen(5000,()=>console.log("server listening on port 5000"))
})
.catch((err)=>{
    console.log("connection failed");
})