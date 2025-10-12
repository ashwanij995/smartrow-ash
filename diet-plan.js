// Diet Plan Dashboard Logic
let currentWeek = 0
let currentDay = 0
let currentView = "weekly"
let doshaResults = null

// Sample meal data based on dosha types
const mealDatabase = {
  vata: {
    breakfast: [
      {
        name: "Warm Oatmeal with Almonds",
        image: "/warm-oatmeal-with-almonds.jpg",
        description: "Nourishing warm oats with soaked almonds, dates, and warming spices.",
        benefits: "Grounds Vata energy, provides sustained warmth and nourishment",
        ingredients: ["Rolled oats", "Almonds", "Dates", "Cinnamon", "Cardamom"],
        time: "7:00 AM",
      },
      {
        name: "Stewed Fruits with Ghee",
        image: "/stewed-fruits-with-ghee.jpg",
        description: "Gently cooked seasonal fruits with clarified butter and warming spices.",
        benefits: "Easy to digest, provides natural sweetness and healthy fats",
        ingredients: ["Apples", "Pears", "Ghee", "Cinnamon", "Ginger"],
        time: "7:00 AM",
      },
    ],
    lunch: [
      {
        name: "Kitchari with Vegetables",
        image: "/kitchari-with-vegetables.jpg",
        description: "Traditional one-pot meal with rice, lentils, and seasonal vegetables.",
        benefits: "Complete protein, easy digestion, balances all doshas",
        ingredients: ["Basmati rice", "Mung dal", "Mixed vegetables", "Turmeric", "Cumin"],
        time: "12:00 PM",
      },
      {
        name: "Quinoa Buddha Bowl",
        image: "/quinoa-buddha-bowl.jpg",
        description: "Warm quinoa with roasted root vegetables and tahini dressing.",
        benefits: "Grounding proteins and complex carbs for sustained energy",
        ingredients: ["Quinoa", "Sweet potato", "Carrots", "Tahini", "Lemon"],
        time: "12:00 PM",
      },
    ],
    dinner: [
      {
        name: "Mung Bean Soup",
        image: "/mung-bean-soup.png",
        description: "Light, warming soup with mung beans and digestive spices.",
        benefits: "Easy to digest, provides protein without heaviness",
        ingredients: ["Mung beans", "Ginger", "Turmeric", "Cumin", "Cilantro"],
        time: "7:00 PM",
      },
    ],
  },
  pitta: {
    breakfast: [
      {
        name: "Coconut Rice Porridge",
        image: "/coconut-rice-porridge.jpg",
        description: "Cooling rice porridge with coconut milk and fresh fruits.",
        benefits: "Cooling and soothing, reduces Pitta heat and inflammation",
        ingredients: ["Basmati rice", "Coconut milk", "Rose water", "Cardamom", "Berries"],
        time: "7:00 AM",
      },
      {
        name: "Fresh Fruit Salad",
        image: "/fresh-fruit-salad.jpg",
        description: "Seasonal cooling fruits with mint and lime.",
        benefits: "Hydrating and cooling, provides natural enzymes",
        ingredients: ["Melons", "Grapes", "Pears", "Mint", "Lime"],
        time: "7:00 AM",
      },
    ],
    lunch: [
      {
        name: "Cooling Cucumber Salad",
        image: "/cooling-cucumber-salad.jpg",
        description: "Fresh cucumber salad with cooling herbs and yogurt dressing.",
        benefits: "Extremely cooling, reduces internal heat and inflammation",
        ingredients: ["Cucumber", "Yogurt", "Mint", "Cilantro", "Lime"],
        time: "12:00 PM",
      },
      {
        name: "Coconut Curry with Vegetables",
        image: "/coconut-curry-vegetables.jpg",
        description: "Mild coconut curry with cooling vegetables and basmati rice.",
        benefits: "Cooling spices help balance Pitta fire element",
        ingredients: ["Coconut milk", "Zucchini", "Green beans", "Coriander", "Fennel"],
        time: "12:00 PM",
      },
    ],
    dinner: [
      {
        name: "Steamed Vegetables with Quinoa",
        image: "/steamed-vegetables-quinoa.jpg",
        description: "Lightly steamed seasonal vegetables with fluffy quinoa.",
        benefits: "Light and cooling, easy evening digestion",
        ingredients: ["Broccoli", "Asparagus", "Quinoa", "Olive oil", "Fresh herbs"],
        time: "7:00 PM",
      },
    ],
  },
  kapha: {
    breakfast: [
      {
        name: "Spiced Quinoa Breakfast",
        image: "/spiced-quinoa-breakfast.jpg",
        description: "Light quinoa with warming spices and a touch of honey.",
        benefits: "Stimulates metabolism, provides energy without heaviness",
        ingredients: ["Quinoa", "Ginger", "Cinnamon", "Cloves", "Honey"],
        time: "7:00 AM",
      },
      {
        name: "Green Tea with Ginger",
        image: "/green-tea-with-ginger.jpg",
        description: "Energizing green tea with fresh ginger and lemon.",
        benefits: "Stimulates digestion and metabolism, reduces Kapha sluggishness",
        ingredients: ["Green tea", "Fresh ginger", "Lemon", "Black pepper"],
        time: "7:00 AM",
      },
    ],
    lunch: [
      {
        name: "Spicy Lentil Dal",
        image: "/spicy-lentil-dal.jpg",
        description: "Warming lentil curry with metabolism-boosting spices.",
        benefits: "Stimulates Agni (digestive fire), reduces Kapha accumulation",
        ingredients: ["Red lentils", "Turmeric", "Cayenne", "Mustard seeds", "Garlic"],
        time: "12:00 PM",
      },
      {
        name: "Roasted Vegetable Medley",
        image: "/roasted-vegetable-medley.jpg",
        description: "Colorful roasted vegetables with warming herbs and spices.",
        benefits: "Light yet satisfying, stimulates circulation and warmth",
        ingredients: ["Bell peppers", "Eggplant", "Onions", "Rosemary", "Thyme"],
        time: "12:00 PM",
      },
    ],
    dinner: [
      {
        name: "Light Vegetable Broth",
        image: "/light-vegetable-broth.jpg",
        description: "Clear, warming broth with digestive spices and herbs.",
        benefits: "Light and warming, supports evening digestion",
        ingredients: ["Vegetable broth", "Ginger", "Black pepper", "Cilantro", "Lemon"],
        time: "7:00 PM",
      },
    ],
  },
}

