import { fetchJoke } from "./fetch";

const loadJokeBtn = document.getElementById("load-joke");
const saveJokeBtn = document.getElementById("save-joke");
const jokeText = document.getElementById("joke-text");

async function displayJoke() {
  const joke = await fetchJoke();
  jokeText.innerText = joke.joke;
  jokeText.setAttribute("data-id", joke.id);
  // FOR LATER!!! console.log(jokeText.getAttribute("data-id"));
}

loadJokeBtn.addEventListener("click", displayJoke);
