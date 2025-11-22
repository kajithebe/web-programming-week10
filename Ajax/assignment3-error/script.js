// GET request to non-existent URL
document.getElementById('getBtn').addEventListener('click', async () => {
  try {
    const response = await fetch('https://reqres.in/api/unknown/23', {
      headers: {'x-api-key': 'reqres-free-v1'}, // your API key
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('GET Error:', error);
    alert('GET request failed! Check console.');
  }
});

// POST request to invalid URL
document.getElementById('postBtn').addEventListener('click', async () => {
  try {
    const response = await fetch('https://reqres.in/api/invalid-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1',
      },
      body: JSON.stringify({name: 'Test', job: 'Test'}),
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('POST Error:', error);
    alert('POST request failed! Check console.');
  }
});
