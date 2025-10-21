import { fetchJoke } from "./fetch";

const loadJokeBtn = document.getElementById("load-joke");
const saveJokeBtn = document.getElementById("save-joke");
const jokeText = document.getElementById("joke-text");
const savedJokesDiv = document.getElementById("saved-jokes");
const jokeAbsence = document.getElementById("no-jokes");
const lightSwitch = document.getElementById("mode-toggle");
const lightSlider = document.getElementById("light-slider");

const jokesArray = [];

async function displayJoke() {
  saveJokeBtn.style.display = "flex";
  const joke = await fetchJoke();
  jokeText.style.fontStyle = "normal";
  jokeText.innerText = joke.joke;
  jokeText.setAttribute("data-id", joke.id);
}

function saveJoke() {
  const jokeObj = {
    joke: jokeText.innerText,
    id: jokeText.getAttribute("data-id"),
  };
  if (jokesArray.some((joke) => joke.id === jokeObj.id)) {
    alert("This joke was already saved");
    return;
  }
  jokesArray.push(jokeObj);
  localStorage.setItem("jokes", JSON.stringify(jokesArray));

  jokeAbsence.style.display = "none";
  renderSavedJoke(jokeObj);
}

function renderSavedJoke({ joke, id }) {
  const jokeNode = document.createElement("div");
  const jokeText = document.createElement("p");
  const deleteJokeBtn = document.createElement("button");

  jokeNode.classList.add("saved-joke");
  jokeNode.setAttribute("data-id", id);
  jokeNode.setAttribute("data-light", "yes");

  jokeText.innerText = joke;
  jokeText.classList.add("saved-joke__text");
  jokeText.setAttribute("data-light", "yes");

  if (lightSwitch.checked) {
    jokeNode.classList.add("light-mode");
    jokeText.classList.add("light-mode");
  }

  deleteJokeBtn.classList.add("saved-joke--delete");
  deleteJokeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5" />
</svg>`;
  deleteJokeBtn.addEventListener("click", () => {
    deleteJoke(id);
  });

  jokeNode.appendChild(jokeText);
  jokeNode.appendChild(deleteJokeBtn);

  savedJokesDiv.appendChild(jokeNode);
}

function renderFromStorage() {
  const earlierArr = JSON.parse(localStorage.getItem("jokes"));
  if (earlierArr.length >= 1) {
    jokeAbsence.style.display = "none";
    earlierArr.forEach((joke) => {
      jokesArray.push(joke);
    });
    jokesArray.forEach((joke) => {
      renderSavedJoke(joke);
    });
  }
  const isLightOn = localStorage.getItem("mode");
  if (isLightOn === "light") {
    lightSwitch.checked = true;
  } else {
    lightSwitch.checked = false;
  }
  toggleLightMode();
}

function deleteJoke(id) {
  const jokeIndex = jokesArray.findIndex((joke) => joke.id === id);
  jokesArray.splice(jokeIndex, 1);
  localStorage.setItem("jokes", JSON.stringify(jokesArray));

  const savedJokes = savedJokesDiv.querySelectorAll("div");
  savedJokes.forEach((joke) => {
    const jokeId = joke.getAttribute("data-id");
    if (jokeId === id) {
      savedJokesDiv.removeChild(joke);
    }
  });
  if (savedJokesDiv.innerText === "") {
    jokeAbsence.style.display = "inline-block";
  }
}

function toggleLightMode() {
  const lightNodes = document.querySelectorAll("[data-light]");
  if (lightSwitch.checked) {
    lightNodes.forEach((node) => {
      document.body.style.backgroundColor = "rgb(240, 236, 245)";
      node.classList.add("light-mode");
      lightSlider.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
</svg>
`;
    });
    localStorage.setItem("mode", "light");
  } else {
    lightNodes.forEach((node) => {
      document.body.style.backgroundColor = "rgb(44, 59, 59)";
      node.classList.remove("light-mode");
      lightSlider.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
</svg>
`;
    });
    localStorage.setItem("mode", "dark");
  }
}

document.addEventListener("DOMContentLoaded", renderFromStorage);
loadJokeBtn.addEventListener("click", displayJoke);
saveJokeBtn.addEventListener("click", saveJoke);
lightSwitch.addEventListener("click", toggleLightMode);
