<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          agregar libro
        </div>
        <div class="card-body">
          <form @submit.prevent="guardar">
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

            <!-- Año de publicación -->
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

            <!-- Género del libro -->
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
                <i class="fa-solid fa-floppy-disk"></i> Guardar
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

export default {
  data() {
    return {
      title: "",
      author: "",
      publication_year: "",
      genre: "",
      url: "http://pruebat1.test/api/v1/libros",
      cargando: false,
    };
  },
  methods: {
    guardar() {
      if (this.title.trim() === "") {
        mostrarAlerta("Ingrese el título", "warning", "titulo");
        return;
      }
      if (this.author.trim() === "") {
        mostrarAlerta("Ingrese el autor", "warning", "autor");
        return;
      }
      if (this.publication_year.trim() === "") {
        mostrarAlerta("Ingrese el año", "warning", "año");
        return;
      }
      if (this.genre.trim() === "") {
        mostrarAlerta("Ingrese el género", "warning", "genero");
        return;
      }else{
        var parametros={title:this.title.trim(),author:this.author.trim(),publication_year:this.publication_year.trim(),genre:this.genre.trim()}
        enviarSolicitud('POST',parametros,this.url,'Libro agregado')
      }

     

      // Aquí podrías realizar la llamada al servidor
    
     
    },
  },
};
</script>
