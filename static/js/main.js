/* ===== Portfolio Main JS ===== */

// ===== Utility Functions =====
function debounce(fn, delay) {
  var timer = null;
  return function () {
    var ctx = this, args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () { fn.apply(ctx, args); }, delay);
  };
}

function formatDate(dateStr) {
  var now = new Date();
  var d = new Date(dateStr);
  var diff = now - d;
  var seconds = Math.floor(diff / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);
  var months = Math.floor(days / 30);
  var years = Math.floor(days / 365);
  if (years > 0) return years + 'y ago';
  if (months > 0) return months + 'mo ago';
  if (days > 0) return days + 'd ago';
  if (hours > 0) return hours + 'h ago';
  if (minutes > 0) return minutes + 'm ago';
  return 'just now';
}

// ===== 1. Loading Screen =====
(function () {
  var ls = document.getElementById('loading-screen');
  if (!ls) return;
  var startTime = Date.now();
  function hideLoading() {
    var elapsed = Date.now() - startTime;
    var remaining = Math.max(0, 1500 - elapsed);
    setTimeout(function () {
      ls.style.opacity = '0';
      ls.style.visibility = 'hidden';
      setTimeout(function () {
        if (ls.parentNode) ls.parentNode.removeChild(ls);
        document.dispatchEvent(new CustomEvent('loading-complete'));
      }, 600);
    }, remaining);
  }
  if (document.readyState === 'complete') {
    hideLoading();
  } else {
    window.addEventListener('load', hideLoading);
  }
})();

// ===== 2. Typewriter Effect =====
(function () {
  var el = document.getElementById('typewriter-text');
  if (!el || typeof HEADLINES === 'undefined' || !HEADLINES.length) return;
  var index = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typeSpeed = 80;
  var deleteSpeed = 40;
  var pauseTime = 2000;
  var timeoutId = null;

  function type() {
    var current = HEADLINES[index];
    if (!current) return;
    if (!isDeleting) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        timeoutId = setTimeout(type, pauseTime);
        return;
      }
      timeoutId = setTimeout(type, typeSpeed + Math.random() * 40);
    } else {
      el.textContent = current.substring(0, charIndex);
      charIndex--;
      if (charIndex < 0) {
        isDeleting = false;
        index = (index + 1) % HEADLINES.length;
        timeoutId = setTimeout(type, 500);
        return;
      }
      timeoutId = setTimeout(type, deleteSpeed + Math.random() * 20);
    }
  }
  type();
})();

