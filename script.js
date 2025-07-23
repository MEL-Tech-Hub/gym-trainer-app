async function getExercises(target, level) {
    const response = await fetch('exercises.json');
    const exercises = await response.json();
    return exercises.filter(ex => 
        ex.target === target && (ex.level === level || ex.level === "All")
    ).slice(0, 3); // Pick 3 exercises
}

document.getElementById('clientForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const bust = parseFloat(document.getElementById('bust').value);
    const waist = parseFloat(document.getElementById('waist').value);
    const hip = parseFloat(document.getElementById('hip').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    const heightMeters = height / 100;
    const bmi = (weight / (heightMeters ** 2)).toFixed(1);

    let level = "Beginner"; // Default for now

    let resultHTML = `<p><strong style="color:green">BMI: ${bmi}</strong></p>`;
    resultHTML += `<p><strong>7-Day Custom Workout Plan:</strong></p>`;

    // Example targets
    const targets = ["Glutes", "Core", "Cardio"];

    for (let day = 1; day <= 7; day++) {
        const target = targets[day % targets.length]; // Rotate focus areas
        const dayExercises = await getExercises(target, level);

        resultHTML += `<p><strong>Day ${day}: ${target}</strong></p><ul>`;
        dayExercises.forEach(ex => {
            resultHTML += `<li>${ex.name} (${ex.reps})</li>`;
        });
        resultHTML += "</ul>";
    }

    document.getElementById('result').innerHTML = resultHTML;
});
