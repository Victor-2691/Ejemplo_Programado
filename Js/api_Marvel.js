var prueba = "prueba";

function cargarpersonajes() {
    const url = `https://gateway.marvel.com:443/v1/public/characters?limit=10&ts=1&apikey=8df4e5da771d77ed56064114bd28b48d&hash=1df85bf356d0719e2564833a8f08a0fe`
    const container = document.querySelector('#contenedor');
    let contenidoHTML = '';
    let idimagen = 0;
    fetch(url)
        .then(res => res.json())
        .then((json) => {
            for (const hero of json.data.results) {
                idimagen++;
                let name = hero.name;
                let descripcion = hero.description;
                let srcimg = hero.thumbnail.path + "." + hero.thumbnail.extension;
                let urlinfo = hero.urls[0].url;
                contenidoHTML += `
                <div class="container__tarjetahero" id="${idimagen}">
            <h2 class="tarjetahero_name"> ${name}</h2>
           
           <img src="${srcimg}" alt="${name}" class="tarjetahero__img">
        
            <p class="tarjetahero__descripcion">${descripcion}</p>
            <a href="${urlinfo}" target="_blank">
            <h3 class="tarjetahero__img">Más información</h3></a>
            <button type="button" class="tarjetahero__seleccionar" data-toggle="modal" data-target="#exampleModal">Seleccionar</button>

         </div>`;
            }
            container.innerHTML = contenidoHTML;
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,

            })
        })
}

cargarpersonajes();

function buscarpersonajes(nombre) {
    const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${nombre}&limit=10&ts=1&apikey=8df4e5da771d77ed56064114bd28b48d&hash=1df85bf356d0719e2564833a8f08a0fe`
    const container = document.querySelector('#contenedor');
    let contenidoHTML = '';
    let idimagen = 0;
    fetch(url)
        .then(res => res.json())
        .then((json) => {
            const hero1 = json.data.results
            if (hero1.length == 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Oops...',
                    text: "No hay resultados para los parametros de busqueda, por favor intente cambiarlos",
                })
                return;
            }

            for (const hero of json.data.results) {
                idimagen++;
                let name = hero.name;
                let descripcion = hero.description;
                let srcimg = hero.thumbnail.path + "." + hero.thumbnail.extension;
                let urlinfo = hero.urls[0].url;
                contenidoHTML += `
                <div class="container__tarjetahero" id="${idimagen}">
            <h2 class="tarjetahero_name"> ${name}</h2>
           
           <img src="${srcimg}" alt="${name}" class="tarjetahero__img">
        
            <p class="tarjetahero__descripcion">${descripcion}</p>
            <a href="${urlinfo}" target="_blank">
            <h3 class="tarjetahero__img">Más información</h3></a>
            <button type="button" class="tarjetahero__seleccionar" data-toggle="modal" data-target="#exampleModal">Seleccionar</button>

         </div>`;
            }
            container.innerHTML = contenidoHTML;
        })


        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,

            })
        })


}

function BtnBuscarPersonaje(){
        let nombre = document.getElementById("nombre").value;
        if (nombre === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: "Debe ingresar un parametro para la busqueda",
            })
            return;
        }
    
        buscarpersonajes(nombre);
    
 
}

//Selecciono todo el contenedor
const ListaPersonajes = document.querySelector('.container');


//Agrego el evento Listener  a todo el contenedor y luego valido que solo funcione haciendo 
//click en el boton, indentificado por medio de la clase 
ListaPersonajes.addEventListener('click', e => {
     const hero = e.target.parentElement;
       let nombre = (hero.querySelector('h2').textContent);
       let urlImg = (hero.querySelector('img').getAttribute("src"));
       console.log(urlImg);
       let urlrecortado = urlImg.substring(7,urlImg.length);
       console.log(urlrecortado);
    if (e.target.classList.contains('tarjetahero__seleccionar')) {
        Swal.fire({
            title: "Confirmar",
            text: `Estas seguro que deseas seleccionar este personaje: ${nombre}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar !'
        }).then((result) => {
            if (result.isConfirmed) {
             
                window.location = `formulario.html?nombr=${nombre}&urlimg=${urlrecortado}`;
            }
        })
    }
});





