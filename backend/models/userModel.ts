import { Schema, model, Document, Model } from 'mongoose';
import validator from "validator";
import bcrypt from "bcrypt"

interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const userSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Please Enter a Valid Email.'],
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error: any) {
        next(error)
    }
})

const User = model<IUser>('User', userSchema)

export default User