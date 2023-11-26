import swal from "sweetalert2";
import axios from "axios";

export function show_alerta(mensaje, icono, foco=""){
    if (foco !==''){
        document.getElementById(foco).focus();        
    }
    swal.fire({
        title:mensaje,
        icon:icono,
        customClass:{confirmButton:'btn btn-primary', popup:'animated zoomin'}, buttonsStyling:false
    });    
}

export function confirmar(id, nombre){
    let url="http://localhost:3000/clients/api/"+id;
    const swalWithBootstrapButtons = swal.mixin({
        customClass:{confirmButton:'btn btn-success me-3', cancelButton: 'btn btn-danger'}, buttonsStyling:false 
    });
    swalWithBootstrapButtons.fire({
        title:'Seguro quiere eliminar a ' + nombre + '?',
        text:'Se perderán datos del cliente!',
        icon:'question',
        showCancelButton: true,
        confirmButtonText:'<i class="fa-solid fa-check"></i> Si, Eliminar!',
        cancelButtonText:'<i class="fa-solid fa-ban"></i> No, Cancelar'}).then((result)=>{            
            if(result.isConfirmed){
                enviarSolicitud('DELETE',{id:id},url,'Cliente Eliminado!');
            }
            else{
                show_alerta('Operacion Cancelada!','info');
            }
        })
}

export function enviarSolicitud(metodo,parametros,url,mensaje){
    axios({method:metodo,url:url,data:parametros}).then(function(respuesta){          
        let estado = respuesta.status
        if ((estado === 200) || (estado === 201) || (estado === 204)) {
            show_alerta(mensaje,estado);
            window.setTimeout(function(){
                window.location.href='/';                
            },1000);
        }
        else{
            let listado='';
            let errores=respuesta.data[1]['errors'];
            Object.keys(errores).forEach(
                key => listado += errores[key][0]+'.'
            );
            show_alerta(listado, 'error');
        }
        /*console.log(estado)*/
    }).catch(function(error){
        show_alerta('Error en la solicitud', 'error');        
    });
    
}