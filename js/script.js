document.addEventListener("DOMContentLoaded", function () {
    // NAVBAR SCROLL
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // SCROLL REVEAL
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
    }, { threshold: 0.1 });
    reveals.forEach(r => io.observe(r));

    // FORM SUBMIT
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.form-submit');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                submitBtn.textContent = 'Mensagem enviada ✓';
                submitBtn.style.background = '#263329';
                submitBtn.style.color = '#FDFAF5';
                contactForm.reset();
            } else {
                submitBtn.textContent = 'Erro ao enviar';
                submitBtn.style.background = '#b04a4a';
                submitBtn.style.color = '#fff';
            }
        })
        .catch(() => {
            submitBtn.textContent = 'Erro ao enviar';
            submitBtn.style.background = '#b04a4a';
            submitBtn.style.color = '#fff';
        })
        .finally(() => {
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.disabled = false;
            }, 3000);
        });
    });

    // MOBILE MENU
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.classList.toggle('menu-open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.classList.remove('menu-open');
        });
    });
});