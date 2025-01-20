const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { PORT } = require('./config/environment');
const connectDB = require('./config/database');
const errorHandler = require('./core/middleware/error');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('', routes);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

module.exports = app;
