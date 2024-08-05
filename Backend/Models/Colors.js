const mongoose = require('mongoose') 

const colorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true,
        maxLength: 50
    },
    code: {
        type: String,
        required: true,
        // unique: true
    },
    status:{
        type: Boolean,
        default: true
    }
},{
    timestamps:true,
})
const Color = mongoose.model("Color",colorSchema);
module.exports = Color;