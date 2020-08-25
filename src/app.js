const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();



app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const { url, title, techs } = request.body;
    const repo = { id: uuid(), url, title, techs, likes: 0 };
    repositories.push(repo);
    return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const { url, title, techs } = request.body;
    const index = repositories.findIndex(r => r.id == id);
    if (index < 0) {
        return response.status(400).json({ error: "repository not found" });
    }
    const repoFound = repositories[index];
    const repo = { id: id, url, title, techs, likes: repoFound.likes };
    repositories[index] = repo;
    return response.json(repo);

});

app.delete("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const { url, title, techs } = request.body;
    const index = repositories.findIndex(r => r.id == id);
    if (index < 0) {
        return response.status(400).json({ error: "repository not found" });
    }
    repositories.splice(index, 1);
    return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;
    const index = repositories.findIndex(r => r.id == id);
    if (index < 0) {
        return response.status(400).json({ error: "repository not found" });
    }
    const repo = repositories[index];
    repo.likes = repo.likes + 1;
    return response.json({ likes: repo.likes });


});

module.exports = app;
