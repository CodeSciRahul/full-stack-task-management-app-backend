import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [{
        menuItemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Menu',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }],
    totalAmount: {
        type: string,
        required: true
    },
    status: {
        type: string,
        enum: ['pending', 'completed'],
        default: pending
    },
    createdAt: { type: Date, default: Date.now },

})

export default mongoose.model('Order',orderSchema)