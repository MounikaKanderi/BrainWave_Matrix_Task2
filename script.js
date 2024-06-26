document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        header.classList.toggle('shadow', window.scrollY > 0);
    });

    $(document).ready(function () {
        $(".filter-item").click(function () {
            const value = $(this).attr("data-filter");
            if (value === "all") {
                $(".post-box").show("1000");
            } else {
                $(".post-box")
                    .not("." + value)
                    .hide(1000);
                $(".post-box")
                    .filter("." + value)
                    .show("1000");
            }
        });
        $(".filter-item").click(function () {
            $(this).addClass("active-filter").siblings().removeClass("active-filter");
        });
    });

    // Signup Form Handling
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(signupForm);
        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include' // Add this line
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Signup successful!');
                signupForm.reset(); // Clear the form
                window.location.href = '/'; // Redirect to home page
            } else {
                alert('Signup failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Signup failed: ' + error.message);
        });
    });

    // Check if the user is signed in
    fetch('http://localhost:3000/check-session', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.signedIn) {
            document.body.classList.add('signed-in');
            // Update UI to show the signed-in state, e.g., hide signup form, show user profile
        } else {
            document.body.classList.remove('signed-in');
            // Update UI to show the signed-out state, e.g., show signup form, hide user profile
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
