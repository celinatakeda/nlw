import express from 'express';
import cors from 'cors';
import { routes } from './route';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// GET, POST, PUT, PATCH, DELETE

// GET = Buscar informações
// POST = Cadastrar informações
// PUT = Atualizar informações de uma entidade
// PATCH = Atualizar uma informação única de uma entidade
// DELETE = Deletar uma informação

/*
app.get('/users', (req, res) => {
    return res.send('Hello World');
})
*/

app.listen(process.env.PORT || 3000, () => {
    console.log('HTTP server running')
});

//SQLite 
//Prisma