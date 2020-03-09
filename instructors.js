//create

exports.post =(req, res)=>{
    const keys = Object.keys(req.body) // transforma os dados do body(formulario) em um array

    for(key of keys){
        if(req.body[key] == "") {
            return res.send("Por favor, preenche todos os campos")
        }
    }

   return res.send(req.body)
}

