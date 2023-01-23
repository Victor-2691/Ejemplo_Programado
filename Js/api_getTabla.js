const url = "https://apisprogravfinal.somee.com/api/Estudiantes";
fetch(url)
    .then(response => response.json())
    .then(data => mostrarData(data))
    .catch(function (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
        })
    })




function mostrarData(data) {

    let body = ''

    for (let i = 0; i < data.length; i++) {
        console.log(data[i].Id);
        body +=
            `<tr>
    <td>${data[i].Id}</td>
    <td>${data[i].Nombre}</td>
    <td>${data[i].PrimerApellido}</td>
    <td>${data[i].SegundoApellido}</td>
    <td>${data[i].NombreHeroe}</td>
    <td> <img class="img__table" src="${data[i].Urlimg}"></td>
    </tr>`
    }
    document.getElementById('tabladatos').innerHTML = body;
}