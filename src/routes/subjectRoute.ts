const Router = require('express').Router()
const {requireAuth} = require('../controller/auth')
const {addSubject, deleteSubject, getSubjects , getSubjectById, updateSubject} = require('../controller/subjectController')
Router.post('/addsubject',requireAuth,addSubject)
Router.delete('/subjects/:id',requireAuth, deleteSubject)
Router.put('/subjects/:id',requireAuth,updateSubject)
Router.get('/subjects',requireAuth,getSubjects)
Router.get('/subjects/:id',requireAuth,getSubjectById)



module.exports = Router