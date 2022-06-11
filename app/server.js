const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cors = require("cors")
const app = express()
const studentRouter = require('./routers/studentRouter')
const bookRouter = require('./routers/bookRouter')
const schoolRouter = require('./routers/schoolRouter')
const studentbookAssociationRouter = require('./routers/studentbookAssociationRouter')
const searchStudentRouter = require('./routers/searchStudent.js')
const detailedStudentRouter = require('./routers/detailedStudent.js')
const createStudentRouter = require('./routers/createStudent.js')


var corsOptions = {
  origin: "http://localhost:8082"
};

const viewsPath = path.join(__dirname,'./templates/views')
const partialsPath = path.join(__dirname,'./templates/partials')


// Setup handle bars engine location

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve 

app.use(express.static(path.join(__dirname, './public')))

app.use(cors(corsOptions));
// parse requests of content-type - application/json

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: true }));
// simple route

app.get("/", (req, res) => {
  res.render('homePage.hbs', {
      title: "home page",
      name: "prabhat"
  })
});

app.get("/createStudent", (req, res) => {
    res.render('createStudent.hbs', {
        title: "create student",
        name: "prabhat"
    })
  });


app.use(studentRouter);
app.use(bookRouter);
app.use(schoolRouter);
app.use(studentbookAssociationRouter);
app.use(searchStudentRouter);
app.use(detailedStudentRouter);
app.use(createStudentRouter);
// set port, listen for requests
const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

