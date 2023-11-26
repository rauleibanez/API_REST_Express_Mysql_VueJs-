<template>
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <hr>
            <div class="container">                         
                <router-link :to="{path:'newcliente/'}" class="btn btn-success">
                    <i class="fa-solid fa-plus"></i><span> Nuevo Cliente</span>
                </router-link>
            </div>
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead><tr><th>#</th><th>NOMBRE</th><th>APELLIDO</th><th>DIRECCION</th><th>CORREO</th><th>TELEFONO</th></tr></thead>
                    <tbody class="table-group-divider" id="contenido">
                        <tr v-for="client, i in datosPaginados" :key="client.id_cliente">
                            <td>{{(i+1)}}</td>
                            <td>{{ client.nombre }}</td>
                            <td>{{ client.apellido }}</td>
                            <td>{{ client.direccion }}</td>
                            <td>{{ client.correo }}</td>
                            <td>{{ client.telefono }}</td>
                            <td>
                                <router-link :to="{path:'edicliente/'+client.id_cliente}" class="btn btn-warning">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>
                                <button class="btn btn-danger" v-on:click="eliminar(client.id_cliente,client.nombre)">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr>
            <div>
                <nav aria-label="navigation">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#" @click="paginaPrevia()">Anterior</a></li>
                        <li class="page-item" v-for="pagina in totalPaginas()" v-on:click="obtenerDatosPagina(pagina)" v-bind:class="esActivo(pagina)"><a class="page-link" href="#">{{ pagina }}</a></li>
                        <li class="page-item"><a class="page-link" href="#" @click="paginaSiguiente()">Siguiente</a></li>
                    </ul>
                </nav>
            </div>            
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import { confirmar } from '../funciones.js'

    export default {
        data(){
            return{clients:null, elementosPorPagina:5, numPagina:1, numeroDeItems:0, datosPaginados:[], paginaActual:1}
        },
        mounted(){
            this.obtenerClientes();            
        },
        methods:{
            /**
             * obtener datos de clientes
             */
            obtenerClientes(){
                axios.get('http://localhost:3000/clients/api').then(
                    response => {
                        this.clients = response.data;
                        this.numeroDeItems = this.clients.length;
                        this.obtenerDatosPagina(1);
                    }                    
                )                                
            },            
            eliminar(id, nombre){
                confirmar(id, nombre);
            },
            obtenerDatosPagina(numPagina){
                this.paginaActual=numPagina;
                this.datosPaginados=[];
                let paginas = this.totalPaginas();
                let ini = (numPagina * this.elementosPorPagina) - this.elementosPorPagina;
                let fin = (numPagina * this.elementosPorPagina);
                for ( let i = ini; i <= fin; i++ ){
                    if (this.clients[i] != null){
                        this.datosPaginados.push(this.clients[i]);
                    }                    
                } 
                //console.log(this.datosPaginados);
            },
            totalPaginas(){
                /** 
                 * Calculo del paginado
                 */
                return Math.ceil(this.numeroDeItems / this.elementosPorPagina);                
            },
            paginaPrevia(){
                if (this.paginaActual > 1){
                    this.paginaActual--;
                } else {
                    this.paginaActual = this.totalPaginas();
                }
                this.obtenerDatosPagina(this.paginaActual);
            },
            paginaSiguiente(){
                if (this.paginaActual < this.totalPaginas()){
                    this.paginaActual++;
                } else {
                    this.paginaActual = 1;
                }
                this.obtenerDatosPagina(this.paginaActual);
            },
            esActivo(numPagina){
                return numPagina == this.paginaActual ? 'active':'';
            }
        }        
    }
</script>