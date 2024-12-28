<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <table class="table table-bordered table-success table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Titulo</th>
              <th>Autor</th>
              <th>Año de publicación</th>
              <th>Genero</th>
              <th>Registro</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="contenido">
            <tr v-if="cargando">
              <td colspan="7">
                <h3>Cargando...</h3>
              </td>
            </tr>
            <tr v-else v-for="(libr, i) in libros" :key="libr.id">
              <td v-text="(i+1)"></td>
                <td v-text="libr.id"></td>
                <td v-text="libr.title"></td>
                <td v-text="libr.author"></td>
                <td v-text="libr.publication_year"></td>
                <td v-text="libr.genre"></td>
                <td v-text="new Date(libr.created_at).toLocaleDateString('en-US')"></td>
                <td>
                  <router-link :to="{path:'viewL/'+libr.id}"class="btn btn-info">
                    <i class="fa-solid fa-eye"></i>
                  </router-link>
                  &nbsp;
                  <router-link :to="{path:'/editL/'+libr.id}"class="btn btn-warn">
                    <i class="fa-solid fa-edit"></i>
                  </router-link>
                  &nbsp;
                  <button class="btn btn-danger" v-on:click="$event => eliminar(libr.id,libr.title)">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                  &nbsp;
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {confirmar}from '../funciones'
export default {
  data() {
    return {
      libros: null,
      cargando: false,
    };
  },
  mounted() {
    this.getLibros();
  },
  methods: {
    getLibros() {
      this.cargando = true;
      axios.get('http://pruebat1.test/api/v1/libros').then((res) => {
        this.libros = res.data;
        this.cargando = false;
      });
    },

    eliminar(id, title) {
    confirmar(
    'http://pruebat1.test/api/v1/libros/',   // urlConSlash
    id,                                      // id
    'Eliminar registro',                     // titulo
    '¿Realmente desea eliminar el libro con el nombre ' + title + '?', // mensaje
    'warning'                                // icono
  );
  this.cargando = false;
}

  }
};
</script>
