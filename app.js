// ===============================
// DATA: contenido de cada Card (modal con acordeón)
// ===============================
const INFO = {
  planes: {
    title: "Planes",
    desc: "Ejemplos: tabla rápida + preguntas para recomendar + tip de cierre",
    items: [
      {
        h: "Tabla rápida de planes (ejemplo)",
        html: `
          <p>Usá esto como plantilla. Cambiá nombres y precios reales.</p>
          <table class="table">
            <thead>
              <tr>
                <th>Plan</th><th>Ideal para</th><th>Gancho</th><th>Upsell</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Plata HD</b></td>
                <td>Hogar chico</td>
                <td>Precio/beneficio</td>
                <td>+ 2do deco / GO Box</td>
              </tr>
              <tr>
                <td><b>Oro HD</b></td>
                <td>Familias</td>
                <td>Más señales</td>
                <td>Fútbol / pack premium</td>
              </tr>
              <tr>
                <td><b>Premium</b></td>
                <td>Exigentes</td>
                <td>“Todo incluido”</td>
                <td>MultiTV + extras</td>
              </tr>
            </tbody>
          </table>
        `
      },
      {
        h: "Preguntas para recomendar bien",
        html: `
          <p>Checklist rápido:</p>
          <ul>
            <li>¿Cuántos TV y habitaciones?</li>
            <li>¿Qué miran más: fútbol, series, infantil?</li>
            <li>¿Prioriza precio o contenido?</li>
            <li>¿Tiene buen internet para sumar streaming?</li>
          </ul>
        `
      },
      {
        h: "Tip de cierre",
        html: `
          <p>Terminá con el total mensual + razón:</p>
          <div class="codebox">Te recomiendo este plan porque se ajusta a lo que miran y te queda el total mensual claro.</div>
        `
      }
    ]
  },

  adicionales: {
    title: "Productos adicionales",
    desc: "GO Box, fútbol uruguayo, decos extra y cómo ofrecer",
    items: [
      {
        h: "Adicionales típicos (ejemplo)",
        html: `
          <ul>
            <li><b>GO Box</b>: suma apps/streaming (+$300/mes ejemplo)</li>
            <li><b>Fútbol uruguayo</b>: cierre emocional (+$450/mes ejemplo)</li>
            <li><b>Decos extra</b>: multiTV (+$200/mes c/u ejemplo)</li>
          </ul>
        `
      },
      {
        h: "Mini guión para ofrecer",
        html: `
          <p>Uno y simple (sin saturar):</p>
          <div class="codebox" id="txt_offer">¿Te interesa sumar GO Box o fútbol uruguayo? Así te paso el total mensual.</div>
          <div class="copyline">
            <button class="btn primary" data-copy="#txt_offer">Copiar</button>
            <span class="small-muted">Listo para WhatsApp.</span>
          </div>
        `
      }
    ]
  },

  proceso: {
    title: "Proceso de venta",
    desc: "Diagnóstico → propuesta → objeciones → cierre → seguimiento",
    items: [
      {
        h: "Paso 1: Diagnóstico (preguntas clave)",
        html: `
          <ul>
            <li>Dirección completa + referencias</li>
            <li>Cantidad de TV/decos</li>
            <li>Interés principal (fútbol/series/infantil)</li>
            <li>Forma de pago</li>
          </ul>
        `
      },
      {
        h: "Paso 2: Propuesta (en 1 mensaje)",
        html: `
          <div class="codebox" id="txt_prop">Plan + Decos + Adicional (si aplica)\nConexión: $X\nCuota mensual total: $Y\nInstalación: día/horario</div>
          <div class="copyline">
            <button class="btn primary" data-copy="#txt_prop">Copiar</button>
            <span class="small-muted">Estructura de oferta.</span>
          </div>
        `
      },
      {
        h: "Paso 3: Objeciones rápidas",
        html: `
          <ul>
            <li><b>Precio</b>: “Lo ajusto al presupuesto y te dejo el total mensual claro.”</li>
            <li><b>Instalación</b>: “Coordino en la franja que te sirva.”</li>
            <li><b>Dudas</b>: “Te lo resumo en 1 mensaje: conexión + total mensual.”</li>
          </ul>
        `
      }
    ]
  },

  datos: {
    title: "Gestión datos del cliente",
    desc: "Campos mínimos + estado del lead (ejemplo)",
    items: [
      {
        h: "Campos mínimos",
        html: `
          <ul>
            <li>Nombre y apellido</li>
            <li>Documento</li>
            <li>Teléfono/WhatsApp</li>
            <li>Dirección completa + referencia</li>
            <li>Horario preferido</li>
          </ul>
        `
      },
      {
        h: "Seguimiento (estado)",
        html: `
          <p>Ejemplo de estado interno:</p>
          <div class="codebox">Nuevo → Cotizado → Pendiente confirmación → Agendado → Instalado</div>
        `
      }
    ]
  },

  venta: {
    title: "Venta",
    desc: "Guiones listos + copiar/pegar",
    items: [
      {
        h: "Mensaje inicial",
        html: `
          <div class="codebox" id="txt_hi">Hola 👋 ¿Cuántos televisores querés conectar y qué miran más: fútbol, series o infantil?</div>
          <div class="copyline">
            <button class="btn primary" data-copy="#txt_hi">Copiar</button>
          </div>
        `
      },
      {
        h: "Cierre con total mensual",
        html: `
          <div class="codebox" id="txt_close">Perfecto. Conexión: $X. Cuota mensual total: $Y. ¿Te sirve coordinar instalación esta semana?</div>
          <div class="copyline">
            <button class="btn primary" data-copy="#txt_close">Copiar</button>
          </div>
        `
      },
      {
        h: "Objeción: “lo pienso”",
        html: `
          <div class="codebox" id="txt_think">Dale 😊 ¿qué te gustaría definir para decidir: precio, instalación o contenido? Te lo dejo clarito en 1 mensaje.</div>
          <div class="copyline">
            <button class="btn primary" data-copy="#txt_think">Copiar</button>
          </div>
        `
      }
    ]
  },

  sds: {
    title: "SDS",
    desc: "Soporte, fallas comunes y escalamiento",
    items: [
      {
        h: "Checklist previo a instalación",
        html: `
          <ul>
            <li>Dirección + referencia</li>
            <li>Contacto en domicilio</li>
            <li>Horario disponible</li>
            <li>Acceso a lugar de instalación</li>
          </ul>
        `
      },
      {
        h: "Escalamiento (qué enviar)",
        html: `
          <div class="codebox">CI + Dirección + Teléfono + Descripción + Cuándo empezó + Fotos (si aplica)</div>
        `
      }
    ]
  }
};

