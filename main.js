document.addEventListener('DOMContentLoaded', () => {
  const mockupTemplates = {
    chat: document.getElementById('tpl-app-chat'),
    verdict: document.getElementById('tpl-app-verdict'),
  };

  const chatVariants = [
    {
      user: 'Can I buy a car?',
      ai: 'I can help evaluate that purchase. A few purchase details are required before I can evaluate affordability.',
      opening: 'How much do you currently have in savings or liquid cash?',
      inputTitle: 'Tell me about the car',
      inputSub: 'Share the price and financing details to run affordability analysis.',
      fieldLabel: 'Car price',
      inputValue: '15,00,000',
      toastText: 'Can I buy a car?',
    },
    {
      user: 'Can I afford a Bali trip?',
      ai: 'Let me check that against your savings goals and emergency fund.',
      opening: null,
      inputTitle: 'Tell me about the trip',
      inputSub: 'Share the total trip cost and timing to run affordability analysis.',
      fieldLabel: 'Trip budget',
      inputValue: '2,50,000',
      toastText: 'Can I afford a Bali trip?',
    },
  ];

  const verdictVariants = [
    {
      title: 'Wait Before Purchasing a Vehicle',
      risk: 'Medium Risk · 74% confidence',
      copy: 'Wait before proceeding with this vehicle purchase; the data shows trade-offs that should be improved first.',
      insight: 'Emergency fund covers 0.8 months',
      banner: 'Estimated EMI is approximately ₹28,500 / month',
    },
    {
      title: 'Review Before Booking Bali',
      risk: 'Worth reviewing · 68% confidence',
      copy: 'This trip fits your goals, but it would reduce your emergency buffer more than recommended right now.',
      insight: 'Emergency fund covers 0.8 months',
      banner: 'Trip would use ~3 months of savings',
    },
  ];

  const narrativeSteps = [
    { screen: 'chat', chatIndex: 0, verdictIndex: 0, hold: 2600 },
    { screen: 'chat', chatIndex: 0, verdictIndex: 0, hold: 2000, typing: true, toast: { title: 'Arivo', text: 'Pulling your financial profile…' } },
    { screen: 'chat', chatIndex: 0, verdictIndex: 0, hold: 1800, toast: { title: 'Arivo', text: 'Analyzing vehicle affordability…' } },
    {
      screen: 'verdict',
      chatIndex: 0,
      verdictIndex: 0,
      hold: 4200,
      toast: { title: 'Decision ready', text: 'Vehicle purchase · Medium risk' },
      revealAfterToast: 850,
    },
    { screen: 'verdict', chatIndex: 0, verdictIndex: 0, hold: 2200 },
    {
      screen: 'chat',
      chatIndex: 1,
      verdictIndex: 1,
      hold: 3200,
      toast: { title: 'New message', text: 'Can I afford a Bali trip?' },
      revealAfterToast: 900,
    },
    { screen: 'chat', chatIndex: 1, verdictIndex: 1, hold: 2000, typing: true, toast: { title: 'Arivo', text: 'Evaluating trip budget…' } },
    { screen: 'chat', chatIndex: 1, verdictIndex: 1, hold: 1600, toast: { title: 'Arivo', text: 'Analyzing travel budget…' } },
    {
      screen: 'verdict',
      chatIndex: 1,
      verdictIndex: 1,
      hold: 4500,
      toast: { title: 'Decision ready', text: 'Travel expense · Worth reviewing' },
      revealAfterToast: 850,
    },
  ];

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function initAppCarousel(root) {
    const slides = [...root.querySelectorAll('.app-carousel-slide')];
    const hitArea = root.querySelector('.app-carousel-hit');
    const ghost = root.querySelector('.app-carousel-ghost');
    const backPhone = root.querySelector('.app-phone-back');
    const isDual = root.hasAttribute('data-dual-phones');
    const toast = root.querySelector('.app-carousel-toast');
    const toastTitle = root.querySelector('.app-carousel-toast-title');
    const toastText = root.querySelector('.app-carousel-toast-text');
    if (!slides.length) return;

    const slideByScreen = {};
    let backReady = false;

    slides.forEach((slide) => {
      const key = slide.dataset.screen;
      const tpl = mockupTemplates[key];
      if (tpl) slide.appendChild(tpl.content.cloneNode(true));
      slideByScreen[key] = slide;
    });

    if (isDual && backPhone) {
      const backMount = backPhone.querySelector('.app-back-screen');
      const verdictTpl = mockupTemplates.verdict;
      if (backMount && verdictTpl) {
        backMount.appendChild(verdictTpl.content.cloneNode(true));
        backReady = true;
      }
    }

    let index = slides.findIndex((s) => s.classList.contains('is-active'));
    if (index < 0) index = 0;
    let busy = false;
    let narrativeTimer = null;
    let stepIndex = 0;

    function getSlideIndex(screen) {
      return slides.findIndex((s) => s.dataset.screen === screen);
    }

    function applyChatVariantTo(rootEl, variantIndex) {
      const variant = chatVariants[variantIndex];
      if (!variant || !rootEl) return;
      const openingEl = rootEl.querySelector('.app-msg-opening');
      const userEl = rootEl.querySelector('.app-bubble-user-dynamic');
      const aiEl = rootEl.querySelector('.app-msg-ai-dynamic');
      const titleEl = rootEl.querySelector('.app-input-title-dynamic');
      const subEl = rootEl.querySelector('.app-input-sub-dynamic');
      const labelEl = rootEl.querySelector('.app-field-label-dynamic');
      const valueEl = rootEl.querySelector('.app-field-active span');

      if (openingEl) {
        if (variant.opening) {
          openingEl.textContent = variant.opening;
          openingEl.classList.remove('is-hidden');
        } else {
          openingEl.classList.add('is-hidden');
        }
      }
      if (userEl) userEl.textContent = variant.user;
      if (aiEl) aiEl.textContent = variant.ai;
      if (titleEl) titleEl.textContent = variant.inputTitle;
      if (subEl) subEl.textContent = variant.inputSub;
      if (labelEl) labelEl.textContent = variant.fieldLabel;
      if (valueEl) valueEl.textContent = variant.inputValue;
    }

    function applyVerdictVariantTo(rootEl, variantIndex) {
      const variant = verdictVariants[variantIndex];
      if (!variant || !rootEl) return;
      const titleEl = rootEl.querySelector('.app-verdict-title-dynamic');
      const riskEl = rootEl.querySelector('.app-verdict-risk-dynamic');
      const copyEl = rootEl.querySelector('.app-verdict-copy-dynamic');
      const insightEl = rootEl.querySelector('.app-insight-dynamic');
      const bannerEl = rootEl.querySelector('.app-banner-dynamic');
      if (titleEl) titleEl.textContent = variant.title;
      if (riskEl) riskEl.textContent = variant.risk;
      if (copyEl) copyEl.textContent = variant.copy;
      if (insightEl) insightEl.textContent = variant.insight;
      if (bannerEl) bannerEl.textContent = variant.banner;
    }

    function setChatVariant(variantIndex, animate = false) {
      const chatSlide = slideByScreen.chat;
      if (!chatSlide) return;

      const userEl = chatSlide.querySelector('.app-bubble-user-dynamic');
      const aiEl = chatSlide.querySelector('.app-msg-ai-dynamic');

      const apply = () => {
        applyChatVariantTo(chatSlide, variantIndex);
        userEl?.classList.remove('is-updating');
        aiEl?.classList.remove('is-updating');
        if (isDual) updateBackPhone();
      };

      if (animate && userEl && aiEl) {
        userEl.classList.add('is-updating');
        aiEl.classList.add('is-updating');
        setTimeout(apply, 180);
      } else {
        apply();
      }
    }

    function setVerdictVariant(variantIndex) {
      const verdictSlide = slideByScreen.verdict;
      if (!verdictSlide) return;
      applyVerdictVariantTo(verdictSlide, variantIndex);
      if (isDual) updateBackPhone();
    }

    function setTyping(active) {
      const typing = slideByScreen.chat?.querySelector('.app-typing');
      const inputCard = slideByScreen.chat?.querySelector('.app-input-card-dynamic');
      if (typing) typing.classList.toggle('is-visible', active);
      if (inputCard) inputCard.classList.toggle('is-hidden', active);
    }

    function showToast(data) {
      if (!toast || !data) {
        hideToast();
        return;
      }
      if (toastTitle) toastTitle.textContent = data.title;
      if (toastText) toastText.textContent = data.text;
      toast.classList.add('is-visible');
    }

    function hideToast() {
      toast?.classList.remove('is-visible');
    }

    function updateBackPhone() {
      if (!isDual || !backPhone) return;

      const step = narrativeSteps[stepIndex];
      const activeScreen = slides[index]?.dataset.screen || 'chat';
      const verdictIdx = step?.verdictIndex ?? 0;
      const backMount = backPhone.querySelector('.app-back-screen');

      if (activeScreen !== 'chat' || !backMount) {
        backPhone.classList.add('is-hidden');
        return;
      }

      backPhone.classList.remove('is-hidden');
      applyVerdictVariantTo(backMount, verdictIdx);
    }

    function updateGhost() {
      if (isDual) {
        updateBackPhone();
        return;
      }
      if (!ghost) return;
      const nextScreen = narrativeSteps[(stepIndex + 1) % narrativeSteps.length]?.screen || 'verdict';
      const nextSlide = slideByScreen[nextScreen];
      if (!nextSlide) return;
      ghost.innerHTML = '';
      const clone = nextSlide.cloneNode(true);
      clone.classList.remove('is-active', 'is-leaving', 'is-entering', 'is-entering-active', 'is-leaving-back', 'is-entering-back');
      clone.classList.add('app-phone', 'app-carousel-ghost-inner');
      ghost.appendChild(clone);
    }

    function goToScreen(screen, direction = 1, options = {}) {
      const nextIndex = getSlideIndex(screen);
      if (busy || nextIndex < 0 || nextIndex === index) return Promise.resolve();

      return new Promise((resolve) => {
        busy = true;
        if (!options.keepToast) hideToast();
        setTyping(false);

        const current = slides[index];
        const next = slides[nextIndex];
        const step = narrativeSteps[stepIndex];
        const viewport = root.querySelector('.app-carousel-viewport');

        if (screen === 'chat' && step?.chatIndex !== undefined) {
          applyChatVariantTo(next, step.chatIndex);
        }
        if (screen === 'verdict' && step?.verdictIndex !== undefined) {
          applyVerdictVariantTo(next, step.verdictIndex);
        }

        const finish = () => {
          current.classList.remove('is-active', 'is-leaving', 'is-leaving-back', 'is-entering', 'is-entering-back', 'is-entering-active');
          next.classList.add('is-active');
          next.classList.remove('is-leaving', 'is-leaving-back', 'is-entering', 'is-entering-back', 'is-entering-active');
          index = nextIndex;
          viewport?.classList.remove('is-switching');
          if (isDual) updateBackPhone();
          else updateGhost();
          busy = false;
          resolve();
        };

        if (isDual) {
          viewport?.classList.add('is-switching');
          setTimeout(() => {
            current.classList.remove('is-active');
            next.classList.add('is-active');
            index = nextIndex;
            viewport?.classList.remove('is-switching');
            updateBackPhone();
            busy = false;
            resolve();
          }, 300);
          return;
        }

        const forward = direction >= 0;
        current.classList.add('is-leaving');
        current.classList.toggle('is-leaving-back', !forward);

        requestAnimationFrame(() => {
          next.classList.add('is-entering');
          next.classList.toggle('is-entering-back', !forward);
          requestAnimationFrame(() => next.classList.add('is-entering-active'));
        });

        setTimeout(finish, 420);
      });
    }

    async function runNarrativeStep() {
      const step = narrativeSteps[stepIndex];
      if (!step) {
        stepIndex = 0;
        return runNarrativeStep();
      }

      const currentScreen = slides[index]?.dataset.screen;
      const needsSwitch = currentScreen !== step.screen;
      const sameScreen = !needsSwitch;

      if (step.chatIndex !== undefined) {
        setChatVariant(step.chatIndex, sameScreen && step.chatIndex > 0);
      }
      if (step.verdictIndex !== undefined) {
        setVerdictVariant(step.verdictIndex);
      }

      if (step.toast && needsSwitch && step.revealAfterToast) {
        setTyping(false);
        updateBackPhone();
        showToast(step.toast);
        await sleep(step.revealAfterToast);
        const dir = getSlideIndex(step.screen) > index ? 1 : -1;
        await goToScreen(step.screen, dir, { keepToast: true });
      } else {
        if (needsSwitch) {
          const dir = getSlideIndex(step.screen) > index ? 1 : -1;
          await goToScreen(step.screen, dir);
        }

        if (step.typing) {
          setTyping(true);
        } else {
          setTyping(false);
        }

        if (step.toast) {
          setTimeout(() => showToast(step.toast), step.typing ? 400 : 200);
        } else {
          hideToast();
        }
      }

      updateBackPhone();

      narrativeTimer = setTimeout(() => {
        stepIndex = (stepIndex + 1) % narrativeSteps.length;
        runNarrativeStep();
      }, step.hold);
    }

    function startNarrative() {
      if (narrativeTimer) clearTimeout(narrativeTimer);
      stepIndex = 0;
      index = getSlideIndex('chat');
      root.querySelector('.app-carousel-viewport')?.classList.remove('is-switching');
      slides.forEach((s, i) => {
        s.classList.remove('is-leaving', 'is-leaving-back', 'is-entering', 'is-entering-back', 'is-entering-active');
        s.classList.toggle('is-active', i === index);
      });
      setTyping(false);
      hideToast();
      setChatVariant(0);
      setVerdictVariant(0);
      updateBackPhone();
      runNarrativeStep();
    }

    hitArea?.addEventListener('click', () => {
      if (narrativeTimer) clearTimeout(narrativeTimer);
      if (busy) return;
      stepIndex = (stepIndex + 1) % narrativeSteps.length;
      runNarrativeStep();
    });

    if (isDual) {
      applyChatVariantTo(slideByScreen.chat, 0);
      applyVerdictVariantTo(slideByScreen.verdict, 0);
      if (backReady) applyVerdictVariantTo(backPhone.querySelector('.app-back-screen'), 0);
      updateBackPhone();
    } else {
      updateGhost();
    }
    startNarrative();
  }

  document.querySelectorAll('[data-app-carousel]').forEach(initAppCarousel);

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

  // Hero app showcase — subtle float on desktop
  const heroAppShowcase = document.querySelector('.hero-app-showcase');
  const heroVisual = document.querySelector('.hero-visual');

  if (heroVisual && heroAppShowcase && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroAppShowcase.style.transform = `translate(${x * 10}px, ${y * 8}px)`;
    });
    heroVisual.addEventListener('mouseleave', () => {
      heroAppShowcase.style.transform = '';
    });
  }

  // Product scenarios
  const scenarios = {
    car: {
      decisionType: 'Vehicle purchase',
      scenario: '₹15L car financing',
      question: 'Should I finance this ₹15L vehicle?',
      verdict: 'Approved',
      verdictClass: 'verdict-approved',
      confidence: '91%',
      confidenceNum: 91,
      risk: 'Low',
      reasoning: [
        'EMI fits within 15% of monthly income.',
        'Emergency fund remains above 6 months.',
        'Down payment preserves savings goals.',
      ],
      actions: ['EMI breakdown', 'Purchase timeline', 'Loan comparison'],
    },
    trip: {
      decisionType: 'Travel expense',
      scenario: 'Bali trip · ₹2.5L budget',
      question: 'Should I take this ₹2.5L trip now?',
      verdict: 'Worth Reviewing',
      verdictClass: 'verdict-review',
      confidence: '88%',
      confidenceNum: 88,
      risk: 'Medium',
      reasoning: [
        'Trip budget reduces emergency fund below target.',
        'Savings goal timeline extends by 3 months.',
        'Cash flow remains positive but tighter.',
      ],
      actions: ['Wait 2 months', 'Reduce trip budget', 'Build emergency fund'],
    },
    invest: {
      decisionType: 'Investment allocation',
      scenario: '₹50,000 lump-sum deploy',
      question: 'Should I invest ₹50,000 now?',
      verdict: 'Approved',
      verdictClass: 'verdict-approved',
      confidence: '93%',
      confidenceNum: 93,
      risk: 'Low',
      reasoning: [
        'Strong cash position after investment.',
        'Emergency fund healthy at 8 months.',
        'Allocation aligns with long-term goals.',
      ],
      actions: ['Portfolio allocation', 'Goal impact view', 'Tax-efficient options'],
    },
  };

  const productStage = document.getElementById('productStage');
  const productDecisionType = document.getElementById('productDecisionType');
  const productScenario = document.getElementById('productScenario');
  const productQuestion = document.getElementById('productQuestion');
  const productVerdict = document.getElementById('productVerdict');
  const productConfidence = document.getElementById('productConfidence');
  const productRisk = document.getElementById('productRisk');
  const productReasoningList = document.getElementById('productReasoningList');
  const productActionPills = document.getElementById('productActionPills');
  const productConfidenceBar = document.getElementById('productConfidenceBar');
  const productTabs = document.querySelectorAll('.product-tab');
  const tabKeys = ['car', 'trip', 'invest'];
  let activeScenario = 'car';
  let autoRotateInterval = null;
  let autoRotatePauseTimer = null;
  const SWITCH_MS = 320;

  function animateVerdict() {
    if (!productVerdict) return;
    productVerdict.classList.remove('verdict-pop');
    void productVerdict.offsetWidth;
    productVerdict.classList.add('verdict-pop');
  }

  function animateCardSections() {
    if (!productStage) return;
    productStage.classList.remove('card-sections-in');
    void productStage.offsetWidth;
    productStage.classList.add('card-sections-in');
  }

  function setActiveTab(key) {
    productTabs.forEach((t) => {
      const active = t.dataset.scenario === key;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', String(active));
    });
  }

  function renderScenario(key, direction = 1, instant = false) {
    const s = scenarios[key];
    if (!s || !productStage || (key === activeScenario && !instant)) return;

    const applyContent = () => {
      if (productDecisionType) productDecisionType.textContent = s.decisionType;
      if (productScenario) productScenario.textContent = s.scenario;
      if (productQuestion) productQuestion.textContent = s.question;
      if (productVerdict) {
        productVerdict.textContent = s.verdict;
        productVerdict.className = `product-verdict ${s.verdictClass}`;
      }
      if (productConfidence) productConfidence.textContent = s.confidence;
      if (productRisk) productRisk.textContent = s.risk;
      if (productConfidenceBar) {
        productConfidenceBar.style.width = '0';
        requestAnimationFrame(() => {
          productConfidenceBar.style.width = `${s.confidenceNum || 0}%`;
        });
      }

      if (productReasoningList) {
        productReasoningList.innerHTML = (s.reasoning || [])
          .map((r) => `<li>${r}</li>`)
          .join('');
      }

      if (productActionPills) {
        const pills = typeof generateSuggestionPills === 'function'
          ? generateSuggestionPills({ verdict: s.verdict, reasons: s.reasoning, actions: s.actions })
          : (s.actions || []);
        productActionPills.innerHTML = pills
          .map((pill) => `<span class="product-action-pill">${pill}</span>`)
          .join('');
      }

      activeScenario = key;
      animateVerdict();
      animateCardSections();
    };

    if (instant) {
      productStage.classList.remove('is-exiting', 'is-entering', 'fading');
      applyContent();
      return;
    }

    productStage.dataset.direction = direction >= 0 ? 'forward' : 'back';
    productStage.classList.remove('card-sections-in', 'is-entering');
    productStage.classList.add('is-exiting');

    setTimeout(() => {
      applyContent();
      productStage.classList.remove('is-exiting', 'fading');
      productStage.classList.add('is-entering');

      setTimeout(() => {
        productStage.classList.remove('is-entering');
      }, 480);
    }, SWITCH_MS);
  }

  function getTabIndex(key) {
    return tabKeys.indexOf(key);
  }

  function pauseAutoRotate(ms = 12000) {
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    autoRotateInterval = null;
    if (autoRotatePauseTimer) clearTimeout(autoRotatePauseTimer);
    autoRotatePauseTimer = setTimeout(startAutoRotate, ms);
  }

  function startAutoRotate() {
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    if (autoRotatePauseTimer) clearTimeout(autoRotatePauseTimer);
    autoRotatePauseTimer = null;
    autoRotateInterval = setInterval(() => {
      const currentIndex = getTabIndex(activeScenario);
      const nextIndex = (currentIndex + 1) % tabKeys.length;
      const nextKey = tabKeys[nextIndex];
      setActiveTab(nextKey);
      renderScenario(nextKey, 1);
    }, 7000);
  }

  productTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.scenario;
      const nextIndex = getTabIndex(key);
      const prevIndex = getTabIndex(activeScenario);
      const direction = nextIndex >= prevIndex ? 1 : -1;

      setActiveTab(key);
      renderScenario(key, direction);
      pauseAutoRotate();
    });
  });

  if (productTabs.length) {
    renderScenario('car', 1, true);
    startAutoRotate();
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
      btn.textContent = 'Requesting...';

      try {
        await sendToInbox({ Name: name, Phone: phone, Email: email, _subject: 'New Arivo Waitlist Signup' });
        form.reset();
        successMsg.classList.add('visible');
      } catch {
        errorMsg.classList.add('visible');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Request Access';
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
