/* app.js — COMPLETO
   - Navbar activo por scroll + scroll suave
   - Modal reutilizable (Info + Resultado)
   - Acordeón (abre 1 a la vez)
   - Copiar con feedback
   - QUIZ con tu lógica (5 pantallas)
*/

(() => {
  // ===============================
  // Helpers
  // ===============================
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  // ===============================
  // Navbar: scroll suave + activo por sección
  // ===============================
  const navLinks = $$(".nav a").filter(a => a.getAttribute("href")?.startsWith("#"));
  const sections = navLinks.map(a => $(a.getAttribute("href"))).filter(Boolean);

  navLinks.forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const target = $(a.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  function setActiveNav(id) {
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
  }

  let lastActive = "";
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    let current = "";
    for (const sec of sections) {
      const top = sec.offsetTop - 140;
      if (y >= top) current = sec.id;
    }
    if (current && current !== lastActive) {
      lastActive = current;
      setActiveNav(current);
    }
  }, { passive: true });

  if (sections[0]) setActiveNav(sections[0].id);

  // ===============================
  // Modal (reutilizable)
  // ===============================
  const modal = $("#modal");
  const modalTitle = $("#modalTitle");
  const modalDesc = $("#modalDesc");
  const modalBody = $("#modalBody");

  function openModal({ title = "Info", desc = "", bodyHTML = "" } = {}) {
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalBody.innerHTML = bodyHTML;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modalBody.innerHTML = "";
  }

  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]") || e.target.closest("[data-close]")) {
      closeModal();
      return;
    }
    if (e.target.classList.contains("modal-backdrop")) {
      closeModal();
      return;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
  });

  // ===============================
  // Contenido Cards (ejemplo mínimo)
  // ===============================
  const INFO = {
    planes: {
      title: "Planes",
      desc: "Info de ejemplo",
      items: [{ h: "Resumen", html: `<p class="small-muted">Cargá acá tu contenido.</p>` }]
    },
    adicionales: {
      title: "Productos adicionales",
      desc: "Info de ejemplo",
      items: [{ h: "Resumen", html: `<p class="small-muted">GO Box, Fútbol, etc.</p>` }]
    },
    proceso: {
      title: "Proceso de venta",
      desc: "Info de ejemplo",
      items: [{ h: "Checklist", html: `<p class="small-muted">Diagnóstico → Propuesta → Cierre.</p>` }]
    },
    datos: {
      title: "Gestión datos del cliente",
      desc: "Info de ejemplo",
      items: [{ h: "Campos", html: `<p class="small-muted">Nombre, CI, Dirección, Teléfono…</p>` }]
    },
    venta: {
      title: "Venta",
      desc: "Guión de ejemplo",
      items: [{
        h: "Mensaje",
        html: `
          <div class="codebox" id="txt_hi">Hola 👋 ¿Qué plan te interesa y cuántos decos necesitás?</div>
          <div class="copyline"><button class="btn primary" data-copy="#txt_hi">Copiar</button></div>
        `
      }]
    },
    sds: {
      title: "SDS",
      desc: "Info de ejemplo",
      items: [{ h: "Escalamiento", html: `<p class="small-muted">CI + Dirección + Problema + Fotos.</p>` }]
    }
  };

  function buildAccordion(items) {
    const wrap = document.createElement("div");
    wrap.className = "acc";

    items.forEach((it, idx) => {
      const item = document.createElement("div");
      item.className = "acc-item";

      const btn = document.createElement("button");
      btn.className = "acc-btn";
      btn.type = "button";
      btn.setAttribute("aria-expanded", idx === 0 ? "true" : "false");
      btn.innerHTML = `<span>${it.h}</span><span class="chev">${idx === 0 ? "−" : "+"}</span>`;

      const panel = document.createElement("div");
      panel.className = "acc-panel";
      panel.hidden = idx !== 0;
      panel.innerHTML = it.html;

      btn.addEventListener("click", () => {
        $$(".acc-panel", wrap).forEach(p => (p.hidden = true));
        $$(".acc-btn", wrap).forEach(b => b.setAttribute("aria-expanded", "false"));
        $$(".chev", wrap).forEach(c => (c.textContent = "+"));

        panel.hidden = false;
        btn.setAttribute("aria-expanded", "true");
        btn.querySelector(".chev").textContent = "−";
      });

      item.appendChild(btn);
      item.appendChild(panel);
      wrap.appendChild(item);
    });

    return wrap;
  }

  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open-info]");
    if (!openBtn) return;

    const key = openBtn.getAttribute("data-open-info");
    const data = INFO[key];
    if (!data) return;

    modalBody.innerHTML = "";
    modalBody.appendChild(buildAccordion(data.items));

    openModal({ title: data.title, desc: data.desc, bodyHTML: modalBody.innerHTML });
    modalBody.innerHTML = "";
    modalBody.appendChild(buildAccordion(data.items));
  });

  // Copiar
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;

    const sel = btn.getAttribute("data-copy");
    const el = sel ? $(sel) : null;
    const text = el ? el.textContent.trim() : "";
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      const old = btn.textContent;
      btn.textContent = "Copiado ✅";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = old;
        btn.disabled = false;
      }, 900);
    } catch {
      alert("No se pudo copiar. Probá manualmente.");
    }
  });

  // =========================================================
  // QUIZ (5 pantallas) con tu lógica
  // =========================================================
  const stepLabel = $("#stepLabel");
  const progressBar = $("#progressBar");
  const step1 = $("#step1");
  const step2 = $("#step2");
  const step3 = $("#step3");

  if (!step1 || !step2 || !step3 || !stepLabel || !progressBar) return;

  // Mensual
  const PLAN_MENSUAL = {
    plata: 990,
    plata_promo_j: 890,
    oro: 1190
  };
  const EXTRA_DECO = 280;
  const FUTBOL_MENSUAL = 300;

  // Conexión por tipo y decos
  function conexionBase(tipo, decos) {
    // tipo: "p12" o "p3tc"
    if (decos === 1 || decos === 2) return (tipo === "p12") ? 690 : 0;
    if (decos === 3) return (tipo === "p12") ? 1789 : 1099;
    if (decos === 4) return (tipo === "p12") ? 2888 : 2198;
    return 0;
  }

  function conexionGoBoxExtra(tipo) {
    return (tipo === "p12") ? 1000 : 500;
  }

  let quiz = { tipo: null, gobox: null, futbol: null, plan: null, decos: null };

  const screens = [
    {
      key: "tipo",
      title: "Pregunta 1 · ¿Tipo de cliente?",
      html: `
        <label class="option"><input type="radio" name="q_tipo" value="p12"><span><b>P1 o P2</b></span></label>
        <label class="option"><input type="radio" name="q_tipo" value="p3tc"><span><b>P3 o TC</b></span></label>
        <div class="err" id="q_err" hidden>Elegí una opción para continuar.</div>
        <div class="actions"><button class="btn primary" data-next>Siguiente</button></div>
      `,
      read: () => document.querySelector('input[name="q_tipo"]:checked')?.value || null,
      write: (v) => { $$('input[name="q_tipo"]').forEach(i => i.checked = (i.value === v)); }
    },
    {
      key: "gobox",
      title: "Pregunta 2 · ¿Quiere GO Box?",
      html: `
        <label class="option"><input type="radio" name="q_gobox" value="si"><span>Sí</span></label>
        <label class="option"><input type="radio" name="q_gobox" value="no"><span>No</span></label>
        <div class="err" id="q_err" hidden>Elegí una opción para continuar.</div>
        <div class="actions">
          <button class="btn" data-back>Atrás</button>
          <button class="btn primary" data-next>Siguiente</button>
        </div>
      `,
      read: () => {
        const v = document.querySelector('input[name="q_gobox"]:checked')?.value || null;
        return v === "si" ? true : (v === "no" ? false : null);
      },
      write: (v) => { $$('input[name="q_gobox"]').forEach(i => i.checked = ((i.value === "si") === v)); }
    },
    {
      key: "futbol",
      title: "Pregunta 3 · ¿Quiere Fútbol Uruguayo?",
      html: `
        <label class="option"><input type="radio" name="q_futbol" value="si"><span>Sí</span></label>
        <label class="option"><input type="radio" name="q_futbol" value="no"><span>No</span></label>
        <div class="err" id="q_err" hidden>Elegí una opción para continuar.</div>
        <div class="actions">
          <button class="btn" data-back>Atrás</button>
          <button class="btn primary" data-next>Siguiente</button>
        </div>
      `,
      read: () => {
        const v = document.querySelector('input[name="q_futbol"]:checked')?.value || null;
        return v === "si" ? true : (v === "no" ? false : null);
      },
      write: (v) => { $$('input[name="q_futbol"]').forEach(i => i.checked = ((i.value === "si") === v)); }
    },
    {
      key: "plan",
      title: "Pregunta 4 · ¿Qué plan desea?",
      html: `
        <label class="option"><input type="radio" name="q_plan" value="plata"><span><b>Plata HD</b> — $990 (1 deco)</span></label>
        <label class="option"><input type="radio" name="q_plan" value="plata_promo_j"><span><b>Plata HD Promo J</b> — $890 (1 deco)</span></label>
        <label class="option"><input type="radio" name="q_plan" value="oro"><span><b>Oro HD</b> — $1190 (1 deco)</span></label>
        <div class="err" id="q_err" hidden>Elegí una opción para continuar.</div>
        <div class="actions">
          <button class="btn" data-back>Atrás</button>
          <button class="btn primary" data-next>Siguiente</button>
        </div>
      `,
      read: () => document.querySelector('input[name="q_plan"]:checked')?.value || null,
      write: (v) => { $$('input[name="q_plan"]').forEach(i => i.checked = (i.value === v)); }
    },
    {
      key: "decos",
      title: "Pregunta 5 · ¿Cuántos decodificadores quiere?",
      html: `
        <div class="row">
          <label class="chip"><input type="radio" name="q_decos" value="1"><span>1</span></label>
          <label class="chip"><input type="radio" name="q_decos" value="2"><span>2</span></label>
          <label class="chip"><input type="radio" name="q_decos" value="3"><span>3</span></label>
          <label class="chip"><input type="radio" name="q_decos" value="4"><span>4</span></label>
        </div>
        <div class="err" id="q_err" hidden>Elegí una opción para continuar.</div>
        <div class="actions">
          <button class="btn" data-back>Atrás</button>
          <button class="btn success" data-finish>Ver resultado</button>
        </div>
        <p class="hint">Extras: +$${EXTRA_DECO}/mes desde el 2º deco · Fútbol +$${FUTBOL_MENSUAL}/mes.</p>
      `,
      read: () => {
        const v = document.querySelector('input[name="q_decos"]:checked')?.value || null;
        return v ? parseInt(v, 10) : null;
      },
      write: (v) => { $$('input[name="q_decos"]').forEach(i => i.checked = (parseInt(i.value, 10) === v)); }
    }
  ];

  let screenIndex = 0;

  function updateProgress() {
    const stepNum = screenIndex + 1;
    stepLabel.textContent = `Paso ${stepNum}`;
    progressBar.style.width = `${(stepNum / screens.length) * 100}%`;
  }

  function renderScreen() {
    step2.hidden = true;
    step3.hidden = true;
    step1.hidden = false;

    const s = screens[screenIndex];
    step1.innerHTML = `<h3>${s.title}</h3>${s.html}`;

    const val = quiz[s.key];
    if (val !== null && val !== undefined) {
      setTimeout(() => s.write(val), 0);
    }
    updateProgress();
  }

  function showError(msg) {
    const err = $("#q_err", step1);
    if (!err) return;
    err.textContent = msg;
    err.hidden = false;
  }
  function clearError() {
    const err = $("#q_err", step1);
    if (err) err.hidden = true;
  }

  function computeResult() {
    const tipo = quiz.tipo;
    const decos = quiz.decos;

    let conexion = conexionBase(tipo, decos);
    if (quiz.gobox === true) conexion += conexionGoBoxExtra(tipo);

    const baseMensual = PLAN_MENSUAL[quiz.plan] ?? 0;
    const extras = Math.max(0, decos - 1) * EXTRA_DECO;
    let mensual = baseMensual + extras;
    if (quiz.futbol === true) mensual += FUTBOL_MENSUAL;

    return { conexion, mensual, baseMensual, extras };
  }

  function openResultPopup() {
    const { conexion, mensual, baseMensual, extras } = computeResult();

    const tipoLabel = quiz.tipo === "p12" ? "P1 o P2" : "P3 o TC";
    const planLabel =
      quiz.plan === "plata" ? "Plata HD" :
      quiz.plan === "plata_promo_j" ? "Plata HD Promo J" :
      "Oro HD";

    const goConn = quiz.gobox ? conexionGoBoxExtra(quiz.tipo) : 0;
    const connBase = conexionBase(quiz.tipo, quiz.decos);

    openModal({
      title: "Resultado de costos",
      desc: "Costo de conexión y costo mensual calculados",
      bodyHTML: `
        <div class="panel" style="margin-top:0;">
          <div><b>Costo de conexión:</b> $${conexion}</div>
          <div style="margin-top:8px;"><b>Costo mensual:</b> $${mensual}</div>

          <div style="height:12px"></div>
          <div class="small-muted">Detalle</div>
          <div class="codebox" style="margin-top:8px;">
Tipo de cliente: ${tipoLabel}
Plan: ${planLabel} (base $${baseMensual})
Decodificadores: ${quiz.decos} (extras mensual $${extras})
GO Box: ${quiz.gobox ? "Sí" : "No"} (extra conexión $${goConn})
Fútbol uruguayo: ${quiz.futbol ? "Sí" : "No"} (extra mensual $${quiz.futbol ? FUTBOL_MENSUAL : 0})
Conexión base: $${connBase}
          </div>

          <div class="copyline">
            <button class="btn primary" id="resetQuizBtn">Reiniciar quiz</button>
            <button class="btn" data-close>Cerrar</button>
          </div>
        </div>
      `
    });

    setTimeout(() => {
      const b = $("#resetQuizBtn");
      if (b) b.addEventListener("click", () => {
        closeModal();
        resetQuiz();
      });
    }, 0);
  }

  function resetQuiz() {
    quiz = { tipo: null, gobox: null, futbol: null, plan: null, decos: null };
    screenIndex = 0;
    renderScreen();
  }

  // Navegación del quiz (delegada)
  step1.addEventListener("click", (e) => {
    const next = e.target.closest("[data-next]");
    const back = e.target.closest("[data-back]");
    const fin = e.target.closest("[data-finish]");

    if (next) {
      clearError();
      const s = screens[screenIndex];
      const val = s.read();
      if (val === null || val === undefined || val === "") {
        showError("Elegí una opción para continuar.");
        return;
      }
      quiz[s.key] = val;

      if (screenIndex < screens.length - 1) {
        screenIndex++;
        renderScreen();
      }
      return;
    }

    if (back) {
      clearError();
      const s = screens[screenIndex];
      const val = s.read();
      if (val !== null && val !== undefined && val !== "") quiz[s.key] = val;

      if (screenIndex > 0) {
        screenIndex--;
        renderScreen();
      }
      return;
    }

    if (fin) {
      clearError();
      const s = screens[screenIndex];
      const val = s.read();
      if (!val || val < 1) {
        showError("Elegí una opción para continuar.");
        return;
      }
      quiz[s.key] = val;

      if (!quiz.tipo || quiz.gobox === null || quiz.futbol === null || !quiz.plan || !quiz.decos) {
        showError("Faltan respuestas. Volvé y completá todo.");
        return;
      }

      openResultPopup();
    }
  });

  // Init
  resetQuiz();
})();
