const bcrypt = require("bcryptjs")
const User = require("../models/users")
const jwt = require("jsonwebtoken")
const { secret } = require("../config")
const { validationResult } = require("express-validator")

const generateAccessToken = (id) => {
  const payload = {
    id,
  }
  return jwt.sign(payload, secret, { expiresIn: "24h" })
}

const auth = {
  registration: async (req, res) => {
    try {
      const { email, password } = req.body
      const errors = validationResult(req)
      let msg = ""
      if (!errors.isEmpty()) {
        console.log("registration valid = ", errors.array())
        if (errors.array().length === 1) {
          msg = `${errors.array()[0].param} - ${errors.array()[0].msg}`
        } else if (errors.array().length === 2) {
          msg = `${errors.array()[0].param} - ${errors.array()[0].msg}
            ${errors.array()[1].param} - ${errors.array()[1].msg}`
        }
        return res.status(400).json({
          msg: msg,
        })
      }
      const candidate = await User.findOne({ email })
      if (candidate) {
        return res
          .status(400)
          .json({ msg: "Пользователь с таким email уже существует" })
      }
      var hashPsw = bcrypt.hashSync(password, 7)
      const user = new User({ email, password: hashPsw })
      await user.save()
      res.json({ msg: `Пользователь ${email} зарегистрирован` })
    } catch (error) {
      console.log(error)
      res.status(400).json({ msg: "Registration error" })
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res
          .status(400)
          .json({ msg: "Вход не успешен: такой пользователь не найден" })
      }
      const validPsw = bcrypt.compareSync(password, user.password)
      if (!validPsw) {
        return res
          .status(400)
          .json({ msg: "Вход не успешен: введен неверный пароль" })
      }
      const token = generateAccessToken(user._id)
      return res.status(200).json({ msg: "Вход выполнен!", token })
    } catch (error) {
      console.log("@@@", error)
      res.status(500).json({ msg: "server error" })
    }
  },

  getUsers: async (req, res) => {
    try {
      console.log("@@@ = ", req.user)
      const users = await User.find()
      res.status(200).json({ users })
    } catch (error) {
      console.log(error)
      res.status(400).json({ msg: "Get users error" })
    }
  },

  getAuth: (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1]
      console.log("getAuth = ", token)
      const decode = jwt.verify(token,secret)
      res.json({ isAuth: true })
    } catch (error) {
      res.json({ isAuth: false })
    }
  },
}

module.exports = auth
