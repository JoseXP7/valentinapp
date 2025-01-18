<template>
  <section id="about" class="about section py-5">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Version 3.0</h2>
      <p>Lo más nuevo para ti</p>
    </div>
    <!-- End Section Title -->

    <div class="container">
      <div class="row gy-5">
        <div
          class="content col-xl-5 d-flex flex-column"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h3>ValentinApp: ¡Encuentra el amor en un clic! ✨</h3>
          <p>
            ¡Descubre el amor y la amistad en el campus! ❤️‍ ¿Te gustaría saber
            si esa persona especial siente lo mismo por ti? Con ValentinApp,
            puedes enviar cartas anónimas y descubrir si hay una conexión. ¡Crea
            tu perfil, envia una carta y mira el buzón público!
          </p>
          <div>
            <RouterLink to="/about" class="btn btn-outline-primary btn-about"
              ><i class="bi bi-caret-right-fill"></i> Sobre Nosotros</RouterLink
            >
          </div>
        </div>

        <div class="col-xl-7" data-aos="fade-up" data-aos-delay="200">
          <div class="row gy-4">
            <div class="col-md-6 icon-box position-relative">
              <i class="bi bi-incognito"></i>
              <h4>
                <span class="stretched-link">Anónima</span>
              </h4>
              <p>Incorporado un modo incognito funcional</p>
            </div>
            <!-- Icon-Box -->

            <div class="col-md-6 icon-box position-relative">
              <i class="bi bi-speedometer2"></i>
              <h4>
                <span class="stretched-link">Velocidad Mejorada</span>
              </h4>
              <p>
                Usando El Framework de JavaScript VueJS para cargar la app mucho
                más rapido
              </p>
            </div>
            <!-- Icon-Box -->

            <div class="col-md-6 icon-box position-relative">
              <i class="bi bi-mailbox-flag"></i>
              <h4><span class="stretched-link">Buzón Público</span></h4>
              <p>
                Incorporado el buzón público donde se alojarán todas las cartas
              </p>
            </div>
            <!-- Icon-Box -->

            <div class="col-md-6 icon-box position-relative">
              <i class="bi bi-person-lock"></i>
              <h4><span class="stretched-link">Autenticación</span></h4>
              <p>
                Modulos de autenticación para llevar un control de los usuarios
              </p>
            </div>
            <!-- Icon-Box -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-title {
  text-align: center;
  padding-bottom: 60px;
  position: relative;
}

.section-title h2 {
  font-size: 32px;
  font-weight: 700;
  position: relative;
}

.section-title h2:before,
.section-title h2:after {
  content: '';
  width: 50px;
  height: 2px;
  background: var(--bs-primary);
  display: inline-block;
}

.section-title h2:before {
  margin: 0 15px 10px 0;
}

.section-title h2:after {
  margin: 0 0 10px 15px;
}

.section-title p {
  margin-bottom: 0;
}

/*---------*/
.about {
  background: #fffbf0;
}

.about .content h3 {
  font-weight: 700;
  font-size: 34px;
  margin-bottom: 30px;
}

.about .content p {
  margin-bottom: 30px;
}

.about .btn-about:hover {
  color: #fff;
}

.about .btn-about:focus {
  color: #fff;
}

.about .icon-box i {
  font-size: 40px;
  color: var(--bs-primary);
  margin-bottom: 10px;
}

.about .icon-box h4 {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 10px 0;
}

.about .icon-box h4 span {
  color: #262626;
  transition: 0.3s;
}

.about .icon-box p {
  font-size: 15px;
  color: color-mix(in srgb, #000, transparent 40%);
  margin-bottom: 0;
}

.about .icon-box:hover h4 span {
  color: var(--bs-primary);
}

.about .icon-box .stretched-link {
  text-decoration: none;
}
</style>
