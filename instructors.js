const fs = require("fs")
const data = require("./data.json")

//create - exporta o post
exports.post =(req, res)=>{
    const keys = Object.keys(req.body) // transforma os dados do body(formulario) em um array

    for(key of keys){
        if(req.body[key] == "") {
            return res.send("Por favor, preenche todos os campos")
        }
    }

    req.body.created_at = Date.now()
    req.body.birth = Date.parse(req.body.birth)

    data.instructors.push(req.body)
    
    fs.writeFile("data.json",JSON.stringify(data,null,2),(err)=>{

        if(err) return res.send("Falha ao escrever no arquivo!")
        
        return res.redirect("/instructors")
    })

   // return res.send(req.body)
}

