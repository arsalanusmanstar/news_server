
const tagsGet=(connection)=>(req,res)=>{ 
    const {id,name}=req.body

    const filter = {}
    const tags=[]
    const posts={}
    respons=[]

    id? filter['id']=id : 0
    name? filter['name']=name : 0

    connection.then(client => {
    const post = client.db('news').collection('post')  

    const quotesCollection = post.aggregate().toArray()
    .then(results => {

  
      results.map(result =>{ 
        result['thumbnail']={
                '__typename': 'ImageSharp',
                'ImageSharp_vertical': {
                  'layout': 'constrained',
                  'backgroundColor': '#787898',
                  'images': {
                    'fallback': {
                      'src': result.featuredImage,
                      'srcSet': '',
                      'sizes': '(min-width: 380px) 380px, 100vw'
                    },
                    'sources': [
                      {
                        'srcSet': result.featuredImage,
                        'type': 'image/jpg',
                        'sizes': '(min-width: 380px) 380px, 100vw'
                      }
                    ]
                  },
                  'width': 380,
                  'height': 290
                }
              }
        result.tags.split(',').map(result1 =>{
          tags.includes(result1.toLowerCase())? (0) :
        (
          respons.push({

            "name":result1.toLowerCase(),
            'tag':result1.toLowerCase(),
            'slug': '/tag/'+result1.toLowerCase(),
            'posts':[]
          }),
          tags.push(result1.toLowerCase()),
          posts[result1.toLowerCase()]= []
        )
       posts[result1.toLowerCase()].push(result)
        })
      })

      respons.map(result =>{ 
        
        result.posts=posts[result.tag]
        
      })
    
      try {
        res.send(respons);
      } catch (error) {
        res.status(500).send(error);
      }
    })
    .catch(error => console.error(error))
    })
}

module.exports={
  tagsGet:tagsGet
}