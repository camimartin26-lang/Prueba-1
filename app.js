/* =========================================
   APP.JS COMPLETO
   - Navbar scroll + activo
   - Modal reutilizable
   - Cards con acordeón
   - Copiar texto
   - QUIZ 5 pasos (usa #quizRoot)
========================================= */

(() => {

  /* =========================
     HELPERS
  ========================= */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* =========================
     NAVBAR ACTIVO + SCROLL
  ========================= */
  const navLinks = $$(".nav a");

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = $(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  window.addEventListener("scroll", () => {
    let current = "";
    document.querySelectorAll("section").forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + current
      );
    });
  });

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
  }

  document.addEventListener("click", e => {
    if (e.target.matches("[data-close]") || e.target.classList.contains("modal-backdrop")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  /* =========================
     CARDS CON ACORDEÓN
  ========================= */
  const INFO = {
    planes: {
      title: "Planes",
      desc: "Información de planes",
      items: [
        { h: "Plata HD", html: "<p>Plan base ideal para hogares pequeños.</p>" },
        { h: "Oro HD", html: "<p>Mayor cantidad de señales y contenido premium.</p>" }
      ]
    },
    adicionales: {
      title: "Productos adicionales",
      desc: "Extras disponibles",
      items: [
        { h: "GO Box", html: "<p>Permite usar apps y streaming.</p>" },
        { h: "Fútbol Uruguayo", html: "<p>Pack exclusivo de fútbol local.</p>" }
      ]
    },
    proceso: {
      title: "Proceso de venta",
      desc: "Guía paso a paso",
      items: [
        { h: "Diagnóstico", html: "<p>Consultar TV, contenido y presupuesto.</p>" },
        { h: "Cierre", html: "<p>Confirmar total mensual y fecha instalación.</p>" }
      ]
    },
    datos: {
      title: "Gestión de datos",
      desc: "Información necesaria",
      items: [
        { h: "Datos mínimos", html: "<p>Nombre, CI, Dirección, Teléfono.</p>" }
      ]
    },
    venta: {
      title: "Guiones de venta",
      desc: "Mensajes rápidos",
      items: [
        {
          h: "Mensaje inicial",
          html: `
            <div class="codebox" id="txt1">Hola 👋 ¿Qué plan te interesa y cuántos decos?</div>
            <button class="btn primary" data-copy="#txt1">Copiar</button>
          `
        }
      ]
    },
    sds: {
      title: "SDS",
      desc: "Soporte y escalamiento",
      items: [
        { h: "Escalar caso", html: "<p>Enviar CI + Dirección + Problema.</p>" }
      ]
    }
  };

  function buildAccordion(items) {
    return items.map((item, i) => `
      <div class="acc-item">
        <button class="acc-btn">${item.h}</button>
        <div class="acc-panel" ${i !== 0 ? "hidden" : ""}>
          ${item.html}
        </div>
      </div>
    `).join("");
  }

  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-open-info]");
    if (!btn) return;

    const key = btn.getAttribute("data-open-info");
    const data = INFO[key];
    if (!data) return;

    openModal({
      title: data.title,
      desc: data.desc,
      html: `<div class="acc">${buildAccordion(data.items)}</div>`
    });
  });

  document.addEventListener("click", e => {
    if (e.target.classList.contains("acc-btn")) {
      const panel = e.target.nextElementSibling;
      panel.hidden = !panel.hidden;
    }
  });

  /* =========================
     COPIAR TEXTO
  ========================= */
  document.addEventListener("click", async e => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;
    const target = $(btn.getAttribute("data-copy"));
    if (!target) return;

    await navigator.clipboard.writeText(target.textContent.trim());
    btn.textContent = "Copiado ✅";
    setTimeout(() => btn.textContent = "Copiar", 1000);
  });

  /* =========================
     QUIZ NUEVO (usa #quizRoot)
  ========================= */
  const quizRoot = $("#quizRoot");
  const stepLabel = $("#stepLabel");
  const progressBar = $("#progressBar");

  if (!quizRoot) return;

  const PLAN_MENSUAL = {
    plata: 990,
    plata_promo_j: 890,
    oro: 1190
  };

  const EXTRA_DECO = 280;
  const FUTBOL = 300;

  function conexionBase(tipo, decos) {
    if (decos === 1 || decos === 2)
      return tipo === "p12" ? 690 : 0;
    if (decos === 3)
      return tipo === "p12" ? 1789 : 1099;
    if (decos === 4)
      return tipo === "p12" ? 2888 : 2198;
    return 0;
  }

  function conexionGo(tipo) {
    return tipo === "p12" ? 1000 : 500;
  }

  let quiz = {};
  let step = 0;

  const screens = [
    {
      html: `
        <h3>¿Tipo de cliente?</h3>
        <label><input type="radio" name="tipo" value="p12"> P1 o P2</label>
        <label><input type="radio" name="tipo" value="p3tc"> P3 o TC</label>
        <button class="btn primary next">Siguiente</button>
      `
    },
    {
      html: `
        <h3>¿Quiere GO Box?</h3>
        <label><input type="radio" name="gobox" value="si"> Sí</label>
        <label><input type="radio" name="gobox" value="no"> No</label>
        <button class="btn back">Atrás</button>
        <button class="btn primary next">Siguiente</button>
      `
    },
    {
      html: `
        <h3>¿Quiere Fútbol Uruguayo?</h3>
        <label><input type="radio" name="futbol" value="si"> Sí</label>
        <label><input type="radio" name="futbol" value="no"> No</label>
        <button class="btn back">Atrás</button>
        <button class="btn primary next">Siguiente</button>
      `
    },
    {
      html: `
        <h3>¿Qué plan desea?</h3>
        <label><input type="radio" name="plan" value="plata"> Plata HD ($990)</label>
        <label><input type="radio" name="plan" value="plata_promo_j"> Plata HD Promo J ($890)</label>
        <label><input type="radio" name="plan" value="oro"> Oro HD ($1190)</label>
        <button class="btn back">Atrás</button>
        <button class="btn primary next">Siguiente</button>
      `
    },
    {
      html: `
        <h3>¿Cuántos decodificadores?</h3>
        <label><input type="radio" name="decos" value="1"> 1</label>
        <label><input type="radio" name="decos" value="2"> 2</label>
        <label><input type="radio" name="decos" value="3"> 3</label>
        <label><input type="radio" name="decos" value="4"> 4</label>
        <button class="btn back">Atrás</button>
        <button class="btn success finish">Ver resultado</button>
      `
    }
  ];

  function render() {
    quizRoot.innerHTML = screens[step].html;
    stepLabel.textContent = `Paso ${step + 1}`;
    progressBar.style.width = ((step + 1) / screens.length) * 100 + "%";
  }

  quizRoot.addEventListener("click", e => {
    if (e.target.classList.contains("next")) {
      const inputs = quizRoot.querySelectorAll("input:checked");
      if (inputs.length === 0) return;
      quiz[inputs[0].name] = inputs[0].value;
      step++;
      render();
    }

    if (e.target.classList.contains("back")) {
      step--;
      render();
    }

    if (e.target.classList.contains("finish")) {
      const val = quizRoot.querySelector("input:checked");
      if (!val) return;
      quiz[val.name] = val.value;

      const tipo = quiz.tipo;
      const decos = parseInt(quiz.decos);
      let conexion = conexionBase(tipo, decos);
      if (quiz.gobox === "si") conexion += conexionGo(tipo);

      let mensual = PLAN_MENSUAL[quiz.plan];
      mensual += (decos - 1) * EXTRA_DECO;
      if (quiz.futbol === "si") mensual += FUTBOL;

      openModal({
        title: "Resultado",
        desc: "Costo calculado",
        html: `
          <div class="panel">
            <div><b>Costo de conexión:</b> $${conexion}</div>
            <div><b>Costo mensual:</b> $${mensual}</div>
            <button class="btn primary" data-close>Cerrar</button>
          </div>
        `
      });
    }
  });

  render();

})();
