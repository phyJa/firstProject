/*
Armazene o express em uma variável através da função require(). Veja que a variável
armazena uma função.
*/
const express = require("express");
/*
Execute a função da variável. Ela retorna um objeto que será armazenado na
variável seguinte.
*/
const server = express();

//Habilitar o uso do req.body na nossa aplicação. Esta linha
//DEVE vir ANTES da requisição do formulário neste arquivo
server.use(express.urlencoded({ extended: true }));

//Pegar o banco de dados
const db = require("./database/db.js");


//Utilizando o TEMPLATE ENGINE
const nunjucks = require("nunjucks");
/*
Configurando o template. O primeiro argumento define o diretório dos arquivos HTML a serem
aprimorados. O segundo argumento define que a variável server é express (veja a conexão entre
nunjucks e express) e que o template
não usará memória Cache. Com isso, devemos trocar .sendFile() nas requisições por .render()
//Requisições:
//Home-page
server.get("/", (req, res) => {res.sendFile(__dirname + "/views/index.html"); } );
//Create-point
server.get("/create-point", (req, res) => {res.sendFile(__dirname + "/views/create-point.html"); } );

*/
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});


//Novas requisições:
/*
Home-page. Repare que no argumento de res.render() é colocado apenas o nome do arquivo.
Isto pode ser feito por causa da configuração do nunjucks: "src/views"
*/
server.get("/", (req, res) => {return res.render("index.html"); } );
//Create-point method get (Acessado pelo usuário)
server.get(
    "/create-point",
     (req, res) => {
         //Os dados do formulário podem ser pegos através da propriedade .query da requisição. São as Query Strings da URL
         //Veja-os no terminal (acessando a página) através da linha seguinte
         //console.log(req.query);
         return res.render("create-point.html"); 
    } 
);

//Create-point method post
// Tente acessar diretamente pelo navegador
// e você não conseguirá. Mas o fará através do formulário
server.post(
    "/savepoint",
    (req, res) => {
        //Req.body: o corpo do formulário
        //console.log(req.body);
        
        //Inserir dados no banco de dados
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
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
        ];

        /*
        Veja que no terceiro argumento entra uma função que é tratada como callback, isto é, sua execução
        não interrompe a aplicação
        */
       
        //Defina a função
        function afterInsertData(err) {
            if(err){
                console.log(err);
                return res.send("Erro no cadastro");
            } else {
                console.log("Cadastro feito com sucesso");
                //Nota: aqui "this" referencia a resposta dada por run()
                console.log(this);
            }
            //return res.send("OK");
            // Envie à página create-point.html um objeto de propriedade saved
            return res.render("create-point.html", {saved: true});
        }

        //Coloque-a no terceiro argumento por referência (sem os parênteses). É passado para ela o erro como argumento
        db.run(query, values, afterInsertData);
        
        /*
        Vamos colocar o OK abaixo dentro da função.
        Assim, o "OK" só será dado quando o cadastro for
        completado.
        */
        //return res.send("OK");
    }
);
//Search-results
server.get(
    "/search", (req, res) => {
        //Verificando se a string de pesquisa está vazia
        //Armazena-a aqui
        const search = req.query.search;        
        /*E verifique. Se estiver, mande o valor 0 para
        a página que mostra o resultado */
        if(search == ""){
            return res.render("search-results.html", { total: 0 });
        }
        
        //Pegar os dados do banco de dados
        db.all(
            /*
            Note as aspas simples no valor
            da interpolação (sintaxe do SQL)
            */
            `SELECT * FROM places WHERE city LIKE '%${search}%' `, 
            function(err, rows) {
                if(err)
                    return console.log(err);
                //Envia a página e envia os dados em places: rows
                else{
                    const total = rows.length;
                    //Descomente a linha seguinte para visualizar os dados passados no GIT BASH
                    //console.log(rows);
                    return res.render("search-results.html", { places: rows, total: total });
                }
            } 
        );

    }
);

//Configurar o caminho do servidor. O pedido da barra / é feito no primeiro argumento
//Página inicial
//req: requisition
//res: response
/*
Note que, tirando a barra, nada específico é pedido ao servidor. 
Ao chegar na barra, o servidor executa a função no segundo argumento de get(). No caso, o
servidor envia uma resposta através da função send():

server.get("/", (req, res) => {res.send("Cheguei aqui");} );
*/
/*Trazendo a página index.html para o / .
Nota: __dirname é uma variável global e contém uma string do caminho
diretório deste arquivo (server.js) 
*/


//Configurar a pasta pública
server.use(express.static("public"));


//Ligar o servidor: .listen(porta em que o servidor está "escutando")
server.listen(3000);
