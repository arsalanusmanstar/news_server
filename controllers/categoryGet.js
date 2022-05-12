const categoryGet=(connection)=>(req,res)=>{ 
    const {id,name}=req.body

    // console.log( id? 'a': id? {"id":id} : 1)
    const filter = {}

    id? filter['id']=id : 0
    name? filter['name']=name : 0

    connection.then(client => {
    const category = client.db('news').collection('category')  

    const quotesCollection = category.aggregate([      
      {$lookup:
          {
            from: "post",
            localField: "_id",
            foreignField: "category",
            as: "posts"
          }},
          {$match :  filter} ]).toArray()
    .then(results => {
      
      try {
      results.map(result =>{
        result.posts.map(post =>{
          post['thumbnail']={
            '__typename': 'ImageSharp',
            'ImageSharp_vertical': {
              'layout': 'constrained',
              'backgroundColor': '#787898',
              'images': {
                'fallback': {
                  'src': post.featuredImage,
                  'srcSet': '',
                  'sizes': '(min-width: 380px) 380px, 100vw'
                },
                'sources': [
                  {
                    'srcSet': post.featuredImage,
                    'type': 'image/jpg',
                    'sizes': '(min-width: 380px) 380px, 100vw'
                  }
                ]
              },
              'width': 380,
              'height': 290
            }
          }
        })
      })

        res.send(results);
      } catch (error) {
        res.status(500).send(error);
      }
    })
    .catch(error => console.error(error))
    })
}

module.exports={
  categoryGet:categoryGet
}