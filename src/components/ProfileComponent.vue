<script setup>
import { useSupabase } from '@/clients/supabase'
import { onMounted, ref, toRefs } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth.js'
import Swal from 'sweetalert2'

const props = defineProps(['user'])
const { user } = toRefs(props)

const { getUserRole } = useAuth()
const userRole = ref('')

const loading = ref(false)
const username = ref()
const surname = ref()
const decanato = ref()
const { supabase } = useSupabase()
const router = useRouter()

const users = ref([])
const oneUser = ref([])
const userCards = ref([])

onMounted(() => {
  getProfile()
  checkUserRole()
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
        text: 'Completa tu perfil para poder enviar cartas, recuerda ingresar tu nombre, apellido y decanato al que perteneces',
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

function cargarData() {
  getUsers()
}

async function getUsers() {
  const { data } = await supabase
    .from('profiles')
    .select()
    .order('id', { ascending: false })
  users.value = data
}

async function getOneUser(id) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', id)
      .single()

    oneUser.value = data

    getUserCartas(id)

    if (error) throw error
  } catch (error) {
    alert(error.message)
  }
}

async function getUserCartas(id) {
  const { data } = await supabase.from('cartas').select().eq('id_user', id)
  userCards.value = data
}

const checkUserRole = async () => {
  try {
    const role = await getUserRole()
    userRole.value = role
  } catch (error) {
    console.log('Desautorizado para eliminar')
  }
}

const deleteCard = async (id) => {
  try {
    const { error } = await supabase.from('cartas').delete().eq('id', id)
    if (error) throw error
    Swal.fire({
      icon: 'success',
      title: 'Carta eliminada',
      text: 'La carta ha sido eliminada correctamente',
    })
  } catch (error) {
    console.log(error)
  }
}

const questionDelete = async (id) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'No podrás revertir esta acción',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#34d499',
    cancelButtonColor: '#79113a',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      deleteCard(id)
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('La carta no ha sido eliminada', '', 'info')
    }
  })
}
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-5 col-sm-12 mb-3 ps-4 pe-4">
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
    <div class="col-md-5 col-sm-12 mb-5 ps-4 pe-4">
      <h3>¿Tu perfil esta listo?</h3>

      <RouterLink to="/enviar" class="btn btn-primary"
        ><i class="bi bi-chat-heart"></i> ¡Enviar una carta!</RouterLink
      >
    </div>

    <div
      class="col-lg-8 col-md-5 col-sm-12 ps-4 pe-4"
      v-if="userRole == 'admin'"
    >
      <div class="border-bottom border-primary">
        <h3><i class="bi bi-shield-shaded"></i> Panel de Administrador</h3>
      </div>

      <button class="btn btn-primary mt-3" @click="cargarData">
        <i class="bi bi-arrow-clockwise"></i> Cargar datos
      </button>

      <h4 class="mt-2">Usuarios</h4>
      <table class="table table-primary table-striped table-responsive">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Decanato</th>
            <th>Rol</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.surname }}</td>
            <td>{{ user.decanato }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button
                class="btn btn-secondary m-1"
                @click="getOneUser(user.id)"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i class="bi bi-eye"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div
    class="modal fade"
    tabindex="-1"
    id="exampleModal"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Usuario</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>ID: {{ oneUser.id }}</p>
          <p>Nombres: {{ oneUser.username }}</p>
          <p>Apellidos: {{ oneUser.surname }}</p>
          <p>Decanato: {{ oneUser.decanato }}</p>

          <h5>Cartas:</h5>
          <hr class="line-separator" />

          <div class="row" v-for="ucarta in userCards" :key="ucarta.id">
            <p>
              De:
              <span class="card-title">
                {{ ucarta.nombre }} {{ ucarta.apellido }}
                <i
                  v-if="ucarta.rol == 'admin'"
                  class="badge-role bi bi-patch-check-fill"
                ></i>
                ({{ ucarta.decanato }})</span
              >
            </p>
            <p>
              Para:
              <span class="card-title">
                {{ ucarta.destinatario }} ({{ ucarta.destino }})</span
              >
            </p>
            <p>{{ ucarta.texto }}</p>

            <button
              type="button"
              class="btn btn-primary"
              @click="questionDelete(ucarta.id)"
              data-bs-dismiss="modal"
            >
              <i class="bi bi-trash"></i> Eliminar
            </button>

            <hr class="line-separator mt-2" />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-title {
  font-weight: 600;
}

.line-separator {
  color: var(--bs-primary);
}

.badge-role {
  color: var(--bs-primary);
}
</style>
