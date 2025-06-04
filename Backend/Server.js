require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db'); // ✅ Only once
const authRoutes = require('./router/authRoutes');

const app = express();
connectDB(); // Connect to MongoDB

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(helmet());
app.use(express.json());

const router = require('./router/main'); // or ./routes/authRoutes if that's your actual route
app.use('/', router);
app.use('/Auth', authRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
