# Proyecto Integrador Modulo 4 - Diseño de pagina SPA + Mobile First

UniversalTask una APP donde puedes gestionar tus tareas.
    -Inicio/Registro de Usuarios de acceso privado y personalizacion de tareas.
    -Funciones CRUD para el manejo de tareas, con ordenamiento de las tareas según su fecha límite.
    -Permanencia de Datos atraves de Base de Datos Online.
    -Filtros en base a Estado y Categoria para una mayor facilidad de busqueda.
    -Es posible solicitar un Resumen de Actividades al correo, donde informa de cantidad de tareas completadas/pendientes y las proximas 5 tareas a expirar (Titulo y Fecha Limite adjuntadas).

---

## Stack Tecnico

* **FrontEnd:** React + TypeScript + Vite.
* **Entorno de Desarrollo:** Antigravity.
* **BackEnd/Proxy:** Firebase + Firestore.
* **Servicio de Mensajeria:** AWS SES + Vercel Serveless Functions.
* **Formato Web:** SPA de navegacion (HOME/TASK/AUTH) con metodologia de diseño Mobile First.
* **IA:** (Claude + ChatGPT) y el Agente de Antigravity.
* **Deploy:** Vercel.
* **Testing:** Vitest.

---

## Accesos Directos del Proyecto

* **Deploy en Vercel:** https://proyecto-m4-moyano-erik.vercel.app
* **Documentacion de la AI:** https://docs.google.com/document/d/1fgk4Sszp3cO_eGSIe-Ev64zkOS-cN2-eNWcoi0y35So/edit?usp=sharing

---

## Arquitectura del Proyecto

```text
ProyectoM4_MoyanoErik/
├── api/
│   └── send-summary.ts
│       Endpoint serverless para enviar por email el resumen
│       de tareas completadas, pendientes y próximas a vencer.
│
├── public/
│       Recursos públicos estáticos.
│
├── src/
│   ├── main.tsx                    #Punto de entrada de React. Monta la aplicación en #root.
│   │
│   ├── App.tsx                     #Configura React Router y las rutas principales.
│   │
│   ├── App.css
│   ├── index.css                   #Estilos globales, variables, tipografías y configuración base.
│   │
│   ├── assets/                     #Imágenes y recursos visuales.
│   │
│   ├── layout/
│   │   └── Navbar.tsx              #Barra de navegación superior compartida.
│   │
│   ├── pages/
│   │   ├── HomePage.tsx            #Página inicial y presentación de UniversalTask.
│   │   │
│   │   ├── AuthPage.tsx            #Contenedor de inicio de sesión y registro.
│   │   │
│   │   ├── TaskPage.tsx            #Pantalla principal de gestión de tareas.
│   │   │
│   │   └── styles/                 #Estilos específicos de cada página.
│   │
│   ├── components/
│   │   ├── AddTask.tsx             #Formulario para crear tareas.
│   │   │
│   │   ├── TaskItem.tsx            #Tarjeta individual de tarea, edición, estado y eliminación.
│   │   │
│   │   ├── TaskFilter.tsx          #Filtros por estado: completada, pendiente y expirada.
│   │   │
│   │   ├── CategoryFilter.tsx      #Filtro por categoría de tarea.
│   │   │
│   │   ├── auth/                   #Componentes de login, registro y protección de rutas.
│   │   │
│   │   ├── context/                #Contexto global de autenticación.
│   │   │
│   │   ├── ui/                     #Componentes reutilizables como botones, inputs, selectores, textarea y checkboxes.
│   │   │
│   │   └── styles/                 #Estilos de los componentes principales.
│   │
│   ├── hooks/
│   │   ├── useAuth.ts              #Acceso simplificado al estado de autenticación.
│   │   │
│   │   ├── useTasks.ts             #Carga, creación, edición, actualización y eliminación de tareas.
│   │   │
│   │   └── useCountdown.ts         #Calcula el tiempo restante de cada tarea.
│   │
│   ├── services/
│   │   ├── firebase.ts             #Inicializa Firebase, Authentication y Firestore.
│   │   │
│   │   ├── taskService.ts          #Gestiona las operaciones CRUD de tareas en Firestore.
│   │   │
│   │   ├── userService.ts          #Gestiona información asociada al usuario.
│   │   │
│   │   └── emailService.ts         #Envía el resumen de tareas al endpoint serverless.
│   │
│   ├── types/
│   │   └── Task.ts                 #Define el modelo y los tipos permitidos para una tarea.
│   │
│   ├── utils/
│   │   ├── filterTasks.ts          #Filtra tareas por estado y categoría.
│   │   │
│   │   ├── sortTasksByDeadline.ts  #Ordena las tareas por fecha límite.
│   │   │
│   │   ├── getTimeRemaining.ts     #Calcula días, horas y minutos restantes.
│   │   │
│   │   ├── getDeadlineRange.ts     #Define fechas mínimas y máximas permitidas.
│   │   │
│   │   ├── authValidation.ts       #Valida datos de inicio de sesión y registro.
│   │   │
│   │   └── buildTaskSumary.ts      #Construye los datos del resumen enviado por email.
│   │
│   └── tests/                      #Pruebas unitarias y de componentes con Vitest.
│
├── index.html                      #Formato HTML de la pagina WEB.
│
├── vite.config.ts                  #Configuración de Vite, Vitest, React y entorno jsdom.
│
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json              #Configuración de TypeScript.
│
├── package.json                    #Dependencias y scripts del proyecto.
│
└── vercel.json                     #Configuración de despliegue en Vercel.
```

