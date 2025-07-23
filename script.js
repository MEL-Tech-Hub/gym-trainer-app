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

    let plan = `BMI: ${bmi}\n`;

    // Analyze Figure 8 Shape
    if (Math.abs(bust - hip) <= 2 && waist / ((bust + hip) / 2) <= 0.7) {
        plan += "You already have an hourglass shape!\nMaintain with full-body workouts.\n";
    } else {
        plan += "Focus Areas:\n";
        if (bust < hip - 2) {
            plan += "- Bust toning: Push-ups, Chest Press\n";
        }
        if (waist / ((bust + hip) / 2) > 0.7) {
            plan += "- Waist slimming: Planks, HIIT Cardio\n";
        }
        if (hip < bust - 2) {
            plan += "- Hip building: Hip Thrusts, Squats\n";
        }
    }

    document.getElementById('result').innerText = plan;
});
