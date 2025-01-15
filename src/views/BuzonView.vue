<script setup>
import CardBuzon from '../components/CardBuzon.vue'
</script>

<template>
  <div class="container">
    <div class="container section-title" data-aos="fade-up">
      <h2 class="text-center mt-3 mb-3">
        <span class="d-none d-lg-inline"
          ><i class="bi bi-envelope-paper-heart-fill"></i> Buzón de Cartas</span
        >
        <span class="d-lg-none"
          ><i class="bi bi-envelope-paper-heart-fill"></i> Buzón</span
        >
      </h2>
    </div>
    <section class="row justify-content-center">
      <CardBuzon />
    </section>
  </div>
</template>

<style scoped>
.container {
  background: #fffbf0;
}

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
</style>
