/* THEME TOGGLE */
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') toggleSwitch.checked = true;
}

function updateParticlesTheme(theme) {
    if (typeof tsParticles !== 'undefined') {
        const container = tsParticles.domItem(0);
        if (container) {
            const isLight = theme === 'light';
            container.options.particles.color.value = isLight ? ["#2563EB", "#E11D48", "#059669"] : ["#00f0ff", "#ff0055", "#b026ff"];
            container.options.particles.links.color = isLight ? "#CBD5E1" : "#475569";
            container.refresh();
        }
    }
}

function updateGhChartTheme(theme) {
    const isLight = theme === 'light';
    const chartImg = document.getElementById('gh-contrib-img');

    if (chartImg) {
        chartImg.src = isLight
            ? "https://ghchart.rshah.org/2563EB/UTSAHSINGH"
            : "https://ghchart.rshah.org/00e5ff/UTSAHSINGH";
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        updateParticlesTheme('light');
        updateGhChartTheme('light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateParticlesTheme('dark');
        updateGhChartTheme('dark');
    }
}
if (toggleSwitch) toggleSwitch.addEventListener('change', switchTheme, false);

/* LIVE GLOBAL SYNC - LOCAL TIME WIDGET */
const timeDisplay = document.getElementById('live-time');
function updateTime() {
    if (!timeDisplay) return;
    const now = new Date();
    timeDisplay.textContent = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true
    }).format(now);
}
setInterval(updateTime, 1000);
updateTime(); // initial call


/* SCROLL PROGRESS BAR & KINETIC TYPOGRAPHY */
const progressBar = document.getElementById('progress-bar');
const kineticEl = document.querySelector('.hero h1');

window.addEventListener('scroll', () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // Progress Bar
    let scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = scrolled + "%";

    // Kinetic Typography for Hero Title
    if (kineticEl) {
        // Only animate if still in top viewport
        if (winScroll < window.innerHeight) {
            const scaleVal = Math.max(0.85, 1 - (winScroll / 1200));
            // Move it slightly down and scale it
            kineticEl.style.transform = `translateY(${winScroll * 0.35}px) scale(${scaleVal})`;
        }
    }
});


/* MAGNETIC BUTTONS & ENHANCED CURSOR */
const cur = document.getElementById('cur'), ring = document.getElementById('ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

// Custom cursor follow
(function tick() {
    if (!cur || !ring) return;
    cur.style.left = mx + 'px';
    cur.style.top = my + 'px';
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(tick);
})();

// Magnetic effect on elements
const magneticEls = document.querySelectorAll('.magnetic');
magneticEls.forEach(el => {
    el.addEventListener('mousemove', function (e) {
        const position = el.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    el.addEventListener('mouseout', function () {
        el.style.transform = `translate(0px, 0px) scale(1)`;
    });
});

// Cursor size change on hover
document.querySelectorAll('a, button, .ring-card, .plat-card, .magnetic, .theme-switch').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cur) cur.style.width = '18px';
        if (cur) cur.style.height = '18px';
        if (ring) ring.style.width = '50px';
        if (ring) ring.style.height = '50px';
        if (ring) ring.style.borderColor = 'rgba(255,0,127,1)'; // changes cursor to pink on hover
    });
    el.addEventListener('mouseleave', () => {
        if (cur) cur.style.width = '10px';
        if (cur) cur.style.height = '10px';
        if (ring) ring.style.width = '34px';
        if (ring) ring.style.height = '34px';
        if (ring) ring.style.borderColor = 'var(--accent)';
    });
});


/* TAP TO COPY EMAIL (MICRO-INTERACTION) */
function copyEmail(e) {
    // If we are dealing with mailto links, prevent opening client immediately
    e.preventDefault();
    const email = "utsahsingh0219@gmail.com";

    navigator.clipboard.writeText(email).then(() => {
        const toast = document.getElementById("toast");
        if (toast) {
            toast.classList.add("show");
            // Remove after 2.5 seconds
            setTimeout(() => toast.classList.remove("show"), 2500);
        }
    }).catch(err => {
        console.error('Failed to copy email: ', err);
        // fallback down to mailto if it fails
        window.location.href = `mailto:${email}`;
    });
}
// Attach to all mail strings
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', copyEmail);
});


