const postUpdate=(connection)=>(req,res)=>{ 
    const {title,name}=req.body
    const filter = {}

    name? filter['name']=name : 0

    connection.then(client => {
    const post = client.db('news').collection('post')  

    const quotesCollection = post.updateOne({'title': title},{$set:filter})
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
  postUpdate:postUpdate
}