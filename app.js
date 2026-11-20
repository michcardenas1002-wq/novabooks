// 1. Base de datos inicial en memoria (Catálogo NovaBooks)
let productos = [
  {
    id: 1,
    titulo: "Funda Acolchada 'Bosque Encantado'",
    precio: 38000,
    descripcion: "Protege tus libros de golpes y dobleces dentro de tu bolso o mochila.",
    icono: "📖"
  },
  {
    id: 2,
    titulo: "Set Marcapáginas Magnéticos",
    precio: 15000,
    descripcion: "Pack de 4 separadores con imán que no se caen ni maltratan las hojas.",
    icono: "🔖"
  },
  {
    id: 3,
    titulo: "Lámpara Clip de Lectura Nocturna",
    precio: 29000,
    descripcion: "Luz cálida regulable de 3 niveles para leer de noche sin cansar la vista.",
    icono: "💡"
  },
  {
    id: 4,
    titulo: "Kit de Anotación Estética",
    precio: 22000,
    descripcion: "Notas adhesivas translúcidas y resaltadores pastel que no traspasan el papel.",
    icono: "🖍️"
  }
];

// 2. Menú Hamburguesa Responsive
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Cerrar menú al hacer clic en un enlace (en móvil)
document.querySelectorAll(".nav-list a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// 3. Renderizado Dinámico del Catálogo y Panel Admin
const catalogGrid = document.getElementById("catalog-grid");
const adminProductList = document.getElementById("admin-product-list");

function renderizarCatalogo() {
  catalogGrid.innerHTML = "";
  adminProductList.innerHTML = "";

  productos.forEach(prod => {
    // Crear tarjeta en el catálogo público
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div>
        <div class="card-icon">${prod.icono}</div>
        <h3>${prod.titulo}</h3>
        <p>${prod.descripcion}</p>
      </div>
      <div>
        <p class="card-price">$${prod.precio.toLocaleString("es-CO")} COP</p>
        <a href="#contacto" class="btn-primary" onclick="seleccionarProducto('${prod.titulo}')">Pedir ahora</a>
      </div>
    `;
    catalogGrid.appendChild(card);

    // Crear fila en el panel de administración
    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${prod.titulo}</strong> - $${prod.precio.toLocaleString("es-CO")}</span>
      <button class="btn-delete" onclick="eliminarProducto(${prod.id})">Eliminar</button>
    `;
    adminProductList.appendChild(li);
  });
}

// Autocompletar mensaje de contacto al pedir un producto
function seleccionarProducto(nombreProducto) {
  const messageInput = document.getElementById("message");
  messageInput.value = `Hola NovaBooks, me gustaría solicitar información sobre: ${nombreProducto}.`;
}

// 4. Funcionalidad de IA: Recomendador Literario
const aiForm = document.getElementById("ai-form");
const aiResult = document.getElementById("ai-result");

aiForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const genero = document.getElementById("genre-select").value;
  const habito = document.getElementById("habit-select").value;

  let recomendacion = "";
  let motivo = "";

  if (habito === "noche") {
    recomendacion = "Lámpara Clip de Lectura Nocturna 💡";
    motivo = "Ideal para tus sesiones nocturnas sin interrumpir el sueño ni forzar la vista.";
  } else if (habito === "transporte") {
    recomendacion = "Funda Acolchada 'Bosque Encantado' 📖";
    motivo = "Mantendrá tus libros de " + genero + " intactos mientras viajas.";
  } else if (genero === "estudio" || habito === "escritorio") {
    recomendacion = "Kit de Anotación Estética 🖍️";
    motivo = "Perfecto para marcar citas clave y organizar ideas sin manchar las páginas.";
  } else {
    recomendacion = "Set Marcapáginas Magnéticos 🔖";
    motivo = "El complemento ligero y seguro para pausar tu lectura en cualquier momento.";
  }

  aiResult.innerHTML = `
    <h4>✨ Sugerencia de NovaBooks IA:</h4>
    <p><strong>${recomendacion}</strong></p>
    <p>${motivo}</p>
  `;
  aiResult.classList.remove("hidden");
});

// 5. Validación de Formulario en Tiempo Real
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

function validarNombre() {
  const error = document.getElementById("name-error");
  if (nameInput.value.trim().length < 3) {
    error.textContent = "El nombre debe tener al menos 3 caracteres.";
    return false;
  }
  error.textContent = "";
  return true;
}

function validarEmail() {
  const error = document.getElementById("email-error");
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(emailInput.value.trim())) {
    error.textContent = "Ingresa un correo electrónico válido.";
    return false;
  }
  error.textContent = "";
  return true;
}

function validarMensaje() {
  const error = document.getElementById("message-error");
  if (messageInput.value.trim().length < 10) {
    error.textContent = "El mensaje debe tener al menos 10 caracteres.";
    return false;
  }
  error.textContent = "";
  return true;
}

nameInput.addEventListener("input", validarNombre);
emailInput.addEventListener("input", validarEmail);
messageInput.addEventListener("input", validarMensaje);

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validarNombre() && validarEmail() && validarMensaje()) {
    document.getElementById("form-success").classList.remove("hidden");
    contactForm.reset();
    setTimeout(() => {
      document.getElementById("form-success").classList.add("hidden");
    }, 4000);
  }
});

// 6. Panel Admin (Login y CRUD de productos)
const loginForm = document.getElementById("login-form");
const loginBox = document.getElementById("admin-login-box");
const adminDashboard = document.getElementById("admin-dashboard");
const logoutBtn = document.getElementById("logout-btn");
const addProductForm = document.getElementById("add-product-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("admin-user").value.trim();
  const pass = document.getElementById("admin-pass").value.trim();

  if (user === "admin" && pass === "1234") {
    loginBox.classList.add("hidden");
    adminDashboard.classList.remove("hidden");
    document.getElementById("login-error").textContent = "";
    loginForm.reset();
  } else {
    document.getElementById("login-error").textContent = "Credenciales incorrectas (usa admin / 1234).";
  }
});

logoutBtn.addEventListener("click", () => {
  adminDashboard.classList.add("hidden");
  loginBox.classList.remove("hidden");
});

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevoProducto = {
    id: Date.now(),
    titulo: document.getElementById("prod-title").value.trim(),
    precio: Number(document.getElementById("prod-price").value),
    descripcion: document.getElementById("prod-desc").value.trim(),
    icono: "✨"
  };

  productos.push(nuevoProducto);
  renderizarCatalogo();
  addProductForm.reset();
});

function eliminarProducto(id) {
  productos = productos.filter(prod => prod.id !== id);
  renderizarCatalogo();
}

// Inicializar catálogo al cargar la página
renderizarCatalogo();
