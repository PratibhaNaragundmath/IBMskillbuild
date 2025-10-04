// Portfolio Website JavaScript

// Mock Data
const portfolioData = {
    projects: [
        {
            id: 1,
            title: "E-Commerce Dashboard",
            description: "A comprehensive admin dashboard for managing online stores with real-time analytics, inventory management, and customer insights.",
            technologies: ["React", "Node.js", "MongoDB", "Chart.js", "Tailwind CSS"],
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
            liveUrl: "https://ecommerce-dashboard-demo.com",
            githubUrl: "https://github.com/pratibha-dev/ecommerce-dashboard",
            featured: true
        },
        {
            id: 2,
            title: "Task Management App",
            description: "A collaborative task management application with drag-and-drop functionality, team collaboration, and progress tracking.",
            technologies: ["React", "Firebase", "Material-UI", "React DnD"],
            imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
            liveUrl: "https://taskmanager-app-demo.com",
            githubUrl: "https://github.com/pratibha-dev/task-manager",
            featured: true
        },
        {
            id: 3,
            title: "Weather Forecast App",
            description: "A beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
            technologies: ["React", "OpenWeather API", "CSS3", "Chart.js"],
            imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
            liveUrl: "https://weather-app-demo.com",
            githubUrl: "https://github.com/pratibha-dev/weather-app",
            featured: false
        },
        {
            id: 4,
            title: "Portfolio Website",
            description: "A responsive portfolio website showcasing creative work with smooth animations and modern design principles.",
            technologies: ["Next.js", "GSAP", "Tailwind CSS", "Framer Motion"],
            imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
            liveUrl: "https://creative-portfolio-demo.com",
            githubUrl: "https://github.com/pratibha-dev/portfolio",
            featured: false
        },
        {
            id: 5,
            title: "Learning Management System",
            description: "An educational platform with course management, progress tracking, and interactive learning modules.",
            technologies: ["React", "Express.js", "MongoDB", "Socket.io"],
            imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
            liveUrl: "https://lms-demo.com",
            githubUrl: "https://github.com/pratibha-dev/lms",
            featured: true
        },
        {
            id: 6,
            title: "Recipe Sharing Platform",
            description: "A social platform for sharing recipes with ratings, comments, and meal planning features.",
            technologies: ["React", "Python", "FastAPI", "PostgreSQL"],
            imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
            liveUrl: "https://recipe-platform-demo.com",
            githubUrl: "https://github.com/pratibha-dev/recipe-platform",
            featured: false
        }
    ],
    testimonials: [
        {
            id: 1,
            name: "Rajesh Kumar",
            position: "Product Manager at TechCorp",
            content: "Pratibha delivered exceptional work on our dashboard project. Her attention to detail and technical expertise made the entire development process smooth and efficient.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        },
        {
            id: 2,
            name: "Priya Patel",
            position: "CEO at StartupXYZ",
            content: "Working with Pratibha was a game-changer for our company. She transformed our ideas into a beautiful, functional application that exceeded our expectations.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b282?w=100&h=100&fit=crop&crop=face"
        },
        {
            id: 3,
            name: "Michael Chen",
            position: "Design Lead at CreativeStudio",
            content: "Pratibha's ability to bridge the gap between design and development is remarkable. She brings both technical skills and creative vision to every project.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        }
    ]
};

// Global Variables
let currentFilter = 'all';
let visibleProjects = 6;
let currentTestimonial = 0;

// DOM Elements
const loadingScreen = document.getElementById('loading');
const mainContent = document.getElementById('main-content');
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const projectsGrid = document.getElementById('projects-grid');
const loadMoreBtn = document.getElementById('load-more');
const testimonialSlider = document.getElementById('testimonial-slider');
const testimonialDots = document.getElementById('testimonial-dots');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');

function initializeWebsite() {
    setupNavigation();
    setupScrollEffects();
    setupSmoothScrolling();
    loadProjects();
    setupProjectFilters();
    loadTestimonials();
    setupTestimonialNavigation();
    setupContactForm();
    setupScrollAnimations();
}

// Navigation Setup
function setupNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'testimonials', 'contact'];
    const scrollPosition = window.scrollY + 100;

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const navLink = document.querySelector(`a[href="#${sectionId}"]`);
        
        if (section && navLink) {
            const { offsetTop, offsetHeight } = section;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

// Scroll Effects
function setupScrollEffects() {
    window.addEventListener('scroll', function() {
        // Header scroll effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Projects Section
function loadProjects() {
    const filteredProjects = getFilteredProjects();
    const projectsToShow = filteredProjects.slice(0, visibleProjects);
    
    projectsGrid.innerHTML = '';
    
    projectsToShow.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
    
    // Show/hide load more button
    loadMoreBtn.style.display = visibleProjects < filteredProjects.length ? 'block' : 'none';
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.featured = project.featured;
    
    const techTags = project.technologies.slice(0, 3).map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    const moreTechs = project.technologies.length > 3 ? 
        `<span class="tech-tag">+${project.technologies.length - 3} more</span>` : '';
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.imageUrl}" alt="${project.title}" loading="lazy">
            ${project.featured ? '<div class="project-badge">Featured</div>' : ''}
            <div class="project-overlay"></div>
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-techs">
                ${techTags}
                ${moreTechs}
            </div>
            <div class="project-links">
                <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
                    <i class="fas fa-external-link-alt"></i>
                    <span>Live Demo</span>
                </a>
                <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
                    <i class="fab fa-github"></i>
                    <span>Code</span>
                </a>
            </div>
        </div>
    `;
    
    return card;
}

function getFilteredProjects() {
    if (currentFilter === 'all') {
        return portfolioData.projects;
    } else if (currentFilter === 'featured') {
        return portfolioData.projects.filter(project => project.featured);
    }
    return portfolioData.projects;
}

function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update current filter and reset visible projects
            currentFilter = this.dataset.filter;
            visibleProjects = 6;
            
            // Reload projects
            loadProjects();
        });
    });
    
    // Load more functionality
    loadMoreBtn.addEventListener('click', function() {
        visibleProjects += 3;
        loadProjects();
    });
}

// Testimonials Section
function loadTestimonials() {
    testimonialSlider.innerHTML = '';
    testimonialDots.innerHTML = '';
    
    portfolioData.testimonials.forEach((testimonial, index) => {
        // Create testimonial item
        const testimonialItem = document.createElement('div');
        testimonialItem.className = `testimonial-item ${index === 0 ? 'active' : ''}`;
        testimonialItem.innerHTML = `
            <div class="testimonial-quote">
                <i class="fas fa-quote-left"></i>
            </div>
            <p class="testimonial-content">"${testimonial.content}"</p>
            <div class="testimonial-author">
                <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
                <div class="testimonial-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.position}</p>
                </div>
            </div>
        `;
        testimonialSlider.appendChild(testimonialItem);
        
        // Create dot
        const dot = document.createElement('button');
        dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToTestimonial(index));
        testimonialDots.appendChild(dot);
    });
}

function setupTestimonialNavigation() {
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    
    prevBtn.addEventListener('click', prevTestimonial);
    nextBtn.addEventListener('click', nextTestimonial);
    
    // Auto-advance testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % portfolioData.testimonials.length;
    updateTestimonialDisplay();
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + portfolioData.testimonials.length) % portfolioData.testimonials.length;
    updateTestimonialDisplay();
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonialDisplay();
}

function updateTestimonialDisplay() {
    // Update testimonial items
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    testimonialItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentTestimonial);
    });
    
    // Update dots
    const dots = document.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

// Contact Form
function setupContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <div style="width: 1rem; height: 1rem; border: 2px solid white; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 0.5rem;"></div>
            <span>Sending...</span>
        `;
        
        // Simulate form submission
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            // Show success toast
            showToast();
        }, 1000);
    });
}

function showToast() {
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.section-header, .about-content > *, .skill-card, .project-card, .timeline-item, .testimonial-container, .contact-content > *');
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance Optimizations
const debouncedScroll = debounce(function() {
    updateActiveNavigation();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Add CSS animation for loading spinner
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);