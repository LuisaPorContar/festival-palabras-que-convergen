/* Festival Palabras que Convergen — interacción de la landing */
(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // Reseñas largas: se ve el comienzo y un botón «Leer más», para no descuadrar las tarjetas.
  function bioHtml(bio, cls) {
    if (bio.length <= 220) return `<p class="${cls}">${esc(bio)}</p>`;
    const punto = bio.lastIndexOf(". ", 200);
    const i = punto > 40 ? punto + 1 : bio.lastIndexOf(" ", 180);
    return `<p class="${cls} bio--larga">${esc(bio.slice(0, i))}<span class="bio__resto" hidden>${esc(bio.slice(i))}</span> <button type="button" class="link bio__mas" aria-expanded="false">Leer más</button></p>`;
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".bio__mas");
    if (!b) return;
    const resto = b.previousElementSibling, abrir = resto.hidden;
    resto.hidden = !abrir;
    b.setAttribute("aria-expanded", abrir);
    b.textContent = abrir ? "Leer menos" : "Leer más";
  });
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
    s.p.concat(s.mod || [], s.pres || []).forEach((n) => {
      if (ANFITRIONES.includes(n)) return;
      if (!mapa.has(n)) mapa.set(n, { nombre: n, n: 0, pais: PAIS_SEDE, ...(PERFILES[n] || {}) });
      mapa.get(n).n++;
    });
  }));
  // Primero quienes tienen foto, luego quienes tienen reseña; dentro de cada grupo, por número de actividades.
  const ponentes = [...mapa.values()].sort((a, b) => (!!b.foto - !!a.foto) || (!!b.bio - !!a.bio) || (b.n - a.n) || a.nombre.localeCompare(b.nombre, "es"));
  // Al inicio solo dos filas de tarjetas; en celular (una columna), cuatro.
  const inicial = () => {
    const cols = getComputedStyle($("#people")).gridTemplateColumns.split(" ").length;
    return cols > 1 ? cols * 2 : 8;
  };
  let verTodos = false, paisSel = "";

  const iniciales = (n) => n.replace(/«.*?»/g, "").trim().split(/\s+/).filter((w) => /^[A-ZÁÉÍÓÚÑ]/.test(w)).slice(0, 2).map((w) => w[0]).join("");

  function pintarPonentes() {
    const q = norm($("#buscar-ponente").value.trim());
    // Con un nombre escrito, en lugar de las tarjetas se muestra la agenda de cada persona encontrada.
    pintarMiAgenda(q);
    $("#chips-pais").hidden = $("#people").hidden = !!q;
    if (q) { $("#ver-todos").hidden = true; return; }
    let lista = ponentes.filter((p) => (!q || norm(p.nombre + " " + (p.alias || "")).includes(q)) && (!paisSel || p.pais === paisSel));
    const total = lista.length;
    const INICIAL = inicial();
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
        ${p.bio ? bioHtml(p.bio, "person__bio") : ""}
        <button class="link" data-ponente="${esc(p.nombre)}">Ver en la agenda (${p.n}) →</button>
      </article>`).join("") : `<p class="empty">No encontramos a nadie con ese nombre.</p>`;
    const btn = $("#ver-todos");
    btn.hidden = !!q || !!paisSel || total <= INICIAL;
    btn.textContent = verTodos ? "Ver menos" : `Ver las ${total} voces invitadas`;
  }
  $("#buscar-ponente").addEventListener("input", pintarPonentes);

  /* ---------- ¿Dónde me toca? ---------- */
  // Hora de inicio en minutos, para ordenar las actividades de cada persona.
  function minutos(h) {
    const ini = h.split(" – ")[0], m = ini.match(/(\d+):(\d+)/);
    const pm = /p\. m\./.test(/[ap]\. m\./.test(ini) ? ini : h);
    return (Number(m[1]) % 12 + (pm ? 12 : 0)) * 60 + Number(m[2]);
  }
  const actividadesDe = (n) => PROGRAMA.flatMap((b) => b.sesiones
    .filter((s) => s.p.includes(n) || [].concat(s.mod || [], s.pres || []).includes(n))
    .map((s) => ({ b, s, rol: [].concat(s.mod || []).includes(n) ? "Modera" : (s.pres || []).includes(n) ? "Presenta la jornada" : "" })))
    .sort((x, y) => x.b.dia - y.b.dia || minutos(x.s.h) - minutos(y.s.h));
  const mapaDe = (e) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(e.nombre.split(" · ")[0] + ", Cali, Colombia");

  function pintarMiAgenda(q) {
    const caja = $("#mi-agenda");
    if (!q) { caja.innerHTML = ""; return; }
    // Cada palabra escrita debe estar en el nombre, en cualquier orden: «rivera carlos» también sirve.
    const palabras = q.split(/\s+/);
    const hallados = ponentes.filter((p) => palabras.every((w) => norm(p.nombre + " " + (p.alias || "")).includes(w)));
    if (!hallados.length) {
      caja.innerHTML = `<p class="mia__nada">No encontramos ese nombre. Prueba solo con tu apellido. Si participas y no apareces, <a href="https://wa.me/${CONFIG.whatsappPatrocinio}" target="_blank" rel="noopener">escríbenos por WhatsApp</a>.</p>`;
      return;
    }
    const MAX = 5;
    caja.innerHTML = hallados.slice(0, MAX).map((p) => {
      const acts = actividadesDe(p.nombre);
      return `
      <article class="mia__p">
        <div class="person__top">
          ${p.foto
            ? `<img class="avatar avatar--foto" src="${esc(p.foto)}" alt="Retrato de ${esc(p.nombre)}" width="400" height="400" loading="lazy">`
            : `<div class="avatar avatar--${ponentes.indexOf(p) % 4}" aria-hidden="true">${esc(iniciales(p.nombre))}</div>`}
          <div>
            <h3>${resaltar(p.nombre, q)}</h3>
            <p class="person__pais">${acts.length} ${acts.length === 1 ? "actividad" : "actividades"}</p>
          </div>
        </div>
        <ol class="mia__lista">${acts.map(({ b, s, rol }) => {
          const e = ESCENARIOS[b.esc];
          // Quien presenta la jornada la acompaña completa, no solo la primera actividad.
          const jornada = rol === "Presenta la jornada";
          const hora = jornada ? s.h.split(" – ")[0] + " – " + b.sesiones[b.sesiones.length - 1].h.split(" – ").pop() : s.h;
          const titulo = jornada ? "Presentación de la jornada" + (b.titulo ? " · " + b.titulo : "") : s.t;
          return `
          <li>
            <p class="mia__cuando"><b>${esc(DIAS[b.dia].largo)}</b><span>${esc(hora)}</span></p>
            <div>
              <h4>${esc(titulo)}${rol && !jornada ? ` <span class="mia__rol">${rol}</span>` : ""}</h4>
              <p class="mia__donde"><b>${esc(e.nombre)}</b>${e.dir ? ` · ${esc(e.dir)} · <a href="${mapaDe(e)}" target="_blank" rel="noopener">Cómo llegar ↗</a>` : ""}</p>
            </div>
          </li>`;
        }).join("")}</ol>
      </article>`;
    }).join("") + (hallados.length > MAX ? `<p class="mia__nada">Hay ${hallados.length - MAX} ${hallados.length - MAX === 1 ? "persona más" : "personas más"} con ese nombre. Escribe también tu apellido.</p>` : "");
  }
  let anchoPrevio = window.innerWidth;
  window.addEventListener("resize", () => { if (window.innerWidth !== anchoPrevio) { anchoPrevio = window.innerWidth; pintarPonentes(); } });

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
          ${p.bio ? bioHtml(p.bio, "fcard__bio") : ""}
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

  /* ---------- Quienes hacen posible el festival ---------- */
  $("#organizadores").innerHTML = ORGANIZADORES.filter((o) => mapa.has(o.nombre)).map((o) => {
    const p = mapa.get(o.nombre);
    return `
      <article class="org">
        ${p.foto ? `<img src="${esc(p.foto)}" alt="Retrato de ${esc(p.nombre)}" width="400" height="400" loading="lazy">` : ""}
        <div>
          <p class="org__rol">${esc(o.rol)}</p>
          <h3>${esc(p.nombre)}</h3>
          ${p.bio ? `<p class="org__bio">${esc(p.bio)}</p>` : ""}
          <button class="link" data-ponente="${esc(p.nombre)}">Ver sus actividades (${p.n}) →</button>
        </div>
      </article>`;
  }).join("");

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

    // Cada día, las sedes en orden de hora de inicio.
    [...PROGRAMA].sort((x, y) => x.dia - y.dia || minutos(x.sesiones[0].h) - minutos(y.sesiones[0].h)).forEach((b) => {
      if (estado.dia && b.dia !== estado.dia) return;
      if (estado.esc && b.esc !== estado.esc) return;
      if (estado.jor && b.jornada !== estado.jor) return;
      const e = ESCENARIOS[b.esc];
      const sesiones = b.sesiones.filter((s) => !q || norm([s.t, s.tipo, s.nota || "", e.nombre].concat(s.p, s.mod || [], s.pres || []).join(" ")).includes(q));
      if (!sesiones.length) return;
      nSes += sesiones.length; nBloques++;

      if (b.dia !== diaActual) { diaActual = b.dia; html += `<h3 class="dayhead">${DIAS[b.dia].largo}</h3>`; }
      const mapaUrl = e.dir ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(e.nombre.split(" · ")[0] + ", Cali, Colombia") : "";
      // Cada sede es una fila que se abre al tocarla; así la lista completa cabe en una pantalla.
      let desde = sesiones[0].h.split(" – ")[0];
      const hasta = sesiones[sesiones.length - 1].h.split(" – ").pop();
      if (!/[ap]\. m\.|m\.$/.test(desde) && b.jornada === "Mañana" && !/a\. m\./.test(hasta)) desde += " a. m.";
      html += `
      <details class="blk" data-abrir>
        <summary>
          <span class="blk__jor blk__jor--${b.jornada === "Tarde" ? "t" : "m"}">${esc(b.jornada)}</span>
          <span class="blk__hora blk__hora--${b.jornada === "Tarde" ? "t" : "m"}"><b>${esc(desde.replace(/ ?(?:[ap]\. )?m\.$/, ""))}</b><small>${esc((desde.match(/[ap]\. m\./) || hasta.match(/[ap]\. m\./) || [""])[0])}</small></span>
          <span class="blk__main">
            <b>${esc(e.nombre)}</b>
            <small>${desde === hasta ? esc(desde) : esc(desde) + " – " + esc(hasta)} · ${sesiones.length} ${sesiones.length === 1 ? "actividad" : "actividades"}${b.publico ? " · " + esc(b.publico) : ""}</small>
          </span>

          <span class="blk__toggle" aria-hidden="true"></span>
        </summary>
        <div class="blk__body">
          ${e.dir ? `<p class="blk__dir">${esc(e.dir)} · <a href="${mapaUrl}" target="_blank" rel="noopener">Cómo llegar ↗</a></p>` : ""}
          <ol class="ses">
            ${sesiones.map((s) => `
            <li>
              <time>${esc(s.h)}</time>
              <div>
                <h4>${resaltar(s.t, q)}</h4>
                ${s.p.length ? `<p>${s.p.map((n) => resaltar(n, q)).join(", ")}</p>` : ""}
                ${s.mod ? `<p class="ses__mod">${Array.isArray(s.mod) ? "Moderan" : "Modera"}: ${[].concat(s.mod).map((n) => resaltar(n, q)).join(" y ")}</p>` : ""}
                ${s.pres ? `<p class="ses__mod">Presentan la jornada: ${s.pres.map((n) => resaltar(n, q)).join(" y ")}</p>` : ""}
                ${s.nota ? `<p class="ses__mod">${esc(s.nota)}</p>` : ""}
              </div>
            </li>`).join("")}
          </ol>
        </div>
      </details>`;
    });

    html = html.replace(/ data-abrir/g, q || nBloques <= 2 ? " open" : "");
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
  // Si la búsqueda no encuentra nada con los filtros puestos, se buscan todos los días y lugares.
  $("#buscar-agenda").addEventListener("input", () => {
    pintarAgenda();
    const q = $("#buscar-agenda").value.trim();
    if (q && !document.querySelector("#agenda-lista .blk") && (estado.dia || estado.jor || estado.esc)) {
      estado.dia = 0; estado.jor = ""; estado.esc = "";
      pintarAgenda();
    }
  });
  $("#agenda").addEventListener("click", (e) => {
    if (e.target.id === "limpiar") { estado.jor = ""; estado.dia = 0; estado.esc = ""; $("#buscar-agenda").value = ""; pintarAgenda(); }
  });
  document.querySelectorAll("[data-ir-dia]").forEach((b) => b.addEventListener("click", () => irADia(Number(b.dataset.irDia))));

  /* ---------- Cifras, sedes y colectivos ---------- */
  document.querySelectorAll("[data-stat-dia]").forEach((el) => {
    const d = Number(el.dataset.statDia), lugares = new Set(PROGRAMA.filter((b) => b.dia === d).map((b) => b.esc)).size;
    el.textContent = `${nAct(d, "", "")} actividades en ${lugares} ${lugares === 1 ? "lugar" : "lugares"}`;
  });
  document.querySelectorAll("[data-tipos]").forEach((el) => {
    const tipos = el.dataset.tipos.split(",");
    el.textContent = PROGRAMA.reduce((n, b) => n + b.sesiones.filter((s) => tipos.includes(s.tipo)).length, 0);
  });
  // En celular, cada día muestra las caras de algunos de sus participantes.
  document.querySelectorAll("[data-caras-dia]").forEach((el) => {
    const d = Number(el.dataset.carasDia);
    const gente = [...new Set(PROGRAMA.filter((b) => b.dia === d).flatMap((b) => b.sesiones.flatMap((s) => s.p.concat(s.mod || [], s.pres || []))))].filter((n) => !ANFITRIONES.includes(n));
    const conFoto = gente.filter((n) => PERFILES[n] && PERFILES[n].foto).slice(0, 6);
    el.innerHTML = conFoto.map((n) => `<img src="${esc(PERFILES[n].foto)}" alt="" width="34" height="34" loading="lazy">`).join("") + `<span>${gente.length} voces</span>`;
  });
  $("#st-esc").textContent = Object.keys(ESCENARIOS).length;
  $("#st-act").textContent = PROGRAMA.reduce((n, b) => n + b.sesiones.length, 0);
  $("#st-voc").textContent = ponentes.length;
  // Sedes: tres grupos plegables y un buscador por nombre, dirección o barrio.
  const GRUPOS_SEDES = [
    { titulo: "Bibliotecas", items: GRUPOS_ESC[0].items },
    { titulo: "Librerías y centros culturales", items: GRUPOS_ESC[1].items },
    { titulo: "Teatro, universidad y colegio", items: GRUPOS_ESC.slice(2).flatMap((g) => g.items) }
  ];
  function pintarSedes() {
    const q = norm($("#buscar-sede").value.trim());
    const html = GRUPOS_SEDES.map((g) => {
      const items = g.items.filter((k) => !q || norm(ESCENARIOS[k].nombre + " " + ESCENARIOS[k].dir).includes(q));
      if (!items.length) return "";
      return `
      <details class="vgroup"${q ? " open" : ""}>
        <summary><b>${esc(g.titulo)}</b><small>${items.length} ${items.length === 1 ? "sede" : "sedes"}</small><span class="blk__toggle" aria-hidden="true"></span></summary>
        <ul class="venues">${items.map((k) => {
          const e = ESCENARIOS[k];
          const mapa = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(e.nombre.split(" · ")[0] + ", Cali, Colombia");
          return `
          <li class="venue">
            <button type="button" class="venue__main" data-ir-esc="${k}" title="Ver la programación de esta sede"><b>${resaltar(e.nombre, q)}</b>${e.dir ? `<small>${esc(e.dir)}</small>` : ""}</button>
            <a class="venue__map" href="${mapa}" target="_blank" rel="noopener">Google Maps ↗</a>
          </li>`;
        }).join("")}</ul>
      </details>`;
    }).join("");
    $("#lista-sedes").innerHTML = html || `<p class="empty">No encontramos una sede con ese nombre.</p>`;
  }
  $("#buscar-sede").addEventListener("input", pintarSedes);
  pintarSedes();
  $("#lista-sedes").addEventListener("click", (ev) => {
    const b = ev.target.closest("[data-ir-esc]");
    if (!b) return;
    estado.jor = ""; estado.dia = 0; estado.esc = b.dataset.irEsc;
    $("#buscar-agenda").value = "";
    pintarAgenda();
    $("#agenda").scrollIntoView();
  });
  // La lista va dos veces seguidas para que la cinta gire sin saltos; la copia se oculta a los lectores de pantalla.
  $("#lista-colectivos").innerHTML = COLECTIVOS.map((c) => `<li>${esc(c)}</li>`).join("") + COLECTIVOS.map((c) => `<li aria-hidden="true">${esc(c)}</li>`).join("");
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
    // Identificador del envío: el script de la hoja lo usa para no guardar dos veces la misma inscripción.
    datos.set("id", Date.now().toString(36) + Math.random().toString(36).slice(2, 10));

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

  // El botón flotante se oculta mientras se ven los botones de la portada o el formulario, y mientras se escribe.
  const fab = $(".fab"), ocultaFab = { portada: false, form: false, escribe: false };
  const pintarFab = () => fab.classList.toggle("is-hidden", ocultaFab.portada || ocultaFab.form || ocultaFab.escribe);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([en]) => { ocultaFab.form = en.isIntersecting; pintarFab(); }).observe($("#inscripcion"));
    new IntersectionObserver(([en]) => { ocultaFab.portada = en.isIntersecting; pintarFab(); }).observe($(".hero__cta"));
  }
  document.addEventListener("focusin", (e) => { ocultaFab.escribe = e.target.matches("input, select, textarea"); pintarFab(); });
  document.addEventListener("focusout", () => { ocultaFab.escribe = false; pintarFab(); });

  // En celular, el buscador «¿Dónde me toca?» va justo después del carrusel; en computador, con los ponentes.
  const enCelular = matchMedia("(max-width: 760px)");
  const ubicarBuscador = () => {
    const caja = $("#donde-me-toca");
    if (enCelular.matches) $("#mia-movil").append(caja);
    else $("#chips-pais").before(caja);
  };
  enCelular.addEventListener("change", ubicarBuscador);
  ubicarBuscador();

  pintarPaises();
  // Enlace personal: ?nombre=Carlos%20Rivera abre la página con su agenda ya buscada.
  const pedido = new URLSearchParams(location.search).get("nombre");
  if (pedido) $("#buscar-ponente").value = pedido;
  pintarPonentes();
  if (pedido) setTimeout(() => $("#donde-me-toca").scrollIntoView(), 300);
  pintarAgenda();
})();
