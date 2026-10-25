/* Festival Palabras que Convergen — datos del programa.
   Para cambiar horarios, nombres o escenarios, edita solo este archivo. */

const CONFIG = {
  // URL del Web App (Google Apps Script u otro) que recibe las inscripciones.
  // Si se deja vacío, el formulario funciona en modo demostración y NO guarda datos.
  endpoint: "https://script.google.com/macros/s/AKfycbzrDA20faw2Munc0q40IjXI2pacOvBxCx7fdKD0lMAN2uAAecAYcrEtKcyHVnYoYYvh/exec",
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
  unilibre:     { nombre: "Universidad Libre Seccional Cali", dir: "Carrera 37A #3-29, La Chacra" },
  eldorado:     { nombre: "Biblioteca El Dorado", dir: "Calle 13C #36A-31, barrio El Dorado, Comuna 10" },
  deporte:      { nombre: "Biblioteca de la Recreación y el Deporte", dir: "Carrera 34 con Calle 5B, San Fernando · Tribuna occidental del Estadio Pascual Guerrero" },
  eljardin:     { nombre: "Biblioteca El Jardín", dir: "Calle 27 #36-10" },
  sanluis:      { nombre: "Biblioteca Pública San Luis", dir: "Calle 71 #1A-10, barrio San Luis, Comuna 6" },
  lamaria:      { nombre: "Biblioteca La María", dir: "Carrera 5 #2-69, barrio San Antonio, Comuna 3" },
  vistahermosa: { nombre: "Biblioteca de Vista Hermosa (Biblioteca Verde)", dir: "Centro Cultural Comuna 1 · Av. 5A Oeste #44-69, barrio Vista Hermosa" },
  acacias:      { nombre: "Biblioteca Centro Cultural Las Acacias", dir: "Carrera 24B, Comuna 10" },
  sena:         { nombre: "Biblioteca Municipal SENA", dir: "Carrera 3 con Calle 47, Esmeralda" },
  rigoberta:    { nombre: "Biblioteca Municipal Rigoberta Menchú", dir: "Carrera 32A #49-50, barrio Laureano Gómez / El Retiro, Comuna 15" },
  campina:      { nombre: "Biblioteca La Campiña", dir: "" },
  apapachos:    { nombre: "Apapachos", dir: "Calle 2 #10-21, barrio San Antonio, Comuna 3" },
  oromo:        { nombre: "Oromo Café Librería", dir: "Calle 17 #85-27, Comuna 17" },
  libertienda:  { nombre: "Libertienda Café Libro", dir: "Carrera 16 #2A-47" },
  alejandria:   { nombre: "Centro Cultural Casa Alejandría", dir: "Carrera 10 #4-13, barrio San Antonio" },
  capitolio:    { nombre: "Centro Cultural El Capitolio", dir: "Calle 5 #66B-67, piso 4" },
  carbonell:    { nombre: "I.E. José María Carbonell", dir: "" },
  cread:        { nombre: "Colegio Polideportivo CREAD", dir: "Calle 27 #32-77, barrio El Jardín" }
};

/* Grupos de sedes (filtro de la agenda y lista de sedes). uno = etiqueta en singular. */
const GRUPOS_ESC = [
  { titulo: "Bibliotecas", uno: "Biblioteca", items: ["eldorado", "deporte", "eljardin", "sanluis", "lamaria", "vistahermosa", "acacias", "sena", "rigoberta", "campina"] },
  { titulo: "Librerías y centros culturales", uno: "Librería", items: ["apapachos", "oromo", "libertienda", "alejandria", "capitolio"] },
  { titulo: "Universidades", uno: "Universidad", items: ["unilibre"] },
  { titulo: "Teatros", uno: "Teatro", items: ["presagio"] },
  { titulo: "Colegios", uno: "Colegio", items: ["carbonell", "cread"] }
];

/* Cada bloque = un escenario en una jornada.
   Sesión: h = hora, tipo, t = título, p = participantes, mod = modera, pres = presenta la jornada, nota = texto adicional. */
