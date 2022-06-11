const DetailsForm = document.querySelector('form')

DetailsForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const firstName = document.querySelector('input#first_name').value
    const lastName = document.querySelector('input#last_name').value
    const email = document.querySelector('input#email').value
    const gender = document.querySelector('input#gender').value
    const schoolName = document.querySelector('input#school_name').value
    const booksRead = document.querySelector('input#books_read').value
    const books = booksRead.split(",")
    const body = JSON.stringify({
        firstName,
        lastName,
        email,
        gender,
        schoolName,
        bookNames: books

    })
    console.log(body)
    fetch(`/createStudentAPI`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body
    }).then((response) => {
        console.log(response);
        if (response.status==201) {
            alert("successfuly created")
        } else {
            alert("some error")
        }

    }).catch((err) => alert(err))
})