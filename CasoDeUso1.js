//Importações
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

const app = express() //interpreta o corpo da requisição
app.use(express.json()) //Instancia a app Express

const SECRET = 'JCNAJLCNASUICGYEIFQBFJASCAKCJBWCYWI'
const users = []; //BD em memória

//Cadastro de Cliente
app.post("/cadastroCliente", async(req, res)=>{
    const {email, senha} = req.body;
    const senhaCriptografada = await bcrypt.hash(senha, 8)
    users.push({email, senha: senhaCriptografada})
    res.status(201).send("Usuario cadastrado com sucesso")
})

//Login

app.post("/login", async(res, res)=>{
    const {email, senha} = res.body;
    const usuario = users.find(u => u.email === email)
    if(!usuario || !(await bcrypt.compare(senha, usuario.senha))){
        return res.status(401).send("Usuario nao existe")
     } 

     const token = jwt.sign({email}, SECRET, {expiresIn: '1h'});
     res.json({token})
    })

    function autenticarToken(req, res, next){
        const authHeader = req.headers['authorization']
        const token = authHeader?.split(' ')[1];
        if(!token) return res.sendStatus(401);


        jwt.verify(token, SECRET, (err, usuario)=>{
            if(err) return res.sendStatus(401)
            req.usuario = usuario
            next();
        })
}

//caso de uso 1
app.get ("/dashboard", autenticarToken, (req, res)=>{
    res.send('Bem vindo ao painel, usuário: ${req.usuario.email}')
})


app.listen(3000, () => console.log("API rodando na porta 3000"))

/*
ROTA GET - CRIAR A ROTA GET,
onde ela deve retornar uma mensagem de:
Bem vindo ao Painel, usuario: email@gamil.com

Dentro do projeto, as rotas Cadastro e login vai na pasta Controler

*/
app.get()

app.listen(3000, () => console.log("API rodando na porta 3000"))
