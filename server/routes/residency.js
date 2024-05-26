const express = require("express");
const router = express.Router();
const{ authorize}  = require('../middleware/authentication')


const {getAllResidency ,getResidency, createResidency , deleteResidency , updateResidency , getSavedRes , getOwnedRes}  = require('../controller/residencyController');


router.get('/getAllResidency', getAllResidency );
router.get('/getSavedRes',authorize, getSavedRes);
router.get('/getOwnedRes',authorize, getOwnedRes);
router.get('/:id/getResidency', getResidency );
router.post('/createResidency',authorize ,createResidency);
router.get('/:id/deleteResidency',authorize, deleteResidency);
router.post('/:id/updateResidency' ,authorize, updateResidency);

module.exports= router;
