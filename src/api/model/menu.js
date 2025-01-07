import mongoose from 'mongoose'

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Appetizers', 'Main Course', 'Desserts'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    }

})

export default mongoose.model('Menu',menuSchema)