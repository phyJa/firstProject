// Importar a dependência do sqlite3 e executa a função de verbosidade do objeto
const sqlite3 = require("sqlite3").verbose();

/* Criar o objeto (db) que fará alterações no banco de dados.
Veja que inicialmente é criado o banco de dados com o objeto.
Nota: "." significa diretório raiz do projeto */
const db = new sqlite3.Database("./src/database/database.db"); 

/* Em seguida, mandamos o node executar este arquivo com o
comando node  */

//Podemos agora exportar o banco de dados para ser utilizado pela aplicação. Veja que as linhas abaixo foram um treinamento
//da utilização do objeto db
module.exports = db;


/*
Assim, utilizamos o objeto de banco de dados para nossas operações.
Note que a função serialize() recebe uma função como argumento
*/


//db.serialize(
 //   () => {
        //Utilizando comandos SQL, podemos:
        //1. Criar uma tabela. Nota: Template Literals: nomes das strings com crase
    /*    db.run(`
            CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT,
                name TEXT,
                address TEXT,
                address2 TEXT,
                state TEXT,
                city TEXT,
                items TEXT
            );
        `);

        //2. Inserir dados na tabela. Note que as interrogações são para serem trocadas por valores (de forma dinâmica).
        const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?); `;

        //Inserindo os dados no segundo argumento de .run()
        const values = [
            "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            "Papersider",
            "Guilherme Gemballa, Jardim América",
            "N° 260",
            "Santa Catarina",
            "Rio do Sul",
            "Papéis e papelão"
        ];
        */

        /*
        Veja que no terceiro argumento entra uma função que é tratada como callback, isto é, sua execução
        não interrompe a aplicação
        */
       
        //Defina a função
   /*     function afterInsertData(err) {
            if(err){
                console.log(err);
            } else {
                console.log("Cadastro feito com sucesso");
                //Nota: aqui "this" referencia a resposta dada por run()
                console.log(this);
            }
        }*/

        //Coloque-a no terceiro argumento por referência (sem os parênteses). É passado para ela o erro como argumento
        //db.run(query, values, afterInsertData);
        //A linha anterior foi comentada para não serem mais passados dados para o banco de dados


        




        //3. Consultar os dados da tabela
        
        /* 
        Argumentos de .all():
        1: query
        2: função que lida com os erros e mostra a tabela (1° arg: erros, 2° arg: registros/rows)
        

        db.all(
            `SELECT name FROM places`, 
            function(err, rows) {
                if(err){
                    console.log(err);
                } else {
                    console.log("Aqui estão seus dados:");
                    //Nota: aqui "this" referencia a resposta dada por run()
                    console.log(rows);
                }
            }
        );
        */

        
        //4. Deletar um dado da tabela
/*
        db.run(
            `DELETE FROM places WHERE id = ?`,
            [4],
            function(err) {
                if(err)
                    console.log(err);
                else
                    console.log("Registro deletado com sucesso");
            }
        );

    }
);
*/