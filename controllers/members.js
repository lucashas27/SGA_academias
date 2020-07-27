
const fs = require ('fs')
const data = require('../data.json')
const {age, date} = require('../utils')
const routes = require('../routes')


exports.index = function(req, res) { 
  return res.render("members/index", {members: data.members })
}



exports.show = function(req, res) {

const { id } = req.params

const foundMember = data.members.find(function(member){

return member.id == id
  
})

if (!foundMember) return res.send("Member not found!")




const member = {
  ...foundMember,
  age: age(foundMember.birth),
}


return res.render("members/show", {member})

}


// edit
exports.edit = function(req, res) {

  const { id } = req.params

const foundMember = data.members.find(function(member){

return member.id == id
  
})

if (!foundMember) return res.send("Member not found!")


const member = {
  ...foundMember,
  birth: date(foundMember.birth)
}


return res.render('members/edit', {member}) 
}




//put 

exports.put = function(req, res){
  const { id } = req.body
  let index = 0

  const foundMember = data.members.find(function(member, foundIndex){
  if(id == member.id) {
    index = foundIndex
    return true
  }
    
  })
  
  if (!foundMember) return res.send("Member not found!")
  
const member = {
  ...foundMember,
  ...req.body,
  birth: Date.parse(req.body.birth),
  id: Number(req.body.id)
}

data.members[index] = member

fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Write error!')
  return res.redirect(`/members/${id}`)
})

}


//delete
exports.delete = function(req, res) {
  const { id } = req.body 
  const filteredMembers = data.members.filter(function(member){
      return member.id != id 

  })

 data.members = filteredMembers


 fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
      if (err) return res.send('Write file error!')

      return res.redirect('/members')
  }) 

}


exports.create = function(req, res){
  return res.render('mcreate')
}







// post
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
 
const id = Number(data.members.length + 1) // criar o id
birth = Date.parse(birth) // passar a data de aniversario em timestamp
const created_at = Date.now() // para pegar a data da criação 



// para adicionar os dados do formulario no data.json

data.members.push({
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
 
 return res.redirect('/members')
 



 //fim
 })

}
//  return res.send(req.body)








// update



