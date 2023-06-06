const cors = require("cors")
const fruits = require('./fruits.json')
const express = require("express")
const app = express()

//const logger = require("./logger")
// app.use(logger)


app.use('/fruits',express.json())

app.get('/', (req,res) =>{
    res.send('Return all fruits')
})

app.get('/fruits', (req,res)=>{
    res.send(fruits)
})

app.get('/fruits/:name', (req,res)=>{
    const name = req.params.name.toLowerCase()
    console.log()
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase()==name)
    if (fruit == undefined){
        //do something
        res.status(404).send()
    }else{
        res.send(fruit)
    }
})

app.post('/fruits',(req,res)=>{
    //check if fruit is in json
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == req.body.name.toLowerCase())
    if (fruit !=undefined){
        res.status(409).send()
    }else{
        // add the fruit to the json
        fruits.push(req.body)
        res.status(201).send(req.body)
    }
})

app.delete('/fruits/:name',(req,res)=>{
    //see if it exists
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase()== req.params.name.toLowerCase())
    if (fruit == undefined){
        //can not delete anything
        res.status(404).send()
    }else{
        // delete part
        fruits.splice(fruits.indexOf(fruit), 1)
        res.status(204).send()
    }
})

// app.listen(port, ()=>{
//     console.log(`Fruity Api listening on port ${port}`)
// })

module.exports = app
