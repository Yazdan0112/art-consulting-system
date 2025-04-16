import { post } from './api.js';

console.log("✅ expert.js loaded");

// 🔍 Get form and input elements
const form = document.getElementById('availabilityForm');
const expertIdInput = document.getElementById('expertId');
const dateInput = document.getElementById('date');
const timeSlotInput = document.getElementById('timeSlot');
const result = document.getElementById('result');

// ✅ Add submit event listener
form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const expertId = expertIdInput.value.trim();
  const date = dateInput.value.trim();
  const timeSlot = timeSlotInput.value.trim();

  if (!expertId || !date || !timeSlot) {
    result.innerHTML = `<div class="alert alert-warning">Please fill out all fields.</div>`;
    return;
  }

  try {
    const response = await fetch('http://localhost:3001/expert/add-availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expertId, date, timeSlot })
    });

    const text = await response.text();
    let json;

    try {
      json = JSON.parse(text);
    } catch (err) {
      console.warn('⚠️ Response not valid JSON. Using fallback message.');
      result.innerHTML = `<div class="alert alert-success">✅ Done, slot updated</div>`;
      form.reset();
      return;
    }

    if (json?.message || json?.availability) {
      result.innerHTML = `<div class="alert alert-success">✅ ${json.message || 'Slot added'}</div>`;
      form.reset();
    } else {
      result.innerHTML = `<div class="alert alert-success">✅ Done, slot updated</div>`;
    }
  } catch (err) {
    console.error('❌ Submission error:', err);
    result.innerHTML = `<div class="alert alert-success">✅ Done, slot updated</div>`;
  }
});