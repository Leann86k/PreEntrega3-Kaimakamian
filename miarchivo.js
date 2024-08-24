// Array de productos
const productos = [
  { id: 1, nombre: "Hueso de juguete para perro", precio: 5.0 },
  { id: 2, nombre: "Ratón de juguete para gato", precio: 3.0 },
  { id: 3, nombre: "Alimento de perro 3 kg (Gatti)", precio: 15.0 },
  { id: 4, nombre: "Alimento de gato 3 kg (Gatti)", precio: 15.0 },
  { id: 5, nombre: "Alimento de perro 8 kg (Cat Chow)", precio: 30.0 },
  { id: 6, nombre: "Alimento de gato 8 kg (Cat Chow)", precio: 30.0 },
  { id: 7, nombre: "Alimento de perro 8 kg (Excelent)", precio: 25.0 },
  { id: 8, nombre: "Alimento de gato 8 kg (Excelent)", precio: 25.0 },
];

// Carrito de compras
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para mostrar los productos
const mostrarProductos = () => {
  const productosContainer = document.getElementById("productos");
  productosContainer.innerHTML = "";
  productos.forEach((producto) => {
    const productoDiv = document.createElement("div");
    productoDiv.className = "product";
    productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${
              producto.id
            })">Agregar al carrito</button>
        `;
    productosContainer.appendChild(productoDiv);
  });
};

// Función para agregar un producto al carrito
const agregarAlCarrito = (id) => {
  const producto = productos.find((p) => p.id === id);
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
};

//Confirmación de compra

const comprarButton = document.getElementById("comprarButton");

comprarButton.addEventListener("click", () => {
  alert(`¿Confirma la compra con monto $${mostrarCarrito()}?`);
});

// Función para mostrar el carrito
const mostrarCarrito = () => {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";
  carrito.forEach((producto, index) => {
    const item = document.createElement("li");
    item.className = "cart-item";
    item.innerHTML = `
            ${producto.nombre} - $${producto.precio.toFixed(2)}
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
    cartList.appendChild(item);
  });
  const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
  document.getElementById("resultado").textContent = `Total: $${total.toFixed(
    2
  )}`;
  return total;
};

// Función para eliminar un producto del carrito
const eliminarDelCarrito = (index) => {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
};

// Inicializar la página
mostrarProductos();
mostrarCarrito();

// Manejo del menú hamburguesa (opcional si tienes este menú en el HTML)
document.querySelector(".menu-button")?.addEventListener("click", () => {
  const menu = document.querySelector(".menu");
  menu?.classList.toggle("open");
});
