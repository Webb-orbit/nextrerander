import {model, models, Schema} from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"

const shareschema = new Schema({
    privated: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    },
    shareddoc: {
        type: Schema.Types.ObjectId,
        ref: "Docs"
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "Client"
    }
}, {timestamps: true})

shareschema.plugin(aggregatePaginate)

export const Share = models.shareds ||  model("shareds", shareschema)