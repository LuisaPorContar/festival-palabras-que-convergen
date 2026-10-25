/* Festival Palabras que Convergen — «¿Dónde me toca?»: la agenda de cada persona.
   Lo usan la página principal y la página /donde-me-toca. Requiere js/data.js. */
const DondeMeToca = (function () {
  "use strict";

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  // Resalta la búsqueda dentro de un texto, ignorando tildes y mayúsculas.
  function resaltar(texto, q) {
    if (!q) return esc(texto);
    const i = norm(texto).indexOf(q);
    if (i < 0 || norm(texto).length !== texto.length) return esc(texto);
    return esc(texto.slice(0, i)) + "<mark>" + esc(texto.slice(i, i + q.length)) + "</mark>" + esc(texto.slice(i + q.length));
  }

  const iniciales = (n) => n.replace(/«.*?»/g, "").trim().split(/\s+/).filter((w) => /^[A-ZÁÉÍÓÚÑ]/.test(w)).slice(0, 2).map((w) => w[0]).join("");

  // Hora de inicio en minutos, para ordenar actividades.
  function minutos(h) {
    const ini = h.split(" – ")[0], m = ini.match(/(\d+):(\d+)/);
    const pm = /p\. m\./.test(/[ap]\. m\./.test(ini) ? ini : h);
    return (Number(m[1]) % 12 + (pm ? 12 : 0)) * 60 + Number(m[2]);
  }

  // Ponentes (se derivan del programa, sin anfitriones): primero quienes tienen foto,
  // luego quienes tienen reseña; dentro de cada grupo, por número de actividades.
  function personas() {
    const mapa = new Map();
    PROGRAMA.forEach((b) => b.sesiones.forEach((s) => {
      s.p.concat(s.mod || [], s.pres || []).forEach((n) => {
        if (ANFITRIONES.includes(n)) return;
        if (!mapa.has(n)) mapa.set(n, { nombre: n, n: 0, pais: PAIS_SEDE, ...(PERFILES[n] || {}) });
        mapa.get(n).n++;
      });
    }));
    return [...mapa.values()].sort((a, b) => (!!b.foto - !!a.foto) || (!!b.bio - !!a.bio) || (b.n - a.n) || a.nombre.localeCompare(b.nombre, "es"));
  }

  const actividadesDe = (n) => PROGRAMA.flatMap((b) => b.sesiones
    .filter((s) => s.p.includes(n) || [].concat(s.mod || [], s.pres || []).includes(n))
    .map((s) => ({ b, s, rol: [].concat(s.mod || []).includes(n) ? "Modera" : (s.pres || []).includes(n) ? "Presenta la jornada" : "" })))
    .sort((x, y) => x.b.dia - y.b.dia || minutos(x.s.h) - minutos(y.s.h));
  const mapaDe = (e) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(e.nombre.split(" · ")[0] + ", Cali, Colombia");

  // Pinta en «caja» la agenda de cada persona de «gente» cuyo nombre coincide con «q» (ya normalizada).
  function pintar(caja, q, gente) {
    if (!q) { caja.innerHTML = ""; return; }
    // Cada palabra escrita debe estar en el nombre, en cualquier orden: «rivera carlos» también sirve.
    const palabras = q.split(/\s+/);
    const hallados = gente.filter((p) => palabras.every((w) => norm(p.nombre + " " + (p.alias || "")).includes(w)));
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
            : `<div class="avatar avatar--${gente.indexOf(p) % 4}" aria-hidden="true">${esc(iniciales(p.nombre))}</div>`}
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

  // Página /donde-me-toca: buscador solo, que deja el nombre en la dirección para poder compartirla.
  const caja = document.getElementById("resultado"), input = document.getElementById("buscar");
  if (caja && input) {
    const gente = personas();
    const ayuda = `<p class="dmt__ayuda">Por ejemplo: «Miriam», «Rivera» o «Cheo». Aparecerán tus actividades con día, hora, sede y cómo llegar.</p>`;
    const pintarPagina = () => {
      const texto = input.value.trim();
      pintar(caja, norm(texto), gente);
      if (!texto) caja.innerHTML = ayuda;
      const url = new URL(location.href);
      if (texto) url.searchParams.set("nombre", texto); else url.searchParams.delete("nombre");
      history.replaceState(null, "", url);
    };
    input.value = new URLSearchParams(location.search).get("nombre") || "";
    input.addEventListener("input", pintarPagina);
    pintarPagina();
  }

  return { esc, norm, resaltar, iniciales, minutos, personas, pintar };
})();
