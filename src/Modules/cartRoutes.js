import { Router } from "express";
import express from 'express'
import { addToCart, createOrder, decrementFromCart, deleteFromCart, getAllCarts, getUserCart } from "./cartController.js";
import { verifyUserToken } from "../middleware/verifyCartToken.js";

export const cartRoutes = Router()

cartRoutes.use(express.json())

cartRoutes.get('/cart',verifyUserToken ,getUserCart)

cartRoutes.post('/cart/:id', verifyUserToken, addToCart)

cartRoutes.post('/decrementFromCart/:id', verifyUserToken, decrementFromCart) 

cartRoutes.post('/createOrder', verifyUserToken, createOrder) ///////////////////////////////////////////

cartRoutes.delete('/cart/:id', verifyUserToken, deleteFromCart)

cartRoutes.get('/carts',verifyUserToken ,getAllCarts)
