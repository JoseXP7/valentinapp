<script setup>
import Preloader from './Preloader.vue'
import { ref, onMounted } from 'vue'
import { useSupabase } from '../clients/supabase'
const { supabase } = useSupabase()
const cartas = ref([])
const searchName = ref('')
let loading = true
let isHovered = ref(false)

const oneCarta = ref([])

async function getCartas() {
  const { data } = await supabase
    .from('cartas')
    .select()
    .order('id', { ascending: false })
  cartas.value = data.map((carta) => ({ ...carta, isHovered: false }))
}

async function getOneCarta(id) {
  const { data } = await supabase.from('cartas').select().eq('id', id)
  oneCarta.value = data
}

async function searchCarta() {
  if (typeof searchName.value === 'string' && searchName.value.length === 0) {
    getCartas()
  } else {
    const wordOne = searchName.value.trim().split(' ').at(0)
    const wordTwo = searchName.value.trim().split(' ').at(1)
    const { data } = await supabase
      .from('cartas')
      .select()
      .or(`nombre.ilike.%${wordOne}%, apellido.ilike.%${wordTwo}%`)

    cartas.value = data
  }
}

function cleanSearch() {
  searchName.value = ''
  getCartas()
}

onMounted(() => {
  getCartas()
  loading = false
})
</script>

<template>
  <div v-if="loading">
    <Preloader />
  </div>

  <div class="row mb-3">
    <div class="col-lg-4 col-md-6 col-sm-12">
      <div class="d-flex border-bottom border-primary pb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Ingresa un nombre"
          v-model="searchName"
        />

        <button class="btn btn-primary ms-2" @click="searchCarta">
          <i class="bi bi-search"></i>
        </button>

        <button class="btn btn-secondary ms-2" @click="cleanSearch">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  </div>

  <div
    class="col-lg-5 col-md-6"
    v-for="carta in cartas"
    :key="carta.id"
    data-aos="fade-up"
    data-aos-delay="100"
  >
    <div class="card border-primary mb-5 shadow">
      <div class="card-body">
        <div class="row">
          <div class="col-8">
            <h5 class="card-title">{{ carta.nombre }} {{ carta.apellido }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ carta.decanato }}</h6>
            <p class="card-destiny">
              Para {{ carta.destinatario }} ({{ carta.destino }})
            </p>
            <!-- <p class="card-text">
              {{ carta.texto }}
            </p> -->
          </div>
          <div class="col-4">
            <button
              class="button-open"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="getOneCarta(carta.id)"
              @mouseover="carta.isHovered = true"
              @mouseleave="carta.isHovered = false"
            >
              <i
                :class="carta.isHovered ? 'hidden' : 'visible'"
                class="bi bi-envelope-heart"
              ></i>
              <i
                :class="carta.isHovered ? 'visible' : 'hidden'"
                class="bi bi-envelope-open-heart"
              ></i>
            </button>
          </div>
        </div>
      </div>
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
          <h5 class="modal-title">Carta</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-for="ucarta in oneCarta" :key="ucarta.id">
          <p>
            De:
            <span class="card-title">
              {{ ucarta.nombre }} {{ ucarta.apellido }} ({{
                ucarta.decanato
              }})</span
            >
          </p>
          <p>
            Para:
            <span class="card-title">
              {{ ucarta.destinatario }} ({{ ucarta.destino }})</span
            >
          </p>
          <hr class="line-separator" />
          <p>{{ ucarta.texto }}</p>
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
.card .card-destiny {
  margin: 0;
  font-weight: 600;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.card-title {
  font-weight: 600;
}

.button-open {
  background: #fe2752;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-open i {
  font-size: 60px;
  color: #fff;
  position: absolute;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.button-open i.hidden {
  transform: scale(0);
  opacity: 0;
}

.button-open i.visible {
  transform: scale(1);
  opacity: 1;
}

.line-separator {
  color: var(--bs-primary);
}
</style>
