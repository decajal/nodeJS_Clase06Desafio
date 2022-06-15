const fs = require('fs');

class Contenedor
{
    constructor(nombre)
    {
        this.nombre = nombre;
    }

    async save(objeto)
    { 
        try
        {
            const data = await this.getAll();
            let idMax = 0;
            data.forEach(element => {
                if (element.id > idMax)
                    idMax = element.id;
            });
            idMax++;
            const newObject = { title: objeto.title, price: objeto.price, thumbnail: objeto.thumbnail, id: idMax }
            data.push(newObject);
            await fs.promises.writeFile(this.nombre, JSON.stringify(data));

            return idMax;
        }
        catch (error)
        {
            return error;
        }
    }
    async getById(id)
    {
        try
        {
            const data = await this.getAll();
            const result = data.find(x => x.id === id);

            return result ?? null;
        }
        catch (error)
        {
            return error;
        }
    }
    async getAll()
    {
        try
        {
            const result = await fs.promises.readFile(this.nombre);
            const data = await JSON.parse(result);
            
            return data;
        }
        catch (error)
        {
            return error
        }
    }
    async deleteById(id)
    {
        try
        {
            if (isNaN(id)) throw "El id ingresado es inválido";

            const data = await this.getAll();
            const reg = data.find(x => x.id === id);
            if (reg)
            {
                const newData = data.filter(x => x.id !== id);
                // guardar el archivo
                await fs.promises.writeFile(this.nombre, JSON.stringify(newData));
                
                return 'Registro Eliminado !!';
            }
            else
                throw 'No existe un registro con el id ingresado';
        }
        catch (error)
        {
            return error
        }
    }
    async delelteAll()
    {
        try
        {
            await fs.promises.writeFile(this.nombre, "");
        }
        catch (error)
        {
            return error;
        }
    }
}

module.exports = {Contenedor}