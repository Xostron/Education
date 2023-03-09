const { getFortune } = require('./fortune');
const mock = require("./mock")

exports.home = (req,res)=>{
    res.render("home", {games: mock.games})
}

exports.play = (req,res)=>{
    res.render("play",{text:"PLAY", game:getFortune()})
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

exports.api = {
    create_login: (req,res)=>{
    console.log(req.body)
    console.log(req.query.form)
    res.send({result: 'success', name: req.body.email})
}
}