import express from 'express'
import { getAllProductsStatic } from '../../controllers/products'

const router = express.Router()

router.get('/', getAllProductsStatic)

export default router