// ===============================
// MODAL + ACORDEÓN
// ===============================
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalBody = document.getElementById("modalBody");

function openModal() {
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  modalBody.innerHTML = "";
}

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
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      panel.hidden = expanded;
      btn.querySelector(".chev").textContent = expanded ? "+" : "−";
    });

    item.appendChild(btn);
    item.appendChild(panel);
    wrap.appendChild(item);
  });

  return wrap;
}

document.addEventListener("click", async (e) => {
  // Abrir info
  const openBtn = e.target.closest("[data-open-info]");
  if (openBtn) {
    const key = openBtn.getAttribute("data-open-info");
    const data = INFO[key];

    modalTitle.textContent = data?.title || "Info";
    modalDesc.textContent = data?.desc || "";
    modalBody.innerHTML = "";
    modalBody.appendChild(buildAccordion(data?.items || []));

    openModal();
    return;
  }

  // Cerrar modal
  if (e.target.matches("[data-close]")) {
    closeModal();
    return;
  }

  // Copiar
  const copyBtn = e.target.closest("[data-copy]");
  if (copyBtn) {
    const sel = copyBtn.getAttribute("data-copy");
    const el = document.querySelector(sel);
    const text = el ? el.textContent : "";
    try {
      await navigator.clipboard.writeText(text.trim());
      const old = copyBtn.textContent;
      copyBtn.textContent = "Copiado ✅";
      setTimeout(() => (copyBtn.textContent = old), 900);
    } catch {
      alert("No se pudo copiar. Copiá manualmente.");
    }
  }
});

// Cerrar con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
});

// ===============================
// QUIZ (3 pasos) + RESULTADO EN MODAL
// Reutilizamos el mismo modal para mostrar resultado.
// ===============================
const stepLabel = document.getElementById("stepLabel");
const progressBar = document.getElementById("progressBar");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const err1 = document.getElementById("err1");
const err2 = document.getElementById("err2");

const next1 = document.getElementById("next1");
const next2 = document.getElementById("next2");
const back2 = document.getElementById("back2");
const back3 = document.getElementById("back3");
const finish = document.getElementById("finish");