// ===== 3. Navbar =====
(function () {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Scroll glass effect
  var onScroll = debounce(function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  if (window.scrollY > 50) navbar.classList.add('scrolled');

  // Active section tracking via IntersectionObserver
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = [];
  for (var i = 0; i < navLinks.length; i++) {
    var href = navLinks[i].getAttribute('href');
    if (href && href.charAt(0) === '#') {
      var id = href.substring(1);
      var sec = document.getElementById(id);
      if (sec) {
        sections.push({ el: navLinks[i], sec: sec, id: id });
      }
    }
  }
  if (sections.length) {
    var observerOptions = { rootMargin: '-50% 0px -50% 0px', threshold: 0 };
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          for (var j = 0; j < sections.length; j++) {
            sections[j].el.classList.toggle('active', sections[j].sec === entry.target);
          }
        }
      });
    }, observerOptions);
    for (var k = 0; k < sections.length; k++) {
      sectionObserver.observe(sections[k].sec);
    }
  }

  // Smooth scroll for nav links
  for (var m = 0; m < navLinks.length; m++) {
    navLinks[m].addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId && targetId.charAt(0) === '#') {
        e.preventDefault();
        var target = document.getElementById(targetId.substring(1));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  // Mobile menu toggle
  var menuBtn = document.getElementById('mobile-menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });
    var mobileLinks = mobileMenu.querySelectorAll('a');
    for (var n = 0; n < mobileLinks.length; n++) {
      mobileLinks[n].addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        var targetId = this.getAttribute('href');
        if (targetId && targetId.charAt(0) === '#') {
          var target = document.getElementById(targetId.substring(1));
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }
})();

// ===== 4. Particle Canvas Animation =====
(function () {
  var canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var particles = [];
  var time = 0;

  var config = typeof PARTICLE_CONFIG !== 'undefined' ? PARTICLE_CONFIG : { count: 50, size: { min: 1, max: 3 }, speed: { min: 0.1, max: 0.5 }, color: '#3B82F6', opacity: { min: 0.1, max: 0.5 } };
  var gridCfg = typeof GRID_CONFIG !== 'undefined' ? GRID_CONFIG : { size: 60, color: '#3B82F6', opacity: 0.03, animationSpeed: 0.5 };

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', debounce(resize, 100));

  var count = config.count || 50;
  var color = config.color || '#3B82F6';
  var cR = parseInt(color.slice(1, 3), 16);
  var cG = parseInt(color.slice(3, 5), 16);
  var cB = parseInt(color.slice(5, 7), 16);

  for (var i = 0; i < count; i++) {
    var sizeMin = (config.size && config.size.min) || 1;
    var sizeMax = (config.size && config.size.max) || 3;
    var size = sizeMin + Math.random() * (sizeMax - sizeMin);
    var speedMin = (config.speed && config.speed.min) || 0.1;
    var speedMax = (config.speed && config.speed.max) || 0.5;
    var speed = speedMin + Math.random() * (speedMax - speedMin);
    var opMin = (config.opacity && config.opacity.min) || 0.1;
    var opMax = (config.opacity && config.opacity.max) || 0.5;
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      baseX: 0,
      speed: speed,
      size: size,
      opacity: opMin + Math.random() * (opMax - opMin),
      phase: Math.random() * Math.PI * 2,
      amp: 0.5 + Math.random() * 1.5,
    });
  }

  function animate() {
    time += 0.01 * (gridCfg.animationSpeed || 0.5);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid overlay
    var gridSize = gridCfg.size || 60;
    var gridColor = gridCfg.color || '#3B82F6';
    var gridAlpha = gridCfg.opacity || 0.03;
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = gridAlpha;
    var offset = (time * 20) % gridSize;
    for (var gx = -gridSize + offset; gx <= canvas.width + gridSize; gx += gridSize) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, canvas.height);
      ctx.stroke();
    }
    for (var gy = -gridSize + offset; gy <= canvas.height + gridSize; gy += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(canvas.width, gy);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Particles floating upward with sine wave
    for (var j = 0; j < particles.length; j++) {
      var p = particles[j];
      p.y -= p.speed;
      p.x += Math.sin(time * 2 + p.phase) * p.amp * 0.3;
      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;

      // Radial gradient for fading edges
      var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
      gradient.addColorStop(0, 'rgba(' + cR + ',' + cG + ',' + cB + ',' + p.opacity + ')');
      gradient.addColorStop(0.5, 'rgba(' + cR + ',' + cG + ',' + cB + ',' + (p.opacity * 0.4) + ')');
      gradient.addColorStop(1, 'rgba(' + cR + ',' + cG + ',' + cB + ',0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

// ===== 5. Three.js 3D Scene =====
(function () {
  if (typeof THREE === 'undefined') return;
  var container = document.getElementById('three-canvas');
  if (!container) return;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 30;

  var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  var ambientLight = new THREE.AmbientLight(0x404060);
  scene.add(ambientLight);
  var pointLight = new THREE.PointLight(0x3B82F6, 1, 50);
  pointLight.position.set(10, 10, 20);
  scene.add(pointLight);
  var pointLight2 = new THREE.PointLight(0x8B5CF6, 0.8, 50);
  pointLight2.position.set(-10, -10, 20);
  scene.add(pointLight2);

  // Torus Knot
  var geometry = new THREE.TorusKnotGeometry(5, 1.5, 100, 16);
  var material = new THREE.MeshStandardMaterial({
    color: 0x3B82F6,
    wireframe: true,
    transparent: true,
    opacity: 0.4,
    emissive: 0x1a3a8a,
    emissiveIntensity: 0.2,
  });
  var torusKnot = new THREE.Mesh(geometry, material);
  scene.add(torusKnot);

  // Floating particles
  var particleGeo = new THREE.BufferGeometry();
  var particleCount = 800;
  var positions = new Float32Array(particleCount * 3);
  var particleColors = new Float32Array(particleCount * 3);
  for (var i = 0; i < particleCount; i++) {
    var radius = 15 + Math.random() * 15;
    var theta = Math.random() * Math.PI * 2;
    var phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
    var col = new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.8, 0.5 + Math.random() * 0.3);
    particleColors[i * 3] = col.r;
    particleColors[i * 3 + 1] = col.g;
    particleColors[i * 3 + 2] = col.b;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
  var particleMat = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });
  var particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  function onResize() {
    var w = container.clientWidth;
    var h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  function animateThree() {
    torusKnot.rotation.x += 0.005;
    torusKnot.rotation.y += 0.01;
    particleSystem.rotation.y += 0.0005;
    renderer.render(scene, camera);
    requestAnimationFrame(animateThree);
  }
  animateThree();

  window.addEventListener('beforeunload', function () {
    renderer.dispose();
    geometry.dispose();
    material.dispose();
    particleGeo.dispose();
    particleMat.dispose();
  });
})();

// ===== 6. Scroll Reveal Animations =====
(function () {
  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var delay = entry.target.getAttribute('data-delay');
        if (delay) {
          setTimeout(function () { entry.target.classList.add('visible'); }, parseInt(delay, 10));
        } else {
          entry.target.classList.add('visible');
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  for (var i = 0; i < revealEls.length; i++) {
    observer.observe(revealEls[i]);
  }
})();

// ===== 7. GitHub Section =====
(function () {
  var section = document.getElementById('github');
  if (!section) return;
  var gridEl = document.getElementById('contribution-grid');
  if (!gridEl) return;
  var contribEl = document.getElementById('gh-total-contributions');
  var reposEl = document.getElementById('gh-total-repos');
  var starsEl = document.getElementById('gh-total-stars');
  var streakEl = document.getElementById('gh-streak');
  var longestEl = document.getElementById('gh-longest-streak');
  var loaded = false;

  var levelColors = [
    'rgba(59,130,246,0.1)',
    '#0e4429',
    '#006d32',
    '#26a641',
    '#39d353',
  ];

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !loaded) {
        loaded = true;
        observer.unobserve(entry.target);
        gridEl.innerHTML = '<div class="flex items-center justify-center w-full py-8"><div class="w-8 h-8 rounded-full border-2 border-border-light" style="border-top-color: var(--color-primary); animation: rotate 1s linear infinite;"></div></div>';
        var statsEls = [contribEl, reposEl, starsEl, streakEl, longestEl];
        for (var s = 0; s < statsEls.length; s++) {
          if (statsEls[s]) statsEls[s].textContent = '...';
        }
        fetch('/api/github')
          .then(function (r) { return r.json(); })
          .then(function (data) {
            if (data.error) {
              gridEl.innerHTML = '<span class="text-text-muted text-sm">Failed to load contribution data.</span>';
              return;
            }
            if (contribEl) contribEl.textContent = data.totalContributions || 0;
            if (reposEl) reposEl.textContent = data.totalRepos || 0;
            if (starsEl) starsEl.textContent = data.totalStars || 0;
            if (streakEl) streakEl.textContent = data.streak || 0;
            if (longestEl) longestEl.textContent = data.longestStreak || 0;

            if (data.grid && gridEl) {
              gridEl.innerHTML = '';
              var dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
              var labelCol = document.createElement('div');
              labelCol.className = 'flex flex-col gap-[3px] mr-1';
              for (var ld = 0; ld < 7; ld++) {
                var lbl = document.createElement('div');
                lbl.style.width = '24px';
                lbl.style.height = '12px';
                lbl.style.fontSize = '9px';
                lbl.style.color = 'var(--color-text-muted)';
                lbl.style.display = 'flex';
                lbl.style.alignItems = 'center';
                if (dayLabels[ld]) lbl.textContent = dayLabels[ld];
                labelCol.appendChild(lbl);
              }
              gridEl.appendChild(labelCol);

              for (var wi = 0; wi < data.grid.length; wi++) {
                var week = data.grid[wi];
                var col = document.createElement('div');
                col.className = 'flex flex-col gap-[3px]';
                for (var di = 0; di < 7; di++) {
                  var day = week[di];
                  var cell = document.createElement('div');
                  cell.style.width = '12px';
                  cell.style.height = '12px';
                  cell.style.borderRadius = '3px';
                  var level = (day && day.level !== undefined) ? day.level : 0;
                  cell.style.background = levelColors[level] || levelColors[0];
                  if (day && day.date) {
                    cell.title = day.date + ': ' + (day.count || 0) + ' contributions';
                  }
                  col.appendChild(cell);
                }
                gridEl.appendChild(col);
              }
            }
          })
          .catch(function () {
            gridEl.innerHTML = '<span class="text-text-muted text-sm">Failed to load contribution data.</span>';
          });
      }
    });
  }, { threshold: 0.1 });
  observer.observe(section);
})();

