function id(db){
    return function(req,res,next){
        const id = req.params.id
        const result = 'todo id '+ id
        res.json({result})
    }
}

module.exports = id