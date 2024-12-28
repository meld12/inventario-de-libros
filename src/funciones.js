import Swal from "sweetalert2";
import axios from "axios";

export function mostrarAlerta(titulo, icono, foco = '') {
    if (foco != '') {
        document.getElementById(foco).focus();
    }
    Swal.fire({
        title: titulo, 
        icon: icono,
        customClass: { confirmButton: 'btn btn-primary', popup: 'animated zoomIn' },
        buttonsStyling: false
    });
}

export function confirmar(urlConSlash, id, titulo, mensaje, icono) {
    var url = urlConSlash + id;
    const swalWithBootstrapButton = Swal.mixin({
        customClass: { confirmButton: 'btn btn-success me-3', cancelButton: 'btn btn-danger' }
    });

    // Muestra el cuadro de confirmación
    swalWithBootstrapButton.fire({
        title: titulo, 
        text: mensaje,
        icon: icono, // Aquí se usa el icono que se pasa como argumento
        showCancelButton: true, // Muestra el botón de cancelar
        confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar', 
        cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'
    }).then((res) => {
        // Si el usuario confirma (hace clic en "Sí")
        if (res.isConfirmed) {
            // Llamamos a la función para eliminar el registro
            enviarSolicitud('DELETE', { id: id }, url, 'Eliminado con éxito');
        } else {
            // Si el usuario cancela (hace clic en "Cancelar")
            mostrarAlerta('Operación cancelada', 'info');
        }

        // Esta parte ahora está dentro del `then()`
        Swal.fire({
            title: titulo, 
            icon: icono, // Aquí también se usa el icono
            customClass: { confirmButton: 'btn btn-primary', popup: 'animated zoomIn' },
            buttonsStyling: false
        });
    });
}


export function enviarSolicitud(metodo, parametros, url, mensaje) {
    axios({ method: metodo, url: url, data: parametros }).then(function (res) {
        console.log(res);  // Agrega esto para verificar la respuesta completa
        var estado = res.status;
        if (estado === 200 || estado === 201) {
            mostrarAlerta(mensaje, 'success');
            window.setTimeout(function() { 
                window.location.href = '/';
            }, 1000);
        } else {
            mostrarAlerta('No se pudo recuperar la respuesta', 'error');
        }
    }).catch(function(error) {
        mostrarAlerta('Servidor no disponible', 'error');
    });
}
