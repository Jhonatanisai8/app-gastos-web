# 🪙 Financial Zen - Control de Gastos Personal

¡Hola! Bienvenido a **Financial Zen**, mi proyecto de control de gastos personal. Es una aplicación **Full-Stack** (Móvil y Backend) diseñada para ayudarte a gestionar tus ingresos y gastos diarios de una forma súper visual, limpia y sin complicaciones.

Decidí crear esta app para practicar mis habilidades de desarrollo y construir algo que realmente sirva para el día a día. ¡Espero que te guste!

---

## 📸 Capturas de Pantalla

<img width="720" height="1612" alt="image" src="https://github.com/user-attachments/assets/e780a9a5-3d3e-403d-97e3-c07e474685b6" />
<img width="720" height="1612" alt="image" src="https://github.com/user-attachments/assets/3404ed37-abb6-4708-b6e7-57712c607026" />
<img width="720" height="1612" alt="image" src="https://github.com/user-attachments/assets/4adb4464-f28d-400f-915f-39f7581febae" />

---

## 🚀 ¿Qué hace esta aplicación?

* **Registro e Inicio de Sesión Seguro**: Puedes crear tu cuenta y guardar tus datos de forma segura.
* **Dashboard Inteligente**: Muestra tu saldo total, gráfica de ingresos vs. gastos, y límites estimados (diario, semanal y proyección mensual).
* **Teclado Personalizado**: Para registrar tus gastos o ingresos de forma rápida y sencilla sin usar el teclado incómodo del celular.
* **Categorización Dinámica**: Iconos interactivos para clasificar tus gastos (comida, transporte, compras, etc.).
* **Actualización en Tiempo Real**: Al registrar una transacción, tus estadísticas en el Dashboard se actualizan automáticamente.

---

## 🛠️ Tecnologías que utilicé

Este es un proyecto completo que se compone de dos partes:

### 📱 Frontend (App Móvil)
* **React Native / Expo**: Para construir la aplicación móvil que funciona en Android.
* **NativeWind (Tailwind CSS)**: Para todo el diseño visual, usando colores modernos y bordes redondeados (¡estilo minimalista!).
* **Axios**: Para conectar la app con la base de datos a través del Backend.
* **Expo Font & Icons**: Para cargar fuentes bonitas y todos los iconos interactivos.

### ☕ Backend (API Servidor)
* **Java & Spring Boot**: La base del servidor y la lógica de negocio.
* **MapStruct**: Para pasar datos entre la base de datos y la app de forma ordenada.
* **PostgreSQL / MySQL**: Para almacenar de forma segura todos los usuarios y transacciones.

---

## ⚙️ ¿Cómo probarlo en tu computadora?

### 1. Clonar el repositorio
```bash
git clone https://github.com/Jhonatanisai8/app-gastos-web.git
cd app-gastos-web
```

### 2. Configurar y encender el Backend (Servidor)
1. Ve a la carpeta `backend/`.
2. Asegúrate de configurar tus credenciales de base de datos en `src/main/resources/application.properties`.
3. Ejecuta el servidor desde tu editor preferido (o con Maven en la terminal):
   ```bash
   ./mvnw spring-boot:run
   ```

### 3. Configurar y encender la App Móvil (Frontend)
1. Ve a la carpeta `guardaBills/`:
   ```bash
   cd guardaBills
   ```
2. Instala las librerías necesarias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la carpeta `guardaBills` y coloca la dirección IP de tu servidor backend:
   ```env
   EXPO_PUBLIC_API_URL=http://TU_DIRECCION_IP:8080/api/v1
   ```
4. Enciende el servidor de Expo:
   ```bash
   npx expo start
   ```
5. Escanea el código QR con la aplicación **Expo Go** en tu celular (¡o usa un emulador!).

---

## 🌟 Aprendizajes en este proyecto

Como desarrollador junior, este proyecto me ayudó muchísimo a:
* Conectar una aplicación móvil real con un servidor Backend.
* Manejar de forma segura las variables de entorno en Expo para no exponer contraseñas ni URLs de APIs públicas.
* Configurar archivos de exclusión como `.gitignore` y `.easignore` para que los despliegues pesen poco y sean rápidos.
* Estructurar el código de una forma limpia y fácil de mantener para futuras actualizaciones.

---

*¡Creado con mucho esfuerzo y ganas de seguir aprendiendo! Si tienes alguna sugerencia, no dudes en abrir un Issue o escribirme en mi LinkedIn.*
