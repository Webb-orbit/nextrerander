import {model, models, Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const authschema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        maxLength: [50, 'username cannot exceed 50 characters']
    },
    password: {
        type: String,
        required: true
    },
    logo: {
        type: String,
    },
    apikey: {
        type: String,
        default: null
    },
    refreshtokan: {
        type: String,
    }
}, {timestamps: true})

authschema.pre("save", async function (next) {
    if (this.isModified("password")) {
        console.log("modified pass");
        this.password = await bcrypt.hash(this.password, 17)
        next()
    }else{
        next()
    }
})

authschema.methods.comparepass = async function (password) {
    return await bcrypt.compare(password, this.password)
}

authschema.methods.GenerateAccessToken = async function(){
    return await jwt.sign({id:this._id}, process.env.AccessTokenKey, { expiresIn: process.env.AccessTokenExp })
}

authschema.methods.GenerateRefreshToken =  async function() {
    return await jwt.sign({id:this._id}, process.env.RefreshTokenKey, { expiresIn: process.env.RefreshTokenExp })
}



export const User = models.clients ||  model("clients", authschema)

