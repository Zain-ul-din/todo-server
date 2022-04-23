// server from scratch

// const http = require('http')

// const host = 'localhost' // 127.0.0.1
// const port = 3000

// const [host , port] = ['localhost' , 8000]

// const server = http.createServer((req , res)=>{

//     // !! very complex 
//     if (req.method == 'POST') {
//         // post data
//         let body = ''

//         req.on('data' , chunck => {
//             body += chunck
//         })

//         req.on('close' , ()=>{
//             console.log(body)
//         })

//         res.writeHead(201)
//         res.end('ok boi')
//     }

//     res.write('Hello World ,' , (err)=> console.log(err))
//     res.end('hey')
// })


// // listen to server
// server.listen(port , host , ()=>{
//    // http://localhost:8000/
//     console.log(`Server is running on http://${host}:${port}/`)
// })


/// Express

// npm i express  body-parser  morgan

const Express = require('express')
const bp = require('body-parser')
const morgan = require('morgan')


const app = Express()

// middle ware 

app.use(bp.urlencoded({extended : true}))
app.use(bp.json())

const port = process.env.PORT // deployment port

// Listen
app.listen(port , ()=>{
    console.log(`Server is running ... `)
   // console.log(`Server is running on localhost:8000 `)
})

const db = []

// Post
app.post('/todo' , (req , res)=>{
    //req.query
    const newToDo = {
        id : db.length + 1 ,
        text : req.body.text
    }

    console.log(newToDo.text)
    db.push(newToDo)
    res
    .status(201)
    .json(newToDo)
})

// Get
app.get('/todo' , (req , res)=>{
    res
    .status(200)
    .json(db)
})


// Get todo by id 
app.get('/todo/:id' , (req , res)=>{
    const id = parseInt(req.params.id)
    const filterData = db.filter (data => data.id === id)
    res
    .status(200)
    .json(filterData)
})

// deploy server on  heroku

// add scripts in package.JSON 

// some files added