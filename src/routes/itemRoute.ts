const {addItem,getItemById,getItems,updateItem, getItemByLanguage,searchItem} = require('../controller/itemsController')
const Router = require('express').Router()
Router.post('/additem',addItem)
Router.get('/getitembyid/:id',getItemById)
Router.get('/getitems',getItems)
Router.get('/getitembylanguage',getItemByLanguage)
Router.put('/updateitem',updateItem)
Router.get('/search',searchItem)

module.exports = Router