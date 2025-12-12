document.addEventListener('DOMContentLoaded', () => {
    let isLoggedIn = false;
    
    let registeredOwners = [
        { name: "Juan Pérez", phone: "555-1001", email: "juan@ejemplo.com", id: 0 },
        { name: "Ana López", phone: "555-1002", email: "ana@ejemplo.com", id: 1 },
    ]; 
    let registeredPets = [  
        { name: "Max", species: "Perro", breed: "Golden", ownerId: 0 },
        { name: "Mishu", species: "Gato", breed: "Siamés", ownerId: 1 },
    ]; 
    let scheduledServices = [
        { date: "2025-12-15", time: "10:00", petName: "Max", ownerName: "Juan Pérez", service: "Baño Completo" },
    ]; 
    let shoppingCart = [];      

    const contentContainer = document.getElementById('content-container');
    const navLoginBtn = document.getElementById('nav-login-btn');
    const navLogoutBtn = document.getElementById('nav-logout-btn');
    const mainNav = document.getElementById('main-nav');
    const navHome = document.getElementById('nav-home');
    const navHomeLi = document.getElementById('nav-home-li');
    const logo = document.querySelector('.logo');

    const VALID_USER = 'admin';
    const VALID_PASS = '1234';

    const CATALOG_PRODUCTS = [
        { id: 1, name: "Baño con shampoo especial", price: 35.00, type: "Servicio", categoryId: 1, imageURL: 'imagenes/baño.jpg' },
        { id: 2, name: "Corte de pelo / grooming", price: 100.00, type: "Servicio", categoryId: 1, imageURL: 'imagenes/corte.jpeg' },
        { id: 3, name: "Cepillado profundo", price: 25.00, type: "Servicio", categoryId: 1, imageURL: 'imagenes/cepillado.jpg' },
        
        { id: 4, name: "Hidromasaje en tina", price: 40.00, type: "Servicio", categoryId: 2, imageURL: 'imagenes/masaje.jpeg' },
        { id: 5, name: "Masajes antiestrés", price: 30.00, type: "Servicio", categoryId: 2, imageURL: 'imagenes/masaje-estres.jpeg' },
        { id: 6, name: "Aromaterapia", price: 15.00, type: "Servicio", categoryId: 2, imageURL: 'imagenes/aromaterapia.jpg' },
       
        { id: 7, name: "Limpieza dental superficial", price: 50.00, type: "Servicio", categoryId: 3, imageURL: 'imagenes/limpiezadental.jpeg' },
        { id: 8, name: "Deslanado (elimina pelo muerto)", price: 45.00, type: "Servicio", categoryId: 3, imageURL: 'imagenes/deslanado.jpg' },
        { id: 9, name: "Eliminación de nudos", price: 20.00, type: "Servicio", categoryId: 3, imageURL: 'imagenes/eliminaciondenudos.jpeg' },
       
        { id: 10, name: "Piscina para perros", price: 60.00, type: "Servicio", categoryId: 4, imageURL: 'imagenes/piscina.jpeg' },
        { id: 11, name: "Fotos profesionales después del grooming", price: 75.00, type: "Servicio", categoryId: 4, imageURL: 'imagenes/foto.jpeg' },
        { id: 12, name: "Guardería o hotel para mascotas", price: 90.00, type: "Servicio", categoryId: 4, imageURL: 'imagenes/guarderia.jpeg' },
       ];

    const CATEGORIES_MAP = {
        1: "Higiene básica",
        2: "Relajación y tratamientos",
        3: "Cuidados adicionales",
        4: "Servicios premium"
    };


    function loadView(viewContent, callback) {
        contentContainer.innerHTML = viewContent;
        if (callback) callback();
    }


    function setupCarousel() {
        setTimeout(() => {
            const slides = document.querySelectorAll('.carousel-item');
            if (slides.length === 0) return; 
            
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            let currentSlide = 0;
            const intervalTime = 4000; 

            function showSlide(index) {
                if (index >= slides.length) {
                    currentSlide = 0;
                } else if (index < 0) {
                    currentSlide = slides.length - 1;
                } else {
                    currentSlide = index;
                }

                slides.forEach((slide, i) => {
                    if (i === currentSlide) {
                        slide.classList.add('active');
                    } else {
                        slide.classList.remove('active');
                    }
                });
            }

            function nextSlide() {
                showSlide(currentSlide + 1);
            }

            let slideInterval = setInterval(nextSlide, intervalTime);

            function resetInterval() {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, intervalTime);
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    showSlide(currentSlide + 1);
                    resetInterval();
                });
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    showSlide(currentSlide - 1);
                    resetInterval();
                });
            }

            showSlide(currentSlide);
        }, 50); 
    }

    function renderHomeView() {
        const featuredProducts = [
            CATALOG_PRODUCTS.find(p => p.id === 1),
            CATALOG_PRODUCTS.find(p => p.id === 8),
            CATALOG_PRODUCTS.find(p => p.id === 13)
        ].filter(p => p);

        const productCards = featuredProducts.map(p => `
            <div class="contact-item" style="width: 300px; text-align: left;">
                <i class="fas fa-certificate" style="font-size: 1.5rem; margin-bottom: 0.5rem; float: right;"></i>
                <h3>${p.name}</h3>
                <p style="font-size: 0.9em; margin-top: 0.5rem;">
                    ${CATEGORIES_MAP[p.categoryId] || 'Servicio Premium'}<br>
                    Precio: <strong>Bs ${p.price.toFixed(2)}</strong>
                </p>
            </div>
        `).join('');

        const homeHTML = `
            <section id="home-view" class="module-section" style="box-shadow: none; background: transparent;">
                <div style="background-color: var(--color-acento); padding: 3rem; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 4px 15px rgba(0, 255, 255, 0.5); color: var(--color-fondo); text-align: center;">
                    
                    <i class="fas fa-dog" style="font-size: 4rem; color: var(--color-fondo); margin-bottom: 1rem;"></i>
                    <i class="fas fa-cat" style="font-size: 4rem; color: var(--color-fondo); margin-bottom: 1rem; margin-left: 1rem;"></i>
                    
                    <h1 style="color: var(--color-fondo);">PetLuka Spa </h1>
                    <p style="font-size: 1.2rem; max-width: 900px; margin: 0 auto 1rem; color: var(--color-fondo);">
                        **Bienvenido al sistema PetLuka Spa: Lujo y Bienestar para tu Compañero.**
                        <br>
                        Somos el líder en servicios de estética y cuidado canino y felino, ofreciendo una experiencia de spa completa que combina salud, belleza y relajación. Nuestro sistema de gestión permite agendar citas, registrar clientes y mascotas, y comprar productos premium de forma sencilla y eficiente.
                    </p>
                    <p style="font-size: 1rem; max-width: 900px; margin: 0 auto 2rem; color: var(--color-fondo); opacity: 0.8;">
                        **Nuestra Misión:** Proporcionar un ambiente de tranquilidad y seguridad, utilizando solo productos de la más alta calidad y técnicas innovadoras en *grooming*. Entra al sistema para administrar todos nuestros servicios. Accede al catálogo de servicios utilizando el módulo "Carrito".
                    </p>
                </div>
                
                <div class="carousel-container">
                    <div class="carousel-slides" id="carousel-slides">
                        <img src="imagenes/baño.jpg" alt="Servicio de Baño" class="carousel-item active">
                        <img src="imagenes/corte.jpg" alt="Corte de Pelo" class="carousel-item">
                        <img src="imagenes/juguetes.jpeg" alt="Juguetes y Productos" class="carousel-item">
                    </div>
                    <button class="carousel-control prev" id="prev-btn">❮</button>
                    <button class="carousel-control next" id="next-btn">❯</button>
                </div>
                
                <h2 style="margin-top: 3rem; color: var(--color-texto); border-bottom: none;">Servicios Destacados</h2>
                <div class="contact-info">
                    ${productCards}
                </div>

            </section>
        `;
        loadView(homeHTML, setupCarousel); 
        updateNavigation();
    }


    function renderLoginView() {
        if (isLoggedIn) { 
            renderDashboard(); 
            return;
        }
        
        const loginHTML = `
            <section id="login-view" class="module-section" style="max-width: 400px; margin: 2rem auto;">
                <h2>Iniciar Sesión <i class="fas fa-sign-in-alt"></i></h2>
                <div id="login-feedback"></div>
                <form id="login-form">
                    <div class="form-group">
                        <label for="username">Usuario:</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña:</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit">Entrar al Sistema</button>
                </form>
            </section>
        `;
        
        loadView(loginHTML, () => {
            document.getElementById('login-form').addEventListener('submit', handleLogin);
        });
        updateNavigation();
    }


    function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const feedbackDiv = document.getElementById('login-feedback');
        feedbackDiv.innerHTML = ''; 

        if (username === VALID_USER && password === VALID_PASS) {
            isLoggedIn = true;
            feedbackDiv.innerHTML = '<div class="feedback-success feedback-message">¡Inicio de sesión exitoso! Redirigiendo...</div>';
            setTimeout(renderDashboard, 1000); 
        } else {
            feedbackDiv.innerHTML = '<div class="feedback-error feedback-message">Usuario o contraseña incorrectos.</div>';
        }
        updateNavigation();
    }

    function handleLogout() {
        isLoggedIn = false;
        alert('Sesión cerrada. Regresando al inicio.');
        renderHomeView();
        updateNavigation();
    }

    function updateNavigation() {
        
        if (isLoggedIn) {
            navHomeLi.style.display = 'none'; 
            logo.style.cursor = 'pointer';
            logo.removeEventListener('click', renderHomeView); 
            logo.addEventListener('click', renderDashboard); 

        } else {
            navHomeLi.style.display = 'list-item'; 
            logo.style.cursor = 'default';
            logo.removeEventListener('click', renderDashboard);
            logo.addEventListener('click', renderHomeView); 
        }
        
        navLoginBtn.style.display = isLoggedIn ? 'none' : 'list-item';
        navLogoutBtn.style.display = isLoggedIn ? 'list-item' : 'none';

        document.querySelectorAll('.module-link').forEach(el => el.parentElement.remove());

        if (isLoggedIn) {
            const modules = [
                { text: 'Registro', id: 'registro', handler: renderRegistroView },
                { text: 'Agenda', id: 'agenda', handler: renderAgendaView },
                { text: 'Carrito', id: 'carrito', handler: renderCarritoView },
            ];

            const navUl = mainNav.querySelector('ul');
            const logoutLi = document.getElementById('nav-logout-btn');

            modules.forEach(module => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = module.text;
                a.id = `nav-${module.id}`;
                a.className = 'module-link';
                a.addEventListener('click', module.handler);
                li.appendChild(a);
                
                navUl.insertBefore(li, logoutLi);
            });
        }
    }

    function renderDashboard() {
        const dashboardHTML = `
            <section id="dashboard-view" class="module-section">
                <h2><i class="fas fa-tachometer-alt"></i> Dashboard del Sistema</h2>
                <p>Bienvenido al sistema de gestión de PetLuka Spa, ${VALID_USER}. Utiliza la barra de navegación para acceder a los diferentes módulos.</p>
                
                <div style="display: flex; justify-content: space-around; margin-top: 3rem; text-align: center;">
                    <div style="padding: 1.5rem; background-color: var(--color-acento); border-radius: 8px; color: var(--color-fondo); box-shadow: 0 4px 10px rgba(0, 173, 181, 0.7);">
                        <h3>Dueños y Mascotas</h3>
                        <p style="font-size: 2rem; color: var(--color-fondo);">${registeredOwners.length}</p>
                        <p>Dueños Registrados</p>
                    </div>
                    <div style="padding: 1.5rem; background-color: var(--color-acento); border-radius: 8px; color: var(--color-fondo); box-shadow: 0 4px 10px rgba(0, 173, 181, 0.7);">
                        <h3>Servicios Agendados</h3>
                        <p style="font-size: 2rem; color: var(--color-fondo);">${scheduledServices.length}</p>
                        <p>Citas Pendientes</p>
                    </div>
                </div>
            </section>
        `;
        loadView(dashboardHTML);
        updateNavigation();
    }
    
    function renderRegistroView() {
        if (!isLoggedIn) { renderLoginView(); return; }
        
        const registroHTML = `
            <section id="registro-view" class="module-section">
                <h2><i class="fas fa-user-plus"></i> Módulo de Registro</h2>
                <div id="registro-feedback"></div>
                
                <h3>1. Registrar Dueño</h3>
                <form id="owner-form">
                    <div class="form-group"><label for="owner-name">Nombre:</label><input type="text" id="owner-name" required></div>
                    <div class="form-group"><label for="owner-phone">Teléfono:</label><input type="tel" id="owner-phone" required></div>
                    <div class="form-group"><label for="owner-email">Correo:</label><input type="email" id="owner-email" required></div>
                    <button type="submit" class="btn-success">Registrar Dueño</button>
                </form>

                <hr style="margin: 2rem 0; border-color: var(--color-acento);">

                <h3>2. Registrar Mascota</h3>
                <form id="pet-form">
                    <div class="form-group"><label for="pet-owner-select">Dueño (Seleccionar):</label>
                        <select id="pet-owner-select" required></select>
                        <small style="color: var(--color-error);">* El dueño debe estar registrado primero.</small>
                    </div>
                    <div class="form-group"><label for="pet-name">Nombre:</label><input type="text" id="pet-name" required></div>
                    <div class="form-group"><label for="pet-species">Especie:</label><input type="text" id="pet-species" required placeholder="Ej: Perro, Gato, Ave"></div>
                    <div class="form-group"><label for="pet-breed">Raza:</label><input type="text" id="pet-breed" required></div>
                    <button type="submit" class="btn-success">Registrar Mascota</button>
                </form>

                <hr style="margin: 2rem 0; border-color: var(--color-acento);">

                <h3>Dueños Registrados (<span id="owners-count">0</span>)</h3>
                <ul id="owners-list"></ul>
            </section>
        `;

        loadView(registroHTML, setupRegistroModule);
    }
    
    function setupRegistroModule() {
        populateOwnerSelect();
        renderOwnersList();

        document.getElementById('owner-form').addEventListener('submit', handleOwnerRegistration);
        document.getElementById('pet-form').addEventListener('submit', handlePetRegistration);
    }
    
    function populateOwnerSelect() {
        const select = document.getElementById('pet-owner-select');
        if (!select) return;
        select.innerHTML = '<option value="" disabled selected>-- Seleccione un Dueño --</option>';

        registeredOwners.forEach((owner, index) => {
            const option = document.createElement('option');
            option.value = index; 
            option.textContent = `${owner.name} (${owner.phone})`;
            select.appendChild(option);
        });
    }

    function renderOwnersList() {
        const list = document.getElementById('owners-list');
        const countSpan = document.getElementById('owners-count');
        if (!list || !countSpan) return;
        
        countSpan.textContent = registeredOwners.length;
        list.innerHTML = '';
        
        if (registeredOwners.length === 0) {
            list.innerHTML = '<li style="background: none; border: none; padding-left: 0;">Aún no hay dueños registrados.</li>';
            return;
        }

        registeredOwners.forEach((owner, index) => {
            const petNames = registeredPets
                .filter(pet => pet.ownerId === index)
                .map(pet => `${pet.name} (${pet.species})`)
                .join(', ') || 'Sin mascotas registradas';

            const li = document.createElement('li');
            li.innerHTML = `<strong>${owner.name}</strong> | Tel: ${owner.phone} | Correo: ${owner.email} <br> Mascotas: ${petNames}`;
            list.appendChild(li);
        });
    }

    function handleOwnerRegistration(e) {
        e.preventDefault();
        const name = document.getElementById('owner-name').value.trim();
        const phone = document.getElementById('owner-phone').value.trim();
        const email = document.getElementById('owner-email').value.trim();
        const feedbackDiv = document.getElementById('registro-feedback');

        if (!name || !phone || !email) {
            feedbackDiv.innerHTML = '<div class="feedback-error feedback-message">Todos los campos de Dueño son obligatorios.</div>';
            return;
        }

        registeredOwners.push({ name, phone, email, id: registeredOwners.length });
        document.getElementById('owner-form').reset();
        feedbackDiv.innerHTML = '<div class="feedback-success feedback-message">Dueño registrado con éxito: ' + name + '</div>';
        
        populateOwnerSelect();
        renderOwnersList();
    }

    function handlePetRegistration(e) {
        e.preventDefault();
        const ownerId = document.getElementById('pet-owner-select').value;
        const name = document.getElementById('pet-name').value.trim();
        const species = document.getElementById('pet-species').value.trim();
        const breed = document.getElementById('pet-breed').value.trim();
        const feedbackDiv = document.getElementById('registro-feedback');

        if (!ownerId || !name || !species || !breed) {
            feedbackDiv.innerHTML = '<div class="feedback-error feedback-message">Todos los campos de Mascota son obligatorios.</div>';
            return;
        }

        registeredPets.push({ name, species, breed, ownerId: parseInt(ownerId) });
        document.getElementById('pet-form').reset();
        feedbackDiv.innerHTML = '<div class="feedback-success feedback-message">Mascota registrada con éxito: ' + name + '</div>';
        
        renderOwnersList(); 
    }


    function renderAgendaView() {
        if (!isLoggedIn) { renderLoginView(); return; }
        
        const agendaHTML = `
            <section id="agenda-view" class="module-section">
                <h2><i class="fas fa-calendar-alt"></i> Módulo de Agenda de Servicios</h2>
                <div id="agenda-feedback"></div>

                <h3>Agendar Nuevo Servicio</h3>
                <form id="schedule-form">
                    <div class="form-group"><label for="service-date">Fecha:</label><input type="date" id="service-date" required></div>
                    <div class="form-group"><label for="service-time">Hora:</label><input type="time" id="service-time" required></div>
                    
                    <div class="form-group"><label for="service-pet-select">Mascota (Dueño):</label>
                        <select id="service-pet-select" required></select>
                        <small style="color: var(--color-secundario);">Debe haber mascotas registradas para agendar.</small>
                    </div>
                    
                    <div class="form-group"><label for="service-type">Servicio:</label>
                        <select id="service-type" required>
                            <option value="" disabled selected>-- Seleccione un Servicio --</option>
                            <option value="Baño Completo">Baño Completo (Bs 30.00)</option>
                            <option value="Corte de Pelo">Corte de Pelo (Bs 45.00)</option>
                            <option value="Consulta Veterinaria">Consulta Veterinaria (Bs 50.00)</option>
                        </select>
                    </div>
                    
                    <button type="submit" class="btn-success">Agendar Cita</button>
                </form>

                <hr style="margin: 2rem 0; border-color: var(--color-acento);">

                <h3>Citas Agendadas (<span id="scheduled-count">0</span>)</h3>
                <div id="scheduled-list"></div>
            </section>
        `;

        loadView(agendaHTML, setupAgendaModule);
    }
    
    function setupAgendaModule() {
        populateServicePetSelect();
        renderScheduledList();
        document.getElementById('schedule-form').addEventListener('submit', handleScheduleService);
    }
    
    function populateServicePetSelect() {
        const select = document.getElementById('service-pet-select');
        if (!select) return;
        select.innerHTML = '<option value="" disabled selected>-- Seleccione una Mascota --</option>';

        registeredPets.forEach((pet, index) => {
            const owner = registeredOwners.find(o => o.id === pet.ownerId);
            const petId = index; 
            const ownerName = owner ? owner.name : 'Desconocido';
            const option = document.createElement('option');
            option.value = petId;
            option.textContent = `${pet.name} (${pet.species}) - Dueño: ${ownerName}`;
            select.appendChild(option);
        });
    }

    function handleScheduleService(e) {
        e.preventDefault();
        const date = document.getElementById('service-date').value;
        const time = document.getElementById('service-time').value;
        const petId = document.getElementById('service-pet-select').value;
        const service = document.getElementById('service-type').value;
        const feedbackDiv = document.getElementById('agenda-feedback');

        if (!date || !time || !petId || !service) {
            feedbackDiv.innerHTML = '<div class="feedback-error feedback-message">Por favor, complete todos los campos de la agenda.</div>';
            return;
        }

        const pet = registeredPets[parseInt(petId)];
        const owner = registeredOwners[pet.ownerId];

        scheduledServices.push({
            date,
            time,
            petName: pet.name,
            ownerName: owner.name,
            service
        });
        
        document.getElementById('schedule-form').reset();
        feedbackDiv.innerHTML = `<div class="feedback-success feedback-message">Cita agendada para ${pet.name} el ${date} a las ${time}.</div>`;

        renderScheduledList();
    }

    function renderScheduledList() {
        const listDiv = document.getElementById('scheduled-list');
        const countSpan = document.getElementById('scheduled-count');
        if (!listDiv || !countSpan) return;

        countSpan.textContent = scheduledServices.length;
        listDiv.innerHTML = '';

        if (scheduledServices.length === 0) {
            listDiv.innerHTML = '<p>No hay citas agendadas aún.</p>';
            return;
        }

        const ul = document.createElement('ul');
        scheduledServices.sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));

        scheduledServices.forEach(item => {
            const li = document.createElement('li');
            li.className = 'module-section';
            li.style.padding = '10px';
            li.style.margin = '10px 0';
            li.style.boxShadow = '0 2px 5px rgba(0, 255, 255, 0.3)';
            li.style.backgroundColor = 'var(--color-acento)';
            li.style.color = 'var(--color-fondo)';
            li.innerHTML = `[${item.date} ${item.time}] - <strong>${item.service}</strong> para <strong>${item.petName}</strong> (Dueño: ${item.ownerName})`;
            ul.appendChild(li);
        });
        listDiv.appendChild(ul);
    }


    function renderCarritoView() {
        if (!isLoggedIn) { renderLoginView(); return; }
        
        const carritoHTML = `
            <section id="carrito-view" class="module-section">
                <h2><i class="fas fa-shopping-cart"></i> Módulo de Carrito de Compras</h2>
                
                <h3> Higiene básica</h3>
                <div class="catalog-grid" id="catalog-list-1"></div>

                <h3> Relajación y tratamientos</h3>
                <div class="catalog-grid" id="catalog-list-2"></div>

                <h3> Cuidados adicionales</h3>
                <div class="catalog-grid" id="catalog-list-3"></div>

                <h3> Servicios premium</h3>
                <div class="catalog-grid" id="catalog-list-4"></div>

                <hr style="margin: 2rem 0; border-color: var(--color-acento);">

                <h3>Carrito de Compras</h3>
                <div id="carrito-list"></div>

                <div class="carrito-summary">
                    <p>Subtotal: Bs <span id="carrito-subtotal">0.00</span></p>
                    <p>Impuestos (15%): Bs <span id="carrito-tax">0.00</span></p>
                    <h3>Total a Pagar: Bs <span id="carrito-total" style="color: var(--color-exito);">0.00</span></h3>
                    <button id="finalizar-compra-btn" class="btn-success" style="margin-top: 1rem;" disabled>Finalizar Compra</button>
                </div>
            </section>
        `;
        
        loadView(carritoHTML, setupCarritoModule);
    }
    
    function setupCarritoModule() {
        renderCategoryCatalog(1, 'catalog-list-1');
        renderCategoryCatalog(2, 'catalog-list-2');
        renderCategoryCatalog(3, 'catalog-list-3');
        renderCategoryCatalog(4, 'catalog-list-4');
        
        renderCarritoList();
        
        const checkoutBtn = document.getElementById('finalizar-compra-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', handleCheckout);
        }
    }

    function renderCategoryCatalog(categoryId, listId) {
        const catalogList = document.getElementById(listId);
        if (!catalogList) return; 

        const categoryProducts = CATALOG_PRODUCTS.filter(p => p.categoryId === categoryId);
        
        catalogList.innerHTML = ''; 

        if (categoryProducts.length === 0) {
            catalogList.innerHTML = '<p style="color: var(--color-secundario);">No hay servicios/productos disponibles en esta categoría.</p>';
            return;
        }

        categoryProducts.forEach(product => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'catalog-item';
            
            itemDiv.innerHTML = `
                <img src="${product.imageURL}" alt="${product.name}" class="product-image">
                <div class="item-details">
                    <h4>${product.name}</h4>
                    <p style="font-size: 0.9em; margin-bottom: 0.5rem; color: var(--color-secundario);">${product.type}</p>
                    <p style="font-weight: bold; color: var(--color-exito);">Bs ${product.price.toFixed(2)}</p>
                </div>
                <button class="btn-add-to-cart" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Comprar
                </button>
            `;
            catalogList.appendChild(itemDiv);
        });

        catalogList.querySelectorAll('.btn-add-to-cart').forEach(button => {
            button.addEventListener('click', handleAddToCart);
        });
    }


    function handleAddToCart(e) {
        const productId = parseInt(e.currentTarget.getAttribute('data-id'));
        const product = CATALOG_PRODUCTS.find(p => p.id === productId);

        if (product) {
            const cartItem = shoppingCart.find(item => item.id === productId);

            if (cartItem) {
                cartItem.quantity += 1; 
            } else {
                shoppingCart.push({ ...product, quantity: 1 }); 
            }

            renderCarritoList();
            alert(`"${product.name}" agregado al carrito.`);
        }
    }
    
    function handleRemoveItem(e) {
        const productId = parseInt(e.currentTarget.getAttribute('data-id'));
        
        shoppingCart = shoppingCart.filter(item => item.id !== productId);
        
        renderCarritoList();
        alert('Ítem eliminado del carrito.');
    }

    function handleUpdateQuantity(e) {
        const productId = parseInt(e.currentTarget.getAttribute('data-id'));
        const newQuantity = parseInt(e.currentTarget.value);

        const cartItem = shoppingCart.find(item => item.id === productId);

        if (cartItem) {
            if (newQuantity <= 0) {
                shoppingCart = shoppingCart.filter(item => item.id !== productId);
            } else {
                cartItem.quantity = newQuantity;
            }
        }
        renderCarritoList();
    }

    function handleCheckout() {
        if (shoppingCart.length === 0) {
            alert('El carrito está vacío. Agregue productos para finalizar la compra.');
            return;
        }

        const total = document.getElementById('carrito-total').textContent;
        
        alert(`¡Compra finalizada con éxito! Total pagado: Bs ${total}. Gracias por su preferencia.`);

        shoppingCart.length = 0; 

        renderCarritoList();
    }


    function renderCarritoList() {
        const carritoList = document.getElementById('carrito-list');
        if (!carritoList) return;
        carritoList.innerHTML = '';

        if (shoppingCart.length === 0) {
            carritoList.innerHTML = '<p>El carrito de compras está vacío.</p>';
            updateTotals(0); 
            return;
        }

        let subtotal = 0;
        
        const containerDiv = document.createElement('div');
        containerDiv.style.display = 'flex';
        containerDiv.style.flexDirection = 'column';
        containerDiv.style.gap = '10px';
        containerDiv.style.border = '1px solid var(--color-acento)';
        containerDiv.style.padding = '15px';
        containerDiv.style.borderRadius = '4px';


        shoppingCart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const itemRow = document.createElement('div');
            itemRow.className = 'cart-item-row';

            itemRow.innerHTML = `
                <span class="item-name">${item.name}</span>
                <input type="number" class="item-quantity" value="${item.quantity}" min="1" data-id="${item.id}">
                <span class="item-price">Bs ${itemTotal.toFixed(2)}</span>
                <button class="btn btn-remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            containerDiv.appendChild(itemRow);
        });

        carritoList.appendChild(containerDiv);
        updateTotals(subtotal);
        
        carritoList.querySelectorAll('.btn-remove-item').forEach(button => {
            button.addEventListener('click', handleRemoveItem);
        });
        
        carritoList.querySelectorAll('.item-quantity').forEach(input => {
            input.addEventListener('change', handleUpdateQuantity);
        });
    }

    function updateTotals(subtotal) {
        const TAX_RATE = 0.15;
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax;

        document.getElementById('carrito-subtotal').textContent = subtotal.toFixed(2);
        document.getElementById('carrito-tax').textContent = tax.toFixed(2);
        document.getElementById('carrito-total').textContent = total.toFixed(2);
        
        const checkoutBtn = document.getElementById('finalizar-compra-btn');
        if (checkoutBtn) {
            checkoutBtn.disabled = subtotal <= 0;
        }
    }
    
    renderHomeView();

    navHome.addEventListener('click', renderHomeView);
    document.getElementById('show-login-form').addEventListener('click', renderLoginView);
    document.getElementById('logout-system').addEventListener('click', handleLogout);
});