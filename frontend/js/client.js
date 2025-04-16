import { post, get } from './api.js';

console.log(" client.js loaded");
document.body.style.backgroundColor = 'lightyellow';

const clientIdField = document.getElementById('clientId');
const userId = localStorage.getItem('userId');
if (userId) clientIdField.value = userId;
else console.warn("⚠️ No userId found in localStorage");

const expertDropdown = document.getElementById('expertId');
const auctionDropdown = document.getElementById('auctionId');
const timeSlotDropdown = document.getElementById('timeSlot');
const result = document.getElementById('result');

timeSlotDropdown.disabled = true;

async function loadExperts() {
  try {
    const experts = await get('/client/experts');
    experts.forEach(expert => {
      const option = document.createElement('option');
      option.value = expert._id;
      option.textContent = expert.name || expert.username;
      expertDropdown.appendChild(option);
    });
  } catch (err) {
    console.error('❌ Failed to load experts:', err);
    result.innerHTML = `<div class="alert alert-danger">Failed to load experts</div>`;
  }
}

// 🔹 Load Auctions from MongoDB
async function loadAuctions() {
  try {
    const auctions = await get('/client/auctions');
    auctions.forEach(auction => {
      const option = document.createElement('option');
      option.value = auction._id;
      option.textContent = `${auction.name} - ${auction.date}`;
      auctionDropdown.appendChild(option);
    });
  } catch (err) {
    console.error('❌ Failed to load auctions:', err);
    result.innerHTML = `<div class="alert alert-danger">Failed to load auctions</div>`;
  }
}

// 🔹 When expert is selected, load time slots
expertDropdown.addEventListener('change', async () => {
  const expertId = expertDropdown.value;
  timeSlotDropdown.innerHTML = '<option value="">Select Time Slot</option>';
  timeSlotDropdown.disabled = true;

  if (!expertId) return;

  try {
    const availability = await get(`/client/availability/${expertId}`);
    availability.forEach(slot => {
      const option = document.createElement('option');
      option.value = slot.timeSlot;
      option.textContent = `${slot.date} @ ${slot.timeSlot}`;
      timeSlotDropdown.appendChild(option);
    });

    timeSlotDropdown.disabled = false;
  } catch (err) {
    console.error('❌ Failed to load availability:', err);
    result.innerHTML = `<div class="alert alert-danger">Could not load time slots</div>`;
  }
});

document.getElementById('serviceForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userId = localStorage.getItem('userId');


  const data = {
    clientId: userId,
    expertId: expertDropdown.value,
    auctionId: auctionDropdown.value,
    timeSlot: timeSlotDropdown.value,
    type: document.getElementById('type').value
  };

  try {
    const res = await post('/client/request-service', data);
    if (res.message || res.status === 'success') {
      result.innerHTML = `<div class="alert alert-success">✅ ${res.message || 'Service requested successfully.'}</div>`;
    } else {
      result.innerHTML = `<div class="alert alert-danger">❌ ${res.message || 'Request failed'}</div>`;
    }
  } catch (err) {
    console.error('❌ Service request error:', err);
    result.innerHTML = `<div class="alert alert-danger">❌ Error sending request</div>`;
  }
});

loadExperts();
loadAuctions();