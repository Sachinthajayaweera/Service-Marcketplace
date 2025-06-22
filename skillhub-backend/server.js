const express = require('express');
const cors = require('cors');
const sequelize = require('./models/index');
const User = require('./models/user');
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', serviceRoutes);

sequelize.sync().then(()=> {
    app.listen(process.env.PORT, () =>{
        console.log(`Server running on port ${process.env.PORT}`);

    });
});