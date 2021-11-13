const postGet=(connection)=>(req,res)=>{ 
    const {id,name}=req.body

    const filter = {}

    id? filter['id']=id : 0
    name? filter['name']=name : 0

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