const PRICES = {
  p1: { conexion: 1000, base: 1200, label: "P1" },
  p2: { conexion: 800, base: 1350, label: "P2" },
  p3: { conexion: 1200, base: 1600, label: "P3" },
  tarjeta: { conexion: 900, base: 1450, label: "Tarjeta" },
  decoExtraMensual: 200,
  goBox: 300,
  futbol: 450
};

let quiz = { tipo: null, decos: null, goBox: false, futbol: false };

function showQuizStep(n) {
  step1.hidden = n !== 1;
  step2.hidden = n !== 2;
  step3.hidden = n !== 3;

  stepLabel.textContent = `Paso ${n}`;
  progressBar.style.width = `${n * 33.333}%`;

  err1.hidden = true;
  err2.hidden = true;
}

function getTipo() {
  return document.querySelector('input[name="tipoCliente"]:checked')?.value || null;
}
function getDecos() {
  const v = document.querySelector('input[name="decos"]:checked')?.value || null;
  return v ? parseInt(v, 10) : null;
}

function resetQuiz() {
  document.querySelectorAll('input[name="tipoCliente"]').forEach(i => i.checked = false);
  document.querySelectorAll('input[name="decos"]').forEach(i => i.checked = false);
  document.getElementById("gobox").checked = false;
  document.getElementById("futbol").checked = false;
  quiz = { tipo: null, decos: null, goBox: false, futbol: false };
  showQuizStep(1);
}

next1.addEventListener("click", () => {
  const tipo = getTipo();
  if (!tipo || !PRICES[tipo]) {
    err1.hidden = false;
    return;
  }
  quiz.tipo = tipo;
  showQuizStep(2);
});

back2.addEventListener("click", () => showQuizStep(1));

next2.addEventListener("click", () => {
  const decos = getDecos();
  if (!decos || decos < 1) {
    err2.hidden = false;
    return;
  }
  quiz.decos = decos;
  showQuizStep(3);
});

back3.addEventListener("click", () => showQuizStep(2));

finish.addEventListener("click", () => {
  // Validación final (por si el usuario llega raro)
  quiz.tipo = quiz.tipo || getTipo();
  quiz.decos = quiz.decos || getDecos();

  if (!quiz.tipo || !PRICES[quiz.tipo]) {
    showQuizStep(1);
    err1.hidden = false;
    return;
  }
  if (!quiz.decos || quiz.decos < 1) {
    showQuizStep(2);
    err2.hidden = false;
    return;
  }

  quiz.goBox = document.getElementById("gobox").checked;
  quiz.futbol = document.getElementById("futbol").checked;

  const plan = PRICES[quiz.tipo];
  const conexion = plan.conexion;

  const decosExtra = Math.max(0, quiz.decos - 1);
  const costoDecos = decosExtra * PRICES.decoExtraMensual;
  const costoGoBox = quiz.goBox ? PRICES.goBox : 0;
  const costoFutbol = quiz.futbol ? PRICES.futbol : 0;

  const mensual = plan.base + costoDecos + costoGoBox + costoFutbol;

  // Mostrar en el mismo modal (simple y corto)
  modalTitle.textContent = "Resultado de costos";
  modalDesc.textContent = "Conexión + cuota mensual total (ejemplo)";
  modalBody.innerHTML = `
    <div class="panel" style="margin-top:0;">
      <div><b>Precio conexión:</b> $${conexion}</div>
      <div style="margin-top:6px;"><b>Cuota mensual:</b> $${mensual}</div>
      <hr style="border:none;border-top:1px solid var(--border);margin:12px 0;">
      <div class="small-muted" style="margin-bottom:6px;">Detalle</div>
      <div class="codebox">
Tipo: ${plan.label} (base $${plan.base})
Decodificadores: ${quiz.decos} (extras ${decosExtra} → $${costoDecos})
GO Box: ${quiz.goBox ? "Sí" : "No"} (${costoGoBox})
Fútbol uruguayo: ${quiz.futbol ? "Sí" : "No"} (${costoFutbol})
      </div>
      <div class="copyline">
        <button class="btn primary" id="btnResetQuiz">Reiniciar quiz</button>
        <button class="btn" data-close>Cerrar</button>
      </div>
    </div>
  `;

  openModal();

  // Reset desde el modal
  setTimeout(() => {
    const b = document.getElementById("btnResetQuiz");
    if (b) b.addEventListener("click", () => {
      closeModal();
      resetQuiz();
    });
  }, 0);
});

// Start
showQuizStep(1);