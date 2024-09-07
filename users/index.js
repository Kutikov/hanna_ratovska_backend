const fs = require("fs");
const {request} = require("express");
const getRandomId = () => Math.floor(Math.random() * 100);

const getData = () => {
    const dataJson = fs.readFileSync('./users/resources.json', 'utf-8');
    const usersArr = JSON.parse(dataJson);
    return usersArr
}

const getAllUsers = (req, res) => {
    const usersArr = getData();
    res.json(usersArr);
}

const getUser = (req, res) => {
    const id = Number(req.params.id);
    const usersArr = getData();

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
}

const addUser = (req, res) => {
    const {name, age, city} = req.body;
    let userId = getRandomId();
    const usersArr = getData();

    while (usersArr.some(user => user.id === userId)) {
        userId = getRandomId()
    }

    if(name && age && city) {
        const user = usersArr.find(user => user.name === name);
        if(user) {
            res.status(409).send('User exist')
        } else {
            usersArr.push({
                id: userId,
                name: name,
                age: age,
                city: city
            })
            fs.writeFileSync('./users/resources.json', JSON.stringify(usersArr), 'utf-8');
            res.json(usersArr);
        }
    } else {
        res.status(400).send('Not full info')
    }
}

const setUser = (req, res) => {
    const id = Number(req.params.id);
    const age = req.body.age;
    const usersArr = getData();

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
            fs.writeFileSync('./users/resources.json', JSON.stringify(updatedArr), 'utf-8');
        } else {
            res.status(404).send('User not found')
        }
    } else {
        res.status(400).send('Not full info')
    }
}

const deleteUser = (req, res) => {
    const id = Number(req.params.id);
    const usersArr = getData();

    if (id) {
        const userOnDelete = usersArr.find(user => user.id === id);
        if(userOnDelete) {
            const newUsersArr = usersArr.filter(user => user !== userOnDelete)
            fs.writeFileSync('./users/resources.json', JSON.stringify(newUsersArr));
            res.json(newUsersArr)
        } else {
            res.status(404).send('User not found');
        }
    } else {
        res.status(400).send('No name in query');
    }
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    setUser,
    deleteUser
}