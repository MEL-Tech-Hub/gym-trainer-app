document.getElementById('clientForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let age = document.getElementById('age').value;
    let gender = document.getElementById('gender').value;
    let waist = document.getElementById('waist').value;
    let hip = document.getElementById('hip').value;

    let plan = "Custom Plan:\n";
    if (waist > 28) {
        plan += "- Add cardio 3x/week for fat loss\n";
        plan += "- Core tightening exercises\n";
    }
    if (hip < 38) {
        plan += "- Glute strengthening: Hip thrusts, Squats\n";
    }
    plan += "- General strength training 3x/week";

    document.getElementById('result').innerText = plan;
});
