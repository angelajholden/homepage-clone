document.addEventListener("DOMContentLoaded", () => {
	const date = document.querySelector("#date");
	const year = new Date().getFullYear();
	if (date) {
		date.textContent = year;
	}

	const body = document.querySelector("body");
	const buttons = document.querySelectorAll(".menu_button");
	const open = document.querySelector(".open_button");

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

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && body.classList.contains("menu_active")) {
			body.classList.remove("menu_active");
			open.setAttribute("aria-expanded", "false");
		}
	});

	const onScroll = document.querySelector(".on_scroll");
	const observer = new IntersectionObserver(
		([entry]) => {
			document.body.classList.toggle("scrolled", !entry.isIntersecting);
		},
		{ rootMargin: "35px 0px 0px 0px" }
	);

	observer.observe(onScroll);
});
