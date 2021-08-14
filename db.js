const mongoose = require ('mongoose')
const url = "mongodb+srv://GCWarriors:warpkiparosr@69@cluster0.34eze.mongodb.net/DevFestBITS?retryWrites=true&w=majority"
const db = async()=>{
    await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('Db Connected')
}

module.exports = db