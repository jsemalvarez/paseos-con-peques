# Proyecto: Paseos con Peques
Está construido con React, Vite y Firebase. A continuación, encontrarás una guía sobre cómo configurarlo y ejecutarlo en desarrollo.

## Tecnologías Utilizadas
- React: Biblioteca para construir interfaces de usuario.
- Vite: Herramienta de desarrollo para un proceso de compilación rápido.
- Firebase: Plataforma de desarrollo de aplicaciones que provee autenticación, base de datos y hosting.

## Requisitos Previos
Node.js instalado (recomendado: v18 o superior).  
Firebase CLI ( recomendado )

## Instala Firebase CLI
```javascript

    npm install -g firebase-tools

```

## Configuración del Proyecto en Firebase

Para comenzar, necesitas configurar un proyecto en Firebase:

1. Ve a Firebase Console y haz clic en Agregar Proyecto.
2. Nombra tu proyecto y completa los pasos de configuración. Al finalizar, serás redirigido al panel del proyecto.
3. En la sección Desarrollar > Authentication, activa el método de autenticación que prefieras (por ejemplo, correo electrónico y contraseña).
4. En Desarrollar > Firestore Database, crea una base de datos en modo de prueba (puedes cambiarlo más tarde).
5. Ve a Configuración del proyecto (ícono de engranaje) > Tus aplicaciones y selecciona Agregar app Web.
6. Sigue los pasos y debería verse algo como esto:

```javascript

    const firebaseConfig = {
      apiKey: "your-api-key",
      authDomain: "your-auth-domain",
      projectId: "your-project-id",
      storageBucket: "your-storage-bucket",
      messagingSenderId: "your-messaging-sender-id",
      appId: "your-app-id"
    };

```
## Instalación y Ejecución del Proyecto en Desarrollo
Sigue estos pasos para ejecutar el proyecto en tu máquina local:
1. Clona el repositorio
```javascript

    git clone https://github.com/jsemalvarez/paseos-con-peques.git
    cd paseos-con-peques

```
2. Instala las dependencias:
```javascript

    npm install

```
3. Configura las variables de entorno:  
Renombra el archivo `.env.template` a `.env` en la raíz del proyecto y copia las claves de Firebase que configuraste anteriormente.
```javascript

    # FIREBASE PUBLIC KEYS
    API_KEY=apiKey
    AUTH_DOMAIN=authDomain
    DATABASE_URL=databaseURL
    PROJECT_ID=projectId
    STORAGE_BUCKET=storageBucket
    MESSAGING_SENDER_ID=messagingSenderId
    APP_ID=appId

```
4. Inicia el servidor de desarrollo:
```javascript

    npm run dev

```
5. Abre el proyecto:
Accede a http://localhost:5173 en tu navegador para ver el proyecto en desarrollo.

## Configurar GitHub Actions para Deploy Automático en Firebase Hosting ( Opcional )

> [!NOTE]
> Este proyecto tiene dos archivos YAML de Workflow en ` .github/workflows ` para hacer deploy automatico al hosting cuando se hace un PR o un MERGE en la rama main. 
> Los puede borrar y no tendra deploy automatico o pude hacer la siguiente configuracion y usarlos

1. Genera un Token de Autenticación en Firebase
- Instala Firebase CLI (si no lo has hecho).
```javascript
    npm install -g firebase-tools
```
- Inicia sesión en Firebase
```javascript
    firebase login
```
> [!IMPORTANT]  
> El siguiente comando generará un token que se verá como ` 1//0abcd... `, el cual necesitas copiar y guardar para el siguiente paso.
- Genera un token de despliegue. Este token permitirá a GitHub Actions autenticarse con Firebase.  
```javascript
    firebase login:ci
```

2. Agrega el Token de Firebase a los Secretos de GitHub
    - Ve al repositorio en GitHub y abre la pestaña Settings (Configuración).
    - En el menú lateral, selecciona Secrets and variables > Actions.
    - Haz clic en New repository secret.
    - Crea un secreto con el nombre `FIREBASE_SERVICE_ACCOUNT_PASESO_CON_PEQUES` y pega el token que generaste en el paso anterior.
    - Guarda el secreto.
      
## SCRIPTS disponibles

