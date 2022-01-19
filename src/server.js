const { response } = require("express")
const express = require("express")
const server = express()

//configurar pasta public
server.use(express.static("public"))



//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true //guardar em mmemoria versão velha
})

//configurar caminhos da minha aplicação
//pagina inicial
//req: requisição
//res: resposta
server.get("/", (req, res) => { //get: config de rota
    //res.sendFile(__dirname + "/views/index.html") //devolver nome do direótio (__dirname)
   return res.render("index.html", { title: "Um título"}) //alteração possivel devido ao nunjucks
})

server.get("/create-point", (req, res) => { //get: config de rota
    //res.sendFile(__dirname + "/views/create-point.html") //devolver nome do direótio (__dirname)
   return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

//ligar o servidor
server.listen(3000)