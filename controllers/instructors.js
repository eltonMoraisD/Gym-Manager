const fs = require("fs")
const data = require("../data.json")
const {age,date} = require("../utils")

exports.index = (req,res) =>{
    return res.render('instructors/index',{instructors:data.instructors})
}

exports.post =(req, res)=>{
    const keys = Object.keys(req.body) // transforma os dados do body(formulario) em um array

    //validar todos os campos
    for(key of keys){
        if(req.body[key] == "") {
            return res.send("Por favor, preenche todos os campos")
        }
    }

    let {avatar_url,birth,name,services,gender} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })
    
    fs.writeFile("data.json",JSON.stringify(data,null,2),(err)=>{

        if(err) return res.send("Falha ao escrever no arquivo!")
        
        return res.redirect("/instructors")
    })
}

exports.show = (req, res)=>{
    const {id} = req.params

    const foundInstructor = data.instructors.find(instructor=>{
        if(id == instructor.id){
            return true
        }
    })

    if(!foundInstructor) return res.send("Instructor não encontrado")

   

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services:foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-PT").format(foundInstructor.created_at),
    }

    return res.render("instructors/show",{instructor})
}

exports.create = (req,res) =>{
    return res.render('instructors/create')
}

exports.edit = (req,res) =>{
    const {id} = req.params

    const foundInstructor = data.instructors.find(instructor=>{
        if(id == instructor.id){
            return true
        }
    })

    if(!foundInstructor) return res.send("Instructor não encontrado")

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)  // yyyy-mm-dd
    }

    return res.render('instructors/edit',{instructor})
}

exports.put = (req, res) => {
    const {id} = req.body
    let index = 0

    const foundInstructor = data.instructors.find((instructor,foundIndex)=>{
        if(id == instructor.id){
            index = foundIndex
            return true
        }
    })

    if(!foundInstructor) return res.send("Instructor não encontrado")

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id:Number(req.body.id)
    }
    data.instructors[index] = instructor

    fs.writeFile("data.json",JSON.stringify(data,null,2), err =>{
        if(err) return res.send('Write error')

        return res.redirect(`/instructors/${id}`)
    })
}

exports.delete = (req, res) =>{
    const {id} = req.body

    const filteredInstructors = data.instructors.filter((instructor)=>{
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json",JSON.stringify(data,null,2), err =>{
        if (err) return res.send("Write file error")

        return res.redirect("/instructors")
    })
}


