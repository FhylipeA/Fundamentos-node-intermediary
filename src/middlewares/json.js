export async function json(req, res) {
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
        // estou criando uma nova propriedade dentro do meu req chamada body qeu contem esse metodo
        //tratamento necessario pq oq ele ta tentando definor assim o funcionamento da stream faz ele entender que toda requisição precisa de um body e como um GET muitas vezes nao precisa é tem qeu haver esse tratamento
    } catch {
        req.body = null
        //estou dizendo qeu caso nao consiga executar o codigo acima é pra considerar o body como nulo
    }

    res.setHeader('Content-type', 'application/json')
    // "setHeader" define que eu estarei estabelecendo o meu caceçalho e ele recebe dois parametros
    // "Content-type" define que eu vou dizer qual o meu tipo de conteudo
    // "application/json" é a especificação do meu tipode conteudo
}