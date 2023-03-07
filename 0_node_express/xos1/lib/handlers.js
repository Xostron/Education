const { getFortune } = require('./fortune');

exports.home = (req,res)=>{
    console.log(req.path)
    res.render("home",{text:"HOME"})
}

exports.play = (req,res)=>{
    res.render("play",{text:"PLAY", game:getFortune()})
}

exports.notFound = (req,res)=>{
    res.render("404")
}

exports.serverError = (err,req,res,next)=>{
    res.render("500")
}