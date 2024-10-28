import {model, models, Schema} from "mongoose";

const offdocSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: "clients"
    },
    ipadd:{
        type: String,
        required: true
    }
}, {timestamps: true})

export const Offlinedoc = models.offlinedocs ||  model("offlinedocs", offdocSchema)