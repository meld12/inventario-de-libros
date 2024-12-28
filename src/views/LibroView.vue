<template>
  <div class="about">
    
  </div>

  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          Detalle del libro
        </div>
        <div class="card-body">
              <div class="s-grid col-6 mx-auto mb-3">
                <router-link :to="{path:'/'}" class="btn btn-info">
                  <i class="fa-solid fa-arrow-left"></i> regresar a la lista
                </router-link>
               </div>

            <div class="s-grid col-6 mx-auto mb-3"></div>

            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-book"></i></span>
              <label for="title"></label>
              <span v-text="title" :class="'form-control'"></span>
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
              <label for="author"></label>
              <span v-text="author" :class="'form-control'"></span>
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-calendar"></i></span>
              <label for="publication_year"></label>
              <span v-text="publication_year" :class="'form-control'"></span>
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-tags"></i></span>
              <label for="genre"></label>
              <span v-text="genre" :class="'form-control'"></span>
            </div>

            <div class="s-grid col-6 mx-auto mb-3">
              <router-link :to="{path:'/editL/' + id}" class="btn btn-warning">
                <i class="fa-solid fa-edit"></i> Editar
              </router-link>
            </div>
       
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mostrarAlerta, enviarSolicitud } from "../funciones";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  data() {
    return {
      id: 0,
      title: "",
      author: "",
      publication_year: "",
      genre: "",
      url: "http://pruebat1.test/api/v1/libros",
      cargando: false,
    };
  },
  mounted() {
    const route = useRoute();
    this.id = route.params.id;
    this.url += "/" + this.id;
    this.getLibro();
  },
  methods: {
    getLibro() {
      axios.get(this.url).then((res) => {
        this.title = res.data.data.title;
        this.author = res.data.data.author;
        this.publication_year = String(res.data.data.publication_year);
        this.genre = res.data.data.genre;
      });
    },
  },
};
</script>
