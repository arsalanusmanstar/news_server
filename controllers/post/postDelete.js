const postDelete=(connection)=>(req,res)=>{ 
    const {title,link,description,excerpt,featuredImage,featured,category,author,tags}=req.body
    const filter = {}

    title? filter['title']=title : 0
    link? filter['link']=link : 0
    description? filter['description']=description : 0
    excerpt? filter['excerpt']=excerpt : 0
    featuredImage? filter['featuredImage']=featuredImage : 0
    featured? filter['featured']=featured : 0
    category? filter['category']=category : 0
    author? filter['author']=author : 0
    tags? filter['tags']=tags : 0

    connection.then(client => {
    const post = client.db('news').collection('post')  

    const quotesCollection = post.deleteOne(filter)
    .then(results => {
    try {
        // res.send(results.deletedCount? "Deleted" :"record not found");
        res.send(results.deletedCount? results.deletedCount+" number of record deleted" :"record not found");
      } catch (error) {
        res.status(500).send(error);
      }
    })
    .catch(error => console.error(error))
    })
}

module.exports={
  postDelete:postDelete
}