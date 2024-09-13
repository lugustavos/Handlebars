const express = require("express");
const app = express();
const handlebars = require("express-handlebars").engine;
const bodyParser = require("body-parser");
const post = require("./models/Post");

// Configuração do Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota para cadastrar novos agendamentos
app.post("/cadastrar", function (req, res) {
    console.log("Dados recebidos:", req.body);

    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato ? new Date(req.body.data_contato) : null,
        observacao: req.body.observacao
    }).then(function () {
        console.log("Cadastrado com sucesso");
        res.send("Cadastrado com sucesso");
    }).catch(function (error) {
        console.error("Erro ao cadastrar:", error);
        res.status(500).send("Erro ao cadastrar");
    });
});

// Rota para consultar os agendamentos
app.get("/consulta", function (req, res) {
    post.findAll().then(function (posts) {
        res.render("consulta.handlebars", { posts })
        console.log(posts)
    })
})

// Rota para editar
app.get("/editar/:id", function (req, res) {
    post.findAll({ where: { 'id': req.params.id } }).then(
        function (posts) {
            res.render("editar", { posts })
            console.log(posts)
        }
    )
})

// Rota para a página inicial
app.get("/", function (req, res) {
    res.render("cadastro");
});

// Rota para a página de consulta
app.get("/consulta", function (req, res) {
    res.render("consulta");
});

// Inicia o servidor
app.listen(8081, function () {
    console.log("Servidor rodando em http://localhost:8081");
});