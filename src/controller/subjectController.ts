let express = require('express')
const app = express()
import { Request, Response } from 'express';
const {requireAuth} = require('./auth')
let bodyparser = require('body-parser')
app.use(bodyparser.json());
export const addSubject =(req: Request, res: Response, requireAuth) =>{
     const {name,studentid} = req.body
    const response =  client.query("INSERT INTO Subjects(name,studentid) VALUES ($1,$2)",['compiler',1], (err,result) =>{
        if(!err){
           res.send('Added')
        }else{
            console.log(err)
        }
    })
}
export const deleteSubject =(req: Request, res: Response, requireAuth) =>{
    const id = parseInt(req.params.id);
    
     client.query('DELETE FROM Subject where id = $1', [
        id
    ]);
    res.json(`Subject with id: ${id} deleted Successfully`);
}
export const getSubjects =(req: Request, res: Response, requireAuth) =>{
    client.query('SELECT * FROM Subjects', function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result.rows);
        }
    });
}
export const getSubjectById = (req: Request, res: Response ,requireAuth) =>{
    const id = parseInt(req.params.id);
    client.query('SELECT * FROM Subjects WHERE subjectid=$1',[id],(err,result) => {
        if(err){
            res.send(err)
        }else{
            res.send(result.rows)
        }
    })
}
export const updateSubject = (req: Request, res: Response,requireAuth) =>{
    const id = parseInt(req.params.id);
    const {name}  = req.body
    
    client.query('UPDATE Subjects SET name = $1,  WHERE Subjectid = $2', [
        name,
       id
    ],(err,result) =>{
        if(err){
            res.send(err)
        }else{
            res.send(`Subject with id ${id} updated successfully`)
        }
    });
}
