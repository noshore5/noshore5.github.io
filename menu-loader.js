// Menu loader utility
async function loadMenu() {
  try {
    console.log('Loading menu...');
    const response = await fetch('menu.html');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const menuContent = await response.text();
    console.log('Menu content loaded:', menuContent.substring(0, 100) + '...');
    
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) {
      throw new Error('Menu container not found');
    }
    
    menuContainer.innerHTML = menuContent;
    console.log('Menu content inserted into container');
    
    // Set active state based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.nav-links a, .home-link');
    
    menuLinks.forEach(link => {
      link.classList.remove('active');
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'index.html') ||
          (currentPage === 'index.html' && link.classList.contains('home-link'))) {
        link.classList.add('active');
      }
    });
    
    // Add menu functionality after loading
    addMenuFunctionality();
    
  } catch (error) {
    console.error('Error loading menu:', error);
    // Fallback menu content
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
      menuContainer.innerHTML = `
        <nav>
          <a href="index.html" class="home-link">Home</a>
          <button class="menu-toggle" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
          <div class="nav-links">
            <a href="coheriqs.html">CoherIQs</a>
            <a href="coheriqslive.html">CoherIQs Live</a>
            <a href="coherentmultiplex.html">Coherent Multiplex</a>
            <a href="performance.html">Performance</a>
            <a href="biography.html">Biography</a>
            <a href="literature.html">Literature</a>
          </div>
        </nav>
      `;
      // Still try to add functionality to fallback menu
      addMenuFunctionality();
    }
  }
}

// Add menu functionality (mobile toggle, click outside to close, etc.)
function addMenuFunctionality() {
  // Mobile menu toggle functionality
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  console.log('Adding menu functionality...', { menuToggle, navLinks });
  
  if (menuToggle && navLinks) {
    // Remove any existing listeners to prevent duplicates
    menuToggle.removeEventListener('click', toggleMenu);
    menuToggle.addEventListener('click', toggleMenu);
    
    function toggleMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Menu toggle clicked');
      navLinks.classList.toggle('open');
      menuToggle.classList.toggle('open');
    }
  } else {
    console.warn('Menu elements not found:', { menuToggle, navLinks });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    if (!menuToggle || !navLinks) return;
    if (menuToggle.classList.contains('open') && !menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
    }
  });
  
  // Close menu when resizing to desktop
  window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    if (window.innerWidth > 900 && navLinks && menuToggle) {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
    }
  });
}

// Load menu when DOM is ready
document.addEventListener('DOMContentLoaded', loadMenu);

// 9334c965-8dc0-4296-bcae-3f83f08890d6
