import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/auth/Login.vue";
import Home from "../components/home/Home.vue";
import Signup from "../components/auth/Signup.vue";
import FriendsPageVue from "../components/friends/FriendsPage.vue";
import PersonalPageVue from "../components/home/PersonalPage.vue";
import MessagePageVue from "../components/Messages/MessagePage.vue";
import ServerPageVue from "../components/server/ServerPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "me",
          name: "me",
          component: PersonalPageVue,
          children: [
            {
              path: "friends",
              name: "friends",
              component: FriendsPageVue,
            },
            {
              path: "message",
              component: MessagePageVue,
            },
          ],
        },
        {
          path: "/server/:serverId",
          name: "server",
          component: ServerPageVue,
        },
      ],
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
  ],
});

export default router;
