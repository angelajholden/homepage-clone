document.addEventListener("DOMContentLoaded", () => {
	const onScroll = document.querySelector(".on_scroll");
	const observer = new IntersectionObserver(
		([entry]) => {
			document.body.classList.toggle("scrolled", !entry.isIntersecting);
		},
		{ rootMargin: "35px 0px 0px 0px" }
	);

	observer.observe(onScroll);
});
