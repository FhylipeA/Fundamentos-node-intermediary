// buffer é uma representação de um espaço na memoria de um computador, usado pra transitar dados de uma maneira muito rapida
// feitos para serem tratados/enviados rapidamente a um lugar e depois removidos. É muito performatico e funciona de forma binaria
// pq o computador so entende linguagem binaria isso é oq deixa performatico

const buf = Buffer.from("hello")
// o Buffer.from() é usado para criar um Buffer a partir de uma string ou array.


console.log(buf.toJSON());
// resposta do log para "ok":   <Buffer 6f 6b> que é um exadecimal
// resposta do log para "hello":   <Buffer 68 65 6c 6c 6f> que é um exadecimal
// resposta do log para "hello" em JSON: { type: 'Buffer', data: [ 104, 101, 108, 108, 111 ] }  que agr é um decimal