document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navMenu.classList.remove('is-open'));
    });
  }

  // Scroll reveal
  document.querySelectorAll('.reveal').forEach((el) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
  });

  // Hero question rotation
  const heroQuestions = document.querySelectorAll('#heroQuestions li');
  let questionIndex = 0;

  if (heroQuestions.length) {
    setInterval(() => {
      heroQuestions[questionIndex].classList.remove('active');
      questionIndex = (questionIndex + 1) % heroQuestions.length;
      heroQuestions[questionIndex].classList.add('active');
    }, 3200);
  }

  // Product scenarios
  const scenarios = {
    car: {
      decisionType: 'Vehicle purchase',
      scenario: '₹15L car financing',
      verdict: 'Approved',
      verdictClass: 'verdict-approved',
      confidence: '91%',
      details: [
        { label: 'Impact', value: 'Low risk' },
        { label: 'Recommended EMI', value: '₹18,000' },
        { label: 'Future savings impact', value: 'Minimal', wide: true },
      ],
      reasoning: null,
      recommendation: null,
    },
    trip: {
      decisionType: 'Travel expense',
      scenario: 'Bali trip · ₹2.5L budget',
      verdict: 'Worth Reviewing',
      verdictClass: 'verdict-review',
      confidence: '88%',
      details: [],
      reasoning: ['Trip budget reduces emergency fund below target.'],
      recommendation: 'Wait 2 months or reduce budget.',
    },
    invest: {
      decisionType: 'Investment allocation',
      scenario: '₹50,000 lump-sum deploy',
      verdict: 'Approved',
      verdictClass: 'verdict-approved',
      confidence: '93%',
      details: [],
      reasoning: [
        'Strong cash position.',
        'Emergency fund healthy.',
        'Investment fits goals.',
      ],
      recommendation: null,
    },
  };

  const productStage = document.getElementById('productStage');
  const productDecisionType = document.getElementById('productDecisionType');
  const productScenario = document.getElementById('productScenario');
  const productVerdict = document.getElementById('productVerdict');
  const productConfidence = document.getElementById('productConfidence');
  const productDetail2Wrap = document.getElementById('productDetail2Wrap');
  const productDetail2Label = document.getElementById('productDetail2Label');
  const productDetail2 = document.getElementById('productDetail2');
  const productDetail3Wrap = document.getElementById('productDetail3Wrap');
  const productDetail3Label = document.getElementById('productDetail3Label');
  const productDetail3 = document.getElementById('productDetail3');
  const productDetail4Wrap = document.getElementById('productDetail4Wrap');
  const productDetail4Label = document.getElementById('productDetail4Label');
  const productDetail4 = document.getElementById('productDetail4');
  const productReasoning = document.getElementById('productReasoning');
  const productTabs = document.querySelectorAll('.product-tab');

  function renderScenario(key) {
    const s = scenarios[key];
    if (!s || !productStage) return;

    productStage.classList.add('fading');

    setTimeout(() => {
      if (productDecisionType) productDecisionType.textContent = s.decisionType;
      if (productScenario) productScenario.textContent = s.scenario;
      if (productVerdict) {
        productVerdict.textContent = s.verdict;
        productVerdict.className = `product-verdict ${s.verdictClass}`;
      }
      if (productConfidence) productConfidence.textContent = s.confidence;

      // Car scenario uses detail rows
      const hasDetails = s.details && s.details.length > 0;
      if (productDetail2Wrap) productDetail2Wrap.hidden = !hasDetails;
      if (productDetail3Wrap) productDetail3Wrap.hidden = !hasDetails || s.details.length < 2;
      if (productDetail4Wrap) productDetail4Wrap.hidden = !hasDetails || s.details.length < 3;

      if (hasDetails) {
        if (productDetail2Label) productDetail2Label.textContent = s.details[0].label;
        if (productDetail2) productDetail2.textContent = s.details[0].value;
        if (s.details[1]) {
          if (productDetail3Label) productDetail3Label.textContent = s.details[1].label;
          if (productDetail3) productDetail3.textContent = s.details[1].value;
        }
        if (s.details[2]) {
          if (productDetail4Label) productDetail4Label.textContent = s.details[2].label;
          if (productDetail4) productDetail4.textContent = s.details[2].value;
        }
      }

      // Reasoning block for trip/invest
      if (productReasoning) {
        if (s.reasoning && s.reasoning.length) {
          productReasoning.hidden = false;
          let html = '<span class="product-reasoning-label">Analysis signals</span><ul class="product-reasoning-list">';
          s.reasoning.forEach((r) => { html += `<li>${r}</li>`; });
          html += '</ul>';
          if (s.recommendation) {
            html += `<p class="product-recommendation">Engine recommendation: ${s.recommendation}</p>`;
          }
          productReasoning.innerHTML = html;
        } else {
          productReasoning.hidden = true;
          productReasoning.innerHTML = '';
        }
      }

      productStage.classList.remove('fading');
    }, 250);
  }

  productTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      productTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderScenario(tab.dataset.scenario);
    });
  });

  // Auto-rotate product demo
  const tabKeys = ['car', 'trip', 'invest'];
  let tabIndex = 0;

  if (productTabs.length) {
    setInterval(() => {
      tabIndex = (tabIndex + 1) % tabKeys.length;
      productTabs.forEach((t) => {
        const active = t.dataset.scenario === tabKeys[tabIndex];
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', String(active));
      });
      renderScenario(tabKeys[tabIndex]);
    }, 7000);
  }

  // Waitlist form
  function markInvalid(input) {
    input.style.borderColor = 'rgba(255, 100, 100, 0.5)';
    setTimeout(() => { input.style.borderColor = ''; }, 2000);
  }

  async function sendToInbox(data) {
    const accessKey = window.ARIVO_FORM?.web3formsAccessKey?.trim();
    const notificationEmail = window.ARIVO_FORM?.notificationEmail?.trim() || 'akhileshgoswami@arivoai.in';
    if (!accessKey) throw new Error('Not configured');

    const payload = {
      access_key: accessKey,
      subject: data._subject || 'New Arivo Waitlist',
      from_name: 'Arivo Website',
      name: data.Name,
      email: data.Email,
      phone: data.Phone,
      botcheck: '',
    };

    const results = await Promise.allSettled([
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      }).then(async (r) => {
        const j = await r.json();
        if (!r.ok || !j.success) throw new Error();
        return j;
      }),
      fetch(`https://formsubmit.co/ajax/${encodeURIComponent(notificationEmail)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: payload.subject,
          _template: 'table',
          _captcha: 'false',
          Name: data.Name,
          Email: data.Email,
          Phone: data.Phone,
        }),
      }).then((r) => { if (!r.ok) throw new Error(); return r.json(); }),
    ]);

    if (!results.some((r) => r.status === 'fulfilled')) throw new Error();
  }

  const form = document.getElementById('waitlistForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('waitlistName');
      const phoneInput = document.getElementById('waitlistPhone');
      const emailInput = document.getElementById('emailInput');
      const btn = document.getElementById('waitlistBtn');
      const successMsg = document.getElementById('successMsg');
      const errorMsg = document.getElementById('errorMsg');

      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const email = emailInput.value.trim();

      successMsg.classList.remove('visible');
      errorMsg.classList.remove('visible');

      if (!name) { markInvalid(nameInput); return; }
      if (!phone || phone.length < 10) { markInvalid(phoneInput); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { markInvalid(emailInput); return; }

      btn.disabled = true;
      btn.textContent = 'Joining...';

      try {
        await sendToInbox({ Name: name, Phone: phone, Email: email, _subject: 'New Arivo Waitlist Signup' });
        form.reset();
        successMsg.classList.add('visible');
      } catch {
        errorMsg.classList.add('visible');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Join Waitlist';
      }
    });
  }
});