// ===== 8. AI Chatbot =====
(function () {
  var toggle = document.getElementById('chatbot-toggle');
  var panel = document.getElementById('chatbot-panel');
  var closeBtn = document.getElementById('chatbot-close');
  var input = document.getElementById('chatbot-input');
  var sendBtn = document.getElementById('chatbot-send');
  var messagesEl = document.getElementById('chatbot-messages');
  var openIcon = document.getElementById('chatbot-open-icon');
  var closeIcon = document.getElementById('chatbot-close-icon');
  if (!toggle || !panel) return;

  var hasOpened = false;

  function openChat() {
    panel.classList.remove('hidden');
    if (openIcon) openIcon.classList.add('hidden');
    if (closeIcon) closeIcon.classList.remove('hidden');
    if (input) setTimeout(function () { input.focus(); }, 100);
    if (!hasOpened && messagesEl) {
      hasOpened = true;
      addMessage('Hi! I\'m the AI assistant for Tejas\'s portfolio. Ask me about skills, projects, experience, or anything else!', 'bot');
    }
  }

  function closeChat() {
    panel.classList.add('hidden');
    if (openIcon) openIcon.classList.remove('hidden');
    if (closeIcon) closeIcon.classList.add('hidden');
  }

  toggle.addEventListener('click', function () {
    if (panel.classList.contains('hidden')) { openChat(); } else { closeChat(); }
  });
  if (closeBtn) closeBtn.addEventListener('click', closeChat);

  function addMessage(text, role) {
    if (!messagesEl) return;
    var div = document.createElement('div');
    div.className = 'flex items-start gap-3 ' + (role === 'user' ? 'flex-row-reverse' : '');
    var isUser = role === 'user';
    var avatarBg = isUser ? 'var(--color-primary)' : 'linear-gradient(135deg, var(--color-primary), var(--color-accent))';
    var avatarSvg = isUser
      ? '<svg viewBox="0 0 24 24" fill="white" class="w-4 h-4"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="white" class="w-4 h-4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>';
    div.innerHTML = '<div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style="background: ' + avatarBg + ';">' + avatarSvg + '</div>'
      + '<div class="flex-1 p-3 rounded-xl text-sm leading-relaxed whitespace-pre-wrap" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-secondary);">'
      + text.replace(/\n/g, '<br>') + '</div>';
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTypingIndicator() {
    if (!messagesEl) return null;
    var div = document.createElement('div');
    div.className = 'flex items-start gap-3 typing-indicator';
    div.innerHTML = '<div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style="background: linear-gradient(135deg, var(--color-primary), var(--color-accent));">'
      + '<svg viewBox="0 0 24 24" fill="white" class="w-4 h-4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg></div>'
      + '<div class="flex-1 p-3 rounded-xl text-sm" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-muted);">'
      + '<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></div>';
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  function sendMessage() {
    if (!input || !messagesEl) return;
    var msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    addMessage(msg, 'user');
    var indicator = showTypingIndicator();
    fetch('/api/chat?message=' + encodeURIComponent(msg))
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (indicator && indicator.parentNode) indicator.parentNode.removeChild(indicator);
        addMessage(data.response || 'Sorry, I had trouble processing that.', 'bot');
      })
      .catch(function () {
        if (indicator && indicator.parentNode) indicator.parentNode.removeChild(indicator);
        addMessage('Sorry, I encountered an error. Please try again.', 'bot');
      });
  }

  if (sendBtn) sendBtn.addEventListener('click', sendMessage);
  if (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') sendMessage();
    });
  }
})();

