document.getElementById('clientForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  // Current measurements
  const bust = parseFloat(document.getElementById('bust').value);
  const waist = parseFloat(document.getElementById('waist').value);
  const hip = parseFloat(document.getElementById('hip').value);

  // Target measurements
  const targetBust = parseFloat(document.getElementById('targetBust').value);
  const targetWaist = parseFloat(document.getElementById('targetWaist').value);
  const targetHip = parseFloat(document.getElementById('targetHip').value);

  // Other info
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

  // Compute gaps
  const bustGap = targetBust - bust;
  const waistGap = targetWaist - waist;
  const hipGap = targetHip - hip;

  let result = `<p><strong>BMI: ${bmi}</strong></p>`;
  result += `<h3 class="font-bold mt-2">Recommended Focus:</h3><ul>`;

  if (waistGap < 0) {
    result += `<li>🔥 Waist reduction: HIIT, planks, mountain climbers</li>`;
  } else if (waistGap === 0) {
    result += `<li>✅ Waist maintenance: light core + cardio</li>`;
  }

  if (hipGap > 0) {
    result += `<li>🍑 Hip growth: hip thrusts, sumo squats, glute bridges</li>`;
  } else if (hipGap === 0) {
    result += `<li>✅ Hip maintenance: glute activation 2x/week</li>`;
  }

  if (bustGap !== 0) {
    result += `<li>💪 Bust lift & tone: push-ups, chest press, dumbbell flys</li>`;
  } else {
    result += `<li>✅ Chest maintenance: posture, light upper body</li>`;
  }

  result += `</ul><p class="text-sm text-gray-600 mt-2">Note: Bust size can't grow from exercise, but appearance can improve via toning and posture.</p>`;

  document.getElementById('result').innerHTML = result;
});
