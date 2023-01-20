const {addItem,getItemById,getItems,updateItem, getItemByLanguage} = require('../controller/itemsController')
const Router = require('express').Router()
Router.post('/additem',addItem)
Router.get('/getitembyid/:id',getItemById)
Router.get('/getitems',getItems)
Router.get('/getitembylanguage',getItemByLanguage)
Router.put('/updateitem',updateItem)

module.exports = Router