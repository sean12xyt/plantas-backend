const { Router } = require(`express`)
const router = Router()

const { sendMail } = require('../controllers/mail.controller')


router.route('/')
    .post(sendMail)

		



module.exports=router