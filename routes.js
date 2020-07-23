const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')

routes.get('/', function(req, res) { 
    return res.redirect("/instructors")
})


routes.get('/instructors', function(req, res) { 
    return res.render("instructors/index")
})


routes.get('/members', function(req, res) { 
    return res.render("members")
})

routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit', instructors.edit)
  



routes.get('/create', function(req, res){
    return res.render('create')
})

routes.post('/instructors', instructors.post)



module.exports = routes