const express = require('express')
const app = express()
const fs = require('fs')

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.get('/',(req, res) => {
    
    res.redirect('/index')

})

app.get('/index', (req, res) => {
    
    res.render('index', { name: "Laura"})
})

app.get('/south-indian', (req, res) => {

    fs.readFile('./public/data.json', (err, data) => {
    if(err){ 
        console.log(err)
    }
    else {
    res.render('south-indian', { "data": JSON.parse(data) })
    }
   })

})

app.use((req, res) => {

    res.status(404).send("Oops! The requested page was not found.")
})

app.listen(3000)