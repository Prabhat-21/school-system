const fs = require("fs");
const request = require('request')
const csv = require('fast-csv');

const BASE_URL = "http://localhost:8082"

const books = [];
fs.createReadStream('./data/books.csv')
  .pipe(csv.parse())
  .on('error', error => console.error(error))
  .on('data', row => books.push(row))
  .on('end', () => {
        books.forEach(book => {
            const url = `${BASE_URL}/books`
            body = {
                title: book[0],
                authorName: book[1],
                dateOfPublication: book[2],
                noOfPages: book[3]
            }
            console.log(body)
            request.post(url, { json: true, method: 'POST', body: body },
             (error) => {
                if (error) {
                    console.log("error")    
                }
            })    
        })
  });


const schools = []
fs.createReadStream('./data/schools.csv')
  .pipe(csv.parse())
  .on('error', error => console.error(error))
  .on('data', row => schools.push(row))
  .on('end', () => {
        schools.forEach(school => {
            const url = `${BASE_URL}/schools`
            body = {
                regionID: school[0],
                school: school[1],
                email: school[2],
                principal: school[3],
                phone: school[4],
                address: school[5]
            }
            console.log(body)
            request.post(url, { json: true, method: 'POST', body: body },
             (error) => {
                if (error) {
                    console.log("error")    
                }
            })    
        })
  });
  

const students = []
fs.createReadStream('./data/students.csv')
  .pipe(csv.parse())
  .on('error', error => console.error(error))
  .on('data', row => students.push(row))
  .on('end', () => {
        students.forEach(student => {
            const url = `${BASE_URL}/createStudentAPI`
            body = {
                firstName: student[1],
                lastName: student[2],
                email: student[3],
                gender: student[4],
                schoolName: student[5],
                bookNames: [student[6]]
            }
            console.log(body)
            request.post(url, { json: true, method: 'POST', body: body },
             (error) => {
                if (error) {
                    console.log("error")    
                }
            })    
        })
  });

  