// Daily tips based on dosha
const doshaTips = {
  vata: [
    "Start your day with warm water and lemon to kindle your digestive fire.",
    "Practice gentle, grounding exercises like yoga or walking.",
    "Maintain regular meal times to support your nervous system.",
    "Choose warm, cooked foods over cold, raw foods.",
    "Create a calming bedtime routine for better sleep.",
  ],
  pitta: [
    "Avoid spicy and acidic foods during hot weather.",
    "Practice cooling pranayama (breathing exercises) in the morning.",
    "Take breaks during intense work to prevent overheating.",
    "Choose sweet, bitter, and astringent tastes to cool Pitta.",
    "Spend time in nature, especially near water.",
  ],
  kapha: [
    "Start your day early and avoid sleeping in.",
    "Include warming spices like ginger and black pepper in meals.",
    "Engage in vigorous exercise to stimulate circulation.",
    "Limit dairy and sweet foods that increase Kapha.",
    "Practice energizing breathing exercises.",
  ],
}

// Initialize the dashboard
document.addEventListener("DOMContentLoaded", () => {
  loadDoshaResults()
  initializeDashboard()
  setupEventListeners()
})

function loadDoshaResults() {
  const stored = localStorage.getItem("doshaResults")
  if (stored) {
    doshaResults = JSON.parse(stored)
    updatePatientInfo()
  } else {
    // Default for demo purposes
    doshaResults = {
      primaryDosha: "vata",
      scores: { vata: 45, pitta: 30, kapha: 25 },
    }
    updatePatientInfo()
  }
}

