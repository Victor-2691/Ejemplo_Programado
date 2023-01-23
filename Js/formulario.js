// import {prueba} from "./api_Marvel.js"
// console.log(prueba);

//Creamos una instancia de la URL
const paramURL = window.location.search;

//Instancia de la URL SearchaParamas
const parametrosUrl = new URLSearchParams(paramURL);

//Recorriendo todos los parametros de la URL
// for(let valoresURL of parametrosUrl){

// }

const nombreheroe = parametrosUrl.get('nombr');
const urlimg = "http://" + parametrosUrl.get('urlimg');
const urlApi = "https://apisprogravfinal.somee.com/api/Estudiantes"
// const urlApi = "http://localhost:62093/api/Estudiantes"

document.querySelector(".nombre__heroe").textContent = nombreheroe;
document.querySelector(".img__heroe").src = `${urlimg}`;

var formulario = document.querySelector(".formulario");
formulario, addEventListener('submit', function (e) {
    e.preventDefault();
    //vamos a obtener los campos del formulario es un arreglo 
    var datos = new FormData(formulario);
    const nombre = datos.get('nombre');
    const primerApellido = datos.get('primerApellido');
    const SegundoApellido = datos.get('segundoapellido');
    const id = datos.get('id');
    let datosestudiantes = {
        Id: id,
        Nombre: nombre,
        PrimerApellido: primerApellido,
        SegundoApellido: SegundoApellido,
        NombreHeroe: nombreheroe,
        Urlimg: urlimg
    };


    fetch(urlApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': '*/*',
        },
        body: JSON.stringify(datosestudiantes)
    })
        .then(function (response) {
            if (response.status == 201) {
                Swal.fire(
                    'Exito!',
                    'Tu super héroe se registro de forma exitosa!',
                    'success'
                )
                return;
            }
            if (response.status == 409) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La identificación que intenta registrar ya existe ',

                })
                return;
            }
        })
        .catch(function (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: e,

            })
        })
})




