import mongoose from "mongoose";

const cartSchema = mongoose.Schema({

    userId:
    {
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    products: 
    [{
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          default : null
        },
        quantity: {
          type: Number,
          default: 1,
        }
      }]
})




export const cartModel = mongoose.model('Cart', cartSchema)