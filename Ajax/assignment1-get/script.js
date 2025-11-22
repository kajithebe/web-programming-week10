document.getElementById('fetchBtn').addEventListener('click', async () => {
  try {
    const response = await fetch('https://reqres.in/api/users/1', {
      headers: {
        'x-api-key': 'reqres-free-v1',
      },
    });
    const data = await response.json();
    console.log(data);
    alert('User data fetched! Check the console.');
  } catch (error) {
    console.error('Error fetching user:', error);
    alert('Failed to fetch user. Check console.');
  }
});
