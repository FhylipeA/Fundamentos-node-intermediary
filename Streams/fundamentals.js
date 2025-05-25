// "Process" é uma variavel global do node
//"stdin" é tudo que for digitado no terminal
// geralmente streams sao conectadas
//stdout é o retorno da aplicação
//"pipe" é um metodo de encaminhamento


//basicamente oq foi feito nesse trecho de codigo foi uma função para que oq eu diga no terminal usando o "stdin" seja copiado e mandado de volta pelo "stdout" usado o pipe como um metodo de encaminhamento
/*
process.stdin
    .pipe(process.stdout)
*/


//importando "Readable, Writable, Trasform" de dentro do node que são tipos de stream. Sendo uma de leitura, uma de escrita e uma de transformação respectivamente
import {Readable, Writable, Transform} from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    //toda stream Readable precisa receber o metodo "_read"
    //a funcção de toda stream Readable é enviar dados / fornecer informações
    _read() {
        //basicamente soma mais 1 a cada vez que o metodo read for executado
        const i = this.index++

        setTimeout(() => {
            if(i > 100) {
            //push é o metodo que se usa para que uma readable stream forneça informaçoes a quem estiver consumindo ela 
            this.push(null)
            //colocar o nulo basicamente quer dizer que nao tem mais informaçoes a serem fornecidas
        } else {
            // stream nao podem receber dados em formatos primitivos como strings, numbers, boolleasn e etc... eles devem ser transformados em buffers
            const buf = Buffer.from(String(i))
            //o buffer não aceita numeros entao devo transformar ele primeiro em string
            //dessa forma eu digo de onde eu quero receber a informação que eu quero transformar em buffer
            this.push(buf)
            //estou afirmando que se ainda nao chegou a 100 eu quero que as informaçoes continuem sendo adicionadas
        }
        }, 1000)
    }
}


class InverseNumberStream extends Transform {
    //transformarei os dados em numeros negativos
    _transform(chunk, encoding, callback) {
        //chunk é o dado que estou recebendo
        //encoding é o tipo de dado que estou recebendo
        //callback é o metodo que eu preciso chamar para que o dado seja processado
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
        // o primeiro parameltro de uma callback é o erro
        // o segundo é o dado transformado
    }
}


//é uma stream de escrita, que pega o dado de uam stream de leitura
//dentro de uma stream de escrita nao se retorna nada, ela apenas processa o dado. Mas nunca transforma ele em outra coisa
class MultiplyByTenStream extends Writable {
    //multiplica o numero recebido do read por 10
    _write(chunk, encoding, callback) {
        //chunk é o dado que foi recebido da stream de leitura
        //encoding é o tipo de dado que foi recebido
        //callback é uma função que é chamada quando o dado for escrito
        console.log(Number(chunk.toString()) * 10); 
        //como ele é um buffer, ja que veio a stream de "read" é preciso transformar ele em string  
        callback()
        //encerra apos o dado ser recebido
    }
}


//estou dizendo para ler a minha classse e enquanto ela é lida ja vai retornando informações
new OneToHundredStream()
//lendo dados de 1 a 100
    .pipe(new InverseNumberStream())
    //obrigatoria mente le dados de algun lugaar e escreve dados para outro lugar
    .pipe(new MultiplyByTenStream())
    //pocessando esses dados multiplicando-os por 10
