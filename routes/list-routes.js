const express = require('express')

const ListCtrl = require('../controller/lists-controller');

const router = express.Router()

router.post('/list', ListCtrl.createList)
router.put('/list/:id', ListCtrl.updateList)
router.delete('/list/:id', ListCtrl.deleteList)
router.get('/list/:id', ListCtrl.getListById)
router.get('/lists', ListCtrl.getLists)
router.get('/lists/:id', ListCtrl.getListByUserId)

module.exports = router