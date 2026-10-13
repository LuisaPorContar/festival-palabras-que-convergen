/* Festival Palabras que Convergen — datos del programa.
   Para cambiar horarios, nombres o escenarios, edita solo este archivo. */

const CONFIG = {
  // URL del Web App (Google Apps Script u otro) que recibe las inscripciones.
  // Mientras esté vacío, el formulario funciona en modo demostración y NO guarda datos.
  endpoint: "",
  inicio: "2026-11-05T08:20:00-05:00",
  // WhatsApp para quienes quieran patrocinar el evento (solo dígitos, con indicativo del país).
  whatsappPatrocinio: "573177220302"
};

const DIAS = {
  5: { corto: "Jue 5", largo: "Jueves 5 de noviembre" },
  6: { corto: "Vie 6", largo: "Viernes 6 de noviembre" },
  7: { corto: "Sáb 7", largo: "Sábado 7 de noviembre" }
};

const ESCENARIOS = {
  presagio:     { nombre: "Teatro El Presagio", dir: "Av. 9A Norte #10N-50, barrio Granada" },
  unilibre:     { nombre: "Universidad Libre Seccional Cali", dir: "Carrera 37A #3-29" },
  cultores:     { nombre: "Centro Cultural Comuna 1 · Cultores y Cuidarte", dir: "Av. 5A Oeste #44-69, barrio Vista Hermosa" },
  deporte:      { nombre: "Biblioteca de la Recreación y el Deporte", dir: "Carrera 34 con Calle 5B, San Fernando · Tribuna occidental del Estadio Pascual Guerrero" },
  eldorado:     { nombre: "Biblioteca El Dorado", dir: "Calle 13C #36A-31, barrio El Dorado, Comuna 10" },
  sanluis:      { nombre: "Biblioteca Pública San Luis", dir: "Calle 71 #1A-10, barrio San Luis, Comuna 6" },
  lamaria:      { nombre: "La María", dir: "Carrera 5 #2-69, barrio San Antonio, Comuna 3" },
  vistahermosa: { nombre: "Biblioteca de Vista Hermosa (Biblioteca Verde)", dir: "Centro Cultural Comuna 1 · Av. 5A Oeste #44-69, barrio Vista Hermosa" },
  sannicolas:   { nombre: "Biblioteca San Nicolás", dir: "Calle 20 #5-63, Comuna 3" },
  sena:         { nombre: "Biblioteca Municipal SENA", dir: "Carrera 3 con Calle 47" },
  carbonell:    { nombre: "I.E. José María Carbonell", dir: "" },
  eljardin:     { nombre: "Biblioteca El Jardín", dir: "Av. 2 Norte #10-70, Centro Administrativo Municipal (CAM)" }
};

/* Desplegables del filtro de la agenda. uno = etiqueta en singular para las tarjetas de sedes. */
const GRUPOS_ESC = [
  { titulo: "Bibliotecas", uno: "Biblioteca", items: ["deporte", "eldorado", "sanluis", "vistahermosa", "sannicolas", "sena", "eljardin", "lamaria", "cultores"] },
  { titulo: "Universidades", uno: "Universidad", items: ["unilibre"] },
  { titulo: "Teatros", uno: "Teatro", items: ["presagio"] },
  { titulo: "Colegios", uno: "Colegio", items: ["carbonell"] }
];

/* Cada bloque = un escenario en una jornada.
   Sesión: h = hora, tipo, t = título, p = participantes, mod = modera/presenta, nota = texto adicional. */
