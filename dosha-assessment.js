// Dosha Assessment Quiz Logic
const questions = [
  {
    id: 1,
    text: "How would you describe your body frame?",
    options: [
      { text: "Thin, light, small-boned", dosha: "vata", points: 3 },
      { text: "Medium build, moderate weight", dosha: "pitta", points: 3 },
      { text: "Large frame, heavy, well-built", dosha: "kapha", points: 3 },
      { text: "Varies between thin and medium", dosha: "vata", points: 1 },
    ],
  },
  {
    id: 2,
    text: "What is your skin type?",
    options: [
      { text: "Dry, rough, thin, cool", dosha: "vata", points: 3 },
      { text: "Warm, oily, prone to irritation", dosha: "pitta", points: 3 },
      { text: "Thick, moist, smooth, cool", dosha: "kapha", points: 3 },
      { text: "Combination or varies seasonally", dosha: "vata", points: 1 },
    ],
  },
  {
    id: 3,
    text: "How is your hair naturally?",
    options: [
      { text: "Dry, brittle, thin", dosha: "vata", points: 3 },
      { text: "Fine, oily, early graying/balding", dosha: "pitta", points: 3 },
      { text: "Thick, lustrous, strong", dosha: "kapha", points: 3 },
      { text: "Normal with seasonal changes", dosha: "pitta", points: 1 },
    ],
  },
  {
    id: 4,
    text: "What is your appetite like?",
    options: [
      { text: "Variable, sometimes forget to eat", dosha: "vata", points: 3 },
      { text: "Strong, get irritable when hungry", dosha: "pitta", points: 3 },
      { text: "Steady, can skip meals easily", dosha: "kapha", points: 3 },
      { text: "Depends on mood and activity", dosha: "vata", points: 1 },
    ],
  },
  {
    id: 5,
    text: "How do you handle stress?",
    options: [
      { text: "Become anxious and worried", dosha: "vata", points: 3 },
      { text: "Become irritated and angry", dosha: "pitta", points: 3 },
      { text: "Remain calm and steady", dosha: "kapha", points: 3 },
      { text: "Varies depending on the situation", dosha: "vata", points: 1 },
    ],
  },
  {
    id: 6,
    text: "What is your sleep pattern?",
    options: [
      { text: "Light sleeper, difficulty falling asleep", dosha: "vata", points: 3 },
      { text: "Moderate sleep, wake up refreshed", dosha: "pitta", points: 3 },
      { text: "Deep sleeper, hard to wake up", dosha: "kapha", points: 3 },
      { text: "Varies with stress and season", dosha: "vata", points: 1 },
    ],
  },
  {
    id: 7,
    text: "How is your energy throughout the day?",
    options: [
      { text: "Comes in bursts, then crashes", dosha: "vata", points: 3 },
      { text: "Steady and intense", dosha: "pitta", points: 3 },
      { text: "Steady and enduring", dosha: "kapha", points: 3 },
      { text: "Depends on what I'm doing", dosha: "pitta", points: 1 },
    ],
  },
  {
    id: 8,
    text: "How do you learn new things?",
    options: [
      { text: "Quickly but forget easily", dosha: "vata", points: 3 },
      { text: "Moderately fast with good retention", dosha: "pitta", points: 3 },
      { text: "Slowly but remember for long time", dosha: "kapha", points: 3 },
      { text: "Depends on my interest level", dosha: "pitta", points: 1 },
    ],
  },
  {
    id: 9,
    text: "What is your preferred climate?",
    options: [
      { text: "Warm and humid", dosha: "vata", points: 3 },
      { text: "Cool and well-ventilated", dosha: "pitta", points: 3 },
      { text: "Warm and dry", dosha: "kapha", points: 3 },
      { text: "Moderate temperatures", dosha: "pitta", points: 1 },
    ],
  },
  {
    id: 10,
    text: "How do you make decisions?",
    options: [
      { text: "Quickly but often change my mind", dosha: "vata", points: 3 },
      { text: "Decisively after analyzing", dosha: "pitta", points: 3 },
      { text: "Slowly and stick to them", dosha: "kapha", points: 3 },
      { text: "Depends on the importance", dosha: "pitta", points: 1 },
    ],
  },
  {
    id: 11,
    text: "What is your walking pace?",
    options: [
      { text: "Fast and light", dosha: "vata", points: 3 },
      { text: "Moderate and purposeful", dosha: "pitta", points: 3 },
      { text: "Slow and steady", dosha: "kapha", points: 3 },
      { text: "Varies with my mood", dosha: "vata", points: 1 },
    ],
  },
  {
    id: 12,
    text: "How do you handle change?",
    options: [
      { text: "Love variety and new experiences", dosha: "vata", points: 3 },
      { text: "Adapt well if it makes sense", dosha: "pitta", points: 3 },
      { text: "Prefer routine and stability", dosha: "kapha", points: 3 },
      { text: "Depends on the type of change", dosha: "pitta", points: 1 },
    ],
  },
  {
    id: 13,
    text: "What is your voice like?",
    options: [
      { text: "Soft, weak, or hoarse", dosha: "vata", points: 3 },
      { text: "Sharp, clear, penetrating", dosha: "pitta", points: 3 },
      { text: "Deep, melodious, pleasant", dosha: "kapha", points: 3 },
      { text: "Changes with my energy level", dosha: "vata", points: 1 },
    ],
  },
  {
    id: 14,
    text: "How do you spend money?",
    options: [
      { text: "Impulsively on small things", dosha: "vata", points: 3 },
      { text: "On quality items I research", dosha: "pitta", points: 3 },
      { text: "Carefully, save for big purchases", dosha: "kapha", points: 3 },
      { text: "Depends on my current needs", dosha: "pitta", points: 1 },
    ],
  },
  {
    id: 15,
    text: "What is your memory like?",
    options: [
      { text: "Good short-term, poor long-term", dosha: "vata", points: 3 },
      { text: "Sharp and clear", dosha: "pitta", points: 3 },
      { text: "Slow to learn but never forget", dosha: "kapha", points: 3 },
      { text: "Better for things I'm interested in", dosha: "pitta", points: 1 },
    ],
  },
  {
    id: 16,
    text: "How do you express emotions?",
    options: [
      { text: "Quickly and intensely, then move on", dosha: "vata", points: 3 },
      { text: "Directly and sometimes forcefully", dosha: "pitta", points: 3 },
      { text: "Slowly and hold onto them", dosha: "kapha", points: 3 },
      { text: "Depends on the situation", dosha: "vata", points: 1 },
    ],
  },
  {
    id: 17,
    text: "What is your digestion like?",
    options: [
      { text: "Irregular, gas, bloating", dosha: "vata", points: 3 },
      { text: "Strong, heartburn if I skip meals", dosha: "pitta", points: 3 },
      { text: "Slow but steady", dosha: "kapha", points: 3 },
      { text: "Generally good with some issues", dosha: "pitta", points: 1 },
    ],
  },
  {
    id: 18,
    text: "How do you prefer to exercise?",
    options: [
      { text: "Light, varied activities", dosha: "vata", points: 3 },
      { text: "Moderate, competitive sports", dosha: "pitta", points: 3 },
      { text: "Slow, steady, endurance activities", dosha: "kapha", points: 3 },
      { text: "Whatever fits my schedule", dosha: "pitta", points: 1 },
    ],
  },
  {
    id: 19,
    text: "What motivates you most?",
    options: [
      { text: "Variety and creative expression", dosha: "vata", points: 3 },
      { text: "Achievement and recognition", dosha: "pitta", points: 3 },
      { text: "Security and helping others", dosha: "kapha", points: 3 },
      { text: "Personal growth and learning", dosha: "pitta", points: 1 },
    ],
  },
  {
    id: 20,
    text: "How do you relax?",
    options: [
      { text: "Need stimulation, hard to sit still", dosha: "vata", points: 3 },
      { text: "Reading, learning something new", dosha: "pitta", points: 3 },
      { text: "Resting, gentle activities", dosha: "kapha", points: 3 },
      { text: "Depends on my energy level", dosha: "vata", points: 1 },
    ],
  },
]

