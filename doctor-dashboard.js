// Doctor Dashboard Logic
let currentView = "overview"
let patients = []
let dietPlans = []

// Sample data
const samplePatients = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    dosha: "Vata",
    lastVisit: "2024-01-10",
    status: "active",
    age: 34,
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State",
    history: [
      {
        date: "2024-01-10",
        title: "Follow-up Consultation",
        description: "Reviewed diet plan progress, adjusted meal timing",
      },
      {
        date: "2023-12-15",
        title: "Initial Assessment",
        description: "Completed dosha analysis, created personalized diet plan",
      },
    ],
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    dosha: "Pitta",
    lastVisit: "2024-01-05",
    status: "active",
    age: 28,
    phone: "+1 (555) 234-5678",
    address: "456 Oak Ave, City, State",
    history: [
      {
        date: "2024-01-05",
        title: "Diet Plan Review",
        description: "Discussed cooling foods, added new recipes",
      },
    ],
  },
  {
    id: 3,
    name: "David Chen",
    email: "david.chen@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    dosha: "Kapha",
    lastVisit: "2024-01-08",
    status: "active",
    age: 42,
    phone: "+1 (555) 345-6789",
    address: "789 Pine St, City, State",
    history: [
      {
        date: "2024-01-08",
        title: "Progress Check",
        description: "Weight management discussion, exercise recommendations",
      },
    ],
  },
  {
    id: 4,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    dosha: "Vata-Pitta",
    lastVisit: "2023-12-20",
    status: "inactive",
    age: 31,
    phone: "+1 (555) 456-7890",
    address: "321 Elm St, City, State",
    history: [
      {
        date: "2023-12-20",
        title: "Initial Consultation",
        description: "Dual dosha assessment, lifestyle recommendations",
      },
    ],
  },
]

const sampleDietPlans = [
  {
    id: 1,
    title: "Vata Balancing Plan",
    patient: "John Smith",
    dosha: "vata",
    meals: 21,
    recipes: 15,
    duration: "4 weeks",
    status: "active",
  },
  {
    id: 2,
    title: "Cooling Pitta Diet",
    patient: "Maria Garcia",
    dosha: "pitta",
    meals: 18,
    recipes: 12,
    duration: "3 weeks",
    status: "active",
  },
  {
    id: 3,
    title: "Kapha Energizing Plan",
    patient: "David Chen",
    dosha: "kapha",
    meals: 24,
    recipes: 18,
    duration: "6 weeks",
    status: "active",
  },
]

document.addEventListener("DOMContentLoaded", () => {
  // Check if logged in
  if (localStorage.getItem("doctorLoggedIn") !== "true") {
    window.location.href = "doctor-login.html"
    return
  }

  initializeDashboard()
  setupEventListeners()
})

function initializeDashboard() {
  patients = [...samplePatients]
  dietPlans = [...sampleDietPlans]

  // Load doctor info
  const doctorInfo = JSON.parse(localStorage.getItem("doctorInfo") || "{}")
  if (doctorInfo.name) {
    document.querySelector(".user-info span").textContent = doctorInfo.name
  }

  // Initialize views
  renderPatientsTable()
  renderDietPlansGrid()
}

function setupEventListeners() {
  // Navigation
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      const view = e.currentTarget.dataset.view
      switchView(view)
    })
  })

  // Dropdown toggle
  document.querySelector(".dropdown-btn").addEventListener("click", (e) => {
    e.stopPropagation()
    const dropdown = document.querySelector(".dropdown-menu")
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block"
  })

  // Close dropdown when clicking outside
  document.addEventListener("click", () => {
    document.querySelector(".dropdown-menu").style.display = "none"
  })

  // Patient search
  document.getElementById("patient-search").addEventListener("input", (e) => {
    filterPatients(e.target.value)
  })

  // Modal close on outside click
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none"
      }
    })
  })
}

function switchView(view) {
  // Update active nav item
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active")
  })
  document.querySelector(`[data-view="${view}"]`).classList.add("active")

  // Hide all views
  document.querySelectorAll(".view-section").forEach((section) => {
    section.style.display = "none"
  })

  // Show selected view
  document.getElementById(`${view}-view`).style.display = "block"
  currentView = view
}

function renderPatientsTable() {
  const tableBody = document.getElementById("patients-table-body")
  tableBody.innerHTML = ""

  patients.forEach((patient) => {
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>
        <div class="patient-cell">
          <img src="${patient.avatar}" alt="${patient.name}">
          <div>
            <div class="patient-name">${patient.name}</div>
            <div class="patient-email">${patient.email}</div>
          </div>
        </div>
      </td>
      <td>
        <span class="dosha-badge dosha-${patient.dosha.toLowerCase().split("-")[0]}">${patient.dosha}</span>
      </td>
      <td>${formatDate(patient.lastVisit)}</td>
      <td>
        <span class="status-badge status-${patient.status}">${patient.status}</span>
      </td>
      <td>
        <div class="action-buttons">
          <button class="action-btn" onclick="viewPatient(${patient.id})" title="View Details">
            <i class="fas fa-eye"></i>
          </button>
          <button class="action-btn" onclick="editPatient(${patient.id})" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn" onclick="createDietPlan(${patient.id})" title="Create Diet Plan">
            <i class="fas fa-utensils"></i>
          </button>
        </div>
      </td>
    `
    tableBody.appendChild(row)
  })
}

function renderDietPlansGrid() {
  const grid = document.getElementById("diet-plans-grid")
  grid.innerHTML = ""

  dietPlans.forEach((plan) => {
    const card = document.createElement("div")
    card.className = "diet-plan-card"
    card.innerHTML = `
      <div class="diet-plan-header">
        <div>
          <h3 class="diet-plan-title">${plan.title}</h3>
          <p class="diet-plan-patient">For: ${plan.patient}</p>
        </div>
        <span class="dosha-badge dosha-${plan.dosha}">${plan.dosha.toUpperCase()}</span>
      </div>
      <div class="diet-plan-stats">
        <div class="diet-stat">
          <div class="diet-stat-value">${plan.meals}</div>
          <div class="diet-stat-label">Meals</div>
        </div>
        <div class="diet-stat">
          <div class="diet-stat-value">${plan.recipes}</div>
          <div class="diet-stat-label">Recipes</div>
        </div>
        <div class="diet-stat">
          <div class="diet-stat-value">${plan.duration}</div>
          <div class="diet-stat-label">Duration</div>
        </div>
      </div>
      <div class="diet-plan-actions">
        <button class="btn btn-primary btn-small" onclick="editDietPlan(${plan.id})">
          <i class="fas fa-edit"></i>
          Edit Plan
        </button>
        <button class="btn btn-outline btn-small" onclick="duplicateDietPlan(${plan.id})">
          <i class="fas fa-copy"></i
