// Reusable async fetch function
async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Example usage: Create a user
document.getElementById('createUserBtn').addEventListener('click', async () => {
  const user = {
    name: 'John Doe',
    job: 'Developer',
  };
  const url = 'https://reqres.in/api/users';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'reqres-free-v1',
    },
    body: JSON.stringify(user),
  };

  try {
    const userData = await fetchData(url, options);
    console.log(userData);
    alert('User created! Check console for details.');
  } catch (error) {
    alert('Failed to create user. Check console.');
  }
});
