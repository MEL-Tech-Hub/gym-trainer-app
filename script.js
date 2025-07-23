document.getElementById('clientForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const bust = parseFloat(document.getElementById('bust').value);
    const waist = parseFloat(document.getElementById('waist').value);
    const hip = parseFloat(document.getElementById('hip').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    // Calculate BMI
    const heightMeters = height / 100;
    const bmi = (weight / (heightMeters ** 2)).toFixed(1);

    let bmiStatus = '';
    let bmiColor = '';

    if (bmi < 18.5) {
        bmiStatus = 'Underweight';
        bmiColor = 'blue';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        bmiStatus = 'Normal';
        bmiColor = 'green';
    } else if (bmi >= 25 && bmi <= 29.9) {
        bmiStatus = 'Overweight';
        bmiColor = 'orange';
    } else {
        bmiStatus = 'Obese';
        bmiColor = 'red';
    }

    let resultHTML = `<p><strong style="color:${bmiColor}">BMI: ${bmi} (${bmiStatus})</strong></p>`;

    // Analyze figure 8 shape
    let plan = '';
    if (Math.abs(bust - hip) <= 2 && (waist / ((bust + hip) / 2)) <= 0.7) {
        plan += "<p>You already have a figure 8 shape! Maintain with a balanced workout.</p>";
    } else {
        plan += "<p><strong>7-Day Custom Workout Plan:</strong></p>";
        plan += "<ul>";

        plan += "<li><strong>Day 1: Lower Body</strong><br>- Hip Thrusts (3x12)<br>- Squats (3x15)<br>- Glute Bridges (3x12)</li>";
        plan += "<li><strong>Day 2: Cardio & Core</strong><br>- HIIT (30 min)<br>- Plank (3x45 sec)<br>- Russian Twists (3x20)</li>";
        plan += "<li><strong>Day 3: Upper Body</strong><br>- Push-ups (3x10)<br>- Chest Press (3x12)<br>- Dumbbell Rows (3x12)</li>";
        plan += "<li><strong>Day 4: Rest or Yoga</strong></li>";
        plan += "<li><strong>Day 5: Repeat Lower Body</strong></li>";
        plan += "<li><strong>Day 6: Cardio</strong><br>- Jump Rope (20 min)<br>- Mountain Climbers (3x20)</li>";
        plan += "<li><strong>Day 7: Full Body Stretch & Mobility</strong></li>";

        plan += "</ul>";
    }

    document.getElementById('result').innerHTML = resultHTML + plan;
});
