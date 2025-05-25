import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed);

        callback(null, Buffer.from(String(transformed)))
    }
}

const server = http.createServer(async (req, res) => {
    const buffers = []
    //são os pedacinhos que podem de informaçoes que vamos receber, os chunks. Assim eles sao todos armazenados dentro desse array

    for await (const chunk of req) {
        //está dizendo para esperar todos os chunks da requisição 
        //o "await" nao permite que nada seja executado antes do de ler tudo
        buffers.push(chunk)
        //após receber todos os chunks eles serao enfiados para o array buffers
    }

    const fullStreamContent = Buffer.concat(buffers).toString()
    //utiliza o metodo "concat" de Buffer para juntar todos os pedaços de em uam coisa só

    console.log(fullStreamContent)

    return res.end(fullStreamContent)


    return req.pipe(new InverseNumberStream)
    //req pode receber uym pipe pois ele é como um readable stream, Ou seja ele pode receber eler informações, essas que virao do inverseNumberStream
    .pipe(res)
    //O res pode ser considerado uma writable stream, mandando assima resposta processada das streams
})

server.listen(3334)
//so configura um servidor