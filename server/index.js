const express = require('express');
const app = express();
const cors=require('cors');
const mongoose = require('mongoose');
const FriendModel =  require('./models/Friends');

app.use(cors());
app.use(express.json());
///Database Connection
mongoose.connect('mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&ssl=false',{ useNewUrlParser: true});

app.post('/addfriend',async(req,res)=>{
    const name=req.body.name;
    const age= req.body.age;
    const friend = new FriendModel({name:name,age:age});
    await friend.save();
    res.send('Success');
});

app.get('/read', async (req, res) => {
    try {
      const friends = await FriendModel.find({});
      res.send(friends);
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).send({ message: 'Error retrieving friends' }); // Send informative error response
    }
  });
  



  
app.listen(3001,()=>{
    console.log('You are connected');
})