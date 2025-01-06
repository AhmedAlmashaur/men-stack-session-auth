/* -------------- Express initialization ---------------- */
const express = require('express');
const app = express();
const port = 3000;


/* -------------- dotenv ---------------- */
require('dotenv').config();


/* -------------- Morgan ---------------- */
const morgan = require('morgan');
app.use(morgan('dev'));


/* -------------- Body Parser ---------------- */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* -------------- EJS initialization ---------------- */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


/* -------------- Method Override ---------------- */
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


/* -------------- mongoose ---------------- */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch(err => console.error(err));


/* -------------- Middleware ---------------- */
app.use(express.urlencoded({ extended: true }));


/* -------------- Express-tests ---------------- */
app.get('/connection-testing', (req, res) => {
    res.send('server connected successfully!');
});

app.get('/ejs-testing', (req, res) => {
    res.render('test/ejs-testing');
});


/* -------------- Controllers ---------------- */
const authController = require("./controllers/auth.js");
app.use('/auth', authController);

/* -------------- Routes ---------------- */
//GET
app.get('/', (req, res) => {
    res.render('index');
});



/* -------------- app listener ---------------- */
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
