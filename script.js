
/* =====================================
   JYOTI VERMA - PORTFOLIO JAVASCRIPT
===================================== */

// 1. Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        closeMenu();

        navItems.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
    });
});

// Close menu if user clicks outside it
document.addEventListener("click", (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
    }
});

// 2. Reveal sections when they enter the viewport
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
} else {
    // Fallback for older browsers
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

// 3. Automatically update the copyright year
document.getElementById("year").textContent =
    new Date().getFullYear();

// 4. Contact form validation
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    message: document.getElementById("message")
};

const errors = {
    name: document.getElementById("name-error"),
    email: document.getElementById("email-error"),
    message: document.getElementById("message-error")
};

function showError(fieldName, message) {
    fields[fieldName].classList.toggle("invalid", Boolean(message));
    fields[fieldName].setAttribute(
        "aria-invalid",
        String(Boolean(message))
    );
    errors[fieldName].textContent = message;
}

function validateName() {
    const value = fields.name.value.trim();

    if (value.length < 2) {
        showError("name", "Please enter at least 2 characters.");
        return false;
    }

    showError("name", "");
    return true;
}

function validateEmail() {
    const value = fields.email.value.trim();

    // Basic client-side email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {
        showError("email", "Please enter a valid email address.");
        return false;
    }

    showError("email", "");
    return true;
}

function validateMessage() {
    const value = fields.message.value.trim();

    if (value.length < 10) {
        showError("message", "Please enter at least 10 characters.");
        return false;
    }

    showError("message", "");
    return true;
}

// Validate each field when the user edits it
fields.name.addEventListener("input", validateName);
fields.email.addEventListener("input", validateEmail);
fields.message.addEventListener("input", validateMessage);

// Validate all fields when the form is submitted
contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameIsValid = validateName();
    const emailIsValid = validateEmail();
    const messageIsValid = validateMessage();

    if (!nameIsValid || !emailIsValid || !messageIsValid) {
        formStatus.textContent =
            "Please correct the highlighted fields and try again.";

        formStatus.style.color = "#c73545";

        const firstInvalidField = contactForm.querySelector(".invalid");

        if (firstInvalidField) {
            firstInvalidField.focus();
        }

        return;
    }

    formStatus.textContent =
        "Validation successful! Your details are ready, but no email has been sent.";

    formStatus.style.color = "#258457";
});
