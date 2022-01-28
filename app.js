const express = require('express');
const mongoose = require('mongoose');
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const app = express();
const port = process.env.PORT || 3000;
const URL = 'mongodb://localhost/HumanApiDB';
const swaggerJsDocs = YAML.load('./swagger.yml');
const humanRouter = require('./routes/human');

mongoose.connect(URL, { useNewUrlParser: true });

const con = mongoose.connection;

con.on('open', () => console.log('connected in mongodb.'));
con.on('error', () => console.log('error in mongodb.'));
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.use('/api', humanRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(`Access the swagger at this link http://localhost:${port}/api-docs/`);
});