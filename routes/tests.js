const express = require('express');
const router = express.Router();
const Test = require('../db/models/test')

router.get('/', async (req,res,next)=>{
  try {
    const tests = await Test.findAll()
    res.send(tests)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next)=>{
  try {
    const test = await Test.findByPk(req.params.id)
    if (test) {
      res.send(test);
    } else {
      res.status(404).send('Test not found');
    }
  } catch (error) {
    next(error)
  }
})

router.post('/student/:studentId', async(req, res, next)=>{
  try {
    const test = await Test.create(req.body)
    test.studentId = Number(req.params.studentId)
    await test.save()
    res.status(201)
    .json(test)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async(req, res, next)=>{
  try {
    await Test.destroy({ where: { id: req.params.id } });
    res.status(204)
    .send()
  } catch (error) {
    next(error)
  }
})



module.exports = router
