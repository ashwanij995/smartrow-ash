// Doctor Login Logic
document.addEventListener("DOMContentLoaded", () => {
  setupLoginForm()
  setupRegistrationForm()
})

function setupLoginForm() {
  const loginForm = document.getElementById("login-form")
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    handleLogin()
  })
}

function setupRegistrationForm() {
  const registrationForm = document.getElementById("registration-form")
  registrationForm.addEventListener("submit", (e) => {
    e.preventDefault()
    handleRegistration()
  })
}

function handleLogin() {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  // Basic validation
  if (!email || !password) {
    alert("Please fill in all fields")
    return
  }

  // Simulate login process
  showLoadingState("login-form")

  setTimeout(() => {
    // In a real app, this would make an API call
    if (email === "doctor@example.com" && password === "password") {
      // Store login state
      localStorage.setItem("doctorLoggedIn", "true")
      localStorage.setItem(
        "doctorInfo",
        JSON.stringify({
          name: "Dr. Sarah Patel",
          email: email,
          specialization: "General Ayurveda",
          license: "AY12345",
        }),
      )

      // Redirect to dashboard
      window.location.href = "doctor-dashboard.html"
    } else {
      hideLoadingState("login-form")
      alert("Invalid credentials. Use doctor@example.com / password for demo.")
    }
  }, 1500)
}

function handleRegistration() {
  const formData = new FormData(document.getElementById("registration-form"))
  const data = Object.fromEntries(formData)

  // Basic validation
  if (!data.firstName || !data.lastName || !data.email || !data.licenseNumber) {
    alert("Please fill in all required fields")
    return
  }

  if (data.password !== data.confirmPassword) {
    alert("Passwords do not match")
    return
  }

  if (!document.getElementById("terms-agreement").checked) {
    alert("Please agree to the terms and conditions")
    return
  }

  // Simulate registration process
  showLoadingState("registration-form")

  setTimeout(() => {
    hideLoadingState("registration-form")
    alert("Registration successful! Please check your email for verification.")
    showLogin()
  }, 2000)
}

function showLoadingState(formId) {
  const form = document.getElementById(formId)
  const submitBtn = form.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML

  submitBtn.disabled = true
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'
  submitBtn.dataset.originalText = originalText
}

function hideLoadingState(formId) {
  const form = document.getElementById(formId)
  const submitBtn = form.querySelector('button[type="submit"]')

  submitBtn.disabled = false
  submitBtn.innerHTML = submitBtn.dataset.originalText
}

function togglePassword() {
  const passwordInput = document.getElementById("password")
  const passwordEye = document.getElementById("password-eye")

  if (passwordInput.type === "password") {
    passwordInput.type = "text"
    passwordEye.classList.remove("fa-eye")
    passwordEye.classList.add("fa-eye-slash")
  } else {
    passwordInput.type = "password"
    passwordEye.classList.remove("fa-eye-slash")
    passwordEye.classList.add("fa-eye")
  }
}

function showRegistration() {
  document.getElementById("login-section").style.display = "none"
  document.getElementById("registration-section").style.display = "block"
}

function showLogin() {
  document.getElementById("registration-section").style.display = "none"
  document.getElementById("login-section").style.display = "block"
}

// Check if already logged in
if (localStorage.getItem("doctorLoggedIn") === "true") {
  window.location.href = "doctor-dashboard.html"
}
