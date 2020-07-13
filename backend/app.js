if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const discordClient = require('./discordClient');

const app = express();

app.use(cookieParser());
app.use(cors({credentials: true, origin: true}));
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
.then(()=>{
    console.log('MongoDB Connected...',);
})
.catch((err)=>{
    console.log('MongoDB Error: ' + err);
});

const authRoutes = require('./routes/authRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const licenseRoutes = require('./routes/licenseRoutes');

app.use('/auth', authRoutes);
app.use('/stripe', stripeRoutes);
app.use('/license', licenseRoutes);

discordClient.initClient();

module.exports = app;