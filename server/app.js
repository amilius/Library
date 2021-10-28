const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cross origin requests
app.use(cors());

mongoose.connect('connectionstring to mongoDB');
mongoose.connection.once('open', () => {
    console.log('connected to db');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('listening for req 4000xxx');
})