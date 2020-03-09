const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')


routes.get('/',(req, res)=>{
    return res.redirect('/')
})

routes.get('/instructors',(req,res)=>{
    return res.render('instructors/index')
})

routes.get('/instructors/create',(req,res)=>{
    return res.render('instructors/create')
})

routes.get('/members',(req,res)=>{
    return res.send('members')
})

routes.post('/instructors', instructors.post)

module.exports = routes