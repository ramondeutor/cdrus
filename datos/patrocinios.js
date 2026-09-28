/* =========================================================
   TARIFA DE PATROCINIOS  —  fotografía + texto
   =========================================================
   Cada pack es un bloque { ... } dentro de la lista packs: [ ... ].
   Puedes tener tantos packs como quieras. Para borrar uno, borra su bloque
   entero, desde la llave { hasta la coma que cierra.

   Campos de cada pack:
     nombre ....... título del pack (ej. "Pack Oro")
     precio ....... texto libre (ej. "500 €" o "Desde 250 €")
     periodo ...... texto pequeño bajo el precio (ej. "por temporada")
     descripcion .. frase corta que resume el pack
     incluye ...... lista de lo que incluye, cada línea entre comillas
     foto ......... ruta de la fotografía: "img/patrocinio-oro.jpg"
                    (sube la foto a la carpeta img/)
     fotoAlt ...... descripción de la foto para accesibilidad
     destacado .... true para resaltar el pack con la cinta "Recomendado"
     botonTexto ... texto del botón (opcional)

   NOTA: en estas fotos suele funcionar bien una imagen del campo, de la
   equipación o del cartel en el campo donde va el patrocinador.
   ========================================================= */

window.DATOS = window.DATOS || {};

window.DATOS.patrocinios = {

  intro: "Estas son las opciones para las empresas y comercios que quieran apoyar al club esta temporada. Cada pack combina presencia en la equipación, el campo y esta web.",

  /* -------- LISTA DE PACKS (edita desde aquí) -------- */
  packs: [
    {
      nombre: "Pack Principal",
      precio: "1.200 €",
      periodo: "por temporada",
      descripcion: "La máxima presencia de tu marca en el club.",
      incluye: [
        "Nombre en el pecho de la camiseta del primer equipo",
        "Valla publicitaria de 3 × 1 m en el campo municipal",
        "Logo grande en la portada de esta web",
        "Mención en todas las redes sociales del club",
        "4 entradas de palco para todos los partidos en casa"
      ],
      foto: "img/patrocinio-principal.jpg",
      fotoAlt: "Camiseta del Club Deportivo Rus E.F. con el patrocinador principal",
      destacado: true,
      botonTexto: "Quiero este pack"
    },
    {
      nombre: "Pack Oro",
      precio: "600 €",
      periodo: "por temporada",
      descripcion: "Presencia destacada en campo y web.",
      incluye: [
        "Valla publicitaria de 2 × 1 m en el campo municipal",
        "Logo mediano en la página de patrocinadores",
        "Mención en las redes sociales del club",
        "2 entradas de palco para los partidos en casa"
      ],
      foto: "img/patrocinio-oro.jpg",
      fotoAlt: "Valla publicitaria en el campo municipal de Rus",
      destacado: false,
      botonTexto: "Quiero este pack"
    },
    {
      nombre: "Pack Plata",
      precio: "300 €",
      periodo: "por temporada",
      descripcion: "Una forma sencilla de apoyar al club.",
      incluye: [
        "Logo pequeño en la página de patrocinadores",
        "Mención en las redes sociales del club",
        "2 entradas para los partidos en casa"
      ],
      foto: "img/patrocinio-plata.jpg",
      fotoAlt: "Afición del Club Deportivo Rus E.F. en la grada",
      destacado: false,
      botonTexto: "Quiero este pack"
    }
  ],

  /* -------- CONDICIONES (una línea por condición) -------- */
  condiciones: [
    "Los precios son orientativos y se pueden adaptar: hablemos y buscamos la fórmula que mejor encaje con tu negocio.",
    "El pago se puede fraccionar en dos plazos, al inicio y a mitad de temporada.",
    "Los materiales publicitarios (valla, cartelería) los aporta el club; el diseño del logo lo facilita el patrocinador.",
    "La duración del patrocinio es de una temporada completa (de septiembre a junio).",
    "Para cualquier duda, escríbenos desde la sección de contacto y te preparamos una propuesta a medida."
  ]
};
