

const express = require('express');

const app = express();
const PORT = 3000;

let users = [
    { name: 'User 1', id: 1},
    { name: 'User 2', id: 2},
    { name: 'User 3', id: 3},
    { name: 'User 4', id: 4},
]

/////it enables our server to read JSON data 
const urlParser = express.json();
app.use(urlParser);



app.get("/",(req,res)=>{
    res.statusCode = 200;
    // res.json([
    //     { name: 'User 1'},
    //     { name: 'User 2'},
    //     { name: 'User 3'},
    //     { name: 'User 4'},
    // ]);
    res.send("Hello World")
})

app.get("/home",(req,res)=>{
    res.send("<h1>this is home  page<h1/>")
})

app.get("/login",(req,res)=>{
    res.send("<h1>this is login  page<h1/>")
})


app.get("/signin",(req,res)=>{
    res.send("<h1>this is sigin page<h1/>")
})

app.get('/getallusersdata',(req,res)=>{

    res.statusCode = 200;
    res.json(users)
})

// if method === GET && URL === '/users/:id'

app.get('/users/:id', (req, res) => {
    // console.log(req,'reqreq')
    // res.statusCode = 200;

    const user = users.find((usr) => usr.id === parseInt(req.params.id));
    if(!user) {
        return res.send(`<h1>User ${req.params.id} Not Found</h1>`)
    }
    res.json(user)
})


// if method === DELETE && URL === '/users/:id'
app.delete('/user/:id', (req, res) => {
    // res.statusCode = 200;
    
    const filterUser = users.filter((usr) => usr.id !== parseInt(req.params.id));
    users = filterUser;
    res.send('<h1>User Delete Successfully</h1>')
})


app.post('/create-user', ( req, res ) => {
    if(req.body.name) {
        res.statusCode = 201;
        const newUser = users.length + 1;
        users.push({ 
            name: req.body.name , 
            id: newUser
        })
    
        res.send('<h1>User Created Successfully</h1>')
    } else {
        res.statusCode = 400;
        res.send('<h1>Name Field is Missing</h1>')
    }

})

app.put('/update/:id',(req,res)=>{


    const user = users.find((usr) => usr.id === parseInt(req.params.id));
   
        user.name = req.body.name
   
      res.send("user update successfully")
})


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})