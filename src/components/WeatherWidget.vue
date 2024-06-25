<template>
  <div class="container">
    <q-card class="weather-card">
      <q-card-section class="weather-header">
        <div class="header-content">
          <q-icon name="cloud" size="lg" class="header-icon" />
          <div class="text-h6">Weather Condition</div>
          <q-icon name="sun" size="lg" class="header-icon" />
        </div>
      </q-card-section>
      <div class="search-container">
        <div class="search-bar">
          <q-input v-model="lokasi" label="Masukkan Lokasi" outlined dense class="input-field" />
          <q-btn color="primary" @click="ambilDataCuaca" icon="search" flat class="search-button" />
        </div>
      </div>
      <q-card-section>
        <div v-if="dataDiambil" class="result-section">
          <div v-if="namaLokasi">
            <div class="location">Lokasi: {{ namaLokasi }}</div>
            <div class="temperature">Temperatur: {{ temperatur }}°C</div>
            <div class="description">Deskripsi: {{ deskripsiCuaca }}</div>
            <img :src="weatherIcon" alt="Weather Icon" class="weather-icon">
            <div class="reference">Referensi: <a :href="referenceLink" target="_blank">{{ referenceText }}</a></div>
          </div>
          <div v-else class="error-message">Lokasi tidak ditemukan atau terjadi kesalahan.</div>
        </div>
        <div v-else-if="memuat" class="loading-message">
          <q-spinner-dots size="lg" color="primary" />
          <div>Memuat data...</div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';
import { QIcon } from 'quasar';

export default {
  name: 'WeatherWidget',
  components: {
    QIcon
  },
  setup() {
    const lokasi = ref('');
    const namaLokasi = ref('');
    const deskripsiCuaca = ref('');
    const temperatur = ref(null);
    const memuat = ref(false);
    const dataDiambil = ref(false);
    const referenceText = ref('Weather Forecast');
    const referenceLink = ref('https://www.weather.com/');

    const weatherIcon = computed(() => {
      if (deskripsiCuaca.value.includes('clear')) return 'https://openweathermap.org/img/wn/01d@2x.png';
      if (deskripsiCuaca.value.includes('clouds')) return 'https://openweathermap.org/img/wn/02d@2x.png';
      if (deskripsiCuaca.value.includes('rain')) return 'https://openweathermap.org/img/wn/10d@2x.png';
    });

    const ambilDataCuaca = async () => {
      memuat.value = true;
      dataDiambil.value = false;
      namaLokasi.value = '';
      deskripsiCuaca.value = '';
      temperatur.value = null;

      try {
        const apiKey = 'c143780b0583857a4f7f630626278d43';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${lokasi.value}&appid=${apiKey}&units=metric`;
        const response = await axios.get(apiUrl);
        namaLokasi.value = response.data.name;
        deskripsiCuaca.value = response.data.weather[0].description;
        temperatur.value = response.data.main.temp;
      } catch (error) {
        console.error(error);
      } finally {
        memuat.value = false;
        dataDiambil.value = true;
      }
    };

    return {
      lokasi,
      namaLokasi,
      deskripsiCuaca,
      temperatur,
      memuat,
      dataDiambil,
      ambilDataCuaca,
      weatherIcon,
      referenceText,
      referenceLink
    };
  }
};
</script>

<style scoped>
@keyframes backgroundGradient {
  0%, 100% {
    background-color: #ff9a9e;
  }
  50% {
    background-color: #fad0c4;
  }
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  animation: backgroundGradient 10s infinite;
}

.search-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  border-radius: 30px;
  padding: 10px;
  background: linear-gradient(to left, #fff1eb, #ace0f9);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.search-bar:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.input-field {
  flex: 1;
  margin-right: 10px;
  border-radius: 20px;
}

.search-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: white;
}

.weather-card {
  width: 400px;
  max-width: 90%;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
  background: linear-gradient(135deg, #f3e7e9 0%, #e3eeff 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(255,255,255,0.1), rgba(255,255,255,0) 70%);
  transition: transform 0.5s;
}

.weather-card:hover::before {
  transform: rotate(45deg);
}

.weather-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.weather-header {
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  border-radius: 15px 15px 0 0;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: white;
  font-family: 'Comic Sans MS', 'Avenir', Helvetica, Arial, sans-serif;
}

.weather-header .header-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.weather-header .header-icon {
  font-size: 24px;
  color: white;
}

.result-section {
  margin-top: 20px;
  text-align: center;
  width: 100%;
}

.location {
  color: #ff7e5f;
  font-weight: bold;
  font-size: 18px;
  font-family: 'Comic Sans MS', 'Avenir', Helvetica, Arial, sans-serif;
}

.temperature {
  color: #333;
  font-size: 24px;
  margin-top: 10px;
}

.description {
  color: #666;
  font-size: 16px;
  margin-top: 10px;
}

.weather-icon {
  width: 100px;
  height: 100px;
  margin-top: 10px;
}

.reference {
  margin-top: 20px;
  font-size: 14px;
  color: #ff7e5f;
}

.reference a {
  color: #ff7e5f;
  text-decoration: none;
}

.reference a:hover {
  text-decoration: underline;
}

.error-message, .loading-message {
  color: #ff4d4d;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
}
</style>
