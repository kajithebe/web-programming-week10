// API Configuration
const API_BASE_URL = 'https://media2.edu.metropolia.fi/restaurant/api/v1';
const LANGUAGE = 'en'; // Change to 'fi' for Finnish menus

/**
 * Fetch all restaurants from the API
 */
async function fetchRestaurants() {
  try {
    showLoading(true);
    hideError();

    const url = `${API_BASE_URL}/restaurants`;
    console.log('Fetching from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);

    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.log('Response text:', text.substring(0, 200));
      throw new Error(
        'API returned non-JSON response. Check console for response content.'
      );
    }

    console.log('Data received:', data);

    // Handle different possible response formats
    const restaurants = data.restaurants || data.data || data;
    displayRestaurants(Array.isArray(restaurants) ? restaurants : []);
    showLoading(false);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    console.error('Error details:', error.message);
    showError(
      `Failed to load restaurants: ${error.message}. Check console for details.`
    );
    showLoading(false);
  }
}

/**
 * Display restaurants in the grid
 * @param {Array} restaurants - Array of restaurant objects
 */
function displayRestaurants(restaurants) {
  const container = document.getElementById('restaurantsContainer');
  container.innerHTML = '';

  if (!restaurants || restaurants.length === 0) {
    container.innerHTML = '<p>No restaurants available.</p>';
    return;
  }

  restaurants.forEach((restaurant) => {
    const card = createRestaurantCard(restaurant);
    container.appendChild(card);
  });
}

/**
 * Create a restaurant card element
 * @param {Object} restaurant - Restaurant object
 * @returns {HTMLElement} Restaurant card element
 */
function createRestaurantCard(restaurant) {
  const card = document.createElement('div');
  card.className = 'restaurant-card';
  card.onclick = () => openModal(restaurant);

  card.innerHTML = `
        <h3>${escapeHtml(restaurant.name)}</h3>
        <div class="restaurant-info">
            <p><strong>Address:</strong> ${escapeHtml(restaurant.address)}</p>
            <p><strong>City:</strong> ${escapeHtml(
              restaurant.city
            )} ${escapeHtml(restaurant.postalCode)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(restaurant.phone)}</p>
            <p><strong>Company:</strong> ${escapeHtml(restaurant.company)}</p>
        </div>
    `;

  return card;
}

/**
 * Open modal and fetch menu for selected restaurant
 * @param {Object} restaurant - Restaurant object
 */
