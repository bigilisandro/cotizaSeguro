// Constructor para Seguro

class Seguro{
    constructor(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;

}
cotizarSeguro() {
    
    let cantidad;
    const base = 2000;

    switch(this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
    }

    // Leer el año
    const diferencia = new Date().getFullYear() - this.anio;
    // cada año de diferencia reduce un 3% el valor del auto
    cantidad -= ((diferencia * 3) * cantidad) / 100;
    // si el seguro es basico * 30%, completo * 50%
    if(this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }

    return cantidad;
}
}

// Todo lo que se muestra

class Interfaz{
    mostrarMensaje(mensaje, tipo) {
        const div = document.createElement('div');
        if(tipo === 'error') {
            div.classList.add('mensaje', 'error');
        } else {
            div.classList.add('mensaje', 'correcto');
        }
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('.form-group'));
        setTimeout(function() {
            document.querySelector('.mensaje').remove();
        }, 3000);
    }
    mostrarResultado(seguro, total) {
    
        const resultado = document.getElementById('resultado');
        let marca;
        switch(seguro.marca) {
            case '1':
                marca = 'Americano';
                break;
            case '2':
                marca = 'Asiatico';
                break;
            case '3':
                marca = 'Europeo';
                break;
        }
        // crear un Div
        const div = document.createElement('div');
        // insertar la información
        div.innerHTML = `
            <p class="header">Tu solicitud:</p>
                <p> Marca: ${marca}</p>
                <p> Año: ${seguro.anio}</p>
                <p> Tipo de seguro: ${seguro.tipo}</p>
                <p> Total: ${total}</p>
        `;
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(function() {
            spinner.style.display = 'none';
            resultado.appendChild(div);
        }, 3000);
        
    }
}



// Event Listener

const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    // leer la marca seleccionada
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    // leer el año seleccionado
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    // lee el valor del radio button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    // crear instancia de interfaz
    const interfaz = new Interfaz();

    // revisar que los campos no estén vacios
    if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '' ) {
        // Interfaz imprimiendo un error
        interfaz.mostrarMensaje('Faltan datos, revisar el formulario nuevamente', 'error')
    } else {

        // limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if(resultados != null) {
            resultados.remove()
        }
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        // cotizar el seguro
        const cantidad = seguro.cotizarSeguro(seguro);
        // muestra el resultado
        interfaz.mostrarResultado(seguro, cantidad)
        interfaz.mostrarMensaje('Cotizando...', 'Exito')
        
    }
})



const max = new Date().getFullYear(),
      min = max - 20;

const selectAnios = document.getElementById('anio');
for(let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}