function updatePatientInfo() {
  const primaryDosha = doshaResults.primaryDosha
  document.getElementById("patient-name").textContent = "Welcome Back!"
  document.getElementById("patient-dosha").textContent =
    `Primary Dosha: ${primaryDosha.charAt(0).toUpperCase() + primaryDosha.slice(1)}`

  const doshaIcon = document.getElementById("primary-dosha-icon")
  const doshaIndicator = document.getElementById("dosha-indicator")

  // Update icon and color based on primary dosha
  const iconMap = { vata: "wind", pitta: "fire", kapha: "mountain" }
  const colorMap = { vata: "#42a5f5", pitta: "#f4511e", kapha: "#66bb6a" }

  doshaIcon.innerHTML = `<i class="fas fa-${iconMap[primaryDosha]}"></i>`
  doshaIndicator.querySelector(".dosha-icon").style.background = colorMap[primaryDosha]

  // Update daily tip
  const tips = doshaTips[primaryDosha]
  const randomTip = tips[Math.floor(Math.random() * tips.length)]
  document.getElementById("daily-tip").innerHTML = `<p>${randomTip}</p>`
}

function initializeDashboard() {
  generateWeeklyPlan()
  generateDailyView()
  generateMealPrepPlan()
  generateShoppingList()
  updateCurrentWeek()
}

function setupEventListeners() {
  // Menu item clicks
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      const view = e.currentTarget.dataset.view
      switchView(view)
    })
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
  // Update active menu item
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.remove("active")
  })
  document.querySelector(`[data-view="${view}"]`).classList.add("active")

  // Hide all views
  document.querySelectorAll(".view-container").forEach((container) => {
    container.style.display = "none"
  })

  // Show selected view
  document.getElementById(`${view}-view`).style.display = "block"
  currentView = view
}

function generateWeeklyPlan() {
  const weeklyGrid = document.getElementById("weekly-grid")
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const primaryDosha = doshaResults.primaryDosha

  weeklyGrid.innerHTML = ""

  days.forEach((day, index) => {
    const dayColumn = document.createElement("div")
    dayColumn.className = "day-column"

    const date = new Date()
    date.setDate(date.getDate() + index)

    dayColumn.innerHTML = `
      <div class="day-header">
        <div class="day-name">${day}</div>
        <div class="day-date">${date.getDate()}/${date.getMonth() + 1}</div>
      </div>
      <div class="day-meals">
        ${generateDayMeals(primaryDosha, index)}
      </div>
    `

    weeklyGrid.appendChild(dayColumn)
  })
}

function generateDayMeals(dosha, dayIndex) {
  const meals = mealDatabase[dosha]
  let html = ""

  // Breakfast
  const breakfast = meals.breakfast[dayIndex % meals.breakfast.length]
  html += `
    <div class="meal-item" onclick="openMealSwapModal('${breakfast.name}', 'breakfast')">
      <div class="meal-time">Breakfast</div>
      <div class="meal-name">${breakfast.name}</div>
      <div class="meal-benefits">${breakfast.benefits}</div>
    </div>
  `

  // Lunch
  const lunch = meals.lunch[dayIndex % meals.lunch.length]
  html += `
    <div class="meal-item" onclick="openMealSwapModal('${lunch.name}', 'lunch')">
      <div class="meal-time">Lunch</div>
      <div class="meal-name">${lunch.name}</div>
      <div class="meal-benefits">${lunch.benefits}</div>
    </div>
  `

  // Dinner
  const dinner = meals.dinner[dayIndex % meals.dinner.length]
  html += `
    <div class="meal-item" onclick="openMealSwapModal('${dinner.name}', 'dinner')">
      <div class="meal-time">Dinner</div>
      <div class="meal-name">${dinner.name}</div>
      <div class="meal-benefits">${dinner.benefits}</div>
    </div>
  `

  return html
}

function generateDailyView() {
  const dailyMeals = document.getElementById("daily-meals")
  const primaryDosha = doshaResults.primaryDosha
  const meals = mealDatabase[primaryDosha]

  dailyMeals.innerHTML = `
    ${generateMealCard(meals.breakfast[0], "Breakfast")}
    ${generateMealCard(meals.lunch[0], "Lunch")}
    ${generateMealCard(meals.dinner[0], "Dinner")}
  `
}

