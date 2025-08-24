import express from 'express'
import { dbConnection } from './src/db/dbConnection.js';
import { userRoutes } from './src/Modules/userRoutes.js';
import { productRoutes } from './src/Modules/productRoutes.js';
import { cartRoutes } from './src/Modules/cartRoutes.js';

const app = express()
dbConnection
app.use(userRoutes)
app.use(productRoutes)
app.use(cartRoutes)


app.listen(3000, () => {
  console.log('Server is running');
});