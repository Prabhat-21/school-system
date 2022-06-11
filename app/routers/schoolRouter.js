const db = require("../models/index")
const express = require('express');
const router = new express.Router()
const schools = db.schools;


router.post('/schools', async (req, res) => {
    const school = schools.build(req.body)

    try {
        await school.save()
        res.status(201).send(school)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/school/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const school = await schools.findByPk(_id)

        if (!school) {
            return res.status(404).send()
        }

        res.send(school)
    } catch (e) {
        res.status(500).send()
    }
})



module.exports=router

    