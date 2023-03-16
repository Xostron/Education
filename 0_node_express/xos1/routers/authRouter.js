const Router = require("express")
const router = new Router()
const apiAuth = require("./authController")
const authMiddleware = require("../middleware/authMiddleware")
const { body } = require("express-validator")

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 1 }),
  apiAuth.registration
)
router.post("/login", apiAuth.login)
router.get("/users", authMiddleware, apiAuth.getUsers)
router.get("/is",apiAuth.getAuth)

module.exports = router
