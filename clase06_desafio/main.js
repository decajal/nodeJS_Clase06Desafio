/*
    Diego Cajal - Personal de Teco
    decajalperez@teco.com.ar
    Desafío clase 06 - nodeJS

    << Servidor con express >>

    Consigna:
    1. Realizar un proyecto de servidor basado en nodeJS que utilice el módulo express e implemente
        los siguientes endpoints en el puerto: 8080
        a) Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor.
        b) Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos
            disponibles.
    2. Incluir un archivo de texto 'producto.txt' y utilizar la clase contenedor del desafío anterior
        para acceder a los datos persistidos del servidor.
*/
const express = require('express');
const app = express();
const port = 8080;

const { Contenedor } = require('./Contenedor.js');
const contenedor = new Contenedor('./src/productos.txt');


app.get('/productos', (req, res) =>
{
    contenedor.getAll()
        .then(data =>
            {
                let html = `<h1>Listado de productos</h1>`;
                html += `<div><table>`;
                html +=
                `
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Thumbnail</th>
                    </tr>
                </thead>
                `;
                // listar todos los productos
                data.forEach(element =>
                {
                    html +=
                    `<tr>
                        <td>${element.id}</td>
                        <td>${element.title}</td>
                        <td>${element.price}</td>
                        <td>${element.thumbnail}</td>
                    </tr>`;
                });
                html += `</table></div>`;
                res.send(html);
            })
        .catch(error =>
            {
                send(`<p>Ah ocurrido un error en el servidor: ${error}</p>`);
            });   
})

app.get('/productoRandom', (req, res) =>
{
    contenedor.getAll()
        .then(data =>
            {
                const item = data[Math.floor(Math.random()*data.length)];
                let html = `<h1>Mostrando producto Random</h1>`
                html += `<p>Id: ${item.id}</p>`;
                html += `<p>Title: ${item.title}</p>`;
                html += `<p>Price: ${item.price}</p>`;
                html += `<p>Thumbnail: ${item.thumbnail}</p>`;
                
                res.send(html);
            })
        .catch(error =>
            {
                send(`<p>Ah ocurrido un error en el servidor: ${error}</p>`);
            });
    
    
})

const server = app.listen(port, () =>
                    {
                        console.log(`Servidor escuchando en el puerto ${server.address().port}`);
                    });
server.on('error', error => console.log(`Error en el servidor ${error}`));

