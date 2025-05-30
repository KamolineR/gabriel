// importação
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const SECRET = 'zesxrdctfvgybuhnimouny08bt7vcr65ex4wsdsfhçlkm';
const users = []; //"Banco de dados" em memória

app.post("/register", async (req, res)=>{
    const {email, password} = req.body;
    const passwordCrypt = await bcrypt.hash(password, 8);
    users.push({email, password:passwordCrypt})
    res.status(201).send("Usuário registrado com sucesso")
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = users.find(u => u.email === email);
    if(!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send("Credenciais inválidas")
    }
    const token = jwt.sign({email}, SECRET, {expiresIn: '1h'});
    res.json({token})
})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if(!token) return res,sendStatus(401);

    jwt.verify(token, SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

//Criar a rota GET

app.listen(3000, () => console.log("rodando"))
