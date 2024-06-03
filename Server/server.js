const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

// Configuração do CORS para permitir todas as origens (para testes)
app.use(cors());

const imagensFolder = path.join(__dirname, "..", "src", "assets", "imagens");

console.log("Pasta de imagens:", imagensFolder);

app.get("/listar-imagens", (req, res) => {
  console.log("Recebida requisição para listar imagens");
  try {
    const files = fs.readdirSync(imagensFolder);
    console.log("Arquivos encontrados:", files);
    const imageUrls = files.map((file) => `assets/imagens/${file}`);
    res.json(imageUrls);
  } catch (error) {
    console.error("Erro ao listar imagens:", error);
    res.status(500).send("Erro ao listar imagens");
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor Node.js rodando na porta ${port}`);
});
