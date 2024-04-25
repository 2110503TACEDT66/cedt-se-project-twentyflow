const express = require('express');
const {getUserSortByPrice} = require('../controllers/user');

const router = express.Router({mergeParams:true});

const {protect} = require('../middleware/auth');

router.route('/').get(getUserSortByPrice);

module.exports=router;