exports.home = (req,res)=>{
    res.redirect(303,"/game")
}

exports.notFound = (req,res)=>{
    res.status(404)
    res.render("404")
}

exports.serverError = (err,req,res,next)=>{
    console.error('** ОШИБКА СЕРВЕРА: '+err.message)
    res.status(500).render("500")
}

exports.login = (req,res)=>{
    res.render("login")
}

