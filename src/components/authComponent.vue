<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { ref } from 'vue'
import Swal from 'sweetalert2'

const loading = ref(false)
const email = ref('')
const password = ref('')
const { loginWithPassw } = useAuth()

const handleLogin = async () => {
  try {
    loading.value = true
    await login({ email: email.value, password: password.value })
  } catch (error) {
    Swal.fire({
      title: 'Oops...',
      text: error.message,
      icon: 'error',
    })
  } finally {
    loading.value = 'false'
  }
}

async function login() {
  try {
    loading.value = true
    await loginWithPassw({
      email: email.value,
      password: password.value,
    })
    Swal.fire({
      title: '¡Inicio Exitoso!',
      text: 'Has iniciado sesión correctamente',
      icon: 'success',
    })
  } catch (error) {
    Swal.fire({
      title: 'Oops...',
      text: error.message,
      icon: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="sidenav">
    <div class="login-main-text">
      <h2>
        ValentinApp<br />
        Iniciar Sesión
      </h2>
      <p>Logueate en la app para escribir una carta.</p>
    </div>
  </div>
  <div class="main">
    <div class="col-md-6 col-sm-12">
      <div class="login-form mb-4">
        <p>
          No tienes una cuenta?
          <RouterLink to="/authSignUp" class="link-primary"
            >Registrate</RouterLink
          >, <br />
          lleva menos de un minuto
        </p>
        <form @submit.prevent="handleLogin()">
          <div class="form-group">
            <label for="email">Correo</label>
            <input
              type="text"
              class="form-control"
              id="email"
              placeholder="Correo"
              v-model="email"
              required
            />
          </div>
          <div class="form-group mb-3">
            <label for="password">Contraseña</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Contraseña"
              v-model="password"
              required
            />
          </div>
          <div class="form-buttons d-grid gap-2">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="loading"
              @click="login"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-head {
  height: 150px;
  background: #fff;
}

.sidenav {
  height: 100%;
  background-color: #fe2752;
  overflow-x: hidden;
  padding-top: 20px;
}

.main {
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
}

@media screen and (max-width: 450px) {
  .login-form {
    margin-top: 10%;
  }

  .register-form {
    margin-top: 10%;
  }
}

@media screen and (min-width: 768px) {
  .main {
    margin-left: 40%;
  }

  .sidenav {
    width: 40%;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
  }

  .login-form {
    margin-top: 80%;
  }

  .register-form {
    margin-top: 20%;
  }
}

.login-main-text {
  margin-top: 20%;
  padding: 60px;
  color: #fff;
}

.login-main-text h2 {
  font-weight: 300;
}
</style>