// ===== 9. Terminal Emulator =====
(function () {
  var toggle = document.getElementById('terminal-toggle');
  var panel = document.getElementById('terminal-panel');
  var input = document.getElementById('terminal-input');
  var output = document.getElementById('terminal-output');
  var body = document.getElementById('terminal-body');
  var openIcon = document.getElementById('terminal-open-icon');
  var closeIcon = document.getElementById('terminal-close-icon');
  if (!toggle || !panel) return;

  var history = [];
  var historyIndex = -1;
  var commandsList = ['help', 'about', 'skills', 'projects', 'experience', 'education', 'contact', 'clear', 'whoami', 'date', 'banner'];

  function toggleTerminal() {
    if (panel.classList.contains('hidden')) {
      panel.classList.remove('hidden');
      if (openIcon) openIcon.classList.add('hidden');
      if (closeIcon) closeIcon.classList.remove('hidden');
      if (input) setTimeout(function () { input.focus(); }, 100);
    } else {
      panel.classList.add('hidden');
      if (openIcon) openIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    }
  }

  toggle.addEventListener('click', toggleTerminal);
  var closeTerminal = document.getElementById('terminal-close');
  if (closeTerminal) closeTerminal.addEventListener('click', function () { panel.classList.add('hidden'); if (openIcon) openIcon.classList.remove('hidden'); if (closeIcon) closeIcon.classList.add('hidden'); });

  function addLine(text) {
    if (!text || !output) return;
    var div = document.createElement('div');
    div.textContent = text;
    div.style.color = 'var(--color-text-secondary)';
    div.style.fontSize = '0.875rem';
    div.style.lineHeight = '1.5';
    div.style.whiteSpace = 'pre-wrap';
    output.appendChild(div);
    if (body) body.scrollTop = body.scrollHeight;
  }

  var aboutData = null;

  function fetchAbout() {
    if (aboutData) return Promise.resolve(aboutData);
    return fetch('/api/chat?message=' + encodeURIComponent('about'))
      .then(function (r) { return r.json(); })
      .then(function (d) { aboutData = d.response; return aboutData; })
      .catch(function () { aboutData = 'Tejas N B — Full Stack Developer'; return aboutData; });
  }

  var commands = {
    help: function () {
      return 'Available commands:\n' + commandsList.map(function (c) { return '  ' + c; }).join('\n');
    },
    about: function () {
      return fetchAbout().then(function (r) { return r; });
    },
    whoami: function () {
      return 'Tejas N B';
    },
    skills: function () {
      var cats = {
        'Backend': ['Python (95%)', 'FastAPI (90%)', 'Node.js (70%)'],
        'Frontend': ['JavaScript (85%)', 'TypeScript (80%)', 'React (80%)', 'HTML/CSS (85%)'],
        'DevOps': ['Docker (80%)', 'Git (90%)', 'Linux (65%)'],
        'Cloud': ['AWS (75%)'],
        'Database': ['MongoDB (85%)', 'PostgreSQL (75%)'],
      };
      var lines = [];
      for (var cat in cats) {
        if (cats.hasOwnProperty(cat)) {
          lines.push(cat + ':');
          lines.push('  ' + cats[cat].join(', '));
        }
      }
      return lines.join('\n');
    },
    projects: function () {
      return '- FastAPI Microservices Boilerplate: Production-ready FastAPI boilerplate\n'
        + '- Automation Pipeline Framework: Flexible automation framework\n'
        + '- Portfolio Website: Modern, interactive developer portfolio\n'
        + '- REST API Testing Tool: Lightweight API testing CLI tool\n'
        + '- Real-time Collaborative Editor: Collaborative code editor\n'
        + '- ML Model Serving Platform: Platform for deploying ML models';
    },
    experience: function () {
      return 'Freelance / Open Source — Full Stack Developer (2024–Present)\n'
        + '  Building production-grade web applications and APIs\n'
        + '  Developing automation pipelines and DevOps tooling\n'
        + 'Self-Learning & Projects — Software Developer (2023–2024)\n'
        + '  Built multiple portfolio projects\n'
        + '  Learned cloud fundamentals with AWS and Docker';
    },
    education: function () {
      return 'Self-Taught / Online Certifications\n'
        + '  Full Stack Development — Computer Science (2023–2024)\n'
        + '  Focus on Python backend development with FastAPI\n'
        + '  Frontend development with React, Next.js, and TypeScript';
    },
    contact: function () {
      return 'Email: tejasnb03@gmail.com\n'
        + 'GitHub: https://github.com/dev-tejasnb\n'
        + 'LinkedIn: https://linkedin.com/in/tejas-n-b\n'
        + 'Twitter: https://twitter.com/dev_tejasnb';
    },
    clear: function () {
      if (output) output.innerHTML = '';
      return null;
    },
    date: function () {
      return new Date().toString();
    },
    banner: function () {
      return '  ____  _                      _   _  __\n'
        + ' |  _ \\| |                    | \\ | |/ _|\n'
        + ' | |_) | |_   _  ___ ___ ___  |  \\| | |_\n'
        + ' |  _ <| | | | |/ __/ __/ __| | . ` |  _|\n'
        + ' | |_) | | |_| | (_| (__\\__ \\_| |\\  | |\n'
        + ' |____/|_|\\__,_|\\___\\___|___(_)_| \\_|_|\n'
        + '\nWelcome to Tejas\'s Portfolio Terminal v1.0.0\nType \'help\' for available commands.';
    },
  };

  function tabComplete(val) {
    var lower = val.toLowerCase();
    var matches = [];
    for (var i = 0; i < commandsList.length; i++) {
      if (commandsList[i].indexOf(lower) === 0) {
        matches.push(commandsList[i]);
      }
    }
    if (matches.length === 1 && input) {
      input.value = matches[0];
    } else if (matches.length > 1 && input) {
      addLine('$ ' + val);
      addLine(matches.join('  '));
    }
  }

  if (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var val = input.value.trim();
        addLine('$ ' + val);
        if (val) {
          history.push(val);
          historyIndex = history.length;
          var lower = val.toLowerCase();
          var cmd = commands[lower];
          if (cmd) {
            var result = cmd();
            if (result && typeof result.then === 'function') {
              result.then(function (r) { if (r !== null) addLine(r); });
            } else if (result !== null && result !== undefined) {
              addLine(result);
            }
          } else if (lower) {
            addLine('Command not found: ' + lower + '\nType \'help\' for available commands.');
          }
        }
        input.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length && historyIndex > 0) {
          historyIndex--;
          input.value = history[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < history.length - 1) {
          historyIndex++;
          input.value = history[historyIndex];
        } else {
          historyIndex = history.length;
          input.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        tabComplete(input.value);
      }
    });
  }
})();

// ===== 10. Floating UI Management =====
(function () {
  // Parallax effect on hero section
  var hero = document.getElementById('hero');
  if (hero) {
    document.addEventListener('mousemove', function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 20;
      var y = (e.clientY / window.innerHeight - 0.5) * 20;
      var orbital = hero.querySelector('.orbital-ring');
      if (orbital) {
        orbital.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      }
    });
  }

  // Smooth scroll for all anchor links
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (link) {
      var href = link.getAttribute('href');
      if (href && href.length > 1) {
        var target = document.getElementById(href.substring(1));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  });

  // Handle viewport height for mobile (CSS custom property --vh)
  function setVH() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  }
  setVH();
  window.addEventListener('resize', setVH);
})();

// ===== Footer Year =====
(function () {
  var el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();
