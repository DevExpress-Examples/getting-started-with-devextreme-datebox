import { createRouter, createWebHistory } from 'vue-router';
import DateBoxView from '../views/DateBoxView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'datebox',
      component: DateBoxView,
    },
  ],
});

export default router;