## Flujo Principal de la App

![Vista principal de UniversalTask](/src/assets/FlujoApp.jpg)

---

## Ejecutar el Proyecto Completo

1. Accede al link: https://github.com/moyanoerik1991-hue/ProyectoM4_MoyanoErik
2. Busca el boton `<>Code` y descarga el archivo ZIP.
3. Descomprime el Archivo ZIP donde puedas encontrarlo con facilidad.
4. Con Antigravity IDE abierto, arriba a la izquierda das click `File > Add Folder to Workspace` y buscas la carpeta descomprimida.
5. Pasaremos a instalar las dependencias del proyecto, Abriras la terminar con `CTRL+J` y escribiras el siguiente comando `npm install` .
6. Ingresas al link de FireBase https://firebase.google.com/ y te registras, generas el database. Al generarla te dara las 7 variables de entorno necesarias.
7. Te registras en Amazon AWS (https://aws.amazon.com/es/) , buscado Amazon SES, consigues SMTP credentials consigues USER + PASSWORD (guardalas), de ahi vas a identity para seleccionar el correo que utilizaras, ahora bien con eso ya tendras las 4 variables de entorno necesarias. 
6. Importante!! Ahora utilizaremos la API_KEY, para ello crearas el archivo `.env` en la misma ubicacion de `.env.example` y clonaras(copy&paste) su informacion.
7. En `.env` tendras que cargar a mano las 7 variables de Firebase y las 4 del AWS SES.
8. Ya registrado en Vercel, podras generar tu proyecto conectarlo a tu github para luego deployarlo.
9. Ya en Vercel accedes a tu proyecto, luego vas a variables de entorno y las cargas una por una o atras de una nueva funcion de vercel para extraerlas de .env .
10. Si realizaste bien el procedimiento podras acceder a tu propio link y probar todas las funcionalidades.

---

## Aportes de la AI en el Proyecto

Durante este proceso de formacion utilice varios servicios de AI; tales como Claude, Chat GPT, Gemini y el Agente de Antigravity.

* **Claude:** fue la AI con la que tuve la mayor interaccion ya que partimos de cero en el proyecto en una relacion Mentor-Alumno.
Utilice un prompt bastante compuesto para que cumpliera su rol de instruirme en las buenas practicas con un enfoque a las buenas practidas en la construccion de codigo.
```text
El Proyecto:
Construir una aplicación web SPA de gestión de tareas con autenticación de usuarios, persistencia en la nube, envío de notificaciones por email y deploy en producción, aplicando buenas prácticas de arquitectura, tipado con TypeScript, testing y control de versiones.

Contexto:
-Estamos trabajando en Antigravity (Vite + React + TS), repositorios en GitHub.
-Solo trabajaremos en local durante el desarrollo, para luego utilizar un servicio de base de datos y otro servicio para deployar el proyecto. Se informara mas adelante cuales.

Rol:
tomaras el papel de un programador web fullstack senior, encargado de enseñarle de manera educativa al junior. Durante el proceso de desarrollo del proyecto se espera que el junior razone por cuenta propia tanto como le sea posible (al generar archivos nunca lo daras completo, ocultaras secciones del codigo con intencion de que el junior razone y complete).

Objetivos:
-partiremos desde el estado actual del proyecto, los modulos necesarios para el proyecto.
-buscaremos avanzar en el proyecto de manera educativa e interactiva, con explicaciones cortas y detalladas sobre el funcionamiento de lo que estamos trabajando.
-cuando el junior no sepa como avanzar me brindaras 3 recomendaciones que beneficien el desarrollo del proyecto.
-construiremos un proyecto modularizado.

Limites:
-no indagaras por tu cuenta, solicitaras informacion de mi parte antes de generar una respuesta.
-siempre respetaremos las buenas practicas en escrituda de codigo FullStack Developer. en caso de que no se respeten me brindaras alternativas para volver a ellas.
```
Con ella avance con el proceso de construccion del proyecto, donde me facilito explicaciones de funciones, la logica de por donde avanzabamos y por que. Como tambien el proceso de modulizacion y separacion en categorias, por componentes reutilizables que no trabajan con logica de negocio y pueden interactuar con estados de presentacion. como los otros componentes que delegan esa responsabilidad a ellos y se enfocan en la logica de negocio con interpretacion de props y manejo de estados atraves de useState y useEffects.

* **ChatGPT + Gemini:** los utilice principalmente para conversaciones mas puntuales de funciones que no comprendia, el Debugging y problemas con la firebase,AWS y vercel. Para evitar contaminar la charla con Claude. Tambien me ayudaron en gran parte en el desarrollo del diseño CSS.

* **Agente de Antigravity:** aqui utilice principalmente para el Debugging de funciones que no estaban enuncias, mal importadas o problemas de terminal.