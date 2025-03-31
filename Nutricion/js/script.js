// Asegurar que el script se ejecuta
console.log("El script se está ejecutando.");

document.getElementById('nutrition-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // 1. Obtener valores del formulario
    let age = parseInt(document.getElementById('age').value);
    let weight = parseFloat(document.getElementById('weight').value);
    let height = parseFloat(document.getElementById('height').value);
    let activity = parseFloat(document.getElementById('activity').value);

    // 2. Validar que los valores no estén vacíos o sean inválidos
    if (isNaN(age) || isNaN(weight) || isNaN(height) || isNaN(activity)) {
        document.getElementById('result').innerHTML = "<p style='color: red;'>Por favor, completa todos los campos.</p>";
        return;
    }

    // 3. Calcular TMB usando la fórmula de Mifflin-St Jeor
    let tmb = (10 * weight) + (6.25 * height) - (5 * age) + 5;

    // 4. Ajustar según nivel de actividad
    let caloricNeeds = tmb * activity;

    // 5. Mostrar el resultado en la página
    document.getElementById('result').innerHTML = `<p>Tu necesidad calórica diaria es de aproximadamente <strong>${Math.round(caloricNeeds)} kcal</strong>.</p>`;
});