const PROGRAMA = [
  {
    dia: 5, esc: "presagio", jornada: "Mañana", titulo: "Programación inaugural",
    sesiones: [
      { h: "8:20 a. m.", tipo: "Acto", t: "Himno Nacional", p: ["Lucero Jordán Molina"] },
      { h: "8:25 – 8:50 a. m.", tipo: "Acto", t: "Acto de instalación y reconocimiento «Palabras que convergen: Manifiesto de la esperanza»", p: ["Félix Calvo Sarmiento", "Miriam Castillo Mendoza", "Robinson Villalobos Velásquez"] },
      { h: "8:55 – 9:45 a. m.", tipo: "Recital", t: "Recital 1 · Manifiesto de la esperanza", p: ["Ángela Penagos Londoño", "Edinson Tello Bedón", "Dora Luz Muñoz de Cobo", "Roger Lázaro Inca", "Adalgisa Charria Quintero", "Mario Mathor", "Alfredo «Cheo» Angulo", "Wilson Blandón Caicedo"], mod: "Gloria Judith López Soto" },
      { h: "9:50 – 10:05 a. m.", tipo: "Escena", t: "Intervención escénica · Vuela con tus sueños", p: ["Luz Stella Salazar López"], mod: "Gloria Judith López Soto" },
      { h: "10:10 – 10:50 a. m.", tipo: "Conversatorio", t: "Conversatorio 1 · La poesía, un lenguaje para el teatro", p: ["Alejandro Buenaventura Aldeano", "Carlos Manuel Rivera Rosado"], mod: "Daniel Rivera Meza" },
      { h: "10:55 – 11:15 a. m.", tipo: "Recital", t: "Recital declamatorio 1 · Voces de la esperanza", p: ["Diego Jaramillo", "Luz Stella Vargas Vásquez", "Jim Persal"], mod: "Diomar Leclerc Martínez" },
      { h: "11:20 – 11:45 a. m.", tipo: "Recital", t: "Recital poético 2 · Palabras que convergen", p: ["Franz Wisley Aguirre Muñoz", "María Adiela Londoño de Copete", "Alfredo Otero Ortega", "Gloria Elena Gutiérrez", "Istina Valoyes Waldo", "Liliana Varón Villamizar", "John Raigoza", "Tatiana Suárez Vásquez"], mod: "Judith Cartagena", nota: "Colectivos: Poetas de la Calle de Palmira, Crisálidas Poéticas de Cartago, Colectivo Caribe, Universo de Palabras, Colectivo Escritoras del Chocó, Asociación Casa de Piedra, Taller literario Alfabeto del Mundo y Remart." },
      { h: "11:50 a. m. – 12:30 p. m.", tipo: "Libro", t: "Presentación del libro «El mundo en llamas»", p: ["Félix Manzur Jattin"], mod: "Judith Cartagena" },
      { h: "12:35 – 1:00 p. m.", tipo: "Música", t: "Presentación musical", p: ["Marisol Quiroga"] }
    ]
  },
  {
    dia: 5, esc: "cultores", jornada: "Mañana",
    sesiones: [
      { h: "8:00 – 8:10 a. m.", tipo: "Acto", t: "Palabras iniciales", p: ["Jhelga Lorena Pineda", "Camuli Zamudio"] },
      { h: "8:15 – 9:15 a. m.", tipo: "Lectura", t: "Lectura de poemas y narraciones", p: ["Jhelga Lorena Pineda", "Johana Marulanda Botero", "Julieta Henao Muñoz"] },
      { h: "9:20 – 10:05 a. m.", tipo: "Conversatorio", t: "Conversación sobre el arte plástico, la poesía y la educación", p: ["Guillermo Fabián Hoyos"] },
      { h: "10:10 – 11:35 a. m.", tipo: "Taller", t: "Taller · La palabra escrita como herramienta de transformación personal", p: ["Jhelga Lorena Pineda", "Johana Marulanda Botero", "Nataly Tabima Suárez", "Guillermo Fabián Hoyos"] }
    ]
  },
  {
    dia: 5, esc: "deporte", jornada: "Mañana",
    sesiones: [
      { h: "8:00 – 8:10 a. m.", tipo: "Acto", t: "Palabras iniciales", p: ["María Adiela Londoño de Copete", "Roxi Gómez"] },
      { h: "8:10 – 9:05 a. m.", tipo: "Recital", t: "Recital poético 5", p: ["María Adiela Londoño de Copete", "María Florenia Vivas Bohórquez", "Luz Dolly Atehortúa", "Nataly Tabima Suárez", "Darinel Restrepo", "Judith Cartagena"], mod: "Judith Cartagena" },
      { h: "9:05 – 10:05 a. m.", tipo: "Taller", t: "Taller 2 · Reparemos las grietas del alma y socialización de producción escrita", p: ["María Adiela Londoño de Copete", "Judith Cartagena", "Nataly Tabima Suárez", "María Florenia Vivas Bohórquez", "Luz Dolly Atehortúa"], mod: "Darinel Restrepo" }
    ]
  },
  {
    dia: 5, esc: "unilibre", jornada: "Tarde",
    sesiones: [
      { h: "2:00 – 2:40 p. m.", tipo: "Conversatorio", t: "Conversatorio 2 · El legado de Palenque en Colombia", p: ["Antonio Prada Fortul", "Gloria Amparo Murillo"], mod: "Yendier Mosquera Lemus" },
      { h: "2:40 – 3:20 p. m.", tipo: "Recital", t: "Recital 3 · Manifiesto de la esperanza", p: ["Joseph Berolo Ramos", "Miriam Castillo Mendoza", "Mary Grueso", "Daniel Rivera Meza", "Gloria Judith López Soto", "Nauro Torres Quintero"], mod: "Pablo Emilio Beltrán Bejarano" },
      { h: "3:25 – 3:55 p. m.", tipo: "Recital", t: "Recital declamatorio 2", p: ["Félix Calvo Sarmiento", "Marco Rogelio Rubio López", "Martha Luz De León Naar", "José Fernando Cano"], mod: "Gloria Inés Sánchez Duque" },
      { h: "3:55 – 4:30 p. m.", tipo: "Libro", t: "Presentación del libro «El faro del lobo»", p: ["Robinson Villalobos Velásquez"], mod: "Roberto Montes Mathieu" },
      { h: "4:30 – 5:10 p. m.", tipo: "Conversatorio", t: "Entrevista", p: ["Alberto Rodríguez"] },
      { h: "5:15 – 5:35 p. m.", tipo: "Recital", t: "Recital 4 · Manifiesto de la esperanza", p: ["Martha Eugenia Uribe Mutis", "Laureano León Valencia", "Diomar Leclerc Martínez", "Félix Domingo Cabezas", "Lucero Jordán Molina", "José Ignacio Cáceres Serna"], mod: "Ángela Penagos Londoño", nota: "Colectivos: Abe'scritos, Gremio Poético Colombiano, Colectivo Caribe, Fuespacol, Verbum y Casa de Piedra." },
      { h: "5:35 – 5:45 p. m.", tipo: "Cuentería", t: "La cuentería 1 · Palabras que convergen", p: ["Sor María Jiménez"], mod: "Ángela Penagos Londoño" },
      { h: "5:45 – 6:00 p. m.", tipo: "Música", t: "Intervención musical", p: ["Sandra Patricia «La Voz»"], mod: "Robinson Villalobos Velásquez" }
    ]
  },

  {
    dia: 6, esc: "eldorado", jornada: "Mañana", publico: "Adultos mayores",
    sesiones: [
      { h: "8:00 – 8:10 a. m.", tipo: "Acto", t: "Saludo de apertura", p: ["Miriam Castillo Mendoza", "Marcela Obando"] },
      { h: "8:15 – 9:00 a. m.", tipo: "Conversatorio", t: "Conversatorio 3 · La escritura de vida en la población de adultos mayores", p: ["Roberto Montes Mathieu", "Alberto Rodríguez"] },
      { h: "9:00 – 9:20 a. m.", tipo: "Lectura", t: "Lectura de cuento", p: ["Robinson Villalobos Velásquez"] },
      { h: "9:25 – 10:10 a. m.", tipo: "Libro", t: "Presentación del libro «Polonia la cimarrona»", p: ["Antonio Prada Fortul"], mod: "Miriam Castillo Mendoza" },
      { h: "10:15 – 11:15 a. m.", tipo: "Taller", t: "Taller de la esperanza · El oro está en las manos de los que comparten", p: ["Diomar Leclerc Martínez", "Pablo Emilio Beltrán Bejarano", "Lucero Jordán Molina", "Laureano León Barrera"] },
      { h: "11:15 – 11:30 a. m.", tipo: "Lectura", t: "Lectura de textos de los participantes", p: [], nota: "Compartir de producción y opiniones de los asistentes." }
    ]
  },
  {
    dia: 6, esc: "vistahermosa", jornada: "Mañana",
    sesiones: [
      { h: "8:00 – 8:10 a. m.", tipo: "Acto", t: "Saludo inicial", p: ["Alfredo «Cheo» Angulo", "Andrés Acosta"] },
      { h: "8:15 – 9:15 a. m.", tipo: "Recital", t: "Recital poético declamatorio del Pacífico colombiano", p: ["Alexis Ocoró Bonilla", "Félix Domingo Cabezas", "Alfredo «Cheo» Angulo", "Mónica Patricia Ossa Graín"] },
      { h: "9:20 – 10:20 a. m.", tipo: "Cuentería", t: "Acto de cuentería · Viento de palabras", p: ["Claudia Torres", "Sor María Jiménez", "María Fabiola Serna Gonzáles"] },
      { h: "10:30 a. m. – 12:00 m.", tipo: "Taller", t: "Taller de escritura · Tejedores de esperanza", p: ["Alexis Ocoró Bonilla", "Félix Domingo Cabezas", "Alfredo «Cheo» Angulo", "Mónica Patricia Ossa Graín", "Claudia Torres", "Sor María Jiménez", "María Fabiola Serna Gonzáles"] }
    ]
  },
  {
    dia: 6, esc: "sannicolas", jornada: "Mañana", publico: "Jóvenes de 11 a 17 años",
    sesiones: [
      { h: "8:00 – 8:10 a. m.", tipo: "Acto", t: "Palabras iniciales", p: ["Susana María Moreno Palacios", "Sandra Patricia Koson"] },
      { h: "8:15 – 9:40 a. m.", tipo: "Recital", t: "Recital y conversatorio sobre la poesía del Chocó", p: ["Susana María Moreno Palacios", "Istina Valoyes Waldo", "Yendier Mosquera Lemus"] },
      { h: "9:45 – 10:45 a. m.", tipo: "Taller", t: "Taller de escritura · Cuánto quiero a mi tierra", p: ["Yendier Mosquera Lemus", "Susana María Moreno Palacios", "Istina Valoyes Waldo"] }
    ]
  },
  {
    dia: 6, esc: "sena", jornada: "Mañana",
    sesiones: [
      { h: "8:00 – 8:10 a. m.", tipo: "Acto", t: "Palabras iniciales", p: ["Yarleidy Solar Uribe", "Norma Constanza Calderón"] },
      { h: "8:15 – 9:15 a. m.", tipo: "Recital", t: "Recital y lectura de relatos por la esperanza", p: ["Geraudi Gonzáles Olivares", "Lina María Pérez", "Gloria Elena Gutiérrez", "María Ximena Hoyos Mazuera", "Yarleidy Solar Uribe"] },
      { h: "9:20 – 11:20 a. m.", tipo: "Taller", t: "Taller de escritura · Mi infancia, un motivo para escribir", p: ["María Ximena Hoyos Mazuera", "Yarleidy Solar Uribe", "Lina María Pérez", "Gloria Elena Gutiérrez", "Geraudi Gonzáles Olivares"] }
    ]
  },
  {
    dia: 6, esc: "sanluis", jornada: "Mañana", publico: "Niños y jóvenes de 10 a 17 años",
    sesiones: [
      { h: "9:00 – 9:10 a. m.", tipo: "Acto", t: "Palabras de apertura", p: ["Edinson Tello Bedón"] },
      { h: "9:10 – 10:15 a. m.", tipo: "Recital", t: "Recital poético de la esperanza", p: ["Edinson Tello Bedón", "Constanza Eugenia Muñoz Flórez", "Margarita Rosa Patiño", "María Teresa Casas Figueroa", "Tito Nelio Cuero Murillo", "Henry Patiño Montoya"] },
      { h: "10:20 – 11:00 a. m.", tipo: "Recital", t: "Recital declamatorio", p: ["Aníbal Gilberto Pantoja Ríos", "Martha Luz De León Naar", "Marino Díaz Antía"] }
    ]
  },
  {
    dia: 6, esc: "lamaria", jornada: "Mañana", publico: "Jóvenes de 11 a 17 años",
    sesiones: [
      { h: "9:00 – 9:10 a. m.", tipo: "Acto", t: "Palabras iniciales", p: ["Leticia Truque Vélez", "Melisa Castaño"] },
      { h: "9:15 – 10:00 a. m.", tipo: "Recital", t: "Recital poético y lectura de cuentos y relatos", p: ["Lina Johana Pérez Montoya", "Leticia Truque Vélez", "María Dolly Montes Tangarife", "Roberto Toala Núñez", "Milton Fabián Solano"] },
      { h: "10:00 – 11:00 a. m.", tipo: "Taller", t: "Taller de escritura para la esperanza · Donde nacen los dragones", p: ["Lina Johana Pérez Montoya", "Leticia Truque Vélez", "María Dolly Montes Tangarife", "Roberto Toala Núñez", "Milton Fabián Solano"] }
    ]
  },
  {
    dia: 6, esc: "carbonell", jornada: "Tarde",
    sesiones: [
      { h: "2:00 – 2:15 p. m.", tipo: "Acto", t: "Palabras iniciales, saludo protocolario y entrega del libro «Poemas contra la guerra»", p: ["Miriam Castillo Mendoza"], mod: "Robinson Villalobos Velásquez" },
      { h: "2:20 – 2:50 p. m.", tipo: "Libro", t: "Presentación especial · Lectura de poemas y presentación de libros", p: ["Robinson Villalobos Velásquez"], mod: "Miriam Castillo Mendoza" },
      { h: "2:55 – 3:15 p. m.", tipo: "Recital", t: "Recital declamatorio", p: ["Marco Rogelio Rubio López", "Martha Luz De León Naar", "Jim Persal", "José Fernando Cano"] },
      { h: "3:20 – 4:00 p. m.", tipo: "Recital", t: "Recital poético", p: ["Maya Chalez", "Gloria Judith López Soto", "José Ignacio Cáceres Serna", "Alfredo Otero Ortega", "Susana María Moreno Palacios", "Ángela Penagos Londoño", "Joseph Berolo Ramos"] },
      { h: "4:05 – 4:20 p. m.", tipo: "Escena", t: "Intervención artística", p: ["Luz Stella Salazar López"] },
      { h: "4:20 – 4:40 p. m.", tipo: "Lectura", t: "Lectura de estudiantes y profesores", p: [], nota: "Tres estudiantes y dos profesores leen sus cuentos cortos o poemas." },
      { h: "4:40 – 5:00 p. m.", tipo: "Música", t: "Intervención musical", p: ["Marisol Quiroga"] }
    ]
  },
  {
    dia: 6, esc: "eljardin", jornada: "Tarde", publico: "Adultos",
    sesiones: [
      { h: "4:00 – 4:10 p. m.", tipo: "Acto", t: "Palabras iniciales", p: ["Alejandrino Santos Hurtado", "Alicia Gómez"] },
      { h: "4:15 – 5:15 p. m.", tipo: "Recital", t: "Recital poético de la esperanza", p: ["Alejandrino Santos Hurtado", "Israel Agudelo Castro", "Margarita Peñalosa Flórez", "Jaime Eduardo Muñoz Flórez", "María Antonia Ledesma", "Martha Estela Aguilar Guayara"], mod: "Luz Stella Vargas Vásquez" },
      { h: "5:15 – 6:00 p. m.", tipo: "Recital", t: "Recital declamatorio", p: ["Luz Stella Vargas Vásquez", "Franz Wisley Aguirre Muñoz", "María de los Ángeles Londoño"] }
    ]
  },

  {
    dia: 7, esc: "unilibre", jornada: "Mañana", titulo: "Jornada de clausura · Auditorio",
    sesiones: [
      { h: "8:00 – 8:30 a. m.", tipo: "Libro", t: "Palabras iniciales, presentación del libro «Palabras que convergen» y apertura de la exposición de pinturas contra la guerra (écfrasis)", p: ["Miriam Castillo Mendoza", "Robinson Villalobos Velásquez"], nota: "Incluye la lectura de cinco poemas." },
      { h: "8:35 – 9:30 a. m.", tipo: "Conversatorio", t: "Conversatorio · Mejora de textos: cómo corregir, pulir y estructurar una obra sin perder la voz del autor", p: ["Joseph Berolo Ramos", "Mónica Patricia Ossa Graín", "Milton Fabián Solano"], mod: "Pablo Emilio Beltrán Bejarano" },
      { h: "9:35 – 9:50 a. m.", tipo: "Escena", t: "Intervención artística", p: ["Robinson Villalobos Velásquez"] },
      { h: "9:55 – 10:30 a. m.", tipo: "Conversatorio", t: "Charla · En nuestras regiones los muertos cantan y bailan", p: ["Miriam Castillo Mendoza", "Félix Domingo Cabezas"] },
      { h: "10:35 – 11:15 a. m.", tipo: "Conversatorio", t: "Conversatorio · El punto y la nota, una conversación entre escritores y músicos", p: ["Alfredo «Cheo» Angulo", "Alexis Ocoró Bonilla", "Feliciano Saa Riascos", "Carlos Manuel Rivera Rosado"] },
      { h: "11:20 a. m. – 12:35 p. m.", tipo: "Acto", t: "Clausura del evento · Entrega de reconocimientos y homenajes", p: [], nota: "Entrega de recordatorio, libro y diploma a los participantes." }
    ]
  }
];

