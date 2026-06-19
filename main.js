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
        btn.textContent = 'Get Early Access';
      }
    });
  }

  // ─── Arivo Phone Mockup Interactive Logic ───
  
  // Tab Switching
  window.switchPhoneTab = function(tabName, btnElement) {
    const navbar = document.querySelector('.phone-navbar');
    if (!navbar) return;
    
    // Reset active button state
    navbar.querySelectorAll('.phone-nav-item').forEach(btn => btn.classList.remove('active'));
    if (btnElement) {
      btnElement.classList.add('active');
    } else {
      // Find button based on index/name if switch was programmatically triggered
      const idxMap = { 'dashboard': 0, 'decisions': 1, 'copilot': 2, 'explore': 3 };
      const items = navbar.querySelectorAll('.phone-nav-item');
      if (items[idxMap[tabName]]) items[idxMap[tabName]].classList.add('active');
    }

    const appScreenContent = document.getElementById('appScreenContent');
    const skeletonScreen = document.getElementById('skeletonScreen');
    
    if (appScreenContent && skeletonScreen) {
      // Trigger skeleton loading animation
      appScreenContent.style.display = 'none';
      skeletonScreen.style.display = 'flex';
      
      setTimeout(() => {
        skeletonScreen.style.display = 'none';
        appScreenContent.style.display = 'flex';
        
        // Toggle tabs
        const tabPanels = appScreenContent.querySelectorAll('.phone-tab-panel');
        tabPanels.forEach(panel => {
          panel.classList.remove('active');
          panel.style.display = 'none';
        });
        
        const activePanel = document.getElementById(`tab-${tabName}`);
        if (activePanel) {
          activePanel.classList.add('active');
          activePanel.style.display = 'flex';
          
          // Re-trigger layout animations
          if (tabName === 'dashboard') {
            animateDashboardWidgets();
          }
        }
      }, 300);
    }
  };

  // Dashboard Animations
  function animateDashboardWidgets() {
    // Health Score ring animation
    const ring = document.getElementById('healthGaugeRing');
    if (ring) {
      // Reset first
      ring.style.strokeDashoffset = '151';
      // Animate score of 84 (circumference of radius 24 is ~150.79. Score 84 means fill 84% -> offset = 151 - (151 * 0.84) = 24.16)
      setTimeout(() => {
        ring.style.strokeDashoffset = '24';
      }, 100);
    }

    // Goal Bars
    const bar1 = document.getElementById('goalBar1');
    const bar2 = document.getElementById('goalBar2');
    if (bar1) {
      bar1.style.width = '0%';
      setTimeout(() => { bar1.style.width = '100%'; }, 100);
    }
    if (bar2) {
      bar2.style.width = '0%';
      setTimeout(() => { bar2.style.width = '54%'; }, 100);
    }
  }

  // Auto initialize gauge offset on startup
  setTimeout(animateDashboardWidgets, 500);

  // Triggered by Priority Action List
  window.mockNavigateToDecide = function(btn) {
    // Navigate to Decisions Tab
    window.switchPhoneTab('decisions');
  };

  window.mockReviewAction = function(btn) {
    btn.textContent = 'Reviewed';
    btn.classList.add('success-state');
    btn.disabled = true;
  };

  // Decisions Tab Execute Button Action
  window.mockExecuteRecommendation = function(btn) {
    btn.disabled = true;
    const originalContent = btn.innerHTML;
    btn.innerHTML = `
      <svg class="skeleton-pulse" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="animation: spin 1s infinite linear; border-radius: 50%;">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      <span>Processing Sweep...</span>
    `;
    
    // Add rotate styles dynamically
    if (!document.getElementById('mockSpinStyle')) {
      const style = document.createElement('style');
      style.id = 'mockSpinStyle';
      style.innerHTML = `@keyframes spin { to { transform: rotate(360deg); } }`;
      document.head.appendChild(style);
    }

    setTimeout(() => {
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span>Allocation Executed</span>
      `;
      btn.classList.add('success-state');
      
      // Toast notification simulation
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: absolute;
        top: 40px;
        left: 20px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 10px 14px;
        border-radius: 8px;
        font-size: 11px;
        font-weight: 600;
        z-index: 100;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.3s forwards ease;
        display: flex;
        align-items: center;
        gap: 8px;
      `;
      toast.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        <span>₹75,000 auto-allocated successfully</span>
      `;
      
      const phoneScreen = document.querySelector('.phone-screen');
      if (phoneScreen) {
        phoneScreen.appendChild(toast);
        setTimeout(() => {
          toast.style.animation = 'none';
          toast.style.opacity = '1';
          toast.style.transition = 'opacity 0.3s ease';
          toast.style.opacity = '0';
          setTimeout(() => toast.remove(), 300);
        }, 2200);
      }
    }, 1200);
  };

  // Copilot Scenarios Simulation
  window.mockCopilotPrompt = function(promptText, btn) {
    const answerCard = document.getElementById('copilotAnswerCard');
    const answerText = document.getElementById('copilotAnswerText');
    const confidenceText = document.getElementById('copilotConfidence');
    
    if (!answerCard || !answerText) return;
    
    answerCard.style.display = 'none';
    answerCard.classList.remove('active');
    
    // Simulate Loading State inside copilot chat pane
    const loadingCard = document.createElement('div');
    loadingCard.className = 'app-card skeleton-pulse';
    loadingCard.style.cssText = `
      height: 60px;
      margin-top: 8px;
      background: rgba(255, 255, 255, 0.02);
      border-color: rgba(255, 255, 255, 0.05);
    `;
    loadingCard.innerHTML = `
      <div class="skeleton-line short"></div>
      <div class="skeleton-line"></div>
    `;
    
    const copilotTab = document.getElementById('tab-copilot');
    if (copilotTab) {
      copilotTab.appendChild(loadingCard);
      
      // Auto scroll tab container
      const container = copilotTab.closest('.phone-screen-content');
      if (container) {
        setTimeout(() => {
          container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        }, 50);
      }
      
      setTimeout(() => {
        loadingCard.remove();
        
        let response = '';
        let conf = '';
        if (promptText.includes('vacation')) {
          response = "<strong>Affordability Check:</strong> Vacation allocation of ₹50,000 is 100% supported under current model parameters. Safe cash buffer remains intact. Under goal schedule, this delay shifts your 2027 home down payment target by exactly 4 calendar days.";
          conf = '98% Confidence';
        } else if (promptText.includes('savings rate')) {
          response = "<strong>Goal Sweep Model:</strong> Increasing savings to 40% adds +₹18,400 monthly capital. Accelerates home purchase goal completion from Dec 2027 to March 2027, saving an estimated ₹24,000 in compounding rental expense.";
          conf = '95% Confidence';
        }
        
        confidenceText.textContent = conf;
        answerText.innerHTML = response;
        answerCard.style.display = 'flex';
        answerCard.classList.add('active');
        
        if (container) {
          container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        }
      }, 700);
    }
  };

  // Onboarding On Explore Screen
  window.mockConnectAccount = function(step) {
    const btn = document.getElementById(`checkBtn${step}`);
    if (!btn) return;
    
    btn.disabled = true;
    
    if (step === 1) {
      btn.textContent = 'Connecting...';
      
      setTimeout(() => {
        btn.textContent = 'Linked';
        btn.classList.add('disabled');
        
        document.getElementById('checkCircle1').classList.add('checked');
        document.getElementById('checkLabel1').classList.add('completed');
        
        // Enable step 2 button
        const btn2 = document.getElementById('checkBtn2');
        if (btn2) {
          btn2.classList.remove('disabled');
        }
      }, 1000);
    } else if (step === 2) {
      btn.textContent = 'Saving...';
      
      setTimeout(() => {
        btn.textContent = 'Defined';
        btn.classList.add('disabled');
        
        document.getElementById('checkCircle2').classList.add('checked');
        document.getElementById('checkLabel2').classList.add('completed');
        
        // Empty state solved toast
        const toast = document.createElement('div');
        toast.style.cssText = `
          position: absolute;
          top: 40px;
          left: 20px;
          right: 20px;
          background: #0D9488;
          color: white;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 600;
          z-index: 100;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s forwards ease;
          display: flex;
          align-items: center;
          gap: 8px;
        `;
        toast.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Financial vaults integrated.</span>
        `;
        
        const phoneScreen = document.querySelector('.phone-screen');
        if (phoneScreen) {
          phoneScreen.appendChild(toast);
          setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => toast.remove(), 300);
          }, 2000);
        }
      }, 1000);
    }
  };

});
