//WorkshopAdmin repo readme (English)
this Project was made to be implemented as an automation system of register process and historial managment in your maintenance vehicle workshop or any other kind of bussiness related to the vehicle maintenance, including some features to optimize this process depending on how many things does this workship does, anyway, some of this features are not mandatory to use and made the system work, it's extra help to manage several things and improve the managment Dynamic of your bussiness.

this app was also created and developed to run on your pc as an internal system, it's executed on your browser using that http://127.0.0.0 direction, it's not designed to have an external use nor to web production deploy, it's a local system and a digital tool for your bussiness
that can be used by anyone on your team or any other employeer, centralising information from your customers, your products, your services, and some other more.

The project was developed from early stages and all the code source was manually created, these are the technologies used to develop this system: 
-Django
-Django rest framework
-PostgreSQL
-HTML/CSS
-JavaScript (essential)
No frontend frameworks as react, angular or tailwind were implemented on the development stage.

this file explains the bare minimum info to download and install the repository, the relational model was made to be useful for differents context, despite the attribute names or the type of data, there are several ways to implement the attributes of some models depending on   
what you need to register. basically, you can adapt attributes and use them for your own purpose, the model was not made to restrict the type of content. For more information about the system details and characteristics please take a look on the user guide txt file to clarify more of your doubts.