const PROGRAMA = [
  {
    dia: 5, esc: "presagio", jornada: "Mañana", titulo: "Programación inaugural",
    sesiones: [
      { h: "8:20 a. m.", tipo: "Acto", t: "Himno Nacional", p: ["Lucero Jordán Molina"], pres: ["Judith Cartagena", "Diomar Leclerc Martínez"] },
      { h: "8:25 – 8:35 a. m.", tipo: "Acto", t: "Acto de instalación del festival", p: ["Miriam Castillo Mendoza", "Robinson Villalobos Velásquez"] },
      { h: "8:40 – 8:50 a. m.", tipo: "Acto", t: "Reconocimiento «Palabras que convergen: Manifiesto de la esperanza»", p: ["Germán Félix Calvo Sarmiento"] },
      { h: "8:55 – 9:45 a. m.", tipo: "Recital", t: "Recital 1 · Manifiesto de la esperanza", p: ["Ángela Penagos Londoño", "Edinson Tello Bedón", "Dora Luz Muñoz de Cobo", "Roger Lázaro Ynca", "Mary Grueso", "Adalgiza Charria Quintero", "Wilson Blandón Caicedo", "Mario Mathor"], nota: "Seis minutos por voz, tres poemas." },
      { h: "9:50 – 10:05 a. m.", tipo: "Escena", t: "Intervención escénica 1 · Vuela con tus sueños", p: ["Luz Stella Salazar López"], mod: ["Gloria Judith López Soto", "Daniel Rivera Meza"] },
      { h: "10:10 – 11:10 a. m.", tipo: "Conversatorio", t: "Foro · Literatura de la memoria, la oralidad y el territorio", p: ["Félix Domingo Cabezas", "Yendier Mosquera Lemus", "Miriam Castillo Mendoza", "Antonio Prada Fortul", "Gloria Amparo Murillo", "Nauro Torres Quintero", "Alexis Ocoró Bonilla"], mod: "Alfredo «Cheo» Angulo", nota: "Temas: el territorio como personaje y cuerpo; de la oralidad a la escritura (la palabra viva); lengua e identidad cultural; literatura infantil y educación propia." },
      { h: "11:15 – 11:35 a. m.", tipo: "Recital", t: "Recital declamatorio 1 · Voces de la esperanza", p: ["Diego Jaramillo", "Luz Stella Vargas Vásquez", "Jim Persal"], mod: ["Edinson Tello Bedón", "Tatiana Suárez Vásquez"] },
      { h: "11:40 a. m. – 12:20 p. m.", tipo: "Conversatorio", t: "Simposio · El futuro de las bibliotecas y las librerías", p: ["Fernando Tamayo Ovalle", "Roxana González Gómez", "Héctor Granada"], nota: "Con la Biblioteca Departamental Jorge Garcés Borrero, la Red Municipal de Bibliotecas de Cali y la librería independiente Libertienda." },
      { h: "12:25 – 12:40 p. m.", tipo: "Recital", t: "Recital poético 3 · Continúa el saludo poético a Cali", p: ["Franz Wisley Aguirre Muñoz", "María Adiela Londoño de Copete", "Alfredo Otero Ortega", "Gloria Elena Gutiérrez", "Istina Valoyes Waldo", "John Raigoza"], nota: "Un poema por voz." },
      { h: "12:40 – 1:00 p. m.", tipo: "Música", t: "Presentación musical", p: ["Sandra Patricia «La Voz»"] }
    ]
  },
  {
    dia: 5, esc: "unilibre", jornada: "Tarde",
    sesiones: [
      { h: "2:30 – 2:45 p. m.", tipo: "Acto", t: "Palabras iniciales", p: ["Miriam Castillo Mendoza", "Robinson Villalobos Velásquez"], nota: "Con la rectoría o la dirección de Bienestar de la Universidad Libre." },
      { h: "2:50 – 3:35 p. m.", tipo: "Conversatorio", t: "Conversatorio 2 · El legado de Palenque en Colombia", p: ["Antonio Prada Fortul", "Gloria Amparo Murillo"] },
      { h: "3:35 – 4:15 p. m.", tipo: "Recital", t: "Recital · Manifiesto de la esperanza", p: ["Yendier Mosquera Lemus", "Joseph Berolo Ramos", "Miriam Castillo Mendoza", "Alfredo «Cheo» Angulo", "Daniel Rivera Meza", "Gloria Judith López Soto", "Nauro Torres Quintero"], mod: "Pablo Emilio Beltrán Bejarano", nota: "Seis minutos por voz." },
      { h: "4:15 – 4:45 p. m.", tipo: "Recital", t: "Recital declamatorio", p: ["Germán Félix Calvo Sarmiento", "Marco Rogelio Rubio López", "Martha Luz De León Naar", "José Fernando Cano"], mod: "Gloria Inés Sánchez Duque" },
      { h: "4:50 – 5:10 p. m.", tipo: "Escena", t: "Recital escénico «Raúl Gómez Jattin siempre vivo» · Anecdotario", p: ["Mateo Rose", "Antonio Prada Fortul"] },
      { h: "5:15 – 6:00 p. m.", tipo: "Recital", t: "Concierto de colectivos · Manifiesto de la esperanza", p: ["Martha Eugenia Uribe Mutis", "Robinson Villalobos Velásquez", "Laureano León Valencia", "Alexis Ocoró Bonilla", "Alfredo Otero Ortega", "Diomar Leclerc Martínez", "Pablo Emilio Beltrán Bejarano", "Félix Domingo Cabezas", "Leticia Truque Vélez", "Lucero Jordán Molina", "Julieta Henao Muñoz", "José Ignacio Cáceres Serna", "Liliana Varón Villamizar", "María Florenia Vivas Bohórquez", "Judith Cartagena", "Lina Johana Pérez Montoya", "Tatiana Suárez Vásquez", "Susana María Moreno Palacios", "Istina Valoyes Waldo", "Jaime Eduardo Muñoz Flórez", "Margarita Rosa Patiño Arbeláez", "Mónica Patricia Ossa Graín", "Dora Luz Muñoz de Cobo"], mod: "Ángela Penagos Londoño", nota: "Tres minutos por voz. Colectivos: Abe'scritos, Gremio Poético Colombiano, Colectivo Caribe, Cafeletreando, Fuespacol, Verbum, Casa de Piedra, Crisálidas Poéticas, Remart, Red de Escritores del Chocó, Poetas de la Calle y Lenguaje de Esperanzas." }
    ]
  },
  {
    dia: 5, esc: "libertienda", jornada: "Tarde",
    sesiones: [
      { h: "4:00 – 7:00 p. m.", tipo: "Recital", t: "Recitales y declamación", p: ["Edinson Tello Bedón", "Tito Nelio Cuero Murillo", "Sor María Jiménez", "Claudia Andrea Torres", "José Ignacio Cáceres Serna", "Marino Díaz Antía", "María Teresa Casas Figueroa", "María Dolly Montes Tangarife", "Lina María Pérez"], nota: "Treinta minutos por voz." }
    ]
  },
  {
    dia: 5, esc: "alejandria", jornada: "Tarde",
    sesiones: [
      { h: "4:00 – 10:00 p. m.", tipo: "Libro", t: "Presentación del poemario «Savia entre mis venas»", p: ["Ángela Penagos Londoño"] },
      { h: "4:00 – 10:00 p. m.", tipo: "Libro", t: "Presentación del libro de poesías y reflexiones «Nuevos vuelos»", p: ["Pablo Emilio Beltrán Bejarano"] },
      { h: "4:00 – 10:00 p. m.", tipo: "Libro", t: "Presentación del libro «El incendio que arrasó con todo»", p: ["Amelia Restrepo Hincapié"] },
      { h: "4:00 – 10:00 p. m.", tipo: "Libro", t: "Presentación del libro «Secretos de la cocina tradicional del Pacífico biodiverso y cultural de Colombia»", p: ["Félix Domingo Cabezas"] },
      { h: "4:00 – 10:00 p. m.", tipo: "Libro", t: "Presentación del libro «El aún y la existencia: el libro de las odasías»", p: ["Roger Lázaro Ynca"] },
      { h: "4:00 – 10:00 p. m.", tipo: "Libro", t: "Presentación de su revista virtual", p: ["Lucero Jordán Molina"] },
      { h: "4:00 – 10:00 p. m.", tipo: "Recital", t: "Recital", p: ["Tatiana Suárez Vásquez", "Maya Chalez"], nota: "Treinta minutos por participante en todas las actividades de la tarde." }
    ]
  },

  {
    dia: 6, esc: "carbonell", jornada: "Mañana",
    sesiones: [
      { h: "8:00 – 10:00 a. m.", tipo: "Taller", t: "Recital poético declamatorio y taller de iniciación a la palabra escrita", p: ["Maya Chalez", "Diomar Leclerc Martínez", "José Fernando Cano"], nota: "Seis grupos de 9.º, en el auditorio." },
      { h: "8:00 – 11:45 a. m.", tipo: "Taller", t: "Recital poético declamatorio y taller de escritura", p: ["Joseph Berolo Ramos", "Martha Luz De León Naar", "Roger Lázaro Ynca"], nota: "Dos grupos de 10.º, en la sala bilingüe." },
      { h: "8:00 – 11:45 a. m.", tipo: "Taller", t: "Recital poético declamatorio y taller de escritura", p: ["Edinson Tello Bedón", "Marino Díaz Antía"], nota: "Un grupo de 10.º, en el laboratorio de física." },
      { h: "8:00 – 11:45 a. m.", tipo: "Libro", t: "Presentación especial · Lectura de poemas y presentación de libros", p: ["Robinson Villalobos Velásquez", "Roberto Montes Mathieu", "Miriam Castillo Mendoza"], nota: "Un grupo de 11.º, en la sala de química." },
      { h: "8:00 – 11:45 a. m.", tipo: "Recital", t: "Recital declamatorio, intervención artística y presentación especial", p: ["Marco Rogelio Rubio López", "José Fernando Cano", "Luz Stella Salazar López", "Carlos Manuel Rivera Rosado"], nota: "Un grupo de 11.º, en la cafetería." }
    ]
  },
  {
    dia: 6, esc: "capitolio", jornada: "Mañana",
    sesiones: [
      { h: "8:00 – 8:10 a. m.", tipo: "Acto", t: "Palabras iniciales", p: ["Germán Félix Calvo Sarmiento"] },
      { h: "8:15 – 8:50 a. m.", tipo: "Libro", t: "Presentación del libro «Mapas tejidos» (antología de memorias y crónicas, 2026)", p: ["María Ximena Hoyos Mazuera"] },
      { h: "8:55 – 9:35 a. m.", tipo: "Libro", t: "Presentación del libro «Entre versos y mares»", p: ["Mónica Patricia Ossa Graín"] },
      { h: "9:40 – 10:25 a. m.", tipo: "Libro", t: "Presentación de su libro y recital", p: ["Jim Persal"] },
      { h: "10:30 – 10:45 a. m.", tipo: "Lectura", t: "Lectura de poemas jurídicos", p: ["María Teresa Aristizábal"] },
      { h: "10:50 – 11:00 a. m.", tipo: "Recital", t: "Recital", p: ["Mario Mathor"] },
      { h: "11:05 – 11:20 a. m.", tipo: "Recital", t: "Recital", p: ["Miriam Castillo Mendoza"] },
      { h: "11:25 – 11:40 a. m.", tipo: "Recital", t: "Recital", p: ["Antonio Prada Fortul"] }
    ]
  },
  {
    dia: 6, esc: "eldorado", jornada: "Mañana", publico: "Adultos mayores",
    sesiones: [
      { h: "8:00 – 8:10 a. m.", tipo: "Acto", t: "Saludo de apertura", p: ["Gloria Inés Sánchez Duque", "Marcela Obando"] },
      { h: "8:15 – 8:55 a. m.", tipo: "Conversatorio", t: "Conversatorio · Cómo trabajar con adultos mayores", p: ["Adela Guerrero Collazos"] },
      { h: "9:00 – 10:00 a. m.", tipo: "Recital", t: "Recital", p: ["John Raigoza", "Gloria Inés Sánchez Duque", "Martha Eugenia Uribe Mutis", "Alfredo Otero Ortega", "Pablo Emilio Beltrán Bejarano"], nota: "Doce minutos por voz." },
      { h: "10:10 – 11:10 a. m.", tipo: "Taller", t: "Taller · La esperanza está en las manos que escriben", p: ["Adalgiza Charria Quintero", "John Raigoza", "Gloria Inés Sánchez Duque", "Martha Eugenia Uribe Mutis", "Pablo Emilio Beltrán Bejarano"] },
      { h: "11:15 – 11:50 a. m.", tipo: "Lectura", t: "Espacio para compartir lo escrito", p: [] }
    ]
  },
  {
    dia: 6, esc: "deporte", jornada: "Mañana",
    sesiones: [
      { h: "8:00 – 8:10 a. m.", tipo: "Acto", t: "Saludo de apertura", p: ["Istina Valoyes Waldo", "Sandra Patricia Koson"] },
      { h: "8:15 – 9:00 a. m.", tipo: "Recital", t: "Recital", p: ["Istina Valoyes Waldo", "Yendier Mosquera Lemus"], nota: "Veintidós minutos por voz." },
      { h: "9:05 – 10:35 a. m.", tipo: "Taller", t: "Taller de escritura · Cuánto quiero a mi tierra", p: ["Yendier Mosquera Lemus", "Istina Valoyes Waldo"] }
    ]
  },
  {
    dia: 6, esc: "campina", jornada: "Mañana",
    sesiones: [
      { h: "8:00 – 8:10 a. m.", tipo: "Acto", t: "Saludo de apertura", p: ["María Antonia Ledesma", "Claudia"] },
      { h: "8:15 – 9:15 a. m.", tipo: "Recital", t: "Recital poético de la esperanza", p: ["Alejandrino Santos Hurtado", "Jaime Eduardo Muñoz Flórez", "María Antonia Ledesma", "Martha Estela Aguilar Guayara"] },
      { h: "9:20 – 9:40 a. m.", tipo: "Recital", t: "Recital declamatorio", p: ["Franz Wisley Aguirre Muñoz", "Luz Stella Vargas Vásquez", "María de los Ángeles Londoño"] },
      { h: "9:45 – 10:35 a. m.", tipo: "Taller", t: "Taller de escritura · Unas palabras a mi comuna", p: ["Alejandrino Santos Hurtado", "Jaime Eduardo Muñoz Flórez", "María Antonia Ledesma", "Martha Estela Aguilar Guayara"] }
    ]
  },
  {
    dia: 6, esc: "sena", jornada: "Mañana",
    sesiones: [
      { h: "8:00 – 8:10 a. m.", tipo: "Acto", t: "Saludo de apertura", p: ["Gloria Amparo Murillo", "Norma Constanza Calderón"] },
      { h: "8:15 – 9:00 a. m.", tipo: "Recital", t: "Recital por la esperanza", p: ["Lina María Pérez", "Amelia Restrepo Hincapié", "Nevis Balanta"], nota: "Quince minutos por voz." },
      { h: "9:05 – 9:35 a. m.", tipo: "Conversatorio", t: "Charla sobre la importancia de querer lo propio", p: ["Gloria Amparo Murillo"] },
      { h: "9:35 – 11:00 a. m.", tipo: "Taller", t: "Taller de escritura · Mi infancia, un motivo para escribir", p: ["Lina María Pérez", "Amelia Restrepo Hincapié", "Nevis Balanta"] }
    ]
  },
  {
    dia: 6, esc: "acacias", jornada: "Mañana",
    sesiones: [
      { h: "8:00 a. m.", tipo: "Acto", t: "Saludo inicial", p: ["Leticia Truque Vélez", "Jheni Amelia Velazco"] },
      { h: "8:00 – 9:00 a. m.", tipo: "Taller", t: "Lectura de poemas y taller para niños con discapacidad cognitiva leve · Palabras que pintan y cantan", p: ["Milton Fabián Solano", "Lina Johana Pérez Montoya"], nota: "Treinta minutos por voz." },
      { h: "9:30 – 11:00 a. m.", tipo: "Taller", t: "Taller y recital · Palabras que transforman", p: ["Jhelga Lorena Pineda", "Milton Fabián Solano", "Lina Johana Pérez Montoya", "Leticia Truque Vélez"] }
    ]
  },
  {
    dia: 6, esc: "cread", jornada: "Mañana",
    sesiones: [
      { h: "10:45 – 11:45 a. m.", tipo: "Lectura", t: "Lectura de poemas", p: ["María Adiela Londoño de Copete", "Nataly Tabima Suárez", "María Florenia Vivas Bohórquez", "Luz Dolly Atehortúa"] },
      { h: "10:45 – 11:45 a. m.", tipo: "Taller", t: "Charla y ejercicio de escritura · La importancia de querer al territorio", p: ["Judith Cartagena", "María Adiela Londoño de Copete"] }
    ]
  },
  {
    dia: 6, esc: "vistahermosa", jornada: "Mañana",
    sesiones: [
      { h: "8:00 – 8:10 a. m.", tipo: "Acto", t: "Saludo inicial", p: ["Sor María Jiménez", "Andrés Acosta"] },
      { h: "8:15 – 9:15 a. m.", tipo: "Recital", t: "Recital poético declamatorio del Pacífico colombiano", p: ["Alexis Ocoró Bonilla", "Félix Domingo Cabezas", "Alfredo «Cheo» Angulo"], nota: "Veinte minutos por voz." },
      { h: "9:20 – 10:20 a. m.", tipo: "Cuentería", t: "Acto de cuentería · Viento de palabras", p: ["Claudia Andrea Torres", "Sor María Jiménez", "María Fabiola Serna González"], nota: "Quince minutos por voz." },
      { h: "10:30 a. m. – 12:00 m.", tipo: "Taller", t: "Taller de escritura · Tejedores de esperanza", p: ["Alexis Ocoró Bonilla", "Félix Domingo Cabezas", "Alfredo «Cheo» Angulo", "Claudia Andrea Torres", "Sor María Jiménez", "María Fabiola Serna González"] }
    ]
  },
  {
    dia: 6, esc: "lamaria", jornada: "Mañana", publico: "Niños y jóvenes de 11 a 17 años",
    sesiones: [
      { h: "9:00 – 9:10 a. m.", tipo: "Acto", t: "Saludo inicial", p: ["Leticia Truque Vélez", "Melisa Castaño"] },
      { h: "9:15 – 10:00 a. m.", tipo: "Recital", t: "Recital poético y lectura de cuentos y relatos", p: ["Leticia Truque Vélez", "María Dolly Montes Tangarife", "Roberto Toala Núñez"], nota: "Nueve minutos por voz." },
      { h: "10:00 – 11:00 a. m.", tipo: "Taller", t: "Taller de escritura para la esperanza · Donde nacen los dragones", p: ["Leticia Truque Vélez", "María Dolly Montes Tangarife", "Roberto Toala Núñez"] }
    ]
  },
  {
    dia: 6, esc: "sanluis", jornada: "Mañana",
    sesiones: [
      { h: "9:00 – 9:10 a. m.", tipo: "Acto", t: "Saludo inicial", p: ["Constanza Eugenia Muñoz Flórez", "Diego"] },
      { h: "9:10 – 11:10 a. m.", tipo: "Recital", t: "Recital poético declamatorio de la esperanza", p: ["Constanza Eugenia Muñoz Flórez", "María Teresa Casas Figueroa", "Henry Patiño Montoya", "Aníbal Gilberto Pantoja Ríos", "Tito Nelio Cuero Murillo", "Margarita Peñalosa Flórez", "Marino Díaz Antía"], nota: "Diecisiete minutos por voz." }
    ]
  },
  {
    dia: 6, esc: "rigoberta", jornada: "Tarde",
    sesiones: [
      { h: "2:00 – 2:10 p. m.", tipo: "Acto", t: "Saludo de apertura", p: ["Sor María Jiménez", "Eccehomo Hazzi"] },
      { h: "2:15 – 3:15 p. m.", tipo: "Cuentería", t: "Presentación especial de cuentería", p: ["Claudia Andrea Torres", "Sor María Jiménez", "María Fabiola Serna González"], nota: "Veinte minutos por voz." },
      { h: "3:20 – 4:20 p. m.", tipo: "Taller", t: "Taller de escritura · Mi comunidad, un motivo para escribir, y lectura de textos", p: ["María Fabiola Serna González", "Claudia Andrea Torres", "Sor María Jiménez"] }
    ]
  },
  {
    dia: 6, esc: "eljardin", jornada: "Tarde", publico: "Adultos",
    sesiones: [
      { h: "2:00 p. m.", tipo: "Acto", t: "Saludo inicial", p: ["Alicia Gómez"] },
      { h: "2:00 – 4:00 p. m.", tipo: "Recital", t: "Recital", p: ["Darinel Restrepo", "Estefany Vanegas", "Adela Guerrero Collazos"] },
      { h: "4:00 – 5:00 p. m.", tipo: "Recital", t: "Recital poético de la esperanza", p: ["Alejandrino Santos Hurtado", "Margarita Peñalosa Flórez", "Jaime Eduardo Muñoz Flórez", "María Antonia Ledesma", "Martha Estela Aguilar Guayara"] },
      { h: "5:15 – 6:00 p. m.", tipo: "Recital", t: "Recital declamatorio", p: ["Franz Wisley Aguirre Muñoz", "María de los Ángeles Londoño"], nota: "Quince minutos por voz." }
    ]
  },
  {
    dia: 6, esc: "acacias", jornada: "Tarde",
    sesiones: [
      { h: "2:30 – 3:10 p. m.", tipo: "Conversatorio", t: "Conversación sobre el arte plástico, la poesía y la educación", p: ["Guillermo Fabián Hoyos", "Gloria Inés Sánchez Duque"] },
      { h: "3:10 – 4:10 p. m.", tipo: "Recital", t: "Recital", p: ["María Adiela Londoño de Copete", "Nataly Tabima Suárez", "María Florenia Vivas Bohórquez", "Luz Dolly Atehortúa", "Constanza Eugenia Muñoz Flórez", "Amelia Restrepo Hincapié"] }
    ]
  },
  {
    dia: 6, esc: "apapachos", jornada: "Tarde",
    sesiones: [
      { h: "3:00 – 6:00 p. m.", tipo: "Recital", t: "Recital poético", p: ["Johana Marulanda Botero", "Jaime Eduardo Muñoz Flórez", "Yarleidy Solar Uribe", "Israel Agudelo Castro", "Henry Patiño Montoya", "Gloria Inés Sánchez Duque"], nota: "Treinta minutos por voz." }
    ]
  },
  {
    dia: 6, esc: "oromo", jornada: "Tarde",
    sesiones: [
      { h: "3:00 – 8:00 p. m.", tipo: "Taller", t: "Taller · Laboratorio de palabras vivas", p: ["Judith Cartagena", "María Adiela Londoño de Copete"], nota: "Noventa minutos." },
      { h: "3:00 – 8:00 p. m.", tipo: "Libro", t: "Presentación del libro «Al oído del fénix»", p: ["Daniel Rivera Meza"] },
      { h: "3:00 – 8:00 p. m.", tipo: "Libro", t: "Presentación del libro «Pedazos de vida»", p: ["Roberto Toala Núñez"] },
      { h: "3:00 – 8:00 p. m.", tipo: "Recital", t: "Recital", p: ["Nataly Tabima Suárez", "María Florenia Vivas Bohórquez", "Luz Dolly Atehortúa", "Wilson Blandón Caicedo", "Stefani UV"], nota: "Veinte minutos por voz." }
    ]
  },
  {
    dia: 6, esc: "libertienda", jornada: "Tarde",
    sesiones: [
      { h: "4:00 – 7:00 p. m.", tipo: "Libro", t: "Presentación del poemario «Carne de papel»", p: ["Gloria Judith López Soto"] },
      { h: "4:00 – 7:00 p. m.", tipo: "Libro", t: "Presentación del libro «El perdón negado»", p: ["Alfredo «Cheo» Angulo"] },
      { h: "4:00 – 7:00 p. m.", tipo: "Libro", t: "Presentación del libro «Polonia la cimarrona»", p: ["Antonio Prada Fortul"] },
      { h: "4:00 – 7:00 p. m.", tipo: "Libro", t: "Presentación de la novela «La mueca bufa de la hiena»", p: ["Carlos Manuel Rivera Rosado"] },
      { h: "4:00 – 7:00 p. m.", tipo: "Libro", t: "Presentación de la novela «El vendedor de libros y la Maricuya»", p: ["Roberto Montes Mathieu"] },
      { h: "4:00 – 7:00 p. m.", tipo: "Libro", t: "Presentación del poemario «Canto Cenú por el borde del camino»", p: ["Miriam Castillo Mendoza"] },
      { h: "4:00 – 7:00 p. m.", tipo: "Libro", t: "Presentación del libro «El faro del lobo, el regreso»", p: ["Robinson Villalobos Velásquez"] },
      { h: "4:00 – 7:00 p. m.", tipo: "Recital", t: "Recital y declamación", p: ["Diomar Leclerc Martínez", "Luz Stella Vargas Vásquez"], nota: "Treinta y cinco minutos por participante en todas las actividades de la tarde." }
    ]
  },
  {
    dia: 6, esc: "alejandria", jornada: "Tarde",
    sesiones: [
      { h: "4:00 – 4:30 p. m.", tipo: "Recital", t: "Recital", p: ["Mateo Rose"] },
      { h: "4:30 – 5:00 p. m.", tipo: "Recital", t: "Recital", p: ["Digna Damaris Escobar Torres"] },
      { h: "5:00 – 5:30 p. m.", tipo: "Recital", t: "Recital", p: ["Xiomara Martínez Deluque"] },
      { h: "5:30 – 6:00 p. m.", tipo: "Recital", t: "Recital", p: ["Aníbal Gilberto Pantoja Ríos"] },
      { h: "6:00 – 6:30 p. m.", tipo: "Recital", t: "Recital", p: ["Martha Estela Aguilar Guayara"] },
      { h: "6:30 – 7:00 p. m.", tipo: "Libro", t: "Presentación del libro «Preso en la libertad de mi existir»", p: ["Darinel Restrepo"] }
    ]
  },
  {
    dia: 6, esc: "sanluis", jornada: "Tarde",
    sesiones: [
      { h: "4:15 – 5:30 p. m.", tipo: "Escena", t: "Intervención costumbrista", p: ["Ana Soris Bermúdez", "Omar Alberto Álvarez Londoño"] }
    ]
  },

  {
    dia: 7, esc: "unilibre", jornada: "Mañana", titulo: "Jornada de clausura · Auditorio",
    sesiones: [
      { h: "8:00 – 8:30 a. m.", tipo: "Libro", t: "Palabras iniciales, presentación del libro «Palabras que convergen» (recital) y apertura de la exposición de pinturas contra la guerra (écfrasis)", p: ["Miriam Castillo Mendoza", "Robinson Villalobos Velásquez", "Diomar Leclerc Martínez", "Martha Eugenia Uribe Mutis", "Pablo Emilio Beltrán Bejarano", "Germán Félix Calvo Sarmiento", "Edinson Tello Bedón", "Sandy Gaviota", "Gloria Inés Sánchez Duque", "Marino Díaz Antía", "María Antonia Ledesma"] },
      { h: "8:35 – 9:20 a. m.", tipo: "Conversatorio", t: "Conversatorio · Mejora de textos: cómo corregir, pulir y estructurar una obra sin perder la voz del autor", p: ["Joseph Berolo Ramos", "Mónica Patricia Ossa Graín", "Milton Fabián Solano"], mod: "Judith Cartagena" },
      { h: "9:25 – 9:40 a. m.", tipo: "Escena", t: "Intervención artística", p: ["Robinson Villalobos Velásquez", "Digna Damaris Escobar Torres", "Xiomara Martínez Deluque"] },
      { h: "9:45 – 9:55 a. m.", tipo: "Recital", t: "Intervención declamatoria", p: ["Diego Jaramillo"] },
      { h: "10:00 – 10:10 a. m.", tipo: "Escena", t: "Salsa caleña · Muestra de baile", p: [], nota: "Grupo artístico de la Junta de Acción Comunal." },
      { h: "10:15 – 10:30 a. m.", tipo: "Recital", t: "Recital · Un poema de hasta pronto a Palabras que convergen", p: ["Constanza Eugenia Muñoz Flórez", "Jhelga Lorena Pineda", "Istina Valoyes Waldo", "Roger Lázaro Ynca", "Roberto Toala Núñez", "Nevis Balanta"], nota: "Un poema por voz." },
      { h: "10:35 – 11:35 a. m.", tipo: "Conversatorio", t: "Cumbre del pensamiento · Hacia dónde van el arte y la literatura", p: ["Roberto Montes Mathieu", "Alfredo «Cheo» Angulo", "Antonio Prada Fortul", "Carlos Manuel Rivera Rosado", "Adalgiza Charria Quintero", "Marco Rogelio Rubio López", "Feliciano Saa Riascos", "Fernando Tamayo Ovalle", "Alexis Ocoró Bonilla"], mod: "Miriam Castillo Mendoza", nota: "Temas: la IA, ¿herramienta o autor?; los cambios en el lenguaje y los nuevos formatos de escritura; la «ficción climática» como el género literario definitivo del siglo XXI; cómo hacer el arte y la literatura accesibles sin precarizar el trabajo de artistas y escritores." },
      { h: "11:40 – 11:50 a. m.", tipo: "Música", t: "Intervención musical", p: ["Marisol Quiroga"] },
      { h: "11:55 a. m. – 1:25 p. m.", tipo: "Acto", t: "Entrega de reconocimientos y homenajes", p: ["Robinson Villalobos Velásquez", "Germán Félix Calvo Sarmiento", "Ángela Penagos Londoño", "Joseph Berolo Ramos", "Miriam Castillo Mendoza"], nota: "Palabras del coordinador Robinson Villalobos Velásquez. Homenajes a Germán Félix Calvo Sarmiento, Martha Eugenia Uribe Mutis y Robinson Villalobos Velásquez. Reconocimientos a Mary Grueso Romero, Adalgiza Charria Quintero, Alejandro Buenaventura Aldeano, Maya Chalez, Alfredo «Cheo» Angulo, Antonio Prada Fortul, Carlos Manuel Rivera Rosado, Daniel Rivera Meza, Dora Luz Muñoz de Cobo, Edinson Tello Bedón, Fernando Tamayo Ovalle, Gloria Amparo Murillo Lloreda, Roxana González Gómez, José Fernando Cano, Jim Persal, Mario Mathor, Marco Rogelio Rubio López, Roger Lázaro Ynca y Wilson Blandón Caicedo." },
      { h: "1:30 – 1:45 p. m.", tipo: "Acto", t: "Evaluación y clausura del evento", p: ["Miriam Castillo Mendoza", "Robinson Villalobos Velásquez", "Germán Félix Calvo Sarmiento"] },
      { h: "1:45 – 2:00 p. m.", tipo: "Música", t: "Intervención musical de cierre", p: ["Sandra Patricia «La Voz»"] }
    ]
  }
];

