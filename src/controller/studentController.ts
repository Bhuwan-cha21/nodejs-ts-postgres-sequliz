let express = require('express')
const app = express()
import { Request, Response } from 'express';
const {createToken} = require('./auth')
let bodyparser = require('body-parser')
const CryptoJS = require('crypto-js')
let Sequlize = require('../database')
app.use(bodyparser.json());
export const addStudent = async (req: Request, res: Response) =>{
    const {name,email,password} = req.body
    console.log(process.env.hash_secret)
    const hashedPassword  = CryptoJS.AES.encrypt(
        password,
        'process.env.hash_secret'
      ).toString()
      const result = await Sequlize.query("SELECT * from  insert_student(:name,:email,:password)", {
        replacements: { name: name, email: email, password:hashedPassword },
        type: Sequlize.QueryTypes.SELECT
    }
    )
    res.send(result)
    // CREATE OR REPLACE FUNCTION public.insert_student(
    //     name character varying,
    //     email character varying,
    //     password character varying)
    //     RETURNS void
    //     LANGUAGE 'plpgsql'
    //     COST 100
    //     VOLATILE PARALLEL UNSAFE
    // AS $BODY$
    // BEGIN
    //   INSERT INTO students(name, email, password) VALUES (name, email, password);
    // END;
    // $BODY$;
    
    // ALTER FUNCTION public.insert_student(character varying, character varying, character varying)
    //     OWNER TO postgres;
    }
export const deleteStudent = async (req: Request, res: Response ) =>{
    const id = parseInt(req.params.id);
    
    const result = await Sequlize.query("SELECT * from  delete_student(:id)", {
        replacements: { id: id },
        type: Sequlize.QueryTypes.SELECT
    }
    )
    res.send('deleted')
    // CREATE OR REPLACE FUNCTION public.delete_student(
    //     s_id integer)
    //     RETURNS void
    //     LANGUAGE 'plpgsql'
    //     COST 100
    //     VOLATILE PARALLEL UNSAFE
    // AS $BODY$
    // BEGIN
    //     DELETE FROM students
    //     WHERE id = s_id;
    // END;
    // $BODY$;
    
    // ALTER FUNCTION public.delete_student(integer)
    //     OWNER TO postgre
}
export const getStudents = async (req: Request, res: Response) =>{
    const Items = await Sequlize.query("SELECT * from  get_students()",{
        replacements: { table : 'students' },
        type: Sequlize.QueryTypes.SELECT
    })
    res.send(Items)
    // CREATE OR REPLACE FUNCTION public.get_students(
    //     )
    //     RETURNS TABLE(name character varying, email character varying) 
    //     LANGUAGE 'plpgsql'
    //     COST 100
    //     VOLATILE PARALLEL UNSAFE
    //     ROWS 1000
    
    // AS $BODY$
    // BEGIN 
    //   RETURN QUERY SELECT students.name, students.email FROM students;
    //  END; 
     
    // $BODY$;
    
    // ALTER FUNCTION public.get_students()
    //     OWNER TO postgres;
    
}
export const getStudentById = async (req: Request, res: Response) =>{
    const id = parseInt(req.params.id);
   const [results, metadata] = await Sequlize.query("SELECT  * from get_studentbyid(:id)",{
        replacements: { id : id }
    })
    res.send(results)
 
    // CREATE OR REPLACE FUNCTION public.get_studentbyid(
    //     s_id integer)
    //     RETURNS TABLE(id integer, name character varying, email character varying, password character varying) 
    //     LANGUAGE 'plpgsql'
    //     COST 100
    //     VOLATILE PARALLEL UNSAFE
    //     ROWS 1000
    
    // AS $BODY$
    // BEGIN
    //   RETURN QUERY
    //   SELECT students.id, students.name, students.email, students.password
    //   FROM students
    //   WHERE students.id = s_id;
    // END;
    // $BODY$;
    
    // ALTER FUNCTION public.get_studentbyid(integer)
    //     OWNER TO postgres;
    
}
export const updateStudent =async (req: Request, res: Response) =>{
    
    const id = parseInt(req.params.id);
    const {name,email,password}  = req.body
    const hashedPassword  = CryptoJS.AES.encrypt(
        password,
        process.env.hash_secret
      ).toString()
    
      const result = await Sequlize.query("SELECT  update_student(:id,:name,:email,:password)", {
        replacements: { id:id,name: name, email: email, password:hashedPassword },
        type: Sequlize.QueryTypes.SELECT
    }
    )
    res.send(result)
    // CREATE OR REPLACE FUNCTION public.update_student(
    //     s_id integer,
    //     s_name character varying,
    //     s_email character varying,
    //     s_password character varying)
    //     RETURNS void
    //     LANGUAGE 'plpgsql'
    //     COST 100
    //     VOLATILE PARALLEL UNSAFE
    // AS $BODY$
    // BEGIN
    //     UPDATE students
    //     SET name = s_name, email = s_email, password = s_password
    //     WHERE id = s_id;
    // END;
    // $BODY$;
    
    // ALTER FUNCTION public.update_student(integer, character varying, character varying, character varying)
    //     OWNER TO postgres;
    
}
export const login = async(req :Request, res:Request) => {
    const { email, password } = req.body;
    const user = await  Sequlize.query('SELECT * from get_studentforlogin(:email)',{
        replacements: {  email: email },
        type: Sequlize.QueryTypes.SELECT
    })

    if(user) {
        const hashedPassword = CryptoJS.AES.decrypt(
            user[0].password,
            process.env.hash_secret
        )
         console.log(hashedPassword)
         const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
         console.log(originalPassword)
           
            if(originalPassword === password){
                const token = createToken(  user[0].id);
                res.setHeader('Authorization', `${token}`);
                const { id, name, email } =user[0];
                res.status(200).json({
               id,name,email
                });
            }
            else{
                    res.send('wrong password')
                }
            }else{
                res.send('wrong email')
            }
            // CREATE OR REPLACE FUNCTION public.get_studentforlogin(
            //     s_email character varying,
            //     s_password character varying)
            //     RETURNS TABLE(id integer, name character varying, email character varying, password character varying) 
            //     LANGUAGE 'plpgsql'
            //     COST 100
            //     VOLATILE PARALLEL UNSAFE
            //     ROWS 1000
            
            // AS $BODY$
            // BEGIN
            //   RETURN QUERY
            //   SELECT students.id, students.name, students.email, students.password
            //   FROM students
            //   WHERE students.email = s_email AND students.password = s_password;
            // END;
            // $BODY$;
            
            // ALTER FUNCTION public.get_studentforlogin(character varying, character varying)
            //     OWNER TO postgres;
    }


    

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
