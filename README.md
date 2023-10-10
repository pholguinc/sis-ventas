# NG Store

Este sistema está desarrollado con la finalidad de dar un fin a los procesos manuales y pérdida en la gestión de productos en tu tienda, con este software podrás gestionar tus productos, actualizar stock, generar reportes, entre otros procesos.

## Tecnologías Usadas

**Frontend:** Angular, Typescript


**Backend:** Node, Express, Nestjs, Typescript, TypeORM

**SGDB:** PostgreSQL

**Docker:** Se usó un contenedor de docker para la gestión de la base de datos.



## Instalación

Primero debes de clonar el proyecto 

```bash
  git clone https://github.com/pholguinc/sis-ventas
```


Procedemos a dirigirnos a la carpeta **Backend** e instalaremos las dependencias que requiere la aplicación

```bash
  yarn install
```

Una vez hecho ello procedemos a levenatar nuestro contendor de docker.

```bash
  docker compose up
```

**NOTA:** Cabe recalcar que para ello debes de haber modificado las variables de entorno ya que con ello se hará las configuraciones respectivas.


Ahora procederemos a leventar nuestro backend y para ello ejecutaremos el siguiente comando:

```bash
  yarn run start:dev
```

Ahora procederemos a hacer la configuración respectiva para el frontend, para ello en nuestro proyecto navegamos hasta la carpeta **frontend**

```bash
~/Documents/sis-ventas/frontend
```

Una vez realizado ello, procedermos a instalar las dependencias que necesita nuestro proyecto en lo cual al igual que el backend ejecutamos el siguiente comando:

```bash
  yarn install
```

Y para finalizar levanataremos nuestro proyecto de Angular, el cual ejecutamos el siguiente comando:

```bash
  ng serve
```



