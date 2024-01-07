function list(db){
    return function (req,res,next){
        const result = 'todo list'
        res.json({result})
    }
}

module.exports = list