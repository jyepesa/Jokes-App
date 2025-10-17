export async function fetchJoke() {
  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      method: "GET",
      headers: {
        "User-Agent":
          "My Jokes App (https://https://github.com/jyepesa/Jokes-App)",
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Unable to get a joke... Sometime life isn't funny");
    }
    const joke = await response.json();
    return joke;
  } catch (e) {
    alert(e);
  }
}
