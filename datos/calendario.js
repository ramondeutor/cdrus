/* =========================================================
   CALENDARIO DE PARTIDOS
   =========================================================
   Cómo actualizarlo (5 minutos a la semana o al inicio de temporada):

   1. Entra en la web de la Real Federación Andaluza de Fútbol:
      https://www.rfaf.es  →  Competiciones  →  Calendarios y resultados
      Elige la temporada, la competición y el grupo del CD Rus E.F.
   2. Copia los datos de cada jornada y rellena un bloque como el de ejemplo.

   Campos de cada partido:
     jornada ...... número de jornada (sin comillas)
     fecha ........ "AAAA-MM-DD"  →  "2026-10-04"
     hora ......... "HH:MM"       →  "18:00"   (déjalo "" si aún no se sabe)
     rival ........ nombre del equipo rival, tal como sale en la federación
     local ........ true  = el partido es en Rus (CASA)
                    false = el partido es fuera (VISITANTE)
     resultado .... "" mientras no se haya jugado.
                    Cuando se juegue, escribe el marcador con el Rus DELANTE:
                    "3-1"  (aunque el partido sea fuera)
     golesFavor ... goles del Rus   (opcional; sirve para colorear el resultado)
     golesContra .. goles del rival (opcional)

   IMPORTANTE: los partidos se ordenan solos por fecha. No hace falta
   que los escribas en orden, pero sí que estén todos dentro de la lista
   "partidos: [ ... ]", separados por comas.
   ========================================================= */

window.DATOS = window.DATOS || {};

window.DATOS.calendario = {

  competicion: "Liga provincial de Jaén",
  grupo: "",
  temporada: "2026/2027",

  fuenteTexto: "Calendario oficial de la Real Federación Andaluza de Fútbol.",
  fuenteUrl: "https://www.rfaf.es/pnfg/NPcd/NFG_CmpJornada?cod_primaria=1000120",

  /* -------- LISTA DE PARTIDOS (edita desde aquí) -------- */
  partidos: [
    // --- Ejemplos: sustitúyelos por los partidos reales ---
    { jornada: 1,  fecha: "2026-09-13", hora: "18:00", rival: "Equipo de ejemplo A",   local: true,  resultado: "2-1", golesFavor: 2, golesContra: 1 },
    { jornada: 2,  fecha: "2026-09-20", hora: "17:30", rival: "Equipo de ejemplo B",   local: false, resultado: "0-0", golesFavor: 0, golesContra: 0 },
    { jornada: 3,  fecha: "2026-09-27", hora: "18:00", rival: "Equipo de ejemplo C",   local: true,  resultado: "1-3", golesFavor: 1, golesContra: 3 },
    { jornada: 4,  fecha: "2026-10-04", hora: "17:00", rival: "Equipo de ejemplo D",   local: false, resultado: "",    golesFavor: null, golesContra: null },
    { jornada: 5,  fecha: "2026-10-11", hora: "18:00", rival: "Equipo de ejemplo E",   local: true,  resultado: "",    golesFavor: null, golesContra: null },
    { jornada: 6,  fecha: "2026-10-18", hora: "",      rival: "Equipo de ejemplo F",   local: false, resultado: "",    golesFavor: null, golesContra: null }
  ]
};
