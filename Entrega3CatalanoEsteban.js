//Clase constructora de objetos
class Articulo {
    constructor (codigo, descripcion, precio, imagen) {
        this.codigo = Number(codigo)
        this.descripcion = descripcion;
        this.precio = Number(precio);
        this.imagen = imagen;
    }
}

//datos de los objetos articulos
const articulo1 = new Articulo(1, "Perrito pancitas llenas -3 KG-", 3000, "./img/producto1.jpg");
const articulo2 = new Articulo(2, "Perrito fit -3 KG-            ", 4000, "./img/producto2.jpg");
const articulo3 = new Articulo(3, "Perro endemoniado -3 KG-      ", 5000, "./img/producto3.jpg");
const articulo4 = new Articulo(4, "Perro Feroz -3 KG-            ", 6000, "./img/producto4.jpg");

//array que contiene todo el listado de articulos
const articulos = [articulo1, articulo2, articulo3, articulo4];

//arma todas las cards
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
                            <input class="display" type="text" min="1" placeholder="1" name="cantidad" disabled></input>
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
})

//subtotal.
let subtotal = 0;
function subTotal(precio, cant) {
    subtotal = 0;
    subtotal = precio * cant;
}

//calcula el total del carro
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

//arma el encabezado de la tabla
let tituloCarro = 0;
function encabezadoTablita() {
    verCarrito.innerHTML = ``;
    if (tituloCarro === 0 && comprados.length > 0) {
        let padre1 = document.getElementById("tituloCarrito");
        let contenedor1 = document.createElement("div");
        contenedor1.innerHTML = `<h2>Carrito de Compras.</h2>
<table class="table" border="1" cellpading="20" cellspacing="0">
                <tr>
                    <th>CODIGO</th>
                    <th>DESCRIPCION</th>
                    <th>CANTIDAD</th>
                    <th>PRECIO</th>
                    <th>SUBTOTAL</th>
                    <th></th>
                </tr>                                                   
            </table>`;
        padre1.append(contenedor1);
        verCarrito.innerHTML = ``;
        totalCarrito();
        tituloCarro = 1;
    } 
    
    else if (comprados.length > 0) {        
        verCarrito.innerHTML = ``;
        totalCarrito();        
    } 
    
    else {
        let padre1 = document.getElementById("tituloCarrito");
        padre1.innerHTML = ``;
        verCarrito.innerHTML = ``;
        let padre3 = document.getElementById("confirmarCompra");
        padre3.innerHTML = ``;
        agregarArticulos();
    }
}

//icono de eliminar.
let iconoEliminar = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>`;


//agrega los articulos en el carro. aca tambien se guarda el array de objetos comprados en localstorage.
let posicionArticulo = 0;
function agregarArticulos() {
    posicionArticulo = 0;
    localStorage.clear();
    const guardarLocalStorage = (clave, valor) => { localStorage.setItem(clave, valor) };
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

//elimina los articulos comprados, se la llama desde el simbolo de tacho que acompaña a cada articulo en el carro.
function eliminar(posicion) {
    comprados.splice(posicion, 1);    
    totalCarrito();
    encabezadoTablita();
}

//cuando el usuario confirma el carro que ya se finalizo la compra, tambien se borra el carro que se estaba
//armando del localstorage.
function confirmarCarrito() {
    comprados.length = 0;
    localStorage.clear();
    let padre = document.getElementById("verCarrito");
    padre.innerHTML = ``;
    let padre1 = document.getElementById("tituloCarrito");
    padre1.innerHTML = ``;
    verCarrito.innerHTML = `Se borro el Local Storage`;
    let padre2 = document.getElementById("totalCarrito25");
    padre2.innerHTML = ``;
}

// constructor articulos comprados
class Comprado {
    constructor(codigo, descripcion, precio, cantidad, subtotal) {
        this.codigo = Number(codigo);
        this.descripcion = descripcion;
        this.precio = Number(precio);
        this.cantidad = Number(cantidad);
        this.subtotal = Number(subtotal);
    }
}

//funcion de compra, forma el array de los objetos articulos comprados
let comprados = [];
function compra(codigo, descripcion, precio, cantidad, subtotal) {
    const comprado = new Comprado(codigo, descripcion, precio, cantidad, subtotal);
    comprados.push(comprado);
}

//esta clase constructora se usa para rescatar el array de objetos del local storage.
class Comprado1 {
    constructor(obj) {
        this.codigo = parseFloat(obj.codigo);
        this.descripcion = obj.descripcion;
        this.precio = parseFloat(obj.precio);
        this.cantidad = parseFloat(obj.cantidad);
        this.subtotal = parseFloat(obj.subtotal);
    }
}

//esta funcion es para traer el carrito del localstorage
let renovar = 0
function renovarCarrito() {
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

//esta funcion anexa cantidad de un producto al carrito
let cantidad = 1;
function Agregar(numArt) {
    cantidad = cantidad + 1;
    let stringId = numArt.toString();
    let container = document.getElementById(stringId);
    container.innerHTML = `<input class="display" type="text" min="1" placeholder=  "${cantidad}" name="cantidad" disabled>`;    
}

//esta funcion saca cantidad de un producto al carrito
function Sacar(numArt) {
    if (cantidad > 0) {
        cantidad = cantidad - 1;
        let stringId = numArt.toString();
        let container = document.getElementById(stringId);
        container.innerHTML = `<input class="display" type="text" min="1" placeholder=  "${cantidad}" name="cantidad" disabled>`;
    }
}


/*se activa al presionar el boton agregar carrito, si habia un carrito en el localstorage 
tambien lo trae y lo tiene en cuenta para continuar la compra*/

function visualizarCarrito(numArt) {           
    renovarCarrito();    
    let stringId = numArt.toString();
    let container = document.getElementById(stringId);
    container.innerHTML = `<input class="display" type="text" min="1" placeholder=  "${cantidad}" name="cantidad" disabled>`;
    artSeleccionado = articulos.find((el) => el.codigo === numArt);
    subTotal(artSeleccionado.precio, cantidad);
    if (cantidad > 0) {
        let existe = comprados.some(comprado => comprado.codigo === numArt);
        if (existe === false) {
            subTotal(artSeleccionado.precio, cantidad);
            compra(artSeleccionado.codigo, artSeleccionado.descripcion, artSeleccionado.precio, cantidad, subtotal);
            let poner = document.getElementById("ponerCantidad");
            poner.innerHTML = `<p> </p>`;
            encabezadoTablita();
        } 
        
        else {
            artBuscado = comprados.find((el) => el.codigo === numArt);
            for (const objeto of comprados) {
                if (objeto.codigo === artBuscado.codigo) {
                    borrar = comprados.indexOf(objeto);
                }
            }
            comprados.splice(borrar, 1);
            compra(artSeleccionado.codigo, artSeleccionado.descripcion, artSeleccionado.precio, cantidad, subtotal);
            verCarrito.innerHTML = ``;
            totalCarrito();
        }
    } 
    
    else {
        let poner = document.getElementById("ponerCantidad");
        poner.innerHTML = `<p>Indicar Articulo o Cantidad correctamente.</p>`;
    }
    cantidad = 1;
    subtotal = 0;
}


