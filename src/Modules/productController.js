import jwt from 'jsonwebtoken'
import { productModel } from '../db/models/productModel.js'

const getProducts = async (req,res)=>{
    const products = await productModel.find()
    res.json(products)
}

const getProduct = async (req,res)=>{
    const {id} = req.params
    const products = await productModel.findById(id)
    res.json(products)
}

const addProduct =  async (req,res)=>{

    const exist = await productModel.findOne({name:req.body.name})
    if(exist) return res.json({ message: "product already exist plz update"})

    const addedProduct = await productModel.insertMany(req.body)

    res.json({ message: "added successfully" , addedProduct})
}

const updateProduct =  async (req,res)=>{ 
    const {id} = req.params
    const updatedProduct = await productModel.findByIdAndUpdate(id, {...req.body}, {new:true})
    res.json({ message: "updated successfully" , updatedProduct})
}

const deleteProduct = async(req,res)=>{
     const {id} = req.params
     const deletedProduct = await productModel.findByIdAndDelete(id)
      res.json({message:"deleted successfully", deletedProduct})
}


export {
    getProducts,
    getProduct, 
    addProduct,
    updateProduct,
    deleteProduct
}



