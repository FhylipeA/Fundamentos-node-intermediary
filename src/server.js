import http from 'node:http'
//se escreve dessa forma para se diferenciar os imports internos do node de instalações e imports de terceiros
//função que cria IDs codificados para os novos usuariosS
import { json } from './middlewares/json.js'
import { routes } from './routes.js'




const server = http.createServer(async (req, res) => {
    //metodo de criação do servidor usando essa função do http que recebe uma arrow function como unico parametro
    //a função server receber dois parametros "req" e "res"
    //req é o objeto que representa a requisição e serve para pegar todas as infos que vem com a requisição
    //res é o objeto que representa a resposta e serve para enviar as informações de volta para o cliente

    const { method, url } = req
    //essas sao as duas partes que compoe o http e elas vem da "req"
    // é a soma do metodo com a url que diverenciam os caminhos dentro do backend

    await json(req, res)

    const route = routes.find(route =>{
        //encontra uma rota onde...
        return route.method === method && route.path === url
        // o metodo é igual ao metodo que esta sendo requisitado e que o path seja igual a url requisitada
    })

    if (route) { //caso eu ache uma rota 
        return route.handler(req,res) //passa para a chamada oq ela precisa receber
    }

    return res.writeHead(404).end()
})

server.listen(3333)
//agr que o server ja funciona como um servidor criado com o http usase a função listen para definir em que porta vai funcionar