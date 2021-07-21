const sectionCenterEl = document.querySelector(".section-center");

const projects = [
  {
    name: "Assignment-1 Periodic Table",
    link: "./1_periodic_table/assignment_1.html",
    image: "./images/assignment-1-periodic-table.png",
  },

  {
    name: "Assignment-2 Student Registration Form",
    link: "./2_student_registration_form/assignment_2.html",
    image: "./images/assignment-2-student-registration-form-png",
  },

  {
    name: "Assignment-3 Saylani Home Page",
    link: "./3_saylani_home_page/index.html",
    image: "./images/assignment-3-saylani-home-page.png",
  },

  {
    name: "Assignment-4 Tech Internet Website Provider",
    link: "./4_tech_internet_service_provider/index.html",
    image: "./images/assignment-4-full-website.png",
  },

  {
    name: "Assignment-5 JavaScript Calculator",
    link: "./5_javascript_calculator/index.html",
    image: "./images/assignment-javascript-calculator.png",
  },

  {
    name: "Stop Watch",
    link: "./6_stopwatch/index.html",
    image: "./images/stopwatch.png",
  },

  {
    name: "Todo App",
    link: "./7_todoApp/index.html",
    image: "./images/todoapp.png",
  },

  {
    name: "Quiz App",
    link: "./8_quiz_app/index.html",
    image: "./images/quizapp.png",
  },

  {
    name: "Todo App with Firebase",
    link: "./9_todoApp_with_firebase/index.html",
    image: "./images/todoapp.png",
  },

  {
    name: "Student Marksheet",
    link: "./10_marksheet/index.html",
    image: "./images/marksheet.png",
  },

  {
    name: "Torch App",
    link: "./11_torch/index.html",
    image: "./images/LIGHT.png",
  },

  {
    name: "Guessing Gaming",
    link: "./12_guess_the_number/index.html",
    image: "./images/guessing_game.png",
  },

  {
    name: "New Year CountDown Timer",
    link: "./13_countdown-timer/index.html",
    image: "./images/countdown-timer.png",
  },

  {
    name: "Quiz App with Firebase Database",
    link: "./14_quiz_app_with_firebase/index.html",
    image: "./images/quiz-app-with-firebase.png",
  },

  {
    name: "Chat App",
    link: "./16_chat-app/index.html",
    image: "./images/chat-app.png",
  },

  {
    name: "Text Editor",
    link: "./17_text_editor/index.html",
    image: "./images/text-editor.png",
  },

  {
    name: "Github Profile",
    link: "./18_github-profile/index.html",
    image: "./images/github-profile-app.png",
  },

  {
    name: "Movies App",
    link: "./19_movies-app/index.html",
    image: "./images/movie-app.png",
  },

  {
    name: "Notes App",
    link: "./20_notes-app/index.html",
    image: "./images/notes-app.png",
  },

  {
    name: "Password Generator",
    link: "./21_password_generator/index.html",
    image: "./images/password-generator.png",
  },

  {
    name: "Recipe App",
    link: "./22_recipe-app/index.html",
    image: "./images/recipe.png",
  },

  {
    name: "Weather App",
    link: "./23_weather_app/index.html",
    image: "./images/weather-app.png",
  },

  {
    name: "BackRoads Tour Company",
    link: "./24_back_roads/index.html",
    image: "./images/backroad.png",
  },

  {
    name: "CSS Grid Mini Projects",
    link: "./25_css_grid_mini_project/index.html",
    image: "./images/grid-mini-project.png",
  },

  {
    name: "Portfolio Project",
    link: "./26_portfolio/index.html",
    image: "./images/portfolio-project.png",
  },

  {
    name: "Pricing Cards",
    link: "./27_html_css_mini_projects/pricing-cards/index.html",
    image: "./images/pricing-cards.png",
  },

  {
    name: "Profile Cards",
    link: "./27_html_css_mini_projects/profile-cards/index.html",
    image: "./images/profile-card.PNG",
  },

  {
    name: "Sign Up Form",
    link: "./27_html_css_mini_projects/sign-up-form/index.html",
    image: "./images/sign-up-form.png",
  },

  {
    name: "Submit Form",
    link: "./27_html_css_mini_projects/submit-form/index.html",
    image: "./images/submit-form.png",
  },

  {
    name: "Star Bucks Landing Page",
    link: "./29_starbucks/index.html",
    image: "./images/star-bucks.png",
  },
];

projects.forEach((project) => {
  const { link, image, name } = project;
  const singleProjectCard = createSingleCard(link, image, name);
  sectionCenterEl.innerHTML += singleProjectCard;
});

function createSingleCard(link, image, name) {
  return `
     <a href=${link} target="_blank" class="project">
          <img src=${image} alt=${name} />
          <footer>
            <h4>${name}</h4>
          </footer>
        </a>
  
  `;
}

// smooth scroll

const scrollEl = document.querySelector(".scroll-link");

scrollEl.addEventListener("click", (e) => {
  e.preventDefault();

  const id = e.target.getAttribute("href").slice(1);
  const element = document.getElementById(id);

  let position = element.offsetTop - 62;
  window.scrollTo({
    left: 0,
    top: position,
    behavior: "smooth",
  });
});