let currentQuestionIndex = 0
let answers = []
let scores = { vata: 0, pitta: 0, kapha: 0 }

// Dosha information
const doshaInfo = {
  vata: {
    name: "Vata",
    element: "Air & Space",
    color: "#42a5f5",
    description:
      "You are primarily Vata, characterized by movement, creativity, and quick thinking. Vata types are energetic, creative, and adaptable but may experience anxiety and irregular patterns when out of balance.",
    characteristics: {
      "Physical Traits": ["Light, thin build", "Dry skin and hair", "Cold hands and feet", "Variable appetite"],
      "Mental Traits": ["Quick thinking", "Creative and imaginative", "Enthusiastic", "Good short-term memory"],
      "Emotional Traits": [
        "Expressive and talkative",
        "Prone to worry and anxiety",
        "Changeable moods",
        "Sensitive to stress",
      ],
    },
  },
  pitta: {
    name: "Pitta",
    element: "Fire & Water",
    color: "#f4511e",
    description:
      "You are primarily Pitta, characterized by transformation, intelligence, and leadership. Pitta types are focused, ambitious, and organized but may experience anger and inflammation when out of balance.",
    characteristics: {
      "Physical Traits": ["Medium build", "Warm body temperature", "Good muscle tone", "Strong appetite"],
      "Mental Traits": ["Sharp intellect", "Good concentration", "Organized and efficient", "Natural leaders"],
      "Emotional Traits": [
        "Confident and courageous",
        "Can be irritable or angry",
        "Competitive nature",
        "Direct communication",
      ],
    },
  },
  kapha: {
    name: "Kapha",
    element: "Earth & Water",
    color: "#66bb6a",
    description:
      "You are primarily Kapha, characterized by stability, strength, and nurturing. Kapha types are calm, loyal, and patient but may experience lethargy and attachment when out of balance.",
    characteristics: {
      "Physical Traits": ["Solid, heavy build", "Smooth, moist skin", "Thick hair", "Steady appetite"],
      "Mental Traits": ["Calm and steady", "Good long-term memory", "Methodical approach", "Patient and persistent"],
      "Emotional Traits": ["Loving and compassionate", "Loyal and devoted", "Can be possessive", "Slow to anger"],
    },
  },
}

