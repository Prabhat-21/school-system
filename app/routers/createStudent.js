const db = require("../models/index")
const express = require('express');
const router = new express.Router()
const students = db.students;
const schools = db.schools;
const books = db.books;
const studentbookAssociation = db.studentbookAssociation;
const { Op } = require("sequelize");


router.post('/createStudentAPI', async (req, res) => {
    const data = req.body

    data.fullName = data.firstName +" " + data.lastName
    
    const school = await schools.findOne({ where: { school: data.schoolName } });
    const bookNames = data.bookNames;
    const booksReponse = await books.findAll({
        where: {
            title: {
                [Op.in]: bookNames
            }
        }
    })
    const bookIds = booksReponse.map(b => b.id)
    if(!school) {
        res.status(404).send()
        return
    }
    const student = students.build({
        firstName:data.firstName,
        lastName:data.lastName,
        fullName:data.fullName,
        email:data.email,
        gender:data.gender,
        schoolID:school.id})

    try {
        await student.save()
        bookIds.forEach(async bookId => {
            const sb = studentbookAssociation.build({
                studentID: student.id,
                bookID: bookId
            })
            await sb.save()
        });
        res.status(201).send(student)
    } catch (e) {
        res.status(400).send(e)
    }
})




module.exports=router

    