/* Anfitriones de cada sede: aparecen en la agenda pero no en la sección de ponentes. */
const ANFITRIONES = ["Marcela Obando", "Roxi Gómez", "Alicia Gómez", "Melisa Castaño", "Andrés Acosta", "Camuli Zamudio", "Norma Constanza Calderón", "Sandra Patricia Koson"];

/* Reseñas. alias = nombre artístico. foto = retrato cuadrado en assets/ponentes/ (opcional).
   pais = país de origen; si no se indica, se asume PAIS_SEDE. */
const PAIS_SEDE = "Colombia";
// Países presentes en el festival (cifra del inicio y texto de la sección de ponentes).
const PAISES = ["Colombia", "México", "Panamá", "Perú", "Puerto Rico", "Venezuela"];
// Archivo de bandera de cada país, en assets/banderas/.
const BANDERAS = { "Colombia": "co", "México": "mx", "Panamá": "pa", "Perú": "pe", "Puerto Rico": "pr", "Venezuela": "ve" };
const PERFILES = {
  "Miriam Castillo Mendoza": { foto: "assets/ponentes/miriam-castillo.jpg", bio: "Coordinadora de Palabras que Convergen. Premio Nacional de Literatura, embajadora hispanomundial de paz y medalla Enrique Jatib a la excelencia cultural." },
  "Robinson Villalobos Velásquez": { foto: "assets/ponentes/robinson-villalobos.jpg", bio: "Novelista, poeta, cuentista y aforista residente en Cali, ganador de reconocimientos nacionales e internacionales." },
  "Roberto Montes Mathieu": { foto: "assets/ponentes/roberto-montes.jpg", bio: "Narrador, cuentista, novelista e historiador literario. Padre de la microficción en Colombia y director del Magazín del Caribe." },
  "Alberto Rodríguez": { foto: "assets/ponentes/alberto-rodriguez.jpg", bio: "Filósofo, educador, investigador y escritor. Director de La Casa de la Lectura de Cali." },
  "Mary Grueso": { foto: "assets/ponentes/mary-grueso.jpg", bio: "Poeta y narradora oral de Guapi, Cauca. Autora de «Negra soy» y primera mujer afrocolombiana en la Academia Colombiana de la Lengua." },
  "Antonio Prada Fortul": { foto: "assets/ponentes/antonio-prada-fortul.jpg", bio: "Escritor e investigador cartagenero. Autor de las novelas «Benkos, las alas de un cimarrón» y «Orika, la gacela de la madrugada»." },
  "Lucero Jordán Molina": { bio: "Escritora, poeta ambientalista, compositora y dramaturga colombiana." },
  "María Adiela Londoño de Copete": { foto: "assets/ponentes/adiela-londono.jpg", bio: "Vicepresidenta mundial honoraria de la Unión Hispanomundial de Escritores. Grupo Crisálidas Poéticas de Cartago." },
  "Marco Rogelio Rubio López": { pais: "México", foto: "assets/ponentes/marco-rogelio-rubio.jpg", bio: "Poeta y declamador mexicano, ganador de premios y reconocimientos internacionales." },
  "Alfredo «Cheo» Angulo": { foto: "assets/ponentes/cheo-angulo.jpg", bio: "Compositor, cantautor, periodista y escritor, autor de grandes éxitos de la salsa colombiana. Presidente de Fuespacol." },
  "Judith Cartagena": { foto: "assets/ponentes/judith-cartagena.jpg", bio: "Periodista, poeta, gestora cultural y asesora de comunicaciones. Integrante del Encuentro de Mujeres del Museo Rayo y directora de La Chambrana Cultural." },
  // País sin confirmar: con pais "" no se muestra ninguno.
  "Carlos Manuel Rivera Rosado": { pais: "Puerto Rico", foto: "assets/ponentes/carlos-manuel-rivera.jpg", bio: "Poeta, actor y performero puertorriqueño, especialista en teatro latinoamericano." },
  "Roger Lázaro Inca": { pais: "" },
  "Joseph Berolo Ramos": { pais: "" },
  "Jim Persal": { pais: "" },
  "Maya Chalez": { pais: "", foto: "assets/ponentes/maya-chalez.jpg" },
  "Tatiana Suárez Vásquez": { foto: "assets/ponentes/tatiana-suarez.jpg" },
  "Mario Mathor": { pais: "" },
  "Martha Eugenia Uribe Mutis": { foto: "assets/ponentes/martha-eugenia-uribe.jpg" },
  "Dora Luz Muñoz de Cobo": { foto: "assets/ponentes/dora-luz-munoz.jpg" },
  "Ángela Penagos Londoño": { foto: "assets/ponentes/angela-penagos.jpg" },
  "Alexis Ocoró Bonilla": { foto: "assets/ponentes/alexis-ocoro.jpg", alias: "Alexis Orilla", bio: "Poeta, cantautor, escritor, declamador y agrónomo del Pacífico colombiano." },
  "Félix Domingo Cabezas": { foto: "assets/ponentes/felix-domingo-cabezas.jpg", bio: "Narrador, investigador cultural, docente, rector y gestor cultural." },
  "Susana María Moreno Palacios": { foto: "assets/ponentes/susana-moreno-palacios.jpg", bio: "Escritora, poeta y educadora de Quibdó. Dirige la Red Étnica de Escritores del Chocó." },
  "Luz Stella Vargas Vásquez": { bio: "Declamadora artística, conocida por su interpretación de poesía andaluza y lírica clásica." },
  "Franz Wisley Aguirre Muñoz": { bio: "Poeta, escritor y declamador enfocado en la poesía clásica y el soneto. Autor de «Regocijos, ensueños & congojas»." },
  "Edinson Tello Bedón": { bio: "Escritor y poeta, presidente de Poetas de la Calle. Autor de «Desamor de luna»." },
  "Sor María Jiménez": { alias: "María Zorin", bio: "Cuentera profesional, actriz de teatro, poeta y escritora. Fundación Cultural Viva Palabra." },
  "Mónica Patricia Ossa Graín": { bio: "Poeta, editora y directora de la Fundación Grainar." },
  "Milton Fabián Solano": { bio: "Poeta, psicólogo y docente. Creador y director del Grupo Plenilunio." },
  "María Ximena Hoyos Mazuera": { foto: "assets/ponentes/ximena-hoyos.jpg", bio: "Académica, escritora y docente vinculada a la Universidad del Valle. Investiga los tejidos y la tradición oral de comunidades amerindias." },
  "Geraudi Gonzáles Olivares": { pais: "Venezuela", foto: "assets/ponentes/geraudi-gonzales.jpg", bio: "Escritora, editora, gestora cultural y docente venezolana residente en Colombia. Coeditora de El Taller Blanco Ediciones." },
  "Yarleidy Solar Uribe": { bio: "Escritora y gestora cultural de Tierralta, Córdoba. Dirige el taller literario Genuina." },
  "Istina Valoyes Waldo": { bio: "Poeta, terapeuta del lenguaje y declamadora vinculada a la cultura del Chocó." },
  "Yendier Mosquera Lemus": { bio: "Escritor, poeta y profesional de la salud. Autor de «Así vivimos: poesías, cartas y consejos de mi región»." },
  "Leticia Truque Vélez": { alias: "Colombia Truque", bio: "Escritora y traductora. Premio Nacional de Cuento." },
  "María Dolly Montes Tangarife": { bio: "Escritora, pintora, escultora y gestora cultural de Caldas. Creadora del premio de literatura DOMOTA." },
  "Lina Johana Pérez Montoya": { alias: "Lilimar", bio: "Poeta de Remart. Une la palabra con la psicología del bienestar, el mindfulness y la inteligencia emocional." },
  "Roberto Toala Núñez": { bio: "Escritor de microrrelatos vinculado a la identidad de Cali y el Valle." },
  "Claudia Torres": { bio: "Narradora oral, cuentera y pedagoga infantil. Fundación Cultural Viva Palabra." },
  "María Fabiola Serna Gonzáles": { bio: "Cuentera, poeta y gestora cultural. Ganadora del festival Entre Cuentos y Flores." },
  "Constanza Eugenia Muñoz Flórez": { alias: "Luna de Nácar", bio: "Educadora, escritora y poeta caleña de Poetas de la Calle, residente en Medellín." },
  "Margarita Rosa Patiño": { bio: "Poeta, escritora y ensayista. Participante del Encuentro de Mujeres Poetas Colombianas del Museo Rayo." },
  "María Teresa Casas Figueroa": { bio: "Poeta y escritora caleña con trayectoria en recitales, talleres y festivales culturales." },
  "Tito Nelio Cuero Murillo": { bio: "Poeta y gestor cultural del Valle del Cauca. Integrante de Poetas de la Calle." },
  "Henry Patiño Montoya": { bio: "Escritor, poeta y narrador de Armenia. Autor de «Antología solitaria»." },
  "Aníbal Gilberto Pantoja Ríos": { bio: "Poeta y declamador de Candelaria, Valle del Cauca. Coautor de «Romance de los poetas de la calle»." },
  "Martha Luz De León Naar": { bio: "Declamadora de Cartagena residente en Palmira. Integrante de Poetas de la Calle." },
  "Marino Díaz Antía": { bio: "Poeta, escritor y declamador. Autor de «Cantares de otoño», «Cantares de primavera» y «Percepciones en lírica»." },
  "Darinel Restrepo": { bio: "Escritor y poeta colombiano independiente." },
  "María Florenia Vivas Bohórquez": { bio: "Grupo Crisálidas Poéticas de Cartago." },
  "Luz Dolly Atehortúa": { bio: "Grupo Crisálidas Poéticas de Cartago." },
  "Nataly Tabima Suárez": { bio: "Grupo Crisálidas Poéticas de Cartago." },
  "Alejandrino Santos Hurtado": { bio: "Poeta de la Calle." },
  "Israel Agudelo Castro": { bio: "Poeta, escritor y creador digital del colectivo Poetas de la Calle, residente en Palmira." },
  "Margarita Peñalosa Flórez": { bio: "Poeta vinculada al ámbito cultural del Valle. Integrante de Poetas de la Calle." },
  "Jaime Eduardo Muñoz Flórez": { bio: "Poetas de la Calle de Palmira." },
  "María Antonia Ledesma": { bio: "Grupo Libertad Poética Femenina." },
  "Martha Estela Aguilar Guayara": { alias: "Mares", bio: "Integrante de Poetas de la Calle." },
  "María de los Ángeles Londoño": { bio: "Poeta y declamadora independiente, impulsora de la literatura digital audiovisual." },
  "Jhelga Lorena Pineda": { bio: "Integrante de la Red de Escritoras de Caldas. Trabaja las narrativas femeninas." },
  "Johana Marulanda Botero": { bio: "Psicóloga vinculada al área de salud y bienestar." },
  "Guillermo Fabián Hoyos": { bio: "Artista visual y pedagogo. Integrante del Salón de Artistas Intercontinental de Cali." },
  "Lina María Pérez": { bio: "Poeta de Remart y del nodo de literatura." },
  "Gloria Elena Gutiérrez": { alias: "Guty" },
  "José Ignacio Cáceres Serna": { alias: "Nacho" },
  "Marisol Quiroga": { alias: "Guatipana" },
  "Feliciano Saa Riascos": { alias: "Cheo Saa" },
  "Luz Stella Salazar López": { foto: "assets/ponentes/luz-stella-salazar.jpg", bio: "Pluma, verso y canción." }
};

