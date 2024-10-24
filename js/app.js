/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**Define Global Variables**/
document.addEventListener('DOMContentLoaded', () => {
    const navbarList = document.getElementById('navbar__list');
    const sections = document.querySelectorAll('section');
    const upBtn = document.getElementById('upBtn');
    let hPage=document.querySelector('.page__header');
    let lastScrollTop = 0;
    let isScrolling;

/**
 * End Global Variables*/

// Build navbar menu 
sections.forEach(section => {
  const navItem = document.createElement('li');
  const anchor = document.createElement('a');
  anchor.href = `#${section.id}`;
  anchor.textContent = section.dataset.nav;
  anchor.classList.add('menu__link');
  navItem.appendChild(anchor);
  navbarList.appendChild(navItem);
});

    // Smooth scrolling and set active class when section is in viewport
    navbarList.addEventListener('click', event => {
      event.preventDefault();
      if (event.target.tagName === 'A') {
        const targetId = event.target.getAttribute('href').slice(1);
        document.getElementById(targetId).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  
    // Add class 'active' to section when near top of viewport
    function setActiveSection() {
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const navLink = document.querySelector(`a[href="#${section.id}"]`);
        
        // Check if section is in the viewport
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          section.classList.add('your-active-class');
          navLink.classList.add('active-link');
        } else {
          section.classList.remove('your-active-class');
          navLink.classList.remove('active-link');
        }
      });
    }
  
    // Scroll to top button visibility
    window.addEventListener('scroll', () => {
      setActiveSection();
      if (window.scrollY > 300) {
        upBtn.style.display = 'block';
      } else {
        upBtn.style.display = 'none';
      }
    // Scroll to top when up button is clicked
      upBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });

      // Hide navigation bar when not scrolling
      hPage.style.top = "0";
      clearTimeout(isScrolling);
     isScrolling = setTimeout(() => {
      hPage.style.top = "-100";
     }, 2000);
    
    // Make sections collapsible
    sections.forEach(section => {
      const less = section.querySelector('.less');
      less.style.cursor = 'pointer';
      less.style.color='rgb(228, 200, 0)';
      
      less.addEventListener('click', () => {
        const content = section.querySelector('.content');
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
        less.textContent= less.textContent==='see less...' ? 'see more...':'see less...';
      });
    });
  });
  });
  