let express = require('express')
const app = express()
import { Request, Response } from 'express';
let bodyparser = require('body-parser')
let Sequlize = require('../database')
const crypto = require('crypto');
app.use(bodyparser.json());
export const addItem = async (req: Request, res: Response) =>{
    const {itemcode,t_data} = req.body
    function generateId(length :Number) {
        return crypto.randomBytes(Math.ceil(length / 2))
          .toString('hex') // convert to hexadecimal format
          .slice(0, length);   // return required number of characters
      }
      
      const t_code = (generateId(8));
      const result = await Sequlize.query("SELECT * from  insert_items(:itemcode,:t_code,:t_data)", {
        replacements: { itemcode: itemcode, t_code: t_code, t_data:t_data },
        type: Sequlize.QueryTypes.SELECT
    }
    )
    res.send(result)
    
}
export const updateItem = async (req: Request, res: Response) =>{
    const {itemcode,t_data} = req.body

      const result = await Sequlize.query("SELECT * from  insert_items(:itemcode,:t_data)", {
        replacements: { itemcode: itemcode,t_data:t_data },
        type: Sequlize.QueryTypes.SELECT
    }
    )
    res.send(result)
    
}
export const getItemById = async (req: Request, res: Response) =>{
    const id = parseInt(req.params.id);
   const [results, metadata] = await Sequlize.query("SELECT  * from getitembyid(:id)",{
        replacements: { id : id }
    })
    res.send(results)
  
 
}
export const getItems = async (req: Request, res: Response) =>{
   const [results, metadata] = await Sequlize.query("SELECT  * from getitems()");
    res.send(results)
 
}
export const getItemByLanguage = async (req: Request, res: Response) =>{
    var languagetofilter = req.query.language
    const [results, metadata] = await Sequlize.query("SELECT  * from getitems()");
    var resultToSend = []
    results.map((items) =>{
        var code = items.code
        items.data.map((item) =>{
           if(item.language == languagetofilter){
                resultToSend.push({code : code, text : item.text})
           }
        })
    })
    res.send(resultToSend)
}