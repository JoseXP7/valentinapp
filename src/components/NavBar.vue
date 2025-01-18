<script setup>
import { useSupabase } from '@/clients/supabase'
import { RouterLink, RouterView } from 'vue-router'
import { useUser } from '@/composables/useUser'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const { user } = useUser()
const { supabase } = useSupabase()
const loading = ref(false)
const router = useRouter()

async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push('/')
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

function collapse() {
  const navMobile = document.querySelector('.navbar-collapse')
  navMobile.classList.remove('show')
}
</script>

<template>
  <header class="header fixed-top">
    <nav class="navbar navbar-expand-lg navbar-light" id="neubar">
      <div class="container">
        <RouterLink to="/" class="navbar-brand">ValentinApp</RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="collapse navbar-collapse"
          id="navbarNavDropdown"
          @click="collapse"
        >
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <RouterLink
                to="/"
                class="nav-link mx-2 router-link"
                aria-current="page"
                >Inicio</RouterLink
              >
            </li>
            <li v-if="Object.keys(user).length" :user="user" class="nav-item">
              <RouterLink to="/enviar" class="nav-link router-link mx-2"
                >Enviar una carta</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink to="/buzon" class="nav-link router-link mx-2"
                >Buzón</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink to="/about" class="nav-link router-link mx-2"
                >Sobre Nosotros</RouterLink
              >
            </li>
            <li v-if="Object.keys(user).length" :user="user" class="test">
              <button
                class="btn btn-secondary"
                @click="signOut"
                :disabled="loading"
              >
                <i class="bi bi-door-open"></i> Cerrar Sesión
              </button>
            </li>
            <li v-else class="d-flex">
              <RouterLink
                to="/auth"
                exact-active-class="exact-active"
                class="btn btn-outline-primary mx-2"
                >Iniciar Sesion</RouterLink
              >
              <RouterLink
                to="authSignUp"
                exact-active-class="exact-active"
                class="btn btn-secondary mx-2"
                >Registrarme</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
#neubar {
  background: #ffffff;
  box-shadow: 4px 6px 12px rgba(0, 0, 0, 0.4);
}

.btn-outline-primary:hover {
  color: #fff;
}

.nav-item:hover {
  transition: 0.4s;
}

#neubar .nav-item {
  margin: auto 4px;
  border-radius: 20px;
}
#neubar .router-link {
  padding-left: 10px;
  padding-right: 10px;
}

#neubar .router-link:hover {
  color: #fe2752;
}

#neubar .active {
  color: #fe2752;
}

#neubar .dropdown-menu {
  background: #545454;
}

a.navbar-brand {
  color: #454545;
  font-weight: bold;
}
</style>
