
const fs = require ('fs')
const data = require('./data.json')
const {age, date} = require('./utils')
const routes = require('./routes')


exports.index = function(req, res) { 
  return res.render("instructors/index", {instructors: data.instructors })
}



exports.show = function(req, res) {

const { id } = req.params

const foundInstructor = data.instructors.find(function(instructor){

return instructor.id == id
  
})

if (!foundInstructor) return res.send("Instructor not found!")




const instructor = {
  ...foundInstructor,
  age: age(foundInstructor.birth),
  services: foundInstructor.services.split(","),
  created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
}


return res.render("instructors/show", {instructor})

}


// edit
exports.edit = function(req, res) {

  const { id } = req.params

const foundInstructor = data.instructors.find(function(instructor){

return instructor.id == id
  
})

if (!foundInstructor) return res.send("Instructor not found!")


const instructor = {
  ...foundInstructor,
  birth: date(foundInstructor.birth)
}


return res.render('instructors/edit', {instructor}) 
}




//put 

exports.put = function(req, res){
  const { id } = req.body
  let index = 0

  const foundInstructor = data.instructors.find(function(instructor, foundIndex){
  if(id == instructor.id) {
    index = foundIndex
    return true
  }
    
  })
  
  if (!foundInstructor) return res.send("Instructor not found!")
  
const instructor = {
  ...foundInstructor,
  ...req.body,
  birth: Date.parse(req.body.birth)
}

data.instructors[index] = instructor

fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Write error!')
  return res.redirect(`/instructors/${id}`)
})

}


//delete
exports.delete = function(req, res) {
  const { id } = req.body 
  const filteredInstructors = data.instructors.filter(function(instructor){
      return instructor.id != id 

  })

 data.instructors = filteredInstructors


 fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
      if (err) return res.send('Write file error!')

      return res.redirect('/instructors')
  }) 

}


// create
exports.post = function(req, res) {
    //req.body pra receber os elementos do formulario


const keys = Object.keys(req.body)


for (key of keys)
{
  //req.body.key = ""
  if(req.body[key] == "")
    return res.send('Please, fill all fields')
  }

// desestruturando o req.body
let {avatar_url, birth, name, services, gender} = req.body 
//fim
 
const id = Number(data.instructors.length + 1) // criar o id
birth = Date.parse(birth) // passar a data de aniversario em timestamp
const created_at = Date.now() // para pegar a data da criação 



// para adicionar os dados do formulario no data.json

data.instructors.push({
  id,
  avatar_url, 
  name,
  birth,
  gender,
  services,
  created_at
})


  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if (err) return res.send('Write file error')
 
 return res.redirect('/instructors')
 



 //fim
 })

}
//  return res.send(req.body)








// update