async function openModal(restaurant) {
  const modal = document.getElementById('restaurantModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  modalTitle.textContent = restaurant.name;
  modalBody.innerHTML = `
        <div class="restaurant-details">
            <p><strong>Address:</strong> ${escapeHtml(restaurant.address)}</p>
            <p><strong>City:</strong> ${escapeHtml(
              restaurant.city
            )} ${escapeHtml(restaurant.postalCode)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(restaurant.phone)}</p>
            <p><strong>Company:</strong> ${escapeHtml(restaurant.company)}</p>
        </div>
        <div class="menu-loading">Loading today's menu...</div>
    `;

  modal.classList.add('active');

  try {
    // First try daily menu
    let menuUrl = `${API_BASE_URL}/restaurants/daily/${restaurant._id}/${LANGUAGE}`;
    console.log('Fetching daily menu from:', menuUrl);

    let response = await fetch(menuUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();
    console.log('Daily menu data received:', data);

    // If daily menu is empty, try weekly menu
    if (!data.courses || data.courses.length === 0) {
      console.log('Daily menu empty, trying weekly menu...');
      menuUrl = `${API_BASE_URL}/restaurants/weekly/${restaurant._id}/${LANGUAGE}`;
      console.log('Fetching weekly menu from:', menuUrl);

      response = await fetch(menuUrl);
      if (response.ok) {
        data = await response.json();
        console.log('Weekly menu data received:', data);
        displayWeeklyMenu(data.days);
      } else {
        displayDailyMenu([]);
      }
    } else {
      displayDailyMenu(data.courses);
    }
  } catch (error) {
    console.error('Error fetching menu:', error);
    const menuLoadingEl = document.querySelector('.menu-loading');
    if (menuLoadingEl) {
      menuLoadingEl.innerHTML =
        '<div class="no-menu">Unable to load menu. ' + error.message + '</div>';
    }
  }
}

/**
 * Display daily menu in modal
 * @param {Array} courses - Array of course objects
 */
function displayDailyMenu(courses) {
  const menuContainer = document.querySelector('.menu-loading');

  if (!menuContainer) return;

  if (!courses || courses.length === 0) {
    menuContainer.innerHTML =
      '<div class="no-menu">No menu available for today.</div>';
    return;
  }

  let menuHTML = '<div class="menu-section"><h3>Today\'s Menu</h3>';
  courses.forEach((course) => {
    const dietsInfo = course.diets
      ? `<strong>Diets:</strong> ${escapeHtml(course.diets)}`
      : '';
    menuHTML += `
            <div class="menu-item">
                <div class="menu-item-name">${escapeHtml(course.name)}</div>
                <div class="menu-item-details">
                    ${dietsInfo}
                </div>
                <div class="menu-item-price">${escapeHtml(course.price)}</div>
            </div>
        `;
  });
  menuHTML += '</div>';

  menuContainer.innerHTML = menuHTML;
}

/**
 * Display weekly menu in modal
 * @param {Array} days - Array of day objects with courses
 */
function displayWeeklyMenu(days) {
  const menuContainer = document.querySelector('.menu-loading');

  if (!menuContainer || !days || days.length === 0) {
    menuContainer.innerHTML = '<div class="no-menu">No menu available.</div>';
    return;
  }

  let menuHTML = '<div class="menu-section"><h3>Weekly Menu</h3>';
  days.forEach((day) => {
    menuHTML += `<div class="menu-day"><h4>${escapeHtml(day.date)}</h4>`;

    if (day.courses && day.courses.length > 0) {
      day.courses.forEach((course) => {
        const dietsInfo = course.diets
          ? `<strong>Diets:</strong> ${escapeHtml(course.diets)}`
          : '';
        menuHTML += `
                    <div class="menu-item">
                        <div class="menu-item-name">${escapeHtml(
                          course.name
                        )}</div>
                        <div class="menu-item-details">
                            ${dietsInfo}
                        </div>
                        <div class="menu-item-price">${escapeHtml(
                          course.price
                        )}</div>
                    </div>
                `;
      });
    } else {
      menuHTML += '<div class="no-menu">No courses available</div>';
    }
    menuHTML += '</div>';
  });
  menuHTML += '</div>';

  menuContainer.innerHTML = menuHTML;
}

/**
 * Close the modal
 */
function closeModal() {
  const modal = document.getElementById('restaurantModal');
  modal.classList.remove('active');
}

/**
 * Close modal when clicking outside the modal content
 */
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('restaurantModal');

  modal.addEventListener('click', function (e) {
    if (e.target === this) {
      closeModal();
    }
  });
});

/**
 * Show or hide loading indicator
 * @param {Boolean} show - Whether to show the loading indicator
 */
function showLoading(show) {
  const loadingEl = document.getElementById('loading');
  loadingEl.style.display = show ? 'block' : 'none';
}

/**
 * Show error message
 * @param {String} message - Error message to display
 */
function showError(message) {
  const errorEl = document.getElementById('errorMessage');
  errorEl.textContent = message;
  errorEl.style.display = 'block';
}

/**
 * Hide error message
 */
function hideError() {
  const errorEl = document.getElementById('errorMessage');
  errorEl.style.display = 'none';
}

/**
 * Escape HTML special characters to prevent XSS
 * @param {String} text - Text to escape
 * @returns {String} Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', fetchRestaurants);
