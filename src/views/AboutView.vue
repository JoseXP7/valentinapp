<template>
  <section class="container">
    <div class="row">
      <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
        <div class="section-title">
          <h2>¿Quiénes somos?</h2>
          <p>
            Somos un grupo de estudiantes de la Universidad Centroccidental
            Lisandro Alvarado que, con el objetivo de fomentar el amor y la
            amistad en años anteriores, hemos creado esta aplicación web en su
            versión 3.0.
          </p>
        </div>
      </div>
      <div class="col-lg-6">
        <div
          class="row justify-content-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div class="col-4 d-flex justify-content-center align-items-center">
            <div class="box rounded-4 bg-primary">
              <i class="bi bi-heart"></i>
            </div>
          </div>
          <div class="col-8 d-flex justify-content-center align-items-center">
            <div class="box-text">
              <p class="m-0">
                Expresa tu cariño y gratitud a tus amigos más cercanos. ¡Una
                carta puede ser el mejor regalo!
              </p>
            </div>
          </div>
        </div>
        <div
          class="row justify-content-center mt-5"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div class="col-4 d-flex justify-content-center align-items-center">
            <div class="box rounded-4 bg-primary">
              <i class="bi bi-envelope-heart"></i>
            </div>
          </div>
          <div class="col-8 d-flex justify-content-center align-items-center">
            <div class="box-text">
              <p class="m-0">
                ¿Tienes algo que decirle a esa persona especial? Utiliza nuestra
                plataforma para enviar cartas (incluso anónimas) y hacer oír tu
                voz.
              </p>
            </div>
          </div>
        </div>
        <div
          class="row justify-content-center mt-5"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div class="col-4 d-flex justify-content-center align-items-center">
            <div class="box rounded-4 bg-primary">
              <i class="bi bi-incognito"></i>
            </div>
          </div>
          <div class="col-8 d-flex justify-content-center align-items-center">
            <div class="box-text">
              <p class="m-0">
                ¿Esa persona especial en clase te roba el aliento? ¡Atrévete a
                escribirle una carta anónima! Expresa tus sentimientos sin
                revelar tu identidad y deja que la magia de las palabras haga el
                resto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  padding-top: 60px;
}
.section-title {
  text-align: center;
  padding-top: 60px;
}

.box {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box i {
  font-size: 3rem;
  color: #fff;
}
</style>