function startAssessment() {
  document.getElementById("intro-section").style.display = "none"
  document.getElementById("quiz-section").style.display = "block"
  document.getElementById("total-questions").textContent = questions.length
  showQuestion()
}

function showQuestion() {
  const question = questions[currentQuestionIndex]
  const questionCard = document.getElementById("question-card")

  // Add animation
  questionCard.style.opacity = "0"
  questionCard.style.transform = "translateY(20px)"

  setTimeout(() => {
    document.getElementById("question-text").textContent = question.text
    document.getElementById("current-question").textContent = currentQuestionIndex + 1

    const optionsContainer = document.getElementById("question-options")
    optionsContainer.innerHTML = ""

    question.options.forEach((option, index) => {
      const button = document.createElement("button")
      button.className = "option-button"
      button.textContent = option.text
      button.onclick = () => selectOption(index)
      optionsContainer.appendChild(button)
    })

    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100
    document.getElementById("progress-fill").style.width = progress + "%"

    // Update navigation buttons
    document.getElementById("prev-btn").disabled = currentQuestionIndex === 0
    document.getElementById("next-btn").disabled = true

    // Animate in
    questionCard.style.opacity = "1"
    questionCard.style.transform = "translateY(0)"
  }, 200)
}

function selectOption(optionIndex) {
  const options = document.querySelectorAll(".option-button")
  options.forEach((option) => option.classList.remove("selected"))
  options[optionIndex].classList.add("selected")

  // Store answer
  answers[currentQuestionIndex] = optionIndex

  // Enable next button
  document.getElementById("next-btn").disabled = false
}

