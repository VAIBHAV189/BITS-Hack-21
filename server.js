const express = require('express');
const server = express();

server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.use(express.static('public'))

const PORT = process.env.PORT || 6979
server.listen(PORT,()=>{
    console.log('Server started at http://localhost:'+PORT);
})