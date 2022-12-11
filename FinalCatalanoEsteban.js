class Articulo {
    constructor (codigo, descripcion, precio, imagen) {
        this.codigo = Number(codigo)
        this.descripcion = descripcion;
        this.precio = Number(precio);
        this.imagen = imagen;
    }
}

const articulo1 = new Articulo(1, "Perrito pancitas llenas -3 KG-", 3000, "./img/1.jpg");
const articulo2 = new Articulo(2, "Perrito fit -3 KG-            ", 4000, "./img/2.jpg");
const articulo3 = new Articulo(3, "Perro endemoniado -3 KG-      ", 5000, "./img/3.jpg");
const articulo4 = new Articulo(4, "Perro Feroz -3 KG-            ", 6000, "./img/4.jpg");

const articulos1 = [articulo1, articulo2, articulo3, articulo4];

const solicitarArticulos = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(articulos1);
      }, 1000);
    });
  };
  
  let articulos = []
  
  solicitarArticulos()
    .then((res) => {
      articulos = res;
      mostrarCatalogo(articulos);
    });

function mostrarCatalogo(articulos) {
    articulos.forEach((art) => {
      let content = document.getElementById("vidriera");
      let content1 = document.createElement("div");
      content1.innerHTML = `
      <div class="card mt-3 mb-3" style="width: 18rem;">
      <img src="${art.imagen}">  class="card-img-top" alt="articulo(${art.codigo})">
                  <div class="card-body text-dark bg-secondary bg-opacity-25">                    
                        <p class="card-title text-center fs-5 fw-bold">${art.descripcion}</p>                      
                        <p class="card-text">$${art.precio}</p>
                      <div class="botonesDisplay">
                          <button class="btn btn-primary" onclick="Sacar(${art.codigo})">-</button>
                          <br>
                          <div id="${art.codigo}">                      
                              <input class="display" type="text" min="0" placeholder="0" name="cantidad" disabled></input>
                          </div>
                          <br>                      
                          <button class="btn btn-primary" onclick="Agregar(${art.codigo})">+</button>
                      </div>
                        <br>
                        <a href="#finalPagina"><button class="btn btn-primary" onclick="visualizarCarrito(${art.codigo})">Agregar Carrito</button></a>                        
                  </div>                       
                      </div>
                 `;
      content.append(content1);
    });
  }
  
setTimeout(() => {
    let tituloFrase = document.getElementById("tituloFrase");
    tituloFrase.innerHTML = `<h2 class="tituloFrase">Un perro bien alimentado es un ser feliz.</h2>`;
    const numeros = [2399, 2206, 1198, 1992, 2039, 2130, 2813, 2843];
    let contador = -1;
    setInterval(() => {
      if (contador < 8) {
        contador++;
      } else {
        contador = -1;
      }
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "ccaefc98fbmsha73882bc11b185cp103be5jsne0776200c6ca",
          "X-RapidAPI-Host": "quotes-villa.p.rapidapi.com",
        },
      };
  
      fetch("https://quotes-villa.p.rapidapi.com/quotes/art", options)
        .then((response) => response.json())
        .then(
          (data) =>
          (contenedorAgregar.innerHTML = `<div class="frase1" id="fetch"><p class="frase">${data[numeros[contador]
          ].text.toUpperCase()}</p> <h6 class="frase">${data[numeros[contador]
          ].author.toUpperCase()}</h6> </div>`
          ));
      let contenedorAgregar = document.getElementById("fetch");
    }, 10000);
  }, 1000);
  
let subtotal = 0;
function subTotal(precio, cant) {
    subtotal = 0;
    subtotal = precio * cant;
}

let total = 0;
function totalCarrito() {
  verCarrito.innerHTML = ``;
  total = 0;
  if (comprados.length !== 0) {
    agregarArticulos();
    let padre2 = document.getElementById("totalCarrito25");
    padre2.innerHTML = `<h2>Total:  $ ${total}</h2>`;
    let padre3 = document.getElementById("confirmarCompra");
    padre3.innerHTML = `<button class="btn btn-primary" onclick="confirmarCarrito()">Confirmar Carro</button>`;
  } else {
    let padre1 = document.getElementById("verCarrito");
    padre1.innerHTML = ``;
    verCarrito.innerHTML = ``;
    let padre2 = document.getElementById("totalCarrito25");
    padre2.innerHTML = ``;
  }
}

