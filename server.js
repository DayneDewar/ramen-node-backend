const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const db = require('./app/models');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
}

db.sequelize.sync();

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({message: "Hello Dayne!"});
})

require('./app/routes/store.routes')(app);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})