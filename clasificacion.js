/* =========================================================
   CLASIFICACIÓN  —  se actualiza una vez por semana
   =========================================================
   Cómo actualizarla:
   1. En la web de la RFAF, en la misma pantalla del calendario,
      pincha en la pestaña "Clasificación".
   2. Copia las filas del grupo del CD Rus E.F. y escríbelas aquí.
   3. Actualiza también el número de jornada y la fecha.

   Campos de cada equipo:
     equipo ....... nombre tal como aparece en la federación
     pj ........... partidos jugados
     g / e / p .... ganados / empatados / perdidos
     golesFavor ... goles a favor
     golesContra .. goles en contra
     puntos ....... puntos
     club ......... deja true SOLO en la fila del Club Deportivo Rus E.F.

   La tabla se ordena sola por puntos y, en caso de empate, por diferencia
   de goles. No te preocupes por el orden en que las escribas.
   ========================================================= */

window.DATOS = window.DATOS || {};

window.DATOS.clasificacion = {

  competicion: "Liga provincial de Jaén",
  grupo: "",
  jornada: 3,

  // Fecha en que has copiado esta tabla. Aparece al pie de la tabla.
  actualizado: "2026-09-28",

  fuenteTexto: "Datos tomados de la clasificación oficial de la RFAF.",
  fuenteUrl: "https://www.rfaf.es/pnfg/NPcd/NFG_CmpJornada?cod_primaria=1000120",

  /* -------- LISTA DE EQUIPOS (edita desde aquí) -------- */
  equipos: [
    // --- Ejemplos: sustitúyelos por la clasificación real ---
    { equipo: "Equipo de ejemplo C",         pj: 3, g: 3, e: 0, p: 0, golesFavor: 8, golesContra: 2, puntos: 9, club: false },
    { equipo: "Club Deportivo Rus E.F.",     pj: 3, g: 2, e: 0, p: 1, golesFavor: 5, golesContra: 3, puntos: 6, club: true  },
    { equipo: "Equipo de ejemplo B",         pj: 3, g: 1, e: 2, p: 0, golesFavor: 4, golesContra: 3, puntos: 5, club: false },
    { equipo: "Equipo de ejemplo A",         pj: 3, g: 1, e: 1, p: 1, golesFavor: 4, golesContra: 4, puntos: 4, club: false },
    { equipo: "Equipo de ejemplo D",         pj: 3, g: 1, e: 1, p: 1, golesFavor: 3, golesContra: 4, puntos: 4, club: false },
    { equipo: "Equipo de ejemplo E",         pj: 3, g: 0, e: 2, p: 1, golesFavor: 2, golesContra: 5, puntos: 2, club: false },
    { equipo: "Equipo de ejemplo F",         pj: 3, g: 0, e: 0, p: 3, golesFavor: 1, golesContra: 6, puntos: 0, club: false }
  ]
};
