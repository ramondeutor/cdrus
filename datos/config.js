/* =========================================================
   DATOS GENERALES DEL CLUB  —  ESTE ES EL ARCHIVO QUE MÁS VAS A EDITAR
   =========================================================
   Reglas básicas:
   - Texto entre "comillas dobles". Si el texto lleva comillas, usa 'simples'.
   - Cada línea termina en coma, menos la última.
   - Los [corchetes] son listas. No borres los corchetes ni las comas.
   - Guarda el archivo y sube la web de nuevo para ver los cambios.
   ========================================================= */

window.DATOS = window.DATOS || {};

window.DATOS.config = {

  /* --- Identidad del club --- */
  nombreClub: "Club Deportivo Rus E.F.",
  lema: "Orgullo de un pueblo, fútbol de cantera",
  temporada: "2026/2027",

  /* --- Imágenes --- */
  // Foto grande de la portada. Guárdala en la carpeta img/ y escribe aquí su nombre.
  // Si dejas "" no pasa nada: la portada usa el color del club.
  imagenPortada: "img/portada.jpg",

  /* =========================================================
     HISTORIA DEL CLUB  —  AQUÍ EDITAS EL CONTENIDO
     =========================================================
     Escribe tu historia como una lista de bloques.

     Un párrafo normal:
       "Aquí va el texto del párrafo.",

     Un subtítulo seguido de su párrafo:
       { titulo: "Nuestra cantera", texto: "Aquí va el texto." },

     Puedes poner todos los bloques que quieras, en el orden que quieras.
     Para borrar uno, borra la línea entera (con su coma).
     ========================================================= */

  historia: [
    { titulo: "Los comienzos", texto: "El Club Deportivo Rus nació del empeño de un grupo de vecinos que querían que el pueblo tuviera un equipo con el que identificarse, corrían  los años 50. Desde los primeros partidos en el campo municipal, ubicado al principio en la zona de El Prado, el club ha crecido al ritmo de su cantera." },
    { titulo: "Décadas de fútbol", texto: "A lo largo de los años el club ha vivido ascensos, temporadas difíciles y, sobre todo, una afición que nunca ha dejado solo al equipo. La grada de Rus es grande y ruidosa, y ese apoyo ha mantenido vivo el proyecto temporada tras temporada." },
    { titulo: "Nuestra filosofía", texto: "Formar jugadores y personas. El trabajo de base, el respeto al rival y el compromiso con el pueblo son las señas de identidad que el club quiere mantener." }
  ],

  /* --- Contacto --- */
  contacto: {
    direccion: "Calle Tercia, 6",
    localidad: "Rus (Jaén)",
    telefono: "654 86 33 21",
    email: "cdrusef@outlook.es",
    horario: "Lunes a viernes, de 18:00 a 20:00"
  },

  /* --- Redes sociales --- */
  // Deja "" en las que no tengas. Para quitar una, borra la línea entera.
  redes: {
    facebook: "CD RUS senior",
    instagram: "CD RUS senior",
    twitter: ""
  }
};
