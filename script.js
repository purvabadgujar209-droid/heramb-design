// ============ HERAMB DESIGNING & PRINTING — shared script ============

// Floating WhatsApp button — appears on every page, always ready for a chat
document.addEventListener('DOMContentLoaded', function () {
  var waBtn = document.createElement('a');
  waBtn.href = 'https://wa.me/919579480187?text=' + encodeURIComponent("Hi, I'd like to enquire about your services.");
  waBtn.target = '_blank';
  waBtn.rel = 'noopener';
  waBtn.setAttribute('aria-label', 'Chat with us on WhatsApp');
  waBtn.className = 'floating-whatsapp-btn';
  waBtn.innerHTML = '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/></svg>';
  document.body.appendChild(waBtn);
});

// Logo shine: on click/tap, play the full sweep once even after the
// finger/mouse lifts (mobile has no :hover, and a quick tap is shorter
// than the animation, so CSS :active alone can miss it on phones).
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.logo-frame, .brand').forEach(function (el) {
    el.addEventListener('click', function () {
      el.classList.remove('shine-play');
      void el.offsetWidth; // restart animation if clicked again quickly
      el.classList.add('shine-play');
    });
    el.addEventListener('animationend', function () {
      el.classList.remove('shine-play');
    });
  });
});

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    // close menu when a link is tapped
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // ---------- Wrap review stars so each star can pop individually ----------
  document.querySelectorAll('.review-stars').forEach(function (el) {
    var txt = el.textContent.trim();
    el.innerHTML = txt.split('').map(function (ch) { return '<span>' + ch + '</span>'; }).join('');
  });

  // ---------- Animated counting numbers (e.g. 1000+, 27+) ----------
  var counters = document.querySelectorAll('.stat-num');
  function animateCounter(el) {
    var raw = el.textContent.trim();
    var match = raw.match(/^([\d.]+)(.*)$/);
    if (!match) return;
    var end = parseFloat(match[1]);
    var suffix = match[2] || '';
    if (isNaN(end)) return;
    var duration = 1200;
    var start = performance.now();
    el.classList.add('counting');
    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(end * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = raw;
    }
    requestAnimationFrame(tick);
  }
  if (counters.length && 'IntersectionObserver' in window) {
    var counterIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { counterIo.observe(c); });
  }

  // ---------- Animated rating bars on Reviews page ----------
  var bars = document.querySelectorAll('.bar-fill');
  if (bars.length && 'IntersectionObserver' in window) {
    var barIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target;
          var w = target.style.width;
          target.style.width = '0%';
          requestAnimationFrame(function () {
            setTimeout(function () { target.style.width = w; }, 60);
          });
          barIo.unobserve(target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(function (b) { barIo.observe(b); });
  }

  // ---------- Cursor-follow spotlight on panels/cards ----------
  document.querySelectorAll('.panel, .pay-card').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      el.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    });
  });

  // ---------- Confetti micro-burst (used on form submit) ----------
  function fireConfetti(originEl) {
    var colors = ['#e05e0e', '#ecb400', '#0e9c8f', '#ef5f6d', '#8b5cf6'];
    var rect = originEl ? originEl.getBoundingClientRect() : { left: window.innerWidth/2, top: window.innerHeight/2, width:0, height:0 };
    var originX = rect.left + rect.width/2;
    var originY = rect.top + rect.height/2;
    for (var i = 0; i < 26; i++) {
      var piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.background = colors[i % colors.length];
      piece.style.left = originX + 'px';
      piece.style.top = originY + 'px';
      document.body.appendChild(piece);
      var angle = Math.random() * Math.PI * 2;
      var distance = 80 + Math.random() * 120;
      var dx = Math.cos(angle) * distance;
      var dy = Math.sin(angle) * distance - 60;
      var rotate = Math.random() * 720 - 360;
      piece.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) rotate(' + rotate + 'deg)', opacity: 0 }
      ], { duration: 900 + Math.random()*400, easing: 'cubic-bezier(.22,.61,.36,1)' });
      (function (p) { setTimeout(function () { p.remove(); }, 1400); })(piece);
    }
  }
  window.fireConfetti = fireConfetti;

  // ---------- Scroll-to-top button ----------
  var scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-top-btn';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(scrollBtn);
  scrollBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) scrollBtn.classList.add('show');
    else scrollBtn.classList.remove('show');
  }, { passive: true });

  // ---------- Header shadow on scroll ----------
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Scroll-reveal animation for cards & key blocks ----------
  var revealSelectors = [
    '.service-card', '.project-card', '.review-card', '.value-card',
    '.pay-card', '.timeline-item', '.stats-strip', '.two-col > div',
    '.rating-summary'
  ];
  var revealEls = document.querySelectorAll(revealSelectors.join(','));
  revealEls.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = (Math.min(i % 6, 5) * 70) + 'ms';
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Highlight the current page in the nav automatically
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ---------- Recent Projects: category filter ----------
  var filterButtons = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');
  if (filterButtons.length && projectCards.length) {
    var applyFilter = function (cat) {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      var matchedBtn = null;
      filterButtons.forEach(function (b) {
        if (b.getAttribute('data-filter') === cat) matchedBtn = b;
      });
      (matchedBtn || filterButtons[0]).classList.add('active');
      projectCards.forEach(function (card) {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    };

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('pointed-hint'); });
        var hint = document.getElementById('tapHint');
        if (hint) hint.style.display = 'none';
        applyFilter(btn.getAttribute('data-filter'));
      });
    });

    // If we arrived here via a link like projects.html?filter=print, don't show
    // any projects yet — just point at the matching category button and ask
    // the person to tap it themselves to reveal those projects.
    var urlFilter = new URLSearchParams(window.location.search).get('filter');
    if (urlFilter) {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      projectCards.forEach(function (card) { card.style.display = 'none'; });

      var pointedBtn = null;
      filterButtons.forEach(function (b) {
        if (b.getAttribute('data-filter') === urlFilter) pointedBtn = b;
      });
      if (pointedBtn) {
        pointedBtn.classList.add('pointed-hint');
      }

      var hintNote = document.getElementById('tapHint');
      if (hintNote) hintNote.style.display = 'block';

      var bar = document.querySelector('.filter-bar');
      if (bar) {
        setTimeout(function () { bar.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
      }
    }
  }

  // ---------- Payment page: copy-to-clipboard for UPI ID ----------
  var copyBtn = document.getElementById('copyUpiBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var upiId = document.getElementById('upiIdText').textContent.trim();
      navigator.clipboard.writeText(upiId).then(function () {
        var original = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        if (window.fireConfetti) window.fireConfetti(copyBtn);
        setTimeout(function () {
          copyBtn.textContent = original;
          copyBtn.classList.remove('copied');
        }, 1800);
      });
    });
  }

  // ---------- UPI QR code + Pay Now link (payment.html) ----------
  var UPI_ID = '9421990387@ybl';
  var UPI_PAYEE_NAME = 'Heramb Designing and Printing';
  var qrImg = document.getElementById('qrImg');
  var payNowBtn = document.getElementById('payNowBtn');
  var payAmountInput = document.getElementById('payAmount');

  function buildUpiUri(amount) {
    var params = 'pa=' + encodeURIComponent(UPI_ID) +
      '&pn=' + encodeURIComponent(UPI_PAYEE_NAME) +
      '&cu=INR';
    if (amount && parseFloat(amount) > 0) {
      params += '&am=' + encodeURIComponent(amount);
    }
    return 'upi://pay?' + params;
  }

  function refreshUpiQr() {
    if (!qrImg && !payNowBtn) return;
    var amount = payAmountInput ? payAmountInput.value.trim() : '';
    var upiUri = buildUpiUri(amount);
    if (qrImg) {
      // Renders a real, scannable QR code pointing straight at the UPI ID above.
      qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent(upiUri);
    }
    if (payNowBtn) {
      payNowBtn.setAttribute('href', upiUri);
    }
  }
  if (qrImg || payNowBtn) {
    refreshUpiQr();
    if (payAmountInput) {
      payAmountInput.addEventListener('input', refreshUpiQr);
    }
  }

  // ---------- Enquiry form: saves customer details to the backend ----------
  var enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msgBox = document.getElementById('formMessage');
      var submitBtn = enquiryForm.querySelector('button[type="submit"]');
      var name = document.getElementById('fName').value.trim();
      var phone = document.getElementById('fPhone').value.trim();
      var service = document.getElementById('fService') ? document.getElementById('fService').value : '';
      var amount = document.getElementById('fAmount') ? document.getElementById('fAmount').value.trim() : '';
      var message = document.getElementById('fMessage') ? document.getElementById('fMessage').value.trim() : '';

      var apiBase = window.HERAMB_API_BASE || '';
      var showMessage = function (text) {
        if (msgBox) {
          msgBox.textContent = text;
          msgBox.style.display = 'block';
        }
      };

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

      fetch(apiBase + '/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name, phone: phone, service: service, message: message, amount: amount,
          sourcePage: window.location.pathname.split('/').pop() || 'payment.html'
        })
      })
        .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
        .then(function (result) {
          if (result.ok) {
            showMessage('Thanks ' + (name || 'there') + '! We received your details and will reach out on WhatsApp/Call shortly.');
            if (window.fireConfetti) window.fireConfetti(submitBtn);
            enquiryForm.reset();
            refreshUpiQr();
          } else {
            showMessage((result.data && result.data.error) || 'Something went wrong. Please WhatsApp us instead.');
          }
        })
        .catch(function () {
          showMessage('Could not reach the server right now. Please message us on WhatsApp so we don\'t miss your enquiry.');
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Enquiry →'; }
        });
    });
  }
});
