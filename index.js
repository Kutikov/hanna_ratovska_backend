const express = require('express');
const fs = require("fs");
const PORT = 5000;
const app= express();

app.use(express.json());

const dataJson = fs.readFileSync('./users.json', 'utf-8');
const usersArr = JSON.parse(dataJson);

app.get('/', (req, res, next) => {
    res.json(usersArr);
});

app.get('/users/:id', (req, res) => {
    const id = +req.params.id;

    if (id) {
        const user = usersArr.find(user => user.id === id);
        console.log(user)
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } else {
        res.status(400).send('No id in query');
    }
})

app.put('/users', (req, res) => {
    const {name, age, city} = req.body;

    if(name && age && city) {
        const user = usersArr.find(user => user.name === name);
        if(user) {
            res.status(409).send('User exist')
        } else {
            usersArr.push({
                id: usersArr[usersArr.length - 1].id + 1,
                name: name,
                age: age,
                city: city
            })
            fs.writeFileSync('./users.json', JSON.stringify(usersArr), 'utf-8');
            res.json(usersArr);
        }
    } else {
        res.status(400).send('Not full info')
    }
})

app.patch('/users/settings/:id', (req, res) => {
    const id = +req.params.id;
    const age = req.body.age;

    if(id && age) {
        const doesIdExist = usersArr.some((user) => user.id === id);
        if(doesIdExist) {
            const updatedArr = usersArr.map((user) =>
                user.id === id ?
                    {
                        ...user,
                        age: age
                    } :
                    user);
            res.json(updatedArr);
            fs.writeFileSync('./users.json', JSON.stringify(updatedArr), 'utf-8');
        } else {
            res.status(404).send('User not found')
        }
    } else {
        res.status(400).send('Not full info')
    }
})

app.delete('/users/:id', (req, res) => {
    const id = +req.params.id;

    if (id) {
        const userOnDelete = usersArr.find(user => user.id === id);
        if(userOnDelete) {
            const newUsersArr = usersArr.filter(user => user !== userOnDelete)
            fs.writeFileSync('./users.json', JSON.stringify(newUsersArr));
            res.json(newUsersArr)
        } else {
            res.status(404).send('User not found');
        }
    } else {
        res.status(400).send('No name in query');
    }
})

app.listen(PORT, ()=> {
    console.log(`It\'s started on port ${PORT} at ${(new Date()).toLocaleString('uk-UA')}`)
})
