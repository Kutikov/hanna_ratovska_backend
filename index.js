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

app.post('/users', (req, res) => {
    const {name} = req.query;
    if (name) {
        const user = usersArr.find(user => user.name === name);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } else {
        res.status(400).send('No name in query');
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

app.delete('/users', (req, res) => {
    const {name} = req.query;
    if (name) {
        const userOnDelete = usersArr.find(user => user.name === name);
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