/* Anfitriones de cada sede: aparecen en la agenda pero no en la sección de ponentes. */
const ANFITRIONES = ["Marcela Obando", "Roxi Gómez", "Alicia Gómez", "Melisa Castaño", "Andrés Acosta", "Jheni Amelia Velazco", "Norma Constanza Calderón", "Eccehomo Hazzi", "Sandra Patricia Koson", "Claudia", "Diego"];

/* Reseñas. alias = nombre artístico. foto = retrato cuadrado en assets/ponentes/ (opcional).
   pais = país de origen; si no se indica, se asume PAIS_SEDE. */
const PAIS_SEDE = "Colombia";
// Países presentes en el festival (cifra del inicio y texto de la sección de ponentes).
const PAISES = ["Colombia", "México", "Panamá", "Perú", "Puerto Rico"];
// Archivo de bandera de cada país, en assets/banderas/.
const BANDERAS = { "Colombia": "co", "México": "mx", "Panamá": "pa", "Perú": "pe", "Puerto Rico": "pr" };
const PERFILES = {
  "Miriam Castillo Mendoza": { foto: "assets/ponentes/miriam-castillo.jpg", bio: "Coordinadora de Palabras que Convergen. Trabajadora social, investigadora, poeta y gestora cultural nacida en Sincelejo y radicada en Chinú, Córdoba; firma como Mara Castell. Premio Nacional de Literatura y embajadora hispanomundial de paz." },
  "Robinson Villalobos Velásquez": { foto: "assets/ponentes/robinson-villalobos.jpg", bio: "Coordinador de Palabras que Convergen. Escritor y poeta nacido en Medellín y residente en Cali, autor de libros de literatura fantástica y de realismo social." },
  "Roberto Montes Mathieu": { foto: "assets/ponentes/roberto-montes.jpg", bio: "Narrador, cuentista, novelista e historiador literario. Padre de la microficción en Colombia y director del Magazín del Caribe." },
  "Alberto Rodríguez": { foto: "assets/ponentes/alberto-rodriguez.jpg", bio: "Filósofo, educador, investigador y escritor. Director de La Casa de la Lectura de Cali." },
  "Mary Grueso": { foto: "assets/ponentes/mary-grueso.jpg", bio: "Poeta y narradora oral de Guapi, Cauca. Autora de «Negra soy» y primera mujer afrocolombiana en la Academia Colombiana de la Lengua." },
  "Antonio Prada Fortul": { foto: "assets/ponentes/antonio-prada-fortul.jpg", bio: "Escritor e investigador cartagenero. Autor de las novelas «Benkos, las alas de un cimarrón» y «Orika, la gacela de la madrugada»." },
  "Lucero Jordán Molina": { foto: "assets/ponentes/lucero-jordan.jpg", bio: "Escritora, poeta ambientalista, compositora y dramaturga colombiana." },
  "María Adiela Londoño de Copete": { foto: "assets/ponentes/adiela-londono.jpg", bio: "Vicepresidenta mundial honoraria de la Unión Hispanomundial de Escritores. Grupo Crisálidas Poéticas de Cartago." },
  "Marco Rogelio Rubio López": { pais: "México", foto: "assets/ponentes/marco-rogelio-rubio.jpg", bio: "Poeta y declamador mexicano, ganador de premios y reconocimientos internacionales." },
  "Alfredo «Cheo» Angulo": { foto: "assets/ponentes/cheo-angulo.jpg", bio: "Compositor, cantautor, periodista y escritor, autor de grandes éxitos de la salsa colombiana. Presidente de Fuespacol." },
  "Judith Cartagena": { foto: "assets/ponentes/judith-cartagena.jpg", bio: "Periodista, poeta, gestora cultural y asesora de comunicaciones. Integrante del Encuentro de Mujeres del Museo Rayo y directora de La Chambrana Cultural." },
  // País sin confirmar: con pais "" no se muestra ninguno.
  "Carlos Manuel Rivera Rosado": { pais: "Puerto Rico", foto: "assets/ponentes/carlos-manuel-rivera.jpg", bio: "Nace en Arecibo, Puerto Rico (1965). Escritor y profesor. Su tesis doctoral, «Memoria y heterotopías, voces autorizadas en Changó el gran putas de Manuel Zapata Olivella», analiza los discursos marginales o periféricos en la novela totalizante del escritor colombiano. Ha publicado textos narrativos en las revistas digitales «Letras Salvajes», «Agentes Catalíticos» y «Trapecio». Publica su primera colección de microrrelatos, «Colt 45 (fractales)», bajo el sello editorial Palabra Pórtico en 2015. En 2019 publica su segunda colección de relatos, «Cocobalé (danza de guerra)», con el mismo sello; esta colección de relatos históricos ganó una mención de honor del PEN Club de Puerto Rico Internacional en 2020. Publica su primera novela del género policial o detectivesco, «La mueca bufa de la hiena», con el sello editorial Lacriba en 2024. Recientemente publica su tercer libro de relatos, «Sueños eléctricos» (2026)." },
  "Joseph Berolo Ramos": { pais: "" },
  "Jim Persal": { pais: "", bio: "Escritor, poeta y declamador (Jaime Humberto Pérez Salazar), creador de la «poesía teontológica». Colectivo de Artistas Atenea." },
  "Maya Chalez": { pais: "", foto: "assets/ponentes/maya-chalez.jpg", bio: "Poeta, escritora y docente de Aguazul, Casanare, radicada en Villavicencio. «Poeta del año 2024» de Mundus Artium Press. Preside la fundación Lenguaje de Esperanzas." },
  "Tatiana Suárez Vásquez": { foto: "assets/ponentes/tatiana-suarez.jpg", bio: "Poeta, escritora infantil, gestora cultural y terapeuta espiritual." },
  "Mario Mathor": { pais: "", bio: "Poeta, docente e investigador bogotano (Mario Bernal Salamanca). Preside la Asociación de Poetas Colombianos (Gremio Poético Colombiano)." },
  "Martha Eugenia Uribe Mutis": { foto: "assets/ponentes/martha-eugenia-uribe.jpg" },
  "Germán Félix Calvo Sarmiento": { foto: "assets/ponentes/german-calvo.jpg", alias: "El Trueno del Capitolio", bio: "Poeta y maestro declamador nacido en Ibagué. Fundador y director del Centro Cultural El Capitolio de Cali." },
  "Sandra Patricia «La Voz»": { foto: "assets/ponentes/sandra-patricia.jpg" },
  "Gloria Amparo Murillo": { foto: "assets/ponentes/gloria-amparo-murillo.jpg", bio: "Etnoeducadora y líder afrofemenina de Cartago, Valle." },
  "Alfredo Otero Ortega": { foto: "assets/ponentes/alfredo-otero.jpg", bio: "Escritor, humanista y gestor cultural, ganador de premios nacionales e internacionales. Investigador reconocido por Minciencias." },
  "Daniel Rivera Meza": { foto: "assets/ponentes/daniel-rivera-meza.jpg", bio: "Profesor, escritor y formador en talleres literarios de Sincelejo, Sucre. Ha publicado cinco libros; el último fue traducido al francés." },
  "Diomar Leclerc Martínez": { foto: "assets/ponentes/diomar-leclerc.jpg", bio: "Poeta de Chinú, Córdoba, gestora cultural, docente y tallerista de literatura. Dirige la página cultural «Chinú, la casa grande de la poesía»." },
  "Adalgiza Charria Quintero": { foto: "assets/ponentes/adalgiza-charria.jpg" },
  "Pablo Emilio Beltrán Bejarano": { foto: "assets/ponentes/pablo-emilio-beltran.jpg", bio: "Comunicador social, periodista, escritor y locutor de Facatativá, Cundinamarca. Subdirector de Cafeletreando." },
  "Roger Lázaro Ynca": { foto: "assets/ponentes/roger-lazaro-ynca.jpg", pais: "Perú", bio: "Poeta y narrador de Trujillo, Perú. Primer premio OROLA 2016 (Madrid) y del Certamen de Poesía Enrique Pleguezuelo 2021 (Córdoba, España)." },
  "Gloria Inés Sánchez Duque": { bio: "Escritora, poeta y artista plástica de Buga." },
  "Dora Luz Muñoz de Cobo": { foto: "assets/ponentes/dora-luz-munoz.jpg" },
  "Ángela Penagos Londoño": { foto: "assets/ponentes/angela-penagos.jpg", bio: "Poeta, contadora de historias y gestora cultural. Fundadora y presidenta de la Red de Mujeres Artistas de Medellín (Remart)." },
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
  "Yarleidy Solar Uribe": { foto: "assets/ponentes/yarleidy-solar.jpg", bio: "Escritora y gestora cultural de Tierralta, Córdoba. Dirige el taller literario Genuina." },
  "Istina Valoyes Waldo": { foto: "assets/ponentes/istina-valoyes.jpg", bio: "Poeta, terapeuta del lenguaje y declamadora vinculada a la cultura del Chocó." },
  "Yendier Mosquera Lemus": { foto: "assets/ponentes/yendier-mosquera.jpg", bio: "Escritor, poeta y profesional de la salud. Autor de «Así vivimos: poesías, cartas y consejos de mi región»." },
  "Leticia Truque Vélez": { alias: "Colombia Truque", bio: "Escritora y traductora. Premio Nacional de Cuento." },
  "María Dolly Montes Tangarife": { bio: "Escritora, pintora, escultora y gestora cultural de Caldas. Creadora del premio de literatura DOMOTA." },
  "Lina Johana Pérez Montoya": { alias: "Lilimar", bio: "Poeta de Remart. Une la palabra con la psicología del bienestar, el mindfulness y la inteligencia emocional." },
  "Roberto Toala Núñez": { bio: "Escritor de microrrelatos vinculado a la identidad de Cali y el Valle." },
  "Claudia Andrea Torres": { foto: "assets/ponentes/claudia-torres.jpg", bio: "Narradora oral, cuentera y pedagoga infantil. Fundación Cultural Viva Palabra." },
  "María Fabiola Serna González": { foto: "assets/ponentes/fabiola-serna.jpg", bio: "Cuentera, poeta y gestora cultural. Ganadora del festival Entre Cuentos y Flores." },
  "Constanza Eugenia Muñoz Flórez": { alias: "Luna de Nácar", bio: "Educadora, escritora y poeta caleña de Poetas de la Calle, residente en Medellín." },
  "Margarita Rosa Patiño Arbeláez": { bio: "Poeta, escritora y ensayista. Participante del Encuentro de Mujeres Poetas Colombianas del Museo Rayo." },
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
  "María de los Ángeles Londoño": { foto: "assets/ponentes/maria-angeles-londono.jpg", bio: "Poeta y declamadora independiente, impulsora de la literatura digital audiovisual." },
  "Jhelga Lorena Pineda": { bio: "Integrante de la Red de Escritoras de Caldas. Trabaja las narrativas femeninas." },
  "Johana Marulanda Botero": { bio: "Psicóloga vinculada al área de salud y bienestar." },
  "Guillermo Fabián Hoyos": { bio: "Artista visual y pedagogo. Integrante del Salón de Artistas Intercontinental de Cali." },
  "Lina María Pérez": { bio: "Poeta de Remart y del nodo de literatura." },
  "Gloria Elena Gutiérrez": { alias: "Guty" },
  "José Ignacio Cáceres Serna": { alias: "Nacho", bio: "Artista plástico, gestor cultural y escritor de Los Patios, Norte de Santander. Asociación Sociocultural Casa de Piedra." },
  "Marisol Quiroga": { foto: "assets/ponentes/marisol-quiroga.jpg", alias: "Guatipana" },
  "Feliciano Saa Riascos": { alias: "Cheo Saa" },
  "Luz Stella Salazar López": { foto: "assets/ponentes/luz-stella-salazar.jpg", bio: "Pluma, verso y canción." },
  "Nauro Torres Quintero": { bio: "Escritor de la cultura campesina andina de Santander. Investiga e integra los saberes guanes y muiscas." },
  "John Raigoza": { bio: "Poeta caleño, director de talleres literarios y coordinador de la agenda cultural de la Biblioteca del Centenario de Cali." },
  "Fernando Tamayo Ovalle": { bio: "Director de la Biblioteca Departamental Jorge Garcés Borrero de Cali." },
  "Roxana González Gómez": { bio: "Directora de la Red Municipal de Bibliotecas de Cali." },
  "Héctor Granada": { bio: "Director de la librería independiente Libertienda de Cali." },
  "Gloria Judith López Soto": { bio: "Poeta y gestora cultural de Medellín. Autora de «Soy piel de letras» y fundadora del grupo poético Voces Unidas." },
  "Wilson Blandón Caicedo": { bio: "Escritor, poeta, gestor cultural y docente de escritura creativa." },
  "Amelia Restrepo Hincapié": { bio: "Educadora, poeta, escritora e investigadora de Risaralda, radicada en Pereira." },
  "Mateo Rose": { bio: "Actor, escritor, dramaturgo, guionista y director de cine y teatro de Cali." },
  "Stefani UV": { bio: "Poeta de la Fundación Grainart." },
  "Digna Damaris Escobar Torres": { alias: "Sohara" }
};

