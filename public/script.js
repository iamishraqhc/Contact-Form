const contactForm = document.querySelector('.contact-form')

contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log('Button Clicked')

    let formData = {
        salutation: document.getElementById('salutation').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        inquiry: document.querySelector('input[name="option"]:checked').value,
        message: document.getElementById('message').value
    }

    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onload = function() {
        console.log(xhr.responseText)
        if (xhr.responseText == 'success') {
            alert('Email Sent')
            document.getElementById('salutation').value = ''
            document.getElementById('name').value = ''
            document.getElementById('email').value = ''
            document.querySelector('input[name="option"]:checked').value = ''
            document.getElementById('message').value = ''
        } else {
            alert('Something went wrong')
        }
    }
    xhr.send(JSON.stringify(formData))
})

function ValidateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!inputText.value.match(mailformat)) {
        alert("You have entered an invalid email address!");
        document.form1.text1.focus();
        return false;
    }
}
function optionCheck() {
    if (document.getElementById('option2').checked) {
        document.getElementById('ifOption2').style.visibility = 'visible';
    }
    else document.getElementById('ifOption2').style.visibility = 'hidden';
}
