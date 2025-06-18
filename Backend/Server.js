require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db'); // ✅ Only once
const authRoutes = require('./router/authRoutes');
const UserInfo = require('./router/UserInfo');
const rowDataRoutes = require('./router/rowDataRoutes')

const app = express();
connectDB(); // Connect to MongoDB

app.use(cors({
    origin: ['http://localhost:5173', 'https://t9m2z60t-5173.inc1.devtunnels.ms'],
    credentials: true,
}));

app.use(helmet());
app.use(express.json());

const router = require('./router/main'); // or ./routes/authRoutes if that's your actual route
app.use('/', router);
app.use('/Auth', authRoutes)
app.use('/api/users', UserInfo);
app.use('/api/rows', rowDataRoutes); // Makes endpoints clearer


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
