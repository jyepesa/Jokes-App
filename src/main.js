import { fetchJoke } from "./fetch";

const loadJokeBtn = document.getElementById("load-joke");
const saveJokeBtn = document.getElementById("save-joke");
const jokeText = document.getElementById("joke-text");
const savedJokesDiv = document.getElementById("saved-jokes");
const jokeAbsence = document.getElementById("no-jokes");

const jokesArray = [];

async function displayJoke() {
  saveJokeBtn.style.display = "inline-block";
  const joke = await fetchJoke();
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

  jokeText.innerText = joke;
  jokeText.classList.add("saved-joke__text");

  deleteJokeBtn.classList.add("saved-joke--delete");
  deleteJokeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5" />
</svg>`;

  jokeNode.appendChild(jokeText);
  jokeNode.appendChild(deleteJokeBtn);

  savedJokesDiv.appendChild(jokeNode);
}

function renderFromStorage() {
  const earlierArr = JSON.parse(localStorage.getItem("jokes"));
  if (earlierArr) {
    jokeAbsence.style.display = "none";
    earlierArr.forEach((joke) => {
      jokesArray.push(joke);
    });
    jokesArray.forEach((joke) => {
      renderSavedJoke(joke);
    });
  }
}

document.addEventListener("DOMContentLoaded", renderFromStorage);
loadJokeBtn.addEventListener("click", displayJoke);
saveJokeBtn.addEventListener("click", saveJoke);
