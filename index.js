const express = require('express');
const fs = require("fs");
const PORT = 5000;
const app= express();
const {getUser, getAllUsers, addUser, setUser, deleteUser} = require("./users/index");

app.use(express.json());

app.get('/', (req, res, next) => {
    getAllUsers(req, res)
});

app.get('/users/:id', (req, res) => {
    getUser(req, res)
})

app.put('/users', (req, res) => {
    addUser(req, res)
})

app.patch('/users/settings/:id', (req, res) => {
    setUser(req, res)
})

app.delete('/users/:id', (req, res) => {
    deleteUser(req, res)
})

app.listen(PORT, ()=> {
    console.log(`It\'s started on port ${PORT} at ${(new Date()).toLocaleString('uk-UA')}`)
})
