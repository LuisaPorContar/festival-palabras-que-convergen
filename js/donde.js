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

  // Hora de fin en minutos («12:00 m.» es mediodía).
  function fin(h) {
    const ult = h.split(" – ").pop(), m = ult.match(/(\d+):(\d+)/);
    if (/^12:\d\d m\./.test(ult)) return 720 + Number(m[2]);
    const pm = /p\. m\./.test(/[ap]\. m\./.test(ult) ? ult : h);
    return (Number(m[1]) % 12 + (pm ? 12 : 0)) * 60 + Number(m[2]);
  }
  // Distancia aproximada por calle entre dos sedes (línea recta × 1,35) y tiempo en carro con tráfico de Cali.
  function traslado(a, b) {
    if (!a.geo || !b.geo) return null;
    const rad = Math.PI / 180, [la1, lo1] = a.geo, [la2, lo2] = b.geo;
    const x = (lo2 - lo1) * rad * Math.cos((la1 + la2) / 2 * rad), y = (la2 - la1) * rad;
    const km = Math.sqrt(x * x + y * y) * 6371 * 1.35;
    return { km: Math.round(km), min: Math.round((km * 2.6 + 10) / 5) * 5 };
  }
  const duracion = (m) => m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? " " + (m % 60) + " min" : ""}`;

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
        <ol class="mia__lista">${acts.map(({ b, s, rol }, i) => {
          const e = ESCENARIOS[b.esc];
          // Quien presenta la jornada la acompaña completa, no solo la primera actividad.
          const jornada = rol === "Presenta la jornada";
          const hora = jornada ? s.h.split(" – ")[0] + " – " + b.sesiones[b.sesiones.length - 1].h.split(" – ").pop() : s.h;
          const titulo = jornada ? "Presentación de la jornada" + (b.titulo ? " · " + b.titulo : "") : s.t;
          // Si lo siguiente del mismo día queda lejos o con el tiempo justo, una nota discreta para salir con tiempo.
          let aviso = "";
          const sig = acts[i + 1];
          if (sig && sig.b.dia === b.dia && sig.b.esc !== b.esc) {
            const t = traslado(e, ESCENARIOS[sig.b.esc]), libre = minutos(sig.s.h) - fin(hora);
            if (t && libre >= 0 && (t.km >= 8 || libre < t.min + 15)) {
              aviso = `
          <li class="mia__viaje">🚗 Luego vas a <b>${esc(ESCENARIOS[sig.b.esc].nombre)}</b>: unos ${t.km} km (≈ ${t.min} min en carro). Tienes ${duracion(libre)} entre una y otra; sal con tiempo.</li>`;
            }
          }
          return `
          <li>
            <p class="mia__cuando"><b>${esc(DIAS[b.dia].largo)}</b><span>${esc(hora)}</span></p>
            <div>
              <h4>${esc(titulo)}${rol && !jornada ? ` <span class="mia__rol">${rol}</span>` : ""}</h4>
              <p class="mia__donde"><b>${esc(e.nombre)}</b>${e.dir ? ` · ${esc(e.dir)} · <a href="${mapaDe(e)}" target="_blank" rel="noopener">Cómo llegar ↗</a>` : ""}</p>
            </div>
          </li>${aviso}`;
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
