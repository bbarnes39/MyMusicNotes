const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(
    express.json(),
    express.urlencoded({ extended: true }),
    cors({credentials: true, origin: 'http://localhost:3000'}),
    cookieParser()
);

require("./config/mongoose.config");
require('dotenv').config();
require('./routes/userRoutes')(app);
require('./routes/trackReviewRoutes')(app);

app.listen(8000, () => console.log("The server is all fired up on port 8000"));