function generateMealCard(meal, mealType) {
  return `
    <div class="meal-card">
      <img src="${meal.image}" alt="${meal.name}" class="meal-image">
      <div class="meal-details">
        <h3>${meal.name}</h3>
        <div class="meal-time-large">${mealType} • ${meal.time}</div>
        <p class="meal-description">${meal.description}</p>
        <div class="ayurvedic-benefits">
          <h4>Ayurvedic Benefits</h4>
          <p>${meal.benefits}</p>
        </div>
        <div class="meal-actions">
          <button class="btn btn-primary btn-small" onclick="openMealSwapModal('${meal.name}', '${mealType.toLowerCase()}')">
            <i class="fas fa-exchange-alt"></i>
            Swap Meal
          </button>
          <button class="btn btn-outline btn-small" onclick="addToFavorites('${meal.name}')">
            <i class="fas fa-heart"></i>
            Favorite
          </button>
        </div>
      </div>
    </div>
  `
}

function generateMealPrepPlan() {
  const sundayPrep = document.getElementById("sunday-prep")
  const wednesdayPrep = document.getElementById("wednesday-prep")

  const sundayTasks = [
    { name: "Cook quinoa and rice in bulk", time: "30 minutes" },
    { name: "Chop vegetables for the week", time: "45 minutes" },
    { name: "Prepare spice blends", time: "15 minutes" },
    { name: "Soak nuts and seeds", time: "5 minutes" },
    { name: "Make vegetable broth", time: "60 minutes" },
  ]

  const wednesdayTasks = [
    { name: "Refresh cut vegetables", time: "20 minutes" },
    { name: "Prepare mid-week proteins", time: "30 minutes" },
    { name: "Make fresh herb pastes", time: "10 minutes" },
  ]

  sundayPrep.innerHTML = sundayTasks
    .map(
      (task) => `
    <div class="prep-task">
      <input type="checkbox" id="sunday-${task.name.replace(/\s+/g, "-")}">
      <div class="prep-task-content">
        <div class="prep-task-name">${task.name}</div>
        <div class="prep-task-time">${task.time}</div>
      </div>
    </div>
  `,
    )
    .join("")

  wednesdayPrep.innerHTML = wednesdayTasks
    .map(
      (task) => `
    <div class="prep-task">
      <input type="checkbox" id="wednesday-${task.name.replace(/\s+/g, "-")}">
      <div class="prep-task-content">
        <div class="prep-task-name">${task.name}</div>
        <div class="prep-task-time">${task.time}</div>
      </div>
    </div>
  `,
    )
    .join("")
}

