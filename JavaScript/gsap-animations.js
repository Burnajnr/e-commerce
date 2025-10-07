// Animate header on load
gsap.from("#header", {
  y: -100,
  opacity: 0,
  duration: 1.2,
  ease: "power4.out"
});

// Animate collection cards on scroll
gsap.utils.toArray(".collection-card").forEach(card => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });
});

// Animate buttons with micro-interactions
document.querySelectorAll('.shop-btn, .btn-link').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, { scale: 1.12, rotate: 2, duration: 0.3, ease: "power2.out" });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { scale: 1, rotate: 0, duration: 0.3, ease: "power2.out" });
  });
});
