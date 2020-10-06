const express = require('express');
const router = express.Router();
const Student = require('../db/models/student')

router.get('/', async (req,res,next)=>{
  try {
    const students = await Student.findAll()
    res.send(students)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next)=>{
  try {
    const student = await Student.findByPk(req.params.id)
    if (student) {
      res.send(student);
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async(req, res, next)=>{
  try {
    const student = await Student.create(req.body)
    res.status(201)
    .json(student)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async(req, res, next)=>{
  try {
    const { firstName, lastName, email } = req.body
    const student = await Student.findByPk(req.params.id)

    if (firstName){
      student.firstName = firstName
    }
    if (lastName){
      student.lastName = lastName
    }
    if (email){
      student.email = email
    }
    await student.save()

    res.status(200)
    .json(student)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async(req, res, next)=>{
  try {
    await Student.destroy({ where: { id: req.params.id } });
    res.status(204)
    .send()
  } catch (error) {
    next(error)
  }
})

module.exports = router
