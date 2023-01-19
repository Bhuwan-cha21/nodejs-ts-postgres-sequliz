let express = require('express')
const app = express()
import { Request, Response } from 'express';
let bodyparser = require('body-parser')
let Sequlize = require('../database')
app.use(bodyparser.json());
export const addItem = async (req: Request, res: Response) =>{
    const {itemcode,t_code,t_data} = req.body

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