const express = require('express');
const server = exp();


server.use(express.json())
server.use(express.urlencoded({extended:true}))



server.listen(5000,()=>{
    console.log('Server started at http://localhost:5000');
})