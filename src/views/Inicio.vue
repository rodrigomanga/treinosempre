<template>
  <div class="inicio">
    <div>
        <b-carousel id="carousel1"
                    style="text-shadow: 1px 1px 2px #333;"
                    controls
                    indicators
                    :interval="99999999"
        >

          <b-carousel-slide caption="Treino Sempre"
                            text="seu treino sempre na mão."
                            :img-src="require('@/assets/frame4.jpg')"
          ></b-carousel-slide>

          <b-carousel-slide :img-src="require('@/assets/frame2.jpg')">
          Sem complicação
          </b-carousel-slide>

          <b-carousel-slide :img-src="require('@/assets/frame1.jpg')">
          Fica gravado no seu celular
          </b-carousel-slide>

          <b-carousel-slide :img-src="require('@/assets/frame3.jpg')">
          Comece a usar agora!
          </b-carousel-slide>
        </b-carousel>
    </div>
    <div class="text-center p-4">
      <b-button variant="warning" to="/treinos">Começar agora!</b-button>
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
