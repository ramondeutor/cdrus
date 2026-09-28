/* =========================================================
   VENTA DE PRODUCTOS DEL CLUB  —  tienda
   =========================================================
   Cada producto es un bloque { ... } dentro de la lista productos: [ ... ].
   Puedes tener tantos como quieras. Para borrar uno, borra su bloque entero,
   desde la llave { hasta la coma que cierra.

   Campos de cada producto:
     nombre ..... nombre del producto (ej. "Camiseta oficial 2026/2027")
     precio ..... precio tal como quieres que se vea (ej. "35 €")
     antes ...... precio anterior, para mostrar una rebaja (opcional, "" si no hay)
     categoria .. "Ropa", "Accesorios", "Equipación", "Regalos"... sirve para
                  el filtro de arriba de la tienda
     descripcion  frase corta de una o dos líneas
     tallas ..... lista de tallas o variantes disponibles. Si no tiene, deja []
     foto ....... ruta de la foto: "img/producto-camiseta.jpg"
     fotoAlt .... descripción de la foto para accesibilidad
     destacado .. true para marcar el producto como "Novedad" o "Oferta"
     etiqueta ... texto de la cinta de destacado (ej. "Novedad", "Oferta")
     stock ...... true si hay unidades, false si está agotado

   CÓMO SE VENDE (lee esto, es importante):
   Como el alojamiento es gratuito y no hay servidor ni pasarela de pago, el
   botón de cada producto abre el WhatsApp o el correo del club con el pedido
   ya escrito: producto, talla y precio. Así el club recibe el pedido, confirma
   disponibilidad y cobra en mano o por transferencia.

   Configura en este mismo archivo:
     whatsapp ........ número del club con prefijo del país, solo números y sin
                       espacios ni el signo + (ej. "34600112233"). Si lo dejas
                       "", el botón usará el correo electrónico en su lugar.
     emailPedidos .... correo al que llegan los pedidos.
     formaPago ....... frase que explica cómo se paga y cómo se recoge.
   ========================================================= */

window.DATOS = window.DATOS || {};

window.DATOS.productos = {

  intro: "La equipación y los complementos oficiales del club. Los pedidos se hacen por WhatsApp o correo y se recogen en el campo municipal.",

  /* -------- DATOS PARA RECIBIR LOS PEDIDOS (edita aquí) -------- */
  whatsapp: "",                          // ej. "34600112233"
  emailPedidos: "cdeportivorus@gmail.com",

  formaPago: "Pedido por WhatsApp o correo. Pagas al recogerlo en el campo municipal, en efectivo o por transferencia.",

  nota: "Las tallas y el stock se actualizan a mano. Si ves algo que no está disponible, escríbenos.",

  /* -------- LISTA DE PRODUCTOS (edita desde aquí) -------- */
  productos: [
    {
      nombre: "Camiseta oficial 2026/2027",
      precio: "35 €",
      antes: "",
      categoria: "Ropa",
      descripcion: "Camiseta de juego del primer equipo, tejido transpirable.",
      tallas: ["S", "M", "L", "XL", "XXL"],
      foto: "img/producto-camiseta.jpg",
      fotoAlt: "Camiseta oficial del Club Deportivo Rus E.F.",
      destacado: true,
      etiqueta: "Novedad",
      stock: true
    },
    {
      nombre: "Sudadera del club",
      precio: "40 €",
      antes: "",
      categoria: "Ropa",
      descripcion: "Sudadera con capucha y escudo bordado en el pecho.",
      tallas: ["S", "M", "L", "XL"],
      foto: "img/producto-sudadera.jpg",
      fotoAlt: "Sudadera con capucha del Club Deportivo Rus E.F.",
      destacado: false,
      etiqueta: "",
      stock: true
    },
    {
      nombre: "Bufanda de aficionado",
      precio: "15 €",
      antes: "",
      categoria: "Accesorios",
      descripcion: "Bufanda tejida con los colores del club, para la grada.",
      tallas: [],
      foto: "img/producto-bufanda.jpg",
      fotoAlt: "Bufanda del Club Deportivo Rus E.F.",
      destacado: false,
      etiqueta: "",
      stock: true
    },
    {
      nombre: "Taza del club",
      precio: "10 €",
      antes: "12 €",
      categoria: "Regalos",
      descripcion: "Taza de cerámica con el escudo del club.",
      tallas: [],
      foto: "img/producto-taza.jpg",
      fotoAlt: "Taza con el escudo del Club Deportivo Rus E.F.",
      destacado: true,
      etiqueta: "Oferta",
      stock: true
    },
    {
      nombre: "Equipación de portero",
      precio: "45 €",
      antes: "",
      categoria: "Equipación",
      descripcion: "Conjunto de camiseta y pantalón para porteros.",
      tallas: ["M", "L", "XL"],
      foto: "img/producto-portero.jpg",
      fotoAlt: "Equipación de portero del Club Deportivo Rus E.F.",
      destacado: false,
      etiqueta: "",
      stock: false
    }
  ]
};
