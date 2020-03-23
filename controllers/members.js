const fs = require("fs")
const data = require("../data.json")
const {age,date} = require("../utils")

exports.index = (req,res) =>{
    return res.render("members/index",{members:data.members})
}

exports.show = (req, res)=>{
    const {id} = req.params

    const foundMember = data.members.find(member=>{
        if(id == member.id){
            return true
        }
    })

    if(!foundMember) return res.send("Member não encontrado")

    const member = {
        ...foundMember,
        age: age(foundMember.birth),
    }

    return res.render("members/show",{member})
}

exports.create = (req,res) =>{
    return res.render('members/create')
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
    const id = Number(data.members.length + 1)

    data.members.push({
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
        
        return res.redirect("/members")
    })
}

exports.edit = (req,res) =>{
    const {id} = req.params

    const foundMember = data.members.find(member=>{
        if(id == member.id){
            return true
        }
    })

    if(!foundMember) return res.send("Member não encontrado")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth)  // yyyy-mm-dd
    }

    return res.render('members/edit',{member})
}

exports.put = (req, res) => {
    const {id} = req.body
    let index = 0

    const foundMember = data.members.find((member,foundIndex)=>{
        if(id == member.id){
            index = foundIndex
            return true
        }
    })

    if(!foundMember) return res.send("Member não encontrado")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id:Number(req.body.id)
    }
    data.members[index] = member

    fs.writeFile("data.json",JSON.stringify(data,null,2), err =>{
        if(err) return res.send('Write error')

        return res.redirect(`/members/${id}`)
    })
}

exports.delete = (req, res) =>{
    const {id} = req.body

    const filteredMembers = data.members.filter((member)=>{
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json",JSON.stringify(data,null,2), err =>{
        if (err) return res.send("Write file error")

        return res.redirect("/members")
    })
}