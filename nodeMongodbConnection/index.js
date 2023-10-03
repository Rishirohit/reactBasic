const express=require('express');
const app=express();

const mongoose=require('mongoose');
let cors=require('cors');
app.use(cors())
const a=require('./Schema')
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://admin:admin@cluster0.na40yrc.mongodb.net/?retryWrites=true&w=majority",(err)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("database connected");
    }
})

app.use(express.json());

app.get('/',async(req,res)=>{
    const b=await a.find();
    res.json(b)
    
})
app.post('/',async(req,res)=>{
    const b=await a({
        name:req.body.name
    })
    b.save();
    res.json(b)
})
app.get('/:id',async(req,res)=>{
    const {id}=req.params;
    const b=await a.findById(id);
    res.json(b)
})
app.put('/:id',async(req,res)=>{
    const {id}=req.params;
    const b=await a.findById(id);
    b.name=req.body.name;
    b.save();
    res.json(b)
});
app.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    const b=await a.findByIdAndDelete(id);
    res.json("data deleted")

})
app.listen(1500,console.log("server connected")) 