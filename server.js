const express = require('express')

const app = express()

let cors = require('cors')

const fs = require('fs');

const user = require('./user.json')

app.use(express.json())
app.use(cors())


// get 
app.get('/users', (req, res) => {
    res.status(200).json(user)
})

// // post 
app.post('/user', (req, res) => {

    console.log(req.body)
    const newUser = req.body;

    const maxId = user.reduce((max, us) => (us.id > max ? us.id : max), 0);

    newUser.id = maxId + 1;

    user.push({...newUser, date: null});

    fs.writeFile('./user.json', JSON.stringify(user, null, 2), (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erreur lors de l'écriture dans le fichier JSON" });
        } else {
            res.status(200).json(user);
        }
    });
});


app.listen(3000, () => {
    console.log("Serveur à l'ecoute")
})