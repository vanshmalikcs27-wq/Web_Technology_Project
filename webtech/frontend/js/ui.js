// UI Helper functions

// Show loading state
function showLoading(button, text = 'Loading...') {
  if (button) {
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.textContent = text;
  }
}

// Hide loading state
function hideLoading(button) {
  if (button) {
    button.disabled = false;
    button.textContent = button.dataset.originalText || 'Submit';
  }
}

// Show error message
function showError(container, message) {
  if (!container) return;
  container.innerHTML = `<div class="error-message">❌ ${message}</div>`;
  container.style.display = 'block';
}

// Show success message
function showSuccess(container, message) {
  if (!container) return;
  container.innerHTML = `<div class="success-message">✓ ${message}</div>`;
  container.style.display = 'block';
}

// Clear messages
function clearMessages(container) {
  if (container) {
    container.innerHTML = '';
    container.style.display = 'none';
  }
}

// Redirect
function redirect(url) {
  window.location.href = url;
}

// Check authentication
function requireAuth() {
  if (!isLoggedIn()) {
    redirect('/pages/login.html');
    return false;
  }
  return true;
}

// Optional auth - redirects if logged in
function checkAuthStatus() {
  if (isLoggedIn()) {
    // On login/signup pages, redirect to dashboard
    if (window.location.pathname.includes('login') || window.location.pathname.includes('signup')) {
      redirect('/pages/dashboard.html');
    }
  }
}

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
