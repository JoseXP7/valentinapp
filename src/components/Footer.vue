<script setup>
import { ref } from 'vue'

let year = new Date().getFullYear()
let copyright = ref(0)

copyright = year
</script>

<template>
  <footer id="footer" class="footer dark-background">
    <div class="container">
      <h3 class="sitename">ValentinApp</h3>
      <p>"Cartas para todos"</p>
      <div class="social-links d-flex justify-content-center">
        <a href="https://x.com/codefrontend87"
          ><i class="bi bi-twitter-x"></i
        ></a>
        <a href="https://www.facebook.com/josemanuel.graterolrodriguez"
          ><i class="bi bi-facebook"></i
        ></a>
        <a href="https://www.instagram.com/josephcode_87"
          ><i class="bi bi-instagram"></i
        ></a>
        <a
          href="https://www.linkedin.com/in/jos%C3%A9-manuel-graterol-rodriguez-856788249/"
          ><i class="bi bi-linkedin"></i
        ></a>
        <a href="https://github.com/JoseXP7"><i class="bi bi-github"></i></a>
      </div>
      <div class="container">
        <div class="copyright">
          <span>&#169; Copyright {{ copyright }}</span>
          <strong class="px-1 sitename">ValentinApp</strong>
          <span>Todos los derechos reservados</span>
        </div>
        <div class="credits">
          Hecho por <a href="https://github.com/JoseXP7">José Graterol</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  color: #fff;
  background-color: var(--bs-secondary);
  font-size: 14px;
  text-align: center;
  padding: 30px 0;
  position: relative;
}

.footer h3 {
  font-size: 36px;
  font-weight: 700;
  position: relative;
  padding: 0;
  margin: 0 0 15px 0;
}

.footer p {
  font-size: 15;
  font-style: italic;
  padding: 0;
  margin: 0 0 30px 0;
}

.footer .social-links {
  margin: 0 0 30px 0;
}

.footer .social-links a {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bs-primary);
  color: #fff;
  line-height: 1;
  margin: 0 4px;
  border-radius: 50%;
  text-align: center;
  width: 36px;
  height: 36px;
  transition: 0.3s;
}

.footer .social-links a:hover {
  background: color-mix(in srgb, var(--bs-primary), transparent 20%);
  text-decoration: none;
}

.footer .copyright {
  padding-top: 25px;
  border-top: 1px solid color-mix(in srgb, #fff, transparent 90%);
}

.footer .credits {
  font-size: 13px;
  padding-top: 5px;
}

.footer .credits a {
  font-size: 13px;
  padding-top: 5px;
  text-decoration: none;
  transition: 0.3s;
}
</style>
