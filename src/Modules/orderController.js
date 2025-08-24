import { orderModel } from '../db/models/orderModel.js'

const getOrders = async (req,res)=>{
    const orders = await orderModel.find()
    res.json({message:"all orders", orders})
}

const addOrder = async (req,res)=>{

    const addedOrder = await orderModel.insertOne(req.body)
    res.json({ message: "added successfully" , addedOrder})
    //////////////////////////////////////////////////////// quantity mn products model ////////////////////////////////////////////
}

const updateOrder = async (req,res)=>{
    const {id} = req.params
    const updatedOrder = await orderModel.findByIdAndUpdate(id, {...req.body}, {new:true})
    res.json({ message: "updated successfully" , updatedOrder})
}

const deleteOrder = async (req,res)=>{
    const {id} = req.params
    const deletedOrder = await orderModel.findByIdAndDelete(id)
    res.json({message:"deleted successfully", deletedOrder})

}


export{
    getOrders,
    updateOrder,
    addOrder,
    deleteOrder
}