Here's the steps to copy and install the repository, remember you should have PostgreSQL installed on your pc mandatorily, preferably PostgreSQL 15 or over: 
1 - clone the repository: 
Open the selected directory (cd "path to your directory on the system" or create a new one at your preferred address and write inside it , preferably in git bash:
git clone <https://github.com/achesito/workshopAdmin> 
2 - create virtual environment:
python -m venv venv
venv\Scripts\activate
3 - install dependencies:
pip install -r requirements.txt
4 - migrations: 
python manage.py makemigrations
python manage.py makemigrations —empty autotaller
rename [migration made on the last instruction] 0002_establishment.py
python 0002_create_establishment.py
python manage.py migrate
5 - execute server: python manage.py runserver
Remember you should first initialize the virtual environment to run the server, basically write venv\Scripts\activate
This system it’s supported for English and Spanish, you can just translate the text of the views with the translation of your browser and it will work.
6 - create directories:
Actually, the system create the directories media/ and backups/ (to save images uploaded by users and save a copy of the database, respectively) if both or one doesn’t exists, but you can create both manually, in the main project folder.

The project was just tested in windows, it’s not for public production, however, there are no features or environment variables of windows mandatory to use and run the system. More details about this on the user guide.txt.

The main public for this project are technical users, not necessarily with a high knowledge level, developers juniors, software students, or any kind of person who wants to learn how to implement business rules, restful API, Django architecture, software layers, designs patterns (service pattern in this case), ORM implementations, backend development or any other kind of application related to API development and Django applications. 

IMPORTANT: this system was developed from 0, it’s my first project developed using Django models, prioritizing scalability, simpleness and functionality, it’s not made with purposes of build a robust crm or a big platform for management with high users recurrence, but can work as reference, base project for personalization, low-medium workshop business , base project for demonstrations of backend development, offering a local, centralized, clear and controlled solution. feel free to use it or send recommendations or comments, thank you for your feedback.

POSTSCRIPT: You will need to create a file called local.py according to your own rules. There is one file within the project that you must edit for the project to function. If you prefer not to create a new one from scratch, you don't need to change anything else. If you have any questions, please contact us by email. If you are writing in Spanish, remember to literally translate the values ​​assigned to clarify more what kind of value you'll need to change in the example local.py file in the project's main folder.

in tallerapp/local.py:

EMAIL_KEY = "your api key"
SENDER_NAME = "your name set in brevo for sender"
SENDER_EMAIL = "your mail set at brevo for sender"
All these values ​​are example data. In this last case, to access this functionality (send mails), you will need to create an account on the Brevo platform. Register with your business email or any email you prefer and create an API key. Go to settings, then to SMTP and API, select the "API and MCP keys" option, and generate your own API key. Then, replace the values above, the api-key with the one generated by the platform, the email and name for sender have to be set by you at the moment you create a new api-key. 


//WorkshopAdmin repo readme (español)

Este proyecto se diseñó para implementarse como un sistema de automatización del proceso de registro y la gestión de historiales en su taller de mantenimiento de vehículos o cualquier otro tipo de negocio relacionado con el mantenimiento de vehículos. Incluye funciones para optimizar este proceso según la cantidad de tareas que realiza el taller. Sin embargo, algunas de estas funciones no son obligatorias y, por lo tanto, facilitan el funcionamiento del sistema. Son una ayuda adicional para gestionar diversas tareas y mejorar la dinámica de gestión de su negocio.

Esta aplicación también se creó y desarrolló para ejecutarse en su PC como sistema interno. Se ejecuta en su navegador utilizando la dirección http://127.0.0.0. No está diseñada para uso externo ni para su implementación en producción web. Es un sistema local y una herramienta digital para su negocio que puede ser utilizada por cualquier miembro de su equipo o cualquier otro empleado, centralizando la información de sus clientes, productos, servicios y más.

El proyecto se desarrolló desde sus inicios y todo el código fuente se creó manualmente. Las tecnologías utilizadas para desarrollar este sistema son:
- Django
- Framework Django REST
- PostgreSQL
- HTML/CSS
- JavaScript (esencial)
No se implementaron frameworks frontend como React, Angular o Tailwind durante la etapa de desarrollo.

Este archivo explica la información básica para descargar e instalar el repositorio. El modelo relacional se diseñó para ser útil en diferentes contextos. Independientemente de los nombres de los atributos o el tipo de datos, existen varias maneras de implementar los atributos de algunos modelos según lo que necesite registrar. Básicamente, puede adaptar los atributos y usarlos para sus propios fines; el modelo no se diseñó para restringir el tipo de contenido. Para obtener más información sobre los detalles y las características del sistema, consulte el archivo txt de la guía del usuario para aclarar sus dudas.

Estos son los pasos para copiar e instalar el repositorio. Recuerda que debes tener PostgreSQL instalado en tu PC, preferiblemente PostgreSQL 15 o superior:
1 - Clonar el repositorio:
Abré el directorio (cd "ruta de tu directorio en el sistema" seleccionado o crea uno nuevo en la dirección de tu preferencia y escribe dentro de él, preferiblemente en git bash:
git clone <https://github.com/achesito/workshopAdmin>
2 - Crear entorno virtual:
python -m venv venv
venv\Scripts\activate
3 - Instalar dependencias:
pip install -r requirements.txt
4 - Migraciones:
python manage.py makemigrations
python manage.py makemigrations —empty autotaller
rename [migración realizada en la última instrucción] 0002_establishment.py
python 0002_create_establishment.py
python manage.py migrate
5 - Ejecutar servidor: python manage.py runserver
Recuerda que primero debes inicializar el entorno virtual para ejecutar el servidor; básicamente, escribe venv\Scripts\activate.
Este sistema es compatible con inglés y español; puedes traducir el texto de las vistas con la traducción de tu navegador y funcionará.
6 - Crear directorios:
El sistema crea los directorios. media/ y backups/ (para guardar las imágenes subidas por los usuarios y una copia de la base de datos, respectivamente) si no existen ninguno de los dos, pero puedes crearlos manualmente en la carpeta principal del proyecto.

El proyecto se probó en Windows; no está destinado a producción pública. Sin embargo, no hay características ni variables de entorno de Windows obligatorias para usar y ejecutar el sistema. Más detalles sobre esto en el archivo user guide.txt.

Este proyecto está dirigido principalmente a usuarios técnicos, no necesariamente con un alto nivel de conocimientos, desarrolladores principiantes, estudiantes de software o cualquier persona que desee aprender a implementar reglas de negocio, API RESTful, arquitectura Django, capas de software, patrones de diseño (en este caso, patrón de servicio), implementaciones ORM, desarrollo backend o cualquier otra aplicación relacionada con el desarrollo de API y aplicaciones Django.

IMPORTANTE: Este sistema se desarrolló desde cero. Es mi primer proyecto desarrollado con modelos Django, priorizando la escalabilidad, la simplicidad y la funcionalidad. No está diseñado para construir un CRM robusto ni una gran plataforma de gestión con alta recurrencia de usuarios, sino que puede servir como referencia, proyecto base para personalización, taller de negocios de bajo a medio plazo o proyecto base para demostraciones de desarrollo backend, ofreciendo una solución local, centralizada, clara y controlada. Siéntete libre de usarlo o enviar recomendaciones o comentarios. Gracias por tus comentarios.

POST DATA: necesitaras crear el archivo llamado local.py por bajo tu propias reglas, dentro del proyecto hay uno que debes editar obligatoriamente para hacer el proyecto funcionar, si es el caso que no prefieres crear otro desde 0. no necesitas tocar nada mas. cualquier duda al respecto consultarla por correo. si estas en español recuerda traducir literalmente lo que aparece asignado como valor en el ejemplo hecho en el archivo de local.py en la carpeta principal del proyecto para clarificar un poco mas que debe ir en esa variable.

en tallerapp/local.py:

EMAIL_KEY = "tu clave API"
SENDER_NAME = "tu nombre configurado en Brevo para el remitente"
SENDER_EMAIL = "tu correo configurado en Brevo para el remitente"
Todos estos valores son datos de ejemplo. En este último caso, para acceder a esta función (enviar correos), necesitarás crear una cuenta en la plataforma Brevo. Regístrarte con tu correo electrónico del negocio o el que prefieras y crear una clave API. Ve a Configuración, luego a SMTP y API, selecciona la opción "Claves API y MCP" y genera tu propia clave API. Luego, reemplaza los valores anteriores (la clave API) por los generados por la plataforma. El correo electrónico y el nombre del remitente deben ser configurados por ti al crear la nueva clave API.
