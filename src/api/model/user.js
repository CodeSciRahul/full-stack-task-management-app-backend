import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters"],
    }
})

export default mongoose.model('User',userSchema)