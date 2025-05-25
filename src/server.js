import http from 'node:http'
import { json } from './middlewares/json.js'
//se escreve dessa forma para se diferenciar os imports internos do node de instalações e imports de terceiros


const users = []
//criei uma variavel contante e defino que ela sera um array

const server = http.createServer(async (req, res) => {
    //metodo de criação do servidor usando essa função do http que recebe uma arrow function como unico parametro
    //a função server receber dois parametros "req" e "res"
    //req é o objeto que representa a requisição e serve para pegar todas as infos que vem com a requisição
    //res é o objeto que representa a resposta e serve para enviar as informações de volta para o cliente

    const { method, url } = req
    //essas sao as duas partes que compoe o http e elas vem da "req"
    // é a soma do metodo com a url que diverenciam os caminhos dentro do backend

    await json(req, res)


    if (method == 'GET' && url == '/users') {
        return res
        .end(JSON.stringify(users))
        //como o resposta nao pode ser de qualquer tipo entao se usa o JSON para transformar o array em uma string que pode ser lida corretamente
    }
    //se a requisição for do tipo GET e a url for /users, então o retorna a msg acima

    if (method == 'POST' && url == '/users') {
        const {name, email} = req.body
        //agr que foi definido o que é o body e como ele vai funcionar eu posso desestruturar ele pra pegar os dados que quero sendo enviados da requisição

        users.push({
            id:1,
            name,
            email
        })

        return res.writeHead(201).end('Criação de usuários')
        // é o metodo utilizado para indicar qual a resposta esperada para aqueal requisição
        // o status code 201 siginiifica que algo foi criado com sucesso
    }
    //se a requisição for do tipo POST e a url for /users, então o retorna a mensagem acima

    return res.writeHead(404).end()
})

server.listen(3333)
//agr que o server ja funciona como um servidor criado com o http usase a função listen para definir em que porta vai funcionar