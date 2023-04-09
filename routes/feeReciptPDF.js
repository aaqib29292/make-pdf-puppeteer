const router = require('express').Router()

const feeReceiptCtrl = require('../controllers/feeReceipt')

router.get('/', async (req, res) => {
  res.json({message: 'Hello World!'})
})

router.get('/getPdf', async (req, res) => {
  try {
    feeReceiptCtrl.generateFeeReceipt(req,res)
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
