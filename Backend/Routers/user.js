const {Router} = require('express');
const userController = require('../Controllers/user');

const userRouter = Router();

userRouter.post(
    "/register",
    (req,res)=>{
        const result = new userController().register(req.body);
        result.then(
            (success)=>{
                res.send(success);
            })
            .catch(
            (err)=>{
                res.send(err);
            }
        )
    }
)
userRouter.post(
    "/login",
    (req,res)=>{
        const result = new userController().login(req.body);
        result.then(
            (success)=>{
                res.send(success);
            })
           .catch(
            (err)=>{
                res.send(err);
            }
        )
    }
)

userRouter.post(
    "/update",
        (req,res)=>{
            console.log("req",req.body)
        const result = new userController().edit(req.body);
        result.then(
            (success)=>{
                res.send(success);
            })
           .catch(
            (err)=>{
                res.send(err);
            }
        )
    }
)
module.exports = userRouter;