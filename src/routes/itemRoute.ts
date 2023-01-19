const {addItem,getItemById,getItems,updateItem} = require('../controller/itemsController')
const Router = require('express').Router()
Router.post('/additem',addItem)
Router.get('/getitembyid/:id',getItemById)
Router.get('/getitems/',getItems)
Router.put('/updateitem',updateItem)

module.exports = Router