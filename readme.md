
# Asistapp


## Correr front

```bash
npm i -g http-server;
cd front;
http-server
```

## Correr Backend

Primero se debe configurar la base de datos que se encuentra en lab.sql

```bash
npm i;
npm run start:server;
```


## Backend


#### Obtener asistencias
http://localhost:8100/api/v1/assistances/list

```json
{
    "filters": {
      "dateStart": "",
      "dateEnd": "",
      "userId": 123
    }
}
```


#### Obtener usuarios
http://localhost:8100/api/v1/assistances/users

```json
{}
```


#### Obtener reporte
http://localhost:8100/api/v1/assistances/report

```json
{}
```