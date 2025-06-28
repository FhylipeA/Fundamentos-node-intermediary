import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = database.select('users') //pega os dados que vem da tabela de usuarios 

            return res.end(JSON.stringify(users))
            //como o resposta nao pode ser de qualquer tipo entao se usa o JSON para transformar o array em uma string que pode ser lida corretamente
        }
    },

    {
        method: 'POST',
        path: '/users',
        handler: (req, res) => {
            const { name, email } = req.body
            //agr que foi definido o que é o body e como ele vai funcionar eu posso desestruturar ele pra pegar os dados que quero sendo enviados da requisição

            const user = {
                id: randomUUID(), //simplesmente chama a função onde cria o ID
                name,
                email
            } // agr eu estou disendo como vai ser o meu dado

            database.insert('users', user) //ativando a função insert dizendo qual a inha tabela e qual o dado que vou receber

            return res.writeHead(201).end('Criação de usuários')
            // é o metodo utilizado para indicar qual a resposta esperada para aqueal requisição
            // o status code 201 siginiifica que algo foi criado com sucesso
        }
    }
]