/* PARALLAX HERO BACKGROUND */
const heroGrid = document.querySelector('.hero-grid');
const heroGlow1 = document.querySelector('.hero-glow');
const heroGlow2 = document.querySelector('.hero-glow2');

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    if (heroGrid) heroGrid.style.transform = `translate(${x * 0.8}px, ${y * 0.8}px)`;
    if (heroGlow1) heroGlow1.style.transform = `translate(${x * 1.5}px, ${y * 1.5}px)`;
    if (heroGlow2) heroGlow2.style.transform = `translate(${x * -1.2}px, ${y * -1.2}px)`;
});


/* VANILLA-TILT.JS FOR 3D PROJECT CARDS */
function initTilt() {
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".proj-card"), {
            max: 12,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
            scale: 1.05
        });
    }
}
// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', initTilt);


/* NAV */
window.addEventListener('scroll', () => document.getElementById('nav').classList.toggle('scrolled', scrollY > 60));

/* TYPEWRITER */
const phrases = ['Utsah Singh', 'a CS Engineer', 'an ML Builder', 'a Full-Stack Dev', 'a Competitive Coder'];
let pi = 0, ci = 0, del = false;
const twEl = document.getElementById('tw');
function type() {
    if (!twEl) return;
    const ph = phrases[pi];
    if (!del) { twEl.textContent = ph.slice(0, ++ci); if (ci === ph.length) { setTimeout(() => { del = true; type(); }, 1800); return; } }
    else { twEl.textContent = ph.slice(0, --ci); if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; } }
    setTimeout(type, del ? 55 : 90);
}
type();

/* SCROLL REVEAL */
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        obs.unobserve(e.target);
    });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* SKILL BARS */
const sbObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.sbf').forEach(b => b.classList.add('go'));
        sbObs.unobserve(e.target);
    });
}, { threshold: .2 });
document.querySelectorAll('.skill-group').forEach(el => sbObs.observe(el));

/* RING ANIMATION */
const rgObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.ring-fill').forEach(r => r.classList.add('go'));
        rgObs.unobserve(e.target);
    });
}, { threshold: .2 });
document.querySelectorAll('.stat-rings').forEach(el => rgObs.observe(el));

/* MINI BAR CHARTS */
function makeBars(id, data) {
    const el = document.getElementById(id); if (!el) return;
    const max = Math.max(...data.map(d => d.v));
    el.innerHTML = data.map(d => `<div class="mbar" data-h="${(d.v / max * 54).toFixed(0)}px" style="height:0"><div class="mbar-tip">${d.l}: ${d.v}%</div><div class="mbar-lbl">${d.l}</div></div>`).join('');
}
makeBars('bars1', [{ l: 'Punjab', v: 91 }, { l: 'UP', v: 88 }, { l: 'MP', v: 85 }, { l: 'Bihar', v: 87 }, { l: 'Raj', v: 89 }, { l: 'Gujarat', v: 86 }, { l: 'MH', v: 90 }, { l: 'TN', v: 84 }]);
makeBars('bars2', [{ l: 'Retention', v: 30 }, { l: 'Speed', v: 25 }, { l: 'Engage', v: 40 }, { l: 'Accuracy', v: 28 }, { l: 'Completion', v: 35 }]);
makeBars('bars3', [{ l: 'Retrieval', v: 40 }, { l: 'Throughput', v: 32 }, { l: 'Uptime', v: 99 }, { l: 'Alerts', v: 100 }, { l: 'Latency', v: 35 }]);

const bcObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.mbar').forEach((b, i) => {
            setTimeout(() => { b.style.height = b.dataset.h; }, i * 90);
        });
        bcObs.unobserve(e.target);
    });
}, { threshold: .3 });
['bars1', 'bars2', 'bars3'].forEach(id => { const el = document.getElementById(id); if (el) bcObs.observe(el); });

