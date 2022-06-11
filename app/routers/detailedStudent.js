const db = require("../models/index")
const express = require('express');
const router = new express.Router()
const students = db.students;
const books = db.books;
const studentbookAssociation = db.studentbookAssociation;
const schools = db.schools;

function detailedStudent(fullName, email, gender, schoolname, schoolphone, booksread, totalpages) {

    var obj = {
      fullName:  fullName,
      email: email,
      gender: gender,
      schoolname:schoolname,
      schoolphone:schoolphone,
      booksread:booksread,
      totalpages:totalpages
    };
    
    return obj;
  }

router.get('/studentDetailed/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const student = await students.findByPk(_id)

        if (!student) {
            return res.status(404).send()
        }

        const fullName = student.firstName+" "+student.lastName;
        const email = student.email;
        const gender = student.gender;
        
        const school = await schools.findByPk(student.schoolID);

        if(!school){
            return res.send(404).send()
        }

        const schoolname = school.school;
        const schoolphone = school.phone;

        const studentbooks = await studentbookAssociation.findAll({
            attributes :['bookID'],
            where: {
              studentID: _id
            }
          });

        let totalpages=0;
        const bookNames = []
        for (const i in studentbooks) {
            const studentbook = studentbooks[i]
            const book = await books.findByPk(studentbook.bookID);
            bookNames.push(book.title)
            totalpages+=book.noOfPages;
        }

          

          const ans = new detailedStudent(fullName,email,gender,schoolname,schoolphone,bookNames,totalpages);
          res.send(ans).send()

    } catch (e) {
        res.status(500).send()
    }
})



module.exports=router

    