const express = require('express');
const cors = require('cors');
const sequelize = require('./models/index');
const User = require('./models/user');
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const orderRoutes = require ('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', orderRoutes);
app.use('/api', reviewRoutes);
app.use('/api', dashboardRoutes);
app.use('/api/services', require('./routes/serviceRoutes'));

sequelize.sync().then(()=> {
    app.listen(process.env.PORT, () =>{
        console.log(`Server running on port ${process.env.PORT}`);

    });
});