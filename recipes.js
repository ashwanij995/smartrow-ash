// Recipe Explorer Logic
let allRecipes = []
let filteredRecipes = []
const currentFilters = {
  dosha: "all",
  meal: "all",
  dietary: [],
  time: [],
  search: "",
}
let currentSort = "name"
const recipesPerPage = 12
let currentPage = 1

// Sample recipe database
const recipeDatabase = [
  {
    id: 1,
    name: "Golden Turmeric Latte",
    image: "/golden-turmeric-latte.jpg",
    description: "Warming and anti-inflammatory golden milk with turmeric, ginger, and coconut milk.",
    dosha: ["vata", "kapha"],
    mealType: "breakfast",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    prepTime: 10,
    difficulty: "easy",
    rating: 4.8,
    benefits: "Reduces inflammation, supports digestion, and provides warming energy for Vata and Kapha types.",
    ingredients: [
      "1 cup coconut milk",
      "1 tsp turmeric powder",
      "1/2 tsp ginger powder",
      "1/4 tsp cinnamon",
      "Pinch of black pepper",
      "1 tsp honey or maple syrup",
    ],
    instructions: [
      "Heat coconut milk in a small saucepan over medium heat.",
      "Whisk in turmeric, ginger, cinnamon, and black pepper.",
      "Simmer for 3-4 minutes, stirring occasionally.",
      "Remove from heat and sweeten with honey or maple syrup.",
      "Strain if desired and serve warm.",
    ],
  },
  {
    id: 2,
    name: "Cooling Cucumber Mint Soup",
    image: "/cooling-cucumber-mint-soup.jpg",
    description: "Refreshing cold soup perfect for hot days and Pitta constitution.",
    dosha: ["pitta"],
    mealType: "lunch",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    prepTime: 15,
    difficulty: "easy",
    rating: 4.6,
    benefits: "Extremely cooling and hydrating, perfect for reducing Pitta heat and inflammation.",
    ingredients: [
      "3 large cucumbers, peeled and chopped",
      "1/2 cup fresh mint leaves",
      "1/2 cup coconut milk",
      "2 tbsp lime juice",
      "1 tsp fresh ginger, minced",
      "Salt to taste",
    ],
    instructions: [
      "Combine cucumbers, mint, and ginger in a blender.",
      "Add coconut milk and lime juice.",
      "Blend until smooth and creamy.",
      "Season with salt to taste.",
      "Chill for at least 1 hour before serving.",
      "Garnish with fresh mint leaves.",
    ],
  },
  {
    id: 3,
    name: "Energizing Quinoa Power Bowl",
    image: "/energizing-quinoa-power-bowl.jpg",
    description: "Nutrient-dense bowl with quinoa, roasted vegetables, and tahini dressing.",
    dosha: ["vata", "pitta"],
    mealType: "lunch",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    prepTime: 45,
    difficulty: "medium",
    rating: 4.7,
    benefits: "Provides sustained energy, complete proteins, and grounding nutrients for Vata types.",
    ingredients: [
      "1 cup quinoa",
      "2 cups mixed vegetables (sweet potato, bell peppers, zucchini)",
      "3 tbsp olive oil",
      "2 tbsp tahini",
      "1 lemon, juiced",
      "2 cloves garlic, minced",
      "Fresh herbs (parsley, cilantro)",
    ],
    instructions: [
      "Cook quinoa according to package instructions.",
      "Preheat oven to 400°F (200°C).",
      "Toss vegetables with olive oil, salt, and pepper.",
      "Roast vegetables for 25-30 minutes until tender.",
      "Whisk together tahini, lemon juice, and garlic for dressing.",
      "Serve quinoa topped with roasted vegetables and dressing.",
      "Garnish with fresh herbs.",
    ],
  },
  {
    id: 4,
    name: "Warming Ginger Carrot Soup",
    image: "/warming-ginger-carrot-soup.jpg",
    description: "Digestive and warming soup with fresh ginger and aromatic spices.",
    dosha: ["vata", "kapha"],
    mealType: "dinner",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    prepTime: 35,
    difficulty: "easy",
    rating: 4.5,
    benefits: "Stimulates digestion, provides warmth, and supports immune function.",
    ingredients: [
      "2 lbs carrots, peeled and chopped",
      "2 inches fresh ginger, peeled",
      "1 onion, diced",
      "3 cups vegetable broth",
      "1 can coconut milk",
      "1 tsp cumin",
      "1/2 tsp turmeric",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Sauté onion and ginger in oil until fragrant.",
      "Add carrots, cumin, and turmeric. Cook for 5 minutes.",
      "Add vegetable broth and bring to a boil.",
      "Simmer for 20 minutes until carrots are tender.",
      "Blend soup until smooth using an immersion blender.",
      "Stir in coconut milk and season with salt and pepper.",
      "Serve hot with fresh herbs.",
    ],
  },
  {
    id: 5,
    name: "Spiced Chickpea Curry",
    image: "/spiced-chickpea-curry.jpg",
    description: "Protein-rich curry with warming spices, perfect for Kapha types.",
    dosha: ["kapha"],
    mealType: "lunch",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    prepTime: 40,
    difficulty: "medium",
    rating: 4.9,
    benefits: "Stimulates metabolism, provides plant protein, and reduces Kapha heaviness.",
    ingredients: [
      "2 cups cooked chickpeas",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1 inch ginger, minced",
      "1 can diced tomatoes",
      "1 tsp cumin seeds",
      "1 tsp coriander seeds",
      "1/2 tsp turmeric",
      "1/4 tsp cayenne pepper",
      "Fresh cilantro",
    ],
    instructions: [
      "Heat oil in a large pan and add cumin and coriander seeds.",
      "Add onion, garlic, and ginger. Sauté until golden.",
      "Add turmeric and cayenne, cook for 1 minute.",
      "Add tomatoes and cook until they break down.",
      "Add chickpeas and simmer for 15 minutes.",
      "Season with salt and garnish with cilantro.",
      "Serve with rice or flatbread.",
    ],
  },
  {
    id: 6,
    name: "Coconut Rice Pudding",
    image: "/coconut-rice-pudding.jpg",
    description: "Creamy, cooling dessert with cardamom and rose water.",
    dosha: ["pitta"],
    mealType: "snack",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    prepTime: 25,
    difficulty: "easy",
    rating: 4.4,
    benefits: "Cooling and soothing for Pitta, provides natural sweetness and satisfaction.",
    ingredients: [
      "1 cup basmati rice",
      "2 cups coconut milk",
      "1/4 cup maple syrup",
      "1/2 tsp cardamom powder",
      "1 tsp rose water",
      "Chopped pistachios for garnish",
    ],
    instructions: [
      "Cook rice with extra water until very soft.",
      "Add coconut milk and simmer until creamy.",
      "Stir in maple syrup and cardamom.",
      "Add rose water and mix gently.",
      "Serve chilled, garnished with pistachios.",
    ],
  },
  {
    id: 7,
    name: "Detox Green Smoothie",
    image: "/detox-green-smoothie.jpg",
    description: "Cleansing smoothie with leafy greens, cucumber, and mint.",
    dosha: ["pitta", "kapha"],
    mealType: "breakfast",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    prepTime: 10,
    difficulty: "easy",
    rating: 4.3,
    benefits: "Supports detoxification, provides chlorophyll, and energizes without heaviness.",
    ingredients: [
      "2 cups spinach",
      "1 cucumber",
      "1/2 avocado",
      "1 cup coconut water",
      "1/4 cup mint leaves",
      "1 tbsp lime juice",
      "1 tsp fresh ginger",
    ],
    instructions: [
      "Wash all greens thoroughly.",
      "Add all ingredients to a high-speed blender.",
      "Blend until smooth and creamy.",
      "Add more coconut water if needed for consistency.",
      "Serve immediately over ice.",
    ],
  },
  {
    id: 8,
    name: "Warming Oat Porridge",
    image: "/warming-oat-porridge.jpg",
    description: "Nourishing breakfast porridge with warming spices and nuts.",
    dosha: ["vata"],
    mealType: "breakfast",
    dietary: ["vegetarian", "gluten-free"],
    prepTime: 20,
    difficulty: "easy",
    rating: 4.6,
    benefits: "Grounding and nourishing for Vata, provides sustained energy and warmth.",
    ingredients: [
      "1 cup rolled oats",
      "2 cups almond milk",
      "1 tsp cinnamon",
      "1/4 tsp cardamom",
      "2 tbsp chopped almonds",
      "1 tbsp ghee",
      "2 dates, chopped",
    ],
    instructions: [
      "Heat ghee in a saucepan over medium heat.",
      "Add oats and toast for 2-3 minutes.",
      "Add almond milk, cinnamon, and cardamom.",
      "Simmer for 10-15 minutes, stirring occasionally.",
      "Stir in chopped dates and almonds.",
      "Serve warm with additional toppings if desired.",
    ],
  },
  {
    id: 9,
    name: "Cooling Watermelon Salad",
    image: "/cooling-watermelon-salad.jpg",
    description: "Refreshing summer salad with watermelon, mint, and lime.",
    dosha: ["pitta"],
    mealType: "snack",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    prepTime: 15,
    difficulty: "easy",
    rating: 4.2,
    benefits: "Extremely cooling and hydrating, perfect for hot weather and Pitta balance.",
    ingredients: [
      "4 cups cubed watermelon",
      "1/4 cup fresh mint leaves",
      "2 tbsp lime juice",
      "1 tbsp olive oil",
      "1/4 cup crumbled feta (optional)",
      "Salt to taste",
    ],
    instructions: [
      "Cut watermelon into bite-sized cubes.",
      "Roughly chop mint leaves.",
      "Whisk together lime juice and olive oil.",
      "Combine watermelon and mint in a large bowl.",
      "Drizzle with dressing and toss gently.",
      "Add feta if using and serve chilled.",
    ],
  },
  {
    id: 10,
    name: "Spicy Lentil Stew",
    image: "/spicy-lentil-stew.jpg",
    description: "Hearty stew with red lentils and metabolism-boosting spices.",
    dosha: ["kapha"],
    mealType: "dinner",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    prepTime: 35,
    difficulty: "medium",
    rating: 4.7,
    benefits: "Stimulates Agni (digestive fire), provides protein, and reduces Kapha accumulation.",
    ingredients: [
      "1 cup red lentils",
      "2 cups vegetable broth",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "1 tsp mustard seeds",
      "1 tsp turmeric",
      "1/2 tsp cayenne pepper",
      "1 tsp garam masala",
      "Fresh cilantro",
    ],
    instructions: [
      "Rinse lentils and set aside.",
      "Heat oil and add mustard seeds until they pop.",
      "Add onion and garlic, sauté until golden.",
      "Add spices and cook for 1 minute.",
      "Add lentils and broth, bring to a boil.",
      "Simmer for 20-25 minutes until lentils are soft.",
      "Garnish with cilantro and serve hot.",
    ],
  },
  {
    id: 11,
    name: "Soothing Chamomile Tea Blend",
    image: "/soothing-chamomile-tea-blend.jpg",
    description: "Calming herbal tea blend for evening relaxation.",
    dosha: ["vata", "pitta"],
    mealType: "snack",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    prepTime: 10,
    difficulty: "easy",
    rating: 4.5,
    benefits: "Calms the nervous system, aids digestion, and promotes restful sleep.",
    ingredients: [
      "2 tsp dried chamomile flowers",
      "1 tsp dried lavender",
      "1/2 tsp fennel seeds",
      "1 cup hot water",
      "Honey to taste",
    ],
    instructions: [
      "Combine chamomile, lavender, and fennel in a tea strainer.",
      "Pour hot water over the herbs.",
      "Steep for 5-7 minutes.",
      "Remove strainer and add honey if desired.",
      "Serve warm before bedtime.",
    ],
  },
  {
    id: 12,
    name: "Energizing Chia Pudding",
    image: "/energizing-chia-pudding.jpg",
    description: "Nutrient-dense pudding with chia seeds, coconut milk, and berries.",
    dosha: ["vata", "pitta"],
    mealType: "breakfast",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    prepTime: 10,
    difficulty: "easy",
    rating: 4.4,
    benefits: "Provides omega-3 fatty acids, fiber, and sustained energy for morning vitality.",
    ingredients: [
      "1/4 cup chia seeds",
      "1 cup coconut milk",
      "2 tbsp maple syrup",
      "1/2 tsp vanilla extract",
      "1/2 cup mixed berries",
      "2 tbsp chopped nuts",
    ],
    instructions: [
      "Whisk together chia seeds, coconut milk, maple syrup, and vanilla.",
      "Let sit for 5 minutes, then whisk again to prevent clumping.",
      "Refrigerate for at least 2 hours or overnight.",
      "Stir before serving and top with berries and nuts.",
      "Serve chilled in glasses or bowls.",
    ],
  },
]

