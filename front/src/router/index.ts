import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/auth/Login.vue";
import Home from "../components/Home/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
  ],
});

export default router;
