const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');
app.use(cors()); 

app.use(bodyParser.json({limit:"4MB"}));
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('profileImage');
    const profileImageCollection = db.collection('profileImage');
    const profileImageRouter = createRouter(profileImageCollection);
    app.use('/api/profileImage', profileImageRouter);
  })
  .catch(console.error);


app.listen(3005, function() {
  console.log(`Vinder profileImage server running on port ${this.address().port}`);
});