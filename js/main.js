/* Festival Palabras que Convergen — interacción de la landing */
(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  // Resalta la búsqueda dentro de un texto, ignorando tildes y mayúsculas.
  function resaltar(texto, q) {
    if (!q) return esc(texto);
    const i = norm(texto).indexOf(q);
    if (i < 0 || norm(texto).length !== texto.length) return esc(texto);
    return esc(texto.slice(0, i)) + "<mark>" + esc(texto.slice(i, i + q.length)) + "</mark>" + esc(texto.slice(i + q.length));
  }

  /* ---------- Menú móvil ---------- */
  const burger = $("#burger"), nav = $("#nav");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) { nav.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); }
  });

  /* ---------- Cuenta regresiva ---------- */
  const inicio = new Date(CONFIG.inicio).getTime();
  const fin = new Date("2026-11-07T13:00:00-05:00").getTime();
  const count = $("#count");
  function tick() {
    const ahora = Date.now();
    let d = inicio - ahora;
    if (d <= 0) {
      count.classList.add("is-live");
      count.innerHTML = "<div>" + (ahora < fin ? "¡El festival está en marcha!" : "Gracias por converger con nosotros") + "</div>";
      clearInterval(timer);
      return;
    }
    const p = (n) => String(n).padStart(2, "0");
    $("#cd-d").textContent = Math.floor(d / 864e5);
    $("#cd-h").textContent = p(Math.floor(d / 36e5) % 24);
    $("#cd-m").textContent = p(Math.floor(d / 6e4) % 60);
    $("#cd-s").textContent = p(Math.floor(d / 1e3) % 60);
  }
  const timer = setInterval(tick, 1000);
  tick();

  /* ---------- Ponentes (se derivan del programa) ---------- */
  const mapa = new Map();
  PROGRAMA.forEach((b) => b.sesiones.forEach((s) => {
    s.p.concat(s.mod ? [s.mod] : []).forEach((n) => {
      if (ANFITRIONES.includes(n)) return;
      if (!mapa.has(n)) mapa.set(n, { nombre: n, n: 0, pais: PAIS_SEDE, ...(PERFILES[n] || {}) });
      mapa.get(n).n++;
    });
  }));
  // Primero quienes tienen foto, luego quienes tienen reseña; dentro de cada grupo, por número de actividades.
  const ponentes = [...mapa.values()].sort((a, b) => (!!b.foto - !!a.foto) || (!!b.bio - !!a.bio) || (b.n - a.n) || a.nombre.localeCompare(b.nombre, "es"));
  const INICIAL = 12;
  let verTodos = false, paisSel = "";

  const iniciales = (n) => n.replace(/«.*?»/g, "").trim().split(/\s+/).filter((w) => /^[A-ZÁÉÍÓÚÑ]/.test(w)).slice(0, 2).map((w) => w[0]).join("");

  function pintarPonentes() {
    const q = norm($("#buscar-ponente").value.trim());
    let lista = ponentes.filter((p) => (!q || norm(p.nombre + " " + (p.alias || "")).includes(q)) && (!paisSel || p.pais === paisSel));
    const total = lista.length;
    if (!q && !paisSel && !verTodos) lista = lista.slice(0, INICIAL);
    $("#people").innerHTML = lista.length ? lista.map((p) => `
      <article class="person">
        <div class="person__top">
          ${p.foto
            ? `<img class="avatar avatar--foto" src="${esc(p.foto)}" alt="Retrato de ${esc(p.nombre)}" width="400" height="400" loading="lazy">`
            : `<div class="avatar avatar--${ponentes.indexOf(p) % 4}" aria-hidden="true">${esc(iniciales(p.nombre))}</div>`}
          <div>
            <h3>${resaltar(p.nombre, q)}</h3>
            ${p.alias ? `<p class="person__alias">«${esc(p.alias)}»</p>` : ""}
            ${p.pais ? `<p class="person__pais">${esc(p.pais)}</p>` : ""}
          </div>
        </div>
        ${p.bio ? `<p class="person__bio">${esc(p.bio)}</p>` : ""}
        <button class="link" data-ponente="${esc(p.nombre)}">Ver en la agenda (${p.n}) →</button>
      </article>`).join("") : `<p class="empty">No encontramos a nadie con ese nombre.</p>`;
    const btn = $("#ver-todos");
    btn.hidden = !!q || !!paisSel || total <= INICIAL;
    btn.textContent = verTodos ? "Ver menos" : `Ver las ${total} voces invitadas`;
  }
  $("#buscar-ponente").addEventListener("input", pintarPonentes);

  // Filtro por país: primero el país sede, luego los demás por orden alfabético.
  const paises = [...new Set(ponentes.map((p) => p.pais).filter(Boolean))].sort((a, b) => (b === PAIS_SEDE) - (a === PAIS_SEDE) || a.localeCompare(b, "es"));
  function pintarPaises() {
    $("#chips-pais").innerHTML = [""].concat(paises).map((p) => {
      const n = p ? ponentes.filter((x) => x.pais === p).length : ponentes.length;
      return `<button type="button" class="chip" data-pais="${esc(p)}" aria-pressed="${paisSel === p}">${esc(p || "Todos los países")} (${n})</button>`;
    }).join("");
  }
  $("#chips-pais").addEventListener("click", (e) => {
    const b = e.target.closest("[data-pais]");
    if (b) { paisSel = b.dataset.pais; pintarPaises(); pintarPonentes(); }
  });
  $("#st-pais").textContent = PAISES.length;
  $("#banderas").innerHTML = PAISES.map((p) => `<img src="assets/banderas/${BANDERAS[p]}.svg" alt="${esc(p)}" title="${esc(p)}" width="20" height="20">`).join("");
  $("#txt-paises").textContent = "Voces de " + PAISES.slice(0, -1).join(", ") + " y " + PAISES[PAISES.length - 1] + ".";
  $("#ver-todos").addEventListener("click", () => {
    verTodos = !verTodos;
    pintarPonentes();
    if (!verTodos) $("#ponentes").scrollIntoView();
  });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-ponente]");
    if (!b) return;
    estado.jor = ""; estado.dia = 0; estado.esc = "";
    $("#buscar-agenda").value = b.dataset.ponente;
    pintarAgenda();
    $("#agenda").scrollIntoView();
  });

  /* ---------- Carrusel de voces destacadas ---------- */
  const track = $("#feat-track");
  track.innerHTML = DESTACADOS.filter((d) => mapa.has(d.nombre)).map((d, i) => {
    const p = mapa.get(d.nombre);
    return `
      <article class="fcard">
        <div class="fcard__img fcard__img--${i % 4}">
          ${p.foto ? `<img src="${esc(p.foto)}" alt="Retrato de ${esc(p.nombre)}" width="400" height="400" loading="lazy">` : `<span aria-hidden="true">${esc(iniciales(p.nombre))}</span>`}
          ${p.pais ? `<b class="fcard__pais">${esc(p.pais)}</b>` : ""}
        </div>
        <div class="fcard__body">
          <p class="fcard__rol">${esc(d.rol)}</p>
          <h3>${esc(p.nombre)}</h3>
          ${p.bio ? `<p class="fcard__bio">${esc(p.bio)}</p>` : ""}
          <button class="link" data-ponente="${esc(p.nombre)}">Ver en la agenda (${p.n}) →</button>
        </div>
      </article>`;
  }).join("");

  // Avanza una tarjeta; al llegar al final vuelve al inicio.
  function mover(dir) {
    const paso = track.firstElementChild.getBoundingClientRect().width + 20;
    const fin = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    if (dir > 0 && fin) track.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir < 0 && track.scrollLeft <= 4) track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
    else track.scrollBy({ left: dir * paso, behavior: "smooth" });
  }
  $("#feat-prev").addEventListener("click", () => mover(-1));
  $("#feat-next").addEventListener("click", () => mover(1));
  let enPausa = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!enPausa) {
    const sec = $("#destacados");
    ["mouseenter", "focusin", "touchstart"].forEach((ev) => sec.addEventListener(ev, () => { enPausa = true; }, { passive: true }));
    ["mouseleave", "focusout"].forEach((ev) => sec.addEventListener(ev, () => { enPausa = false; }));
    setInterval(() => { if (!enPausa && !document.hidden) mover(1); }, 3500);
  }

  /* ---------- Agenda ---------- */
  const estado = { dia: 0, esc: "", jor: "" };

  // Actividades de un día y escenario dados, dentro de la jornada elegida (jor: undefined = la del filtro).
  const nAct = (dia, k, jor = estado.jor) => PROGRAMA.reduce((n, b) => n + ((!dia || b.dia === dia) && (!k || b.esc === k) && (!jor || b.jornada === jor) ? b.sesiones.length : 0), 0);

  // Orden de prioridad de los filtros: día, luego jornada, luego lugar.
  // Al cambiar uno, los de menor prioridad que quedarían sin actividades se sueltan solos, para que nunca salga una lista vacía.
  function ajustarFiltros() {
    if (estado.jor && !nAct(estado.dia, "", estado.jor)) estado.jor = "";
    if (estado.esc && !nAct(estado.dia, estado.esc)) estado.esc = "";
  }

  function pintarFiltros() {
    ajustarFiltros();
    const op = (attr, valor, activo, titulo, sub, n) =>
      `<button type="button" class="opt" ${attr}="${valor}" aria-pressed="${activo}"${n ? "" : " disabled"}><b>${titulo}</b><span>${n ? sub : "No hay actividades"}</span></button>`;

    $("#tabs-dia").innerHTML = op("data-dia", 0, estado.dia === 0, "Todos los días", "5, 6 y 7 de noviembre", 1) +
      Object.keys(DIAS).map((d) => op("data-dia", d, estado.dia === Number(d), DIAS[d].largo.split(" ")[0], d + " de noviembre", 1)).join("");

    $("#tabs-jor").innerHTML = [["", "Todo el día", "Mañana y tarde"], ["Mañana", "Mañana", "Antes del mediodía"], ["Tarde", "Tarde", "Después de las 2:00"]]
      .map(([j, t, sub]) => op("data-jor", j, estado.jor === j, t, sub, nAct(estado.dia, "", j))).join("");

    $("#select-esc").innerHTML = `<option value="">Todos los lugares</option>` + GRUPOS_ESC.map((g) =>
      `<optgroup label="${esc(g.titulo)}">` + g.items.map((k) => {
        const n = nAct(estado.dia, k);
        return `<option value="${k}"${estado.esc === k ? " selected" : ""}${n ? "" : " disabled"}>${esc(ESCENARIOS[k].nombre)}${n ? "" : " (sin actividades)"}</option>`;
      }).join("") + `</optgroup>`).join("");
  }
  function pintarAgenda() {
    pintarFiltros();
    const q = norm($("#buscar-agenda").value.trim());
    let html = "", diaActual = 0, nSes = 0, nBloques = 0;

    PROGRAMA.forEach((b) => {
      if (estado.dia && b.dia !== estado.dia) return;
      if (estado.esc && b.esc !== estado.esc) return;
      if (estado.jor && b.jornada !== estado.jor) return;
      const e = ESCENARIOS[b.esc];
      const sesiones = b.sesiones.filter((s) => !q || norm([s.t, s.tipo, s.mod || "", s.nota || "", e.nombre].concat(s.p).join(" ")).includes(q));
      if (!sesiones.length) return;
      nSes += sesiones.length; nBloques++;

      if (b.dia !== diaActual) { diaActual = b.dia; html += `<h3 class="dayhead">${DIAS[b.dia].largo}</h3>`; }
      const mapaUrl = e.dir ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(e.nombre.split(" · ")[0] + ", Cali, Colombia") : "";
      html += `
      <article class="block">
        <div class="block__side"><div class="block__stick">
          <span class="block__jornada">${esc(b.jornada)}</span>
          <h3>${esc(e.nombre)}</h3>
          ${b.titulo ? `<p class="block__titulo">${esc(b.titulo)}</p>` : ""}
          ${e.dir ? `<p class="block__dir">${esc(e.dir)}</p><a class="block__map" href="${mapaUrl}" target="_blank" rel="noopener">Cómo llegar ↗</a>` : ""}
          <div class="block__badges">
            ${b.publico ? `<span class="badge">${esc(b.publico)}</span>` : ""}
            ${b.porConfirmar ? `<span class="badge badge--warn">Fecha por confirmar</span>` : ""}
          </div>
        </div></div>
        <div class="sessions">
          ${sesiones.map((s) => `
          <div class="session">
            <div class="session__time">${esc(s.h)}</div>
            <div>
              <span class="tag tag--${esc(s.tipo)}">${esc(s.tipo)}</span>
              <h4>${resaltar(s.t, q)}</h4>
              ${s.p.length ? `<p class="session__people">${s.p.map((n) => resaltar(n, q)).join(" · ")}</p>` : ""}
              ${s.mod ? `<p class="session__mod"><b>Modera:</b> ${resaltar(s.mod, q)}</p>` : ""}
              ${s.nota ? `<p class="session__nota">${esc(s.nota)}</p>` : ""}
            </div>
          </div>`).join("")}
        </div>
      </article>`;
    });

    $("#agenda-lista").innerHTML = html || `<p class="empty">No encontramos actividades con esa búsqueda. <button type="button" class="btn-clear" id="limpiar">Ver todas otra vez</button></p>`;
    const activos = [estado.dia ? "el " + DIAS[estado.dia].largo.toLowerCase() : "", estado.jor ? "en la " + estado.jor.toLowerCase() : "", estado.esc ? "en " + ESCENARIOS[estado.esc].nombre : "", q ? `con «${$("#buscar-agenda").value.trim()}»` : ""].filter(Boolean);
    $("#resultados").innerHTML = !nSes ? "" : activos.length
      ? `<span>Estás viendo <b>${nSes} ${nSes === 1 ? "actividad" : "actividades"}</b> ${activos.map(esc).join(", ")}.</span> <button type="button" class="btn-clear" id="limpiar">Ver todas otra vez</button>`
      : `<span>Estás viendo <b>todas las actividades</b> del festival (${nSes}).</span>`;
  }

  function irADia(d) {
    estado.jor = ""; estado.dia = d; estado.esc = "";
    $("#buscar-agenda").value = "";
    pintarAgenda();
    $("#agenda").scrollIntoView();
  }

  $("#tabs-dia").addEventListener("click", (e) => {
    const b = e.target.closest("[data-dia]");
    if (b) { estado.dia = Number(b.dataset.dia); pintarAgenda(); }
  });
  $("#tabs-jor").addEventListener("click", (e) => {
    const b = e.target.closest("[data-jor]");
    if (b) { estado.jor = b.dataset.jor; pintarAgenda(); }
  });
  $("#select-esc").addEventListener("change", (e) => { estado.esc = e.target.value; pintarAgenda(); });
  $("#buscar-agenda").addEventListener("input", pintarAgenda);
  $("#agenda").addEventListener("click", (e) => {
    if (e.target.id === "limpiar") { estado.jor = ""; estado.dia = 0; estado.esc = ""; $("#buscar-agenda").value = ""; pintarAgenda(); }
  });
  document.querySelectorAll("[data-ir-dia]").forEach((b) => b.addEventListener("click", () => irADia(Number(b.dataset.irDia))));

  /* ---------- Cifras, sedes y colectivos ---------- */
  document.querySelectorAll("[data-stat-dia]").forEach((el) => {
    const d = Number(el.dataset.statDia), lugares = new Set(PROGRAMA.filter((b) => b.dia === d).map((b) => b.esc)).size;
    el.textContent = `${nAct(d, "", "")} actividades en ${lugares} ${lugares === 1 ? "lugar" : "lugares"}`;
  });
  $("#st-esc").textContent = Object.keys(ESCENARIOS).length;
  $("#st-act").textContent = PROGRAMA.reduce((n, b) => n + b.sesiones.length, 0);
  $("#st-voc").textContent = ponentes.length;
  $("#lista-sedes").innerHTML = GRUPOS_ESC.map((g) => g.items.map((k) => {
    const e = ESCENARIOS[k];
    const cuando = PROGRAMA.filter((b) => b.esc === k).map((b) => `<span>${DIAS[b.dia].corto} · ${esc(b.jornada.toLowerCase())}</span>`).join("");
    return `
      <article class="venue">
        <p class="venue__tipo">${esc(g.uno)}</p>
        <h4>${esc(e.nombre)}</h4>
        ${e.dir ? `<p class="venue__dir">${esc(e.dir)}</p>` : ""}
        <div class="venue__when">${cuando}</div>
        <button class="link" data-ir-esc="${k}">Ver programación (${nAct(0, k)}) →</button>
      </article>`;
  }).join("")).join("");
  $("#lista-sedes").addEventListener("click", (ev) => {
    const b = ev.target.closest("[data-ir-esc]");
    if (!b) return;
    estado.jor = ""; estado.dia = 0; estado.esc = b.dataset.irEsc;
    $("#buscar-agenda").value = "";
    pintarAgenda();
    $("#agenda").scrollIntoView();
  });
  $("#lista-colectivos").innerHTML = COLECTIVOS.map((c) => `<li>${esc(c)}</li>`).join("");
  $("#form-esc").insertAdjacentHTML("beforeend", Object.values(ESCENARIOS).map((e) => `<option>${esc(e.nombre)}</option>`).join(""));
  $("#btn-patrocinio").href = "https://wa.me/" + CONFIG.whatsappPatrocinio + "?text=" + encodeURIComponent("Hola, quiero ser patrocinador del Festival Palabras que Convergen.");

  /* ---------- Inscripción ---------- */
  const form = $("#form"), err = $("#form-error"), btn = $("#form-btn");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    err.hidden = true;
    form.querySelectorAll(".is-bad").forEach((el) => el.classList.remove("is-bad"));

    const malos = [...form.querySelectorAll("input[required], select[required]")].filter((el) => !el.checkValidity());
    const dias = [...form.querySelectorAll('input[name="dias"]:checked')].map((el) => el.value);
    let msg = "";
    if (malos.length) {
      malos.forEach((el) => el.classList.add("is-bad"));
      msg = malos[0].name === "acepto" ? "Debes autorizar el tratamiento de datos para inscribirte." : "Revisa los campos marcados.";
    } else if (!dias.length) {
      msg = "Elige al menos un día de asistencia.";
    }
    if (msg) { err.textContent = msg; err.hidden = false; (malos[0] || form.querySelector('input[name="dias"]')).focus(); return; }

    const datos = new URLSearchParams(new FormData(form));
    datos.delete("dias");
    datos.set("dias", dias.join(", "));
    datos.set("fecha", new Date().toISOString());

    if (CONFIG.endpoint) {
      btn.disabled = true; btn.textContent = "Enviando…";
      try {
        await fetch(CONFIG.endpoint, { method: "POST", mode: "no-cors", body: datos });
      } catch (_) {
        btn.disabled = false; btn.textContent = "Enviar inscripción";
        err.textContent = "No pudimos enviar tu inscripción. Revisa tu conexión e inténtalo de nuevo.";
        err.hidden = false;
        return;
      }
    } else {
      $("#ok-msg").textContent = "Modo demostración: el formulario aún no está conectado y esta inscripción no se guardó.";
    }
    $("#ok-nombre").textContent = form.nombre.value.trim().split(/\s+/)[0];
    form.hidden = true;
    const ok = $("#form-ok");
    ok.hidden = false;
    ok.focus();
  });

  // El botón flotante se oculta cuando el formulario ya está a la vista.
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([en]) => $(".fab").classList.toggle("is-hidden", en.isIntersecting)).observe($("#inscripcion"));
  }

  pintarPaises();
  pintarPonentes();
  pintarAgenda();
})();
