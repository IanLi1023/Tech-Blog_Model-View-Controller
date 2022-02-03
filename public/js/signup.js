const signUp = async(event) => {
    event.preventDefault()
    const userNameInput = document.getElementById('username-input-signup')
    const passwordInput = document.getElementById('password-input-signup')
    const userInfo = JSON.stringify({
        username: userNameInput.value,
        password: passwordInput.value,
    })
    const response = await fetch('/api/user', {
        method: "POST",
        body: userInfo,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    console.log(response)
    if (response.ok) {
        alert('Welcome New User')
// document.location.replace('/dashboard')
    } else {
        alert('Something went wrong')
    }
} 
document.getElementById('signup_form').addEventListener('submit', signUp)