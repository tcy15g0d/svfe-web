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
    // console.log("appvue_auth.currentUser：", auth.currentUser);
    //監聽使用者的登入狀態
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     // 使用者已登入
    //     console.log("使用者已登入：", user);
    //     // 將使用者資訊存入 localStorage
    //     localStorage.setItem("user", JSON.stringify(user));
    //     // this.currentUser = user;
    //   } else {
    //     // 使用者未登入
    //     console.log("使用者未登入");
    //     localStorage.removeItem("user");// 清理本地儲存的使用者資料
    //     // this.currentUser = null;
    //   }
    // });
  },
  methods:{
    checkUser(){
      onAuthStateChanged(auth, (user) => {
      if (user) {
        // 使用者已登入
        console.log("使用者已登入：", user);
        this.user = user;
        // 將使用者資訊存入 localStorage
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        // 使用者未登入
        //console.log("使用者未登入");
        localStorage.removeItem("user");// 清理本地儲存的使用者資料
      }
    });
    }
  }
};
</script>
