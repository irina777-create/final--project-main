import Collapse from "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/carousel";

const burger = document.querySelector(".header__burger");
const navigation = document.querySelector("#main-menu");

if (burger && navigation) {
    navigation.addEventListener("show.bs.collapse", () => {
        burger.setAttribute("aria-expanded", "true");
    });

    navigation.addEventListener("hide.bs.collapse", () => {
        burger.setAttribute("aria-expanded", "false");
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 1024) {
                Collapse.getOrCreateInstance(navigation).hide();
            }
        });
    });
}
document.querySelectorAll(".process__button").forEach((button) => {
    const contentId = button.getAttribute("aria-controls");
    const content = document.querySelector(`#${contentId}`);

    if (!content) {
        return;
    }

    content.addEventListener("show.bs.collapse", () => {
        button.setAttribute("aria-expanded", "true");

        button
            .closest(".process__item")
            ?.classList.add("process__item--active");
    });

    content.addEventListener("hide.bs.collapse", () => {
        button.setAttribute("aria-expanded", "false");

        button
            .closest(".process__item")
            ?.classList.remove("process__item--active");
    });
});
const slider = document.querySelector(".testimonials__slider");

if (slider) {
    const track = slider.querySelector(".testimonials__track");

    const cards = [
        ...slider.querySelectorAll(".testimonial-card"),
    ];

    const dots = [
        ...slider.querySelectorAll(".testimonials__dot"),
    ];

    const previous = slider.querySelector(
        ".testimonials__arrow--previous",
    );

    const next = slider.querySelector(
        ".testimonials__arrow--next",
    );

    let currentSlide = 0;

    const showSlide = (index) => {
        currentSlide = (index + cards.length) % cards.length;

        track.style.transform =
            `translateX(-${currentSlide * 100}%)`;

        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === currentSlide;

            dot.classList.toggle(
                "testimonials__dot--active",
                isActive,
            );

            dot.setAttribute(
                "aria-current",
                isActive ? "true" : "false",
            );
        });
    };

    previous?.addEventListener("click", () => {
        showSlide(currentSlide - 1);
    });

    next?.addEventListener("click", () => {
        showSlide(currentSlide + 1);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
        });
    });

    showSlide(0);
}