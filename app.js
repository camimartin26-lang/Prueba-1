/* =========================================
   APP.JS COMPLETO (para el HTML final)
   - Navbar scroll + activo
   - Modal reutilizable
   - Cards con acordeón (abre 1 a la vez)
   - Copiar texto
   - QUIZ 5 pasos (usa #quizRoot) con tu lógica
========================================= */

(() => {
  // Helpers
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* =========================
     NAVBAR: SCROLL SUAVE + ACTIVO
  ========================= */
  const navLinks = $$(".nav a").filter(a => a.getAttribute("href")?.startsWith("#"));
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = $(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  function setActive(href) {
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === href));
  }

  window.addEventListener("scroll", () => {
    let current = "#cards";
    document.querySelectorAll("main section[id]").forEach(sec => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) current = "#" + sec.id;
    });
    setActive(current);
  }, { passive: true });

  /* =========================
     MODAL
  ========================= */
  const modal = $("#modal");
  const modalTitle = $("#modalTitle");
  const modalDesc = $("#modalDesc");
  const modalBody = $("#modalBody");

  function openModal({ title = "", desc = "", html = "" }) {
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalBody.innerHTML = html;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modalBody.innerHTML = "";
  }

  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]") || e.target.closest("[data-close]") || e.target.classList.contains("modal-backdrop")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
  });

  /* =========================
     CARDS: INFO (ACORDEÓN)
  ========================= */
  const INFO = {
    planes: {
      title: "Planes",
      desc: "Ejemplo de contenido (editá a gusto)",
      items: [
        {
          h: "Tabla rápida (ejemplo)",
          html: `
            <table class="table">
              <thead><tr><th>Plan</th><th>Base mensual</th><th>Notas</th></tr></thead>
              <tbody>
                <tr><td>Plata HD</td><td>$990</td><td>147 canales HD</td></tr>
                <tr><td>Plata HD Promo J</td><td>$890</td><td>Por cupos </td></tr>
                <tr><td>Oro HD</td><td>$1190</td><td>204 canales HD </td></tr>
              </tbody>
            </table>
          `
        },
        {
          h: "Info todos los planes ",
          html: `<p class="small-muted">Todos los planes incluyen un decodificador, Prime Video y DirecTV Go gratis.
En Montevideo incluyen un mes de HBO MAX gratis y en el interior de Universal+, luego quedan a un 40% de descuento</p>`
        }
      ]
    },
    adicionales: {
      title: "Productos adicionales",
      desc: "Ejemplo de contenido",
      items: [
        { h: "GO Box", html: `<p class="small-muted"> Convierte una televisión común en inteligente. Es estilo Chromecast. Se lo damos como alternativa a sumar un decodificador más para no sumar a la cuota mensual. El precio es $500 para P3 y TC y $1000 para P1 y P2. Se paga junto a la tasa de conexión.</p>` },
        { h: "Fútbol uruguayo", html: `<p class="small-muted">Suma $300 a la cuota mensual. Sirve para todas las televisiones que tenga contratadas. No sé puede ver en streaming en DirecTV Go. Tenemos los derechos del fútbol uruguayo en exclusiva. Solo corresponde a campeonato uruguayo. Copas internacionales, Uruguay, copas de otros países se ven sin pagar adicional</p>` }
 { h: "Otros", html: `<p class="small-muted"> Se pueden sumar otros adicionales como globo y otros packs que figuran en DirecTVla.com.uy </p>` },
      ]
    },
    proceso: {
      title: "Proceso de venta",
      desc: "Checklist breve",
      items: [
        { h: "Diagnóstico", html: `<p class="small-muted">TV/decos, plan, extras, forma de pago.</p>` },
        { h: "Cierre", html: `<p class="small-muted">Confirmar total, dirección y fecha de instalación.</p>` }
      ]
    },
    datos: {
      title: "Gestión de datos del cliente",
      desc: "Campos mínimos",
      items: [
        { h: "Datos", html: `<p class="small-muted">Nombre, CI, teléfono, dirección, horario.</p>` }
      ]
    },
    venta: {
      title: "Venta",
      desc: "Guiones cortos",
      items: [
        {
          h: "Mensaje inicial",
          html: `
            <div class="codebox" id="txt_hi">Hola 👋 ¿Qué plan te interesa y cuántos decodificadores necesitás?</div>
            <div class="copyline">
              <button class="btn primary" data-copy="#txt_hi">Copiar</button>
            </div>
          `
        },
        {
          h: "Cierre con total",
          html: `
            <div class="codebox" id="txt_close">Perfecto. Conexión: $X. Cuota mensual total: $Y. ¿Coordinamos instalación?</div>
            <div class="copyline">
              <button class="btn primary" data-copy="#txt_close">Copiar</button>
            </div>
          `
        }
      ]
    },
    sds: {
      title: "SDS",
      desc: "Soporte y escalamiento",
      items: [
        {
          h: "Escalar caso",
          html: `
            <div class="codebox" id="txt_sds">CI + Dirección + Teléfono + Descripción + Fotos (si aplica)</div>
            <div class="copyline">
              <button class="btn primary" data-copy="#txt_sds">Copiar</button>
            </div>
          `
        }
      ]
    }
  };

  function accordionHTML(items) {
    return `
      <div class="acc">
        ${items.map((it, idx) => `
          <div class="acc-item">
            <button class="acc-btn" type="button" aria-expanded="${idx === 0 ? "true" : "false"}">
              <span>${it.h}</span><span class="chev">${idx === 0 ? "−" : "+"}</span>
            </button>
            <div class="acc-panel" ${idx === 0 ? "" : "hidden"}>
              ${it.html}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open-info]");
    if (!btn) return;

    const key = btn.getAttribute("data-open-info");
    const data = INFO[key];
    if (!data) return;

    openModal({
      title: data.title,
      desc: data.desc,
      html: accordionHTML(data.items)
    });
  });

  // acordeón: abre 1 y cierra los demás (dentro del modal)
  document.addEventListener("click", (e) => {
    const accBtn = e.target.closest(".acc-btn");
    if (!accBtn) return;

    const acc = accBtn.closest(".acc");
    if (!acc) return;

    // cerrar todos
    $$(".acc-panel", acc).forEach(p => p.hidden = true);
    $$(".acc-btn", acc).forEach(b => b.setAttribute("aria-expanded", "false"));
    $$(".chev", acc).forEach(c => (c.textContent = "+"));

    // abrir actual
    const panel = accBtn.parentElement.querySelector(".acc-panel");
    if (panel) panel.hidden = false;
    accBtn.setAttribute("aria-expanded", "true");
    const chev = accBtn.querySelector(".chev");
    if (chev) chev.textContent = "−";
  });

  /* =========================
     COPIAR TEXTO
  ========================= */
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;

    const sel = btn.getAttribute("data-copy");
    const target = sel ? $(sel) : null;
    if (!target) return;

    const text = target.textContent.trim();
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
      alert("No se pudo copiar. Copiá manualmente.");
    }
  });

  /* =========================
     QUIZ NUEVO (usa #quizRoot)
     Lógica exacta solicitada
  ========================= */
  const quizRoot = $("#quizRoot");
  const stepLabel = $("#stepLabel");
  const progressBar = $("#progressBar");

  if (!quizRoot || !stepLabel || !progressBar) return;

  // Mensual
  const PLAN_MENSUAL = {
    plata: 990,
    plata_promo_j: 890,
    oro: 1190
  };
  const EXTRA_DECO = 280;
  const FUTBOL_MENSUAL = 300;

  // Conexión según tipo y decos
  function conexionBase(tipo, decos) {
    // tipo: "p12" (P1/P2) o "p3tc" (P3/TC)
    if (decos === 1 || decos === 2) return (tipo === "p12") ? 690 : 0;
    if (decos === 3) return (tipo === "p12") ? 1789 : 1099;
    if (decos === 4) return (tipo === "p12") ? 2888 : 2198;
    return 0;
  }
  function conexionGoBoxExtra(tipo) {
    return (tipo === "p12") ? 1000 : 500;
  }

  let quiz = {
    tipo: null,     // "p12" | "p3tc"
    gobox: null,    // boolean
    futbol: null,   // boolean
    plan: null,     // "plata" | "plata_promo_j" | "oro"
    decos: null     // 1..4
  };
  let step = 0;

  const screens = [
    {
      key: "tipo",
      title: "Pregunta 1 · ¿Tipo de cliente?",
      content: `
        <label class="option">
          <input type="radio" name="tipo" value="p12">
          <span><b>P1 o P2</b></span>
        </label>
        <label class="option">
          <input type="radio" name="tipo" value="p3tc">
          <span><b>P3 o TC</b></span>
        </label>
      `
    },
    {
      key: "gobox",
      title: "Pregunta 2 · ¿Quiere GO Box?",
      content: `
        <label class="option">
          <input type="radio" name="gobox" value="si">
          <span>Sí</span>
        </label>
        <label class="option">
          <input type="radio" name="gobox" value="no">
          <span>No</span>
        </label>
      `
    },
    {
      key: "futbol",
      title: "Pregunta 3 · ¿Quiere Fútbol Uruguayo?",
      content: `
        <label class="option">
          <input type="radio" name="futbol" value="si">
          <span>Sí</span>
        </label>
        <label class="option">
          <input type="radio" name="futbol" value="no">
          <span>No</span>
        </label>
      `
    },
    {
      key: "plan",
      title: "Pregunta 4 · ¿Qué plan desea?",
      content: `
        <label class="option">
          <input type="radio" name="plan" value="plata">
          <span><b>Plata HD</b> — $990 mensual (1 deco)</span>
        </label>
        <label class="option">
          <input type="radio" name="plan" value="plata_promo_j">
          <span><b>Plata HD Promo J</b> — $890 mensual (1 deco)</span>
        </label>
        <label class="option">
          <input type="radio" name="plan" value="oro">
          <span><b>Oro HD</b> — $1190 mensual (1 deco)</span>
        </label>
      `
    },
    {
      key: "decos",
      title: "Pregunta 5 · ¿Cuántos decodificadores quiere?",
      content: `
        <div class="row">
          <label class="chip"><input type="radio" name="decos" value="1"><span>1</span></label>
          <label class="chip"><input type="radio" name="decos" value="2"><span>2</span></label>
          <label class="chip"><input type="radio" name="decos" value="3"><span>3</span></label>
          <label class="chip"><input type="radio" name="decos" value="4"><span>4</span></label>
        </div>
        <p class="hint">Extras: +$${EXTRA_DECO}/mes desde el 2º deco · Fútbol +$${FUTBOL_MENSUAL}/mes.</p>
      `
    }
  ];

  function renderQuiz() {
    const s = screens[step];
    const total = screens.length;

    stepLabel.textContent = `Paso ${step + 1}`;
    progressBar.style.width = `${((step + 1) / total) * 100}%`;

    quizRoot.innerHTML = `
      <h3>${s.title}</h3>
      ${s.content}
      <div class="err" id="quizErr" hidden>Elegí una opción para continuar.</div>
      <div class="actions">
        ${step > 0 ? `<button class="btn" data-back>Atrás</button>` : ``}
        ${step < total - 1
          ? `<button class="btn primary" data-next>Siguiente</button>`
          : `<button class="btn success" data-finish>Ver resultado</button>`
        }
      </div>
    `;

    // Rehidratar selección guardada
    const key = s.key;
    const saved = quiz[key];
    if (saved !== null && saved !== undefined) {
      const val = typeof saved === "boolean" ? (saved ? "si" : "no") : String(saved);
      const input = quizRoot.querySelector(`input[name="${key}"][value="${val}"]`);
      if (input) input.checked = true;
    }
  }

  function setErr(show, msg) {
    const err = $("#quizErr");
    if (!err) return;
    err.textContent = msg || "Elegí una opción para continuar.";
    err.hidden = !show;
  }

  function readCurrentAnswer() {
    const key = screens[step].key;
    const checked = quizRoot.querySelector(`input[name="${key}"]:checked`);
    if (!checked) return null;

    if (key === "decos") return parseInt(checked.value, 10);
    if (key === "gobox" || key === "futbol") return checked.value === "si";
    return checked.value; // tipo, plan
  }

  function computeResult() {
    const tipo = quiz.tipo;
    const decos = quiz.decos;

    let conexion = conexionBase(tipo, decos);
    if (quiz.gobox === true) conexion += conexionGoBoxExtra(tipo);

    const base = PLAN_MENSUAL[quiz.plan] ?? 0;
    const extras = Math.max(0, decos - 1) * EXTRA_DECO;
    let mensual = base + extras;
    if (quiz.futbol === true) mensual += FUTBOL_MENSUAL;

    return { conexion, mensual, base, extras };
  }

  function showResult() {
    const { conexion, mensual, base, extras } = computeResult();

    const tipoLabel = quiz.tipo === "p12" ? "P1 o P2" : "P3 o TC";
    const planLabel = quiz.plan === "plata" ? "Plata HD" : quiz.plan === "plata_promo_j" ? "Plata HD Promo J" : "Oro HD";
    const goConn = quiz.gobox ? conexionGoBoxExtra(quiz.tipo) : 0;
    const connBase = conexionBase(quiz.tipo, quiz.decos);

    openModal({
      title: "Resultado de costos",
      desc: "Costo de conexión y costo mensual calculados",
      html: `
        <div class="panel" style="margin-top:0;">
          <div><b>Costo de conexión:</b> $${conexion}</div>
          <div style="margin-top:8px;"><b>Costo mensual:</b> $${mensual}</div>

          <div style="height:12px"></div>
          <div class="small-muted">Detalle</div>
          <div class="codebox" style="margin-top:8px;">
Tipo de cliente: ${tipoLabel}
Plan: ${planLabel} (base $${base})
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
        resetAll();
      });
    }, 0);
  }

  function resetAll() {
    quiz = { tipo: null, gobox: null, futbol: null, plan: null, decos: null };
    step = 0;
    renderQuiz();
  }

  quizRoot.addEventListener("click", (e) => {
    if (e.target.closest("[data-next]")) {
      setErr(false);
      const ans = readCurrentAnswer();
      if (ans === null) return setErr(true);

      const key = screens[step].key;
      quiz[key] = ans;

      step++;
      renderQuiz();
      return;
    }

    if (e.target.closest("[data-back]")) {
      setErr(false);

      const ans = readCurrentAnswer();
      const key = screens[step].key;
      if (ans !== null) quiz[key] = ans;

      step = Math.max(0, step - 1);
      renderQuiz();
      return;
    }

    if (e.target.closest("[data-finish]")) {
      setErr(false);
      const ans = readCurrentAnswer();
      if (ans === null) return setErr(true);

      quiz[screens[step].key] = ans;

      // Validación final
      if (!quiz.tipo || quiz.gobox === null || quiz.futbol === null || !quiz.plan || !quiz.decos) {
        return setErr(true, "Faltan respuestas. Volvé y completá todo.");
      }

      showResult();
    }
  });

  // Init
  renderQuiz();

})();
