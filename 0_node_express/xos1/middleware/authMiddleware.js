const jwt = require("jsonwebtoken")
const {secret} =require('../config')

module.exports = function(req,res,next){
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token){
            return res.status(403).json({msg:"Пользователь не авторизован"})
        }
        // проверка токена: если расшифруется - ок; если нет, то не валидный - err
        const decodeData = jwt.verify(token,secret)
        req.user = decodeData
        next()    
    } catch (error) {
        return res.status(403).json({msg:"Пользователь не авторизован"})
    }
    
}

