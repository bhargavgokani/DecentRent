const express = require("express");
const {authorize }  = require('../middleware/authentication')
const router = express.Router();


let{register , saveRes , unsaveRes , login , logout , getAddress , getUser} = require('../controller/userController')

router.post('/register' ,  register )
router.post('/getAddress' ,  getAddress )
router.post('/login' , login)
router.post('/getUser' , getUser);
router.get('/logout',authorize , logout )
router.get('/:id/save' ,authorize, saveRes)
router.get('/:id/unsave' ,authorize ,unsaveRes)



module.exports= router;