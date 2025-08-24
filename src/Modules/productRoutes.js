import { Router } from "express";
import express from 'express'
import { addProduct, deleteProduct, getProducts, updateProduct } from "./productController.js";
import { verifyAdminToken } from "../middleware/verifyAdminToken.js";

export const productRoutes = Router()

productRoutes.use(express.json())

productRoutes.get('/Products', getProducts)                              // user or admin

productRoutes.post('/Products', verifyAdminToken, addProduct)            // admin only

productRoutes.put('/Products/:id', verifyAdminToken, updateProduct)      // admin only

productRoutes.delete('/Products/:id', verifyAdminToken, deleteProduct)   // admin only
