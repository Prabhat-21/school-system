const db = require("../models/index")
const express = require('express');
const { Op } = require("sequelize");
const router = new express.Router()
const students = db.students;
const books = db.books;
const studentbookAssociation = db.studentbookAssociation;
const schools = db.schools;

function detailedStudent(fullName, email, gender, schoolname, schoolphone, booksread, totalpages) {

    const obj = {
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

router.get('/search', async (req, res) => {
    const search_field = req.query.search_field
    const search_text = req.query.search_text
    
    try {
        if(search_field=="id"){
            const student = await students.findByPk(parseInt(search_text))

            if (!student) {
                return res.status(404).send()
            }
    
            const fullName = student.firstName+" "+student.lastName;
            const email = student.email;
            const gender = student.gender;
            
            const school = await schools.findByPk(student.schoolID);
    
            if(!school){
                return res.status(404).send()
            }
    
            const schoolname = school.school;
            const schoolphone = school.phone;
    
            const studentbooks = await studentbookAssociation.findAll({
                attributes :['bookID'],
                where: {
                  studentID: parseInt(student.id)
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
              res.status(200).send([ans])
        }
        else{
            const studentsArray = await students.findAll({
                where:{
                    fullName : search_text
                }
            });

            if(!studentsArray){
                res.status(404).send()
            }

            const DetailedArray = []

            for(const i in studentsArray){
                const student = studentsArray[i]
                if(!student){
                    res.status(404).send()
                }

            const fullName = student.firstName+" "+student.lastName;
            const email = student.email;
            const gender = student.gender;
            
            const school = await schools.findByPk(student.schoolID);
    
            if(!school){
                return res.status(404).send()
            }
    
            const schoolname = school.school;
            const schoolphone = school.phone;
    
            const studentbooks = await studentbookAssociation.findAll({
                attributes :['bookID'],
                where: {
                  studentID: student.id
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

            DetailedArray.push(ans);

            }
            res.send(DetailedArray).send();
        }

    } catch (e) {
        res.status(500).send()
    }
})



module.exports=router

    