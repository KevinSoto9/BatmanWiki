# 🦇 BatmanWiki

BatmanWiki es una aplicación web interactiva para explorar el universo de Batman. Descubre personajes, lugares, gadgets y más a través de una interfaz moderna y oscura, ideal para los fans del Caballero Oscuro.

---

## 🌐 Demo

👉 [Ver Demo en Vercel](https://batman-wiki.vercel.app/)

---

## 🚀 Características

- Consulta personajes clave del universo Batman  
- Interfaz moderna, responsiva y con modo oscuro por defecto  
- Navegación fluida entre secciones  
- Consumo de APIs para obtener contenido dinámico  
- Animaciones suaves con Framer Motion  
- Optimizada como proyecto de portafolio  

---

## 🛠️ Tecnologías Utilizadas

- **Vite** – Bundler ultra rápido  
- **React** – Biblioteca para interfaces modernas  
- **TypeScript** – Tipado estático para mayor robustez  
- **React Router DOM** – Navegación entre vistas  
- **React Icons** – Íconos populares y personalizables  
- **Framer Motion** – Animaciones fluidas  
- **Tailwind CSS** – Estilizado rápido y responsivo  

## 📡 APIs y Recursos

### APIs Utilizadas
- **[Batman API](https://batmanapi.com/)** - API principal para obtener información sobre personajes, villanos y eventos del universo Batman
- **[OMDb API](https://www.omdbapi.com/)** - API para obtener información sobre películas y series de Batman
- **[Superhero API](https://superheroapi.com/)** - API complementaria para datos adicionales de superhéroes

### Recursos y Assets
- **[DC Comics](https://www.dccomics.com/)** - Referencia oficial para información del universo DC
- **[Batman Wiki](https://batman.fandom.com/)** - Wiki no oficial con información detallada
- **[Comic Vine](https://comicvine.gamespot.com/)** - Base de datos de cómics y personajes

### Créditos de Imágenes
- Imágenes de personajes: DC Comics
- Fondos y elementos de UI: Diseño personalizado
- Íconos: React Icons y Font Awesome

---

## 📋 Requisitos del Sistema

- Node.js 18 o superior  
- npm o yarn  
- Navegador web moderno  

---

## ⚙️ Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/KevinSoto9/BatmanWiki.git
```

2. Instala las dependencias:

```bash
cd BatmanWiki
npm install
# o
yarn install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

Abre http://localhost:5173 en tu navegador.

---

## ☁️ Despliegue Local

Para desplegar la aplicación en tu entorno local:

1. Asegúrate de tener Node.js 18 o superior instalado:
```bash
node --version
```

2. Clona el repositorio si aún no lo has hecho:
```bash
git clone https://github.com/KevinSoto9/BatmanWiki.git
```

3. Navega al directorio del proyecto:
```bash
cd BatmanWiki
```

4. Instala las dependencias:
```bash
npm install
# o
yarn install
```

5. Construye la aplicación para producción:
```bash
npm run build
# o
yarn build
```

6. Para servir la aplicación construida localmente, puedes usar un servidor estático como `serve`:
```bash
# Instalar serve globalmente
npm install -g serve
# o
yarn global add serve

# Servir la aplicación
serve -s dist
```

La aplicación estará disponible en `http://localhost:3000` (o el puerto que indique serve).

Alternativamente, puedes usar cualquier servidor web estático como:
- Apache
- Nginx
- Python SimpleHTTPServer
- Node.js http-server

Solo necesitas copiar el contenido de la carpeta `dist` a tu servidor web.

---

## 📚 Contenido

- **Home**: Pantalla de bienvenida y presentación
- **Personajes**: Lista dinámica de personajes del universo Batman
- **Detalles**: Página individual con información del personaje
- **Navbar**: Navegación fija con enlaces entre secciones
- **Transiciones**: Animaciones suaves al cambiar de rutas

---

## 📁 Estructura del Proyecto

```
src/
├── assets/              # Imágenes y recursos estáticos
├── components/          # Componentes reutilizables (Navbar, Cards, etc.)
├── pages/               # Vistas principales de la aplicación
├── routes/              # Configuración de rutas con React Router
├── styles/              # Estilos globales (Tailwind)
└── main.tsx             # Punto de entrada de la aplicación
```

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres mejorar la aplicación:

1. Haz un fork del repositorio.
2. Crea una nueva rama: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza tus cambios y haz commit: `git commit -m "Agrega nueva funcionalidad"`.
4. Haz push a tu rama: `git push origin feature/nueva-funcionalidad`.
5. Abre un Pull Request 🚀

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

---

## 🙋 Autor

**Kevin Soto**  
Desarrollador Web Frontend  
GitHub: @KevinSoto9