let tituloCarro = 0;
function encabezadoTablita() {
  verCarrito.innerHTML = ``;
  if (tituloCarro === 0 && comprados.length > 0) {
    let padre1 = document.getElementById("tituloCarrito");
    let contenedor1 = document.createElement("div");
    contenedor1.innerHTML = `<h2 class="tituloCarro">Carrito de Compras.</h2>
<table class="table" border="1" cellpading="0" cellspacing="0">
                <tr>
                    <th>COD.</th>
                    <th>DESCRIP.</th>
                    <th>CANT.</th>
                    <th>PRECIO</th>
                    <th>SUBT.</th>
                    <th></th>
                </tr>                                                   
            </table>`;
    padre1.append(contenedor1);
    let datos = document.getElementById("datosCliente");
    datos.innerHTML = `
        <label for="nombre">Nombre y Apellido:*</label>        
        <input class="input" type="text" placeholder="Nombre y Apellido" name="nombre" id="nombre" required>
        <label for="nombre">Dirección:*</label>        
        <input class="input" type="text" placeholder="Dirección" name="direccion" id="direccion" required>
        <label for="nombre">Telefono:*</label>        
        <input class="input" type="number" placeholder="Telefono" name="nombre" id="telefono" required>                        
        `;
    totalCarrito();
    tituloCarro = 1;
  } else if (comprados.length > 0) {
    verCarrito.innerHTML = ``;
    totalCarrito();
  } else {
    let padre1 = document.getElementById("tituloCarrito");
    padre1.innerHTML = ``;
    verCarrito.innerHTML = ``;
    let padre3 = document.getElementById("confirmarCompra");
    padre3.innerHTML = ``;
    let datos = document.getElementById("datosCliente");
    datos.innerHTML = ``;
    agregarArticulos();
  }
}

