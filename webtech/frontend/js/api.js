// API Configuration
const API_URL = 'http://localhost:5000/api';

// Store token
function setToken(token) {
  localStorage.setItem('token', token);
}

// Get token
function getToken() {
  return localStorage.getItem('token');
}

// Remove token
function removeToken() {
  localStorage.removeItem('token');
}

// Check if user is logged in
function isLoggedIn() {
  return !!getToken();
}

// API request helper
async function apiRequest(endpoint, method = 'GET', data = null) {
  const headers = {
    'Content-Type': 'application/json'
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'API request failed');
    }

    return result;
  } catch (error) {
    throw error;
  }
}

// Sign up
async function signup(email, password, firstName, lastName) {
  const result = await apiRequest('/auth/signup', 'POST', {
    email,
    password,
    firstName,
    lastName
  });
  
  if (result.token) {
    setToken(result.token);
  }
  
  return result;
}

// Login
async function login(email, password) {
  const result = await apiRequest('/auth/login', 'POST', {
    email,
    password
  });
  
  if (result.token) {
    setToken(result.token);
  }
  
  return result;
}

// Logout
function logout() {
  removeToken();
}

// Get current user
async function getCurrentUser() {
  return apiRequest('/auth/me', 'GET');
}

// Get user portfolios
async function getUserPortfolios() {
  return apiRequest('/portfolio', 'GET');
}

// Create portfolio
async function createPortfolio(data) {
  return apiRequest('/portfolio', 'POST', data);
}

// Get portfolio
async function getPortfolio(id) {
  return apiRequest(`/portfolio/${id}`, 'GET');
}

// Update portfolio
async function updatePortfolio(id, data) {
  return apiRequest(`/portfolio/${id}`, 'PUT', data);
}

// Delete portfolio
async function deletePortfolio(id) {
  return apiRequest(`/portfolio/${id}`, 'DELETE');
}

// Publish portfolio
async function publishPortfolio(id) {
  return apiRequest(`/portfolio/${id}/publish`, 'POST');
}
