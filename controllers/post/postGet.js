const postGet=(connection)=>(req,res)=>{ 
    const {title,slug,link,description,excerpt,featuredImage,featured,date,category,author,tags}=req.body
    const filter = {}

    title? filter['title']=title : 0
    slug? filter['slug']=slug : 0
    link? filter['link']=link : 0
    description? filter['description']=description : 0
    excerpt? filter['excerpt']=excerpt : 0
    featuredImage? filter['featuredImage']=featuredImage : 0
    featured? filter['featured']=featured : 0
    date? filter['date']=date : 0
    category? filter['category']=category : 0
    author? filter['author']=author : 0
    tags? filter['tags']=tags : 0

    connection.then(client => {
    const post = client.db('news').collection('post')  

    const quotesCollection = post.find(filter).toArray()
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

module.exports={
  postGet:postGet
}