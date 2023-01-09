const Router = require('express').Router()
const {requireAuth} = require('../controller/auth')
const {addStudent, deleteStudent, getStudents , getStudentById, updateStudent,subjectsOfStudent, login, logout} = require('../controller/studentController')
Router.post('/addstudent',addStudent)
Router.delete('/students/:id',requireAuth, deleteStudent)
Router.put('/student/:id',requireAuth,updateStudent)
Router.get('/students',requireAuth,getStudents)
Router.get('/students/:id',requireAuth,getStudentById)
Router.get('/students/:id/subjects',requireAuth,subjectsOfStudent)
Router.post('/login', login);
Router.post('/logout', logout)




module.exports = Router