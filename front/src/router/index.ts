import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/auth/Login.vue";
import Signup from "../components/auth/Signup.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
  ],
});

export default router;
