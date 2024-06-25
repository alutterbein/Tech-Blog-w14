const signupFormHandler = async (event) => {
    event.preventDefault();


const email = document.querySelector('#email-signup').value.trim();
const userName = document.querySelector('#username-signup').value.trim();
const password = document.querySelector('#password-signup').value.trim();

if (email && username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login', { 
      method: 'POST',
      body: JSON.stringify({ email, userName, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

// const signupFormHandler = document.querySelector('#signup-form');
// if (signupFormHandler) {
//     signupFormHandler.addEventListener('submit', signupFormHandler);
// }

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);