//eliminar.
let iconoEliminar = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>`;

let posicionArticulo = 0;
function agregarArticulos() {
  posicionArticulo = 0;
  localStorage.clear();
  const guardarLocalStorage = (clave, valor) => {
    localStorage.setItem(clave, valor);
  };
  for (const articulo of comprados) {
    total = total + articulo.precio * articulo.cantidad;
    let padre = document.getElementById("verCarrito");
    let contenedorAgregar = document.createElement("div");
    contenedorAgregar.innerHTML = `
    <table class="table1" border="1" cellpading="20" cellspacing="0">                       
                    <tr>
                        <td>${articulo.codigo}</td>                            
                        <td>${articulo.descripcion}</td>
                        <td>${articulo.cantidad}</td>
                        <td> $ ${articulo.precio}</td>
                        <td> $ ${articulo.subtotal}</td>
                        <td><span onclick="eliminar(${posicionArticulo})">${iconoEliminar}</span></td>                            
                    </tr>                            
                </table>      
                `;
    padre.append(contenedorAgregar);
    posicionArticulo = posicionArticulo + 1;
    guardarLocalStorage("productosComprados", JSON.stringify(comprados));
  }
}

let aEliminar;
function eliminar(posicion) {
  aEliminar = comprados[posicion];
  Toastify({
    text:
      "Se elimino del carrito " +
      aEliminar.cantidad +
      " " +
      aEliminar.descripcion,
    duration: 3000,
    gravity: "top",
    position: "right",
  }).showToast();
  comprados.splice(posicion, 1);
  totalCarrito();
  encabezadoTablita();
  comprados.length > 0 ? (tituloCarro = 1) : (tituloCarro = 0);
  estadoDatos.innerHTML = ``;
}

let nombreCliente = "";
let direccion = "";
let telefono = "";
function tomarDatos() {
  let nombreC = document.getElementById("nombre");
  nombreC.addEventListener("input", () => {
    nombreCliente = nombreC.value;
  });
  let dire = document.getElementById("direccion");
  dire.addEventListener("input", () => {
    direccion = dire.value;
  });
  let telef = document.getElementById("telefono");
  telef.addEventListener("input", () => {
    telefono = telef.value;
  });
}

let estadoDatos = document.getElementById("estadoDatos");
function confirmarCarrito() {
  if (nombreCliente === "") {
    estadoDatos.innerHTML = `Introduzca su nombre.`;
  } else if (direccion === "") {
    estadoDatos.innerHTML = `Introduzca direccion.`;
  } else if (telefono === "") {
    estadoDatos.innerHTML = `Introduzca telefono.`;
  } else {
    comprados.length = 0;
    localStorage.clear();
    let padre = document.getElementById("verCarrito");
    padre.innerHTML = ``;
    let padre1 = document.getElementById("tituloCarrito");
    padre1.innerHTML = ``;
    let padre2 = document.getElementById("totalCarrito25");
    padre2.innerHTML = ``;
    let datos = document.getElementById("datosCliente");
    datos.innerHTML = ``;
    estadoDatos.innerHTML = ``;
    tituloCarro = 0;
    telefono = "";
    let padre3 = document.getElementById("confirmarCompra");
    padre3.innerHTML = ``;
    confirmarEnvio();
  }
}

function confirmarEnvio() {
    Swal.fire({
      title: `${nombreCliente}`,
      text: `Tu pedido ingreso correctamente. Te lo enviaremos a la brevedad a ${direccion}.`,
      width: 800,
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  }
  
  function articuloCargando(cantidad, descripcion) {
    Toastify({
      text: "Se agrego al carrito " + cantidad + " " + descripcion,
      duration: 3000,
      gravity: "top",
      position: "right",
    }).showToast();
  }
  
  class Comprado {
    constructor(codigo, descripcion, precio, cantidad, subtotal) {
      this.codigo = Number(codigo);
      this.descripcion = descripcion;
      this.precio = Number(precio);
      this.cantidad = Number(cantidad);
      this.subtotal = Number(subtotal);
    }
  }
  
    let comprados = [];
  
    function compra(codigo, descripcion, precio, cantidad, subtotal) {
    const comprado = new Comprado(
      codigo,
      descripcion,
      precio,
      cantidad,
      subtotal
    );
    comprados.push(comprado);
  }
  
  class Comprado1 {
    constructor(obj) {
      this.codigo = parseFloat(obj.codigo);
      this.descripcion = obj.descripcion;
      this.precio = parseFloat(obj.precio);
      this.cantidad = parseFloat(obj.cantidad);
      this.subtotal = parseFloat(obj.subtotal);
    }
  }
  
  let renovar = 0;
  function renovarCarrito() {
    localStorage.length === 0 &&
      (verCarrito.innerHTML = `<p class="ver">El carrito está vacío!</p>`);
    if (renovar === 0) {
      guardados = JSON.parse(localStorage.getItem("productosComprados"));
      if (localStorage.length > 0) {
        for (const objeto of guardados) {
          comprados.push(new Comprado1(objeto));
        }
      }
      encabezadoTablita();
      renovar = 1;
    }
  }
  
  class Puesta {
    constructor(codigo, cantidad) {
      this.codigo = Number(codigo);
      this.cantidad = Number(cantidad);
    }
  }
  
  let cantidadPuesta = []
  
  function previa(codigo, cantidad) {
    const previo = new Puesta(codigo, cantidad);
    cantidadPuesta.push(previo);
  }
    
   let cantidad = 0;
  let stringId;
  let existe2;
  let artPrevio;
  function Agregar(numArt) {
    existe2 = cantidadPuesta.some((previo) => previo.codigo === numArt);
    if (existe2 === false) {
      cantidad = 0;
      cantidad++;
      previa(numArt, cantidad);    
    } else {
      artPrevio = cantidadPuesta.find((el) => el.codigo === numArt);
      artPrevio.cantidad = artPrevio.cantidad + 1;    
    }
    artPrevio = cantidadPuesta.find((el) => el.codigo === numArt);
    stringId = numArt.toString();
    let container = document.getElementById(stringId);
    container.innerHTML = `<input class="display" type="text" min="1" placeholder="${artPrevio.cantidad}" name="cantidad" disabled>`;
  }
  
  function Sacar(numArt) {
    existe2 = cantidadPuesta.some((previo) => previo.codigo === numArt);
    artPrevio = cantidadPuesta.find((el) => el.codigo === numArt);
    if (existe2 === true && artPrevio.cantidad > 0) {
      artPrevio = cantidadPuesta.find((el) => el.codigo === numArt);
      artPrevio.cantidad = artPrevio.cantidad - 1;    
      artPrevio = cantidadPuesta.find((el) => el.codigo === numArt);
      stringId = numArt.toString();
      let container = document.getElementById(stringId);
      container.innerHTML = `<input class="display" type="text" min="1" placeholder="${artPrevio.cantidad}" name="cantidad" disabled>`;
    }
  }
  
  function visualizarCarrito(numArt) {
    renovarCarrito();
    artPrevio = cantidadPuesta.find((el) => el.codigo === numArt);
    artSeleccionado = articulos.find((el) => el.codigo === numArt);
    existe2 = cantidadPuesta.some((previo) => previo.codigo === numArt);
    if (existe2 === true && artPrevio.cantidad > 0) {
      subTotal(artSeleccionado.precio, artPrevio.cantidad);
      articuloCargando(artPrevio.cantidad, artSeleccionado.descripcion);
      let existe = comprados.some((comprado) => comprado.codigo === numArt);
      if (existe === false) {
        compra(
          artSeleccionado.codigo,
          artSeleccionado.descripcion,
          artSeleccionado.precio,
          artPrevio.cantidad,
          subtotal
        );
        let poner = document.getElementById("ponerCantidad");
        poner.innerHTML = `<p> </p>`;
        encabezadoTablita();
        tomarDatos();
      } else {
        artBuscado = comprados.find((el) => el.codigo === numArt);
        artBuscado.cantidad = artBuscado.cantidad + artPrevio.cantidad;
        artBuscado.subtotal = artBuscado.subtotal + subtotal;
        verCarrito.innerHTML = ``;
        totalCarrito();
      }
    } else {
      let poner = document.getElementById("ponerCantidad");
      poner.innerHTML = `<p>COLOCAR CANTIDAD!!!</p>`;
    }
    subtotal = 0;
  }


