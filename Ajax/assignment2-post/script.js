document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // prevent form from refreshing the page

  const name = document.getElementById('name').value;
  const job = document.getElementById('job').value;

  const user = {name, job};

  try {
    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1', // your API key
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    console.log(data);
    alert(`User created! Check console for details.`);
  } catch (error) {
    console.error('Error creating user:', error);
    alert('Failed to create user. Check console.');
  }
});
