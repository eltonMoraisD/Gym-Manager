const express = require('express')
const nunjucks = require('nunjucks')

const routes = require("./routes")

const server = express()

server.use(express.urlencoded({extended:true})) // responsavel por fazer funcionar o meu body
server.use(express.static("public"))
server.use(routes)

server.set('view engine','njk')

nunjucks.configure('views',{
    express: server,
    autoescape:false,
    noCache:true,
    watch:true
})

server.listen(5000,()=>{
    console.log('Server running!!')
})