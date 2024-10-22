import {model, models, Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const docschema = new Schema({
    title:{
        type: String,
        required: true,
        maxLength: [100, 'title cannot exceed 100 characters']
    },
    content:{
        type: String,
        maxLength: [100000, 'content cannot exceed 100000 characters']
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: "Client"
    },
    shared:{
        type : Boolean,
        default: false
    },
    shareid:{
        type: Schema.Types.ObjectId,
        ref: "Shared",
        default: null
    }
}, {timestamps: true})

docschema.plugin(mongooseAggregatePaginate)

docschema.index({ createdAt: -1 });  
docschema.index({ title: 'text' }); 

export const Docs = models.docs ||  model("docs", docschema)