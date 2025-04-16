import { post } from './api.js';

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await post('/auth/login', { username, password });

  const result = document.getElementById('result');

  if (res.role && res.userId) {
    // ✅ Store user ID and role in localStorage
    localStorage.setItem('userId', res.userId);
    localStorage.setItem('role', res.role);

    result.innerHTML = `<div class="alert alert-success">Login successful as <strong>${res.role}</strong>.</div>`;

    setTimeout(() => {
      if (res.role === 'admin') window.location.href = 'admin.html';
      else if (res.role === 'client') window.location.href = 'client.html';
      else if (res.role === 'expert') window.location.href = 'expert.html';
    }, 1000);
  } else {
    result.innerHTML = `<div class="alert alert-danger">${res.message || 'Login failed'}</div>`;
  }
});