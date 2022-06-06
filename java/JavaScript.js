// Random Fact Generator

const responces = ["I like to code", "I like to go outside", "I like to play video games", "I like pineapple on pizza", "I don't like school"]
const placeholder = document.querySelector('[data-="placeholder"]')

document.getElementById("myBtn").addEventListener("click", () => {

	if (responces.length == 0) {
		return
	}

	const x = Math.floor(Math.random() * responces.length)
	const responce = responces.splice(x, 1)
		createElement(responce[0])
})

const createElement = (responce) => {
	const h1 = document.createElement("p");
	h1.innerText = responce
	placeholder.appendChild(h1)
}

// Saving Text Area

const typing = document.querySelector('[data-="typing"]');
const save = document.querySelector('[data-="save"]');

typing.innerHTML = localStorage.getItem("typing")

const saveToLocalStorage = () => {
  localStorage.setItem('typing', typing.value)
}

save.addEventListener('click', saveToLocalStorage)