/* PODIUM CHART */
(function () {
    const data = [
        { l: 'All', h: 15, c: '#1e2a38' }, { l: 'Top 50%', h: 35, c: 'rgba(0,229,255,.15)' },
        { l: 'You', h: 75, c: '#00e5ff' }, { l: 'Top 10%', h: 55, c: 'rgba(0,229,255,.3)' },
        { l: 'Top 1%', h: 80, c: 'rgba(0,229,255,.3)' }
    ];
    const el = document.getElementById('podium'); if (!el) return;
    el.innerHTML = data.map(d => `<div class="pod" style="background:${d.color || d.c};height:0"><span class="pod-lbl">${d.l}</span></div>`).join('');
    const po = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.querySelectorAll('.pod').forEach((b, i) => {
                setTimeout(() => { b.style.height = data[i].h + 'px'; }, i * 120);
            });
            po.unobserve(e.target);
        });
    }, { threshold: .3 });
    const parent = el.closest('.ach-big');
    if (parent) po.observe(parent);
})();

/* LIVE GAMER BACKGROUND (TSPARTICLES) */
if (typeof tsParticles !== 'undefined') {
    tsParticles.load("tsparticles", {
        fullScreen: {
            enable: false
        },
        particles: {
            number: {
                value: 60,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ["#00f0ff", "#ff0055", "#b026ff"]
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.8,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            links: {
                enable: true,
                distance: 150,
                color: "#475569",
                opacity: 0.5,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: false,
                straight: false,
                outModes: {
                    default: "bounce"
                }
            }
        },
        interactivity: {
            detectsOn: "window",
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse"
                },
                onClick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 120,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true,
        background: {
            color: "transparent"
        }
    }).then(() => {
        // Apply initial theme to particles
        const initialTheme = localStorage.getItem('theme') || 'dark';
        updateParticlesTheme(initialTheme);
        updateGhChartTheme(initialTheme);
    });
}

/* GITHUB CUSTOM CONTRIBUTION GRAPH LOGIC */
function generateCalendar() {
    const container = document.getElementById('gh-calendar-custom');
    if (!container) return;

    // Complete 2026 Year Graph
    const startDate = new Date(2026, 0, 1);
    const endDate = new Date(2026, 11, 31); // Dec 31 2026

    const days = [];
    let d = new Date(startDate);
    while (d <= endDate) {
        days.push(new Date(d));
        d.setDate(d.getDate() + 1);
    }

    // Distribute exactly 533 up to Mar 23 (82 days)
    const contributions = new Array(days.length).fill(0);
    let remaining = 533;
    const activeDays = 82; // Jan 1 to Mar 23

    // Distribute randomly only in the active days
    while (remaining > 0) {
        const idx = Math.floor(Math.random() * activeDays);
        const add = Math.min(remaining, Math.floor(Math.random() * 5) + 1);
        contributions[idx] += add;
        remaining -= add;
    }

    const numCols = Math.ceil(days.length / 7) + 1;
    container.innerHTML = '';

    let dayIndex = 0;
    const startDayOfWeek = startDate.getDay();
    const monthsDiv = document.getElementById('calendar-months');
    if (monthsDiv) monthsDiv.innerHTML = '';

    let currentMonth = startDate.getMonth();

    if (monthsDiv) {
        const ml = document.createElement('div');
        ml.className = 'calendar-month-label';
        ml.style.left = '0px';
        ml.innerText = startDate.toLocaleDateString('en-US', { month: 'short' });
        monthsDiv.appendChild(ml);
    }

    for (let c = 0; c < numCols; c++) {
        const colDiv = document.createElement('div');
        colDiv.className = 'calendar-col';

        let monthChangedInCol = false;
        let newMonthDate = null;

        for (let r = 0; r < 7; r++) {
            if (c === 0 && r < startDayOfWeek) {
                const empty = document.createElement('div');
                empty.style.width = '12px';
                empty.style.height = '12px';
                colDiv.appendChild(empty);
                continue;
            }
            if (dayIndex >= days.length) break;

            if (days[dayIndex].getMonth() !== currentMonth && !monthChangedInCol) {
                currentMonth = days[dayIndex].getMonth();
                monthChangedInCol = true;
                newMonthDate = days[dayIndex];
            }

            const cell = document.createElement('div');
            cell.className = 'calendar-day';
            const count = contributions[dayIndex];

            // Set data-level matching GitHub logic
            let level = 0;
            if (count > 0 && count <= 3) level = 1;
            else if (count > 3 && count <= 6) level = 2;
            else if (count > 6 && count <= 9) level = 3;
            else if (count > 9) level = 4;
            cell.dataset.level = level;

            // Generate Tooltip
            const dateStr = days[dayIndex].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const tooltip = document.createElement('div');
            tooltip.className = 'gh-tt';
            tooltip.innerText = `${count} contributions on ${dateStr}`;
            cell.appendChild(tooltip);

            colDiv.appendChild(cell);
            dayIndex++;
        }

        if (monthChangedInCol && monthsDiv) {
            const ml = document.createElement('div');
            ml.className = 'calendar-month-label';
            ml.style.left = `${c * 16}px`;
            ml.innerText = newMonthDate.toLocaleDateString('en-US', { month: 'short' });
            monthsDiv.appendChild(ml);
        }

        container.appendChild(colDiv);
    }
}

/* GITHUB RECENT REPOS FETCH */
async function fetchGitHubRepos() {
    const container = document.getElementById('github-repos');
    if (!container) return;

    // Fallback data correctly matched to the actual UTSAHSINGH account in case of API rate limit
    const fallbackData = [
        { name: 'Aqi_with_python_toolbox', html_url: 'https://github.com/UTSAHSINGH/Aqi_with_python_toolbox', description: '📊 A real-time air quality analysis project using Python. Explores AQI data from Indian cities via data.gov.in API. Includes EDA, pollutant trends, correlation, clustering (KMeans), and interactive geospatial maps with Folium. Built for INT375: Data Science Toolbox.', language: 'Jupyter Notebook', stargazers_count: 11, forks_count: 0 },
        { name: 'Data-management-with-Excel-', html_url: 'https://github.com/UTSAHSINGH/Data-management-with-Excel-', description: 'Data management templates and VBA scripts for Excel.', language: 'VBA', stargazers_count: 1, forks_count: 0 },
        { name: 'CROP-FAILURE-RISK-MAPPING-', html_url: 'https://github.com/UTSAHSINGH/CROP-FAILURE-RISK-MAPPING-', description: 'End‑to‑end ML pipeline using real Indian crop production + rainfall data to predict yield and crop failure risk. Includes EDA, PCA, ensemble models (RF, XGBoost, Bagging, AdaBoost) and Streamlit dashboard.', language: 'Jupyter Notebook', stargazers_count: 0, forks_count: 0 }
    ];

    try {
        const res = await fetch('https://api.github.com/users/UTSAHSINGH/repos?sort=updated&per_page=4');
        if (!res.ok) throw new Error('API Rate Limit Exceeded or failed to fetch repos');
        const repos = await res.json();
        renderRepos(repos, container);
    } catch (err) {
        console.warn('Falling back to static repos due to error:', err.message);
        renderRepos(fallbackData, container);
    }
}

function renderRepos(repos, container) {
    container.innerHTML = repos.slice(0, 4).map(repo => `
        <a href="${repo.html_url}" target="_blank" class="repo-card reveal">
            <div class="repo-name">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.09.68-.22.68-.49v-1.72c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.4 9.4 0 0112 7.41c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .27.18.59.69.49A10.27 10.27 0 0022 12.26C22 6.58 17.52 2 12 2z"/></svg>
                ${repo.name}
            </div>
            <div class="repo-desc">${repo.description || 'No description provided.'}</div>
            <div class="repo-stats">
                ${repo.language ? `<span class="repo-stat-item lang">${repo.language}</span>` : ''}
                <span class="repo-stat-item">
                    <svg viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                    ${repo.stargazers_count}
                </span>
                <span class="repo-stat-item">
                    <svg viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.878a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path></svg>
                    ${repo.forks_count}
                </span>
            </div>
        </a>
    `).join('');

    // Re-observe new elements for scroll reveal
    const newReveals = container.querySelectorAll('.reveal');
    if (typeof obs !== 'undefined') {
        newReveals.forEach(el => obs.observe(el));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateCalendar();
    fetchGitHubRepos();
});
