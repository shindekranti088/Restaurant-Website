// Get the form element
const form = document.getElementById('order-form');

// Add an event listener to the form submission
form.addEventListener('submit', (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Get the form data
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const specialInstructions = document.getElementById('special-instructions').value;
  const orderItemsSelected = [];

  // Get the selected order items
  const orderItemsList = document.getElementById('order-items');
  orderItemsList.childNodes.forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      orderItemsSelected.push(item.textContent);
    }
  });

  // Create a new page to display the form information
  const newPage = document.createElement('div');
  newPage.innerHTML = `
    <h1>Order Summary</h1>
    <p>Name: ${name}</p>
    <p>Phone Number: ${phone}</p>
    <p>Email: ${email}</p>
    <p>Order Items:</p>
    <ul>
      ${orderItemsSelected.map((item) => `<li>${item}</li>`).join('')}
    </ul>
    <p>Special Instructions: ${specialInstructions}</p>
  `;

  // Add the new page to the body of the HTML document
  document.body.appendChild(newPage);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if(elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Menu item filter animation
const menuBtns = document.querySelectorAll('.menu-btn');
const menuItems = document.querySelectorAll('.menu-item');

menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        
        menuItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            }, 300);
        });
    });
});

// Form validation and interactive feedback
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('[type="submit"]');
        
        // Validate required fields
        form.querySelectorAll('[required]').forEach(field => {
            if (!field.value) {
                isValid = false;
                field.classList.add('is-invalid');
                
                // Add shake animation
                field.classList.add('shake');
                setTimeout(() => field.classList.remove('shake'), 500);
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        if (isValid) {
            // Show loading state
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                submitBtn.classList.remove('btn-primary');
                submitBtn.classList.add('btn-success');
                
                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = 'Submit';
                    submitBtn.classList.remove('btn-success');
                    submitBtn.classList.add('btn-primary');
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        }
    });
    
    // Real-time validation feedback
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => {
            if (field.value) {
                field.classList.remove('is-invalid');
            }
        });
    });
});