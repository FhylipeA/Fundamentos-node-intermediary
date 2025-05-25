//referencia do funcionamento da class no arquivo "fundamental.js"

import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 5) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 1000)
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    //usando o metodo posto pq ele é o que envia informações na requisição
    body: new OneToHundredStream(),
    //é possivel enviar uma stream no corpo de uma requisição
    duplex: 'half'
    //obrigatorio ao enviar uma stream no fetch
}).then(response => {
    return response.text() // entao espera a resposta do fetch e transforma em texto
}).then(data => {
    console.log(data) // pega a resposta de texto que foi recebida e apenas imprime no console
})