<template>
  <div class="about">
    
  </div>

  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          Actualizar libro
        </div>
        <div class="card-body">
          <form @submit.prevent="actualizar">
            <div class="s-grid col-6 mx-auto mb-3"></div>

            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-book"></i></span>
              <input
                type="text"
                v-model="title"
                id="title"
                placeholder="Nombre del libro"
                required
                maxlength="50"
                class="form-control"
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
              <input
                type="text"
                v-model="author"
                id="author"
                placeholder="Autor del libro"
                required
                maxlength="50"
                class="form-control"
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-calendar"></i></span>
              <input
                type="text"
                v-model="publication_year"
                id="publication_year"
                placeholder="Año de publicación"
                required
                maxlength="4"
                class="form-control"
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-tags"></i></span>
              <input
                type="text"
                v-model="genre"
                id="genre"
                placeholder="Género del libro"
                required
                maxlength="50"
                class="form-control"
              />
            </div>

            <div class="s-grid col-6 mx-auto mb-3">
              <button class="btn btn-success" type="submit">
                <i class="fa-solid fa-floppy-disk"></i> Actualizar
              </button>
            </div>
          </form>
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
        this.publication_year =String( res.data.data.publication_year);
        this.genre = res.data.data.genre;
      });
    },
    actualizar() {
      if (this.title.trim() === "") {
        mostrarAlerta("Ingrese el título", "warning", "titulo");
        return;
      }
      if (this.author.trim() === "") {
        mostrarAlerta("Ingrese el autor", "warning", "autor");
        return;
      }
      if (String(this.publication_year.trim()) === "") {
        mostrarAlerta("Ingrese el año", "warning", "año");
        return;
      }
      if (this.genre.trim() === "") {
        mostrarAlerta("Ingrese el género", "warning", "genero");
        return;
      } else {
        const parametros = {
          title: this.title.trim(),
          author: this.author.trim(),
          publication_year: this.publication_year.trim(),
          genre: this.genre.trim(),
        };
        enviarSolicitud("PUT", parametros, this.url, "Libro actualizado");
      }
    },
  },
};
</script>
