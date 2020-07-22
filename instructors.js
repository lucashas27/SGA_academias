
const fs = require ('fs')
const data = require('./data.json')
const { age } = require('./utils')



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




// delete