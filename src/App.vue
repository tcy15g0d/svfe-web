<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import Firebase from "./firebase_settings/index.js"
const auth = Firebase.auth

export default {
  data() {
    return {
      currentUser: null, // 儲存目前的使用者資訊
    };
  },
  created() {
    // 監聽使用者的登入狀態
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 使用者已登入
        console.log("使用者已登入：", user);
        this.currentUser = user;
      } else {
        // 使用者未登入
        console.log("使用者未登入");
        this.currentUser = null;
      }
    });
  },
};
</script>
