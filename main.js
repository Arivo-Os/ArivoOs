document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
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

  // Helper validation styling
  function markInvalid(input) {
    input.style.borderColor = '#E5675F';
    input.style.boxShadow = '0 0 0 3px rgba(229,103,95,0.15)';
    setTimeout(() => {
      input.style.borderColor = '';
      input.style.boxShadow = '';
    }, 2000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Form Submission via Web3Forms & FormSubmit API
  async function sendToInbox(data) {
    const accessKey = window.ARIVO_FORM?.web3formsAccessKey?.trim();
    const notificationEmail = window.ARIVO_FORM?.notificationEmail?.trim() || 'akhileshgoswami@arivoai.in';

    if (!accessKey) {
      throw new Error('Form access key not configured');
    }

    const payload = {
      access_key: accessKey,
      subject: data._subject || 'New Arivo Submission',
      from_name: 'Arivo Website',
      name: data.Name,
      email: data.Email,
      phone: data.Phone,
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
        _subject: payload.subject,
        _template: 'table',
        _captcha: 'false',
        Name: data.Name,
        Email: data.Email,
        Phone: data.Phone,
      }),
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error('FormSubmit delivery failed');
      }
      return response.json();
    });

    // Try both methods for durability
    const results = await Promise.allSettled([web3formsRequest, formSubmitRequest]);
    const success = results.find((result) => result.status === 'fulfilled');

    if (!success) {
      throw new Error('Submission failed');
    }

    return success.value;
  }

  const waitlistForm = document.getElementById('waitlistForm');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (e) => {
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

      // Clear alerts
      successMsg.classList.remove('visible');
      errorMsg.classList.remove('visible');

      if (!name) {
        markInvalid(nameInput);
        return;
      }
      if (!phone || phone.length < 10) {
        markInvalid(phoneInput);
        return;
      }
      if (!isValidEmail(email)) {
        markInvalid(emailInput);
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Joining...';

      try {
        await sendToInbox({
          Name: name,
          Phone: phone,
          Email: email,
          _subject: 'New Arivo V2 Signup',
        });

        waitlistForm.reset();
        successMsg.classList.add('visible');
      } catch (err) {
        errorMsg.classList.add('visible');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Join Waitlist';
      }
    });
  }

  const decisionScenarios = [
    {
      label: 'Buying a car',
      question: 'Should I buy a ₹12 lakh car this year?',
      action: 'Wait 8–12 months before purchasing.',
      basis: 'Your stated goals',
      outcome: 'A delay could protect cash reserves and keep your home goal easier to manage.',
      reasons: [
        'Current savings rate is below target',
        'Emergency fund is not fully funded',
        'Car EMI would reduce monthly flexibility',
        'Home purchase goal remains a higher priority',
      ],
    },
    {
      label: 'Paying off debt',
      question: 'Should I use my bonus to close my personal loan?',
      action: 'Pay off 60% now and keep the rest liquid.',
      basis: 'Debt + cash buffer',
      outcome: 'A partial payoff could reduce interest pressure without leaving you short on cash.',
      reasons: [
        'Loan interest is higher than expected short-term returns',
        'Full repayment would leave cash reserves too thin',
        'Partial closure improves monthly flexibility immediately',
        'Remaining balance can be cleared over the next two quarters',
      ],
    },
    {
      label: 'Emergency fund',
      question: 'Can I start investing before my emergency fund is complete?',
      action: 'Build emergency reserves first for 4 more months.',
      basis: 'Reserve gap',
      outcome: 'A stronger reserve could reduce the chance of selling investments during an emergency.',
      reasons: [
        'Current reserve covers less than 3 months of expenses',
        'Income has variable monthly components',
        'Upcoming insurance premium needs cash planning',
        'Investing becomes safer after the reserve target is met',
      ],
    },
    {
      label: 'Renting vs buying',
      question: 'Should I keep renting or buy a house next year?',
      action: 'Rent for another year and increase down payment savings.',
      basis: 'Home goal timing',
      outcome: 'Waiting could improve loan readiness and reduce pressure on your monthly budget.',
      reasons: [
        'Current down payment would create a high EMI burden',
        'Rent remains cheaper than the projected ownership cost',
        'A larger down payment reduces long-term interest',
        'Career location may change within 12 months',
      ],
    },
    {
      label: 'Career switch',
      question: 'Can I take a lower salary for a better career path?',
      action: 'Proceed only after creating a 9-month transition buffer.',
      basis: 'Income change',
      outcome: 'A transition buffer could make the move easier to handle without risking fixed commitments.',
      reasons: [
        'New role has stronger long-term income potential',
        'Short-term salary drop affects savings rate',
        'Existing EMIs need a larger safety buffer',
        'Planned move is viable after reducing discretionary spending',
      ],
    },
  ];

  const scenarioLabel = document.getElementById('scenarioLabel');
  const decisionQuestion = document.getElementById('decisionQuestion');
  const recommendedAction = document.getElementById('recommendedAction');
  const recommendationBasis = document.getElementById('recommendationBasis');
  const expectedOutcome = document.getElementById('expectedOutcome');
  const reasonList = document.getElementById('reasonList');
  const chatThread = document.querySelector('.chat-thread');
  let activeScenarioIndex = 0;

  function renderDecisionScenario(index) {
    const scenario = decisionScenarios[index];
    if (!scenario || !scenarioLabel || !decisionQuestion || !recommendedAction || !recommendationBasis || !expectedOutcome || !reasonList) {
      return;
    }

    scenarioLabel.textContent = scenario.label;
    decisionQuestion.textContent = scenario.question;
    recommendedAction.textContent = scenario.action;
    recommendationBasis.textContent = scenario.basis;
    expectedOutcome.textContent = scenario.outcome;
    reasonList.replaceChildren(...scenario.reasons.map((reason) => {
      const item = document.createElement('li');
      item.textContent = reason;
      return item;
    }));

    if (chatThread) {
      chatThread.style.animation = 'none';
      void chatThread.offsetHeight;
      chatThread.style.animation = 'slideUp 0.35s ease both';
    }
  }

  if (scenarioLabel) {
    setInterval(() => {
      activeScenarioIndex = (activeScenarioIndex + 1) % decisionScenarios.length;
      renderDecisionScenario(activeScenarioIndex);
    }, 6500);
  }

});
