<script setup>
import { useSupabase } from '@/clients/supabase'
import { onMounted, ref, toRefs } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import Swal from 'sweetalert2'

const props = defineProps(['user'])
const { user } = toRefs(props)

const loading = ref(false)
const username = ref()
const surname = ref()
const decanato = ref()
const { supabase } = useSupabase()
const router = useRouter()

onMounted(() => {
  getProfile()
})

const getProfile = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase
      .from('profiles')
      .select(`username, surname, decanato`)
      .eq('id', user.value.id)
      .single()

    if (error) throw error

    if (data) {
      username.value = data.username
      surname.value = data.surname
      decanato.value = data.decanato
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false

    if (
      username.value == null ||
      surname.value == null ||
      decanato.value == null
    ) {
      Swal.fire({
        icon: 'info',
        title: 'Completa tu Perfil',
        text: 'Completa tu perfil para poder enviar cartas',
      })
    }
  }
}

async function updateProfile() {
  if (
    username.value == '' ||
    surname.value == '' ||
    username.value == null ||
    surname.value == null ||
    decanato.value == null
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes tener un Nombre, Apellido y Decanato',
    })
  } else {
    try {
      loading.value = true

      const updates = {
        id: user.value.id,
        username: username.value,
        surname: surname.value,
        decanato: decanato.value,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
      Swal.fire({
        title: '¡Actualización Exitosa!',
        text: 'Has actualizado los datos correctamente',
        icon: 'success',
      })
    }
  }
}

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
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-5 col-sm-12 mb-3 p-3">
      <div class="border-bottom border-primary">
        <h3><i class="bi bi-person-fill"></i> Mi Perfil</h3>
      </div>
      <form class="mt-3" @submit.prevent="updateProfile">
        <div class="form-group mb-3">
          <label for="correo">Correo</label>
          <input
            type="text"
            class="form-control"
            v-model="user.email"
            id="correo"
            disabled
          />
        </div>
        <div class="form-group mb-3">
          <label for="nombres">Nombres</label>
          <input
            type="text"
            class="form-control"
            id="nombres"
            placeholder="Nombre"
            v-model="username"
          />
        </div>
        <div class="form-group mb-3">
          <label for="apellidos">Apellidos</label>
          <input
            type="text"
            class="form-control"
            id="apellidos"
            placeholder="Apellidos"
            v-model="surname"
          />
        </div>
        <div class="form-group mb-3">
          <label for="decanato">Decanato</label>
          <select
            class="form-select"
            name="decanato"
            id="decanato"
            v-model="decanato"
          >
            <option value="DCYT">DCyT</option>
            <option value="DIC">DIC</option>
            <option value="DAG">DAG</option>
            <option value="DCV">DCV</option>
            <option value="DCEE">DCEE</option>
            <option value="DEHA">DEHA</option>
            <option value="DCS">DCS</option>
          </select>
        </div>
        <div class="form-buttons d-grid gap-2">
          <button
            class="btn btn-primary"
            type="submit"
            :disabled="loading"
            @click="updateProfile"
          >
            <i class="bi bi-person-check-fill"></i>
            {{ loading ? 'Cargando...' : 'Actualizar' }}
          </button>
          <button
            class="btn btn-secondary"
            @click="signOut"
            :disabled="loading"
          >
            <i class="bi bi-door-open"></i> Cerrar Sesión
          </button>
        </div>
      </form>
    </div>
    <div class="col-md-5 col-sm-12 mb-5">
      <h3>¿Tu perfil esta listo?</h3>

      <RouterLink to="/enviar" class="btn btn-primary"
        ><i class="bi bi-chat-heart"></i> ¡Enviar una carta!</RouterLink
      >
    </div>
  </div>
</template>
