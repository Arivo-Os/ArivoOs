document.addEventListener('DOMContentLoaded', () => {
  // Page load — enable hero animations
  requestAnimationFrame(() => {
    document.body.classList.add('loaded');
  });

  // Header scroll state
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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

  // Hero engine cycle — 3-phase story synced with decision rotation
  const heroQuestions = document.querySelectorAll('#heroQuestions li');
  const aiOrb = document.getElementById('aiOrb');
  const aiOrbWrap = document.querySelector('.ai-orb-wrap');
  const heroVisual = document.querySelector('.hero-visual');
  const orbReportStatusText = document.getElementById('orbReportStatusText');
  const orbReportDecision = document.getElementById('orbReportDecision');
  const orbReportVerdictRow = document.getElementById('orbReportVerdictRow');
  const orbVerdict = document.getElementById('orbVerdict');
  const orbConfidenceNum = document.getElementById('orbConfidenceNum');
  const orbConfidenceBar = document.getElementById('orbConfidenceBar');
  const orbConfidenceRing = document.getElementById('orbConfidenceRing');
  const orbCorePercent = document.getElementById('orbCorePercent');
  const pipelineSteps = document.querySelectorAll('.orb-pipeline-step');
  const heroLiveDot = document.getElementById('heroLiveDot');
  const heroLiveLabel = document.getElementById('heroLiveLabel');
  const heroQuestionMeta = document.getElementById('heroQuestionMeta');
  const heroMetaVerdict = document.getElementById('heroMetaVerdict');
  const heroMetaConfidence = document.getElementById('heroMetaConfidence');
  const heroQuestionDots = document.getElementById('heroQuestionDots');
  const CONFIDENCE_CIRC = 2 * Math.PI * 72;
  const PHASE_GATHER = 1000;
  const PHASE_ANALYZE = 1500;
  const PHASE_HOLD = 2400;
  let questionIndex = 0;
  let phaseTimers = [];
  let countAnimFrame = null;

  function clearPhaseTimers() {
    phaseTimers.forEach(clearTimeout);
    phaseTimers = [];
    if (countAnimFrame) cancelAnimationFrame(countAnimFrame);
  }

  function schedule(fn, delay) {
    phaseTimers.push(setTimeout(fn, delay));
  }

  function setPipelineStep(step) {
    pipelineSteps.forEach((el, i) => {
      el.classList.toggle('active', i + 1 === step);
      el.classList.toggle('done', i + 1 < step);
    });
  }

  function setConfidenceRing(pct) {
    if (!orbConfidenceRing) return;
    const filled = (CONFIDENCE_CIRC * pct) / 100;
    orbConfidenceRing.style.strokeDasharray = `${filled} ${CONFIDENCE_CIRC}`;
  }

  function animateCount(el, target, duration = 900) {
    if (!el) return;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = `${Math.round(target * eased)}%`;
      if (p < 1) countAnimFrame = requestAnimationFrame(tick);
    };
    countAnimFrame = requestAnimationFrame(tick);
  }

  function resetOrbMotion() {
    if (!aiOrb) return;
    aiOrb.classList.remove('is-gathering', 'is-analyzing', 'is-ready');
    if (aiOrbWrap) aiOrbWrap.classList.remove('is-ready', 'risk-approved', 'risk-review');
    void aiOrb.offsetWidth;
  }

  function updateHeroDots(index) {
    if (!heroQuestionDots) return;
    heroQuestionDots.querySelectorAll('span').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function runOrbCycle(decisionEl) {
    if (!decisionEl || !aiOrb) return;

    clearPhaseTimers();
    resetOrbMotion();

    const label = decisionEl.textContent.trim();
    const confidence = parseInt(decisionEl.dataset.confidence || '90', 10);
    const verdict = decisionEl.dataset.verdict || 'Approved';
    const risk = decisionEl.dataset.risk === 'medium' ? 'review' : 'approved';
    const verdictClass = risk === 'approved' ? 'verdict-approved' : 'verdict-review';

    if (orbReportDecision) {
      orbReportDecision.textContent = label;
      orbReportDecision.classList.add('is-updating');
    }
    if (orbReportVerdictRow) orbReportVerdictRow.hidden = true;
    if (orbCorePercent) orbCorePercent.textContent = '';
    if (orbConfidenceBar) orbConfidenceBar.style.width = '0%';
    if (heroQuestionMeta) heroQuestionMeta.hidden = true;
    if (heroLiveDot) {
      heroLiveDot.classList.remove('is-ready', 'is-review');
    }
    if (heroLiveLabel) heroLiveLabel.textContent = 'Evaluating decision';
    setConfidenceRing(0);
    setPipelineStep(1);
    if (orbReportStatusText) orbReportStatusText.textContent = 'Gathering signals';

    schedule(() => {
      aiOrb.classList.add('is-gathering');
      if (orbReportDecision) orbReportDecision.classList.remove('is-updating');
    }, 50);

    schedule(() => {
      aiOrb.classList.remove('is-gathering');
      aiOrb.classList.add('is-analyzing');
      setPipelineStep(2);
      if (orbReportStatusText) orbReportStatusText.textContent = 'Analyzing decision';
      if (heroLiveLabel) heroLiveLabel.textContent = 'Analyzing…';
    }, PHASE_GATHER);

    schedule(() => {
      aiOrb.classList.remove('is-analyzing');
      aiOrb.classList.add('is-ready');
      if (aiOrbWrap) {
        aiOrbWrap.classList.add('is-ready', risk === 'approved' ? 'risk-approved' : 'risk-review');
      }
      setPipelineStep(3);
      if (orbReportStatusText) orbReportStatusText.textContent = 'Analysis complete';
      if (orbReportVerdictRow) orbReportVerdictRow.hidden = false;
      if (orbVerdict) {
        orbVerdict.textContent = verdict;
        orbVerdict.className = `orb-report-verdict ${verdictClass}`;
      }
      if (orbConfidenceNum) orbConfidenceNum.textContent = `${confidence}%`;
      if (orbConfidenceBar) orbConfidenceBar.style.width = `${confidence}%`;
      setConfidenceRing(confidence);
      animateCount(orbCorePercent, confidence);
      if (heroQuestionMeta) heroQuestionMeta.hidden = false;
      if (heroMetaVerdict) {
        heroMetaVerdict.textContent = verdict;
        heroMetaVerdict.className = `hero-meta-verdict ${verdictClass}`;
      }
      if (heroMetaConfidence) heroMetaConfidence.textContent = `${confidence}% confidence`;
      if (heroLiveLabel) heroLiveLabel.textContent = 'Analysis complete';
      if (heroLiveDot) {
        heroLiveDot.classList.add(risk === 'approved' ? 'is-ready' : 'is-review');
      }
    }, PHASE_GATHER + PHASE_ANALYZE);
  }

  function rotateHeroQuestion() {
    if (!heroQuestions.length) return;
    heroQuestions[questionIndex].classList.remove('active');
    questionIndex = (questionIndex + 1) % heroQuestions.length;
    const active = heroQuestions[questionIndex];
    active.classList.add('active');
    updateHeroDots(questionIndex);
    runOrbCycle(active);
  }

  if (heroQuestions.length) {
    updateHeroDots(0);
    schedule(() => runOrbCycle(heroQuestions[0]), 1000);
    setInterval(rotateHeroQuestion, PHASE_GATHER + PHASE_ANALYZE + PHASE_HOLD);
  }

  if (heroVisual && aiOrbWrap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      aiOrbWrap.style.transform = `translate(${x * 14}px, ${y * 10}px)`;
    });
    heroVisual.addEventListener('mouseleave', () => {
      aiOrbWrap.style.transform = '';
    });
  }

  // Product scenarios
  const scenarios = {
    car: {
      decisionType: 'Vehicle purchase',
      scenario: '₹15L car financing',
      verdict: 'Approved',
      verdictClass: 'verdict-approved',
      confidence: '91%',
      confidenceNum: 91,
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
      confidenceNum: 88,
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
      confidenceNum: 93,
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
  const productConfidenceBar = document.getElementById('productConfidenceBar');
  const productTabs = document.querySelectorAll('.product-tab');

  function animateVerdict() {
    if (!productVerdict) return;
    productVerdict.classList.remove('verdict-pop');
    void productVerdict.offsetWidth;
    productVerdict.classList.add('verdict-pop');
  }

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
      if (productConfidenceBar) {
        productConfidenceBar.style.width = '0';
        requestAnimationFrame(() => {
          productConfidenceBar.style.width = `${s.confidenceNum || 0}%`;
        });
      }
      animateVerdict();

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
    renderScenario('car');
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
      subject: data._subject || 'New Arivo Submission',
      from_name: 'Arivo Website',
      name: data.Name,
      email: data.Email,
      phone: data.Phone || '',
      message: data.Message || '',
      botcheck: '',
    };

    const formSubmitBody = {
      _subject: payload.subject,
      _template: 'table',
      _captcha: 'false',
      Name: data.Name,
      Email: data.Email,
    };
    if (data.Phone) formSubmitBody.Phone = data.Phone;
    if (data.Message) formSubmitBody.Message = data.Message;

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
        body: JSON.stringify(formSubmitBody),
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

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const messageInput = document.getElementById('contactMessage');
      const btn = document.getElementById('contactBtn');
      const successMsg = document.getElementById('contactSuccessMsg');
      const errorMsg = document.getElementById('contactErrorMsg');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      successMsg.classList.remove('visible');
      errorMsg.classList.remove('visible');

      if (!name) { markInvalid(nameInput); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { markInvalid(emailInput); return; }
      if (!message || message.length < 10) { markInvalid(messageInput); return; }

      btn.disabled = true;
      btn.textContent = 'Sending...';

      try {
        await sendToInbox({
          Name: name,
          Email: email,
          Message: message,
          _subject: 'New Arivo Contact Form Message',
        });
        contactForm.reset();
        successMsg.classList.add('visible');
      } catch {
        errorMsg.classList.add('visible');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Send Message';
      }
    });
  }
});
