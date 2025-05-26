import fs from 'node:fs/promises'

const databasePath = new URL('../../db.json', import.meta.url)
// "URL" é uam classe interna do node que recebe dois parametros: o nome do arquivo final, e o caminho relativo para a criação


export class Database {
    #database = {}
    //crinahdo a database como um objeto é possivel que ela receba varios tipos de dados como arrays por exemplo
    // adicionar o "#" faz com que se torne um sistemaq de propriedades e metodos privados assim nao pode acessar o database diretamente em outros lugares

    constructor() {
        //metodo que lê o arquivo | ele recebe dois parametros: o databasePath para saber onde ler o arquivo e o tipo de encoding
        fs.readFile(databasePath, 'utf8')
        .then(data => { // entao depois de ler o arquivo ele manda os dados para a database
            this.#database = JSON.parse(data)
        })
        .catch(() => {
            this.#persist()
            //caso esse aquivo nao exista chama o metodo persist para criar o arquivo mesmo que vazio
        })
    }

    #persist() {
        // é o metodo que vai escrever o banco de dados em um arquivo fisico
        fs.writeFile(databasePath, JSON.stringify(this.#database))
        //metodo que cria o arquivo que salva os dados e sera criando em json por torna masi facil e o writeFile so aceita strings
    }







    select(table) {
        //recebe as tabelas onde serao procurados os dados
        const data = this.#database[table] ?? []
            // procura dentro de database alguma chave que seja o nome de uma tabela e retorna os dados se nao retorna um array vazio
        return data;
    }

    insert(table, data) {
        //esse metodo recebe a tabela que que sera usada e os dados
        // verificar se ja existe algum dado enserido na tabela, caso sim so adicionar, caso nao criará outra tabela

        if(Array.isArray(this.#database[table])) {  //se ja existe um array enserino nessa tabela
           this.#database[table].push(data) //entao adiciono o dado dentro do array
        } else {
            this.#database[table] = [data] //se nao criar uma nova tabela com o dado
        }

        this.#persist() // vai ser chamado toda vez quem uma nova informação for enserida no banco de dados

        return data;
    }
}