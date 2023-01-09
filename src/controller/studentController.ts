let express = require('express')
const app = express()
import { Request, Response } from 'express';
const {createToken} = require('./auth')
const studentModel = require('../model/students')
let bodyparser = require('body-parser')
const CryptoJS = require('crypto-js')
app.use(bodyparser.json());
export const addStudent = async (req: Request, res: Response) =>{
    const {name,email,password} = req.body
    console.log(process.env.hash_secret)
    const hashedPassword  = CryptoJS.AES.encrypt(
        password,
        'process.env.hash_secret'
      ).toString()
       const newItem =await studentModel.create({name : name, email: email, password : hashedPassword})
        if(newItem){
           res.send('Added')
        }else{
            res.send('Error')
        }
    }
export const deleteStudent = async (req: Request, res: Response ) =>{
    const id = parseInt(req.params.id);
    
    studentModel.destroy({where :{id :id }})
    res.json(`Student with id: ${id} deleted Successfully`);
}
export const getStudents = async (req: Request, res: Response) =>{
    const Items = await studentModel.findAll()
    let dataToSend  = []
    Items.map((student :object) =>{
        const {studentid,name,email} = student
        dataToSend.push({studentid,name,email})
    })
    res.send(dataToSend)
    // client.query('SELECT * FROM Students', function (err, result) {
    //     if (err) {
    //         res.send(err);
    //     }
    //     else {
    //       const students =   result.rows
    //       let dataToSend = []
    //      students.map((student ) =>{
    //         const {studentid,name,email} = student
    //         dataToSend.push({studentid,name,email})
    //      })
    //      res.send(dataToSend)
    //     }
    // });
}
export const getStudentById = async (req: Request, res: Response) =>{
    const id = parseInt(req.params.id);
    const item = await studentModel.findByPk(id)
    res.send(item)

    // client.query('SELECT * FROM Students WHERE studentid=$1',[id],(err,result) => {
    //     if(err){
    //         res.send(err)
    //     }else{
    //         res.send(result.rows)
    //     }
    // })
}
export const updateStudent =async (req: Request, res: Response) =>{
    const id = parseInt(req.params.id);
    const {name,email,password}  = req.body
    const hashedPassword  = CryptoJS.AES.encrypt(
        password,
        process.env.hash_secret
      ).toString()
    
    const updated = await studentModel.updated({name: name, email:email,password:hashedPassword},{where : {studentid : id}})
    res.send(updated)
}
export const login = async(req :Request, res:Request) => {
    const { email, password } = req.body;
    const user = await  studentModel.findOne({ where: { email: email } })
    if(user) {
        const hashedPassword = CryptoJS.AES.decrypt(
            user.dataValues.password,
            process.env.hash_secret
        )
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
            console.log(originalPassword)
            if(password === originalPassword){
                const token = createToken( user.dataValues.id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: 86400 });
                const { studentid, name, email } =user;
                res.status(200).json({
                studentid: studentid,
                name: name,
                email: email
                });
            }
            else{
                    res.send('wrong password')
                }
            }else{
                res.send('wrong email')
            }
    }


    // client.query('SELECT * FROM Students where email = $1 ', [email], (err, result) => {
    //     if (result.rows.length) {
    //         const hashedPassword = CryptoJS.AES.decrypt(
    //             result.rows[0].password,
    //             process.env.hash_secret
    //         )
    //         const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
    //         console.log(originalPassword)
    //         if(password === originalPassword){
    //             const token = createToken(result.rows[0].studentid);
    //             res.cookie('jwt', token, { httpOnly: true, maxAge: 86400 });
    //             const { studentid, name, email } = result.rows[0];
    //             res.status(200).json({
    //             studentid: studentid,
    //             name: name,
    //             email: email
    //              });
    //         }else{
    //             res.send('wrong password')
    //         }
    //     }
    //     else {
    //         res.status(422).json('Wrong Email');
    //     }
    // });
;
export const logout = (req:Request, res:Response ) =>{
    res.clearCookie("jwt");
    res.end()
}
export const subjectsOfStudent = (req: Request, res: Response) =>{
    const id = parseInt(req.params.id);
    client.query('SELECT name FROM Subjects WHERE studentid = $1',[id],(err,result) =>{
        if(err){
            res.send(err)
        }else{
            res.send(result.rows)
        }
    })
}
