const { response } = require("express");

const filter = {}
const  postInsert=(connection)=>(req,res)=>{ 
    getValueForNextSequence(connection,"item_id")
    const {title,slug,link,description,excerpt,featuredImage,featured,date,category,author,tags, seo}=req.body
    const newDate = new Date();
    
    

    title? filter['title']=title : 0
    slug? filter['slug']=slug : filter['slug']=title.toLowerCase().replace(' ','-')
    link? filter['link']=link : filter['link']=null
    description? filter['description']=description : 0
    excerpt? filter['excerpt']=excerpt : 0
    featuredImage? filter['featuredImage']=featuredImage : 0
    featured? filter['featured']=featured : filter['featured']=featured
    date? 0: filter['date'] = newDate.getFullYear()+'-'+(newDate.getMonth()+1)+'-'+newDate.getDate() 
    category? filter['category']=category : 0
    author? filter['author']=author : 0
    tags? filter['tags']=tags : filter['tags']=tags
    
     
    seo?filter['seo']=seo:0
    
    
    res.send(req.body);

    connection.then(client => {
    const post = client.db('news').collection('post')  

    const quotesCollection = post.insertOne(filter)
    .then(results => {
    try {
        res.send(results);
      } catch (error) {
        res.status(500).send(error);
      }
    })
    .catch(error => console.error(error))
    })
}

function getValueForNextSequence(connection,sequenceOfName){

  connection.then(client => {
    const post = client.db('news').collection('postIdSequence')
    post.findOneAndUpdate(
    { "_id": sequenceOfName },     
    {"$inc":{sequence_value:1}})
    .then(results => {      
      filter['_id']=results.value.sequence_value+1
    });    
    })    
 }

module.exports={
  postInsert:postInsert
}