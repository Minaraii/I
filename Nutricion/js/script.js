// Captura del formulario y el resultado
const form = document.getElementById('nutrition-form');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener valores
    let age = parseInt(document.getElementById('age').value);
    let weight = parseFloat(document.getElementById('weight').value);
    let height = parseFloat(document.getElementById('height').value);
    let activity = parseFloat(document.getElementById('activity').value);

    if (isNaN(age) || isNaN(weight) || isNaN(height) || isNaN(activity)) {
        resultDiv.innerHTML = "<p style='color: red;'>Por favor, completa todos los campos.</p>";
        return;
    }

    // Calcular TMB
    let tmb = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    let caloricNeeds = tmb * activity;

    // Mostrar resultado principal
    resultDiv.innerHTML = `<p>Tu necesidad calórica diaria es de aproximadamente <strong>${Math.round(caloricNeeds)} kcal</strong>.</p>
                            <button id='show-strategy'>Ver estrategia personalizada</button>`;

    // Botón para mostrar estrategia
    document.getElementById('show-strategy').addEventListener('click', function () {
        showStrategy(caloricNeeds);
    });
});

function showStrategy(calories) {
    let strategyDiv = document.createElement('div');
    strategyDiv.id = 'strategy';
    strategyDiv.innerHTML = `
        <h3>Estrategia Personalizada</h3>
        <p>Para subir de peso: consume al menos <strong>${Math.round(calories + 500)} kcal</strong> al día.</p>
        <p>Para bajar de peso: reduce tu ingesta a <strong>${Math.round(calories - 500)} kcal</strong> al día.</p>
        <p>Incluye alimentos como arroz, queso, frutos secos y legumbres para un aumento saludable.</p>
        <p>Para perder peso, prioriza vegetales, proteínas magras y control de porciones.</p>
    `;
    resultDiv.appendChild(strategyDiv);
}
