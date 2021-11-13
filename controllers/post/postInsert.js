const postInsert=(connection)=>(req,res)=>{ 
    const {title,slug,link,description,excerpt,featuredImage,featured,date,category,author,tags}=req.body
    const filter = {}

    title? filter['title']=title : 0
    slug? filter['slug']=slug : filter['slug']=title.toLowerCase().replace(' ','-')
    link? filter['link']=link : filter['link']=null
    description? filter['description']=description : 0
    excerpt? filter['excerpt']=excerpt : 0
    featuredImage? filter['featuredImage']=featuredImage : 0
    featured? filter['featured']=featured : filter['featured']=featured
    date? filter['date']=date : filter['date']=date
    category? filter['category']=category : 0
    author? filter['author']=author : 0
    tags? filter['tags']=tags : filter['tags']=tags

//     connection.then(client => {
//     const post = client.db('news').collection('post')  

//     const quotesCollection = post.insert(filter)
//     .then(results => {
//     try {
//         res.send(results);
//       } catch (error) {
//         res.status(500).send(error);
//       }
//     })
//     .catch(error => console.error(error))
//     })

console.log(getValueForNextSequence(connection,"item_id"))
}

function getValueForNextSequence(connection,sequenceOfName){


  connection.then(client => {
    const sequenceDoc = client.db('news').collection('postIdSequence').findAndModify({
     query:{_id: sequenceOfName },
      update: {$inc:{sequence_value:1}},
      new:true
    });
    return sequenceDoc.sequence_value;
    })

    
 }
module.exports={
  postInsert:postInsert
}