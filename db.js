const mongoose= require ('mongoose')
const url="mongodb+srv://GCWarriors:warpkiparosr@69@cluster0.34eze.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const db=async()=>{
    await mongoose.connect(url);
}
module.exports=db