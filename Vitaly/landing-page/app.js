let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

function saveRecipe() {
const name = document.getElementById("name").value;
const ingredients = document.getElementById("ingredients").value;
const steps = document.getElementById("steps").value;

if (!name) return alert("Ponle nombre");

const recipe = { name, ingredients, steps };

recipes.push(recipe);
localStorage.setItem("recipes", JSON.stringify(recipes));

renderRecipes();
}

function renderRecipes() {
const container = document.getElementById("recipes");
container.innerHTML = "";

recipes.forEach(r => {
container.innerHTML += `       <div class="recipe">         <h3>${r.name}</h3>         <p>${r.ingredients}</p>         <p>${r.steps}</p>       </div>
    `;
});
}

function scrollToApp() {
document.getElementById("app").scrollIntoView({ behavior: "smooth" });
}

renderRecipes();
