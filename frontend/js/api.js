export async function post(endpoint, data) {
    const res = await fetch(`http://localhost:3001${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  }
  
  export async function get(endpoint) {
    const res = await fetch(`http://localhost:3001${endpoint}`);
    return await res.json();
  }