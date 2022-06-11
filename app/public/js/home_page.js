const DetailsForm = document.querySelector('form')

DetailsForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const search_field=document.querySelector('input[name="search_field"]:checked').value;
    const search_text = document.querySelector('input#search_text').value
    if (!search_field || !search_text) {
        alert("please select one of id or name. do not leave the text field empty")
        return
    }

    fetch(`/search?search_field=${search_field}&search_text=${search_text}`).then((response) => {
        response.json().then((data) => {
            console.log(data)
            p = document.querySelector("#message-1")
            p.textContent = JSON.stringify(data)
        })
    })
})