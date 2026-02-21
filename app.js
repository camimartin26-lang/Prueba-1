/* =========================================
   app.js — DIRECTV pro
   - Navbar smooth + active
   - Modal
   - Cards -> modal accordion (1 open)
   - Copy buttons
   - Quiz 5 steps with pricing logic
========================================= */

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    // -------------------------
    // Navbar
    // -------------------------
    const navLinks = $$(".nav a").filter(a => a.getAttribute("href")?.startsWith("#"));
    const sections = navLinks.map(a => $(a.getAttribute("href"))).filter(Boolean);

    navLinks.forEach(a => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const t = $(a.getAttribute("href"));
        if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    function setActive(id){
      navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
    }

    function onScroll(){
      let current = sections[0]?.id || "";
      for (const sec of sections){
        const top = sec.offsetTop - 140;
        if (window.scrollY >= top) current = sec.id;
      }
      if (current) setActive(current);
    }
    window.addEventListener("scroll", onScroll, { passive:true });
    onScroll();

    // -------------------------
    // Modal
    // -------------------------
    const modal = $("#modal");
    const modalTitle = $("#modalTitle");
    const modalDesc = $("#modalDesc");
    const modalBody = $("#modalBody");

    if (!modal || !modalTitle || !modalDesc || !modalBody) return;

    function openModal({ title="", desc="", html="" } = {}){
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalBody.innerHTML = html;
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeModal(){
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      modalBody.innerHTML = "";
    }

    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-close]") || e.target.closest("[data-close]") || e.target.classList.contains("modal-backdrop")){
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
    });

    // -------------------------
    // Cards content (tu texto)
    // -------------------------
    const INFO = {
      planes: {
        title: "Planes",
        desc: "Referencia rápida (editá cuando quieras).",
        items: [
          {
            h: "Tabla rápida",
            html: `
              <table class="table">
                <thead><tr><th>Plan</th><th>Base mensual</th><th>Notas</th></tr></thead>
                <tbody>
                  <tr><td>Plata HD</td><td>$990</td><td>147 canales HD</td></tr>
                  <tr><td>Plata HD Promo J</td><td>$890</td><td>Por cupos</td></tr>
                  <tr><td>Oro HD</td><td>$1190</td><td>204 canales HD</td></tr>
                </tbody>
              </table>
            `
          },
          {
            h: "Info todos los planes",
            html: `<p>Todos los planes incluyen un decodificador, Prime Video y DirecTV Go gratis.
En Montevideo incluyen un mes de HBO MAX gratis y en el interior de Universal+, luego quedan a un 40% de descuento.</p>`
          }
        ]
      },
      adicionales: {
        title: "Productos adicionales",
        desc: "Extras que afectan conexión/mensualidad.",
        items: [
          { h: "GO Box", html: `<p>Convierte una televisión común en inteligente (tipo Chromecast). Alternativa a sumar un deco más para no subir la cuota mensual. Precio: $500 para P3/TC y $1000 para P1/P2. Se paga junto a la tasa de conexión.</p>` },
          { h: "Fútbol uruguayo", html: `<p>Suma $300 a la cuota mensual. Sirve para todas las TVs contratadas. No se puede ver en streaming en DirecTV Go. Derechos en exclusiva para campeonato uruguayo. Copas internacionales / Uruguay / otras ligas se ven sin adicional.</p>` }
        ]
      },
      proceso: {
        title: "Proceso de venta",
        desc: "Checklist breve",
        items: [
          { h: "Diagnóstico", html: `<p>TV/decos, plan, extras, forma de pago.</p>` },
          { h: "Cierre", html: `<p>Confirmar total, dirección y fecha de instalación.</p>` }
        ]
      },
      datos: {
        title: "Gestión de datos del cliente",
        desc: "Campos mínimos",
        items: [
          { h: "Datos", html: `<p>Nombre, CI, teléfono, dirección, horario.</p>` }
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
                <button class="btn btn-primary" data-copy="#txt_hi">Copiar</button>
              </div>
            `
          },
          {
            h: "Cierre con total",
            html: `
              <div class="codebox" id="txt_close">Perfecto. Conexión: $X. Cuota mensual total: $Y. ¿Coordinamos instalación?</div>
              <div class="copyline">
                <button class="btn btn-primary" data-copy="#txt_close">Copiar</button>
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
                <button class="btn btn-primary" data-copy="#txt_sds">Copiar</button>
              </div>
            `
          }
        ]
      }
    };

    function accordionHTML(items){
      return `
        <div class="acc">
          ${items.map((it, idx) => `
            <div class="acc-item">
              <button class="acc-btn" type="button" aria-expanded="${idx === 0 ? "true" : "false"}">
                <span>${it.h}</span><span class="chev">${idx === 0 ? "−" : "+"}</span>
              </button>
              <div class="acc-panel" ${idx === 0 ? "" : "hidden"}>${it.html}</div>
            </div>
          `).join("")}
        </div>
      `;
    }

    // Open modal from cards
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-open-info]");
      if (!btn) return;
      const key = btn.getAttribute("data-open-info");
      const data = INFO[key];
      if (!data) return;

      openModal({ title: data.title, desc: data.desc, html: accordionHTML(data.items) });
    });

    // Accordion: 1 open at a time
    document.addEventListener("click", (e) => {
      const accBtn = e.target.closest(".acc-btn");
      if (!accBtn) return;
      const acc = accBtn.closest(".acc");
      if (!acc) return;

      const panel = accBtn.parentElement.querySelector(".acc-panel");
      if (!panel) return;

      // close all
      $$(".acc-panel", acc).forEach(p => p.hidden = true);
      $$(".acc-btn", acc).forEach(b => b.setAttribute("aria-expanded","false"));
      $$(".chev", acc).forEach(c => c.textContent = "+");

      // open selected
      panel.hidden = false;
      accBtn.setAttribute("aria-expanded","true");
      const chev = accBtn.querySelector(".chev");
      if (chev) chev.textContent = "−";
    });

    // Copy
    document.addEventListener("click", async (e) => {
      const btn = e.target.closest("[data-copy]");
      if (!btn) return;
      const sel = btn.getAttribute("data-copy");
      const el = sel ? $(sel) : null;
      if (!el) return;

      const text = el.textContent.trim();
      if (!text) return;

      try{
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

    // -------------------------
    // QUIZ
    // -------------------------
    const quizRoot = $("#quizRoot");
    const stepLabel = $("#stepLabel");
    const progressBar = $("#progressBar");
    if (!quizRoot || !stepLabel || !progressBar) return;

    const PLAN_MENSUAL = { plata: 990, plata_promo_j: 890, oro: 1190 };
    const EXTRA_DECO = 280;
    const FUTBOL_MENSUAL = 300;

    function conexionBase(tipo, decos){
      if (decos === 1 || decos === 2) return (tipo === "p12") ? 690 : 0;
      if (decos === 3) return (tipo === "p12") ? 1789 : 1099;
      if (decos === 4) return (tipo === "p12") ? 2888 : 2198;
      return 0;
    }
    function conexionGoBoxExtra(tipo){
      return (tipo === "p12") ? 1000 : 500;
    }

    let quiz = { tipo:null, gobox:null, futbol:null, plan:null, decos:null };
    let step = 0;

    const screens = [
      {
        key:"tipo",
        title:"Pregunta 1 · ¿Tipo de cliente?",
        content: `
          <label class="option"><input type="radio" name="tipo" value="p12"><span><b>P1 o P2</b></span></label>
          <label class="option"><input type="radio" name="tipo" value="p3tc"><span><b>P3 o TC</b></span></label>
        `
      },
      {
        key:"gobox",
        title:"Pregunta 2 · ¿Quiere GO Box?",
        content: `
          <label class="option"><input type="radio" name="gobox" value="si"><span>Sí</span></label>
          <label class="option"><input type="radio" name="gobox" value="no"><span>No</span></label>
        `
      },
      {
        key:"futbol",
        title:"Pregunta 3 · ¿Quiere Fútbol Uruguayo?",
        content: `
          <label class="option"><input type="radio" name="futbol" value="si"><span>Sí</span></label>
          <label class="option"><input type="radio" name="futbol" value="no"><span>No</span></label>
        `
      },
      {
        key:"plan",
        title:"Pregunta 4 · ¿Qué plan desea?",
        content: `
          <label class="option"><input type="radio" name="plan" value="plata"><span><b>Plata HD</b> — $990 (1 deco)</span></label>
          <label class="option"><input type="radio" name="plan" value="plata_promo_j"><span><b>Plata HD Promo J</b> — $890 (1 deco)</span></label>
          <label class="option"><input type="radio" name="plan" value="oro"><span><b>Oro HD</b> — $1190 (1 deco)</span></label>
        `
      },
      {
        key:"decos",
        title:"Pregunta 5 · ¿Cuántos decodificadores quiere?",
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

    function renderQuiz(){
      const s = screens[step];
      const total = screens.length;

      stepLabel.textContent = `Paso ${step + 1}`;
      progressBar.style.width = `${((step + 1) / total) * 100}%`;

      quizRoot.innerHTML = `
        <div class="quiz-screen">
          <h3>${s.title}</h3>
          ${s.content}
          <div class="err" id="quizErr" hidden>Elegí una opción para continuar.</div>
          <div class="actions">
            ${step > 0 ? `<button class="btn" data-back>Atrás</button>` : ``}
            ${step < total - 1
              ? `<button class="btn btn-primary" data-next>Siguiente</button>`
              : `<button class="btn btn-primary" data-finish>Ver resultado</button>`
            }
          </div>
        </div>
      `;

      // rehidratar
      const saved = quiz[s.key];
      if (saved !== null && saved !== undefined){
        const val = typeof saved === "boolean" ? (saved ? "si" : "no") : String(saved);
        const input = quizRoot.querySelector(`input[name="${s.key}"][value="${val}"]`);
        if (input) input.checked = true;
      }
    }

    function setErr(show, msg){
      const err = $("#quizErr");
      if (!err) return;
      err.textContent = msg || "Elegí una opción para continuar.";
      err.hidden = !show;
    }

    function readAnswer(){
      const key = screens[step].key;
      const checked = quizRoot.querySelector(`input[name="${key}"]:checked`);
      if (!checked) return null;

      if (key === "decos") return parseInt(checked.value, 10);
      if (key === "gobox" || key === "futbol") return checked.value === "si";
      return checked.value; // tipo/plan
    }

    function computeResult(){
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

    function showResult(){
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
            <div class="muted">Detalle</div>
            <div class="codebox" style="margin-top:8px;">
Tipo de cliente: ${tipoLabel}
Plan: ${planLabel} (base $${base})
Decodificadores: ${quiz.decos} (extras mensual $${extras})
GO Box: ${quiz.gobox ? "Sí" : "No"} (extra conexión $${goConn})
Fútbol uruguayo: ${quiz.futbol ? "Sí" : "No"} (extra mensual $${quiz.futbol ? FUTBOL_MENSUAL : 0})
Conexión base: $${connBase}
            </div>

            <div class="copyline">
              <button class="btn btn-primary" id="resetQuizBtn">Reiniciar quiz</button>
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

    function resetAll(){
      quiz = { tipo:null, gobox:null, futbol:null, plan:null, decos:null };
      step = 0;
      renderQuiz();
    }

    quizRoot.addEventListener("click", (e) => {
      if (e.target.closest("[data-next]")){
        setErr(false);
        const ans = readAnswer();
        if (ans === null) return setErr(true);

        quiz[screens[step].key] = ans;
        step = Math.min(step + 1, screens.length - 1);
        renderQuiz();
        return;
      }

      if (e.target.closest("[data-back]")){
        setErr(false);
        const ans = readAnswer();
        if (ans !== null) quiz[screens[step].key] = ans;

        step = Math.max(0, step - 1);
        renderQuiz();
        return;
      }

      if (e.target.closest("[data-finish]")){
        setErr(false);
        const ans = readAnswer();
        if (ans === null) return setErr(true);

        quiz[screens[step].key] = ans;

        if (!quiz.tipo || quiz.gobox === null || quiz.futbol === null || !quiz.plan || !quiz.decos){
          return setErr(true, "Faltan respuestas. Volvé y completá todo.");
        }

        showResult();
      }
    });

    renderQuiz();
  });
})();
