const cors = require('cors')
const express = require('express');
const MongoClient = require('mongodb').MongoClient
const { postGet } = require('./controllers/post/postGet');
const {newsPostGet} = require('./controllers/post/newsPostGet');
const {blogPostGet} = require('./controllers/post/blogPostGet');
const { postUpdate } = require('./controllers/post/postUpdate');
const { postDelete } = require('./controllers/post/postDelete');
const { postInsert } = require('./controllers/post/postInsert');
const { authorGet } = require('./controllers/author/authorGet');
const { authorUpdate } = require('./controllers/author/authorUpdate');
const { authorDelete } = require('./controllers/author/authorDelete');
const { authorInsert } = require('./controllers/author/authorInsert');
const { tagsGet } = require('./controllers/tagsGet');
const { categoryGet } = require('./controllers/categoryGet');



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
app.get('/category',categoryGet(connection))

app.get('/tags',tagsGet(connection))

app.get('/post',postGet(connection))
app.get('/newsPost',newsPostGet(connection))
app.get('/blogPost',blogPostGet(connection))



app.put('/post',postUpdate(connection))
app.post('/post',postInsert(connection))
app.delete('/post',postDelete(connection))
app.get('/author',authorGet(connection))
app.put('/author',authorUpdate(connection))
app.post('/author',authorDelete(connection))
app.delete('/author',authorInsert(connection))



app.listen(process.env.PORT || 5001 ,()=>{
  console.log(`I am running!!! on ${process.env.PORT}`)
})