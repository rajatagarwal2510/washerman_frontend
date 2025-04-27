// Auto-redirect to dashboard if already logged in (only on login or register pages)
document.addEventListener('DOMContentLoaded', function() {
    // Only redirect if on index.html or register.html
    const path = window.location.pathname;
    if (
      (path.endsWith('index.html') || path === '/' || path.endsWith('/')) ||
      path.endsWith('register.html')
    ) {
      const userId = localStorage.getItem('userId');
      const role = localStorage.getItem('role');
      if (userId && role) {
        switch (role) {
          case 'user':
            window.location.href = 'user-dashboard.html';
            break;
          case 'laundryman':
            window.location.href = 'laundryman-dashboard.html';
            break;
          case 'rider':
            window.location.href = 'rider-dashboard.html';
            break;
        }
      }
    }
  });
  
  // LOGIN HANDLER
  if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const role = document.getElementById('role').value;
  
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, role })
        });
        const data = await response.json();
  
        if (data.success) {
          // Save credentials for session
          localStorage.setItem('userId', data.id);
          localStorage.setItem('username', data.username);
          localStorage.setItem('role', data.role);
  
          // Redirect based on role
          switch (data.role) {
            case 'user':
              window.location.href = 'user-dashboard.html';
              break;
            case 'laundryman':
              window.location.href = 'laundryman-dashboard.html';
              break;
            case 'rider':
              window.location.href = 'rider-dashboard.html';
              break;
          }
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (error) {
        alert('Login failed. Server error.');
      }
    });
  }
  
  // REGISTRATION HANDLER
  if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const username = document.getElementById('regUsername').value;
      const password = document.getElementById('regPassword').value;
      const role = document.getElementById('regRole').value;
  
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, role })
        });
        const data = await response.json();
        if (data.success) {
          alert('Registration successful! Please login.');
          window.location.href = 'index.html';
        } else {
          alert(data.message || 'Registration failed.');
        }
      } catch (error) {
        alert('Registration failed. Server error.');
      }
    });
  }
  
  // LOGOUT HANDLER (to be called from dashboards)
  function logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    window.location.href = 'index.html';
  }
  