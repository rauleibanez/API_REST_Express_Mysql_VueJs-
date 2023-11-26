<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">Nuevo Cliente</div>
                <div class="card-body">
                    <form v-on:submit="guardar">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-gift"></i></span>
                            <input type="text" v-model="nombre" id="nombre" class="form-control" maxlength="50" placeholder="Nombre" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-address-book"></i></span>
                            <input type="text" v-model="apellido" id="apellido" class="form-control" maxlength="150" placeholder="Apellido" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-map-marker"></i></span>
                            <input type="text" v-model="direccion" id="direccion" class="form-control" maxlength="50" placeholder="Direccion" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
                            <input type="text" v-model="correo" id="correo" class="form-control" maxlength="50" placeholder="Correo" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-phone"></i></span>
                            <input type="text" v-model="telefono" id="telefono" class="form-control" maxlength="50" placeholder="Telefono" required>
                        </div>
                        <div class="d-grid col-6 mx-auto">
                            <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { show_alerta,enviarSolicitud } from '@/funciones';

export default {
    data(){
        return{
            nombre:'', apellido:'', direccion:'', correo:'', telefono:'',url:'http://localhost:3000/clients/api'
        }
    },
    methods:{
        guardar(){
            event.preventDefault();
            if (this.nombre.trim()===''){
                show_alerta('Escriba un Nombre válido',warning, nombre);
            }
            else if (this.apellido.trim()===''){
                show_alerta('Escriba un Apellido válido',warning, apellido);
            } 
            else if (this.direccion.trim()===''){
                show_alerta('Escriba una Direccion válida',warning, direccion);
            }
            else if (this.correo.trim()===''){
                show_alerta('Escriba un Correo válido',warning, correo);
            }
            else if (this.telefono.trim()===''){
                show_alerta('Escriba un Telefono válido',warning, telefono);
            }
            else {
                let parametros={nombre:this.nombre.trim(), apellido:this.apellido.trim(), direccion:this.direccion.trim(), correo:this.correo.trim(), telefono:this.telefono.trim()}
                enviarSolicitud('POST',parametros,this.url,'Cliente Guardado');
            }
        }
    }
}
</script>