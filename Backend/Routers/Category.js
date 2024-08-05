const {Router} = require('express')
const categoryController = require('../Controllers/Category')
const fileUpload = require("express-fileupload");
 
const categoryRouter = Router()

categoryRouter.post(
    "/create",
    //adding middleware so when file reaches from client to server , it can be saved and we can add req.files.image to the request 
    // middleware- kisi request ko aage jaane se pehle process karwana 
    fileUpload({
        createParentPath :true,
    }),
    (req,res)=>{
        //req.body-> gets us the slug and name 
        //req.filse.image-gets up the image due the use of fileUpload package 
        // console.log(req.files.image);
        const result = new categoryController().create(req.body,req.files.image);
        result.then(
            (success)=>{
                res.send(success);
            }
        ).catch(
            (err)=>{
                res.send(err);
            }
        )
    }
)
categoryRouter.get(
    "/:id?",
    (req,res)=>{
        const result = new categoryController().read(req.params.id);
        result.then(
            (success)=>{
                res.send(success);
            }
        ).catch(
            (err)=>{
                res.send(err);
            }
        )
    }
)
categoryRouter.delete(
    "/delete/:id",
    (req,res)=>{
        const result = new categoryController().delete(req.params.id);
        result.then(
            (success)=>{
                res.send(success);
            }
        ).catch(
            (err)=>{
                res.send(err);
            }
        )
    }
)
categoryRouter.post("/update/:id", (req, res) => {
  const result = new categoryController().edit(req.params.id, req.body);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});
categoryRouter.put(
    "/change-status/:id/:new_status",
    (req,res)=>{
        const result = new categoryController().changeStatus(req.params.id,req.params.new_status);
        result.then(
            (success)=>{
                res.send(success);
            }
        ).catch(
            (err)=>{
                res.send(err);
            }
        )
    }
)
module.exports = categoryRouter