document.addEventListener('DOMContentLoaded', () => {
  const phones = document.querySelectorAll('.phone-wrap');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  phones.forEach((phone) => observer.observe(phone));

  function markInvalid(input) {
    input.style.borderColor = '#f87171';
    input.style.boxShadow = '0 0 0 3px rgba(248,113,113,0.15)';
    setTimeout(() => {
      input.style.borderColor = '';
      input.style.boxShadow = '';
    }, 2000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function sendToInbox(data) {
    const accessKey = window.ARIVO_FORM?.web3formsAccessKey?.trim();
    const notificationEmail = window.ARIVO_FORM?.notificationEmail?.trim()
      || 'akhileshgoswami@arivoai.in';

    if (!accessKey) {
      throw new Error('Form access key not configured');
    }

    const subject = data._subject || 'New Arivo Submission';
    const payload = {
      access_key: accessKey,
      subject,
      from_name: 'Arivo Website',
      name: data.Name,
      email: data.Email,
      replyto: data.Email,
      company: data.Company,
      phone: data.Phone,
      type: data.type,
      botcheck: '',
    };

    const web3formsRequest = fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(async (response) => {
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Web3Forms submission failed');
      }
      return result;
    });

    const formSubmitRequest = fetch(`https://formsubmit.co/ajax/${encodeURIComponent(notificationEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: subject,
        _template: 'table',
        _captcha: 'false',
        Name: data.Name,
        Email: data.Email,
        Phone: data.Phone,
        Company: data.Company,
        Type: data.type,
      }),
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error('FormSubmit delivery failed');
      }
      return response.json();
    });

    const results = await Promise.allSettled([web3formsRequest, formSubmitRequest]);
    const success = results.find((result) => result.status === 'fulfilled');

    if (!success) {
      throw new Error('Submission failed');
    }

    return success.value;
  }

  function hideFeedback() {
    document.getElementById('successMsg').classList.remove('visible');
    document.getElementById('errorMsg').classList.remove('visible');
  }

  function showSuccess(title, body) {
    const successMsg = document.getElementById('successMsg');
    const errorMsg = document.getElementById('errorMsg');

    document.getElementById('successTitle').textContent = title;
    document.getElementById('successBody').textContent = body;
    errorMsg.classList.remove('visible');
    successMsg.classList.add('visible');
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function showError() {
    const successMsg = document.getElementById('successMsg');
    const errorMsg = document.getElementById('errorMsg');

    successMsg.classList.remove('visible');
    errorMsg.classList.add('visible');
    errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideForms() {
    document.getElementById('waitlistForm').style.display = 'none';
  }

  async function handleWaitlist(event) {
    event.preventDefault();

    const nameInput = document.getElementById('waitlistName');
    const emailInput = document.getElementById('emailInput');
    const phoneInput = document.getElementById('waitlistPhone');
    const btn = document.getElementById('waitlistBtn');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!name) {
      markInvalid(nameInput);
      return;
    }

    if (!phone || phone.length < 10) {
      if (phoneInput) markInvalid(phoneInput);
      return;
    }

    if (!isValidEmail(email)) {
      markInvalid(emailInput);
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Loading...';
    hideFeedback();

    try {
      await sendToInbox({
        Name: name,
        Email: email,
        Phone: phone,
        type: 'Beta List Signup',
        _subject: 'New Arivo Beta Signup',
      });

      hideForms();
      showSuccess(
        "You're on the list!",
        "We'll email your first personalized recommendation shortly."
      );
      if (window.arivoSpark) {
        const rect = btn.getBoundingClientRect();
        window.arivoSpark(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
      nameInput.value = '';
      emailInput.value = '';
      if (phoneInput) phoneInput.value = '';
    } catch {
      showError();
    } finally {
      btn.disabled = false;
      btn.textContent = 'Start Free';
    }
  }

  document.getElementById('waitlistForm').addEventListener('submit', handleWaitlist);

  const navShell = document.querySelector('.nav-shell');
  const progressBar = document.querySelector('.scroll-progress-bar');
  let scrollTicking = false;

  function updateScrollEffects() {
    const { scrollY } = window;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (progressBar && docHeight > 0) {
      progressBar.style.width = `${(scrollY / docHeight) * 100}%`;
    }

    document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);

    if (navShell) {
      navShell.classList.toggle('nav-shell-scrolled', scrollY > 40);
    }

    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(updateScrollEffects);
    }
  }, { passive: true });

  updateScrollEffects();

  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const scrollEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const heroRevealEls = document.querySelectorAll('.hero-stagger, .hero-preview.reveal, .hero-engine-wrap.reveal');

  if (heroRevealEls.length) {
    requestAnimationFrame(() => {
      heroRevealEls.forEach((el) => el.classList.add('is-visible'));
    });
  }

  if (scrollEls.length && 'IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
    );
    scrollEls.forEach((el) => revealObs.observe(el));
  } else {
    scrollEls.forEach((el) => el.classList.add('is-visible'));
  }

  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const spySections = ['how-it-works', 'why-arivo', 'blog']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (navLinks.length && spySections.length && 'IntersectionObserver' in window) {
    const spyObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const { id } = entry.target;
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
          });
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    spySections.forEach((section) => spyObs.observe(section));
  }

  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const animateCounter = (el) => {
      const target = Number(el.dataset.count);
      if (Number.isNaN(target)) return;

      const suffix = el.dataset.countSuffix || '';
      const duration = 1400;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          counterObs.unobserve(entry.target);
        });
      },
      { threshold: 0.6 },
    );

    counters.forEach((el) => counterObs.observe(el));
  } else {
    counters.forEach((el) => {
      el.textContent = `${el.dataset.count || ''}${el.dataset.countSuffix || ''}`;
    });
  }
});
