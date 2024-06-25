<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="header">
      <q-toolbar>
        <q-toolbar-title>
          <div class="logo">WeatherWidget</div>
        </q-toolbar-title>
        <q-btn flat dense round @click="toggleRightDrawer">
          <q-icon name="menu" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered class="drawer">
      <q-list>
        <q-item clickable @click="navigateTo('/weather')" class="drawer-item">
          <q-item-section>WeatherWidget</q-item-section>
        </q-item>
        <q-item clickable @click="navigateTo('/tugas1')" class="drawer-item">
          <q-item-section>Tugas 1</q-item-section>
        </q-item>
        <q-item clickable @click="navigateTo('/tugas2')" class="drawer-item">
          <q-item-section>Tugas 2</q-item-section>
        </q-item>
        <q-item clickable @click="navigateTo('/tugas3')" class="drawer-item">
          <q-item-section>Tugas 3</q-item-section>
        </q-item>
        <q-item clickable @click="navigateTo('/tugas4')" class="drawer-item">
          <q-item-section>Tugas 4</q-item-section>
        </q-item>
        <q-item clickable @click="navigateTo('/tugas5')" class="drawer-item">
          <q-item-section>Tugas 5</q-item-section>
        </q-item>
        <q-item clickable @click="navigateTo('/tugas6')" class="drawer-item">
          <q-item-section>Tugas 6</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const rightDrawerOpen = ref(false);
    const router = useRouter();

    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value;
    };

    const navigateTo = (path) => {
      rightDrawerOpen.value = false; 
      router.push(path);
    };

    return {
      rightDrawerOpen,
      toggleRightDrawer,
      navigateTo
    };
  }
};
</script>

<style>
@keyframes backgroundGradient {
  0%, 100% {
    background-color: #ff9a9e;
  }
  50% {
    background-color: #fad0c4;
  }
}

#app {
  font-family: 'Comic Sans MS', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  animation: backgroundGradient 10s infinite;
}

.header {
  background: linear-gradient(to right, #33afd4, #1e88e5);
  color: #ffffff;
}

.logo {
  font-size: 30px;
  font-weight: bold;
  font-family: 'Comic Sans MS', 'Avenir', Helvetica, Arial, sans-serif;
  background: -webkit-linear-gradient(#ff9a9e, #fad0c4);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.drawer {
  background-color: #ffffff;
}

.drawer-item {
  font-size: 18px;
  color: #333;
  transition: background-color 0.3s, color 0.3s;
  font-family: 'Comic Sans MS', 'Avenir', Helvetica, Arial, sans-serif;
}

.drawer-item:hover {
  background-color: #1e88e5;
  color: #ffffff;
}
</style>
