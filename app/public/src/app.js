const path = require('path')

const express = require('express')

const hbs = require('hbs')

const app = express()

const port = process.env.PORT || 3000

//Define paths for express config 
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handle bars engine location

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve 

app.use(express.static(path.join(__dirname, '../public')))



app.listen(port, ()=>{
    console.log('server is up on port '+ port)
})

