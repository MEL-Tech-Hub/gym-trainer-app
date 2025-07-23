// Dummy AI prediction function
function predictFocusArea(bmi, waist, bust, hip) {
    const waistToHip = waist / hip;
    if (bmi >= 30) return "Cardio"; // Obese → focus on cardio
    if (waistToHip > 0.75) return "Core"; // Wide waist → core
    if (hip < bust) return "Glutes"; // Smaller hips → glutes
    return "Full Body"; // Balanced
}

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
    const focusArea = predictFocusArea(bmi, waist, bust, hip);

    let bmiColor = "green";
    if (bmi < 18.5) bmiColor = "blue";
    else if (bmi >= 25 && bmi <= 29.9) bmiColor = "orange";
    else if (bmi >= 30) bmiColor = "red";

    let resultHTML = `
        <div class="p-4 rounded-lg shadow bg-white">
            <h2 class="text-xl font-bold text-green-700 mb-2">Your Results</h2>
            <p><strong style="color:${bmiColor}">BMI: ${bmi}</strong></p>
            <p class="mt-2 text-green-600">AI suggests focus area: <strong>${focusArea}</strong></p>
            <h3 class="text-lg font-semibold mt-4">7-Day Custom Workout Plan</h3>
    `;

    for (let day = 1; day <= 7; day++) {
        const target = day % 2 === 0 ? focusArea : "Full Body";
        const dayExercises = await getExercises(target, level);

        resultHTML += `<div class="mt-3 p-3 bg-green-50 rounded">
            <h4 class="font-bold text-green-700">Day ${day}: ${target}</h4>
            <ul class="list-disc list-inside">`;
        dayExercises.forEach(ex => {
            resultHTML += `<li>${ex.name} (${ex.reps})</li>`;
        });
        resultHTML += "</ul></div>";
    }

    resultHTML += "</div>";
    document.getElementById('result').innerHTML = resultHTML;
});
