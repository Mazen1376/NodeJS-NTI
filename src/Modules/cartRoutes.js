import { Router } from "express";
import express from 'express'
import { addToCart, createOrder, decrementFromCart, deleteFromCart, getUserCart } from "./cartController.js";
import { verifyingCartToken } from "../middleware/verifyCartToken.js";

export const cartRoutes = Router()

cartRoutes.use(express.json())

cartRoutes.get('/cart',verifyingCartToken ,getUserCart)

cartRoutes.post('/cart/:id', verifyingCartToken, addToCart)

cartRoutes.delete('/cart/:id', verifyingCartToken, deleteFromCart)

cartRoutes.post('/createOrder', verifyingCartToken, createOrder) 

cartRoutes.post('/decrementFromCart/:id', verifyingCartToken, decrementFromCart) 