function generateShoppingList() {
  const shoppingList = document.getElementById("shopping-list")

  const categories = {
    "Grains & Legumes": ["Quinoa", "Basmati rice", "Mung beans", "Red lentils", "Rolled oats"],
    Vegetables: ["Cucumber", "Zucchini", "Bell peppers", "Carrots", "Sweet potatoes"],
    Fruits: ["Apples", "Pears", "Berries", "Melons", "Lemons"],
    "Spices & Herbs": ["Turmeric", "Cumin", "Ginger", "Cinnamon", "Fresh cilantro"],
    "Pantry Items": ["Coconut milk", "Ghee", "Olive oil", "Tahini", "Raw honey"],
  }

  const icons = {
    "Grains & Legumes": "fas fa-seedling",
    Vegetables: "fas fa-carrot",
    Fruits: "fas fa-apple-alt",
    "Spices & Herbs": "fas fa-leaf",
    "Pantry Items": "fas fa-jar",
  }

  shoppingList.innerHTML = Object.entries(categories)
    .map(
      ([category, items]) => `
    <div class="shopping-category">
      <h3><i class="${icons[category]}"></i> ${category}</h3>
      <div class="shopping-items">
        ${items
          .map(
            (item) => `
          <div class="shopping-item">
            <input type="checkbox" id="item-${item.replace(/\s+/g, "-")}">
            <span>${item}</span>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `,
    )
    .join("")
}

// Navigation functions
function previousWeek() {
  currentWeek--
  updateCurrentWeek()
  generateWeeklyPlan()
}

function nextWeek() {
  currentWeek++
  updateCurrentWeek()
  generateWeeklyPlan()
}

function previousDay() {
  currentDay--
  updateCurrentDay()
  generateDailyView()
}

function nextDay() {
  currentDay++
  updateCurrentDay()
  generateDailyView()
}

function updateCurrentWeek() {
  const date = new Date()
  date.setDate(date.getDate() + currentWeek * 7)
  const weekStart = new Date(date.setDate(date.getDate() - date.getDay() + 1))
  document.getElementById("current-week").textContent =
    `Week of ${weekStart.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
}

function updateCurrentDay() {
  const date = new Date()
  date.setDate(date.getDate() + currentDay)
  document.getElementById("current-day").textContent = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

// Modal functions
function openMealSwapModal(mealName, mealType) {
  document.getElementById("swap-meal-name").textContent = mealName
  const modal = document.getElementById("meal-swap-modal")
  const swapOptions = document.getElementById("swap-options")

  const primaryDosha = doshaResults.primaryDosha
  const alternatives = mealDatabase[primaryDosha][mealType]

  swapOptions.innerHTML = alternatives
    .map(
      (meal) => `
    <div class="swap-option" onclick="swapMeal('${meal.name}', '${mealType}')">
      <img src="${meal.image}" alt="${meal.name}">
      <div class="swap-option-details">
        <h4>${meal.name}</h4>
        <p>${meal.benefits}</p>
      </div>
    </div>
  `,
    )
    .join("")

  modal.style.display = "block"
}

function closeMealSwapModal() {
  document.getElementById("meal-swap-modal").style.display = "none"
}

function swapMeal(newMealName, mealType) {
  // In a real app, this would update the meal plan
  alert(`Meal swapped to: ${newMealName}`)
  closeMealSwapModal()
  // Refresh the current view
  if (currentView === "weekly") {
    generateWeeklyPlan()
  } else if (currentView === "daily") {
    generateDailyView()
  }
}

function customizePlan() {
  document.getElementById("customization-modal").style.display = "block"
}

function closeCustomizationModal() {
  document.getElementById("customization-modal").style.display = "none"
}

function saveCustomization() {
  // In a real app, this would save the customization preferences
  alert("Customization saved! Your meal plan will be updated.")
  closeCustomizationModal()
  generateWeeklyPlan()
  generateDailyView()
}

function refreshPlan() {
  // Regenerate all plans
  generateWeeklyPlan()
  generateDailyView()
  generateMealPrepPlan()
  generateShoppingList()
  alert("Your meal plan has been refreshed with new options!")
}

function addToFavorites(mealName) {
  // In a real app, this would add to user's favorites
  alert(`${mealName} added to your favorites!`)
}

function shareplan() {
  const text = `Check out my personalized Ayurvedic diet plan! Tailored for my ${doshaResults.primaryDosha} constitution.`
  if (navigator.share) {
    navigator.share({
      title: "My Ayurvedic Diet Plan",
      text: text,
      url: window.location.href,
    })
  } else {
    navigator.clipboard.writeText(text + " " + window.location.href).then(() => {
      alert("Diet plan link copied to clipboard!")
    })
  }
}

function generatePDF() {
  const { jsPDF } = window.jspdf

  // Create new PDF document
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(20)
  doc.text("Personalized Ayurvedic Diet Plan", 20, 30)

  // Add patient info
  doc.setFontSize(12)
  doc.text(
    `Primary Dosha: ${doshaResults.primaryDosha.charAt(0).toUpperCase() + doshaResults.primaryDosha.slice(1)}`,
    20,
    50,
  )

  // Add weekly plan summary
  doc.setFontSize(16)
  doc.text("Weekly Meal Plan", 20, 70)

  const primaryDosha = doshaResults.primaryDosha
  const meals = mealDatabase[primaryDosha]
  let yPosition = 90

  // Add meals for each day
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  days.forEach((day, index) => {
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 30
    }

    doc.setFontSize(14)
    doc.text(day, 20, yPosition)
    yPosition += 10

    doc.setFontSize(10)
    const breakfast = meals.breakfast[index % meals.breakfast.length]
    const lunch = meals.lunch[index % meals.lunch.length]
    const dinner = meals.dinner[index % meals.dinner.length]

    doc.text(`Breakfast: ${breakfast.name}`, 25, yPosition)
    yPosition += 8
    doc.text(`Lunch: ${lunch.name}`, 25, yPosition)
    yPosition += 8
    doc.text(`Dinner: ${dinner.name}`, 25, yPosition)
    yPosition += 15
  })

  // Save the PDF
  doc.save("ayurvedic-diet-plan.pdf")
}
