<template>
  <div class="inicio">
    <div>
      <div class="bd-example">
        <div
          id="carouselExampleCaptions"
          class="carousel slide"
          data-ride="carousel"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#carouselExampleCaptions"
              data-slide-to="0"
              class="active"
            ></li>
            <li
              data-target="#carouselExampleCaptions"
              data-slide-to="1"
            ></li>
            <li
              data-target="#carouselExampleCaptions"
              data-slide-to="2"
            ></li>
            <li
              data-target="#carouselExampleCaptions"
              data-slide-to="3"
            ></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src="@/assets/frame4.jpg"
                class="d-block w-100"
              >
              <div class="carousel-caption d-none d-md-block">
                <h5>Treino Sempre</h5>
                <p>seu treino sempre na mão.</p>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="@/assets/frame2.jpg"
                class="d-block w-100"
              >
              <div class="carousel-caption d-none d-md-block">
                <h5>Sem complicação</h5>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="@/assets/frame1.jpg"
                class="d-block w-100"
              >
              <div class="carousel-caption d-none d-md-block">
                <h5>Fica gravado no seu celular</h5>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="@/assets/frame3.jpg"
                class="d-block w-100"
              >
              <div class="carousel-caption d-none d-md-block">
                <h5>Comece a usar agora!</h5>
              </div>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="prev"
          >
            <span
              class="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="next"
          >
            <span
              class="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
    <div class="text-center p-4">
      <button
        type="button"
        class="btn btn-warning"
      >Começar agora!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inicio'
}
</script>

<style scope>
</style>
