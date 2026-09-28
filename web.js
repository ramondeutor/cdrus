/* =========================================================
   Club Deportivo Rus E.F. — lógica de la web
   No hace falta tocar este archivo: todo el contenido editable
   está en la carpeta /datos.
   ========================================================= */
(function () {
  "use strict";

  var D = window.DATOS || {};
  var CONFIG = D.config || {};
  var CALENDARIO = D.calendario || {};
  var CLASIFICACION = D.clasificacion || {};
  var PATROCINIOS = D.patrocinios || {};
  var PATROCINADORES = D.patrocinadores || {};
  var TIENDA = D.productos || {};

  /* ---------- Utilidades ---------- */

  function $(sel, raiz) { return (raiz || document).querySelector(sel); }
  function $$(sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); }

  function el(tag, clase, texto) {
    var n = document.createElement(tag);
    if (clase) n.className = clase;
    if (texto !== undefined && texto !== null) n.textContent = texto;
    return n;
  }

  function escribirTexto(clave, valor) {
    if (!valor) return;
    $$('[data-campo="' + clave + '"]').forEach(function (n) { n.textContent = valor; });
  }

  var MESES = ["enero","febrero","marzo","abril","mayo","junio","julio",
               "agosto","septiembre","octubre","noviembre","diciembre"];
  var DIAS = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];

  function formatearFecha(iso) {
    if (!iso) return "Por confirmar";
    var p = String(iso).split("-");
    if (p.length !== 3) return String(iso);
    var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    if (isNaN(d.getTime())) return String(iso);
    return DIAS[d.getDay()].charAt(0).toUpperCase() + DIAS[d.getDay()].slice(1) +
           ", " + d.getDate() + " de " + MESES[d.getMonth()];
  }

  function hoyISO() {
    var d = new Date();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var dd = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + dd;
  }

  /* ---------- 1. Textos generales ---------- */

  escribirTexto("nombre", CONFIG.nombreClub);
  escribirTexto("lema", CONFIG.lema);
  escribirTexto("temporada", CONFIG.temporada ? "Temporada " + CONFIG.temporada + " · Rus (Jaén)" : "");
  escribirTexto("temporada-pie", CONFIG.temporada ? "Temporada " + CONFIG.temporada : "");
  escribirTexto("patrocinios-intro", PATROCINIOS.intro);
  escribirTexto("patrocinadores-intro", PATROCINADORES.intro);

  if (CONFIG.temporada) document.title = CONFIG.nombreClub + " — Temporada " + CONFIG.temporada;

  /* Imagen de portada y escudo: se ocultan si el archivo aún no existe. */
  var portada = $("[data-portada]");
  if (portada) {
    if (!CONFIG.imagenPortada) { portada.classList.add("hero__fondo--oculto"); }
    else {
      portada.src = CONFIG.imagenPortada;
      portada.onerror = function () { portada.classList.add("hero__fondo--oculto"); };
    }
  }
  var escudo = $("[data-escudo]");
  if (escudo) {
    escudo.onerror = function () {
      escudo.classList.add("marca__escudo--oculto");
    };
  }

  /* ---------- 2. Historia ---------- */

  var cajaHistoria = $("[data-historia]");
  if (cajaHistoria && Array.isArray(CONFIG.historia) && CONFIG.historia.length) {
    cajaHistoria.innerHTML = "";
    CONFIG.historia.forEach(function (bloque) {
      if (typeof bloque === "string") {
        cajaHistoria.appendChild(el("p", null, bloque));
        return;
      }
      if (bloque && bloque.titulo) cajaHistoria.appendChild(el("h3", null, bloque.titulo));
      if (bloque && bloque.texto) cajaHistoria.appendChild(el("p", null, bloque.texto));
    });
  }

  /* ---------- 3. Calendario ---------- */

  var cuerpoCalendario = $("[data-calendario]");
  var filtros = $("[data-filtros-calendario]");
  var hoy = hoyISO();
  var partidos = (Array.isArray(CALENDARIO.partidos) ? CALENDARIO.partidos : []).slice()
    .sort(function (a, b) { return String(a.fecha || "").localeCompare(String(b.fecha || "")); });

  function signoResultado(p) {
    if (!p.resultado) return "";
    var g = Number(p.golesFavor), c = Number(p.golesContra);
    if (!isNaN(g) && !isNaN(c)) {
      if (g > c) return "G";
      if (g === c) return "E";
      return "P";
    }
    // Si no hay goles desglosados, se deduce del texto "2-1".
    var m = String(p.resultado).match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);
    if (m) {
      var a = Number(m[1]), b = Number(m[2]);
      return a > b ? "G" : (a === b ? "E" : "P");
    }
    return "";
  }

  function pintarCalendario(filtro) {
    if (!cuerpoCalendario) return;
    cuerpoCalendario.innerHTML = "";

    var lista = partidos.filter(function (p) {
      if (filtro === "casa") return p.local;
      if (filtro === "fuera") return !p.local;
      if (filtro === "jugados") return !!p.resultado;
      if (filtro === "pendientes") return !p.resultado;
      return true;
    });

    if (!lista.length) {
      var tr = el("tr");
      var td = el("td", null, "Todavía no hay partidos para mostrar en esta pestaña.");
      td.colSpan = 6;
      td.style.textAlign = "center";
      td.style.padding = "34px 14px";
      td.style.color = "#5c6875";
      tr.appendChild(td);
      cuerpoCalendario.appendChild(tr);
      return;
    }

    lista.forEach(function (p) {
      var jugado = !!p.resultado;
      var proximo = !jugado && p.fecha && p.fecha >= hoy;
      var tr = el("tr", proximo ? "fila-proximo" : "");

      tr.appendChild(el("td", null, p.jornada != null ? "J" + p.jornada : "—"));
      tr.appendChild(el("td", null, formatearFecha(p.fecha)));

      var tdHora = el("td", null, p.hora || "—");
      tr.appendChild(tdHora);

      tr.appendChild(el("td", null, p.rival || "Por confirmar"));

      var tdCond = el("td");
      tdCond.appendChild(el("span",
        "condicion " + (p.local ? "condicion--casa" : "condicion--fuera"),
        p.local ? "Local" : "Visitante"));
      tr.appendChild(tdCond);

      var tdRes = el("td");
      if (jugado) {
        var signo = signoResultado(p);
        var clase = signo === "G" ? " resultado--g" : (signo === "E" ? " resultado--e" : (signo === "P" ? " resultado--p" : ""));
        tdRes.appendChild(el("span", "resultado" + clase, p.resultado));
      } else {
        tdRes.appendChild(el("span", null, "—"));
      }
      tr.appendChild(tdRes);

      cuerpoCalendario.appendChild(tr);
    });
  }

  if (filtros && partidos.length) {
    var opciones = [
      ["todos", "Todos"],
      ["casa", "En casa"],
      ["fuera", "Fuera"],
      ["pendientes", "Próximos"],
      ["jugados", "Jugados"]
    ];
    opciones.forEach(function (op) {
      var b = el("button", null, op[1]);
      b.type = "button";
      b.setAttribute("aria-pressed", op[0] === "todos" ? "true" : "false");
      b.addEventListener("click", function () {
        $$("button", filtros).forEach(function (o) { o.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        pintarCalendario(op[0]);
      });
      filtros.appendChild(b);
    });
  }

  pintarCalendario("todos");

  var notaOrigenCal = $("[data-origen-calendario]");
  if (notaOrigenCal) {
    if (CALENDARIO.fuenteTexto) {
      notaOrigenCal.innerHTML = "";
      notaOrigenCal.appendChild(document.createTextNode(CALENDARIO.fuenteTexto + " "));
      if (CALENDARIO.fuenteUrl) {
        var a = el("a", null, "Ver en la web de la federación");
        a.href = CALENDARIO.fuenteUrl;
        a.target = "_blank";
        a.rel = "noopener";
        notaOrigenCal.appendChild(a);
      }
    } else {
      notaOrigenCal.textContent = "";
    }
  }

  /* ---------- 4. Clasificación ---------- */

  var cuerpoClasif = $("[data-clasificacion]");
  var filas = Array.isArray(CLASIFICACION.equipos) ? CLASIFICACION.equipos.slice() : [];

  if (filas.length) {
    filas.sort(function (a, b) {
      var pa = Number(a.puntos) || 0, pb = Number(b.puntos) || 0;
      if (pb !== pa) return pb - pa;
      var da = (Number(a.golesFavor) || 0) - (Number(a.golesContra) || 0);
      var db = (Number(b.golesFavor) || 0) - (Number(b.golesContra) || 0);
      return db - da;
    });
  }

  if (cuerpoClasif) {
    if (!filas.length) {
      var tr = el("tr");
      var td = el("td", null, "La clasificación se actualizará en cuanto empiece la competición.");
      td.colSpan = 9;
      td.style.textAlign = "center";
      td.style.padding = "34px 14px";
      td.style.color = "#5c6875";
      tr.appendChild(td);
      cuerpoClasif.appendChild(tr);
    }

    var nombreClub = (CONFIG.nombreClub || "").toLowerCase();
    filas.forEach(function (eq, i) {
      var pos = i + 1;
      var esClub = eq.club === true ||
        (eq.equipo && nombreClub && eq.equipo.toLowerCase() === nombreClub);
      var clase = "";
      if (esClub) clase += " equipo-club";
      if (pos === 1) clase += " pos-ascenso";
      else if (pos === filas.length) clase += " pos-descenso";

      var tr = el("tr", clase.trim());
      if (i === 0) tr.classList.add("pos-ascenso");

      var tdPos = el("td");
      var badge = el("span", "pos-badge", String(pos));
      tdPos.appendChild(badge);
      tr.appendChild(tdPos);

      tr.appendChild(el("td", null, eq.equipo || ""));

      ["pj", "g", "e", "p", "golesFavor", "golesContra", "puntos"].forEach(function (k) {
        tr.appendChild(el("td", null, eq[k] != null ? String(eq[k]) : "—"));
      });

      cuerpoClasif.appendChild(tr);
    });
  }

  var tituloClasif = $("[data-titulo-clasificacion]");
  if (tituloClasif) {
    var partes = [];
    if (CLASIFICACION.competicion) partes.push(CLASIFICACION.competicion);
    if (CLASIFICACION.grupo) partes.push("Grupo " + CLASIFICACION.grupo);
    if (CLASIFICACION.jornada != null && CLASIFICACION.jornada !== "") partes.push("Jornada " + CLASIFICACION.jornada);
    tituloClasif.textContent = partes.join(" · ");
  }

  var notaOrigenClas = $("[data-origen-clasificacion]");
  if (notaOrigenClas) {
    var textoOrigen = CLASIFICACION.fuenteTexto || ("Clasificación actualizada el " + formatearFecha(CLASIFICACION.actualizado));
    notaOrigenClas.innerHTML = "";
    notaOrigenClas.appendChild(document.createTextNode(textoOrigen + " "));
    if (CLASIFICACION.fuenteUrl) {
      var a2 = el("a", null, "Consultar la clasificación oficial");
      a2.href = CLASIFICACION.fuenteUrl;
      a2.target = "_blank";
      a2.rel = "noopener";
      notaOrigenClas.appendChild(a2);
    }
  }

  /* ---------- 5. Tarifa de patrocinios ---------- */

  var cajaPacks = $("[data-packs]");
  var packs = Array.isArray(PATROCINIOS.packs) ? PATROCINIOS.packs : [];

  if (cajaPacks) {
    if (!packs.length) {
      cajaPacks.appendChild(el("p", "nota", "Las tarifas de patrocinio se publicarán en breve. Escríbenos si quieres información."));
    }
    packs.forEach(function (pk) {
      var caja = el("article", "pack" + (pk.destacado ? " pack--destacado" : ""));

      if (pk.destacado) caja.appendChild(el("span", "pack__cinta", "Recomendado"));

      var foto = el("div", "pack__foto");
      if (pk.foto) {
        var img = el("img");
        img.src = pk.foto;
        img.alt = pk.fotoAlt || ("Pack " + (pk.nombre || ""));
        img.loading = "lazy";
        img.onerror = function () {
          foto.innerHTML = "";
          foto.appendChild(el("div", "pack__foto--vacia", "Añade una foto en img/" + pk.foto.split("/").pop()));
        };
        foto.appendChild(img);
      } else {
        foto.appendChild(el("div", "pack__foto--vacia", "Foto pendiente de añadir"));
      }
      caja.appendChild(foto);

      var cuerpo = el("div", "pack__cuerpo");
      cuerpo.appendChild(el("h3", "pack__nombre", pk.nombre || "Pack"));
      if (pk.precio) cuerpo.appendChild(el("p", "pack__precio", pk.precio));
      if (pk.periodo) cuerpo.appendChild(el("p", "pack__periodo", pk.periodo));
      if (pk.descripcion) cuerpo.appendChild(el("p", "pack__desc", pk.descripcion));

      if (Array.isArray(pk.incluye) && pk.incluye.length) {
        var ul = el("ul");
        pk.incluye.forEach(function (linea) { ul.appendChild(el("li", null, linea)); });
        cuerpo.appendChild(ul);
      }

      var boton = el("a", "boton boton--principal", pk.botonTexto || "Quiero este pack");
      boton.href = "#contacto";
      cuerpo.appendChild(boton);

      caja.appendChild(cuerpo);
      cajaPacks.appendChild(caja);
    });
  }

  var cajaCondiciones = $("[data-condiciones]");
  if (cajaCondiciones && Array.isArray(PATROCINIOS.condiciones)) {
    cajaCondiciones.innerHTML = "";
    PATROCINIOS.condiciones.forEach(function (c) {
      cajaCondiciones.appendChild(el("li", null, c));
    });
  }

  /* ---------- 6. Patrocinadores ---------- */

  var cajaPatros = $("[data-patrocinadores]");
  var patros = Array.isArray(PATROCINADORES.lista) ? PATROCINADORES.lista : [];

  if (cajaPatros) {
    if (!patros.length) {
      cajaPatros.appendChild(el("p", "nota", "Aún no hay patrocinadores publicados."));
    }
    patros.forEach(function (p, i) {
      var contenedor = p.web ? el("a", "patrocinador") : el("div", "patrocinador");
      if (p.web) {
        contenedor.href = p.web;
        contenedor.target = "_blank";
        contenedor.rel = "noopener";
        contenedor.setAttribute("aria-label", (p.nombre || "Patrocinador") + " (abre en ventana nueva)");
      }

      var foto = el("div", "patrocinador__foto");
      if (p.logo) {
        var img = el("img");
        img.src = p.logo;
        img.alt = p.logoAlt || ("Logo de " + (p.nombre || "patrocinador"));
        img.loading = "lazy";
        img.onerror = function () {
          foto.innerHTML = "";
          foto.appendChild(el("div", "patrocinador__vacio", "Añade el logo en img/" + p.logo.split("/").pop()));
        };
        foto.appendChild(img);
      } else {
        foto.appendChild(el("div", "patrocinador__vacio", "Logo pendiente de añadir"));
      }
      contenedor.appendChild(foto);

      var pie = el("div", "patrocinador__pie");
      pie.appendChild(el("div", "patrocinador__nombre", p.nombre || "Patrocinador"));
      if (p.tipo) pie.appendChild(el("div", "patrocinador__tipo", p.tipo));
      contenedor.appendChild(pie);

      cajaPatros.appendChild(contenedor);
    });
  }

  var notaPatros = $("[data-patrocinadores-nota]");
  if (notaPatros) notaPatros.textContent = PATROCINADORES.nota || "";

  /* ---------- 7. Tienda de productos del club ---------- */

  var cajaProductos = $("[data-productos]");
  var listaProductos = Array.isArray(TIENDA.productos) ? TIENDA.productos : [];

  escribirTexto("productos-intro", TIENDA.intro);

  function enlacePedido(prod, talla) {
    var numero = String(TIENDA.whatsapp || "").replace(/[^0-9]/g, "");
    var texto = "Hola, quiero pedir: " + (prod.nombre || "producto") +
                (talla ? " — talla " + talla : "") +
                " (" + (prod.precio || "") + ").";
    if (numero) {
      return "https://wa.me/" + numero + "?text=" + encodeURIComponent(texto);
    }
    return null;
  }

  function pintarProductos(categoria) {
    if (!cajaProductos) return;
    cajaProductos.innerHTML = "";

    var lista = listaProductos.filter(function (p) {
      if (categoria === "todos") return true;
      return (p.categoria || "") === categoria;
    });

    if (!lista.length) {
      cajaProductos.appendChild(el("p", "nota", "No hay productos en esta categoría por el momento."));
      return;
    }

    lista.forEach(function (prod) {
      var agotado = prod.stock === false;
      var caja = el("article", "producto" + (agotado ? " producto--agotado" : ""));

      if (prod.destacado && prod.etiqueta) {
        caja.appendChild(el("span", "producto__cinta", prod.etiqueta));
      }

      var foto = el("div", "producto__foto");
      if (prod.foto) {
        var img = el("img");
        img.src = prod.foto;
        img.alt = prod.fotoAlt || (prod.nombre || "Producto del club");
        img.loading = "lazy";
        img.onerror = function () {
          foto.innerHTML = "";
          foto.appendChild(el("div", "producto__vacia", "Añade la foto en img/" + prod.foto.split("/").pop()));
        };
        foto.appendChild(img);
      } else {
        foto.appendChild(el("div", "producto__vacia", "Foto pendiente de añadir"));
      }
      caja.appendChild(foto);

      var cuerpo = el("div", "producto__cuerpo");

      if (prod.categoria) cuerpo.appendChild(el("p", "producto__cat", prod.categoria));
      cuerpo.appendChild(el("h3", "producto__nombre", prod.nombre || "Producto"));

      var precio = el("p", "producto__precio");
      precio.appendChild(document.createTextNode(prod.precio || ""));
      if (prod.antes) {
        var antes = el("span", "producto__antes", prod.antes);
        precio.appendChild(antes);
      }
      cuerpo.appendChild(precio);

      if (prod.descripcion) cuerpo.appendChild(el("p", "producto__desc", prod.descripcion));

      if (Array.isArray(prod.tallas) && prod.tallas.length) {
        var cajaTallas = el("div", "tallas");
        var select = el("select");
        select.setAttribute("aria-label", "Talla de " + (prod.nombre || "producto"));
        prod.tallas.forEach(function (t) {
          var op = el("option", null, t);
          op.value = t;
          select.appendChild(op);
        });
        cajaTallas.appendChild(el("label", null, "Talla"));
        cajaTallas.appendChild(select);
        cuerpo.appendChild(cajaTallas);

        var boton = el("button", "boton boton--principal", "Pedir por WhatsApp");
        boton.type = "button";
        if (agotado) {
          boton.disabled = true;
          boton.textContent = "Agotado";
        } else {
          boton.addEventListener("click", function () {
            var url = enlacePedido(prod, select.value);
            if (url) { window.open(url, "_blank", "noopener"); return; }
            var destino = TIENDA.emailPedidos || (CONFIG.contacto && CONFIG.contacto.email) || "";
            if (!destino) { alert("Falta configurar el correo de pedidos en datos/productos.js"); return; }
            window.location.href = "mailto:" + destino +
              "?subject=" + encodeURIComponent("Pedido web — " + (prod.nombre || "")) +
              "&body=" + encodeURIComponent("Producto: " + (prod.nombre || "") +
                "\nTalla: " + select.value + "\nPrecio: " + (prod.precio || "") +
                "\n\nMis datos:\nNombre:\nTeléfono:\nDirección de entrega:");
          });
        }
        cuerpo.appendChild(boton);

      } else {
        var boton2 = el("button", "boton boton--principal", "Pedir por WhatsApp");
        boton2.type = "button";
        if (agotado) {
          boton2.disabled = true;
          boton2.textContent = "Agotado";
        } else {
          boton2.addEventListener("click", function () {
            var url2 = enlacePedido(prod, "");
            if (url2) { window.open(url2, "_blank", "noopener"); return; }
            var destino2 = TIENDA.emailPedidos || (CONFIG.contacto && CONFIG.contacto.email) || "";
            if (!destino2) { alert("Falta configurar el correo de pedidos en datos/productos.js"); return; }
            window.location.href = "mailto:" + destino2 +
              "?subject=" + encodeURIComponent("Pedido web — " + (prod.nombre || "")) +
              "&body=" + encodeURIComponent("Producto: " + (prod.nombre || "") +
                "\nPrecio: " + (prod.precio || "") +
                "\n\nMis datos:\nNombre:\nTeléfono:\nDirección de entrega:");
          });
        }
        cuerpo.appendChild(boton2);
      }

      caja.appendChild(cuerpo);
      cajaProductos.appendChild(caja);
    });
  }

  var filtrosTienda = $("[data-filtros-tienda]");
  if (filtrosTienda && listaProductos.length) {
    var cats = [];
    listaProductos.forEach(function (p) {
      var cat = p.categoria || "";
      if (cat && cats.indexOf(cat) === -1) cats.push(cat);
    });
    cats.sort();
    cats.unshift("todos");

    cats.forEach(function (cat) {
      var b = el("button", null, cat === "todos" ? "Todos" : cat);
      b.type = "button";
      b.setAttribute("aria-pressed", cat === "todos" ? "true" : "false");
      b.addEventListener("click", function () {
        $$("button", filtrosTienda).forEach(function (o) { o.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        pintarProductos(cat);
      });
      filtrosTienda.appendChild(b);
    });
  }

  pintarProductos("todos");

  var cajaFormaPago = $("[data-forma-pago]");
  if (cajaFormaPago) cajaFormaPago.textContent = TIENDA.formaPago || "";

  var notaProductos = $("[data-productos-nota]");
  if (notaProductos) notaProductos.textContent = TIENDA.nota || "";

  /* ---------- 8. Contacto ---------- */

  var listaContacto = $("[data-contacto]");
  if (listaContacto && CONFIG.contacto) {
    var c = CONFIG.contacto;
    var filasContacto = [
      ["Dirección", c.direccion],
      ["Localidad", c.localidad],
      ["Teléfono", c.telefono, "tel:"],
      ["Correo electrónico", c.email, "mailto:"],
      ["Horario de oficina", c.horario]
    ];
    filasContacto.forEach(function (f) {
      if (!f[1]) return;
      var li = el("li");
      li.appendChild(el("strong", null, f[0]));
      if (f[2] === "tel:") {
        var aTel = el("a", null, f[1]);
        aTel.href = "tel:" + String(f[1]).replace(/\s/g, "");
        li.appendChild(aTel);
      } else if (f[2] === "mailto:") {
        var aMail = el("a", null, f[1]);
        aMail.href = "mailto:" + f[1];
        li.appendChild(aMail);
      } else {
        li.appendChild(document.createTextNode(f[1]));
      }
      listaContacto.appendChild(li);
    });
  }

  var cajaRedes = $("[data-redes]");
  if (cajaRedes && CONFIG.redes) {
    Object.keys(CONFIG.redes).forEach(function (red) {
      var url = CONFIG.redes[red];
      if (!url) return;
      var a = el("a", null, red.charAt(0).toUpperCase() + red.slice(1));
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      cajaRedes.appendChild(a);
    });
  }

  /* El formulario abre el gestor de correo del visitante con el mensaje ya escrito,
     para que la web funcione igual en cualquier alojamiento gratuito (sin servidor). */
  var form = $("[data-formulario]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var destino = (CONFIG.contacto && CONFIG.contacto.email) || "";
      if (!destino) {
        alert("Falta configurar el correo de contacto en datos/config.js");
        return;
      }
      var asunto = "Web CD Rus E.F. — " + (form.asunto.value || "Consulta");
      var cuerpo = "Nombre: " + form.nombre.value +
                   "\nCorreo: " + form.email.value +
                   "\nAsunto: " + form.asunto.value +
                   "\n\n" + form.mensaje.value;
      window.location.href = "mailto:" + destino +
        "?subject=" + encodeURIComponent(asunto) +
        "&body=" + encodeURIComponent(cuerpo);
    });
  }

  /* ---------- 9. Menú móvil y resaltado de sección ---------- */

  var botonMenu = $(".menu-boton");
  var menu = $("#menu");
  if (botonMenu && menu) {
    botonMenu.addEventListener("click", function () {
      var abierto = menu.classList.toggle("abierto");
      botonMenu.setAttribute("aria-expanded", abierto ? "true" : "false");
      botonMenu.textContent = abierto ? "✕" : "☰";
      botonMenu.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });
    $$("a", menu).forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("abierto");
        botonMenu.setAttribute("aria-expanded", "false");
        botonMenu.textContent = "☰";
      });
    });
  }

  var enlacesMenu = $$('.menu a[href^="#"]');
  var secciones = enlacesMenu
    .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && secciones.length) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        enlacesMenu.forEach(function (a) {
          a.classList.toggle("activo", a.getAttribute("href") === "#" + entrada.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secciones.forEach(function (s) { observador.observe(s); });
  }
})();
