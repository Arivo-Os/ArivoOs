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
});
