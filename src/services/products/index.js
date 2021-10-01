import express from 'express'


import db from  '../../db/models/index.js'
import s from 'sequelize'

const { Op } = s
const router = express.Router()
const { Review, Product, User, Category} = db



router.route("/").get(async (req,res, next) => {
    try {
        const product = await Product.findAll({
            attributes: ["productName", "image", "price"],
            
            where: req.query.search 
            ? {
                [Op.or]: [
                    {name: {[Op.iLike]: `%${req.query.search}%`}},
        
                ],
            }:
            {},
            include: [  
               Review,
            //    User,
            //    Category,
             ],
            })
        res.send(product)
    } catch (error) {
        console.log(error)
        next(error)
    }
})
.post(async (req,res,next) => {
    try {
        const product = await Product.create(req.body)
        res.send(product)
        
    } catch (error) {
        console.log(error)
        next(error)
    }

})


router.route("/:id")
.get( async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id)
        res.send(product)
    } catch (error) {
        console.log(error)
        next(error)
    }
})
.put( async (req,res,next) => {
    try {
        const product = await Product.update(req.body,{
            where:{
                id: req.params.id
            },
            returning: true,
        })
        res.send(product[1][0])
        
    } catch (error) {
        console.log(error)
        next(error)
    }
})
.delete( async(req,res,next) => {

    try {
        const rows = await Product.destroy({
            where:{
                id: req.params.id,
            } })

            if(rows > 0) {
                res.send("ok")
            }else{
                res.send("Not found")
            }
    } catch (error) {
        console.log(error)
        next(error)
    }
})


export default router