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

  let result = `<h3><strong>BMI:</strong> ${bmi}</h3>`;

  result += `<h4 class="mt-3 font-semibold">📏 Measurement Changes:</h4><ul>`;
  result += `<li>Bust: ${bust} → ${targetBust} (Change: ${bustGap >= 0 ? '+' : ''}${bustGap})</li>`;
  result += `<li>Waist: ${waist} → ${targetWaist} (Change: ${waistGap >= 0 ? '+' : ''}${waistGap})</li>`;
  result += `<li>Hips: ${hip} → ${targetHip} (Change: ${hipGap >= 0 ? '+' : ''}${hipGap})</li>`;
  result += `</ul>`;

  result += `<h4 class="font-semibold mt-4">🎯 Recommended Focus:</h4><ul>`;

  // Waist
  if (waistGap < 0) {
    result += `<li>🔥 Waist reduction: HIIT, planks, mountain climbers</li>`;
  } else if (waistGap === 0) {
    result += `<li>✅ Waist maintenance: light core + cardio</li>`;
  } else {
    result += `<li>⚠️ Waist increase not recommended. Review your goal.</li>`;
  }

  // Hips
  if (hipGap > 0) {
    result += `<li>🍑 Hip growth: hip thrusts, sumo squats, glute bridges</li>`;
  } else if (hipGap === 0) {
    result += `<li>✅ Hip maintenance: glute activation 2x/week</li>`;
  } else {
    result += `<li>⚠️ Hip reduction detected. Include cardio + mobility.</li>`;
  }

  // Bust
  if (bustGap !== 0) {
    result += `<li>💪 Bust lift & tone: push-ups, chest press, dumbbell flys</li>`;
  } else {
    result += `<li>✅ Chest maintenance: posture + light upper body</li>`;
  }

  result += `</ul>`;
  result += `<p class="text-sm text-gray-600 mt-2">🔍 <em>Note: Bust size doesn’t grow via exercise, but toning improves shape and posture.</em></p>`;

  document.getElementById('result').innerHTML = result;
});
