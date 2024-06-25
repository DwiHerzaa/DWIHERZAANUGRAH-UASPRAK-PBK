import { createRouter, createWebHistory } from 'vue-router';

import Tugas1 from '../components/Tugas1.vue';
import Tugas2 from '../components/Tugas2.vue'; 
import Tugas3 from '../components/Tugas3.vue';
import Tugas4 from '../components/Tugas4.vue';
import Tugas5 from '../components/Tugas5.vue';
import Tugas6 from '../components/Tugas6.vue';
import uas from '../components/WeatherWidget.vue';
const routes = [
  {
    path: '/',
    redirect: '/uas'
  },
  {
    path: '/Tugas1',
    component: Tugas1
  },
  {
    path: '/Tugas2',
    component: Tugas2
  },
  {
    path: '/Tugas3',
    component: Tugas3
  },
  {
    path: '/Tugas4',
    component: Tugas4
  },
  {
    path: '/Tugas5',
    component: Tugas5
  },
  {
    path: '/Tugas6',
    component: Tugas6
  },
  {
    path: '/uas',
    component: uas
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;