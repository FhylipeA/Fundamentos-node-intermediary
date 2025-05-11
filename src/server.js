//se escreve dessa forma para se diferenciar os imports internos do node de instalações e imports de terceiros
import http from 'node:http'

//metodo de criação do servidor usando essa função do http que recebe uma arrow function como unico parametro
const server = http.createServer((req, res) => {
    //a função server receber dois parametros "req" e "res"
    //req é o objeto que representa a requisição e serve para pegar todas as infos que vem com a requisição
    //res é o objeto que representa a resposta e serve para enviar as informações de volta para o cliente

    return res.end("Hello word")
})

//agr que o server ja funciona como um servidor criado com o http usase a função listen para definir em que porta vai funcionar
server.listen(3333)