const fs = require("fs")
const data = require("./data.json")

//create - exporta o post
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

//Show
exports.show = (req, res)=>{
    const {id} = req.params

    const foundInstructor = data.instructors.find(instructor=>{
        if(id == instructor.id){
            return true
        }
    })

    if(!foundInstructor) return res.send("Instructor não encontrado")

    function age(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if(month < 0 || month == 0)
    }

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services:foundInstructor.services.split(","),
        created_at:"",
    }

    return res.render("instructors/show",{instructor})
}

