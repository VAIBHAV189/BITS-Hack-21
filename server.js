const express = require('express');
const server = express();


server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.use(express.static('public'));


server.listen(5000,()=>{
    console.log('Server started at http://localhost:5000');
})