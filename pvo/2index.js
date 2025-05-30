const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const SECRET = 'zesxrdctfvgybuhnimouny08bt7vcr65ex4wsdsfhçlkm';
const users = [];
const posts = [
    (id:1, titulo: "Projeto de Inovação", comentários: []),
    (id:2, titulo: "Semana Acadêmica", comentários: []),
]

//Cadastro do usuário = POST
//Login com JWT = POST
//autenticar o Token(Função)

//Rota pública para listar todos os posts
app.get('/posts', (req, res)=> res.json(posts));

//Rota protegida para adiconar comentários nos posts
//rota para teste => http://localhost/posts/1/comments

app.post('/posts/:id/comments/', verificarToken,(req, res)=> [
    const post = post.find(p => p.id == req.params.id);
    if(!posts) return res.status(404).send('Post não encontrado');


    const {texto} = req.body;
    if(!texto || texto.trim() === ''){
        return res.status(400).send('comentário vazio');
    }

    post.comentarios.push({
        autor: req.usuario.email,
        texto

    })

    res.send ('Comentario adicionado: ');
])

app.listen(3000, ()=>console.log("Servidor rodando na porta 3000"))