// Initialize the recipe explorer
document.addEventListener("DOMContentLoaded", () => {
  allRecipes = [...recipeDatabase]
  filteredRecipes = [...allRecipes]
  renderRecipes()
  setupEventListeners()
  updateResultsCount()
})

function setupEventListeners() {
  // Search functionality
  document.getElementById("recipe-search").addEventListener("input", (e) => {
    currentFilters.search = e.target.value.toLowerCase()
    applyFilters()
  })

  // Filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const filterType = e.currentTarget.dataset.type
      const filterValue = e.currentTarget.dataset.filter

      handleFilterClick(filterType, filterValue, e.currentTarget)
    })
  })

  // Sort functionality
  document.getElementById("sort-select").addEventListener("change", (e) => {
    currentSort = e.target.value
    sortRecipes()
    renderRecipes()
  })

  // Load more functionality
  document.getElementById("load-more-btn").addEventListener("click", () => {
    currentPage++
    renderRecipes(true)
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

function handleFilterClick(filterType, filterValue, buttonElement) {
  if (filterType === "dosha" || filterType === "meal") {
    // Single selection filters
    document.querySelectorAll(`[data-type="${filterType}"]`).forEach((btn) => {
      btn.classList.remove("active")
    })
    buttonElement.classList.add("active")
    currentFilters[filterType] = filterValue
  } else {
    // Multiple selection filters
    buttonElement.classList.toggle("active")
    if (buttonElement.classList.contains("active")) {
      if (!currentFilters[filterType].includes(filterValue)) {
        currentFilters[filterType].push(filterValue)
      }
    } else {
      currentFilters[filterType] = currentFilters[filterType].filter((f) => f !== filterValue)
    }
  }

  applyFilters()
  updateActiveFilters()
}

function applyFilters() {
  filteredRecipes = allRecipes.filter((recipe) => {
    // Search filter
    if (
      currentFilters.search &&
      !recipe.name.toLowerCase().includes(currentFilters.search) &&
      !recipe.description.toLowerCase().includes(currentFilters.search) &&
      !recipe.benefits.toLowerCase().includes(currentFilters.search)
    ) {
      return false
    }

    // Dosha filter
    if (currentFilters.dosha !== "all" && !recipe.dosha.includes(currentFilters.dosha)) {
      return false
    }

    // Meal type filter
    if (currentFilters.meal !== "all" && recipe.mealType !== currentFilters.meal) {
      return false
    }

    // Dietary filters
    if (currentFilters.dietary.length > 0) {
      const hasAllDietary = currentFilters.dietary.every((diet) => recipe.dietary.includes(diet))
      if (!hasAllDietary) return false
    }

    // Time filters
    if (currentFilters.time.length > 0) {
      const timeMatch = currentFilters.time.some((timeFilter) => {
        if (timeFilter === "quick") return recipe.prepTime <= 30
        if (timeFilter === "medium") return recipe.prepTime > 30 && recipe.prepTime <= 60
        if (timeFilter === "long") return recipe.prepTime > 60
        return false
      })
      if (!timeMatch) return false
    }

    return true
  })

  currentPage = 1
  sortRecipes()
  renderRecipes()
  updateResultsCount()
}

function sortRecipes() {
  filteredRecipes.sort((a, b) => {
    switch (currentSort) {
      case "name":
        return a.name.localeCompare(b.name)
      case "prep-time":
        return a.prepTime - b.prepTime
      case "difficulty":
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 }
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })
}

function renderRecipes(append = false) {
  const recipesGrid = document.getElementById("recipes-grid")
  const startIndex = append ? (currentPage - 1) * recipesPerPage : 0
  const endIndex = currentPage * recipesPerPage
  const recipesToShow = filteredRecipes.slice(startIndex, endIndex)

  if (!append) {
    recipesGrid.innerHTML = ""
  }

  recipesToShow.forEach((recipe) => {
    const recipeCard = createRecipeCard(recipe)
    recipesGrid.appendChild(recipeCard)
  })

  // Update load more button visibility
  const loadMoreBtn = document.getElementById("load-more-btn")
  if (endIndex >= filteredRecipes.length) {
    loadMoreBtn.style.display = "none"
  } else {
    loadMoreBtn.style.display = "block"
  }
}

function createRecipeCard(recipe) {
  const card = document.createElement("div")
  card.className = "recipe-card"
  card.onclick = () => openRecipeModal(recipe)

  const doshaColors = {
    vata: "dosha-vata",
    pitta: "dosha-pitta",
    kapha: "dosha-kapha",
  }

  const doshaBadges = recipe.dosha
    .map((dosha) => `<span class="recipe-badge ${doshaColors[dosha]}">${dosha.toUpperCase()}</span>`)
    .join("")

  card.innerHTML = `
    <div class="recipe-content">
      <div class="recipe-header">
        <h3 class="recipe-title">${recipe.name}</h3>
        <div class="recipe-badges-inline">${doshaBadges}</div>
        <div class="recipe-meta">
          <span><i class="fas fa-clock"></i> ${recipe.prepTime} min</span>
          <span><i class="fas fa-signal"></i> ${recipe.difficulty}</span>
          <span><i class="fas fa-star"></i> ${recipe.rating}</span>
        </div>
      </div>
      <p class="recipe-description">${recipe.description}</p>
      <div class="recipe-benefits">
        <h4>Ayurvedic Benefits</h4>
        <p>${recipe.benefits}</p>
      </div>
      <div class="recipe-actions">
        <button class="btn btn-primary btn-icon" onclick="event.stopPropagation(); openAddToPlanModal('${recipe.name}', ${recipe.id})">
          <i class="fas fa-plus"></i>
          Add to Plan
        </button>
        <button class="btn btn-outline btn-icon" onclick="event.stopPropagation(); toggleFavorite(${recipe.id})">
          <i class="fas fa-heart"></i>
          Favorite
        </button>
      </div>
    </div>
  `

  return card
}

function updateActiveFilters() {
  const activeFiltersContainer = document.getElementById("active-filters")
  activeFiltersContainer.innerHTML = ""

  // Add active filters
  const activeFilters = []

  if (currentFilters.dosha !== "all") {
    activeFilters.push({ type: "dosha", value: currentFilters.dosha })
  }

  if (currentFilters.meal !== "all") {
    activeFilters.push({ type: "meal", value: currentFilters.meal })
  }

  currentFilters.dietary.forEach((diet) => {
    activeFilters.push({ type: "dietary", value: diet })
  })

  currentFilters.time.forEach((time) => {
    activeFilters.push({ type: "time", value: time })
  })

  activeFilters.forEach((filter) => {
    const filterTag = document.createElement("div")
    filterTag.className = "active-filter-tag"
    filterTag.innerHTML = `
      ${filter.value}
      <button onclick="removeFilter('${filter.type}', '${filter.value}')">×</button>
    `
    activeFiltersContainer.appendChild(filterTag)
  })
}

function removeFilter(filterType, filterValue) {
  if (filterType === "dosha" || filterType === "meal") {
    currentFilters[filterType] = "all"
    document.querySelector(`[data-type="${filterType}"][data-filter="all"]`).classList.add("active")
    document.querySelector(`[data-type="${filterType}"][data-filter="${filterValue}"]`).classList.remove("active")
  } else {
    currentFilters[filterType] = currentFilters[filterType].filter((f) => f !== filterValue)
    document.querySelector(`[data-type="${filterType}"][data-filter="${filterValue}"]`).classList.remove("active")
  }

  applyFilters()
  updateActiveFilters()
}

function updateResultsCount() {
  document.getElementById("results-count").textContent = `${filteredRecipes.length} recipes found`
}

function openRecipeModal(recipe) {
  document.getElementById("modal-recipe-title").textContent = recipe.name
  const recipeDetailContent = document.getElementById("recipe-detail-content")

  const doshaColors = {
    vata: "#42a5f5",
    pitta: "#f4511e",
    kapha: "#66bb6a",
  }

  const doshaBadges = recipe.dosha
    .map(
      (dosha) => `<span class="recipe-badge" style="background: ${doshaColors[dosha]};">${dosha.toUpperCase()}</span>`,
    )
    .join("")

  recipeDetailContent.innerHTML = `
    <div class="recipe-detail-header">
      <div class="recipe-detail-info">
        <div style="margin-bottom: 1rem;">${doshaBadges}</div>
        <div class="recipe-detail-meta">
          <div class="meta-item">
            <i class="fas fa-clock"></i>
            <span>${recipe.prepTime} minutes</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-signal"></i>
            <span>${recipe.difficulty}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-star"></i>
            <span>${recipe.rating}/5</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-utensils"></i>
            <span>${recipe.mealType}</span>
          </div>
        </div>
        <p class="recipe-detail-description">${recipe.description}</p>
        <div class="recipe-detail-benefits">
          <h4>Ayurvedic Benefits</h4>
          <p>${recipe.benefits}</p>
        </div>
      </div>
    </div>
    
    <div class="recipe-ingredients">
      <h4><i class="fas fa-list"></i> Ingredients</h4>
      <div class="ingredients-list">
        ${recipe.ingredients
          .map(
            (ingredient) => `
          <div class="ingredient-item">
            <i class="fas fa-check"></i>
            <span>${ingredient}</span>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
    
    <div class="recipe-instructions">
      <h4><i class="fas fa-list-ol"></i> Instructions</h4>
      <div class="instructions-list">
        ${recipe.instructions
          .map(
            (instruction, index) => `
          <div class="instruction-step">
            <div class="step-number">${index + 1}</div>
            <div class="step-text">${instruction}</div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
    
    <div class="recipe-detail-actions">
      <button class="btn btn-primary" onclick="openAddToPlanModal('${recipe.name}', ${recipe.id})">
        <i class="fas fa-plus"></i>
        Add to Diet Plan
      </button>
      <button class="btn btn-outline" onclick="toggleFavorite(${recipe.id})">
        <i class="fas fa-heart"></i>
        Add to Favorites
      </button>
      <button class="btn btn-secondary" onclick="shareRecipe(${recipe.id})">
        <i class="fas fa-share"></i>
        Share Recipe
      </button>
    </div>
  `

  document.getElementById("recipe-modal").style.display = "block"
}

function closeRecipeModal() {
  document.getElementById("recipe-modal").style.display = "none"
}

function openAddToPlanModal(recipeName, recipeId) {
  document.getElementById("plan-recipe-name").textContent = recipeName
  document.getElementById("add-to-plan-modal").style.display = "block"
  document.getElementById("add-to-plan-modal").dataset.recipeId = recipeId
}

function closeAddToPlanModal() {
  document.getElementById("add-to-plan-modal").style.display = "none"
}

function confirmAddToPlan() {
  const recipeName = document.getElementById("plan-recipe-name").textContent
  const day = document.getElementById("plan-day").value
  const meal = document.getElementById("plan-meal").value

  // In a real app, this would save to the user's diet plan
  alert(`${recipeName} has been added to your ${day} ${meal}!`)

  closeAddToPlanModal()
  closeRecipeModal()
}

function toggleFavorite(recipeId) {
  // In a real app, this would toggle the favorite status
  const recipe = allRecipes.find((r) => r.id === recipeId)
  alert(`${recipe.name} ${Math.random() > 0.5 ? "added to" : "removed from"} your favorites!`)
}

function shareRecipe(recipeId) {
  const recipe = allRecipes.find((r) => r.id === recipeId)
  const text = `Check out this amazing Ayurvedic recipe: ${recipe.name}! Perfect for ${recipe.dosha.join(" and ")} types.`

  if (navigator.share) {
    navigator.share({
      title: recipe.name,
      text: text,
      url: window.location.href,
    })
  } else {
    navigator.clipboard.writeText(text + " " + window.location.href).then(() => {
      alert("Recipe link copied to clipboard!")
    })
  }
}
