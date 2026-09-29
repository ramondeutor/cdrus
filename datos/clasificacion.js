/* =========================================================
   CLASIFICACIÓN  —  tras la jornada 3
   =========================================================
   Datos oficiales de Universo RFAF (Pts, PJ y DG).
   Las columnas G, E, P, GF y GC se han reconstruido a partir de los
   resultados de las tres jornadas publicados por la federación.

   Para actualizar cada semana: copia Pts, PJ y DG de la web de la RFAF
   y ajusta G, E, P, GF y GC con los resultados de la jornada.

   El campo club: true marca la fila del Rus E.F. para resaltarla.
   ========================================================= */

window.DATOS = window.DATOS || {};

window.DATOS.clasificacion = {

  competicion: "Liga provincial de Jaén",
  grupo: "",
  jornada: 3,

  actualizado: "2026-09-27",

  fuenteTexto: "Clasificación oficial de Universo RFAF tras la jornada 3.",
  fuenteUrl: "https://www.universorfaf.es/competitions/results/48466104?group=48466107&season=22&delegation=7&round=1",

  /* -------- LISTA DE EQUIPOS (edita desde aquí) -------- */
  equipos: [
    { equipo: "IBROS C.F.",                           pj: 3, g: 2, e: 0, p: 1, golesFavor: 6,  golesContra: 2,  puntos: 6, club: false },
    { equipo: "RECREATIVO DE BAILEN C.F.",            pj: 2, g: 2, e: 0, p: 0, golesFavor: 5,  golesContra: 2,  puntos: 6, club: false },
    { equipo: "U.D. GUARROMAN",                       pj: 3, g: 2, e: 0, p: 1, golesFavor: 7,  golesContra: 4,  puntos: 6, club: false },
    { equipo: "CLUB DEPORTIVO RUS EQUIPOS DE FUTBOL", pj: 3, g: 2, e: 0, p: 1, golesFavor: 7,  golesContra: 5,  puntos: 6, club: true  },
    { equipo: "BAÑOS CLUB DEPORTIVO 2022",            pj: 3, g: 2, e: 0, p: 1, golesFavor: 6,  golesContra: 4,  puntos: 6, club: false },
    { equipo: "C.D. CANENA ATLETICO",                 pj: 2, g: 1, e: 1, p: 0, golesFavor: 9,  golesContra: 0,  puntos: 4, club: false },
    { equipo: "C.D. LUPION ATLETICO C.F.",            pj: 3, g: 1, e: 1, p: 1, golesFavor: 6,  golesContra: 8,  puntos: 4, club: false },
    { equipo: "C.D. ATLETICO MENGIBAR",               pj: 2, g: 1, e: 0, p: 1, golesFavor: 5,  golesContra: 6,  puntos: 3, club: false },
    { equipo: "CLUB DEPORTIVO REALEB",                pj: 3, g: 0, e: 1, p: 2, golesFavor: 4,  golesContra: 7,  puntos: 1, club: false },
    { equipo: "VILLARGORDO C.F.",                     pj: 3, g: 0, e: 1, p: 2, golesFavor: 3,  golesContra: 7,  puntos: 1, club: false },
    { equipo: "CLUB DEPORTIVO LOS GACHIS FUTSAL",     pj: 3, g: 0, e: 0, p: 3, golesFavor: 2,  golesContra: 15, puntos: 0, club: false }
  ]
};
