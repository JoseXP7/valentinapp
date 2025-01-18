<script setup>
import { useSupabase } from '@/clients/supabase'
import { onMounted, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const props = defineProps(['user'])
const { user } = toRefs(props)

const username = ref()
const surname = ref()
const decanato = ref()
const role = ref()
const texto = ref()
const destinatario = ref()
const destino = ref()
const loading = ref(false)
const { supabase } = useSupabase()
let anonimato = ref(false)
const router = useRouter()

onMounted(() => {
  getProfile()
})

const getProfile = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase
      .from('profiles')
      .select(`username, surname, decanato, role`)
      .eq('id', user.value.id)
      .single()

    if (error) throw error

    if (data) {
      username.value = data.username
      surname.value = data.surname
      decanato.value = data.decanato
      role.value = data.role
    }
  } catch (error) {
    alert(error.message)
    console.log(error)
  } finally {
    loading.value = false

    if (username.value == null || surname.value == null) {
      Swal.fire({
        icon: 'error',
        title: 'Perfil incompleto',
        text: 'Debes rellenar tu perfil',
      })
      router.push('/')
    }
  }
}

const sendCard = async () => {
  if (
    texto.value == undefined ||
    destinatario.value == undefined ||
    destino.value == undefined
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes rellenar todos los campos',
    })
  } else if (username.value == null || surname.value == null) {
    Swal.fire({
      icon: 'error',
      title: 'Completa tu Perfil',
      text: 'Debes tener un nombre y apellido para enviar una carta',
    })
  } else {
    try {
      loading.value = true

      const send = {
        nombre: username.value,
        apellido: surname.value,
        texto: texto.value,
        decanato: decanato.value,
        id_user: user.value.id,
        destino: destino.value,
        destinatario: destinatario.value,
        rol: role.value,
      }

      const { error } = await supabase.from('cartas').upsert(send)

      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false

      Swal.fire({
        title: '¡Carta Enviada!',
        text: 'Revisa el buzón para verla',
        icon: 'success',
      })
    }
  }
}

const handleIncognito = () => {
  const checkbox = document.getElementById('incognito')
  if (checkbox.checked) {
    username.value = 'Anónimo'
    surname.value = '🕵️'
    anonimato.value = true
  } else {
    getProfile()
    anonimato.value = false
  }
}
</script>

<template>
  <div class="row justify-content-center mb-5">
    <div class="col-md-5 col-sm-12">
      <div class="border-bottom border-primary">
        <h3><i class="bi bi-envelope-heart-fill"></i> Enviar una carta</h3>
      </div>
      <form class="mt-3" @submit.prevent="sendCard">
        <div class="form-group mb-3">
          <label for="destinatario"
            >¿Para quien va tu carta? <span class="obli">(*)</span></label
          >
          <input
            type="text"
            class="form-control"
            id="destinatario"
            placeholder="Para alguien especial..."
            v-model="destinatario"
          />
        </div>

        <div class="form-group mb-3">
          <label class="form-label" for="destino">
            Carrera del afortunada(o) <span class="obli">(*)</span></label
          >
          <select
            class="form-select"
            name="carrera"
            id="destino"
            v-model="destino"
          >
            <optgroup label="DCyT">
              <option value="Ingeniería en Informática" selected>
                Ingeniería en Informática
              </option>
              <option value="Ingeniería en Telemática">
                Ingeniería en Telemática
              </option>
              <option value="Ingeniería de Producción">
                Ingeniería de Producción
              </option>
              <option value="Análisis de Sistemas">Análisis de Sistemas</option>
              <option value="Licenciatura en Física">
                Licenciatura en Física
              </option>
              <option value="Licenciatura en Matemática">
                Licenciatura en Matemática
              </option>
            </optgroup>
            <optgroup label="DCV">
              <option value="Medicina Veterinaria">Medicina Veterinaria</option>
              <option value="T.S.U Agropecuaria">T.S.U Agropecuaria</option>
            </optgroup>
            <optgroup label="DIC">
              <option value="Ingeniería Civil">Ingeniería Civil</option>
              <option value="Urbanismo">Urbanismo</option>
            </optgroup>
            <optgroup label="DCS">
              <option value="Enfermería">Enfermeria</option>
              <option value="Medicina">Medicina</option>
            </optgroup>
            <optgroup label="DCEE">
              <option value="Economía">Economía</option>
              <option value="Administración">Administración</option>
              <option value="Contaduría">Contaduría</option>
            </optgroup>
            <optgroup label="DEHA">
              <option value="Licenciatura en Desarrollo Humano">
                Licenciatura en Desarrollo Humano
              </option>
              <option value="Licenciatura en Psicología">
                Licenciatura en Psicología
              </option>
              <option value="Licenciatura en Música">
                Licenciatura en Música
              </option>
              <option value="Licenciatura en Artes Plásticas">
                Licenciatura en Artes Plásticas
              </option>
            </optgroup>
          </select>
        </div>

        <div class="form-group mb-3">
          <label for="texto"
            >Escribe tu carta <span class="obli">(*)</span></label
          >
          <textarea
            class="form-control"
            name="texto"
            id="texto"
            placeholder="Las rosas son rojas..."
            rows="4"
            v-model="texto"
          ></textarea>
        </div>

        <div class="form-check form-switch mb-3">
          <input
            class="form-check-input"
            id="incognito"
            type="checkbox"
            @click="handleIncognito"
          />
          <label for="incognito" class="form-check-label"
            >Modo Incognito <bi class="bi bi-incognito"></bi
          ></label>
          <p v-if="anonimato">
            El Modo Incognito hará que en tu carta, el titulo aparezca como
            "Anónimo 🕵️"
          </p>
        </div>

        <div class="form-buttons d-flex justify-content-end">
          <button
            class="btn btn-primary send"
            type="submit"
            :disabled="loading"
            @click="sendCard"
          >
            <i class="bi bi-chat-heart"></i>
            {{ loading ? 'Cargando...' : 'Enviar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.obli {
  color: #fe2752;
}

.send {
  padding-right: 20px;
  padding-left: 20px;
}
</style>
