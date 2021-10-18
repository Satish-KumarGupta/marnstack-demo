const express =require('express');
const mongoose =require('mongoose')
const morgan =require('morgan')
const path =require('path');
// const cors=require('cors');
const app=express();
// step 1
const PORT =process.env.PORT||8080;

const routes= require('./routes/api')
// step 2
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern_youtube',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected',()=>{
    console.log('mongoose is connected!!')
})

// data parsing
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.use(cors());
// Http request logger
app.use(morgan('tiny'));
app.use('/api',routes)
// routes

// step 3
if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`)); 