const db = require("../models/index")
const express = require('express');
const router = new express.Router()
const students = db.students;



router.post('/students', async (req, res) => {
    const data = req.body
    data.fullName = data.firstName +" " + data.lastName
    const student = students.build(data)
    

    try {
        await student.save()
        res.status(201).send(student)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/students/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const student = await students.findByPk(_id)

        if (!student) {
            return res.status(404).send()
        }

        res.send(student)
    } catch (e) {
        res.status(500).send()
    }
})



module.exports=router

    