function nextQuestion() {
  if (answers[currentQuestionIndex] === undefined) return

  // Calculate score for current question
  const question = questions[currentQuestionIndex]
  const selectedOption = question.options[answers[currentQuestionIndex]]
  scores[selectedOption.dosha] += selectedOption.points

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++
    showQuestion()
  } else {
    showResults()
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    // Remove score from current question
    const question = questions[currentQuestionIndex]
    if (answers[currentQuestionIndex] !== undefined) {
      const selectedOption = question.options[answers[currentQuestionIndex]]
      scores[selectedOption.dosha] -= selectedOption.points
    }

    currentQuestionIndex--
    showQuestion()
  }
}

function showResults() {
  document.getElementById("quiz-section").style.display = "none"
  document.getElementById("results-section").style.display = "block"

  // Calculate percentages
  const totalScore = scores.vata + scores.pitta + scores.kapha
  const percentages = {
    vata: Math.round((scores.vata / totalScore) * 100),
    pitta: Math.round((scores.pitta / totalScore) * 100),
    kapha: Math.round((scores.kapha / totalScore) * 100),
  }

  // Find primary dosha
  const primaryDosha = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b))

  // Animate results
  setTimeout(() => {
    // Update bars and percentages
    Object.keys(percentages).forEach((dosha) => {
      document.getElementById(`${dosha}-fill`).style.width = percentages[dosha] + "%"
      document.getElementById(`${dosha}-percentage`).textContent = percentages[dosha] + "%"
    })

    // Show primary dosha information
    showPrimaryDoshaInfo(primaryDosha)
  }, 500)
}

function showPrimaryDoshaInfo(primaryDosha) {
  const info = doshaInfo[primaryDosha]
  const container = document.getElementById("primary-dosha")

  container.innerHTML = `
    <div class="dosha-icon ${primaryDosha}-icon" style="width: 100px; height: 100px; font-size: 2.5rem; margin: 0 auto 1.5rem;">
      <i class="fas fa-${primaryDosha === "vata" ? "wind" : primaryDosha === "pitta" ? "fire" : "mountain"}"></i>
    </div>
    <h2 style="color: ${info.color};">Primary Dosha: ${info.name}</h2>
    <p class="dosha-description">${info.description}</p>
    <div class="dosha-characteristics">
      ${Object.entries(info.characteristics)
        .map(
          ([category, traits]) => `
        <div class="characteristic-card">
          <h4>${category}</h4>
          <ul>
            ${traits.map((trait) => `<li>${trait}</li>`).join("")}
          </ul>
        </div>
      `,
        )
        .join("")}
    </div>
  `
}

function getDietPlan() {
  // Store results in localStorage for diet plan page
  localStorage.setItem(
    "doshaResults",
    JSON.stringify({
      scores: scores,
      primaryDosha: Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b)),
    }),
  )

  window.location.href = "diet-plan.html"
}

function retakeAssessment() {
  // Reset everything
  currentQuestionIndex = 0
  answers = []
  scores = { vata: 0, pitta: 0, kapha: 0 }

  document.getElementById("results-section").style.display = "none"
  document.getElementById("intro-section").style.display = "block"
}

function shareResults() {
  const primaryDosha = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b))
  const text = `I just discovered my Ayurvedic constitution! I'm primarily ${primaryDosha.charAt(0).toUpperCase() + primaryDosha.slice(1)}. Find out your dosha at ${window.location.origin}`

  if (navigator.share) {
    navigator.share({
      title: "My Ayurvedic Constitution",
      text: text,
      url: window.location.origin,
    })
  } else {
    // Fallback to copying to clipboard
    navigator.clipboard.writeText(text).then(() => {
      alert("Results copied to clipboard!")
    })
  }
}
