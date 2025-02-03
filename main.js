document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const menubar = document.querySelector('.menubar');
  const closeBtn = document.querySelector('.close-btn');

  // Toggle mobile menu
  hamburger.addEventListener('click', function () {
    menubar.classList.toggle('active');
    hamburger.classList.toggle('is-active');
  });

  // Close mobile menu
  closeBtn.addEventListener('click', function () {
    menubar.classList.remove('active');
    hamburger.classList.remove('is-active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (event) {
    const isClickInsideMenu = menubar.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideMenu && !isClickOnHamburger) {
      menubar.classList.remove('active');
      hamburger.classList.remove('is-active');
    }
  });

  // Scroll Button (Header/Footer)
  const scrollButton = document.getElementById('scrollButton');
  const scrollIcon = document.getElementById('scrollIcon');
  const header = document.getElementById('header');
  const footer = document.getElementById('footer');

  function isAtTop() {
    return window.scrollY < window.innerHeight / 2;
  }

  scrollButton.addEventListener('click', () => {
    if (isAtTop()) {
      footer.scrollIntoView({ behavior: 'smooth' });
    } else {
      header.scrollIntoView({ behavior: 'smooth' });
    }
  });

  window.addEventListener('scroll', () => {
    if (isAtTop()) {
      scrollIcon.textContent = '↓';
    } else {
      scrollIcon.textContent = '↑';
    }
  });

  // Project Overlay Toggle
  function toggleOverlay(element) {
    const allOverlays = document.querySelectorAll('.project-overlay');
    allOverlays.forEach(overlay => {
      if (overlay !== element.querySelector('.project-overlay')) {
        overlay.classList.remove('active');
      }
    });

    const overlay = element.querySelector('.project-overlay');
    overlay.classList.toggle('active');
  }

  document.addEventListener('click', (event) => {
    const isClickInside = event.target.closest('.project-image');
    if (!isClickInside) {
      const allOverlays = document.querySelectorAll('.project-overlay');
      allOverlays.forEach(overlay => {
        overlay.classList.remove('active');
      });
    }
  });

  // Auto-Scrolling Projects Section (Only for Desktop)
  const container = document.querySelector('.projects-container');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  // Function to manually scroll the container (left/right)
  const scrollProjects = (direction) => {
    const containerWidth = container.offsetWidth;
    container.scrollBy({
      left: direction * containerWidth,
      behavior: 'smooth',
    });
  };

  // Button click events for manual control
  nextBtn.addEventListener('click', () => {
    scrollProjects(1); // Scroll to next project (right)
  });

  prevBtn.addEventListener('click', () => {
    scrollProjects(-1); // Scroll to previous project (left)
  });

  // GSAP Animation for Heading
  gsap.from("h1", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "bounce.out",
    delay: 0.5,
  });

  // Skill Icons Click Alert
  const skillIcons = document.querySelectorAll('.slider li');
  skillIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      alert(`You clicked on ${icon.querySelector('span').textContent}!`);
    });
  });

  // Loading Page Hide
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.getElementById('loading-page').style.display = 'none';
    }, 2000); // Adjust the delay as needed
  });

  // Animate Projects on Scroll
  const projectItems = document.querySelectorAll('.project-item');

  const animateProjects = () => {
    projectItems.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Add a delay for staggered animations
      const delay = index * 200; // 200ms delay between each project

      if (itemTop < windowHeight * 0.8) { // When project is 80% in view
        setTimeout(() => {
          item.classList.add('visible');
        }, delay);
      }
    });
  };

  // Trigger animation on page load and scroll
  animateProjects();
  window.addEventListener('scroll', animateProjects);

  // GSAP Scroll Animations for Soft Skills
  const softSkillsLabels = document.querySelectorAll('.soft-skills label');

  // Create a GSAP timeline for soft skills animation
  const softSkillsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.soft-skills', // Trigger animation when soft skills section is in view
      start: 'top 80%', // Start animation when the top of the section is 80% in view
      end: 'bottom 20%', // End animation when the bottom of the section is 20% in view
      toggleActions: 'play none none reverse', // Play animation on scroll in, reverse on scroll out
    },
  });

  // Animate each soft skill label
  softSkillsLabels.forEach((label, index) => {
    softSkillsTimeline.fromTo(
      label,
      { opacity: 0, y: 20 }, // Start hidden and slightly below
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: index * 0.2, // Staggered delay for each label
      },
      '<' // Add to the timeline
    );
  });

  // Initialize EmailJS
  emailjs.init("M-ghGmiQucWbtdwPO"); // Replace with your Public Key

  // Handle Form Submission
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission

      // Get the form data
      const formData = {
        to_name: "sara", // Replace with your name or the recipient's name
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      };

      console.log("Form Data:", formData); // Debugging: Log form data

      // Send the email using EmailJS
      emailjs
        .send("service_zlqyoig", "template_gholgzg", formData) // Replace with your Service ID and Template ID
        .then(
          function (response) {
            console.log("Email sent successfully!", response.status, response.text);

            // Redirect to thank-you.html after successful submission
            window.location.href = "thank-you.html";
          },
          function (error) {
            console.error("Failed to send email.", error);
            alert("Oops! Something went wrong. Please try again.");
          }
        );
    });
}); // Closing brace for DOMContentLoaded event listener