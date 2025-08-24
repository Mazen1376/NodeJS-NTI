import { cartModel } from '../db/models/cartModel.js'
import { orderModel } from '../db/models/orderModel.js'
import { productModel } from '../db/models/productModel.js'
import { userModel } from '../db/models/userModel.js'


const getUserCart = async (req,res)=>{

        const userCart = await cartModel.findOne({userId: req.decoded._id})
        res.json({message:"ur cart", userCart})
    }

const getAllCarts = async (req,res)=>{

        const carts = await cartModel.find()
        res.json({message:"all carts", carts})
    }

const addToCart =  async (req,res)=>{

    const {id}= req.params
    const {quantity} = req.body
    const userId = req.decoded._id
    
    const exist = await cartModel.findOne({userId,"products.productId": id});

    if (exist){var updatedToCart = await cartModel.findOneAndUpdate({"products.productId": id},{$inc: {"products.$.quantity": quantity}},{new: true})}
    else{var updatedToCart = await cartModel.findOneAndUpdate({userId:userId},{$push: {products:{productId : id, quantity : quantity}}},{new:true})}

    res.json({ message: "added successfully" ,updatedToCart})}


const decrementFromCart = async (req,res)=>{
     
    const {id}= req.params
    const userId = req.decoded._id
        const updatedToCart = await cartModel.findOneAndUpdate(
            {"products.productId": id },{ $inc: {"products.$.quantity": -1}},{ new: true })
        
    res.json({ message: "updated successfully" ,updatedToCart})
 
}

const deleteFromCart = async (req, res) => {
    const { id } = req.params;
    const userId = req.decoded._id

    const updatedCart = await cartModel.findOneAndUpdate({userId}, {$pull:{ products:{ productId: id}}}, {new: true})

    res.json({ message: "deleted successfully", updatedCart })}



const createOrder = async (req, res) => {

    const userId = req.decoded._id
    const cart = await cartModel.findOne({userId:userId})
    const cartProducts = cart.products

    for (var product of cartProducts) {
        const availableProduct = await productModel.findById(product.productId)
        if (!product || availableProduct.quantity < product.quantity) {
            return res.json({ message: `this product is not available right now ${availableProduct?.name}` })}}

    if(cartProducts.length==0){return res.json({message:"ur cart is empty"})}

    const createdOrderBeforeProducts = await orderModel.insertOne(req.body)
    const createdOrderAfter = await orderModel.findOneAndUpdate({_id:createdOrderBeforeProducts._id}, {$push:{ products: cartProducts}},{new:true})
    const deleteProductsFromCart = await cartModel.findOneAndUpdate({userId},{$set:{products:[]}},{new:true})


    await productModel.findOneAndUpdate({_id:product.productId},{$inc:{quantity:-product.quantity}})
    
    res.json({message:"test" , createdOrderAfter})
}


export{
    getUserCart,
    getAllCarts,
    addToCart,
    decrementFromCart,
    deleteFromCart,
    createOrder
}