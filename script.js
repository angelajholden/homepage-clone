const date = document.querySelector("#date");
const year = new Date().getFullYear();
const body = document.querySelector("body");
const buttons = document.querySelectorAll(".menu_button");
const open = document.querySelector(".open_button");
const onScroll = document.querySelector(".on_scroll");

// Slider variables
const slides = document.querySelectorAll(".hero_slides .slide");
const slideContainer = document.querySelector(".hero_slides");
const dots = document.querySelectorAll(".slide_dots .dot");
const dotButtons = document.querySelectorAll(".slide_dots .dot button");

function copyright() {
	if (date) {
		date.textContent = year;
	}
}

function menuToggle() {
	if (open) {
		buttons.forEach((button) => {
			button.addEventListener("click", () => {
				const isActive = body.classList.toggle("menu_active");
				if (isActive) {
					open.setAttribute("aria-expanded", "true");
				} else {
					open.setAttribute("aria-expanded", "false");
				}
			});
		});
	}
}

function escapeToggle() {
	if (open) {
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && body.classList.contains("menu_active")) {
				body.classList.remove("menu_active");
				open.setAttribute("aria-expanded", "false");
			}
		});
	}
}

function onPageScroll() {
	const observer = new IntersectionObserver(
		([entry]) => {
			document.body.classList.toggle("scrolled", !entry.isIntersecting);
		},
		{ rootMargin: "35px 0px 0px 0px" }
	);

	observer.observe(onScroll);
}

// Need a slider that works with the given html and dots
// The slider should not automatically transition, but should allow users to click on the dots to navigate between slides. Each dot should correspond to a specific slide, and the active dot should be given an active class.
// The slider CSS is already set up to show one slide at a time, and the dots are styled to indicate which slide is currently active. The JavaScript will need to handle the click events on the dots, update the active slide, and toggle the active class on the dots accordingly.
// The active class for the dots is .dot.
function slider() {
	// Function to update active states
	function updateActiveStates(index) {
		// Remove active classes and aria-pressed states
		slides.forEach((slide) => slide.classList.remove("active"));
		slides.forEach((slide) => slide.setAttribute("aria-hidden", "true"));
		slides.forEach((slide) => slide.setAttribute("inert", "true"));
		dots.forEach((dot) => dot.classList.remove("active"));
		dotButtons.forEach((button) => button.setAttribute("aria-pressed", "false"));

		// Add active classes and update aria-pressed state
		slides[index].classList.add("active");
		slides[index].setAttribute("aria-hidden", "false");
		slides[index].removeAttribute("inert");
		dots[index].classList.add("active");
		dotButtons[index].setAttribute("aria-pressed", "true");
	}

	// Add click event listeners to dot buttons
	dotButtons.forEach((button, index) => {
		button.addEventListener("click", () => {
			updateActiveStates(index);
		});
	});

	// Initialize first slide as active
	if (slides.length > 0 && dots.length > 0) {
		updateActiveStates(0);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	copyright();
	menuToggle();
	escapeToggle();
	onPageScroll();
	slider();
});
