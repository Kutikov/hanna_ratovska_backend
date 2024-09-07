const express = require('express');
const fs = require("fs");
const PORT = 5000;
const app= express();
const {getUser, getAllUsers, addUser, setUser, deleteUser} = require("./users/index");

app.use(express.json());

app.get('/', getAllUsers);

app.get('/users/:id', getUser)

app.put('/users', addUser)

app.patch('/users/settings/:id', setUser)

app.delete('/users/:id', deleteUser)

app.listen(PORT, ()=> {
    console.log(`It\'s started on port ${PORT} at ${(new Date()).toLocaleString('uk-UA')}`)
})
