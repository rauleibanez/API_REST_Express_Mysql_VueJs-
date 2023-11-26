<template>
    <div class="navigation">
        <nav class="navbar navbar-expand-lg bg-success" data-bs-theme="dark">
        <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <!--a class="nav-link active" aria-current="page" href="#">Home</a-->
          <router-link to="/" class="nav-link active">Inicio</router-link>
          <router-link to="/clientes" class="nav-link active">Clientes</router-link>
          <router-link to="/about" class="nav-link active">Acerca de...</router-link>        
        </div>
        <!--div>
          <form class="d-flex my-2 my-lg-0 ms-auto p-2 bd-highlight" role="search" @submit.prevent="submitForm" v-if="$route.path === '/'">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="searchText">
          <button class="btn btn-outline-success" type="submit" @click="getSearch">Search</button>
        </form>
        </div-->
        </div>
    </div>
  </nav>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const searchText = ref('')
const emitSearch = defineEmits(['getSearchText'])

const getSearch = () => {
  emitSearch('getSearchText', searchText.value)
}
</script>

<style lang="scss" scoped>

</style>     