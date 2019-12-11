const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const PORT = 7768;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const adapter = new FileSync('./mock/db.json');
const db = lowdb(adapter);

app.get('/user/login', (req, res) => {
  const { user, pwd } = req.body;
  const response = {
    metadata: {
      date: new Date().toUTCString()
    },
    data: [
      db.get('user').find({user,pwd}).value()
    ]
  }
  res.send(response);
})

app.get('*', (req, res) => {
  res.send('NOT FOUND');
})

app.listen(PORT, () => {
  console.log(`server listening ${PORT}`);
})