/* Carrusel de voces destacadas, en este orden. rol = etiqueta sobre el nombre. */
const DESTACADOS = [
  { nombre: "Miriam Castillo Mendoza", rol: "Coordinadora del festival" },
  { nombre: "Robinson Villalobos Velásquez", rol: "Organizador · Cali" },
  { nombre: "Mary Grueso", rol: "Academia Colombiana de la Lengua" },
  { nombre: "Roberto Montes Mathieu", rol: "Microficción · Caribe" },
  { nombre: "Alfredo «Cheo» Angulo", rol: "Compositor · Pacífico" },
  { nombre: "Félix Domingo Cabezas", rol: "Narrador e investigador cultural" },
  { nombre: "Antonio Prada Fortul", rol: "Novelista · Cartagena" },
  { nombre: "Marco Rogelio Rubio López", rol: "Invitado internacional" },
  { nombre: "Carlos Manuel Rivera Rosado", rol: "Invitado internacional" },
  { nombre: "Alberto Rodríguez", rol: "La Casa de la Lectura de Cali" },
  { nombre: "Judith Cartagena", rol: "Periodista y poeta" },
  { nombre: "Ángela Penagos Londoño", rol: "Poeta" },
  { nombre: "María Ximena Hoyos Mazuera", rol: "Universidad del Valle" },
  { nombre: "María Adiela Londoño de Copete", rol: "Unión Hispanomundial de Escritores" },
  { nombre: "Susana María Moreno Palacios", rol: "Red Étnica de Escritores del Chocó" },
  { nombre: "Geraudi Gonzáles Olivares", rol: "Invitada internacional" }
];

const COLECTIVOS =["Poetas de la Calle", "Crisálidas Poéticas de Cartago", "Colectivo Caribe", "Universo de Palabras", "Colectivo Escritoras del Chocó", "Asociación Casa de Piedra", "Alfabeto del Mundo", "Remart", "Abe'scritos", "Gremio Poético Colombiano", "Fuespacol", "Verbum", "Fundación Cultural Viva Palabra", "Red Étnica de Escritores del Chocó", "Libertad Poética Femenina", "Grupo Plenilunio"];
