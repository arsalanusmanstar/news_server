const postGet=(connection)=>(req,res)=>{ 
    //const {title,link,description,excerpt,featuredImage,featured,category,author,tags}=req.body
  //test

    const filter = {}
    
    
    connection.then(client => {
    const post = client.db('news').collection('post')  
    
    const quotesCollection = post.aggregate([      
        {$lookup:
          {
            from: "category",
            localField: "category",
            foreignField: "_id",
            as: "category"
          }},
          {$lookup:
            {
              from: "author",
              localField: "author",
              foreignField: "_id",
              as: "author"
            }},
            {$unwind: '$author'},
            {$unwind: '$category'},
            {$match :  filter} ]).toArray()
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