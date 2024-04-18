const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const User = require('./model/UserModel');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'))

const port = 3000;
const db = "mongodb+srv://devjimin02:Ghostbmer02@gallery.rgbhhiw.mongodb.net/?retryWrites=true&w=majority&appName=gallery";

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({
    storage:storage
})


// app.post('/upload', upload.single('file'), (req, res) => {
//     const { email } = req.body;
//     console.log(req.file);
//     console.log(email);
//     // Now you can use both req.file and email as needed
//     res.status(200).json({ message: 'File uploaded successfully' });
// });
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { email } = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).json({message:'User already exists'})
            console.log("user already existing")
        }else{
            const user = await User.create({
                email:email,
                image:req.file.filename
            })
            res.status(200).json(user);
            return res.status(200).json({message:'User account created'});
        }
        
    } catch (error) {
        
    }
    
});



//get image
app.get('/getuserdata', async (req,res)=>{
    try {
        const user = await User.find();
        res.status(200).json(user);
        console.log('user infor:',user)
        
    } catch (error) {
        console.log(error)
        console.log('error fetching user data')
        
    }
})

app.get('/',(req,res)=>{
    res.send('Hello World')
})

mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((error)=>{
    console.log('Failed to connect to MongoDB with error: ' + error);
})