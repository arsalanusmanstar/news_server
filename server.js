const cors = require('cors')
const express = require('express');
;const MongoClient = require('mongodb').MongoClient
const { postGet } = require('./controllers/post/postGet');
const { postUpdate } = require('./controllers/post/postUpdate');
const { postDelete } = require('./controllers/post/postDelete');
const { postInsert } = require('./controllers/post/postInsert');


const app = express();

const connection = MongoClient.connect('mongodb+srv://starmarketing:Crystalball007@cluster0.u64nt.mongodb.net',
 { useUnifiedTopology: true })

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors())

app.get('/',(req,res) =>{
    res.send('Server is ok')
});

app.get('/post',postGet(connection))
app.put('/post',postUpdate(connection))
app.post('/post',postInsert(connection))
app.delete('/post',postDelete(connection))

app.listen(process.env.PORT || 5002 ,()=>{
    console.log(`I am running!!! on ${process.env.PORT}`)
})