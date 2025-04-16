import { post } from './api.js';
console.log(" signup.js loaded");

document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  const res = await post('/auth/signup', { username, password, role });

  const resultDiv = document.getElementById('result');
  if (res.message) {
    resultDiv.innerHTML = `<div class="alert alert-success">${res.message}</div>`;
  } else {
    resultDiv.innerHTML = `<div class="alert alert-danger">${JSON.stringify(res)}</div>`;
  }
});