/* Quienes organizan el festival: aparecen en su propia sección, antes de la inscripción. */
const ORGANIZADORES = [
  { nombre: "Miriam Castillo Mendoza", rol: "Coordinadora del festival" },
  { nombre: "Robinson Villalobos Velásquez", rol: "Coordinador del festival" }
];

/* Carrusel de voces destacadas, en este orden. rol = etiqueta sobre el nombre. */
const DESTACADOS = [
  { nombre: "Miriam Castillo Mendoza", rol: "Coordinadora del festival" },
  { nombre: "Robinson Villalobos Velásquez", rol: "Coordinador del festival" },
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
  { nombre: "Susana María Moreno Palacios", rol: "Red Étnica de Escritores del Chocó" }
];

const COLECTIVOS =["Poetas de la Calle", "Crisálidas Poéticas de Cartago", "Colectivo Caribe", "Universo de Palabras", "Colectivo Escritoras del Chocó", "Asociación Casa de Piedra", "Alfabeto del Mundo", "Remart", "Abe'scritos", "Gremio Poético Colombiano", "Fuespacol", "Verbum", "Fundación Cultural Viva Palabra", "Red Étnica de Escritores del Chocó", "Libertad Poética Femenina", "Grupo Plenilunio", "Lenguaje de Esperanzas", "Cafeletreando"];
