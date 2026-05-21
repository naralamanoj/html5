// Typing Effect for Hero Subtitle
(function () {
  const phrases = [
    'B.Tech Student in AI & Data Science',
    'Full Stack Developer',
    'Python & Java Programmer',
    'AI Enthusiast',
    'Problem Solver'
  ];

  const el = document.getElementById('typing-target');
  if (!el) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    el.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let pauseCounter = 0;

  function tick() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        pauseCounter = 0;
        setTimeout(tick, 1800); // pause at end
        return;
      }
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
    }

    setTimeout(tick, isDeleting ? 50 : 80);
  }

  setTimeout(tick, 600);
})();