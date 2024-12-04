<template>
  <v-app>
      <!-- drawer 跟 app bar -->
      <v-navigation-drawer v-model="drawer">
        <v-sheet class="pa-4" color="grey-lighten-4">
          <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

          <div>這邊會顯示登入的email</div>
        </v-sheet>

        <v-divider></v-divider>

        <v-list density="compact" nav v-model:opened="open">

          <v-list-group 
            :value="item.text" 
            v-for="(item, i) in menus"
          >
            <template v-slot:activator="{ props }">
              <template v-if="item.link" >
                <v-list-item 
                :href="item.link" 
                :prepend-icon="item.icon" 
                :title="item.text"
                :key="i"
                :value="item.text" 
                append-icon=""
                :class="{ 'v-list-item--active': selectedItem === item.text }"
                @click="setSelectedItem(item.text)"
              ></v-list-item>
              </template>
              <template v-else-if="item.link==null" >
                <v-list-item 
                v-bind="props" 
                :prepend-icon="item.icon" 
                :title="item.text"
                :key="i"
                :value="item.text"
                @click="setSelectedItem(item.text)"
                ></v-list-item>
              </template>
            </template>

            <v-list-item 
              v-for="(submenuItem, i) in item.submenu" 
              :href="submenuItem.link"
              :prepend-icon="submenuItem.icon" 
              :title="submenuItem.text" 
              :key="i"
              :value="submenuItem.text"
              :class="{ 'v-list-item--active': selectedItem === submenuItem.text }"
              @click="setSelectedItem(submenuItem.text)"
            ></v-list-item>
          </v-list-group>
          <v-list-item 
            title="登出" 
            prepend-icon="mdi-logout" 
            @click="logout"
            
          ></v-list-item>
          
        </v-list>
      </v-navigation-drawer>

      <v-app-bar>
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click="drawerHandler"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>這邊正常來說會顯示一些文字</v-app-bar-title>
      </v-app-bar>
    <v-main>
      <router-view />
    </v-main>

    <!-- <AppFooter /> -->
  </v-app>
</template>

<script>
import Home from '@/components/Home.vue';
import axios from 'axios';
import Firebase from "../firebase_settings/index.js"
const auth = Firebase.auth
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";

export default {
  data: () => ({
    drawer: false,

    menusPath : '/menus.json',
    menus: [],
    open: [],
    selectedItem:'',
    user: null, // 獲取當前使用者資訊
    isLogin:false,
  }),
  created(){
    this.getMenus();
    this.restoreState();
    this.checkUser();
    // this.user = JSON.parse(localStorage.getItem("user"));//全局獲取使用者
    // console.log('defaultUser',this.user);
    //console.log('localStorage.getItem("user")',localStorage.getItem("user"))
  },
  methods: {
    drawerHandler() {
      this.drawer = !this.drawer;
      localStorage.setItem('drawer',this.drawer);
    },
    async getMenus(){
        const path = this.menusPath;
            try {
                const response = await axios.get(path);
                this.menus = response.data;
            } catch (error) {
                console.error('Error fetching the menus', error);
            }
    },
    drawerState(){
      // 恢復抽屜狀態
      const savedDrawer = localStorage.getItem("drawer") == 'true';
      if (savedDrawer) {
        this.drawer = savedDrawer;
      }
    },
    selectedItemState(){
       // 恢復選中狀態
       const savedItem = sessionStorage.getItem("selectedItem");
      if (savedItem) {
        this.selectedItem = savedItem;
      }
    },
    openState(){
       // 恢復選單展開狀態
       const saveOpen = sessionStorage.getItem("open");
      if (saveOpen) {
        this.open = JSON.parse(saveOpen);
      }
    },
    restoreState() {
      this.drawerState();
      this.selectedItemState();
      this.openState();
    },
    setSelectedItem(item){
      this.selectedItem = item;
      sessionStorage.setItem("selectedItem", item);
      console.log('nowItem',this.selectedItem)
      this.setOpen();
    },
    setOpen(){
      sessionStorage.setItem("open", JSON.stringify(this.open));
    },
    async logout() {
      try {
        await signOut(auth); // 執行登出
        this.user = null; // 清除本地的使用者狀態
        localStorage.removeItem("user");// 清理本地儲存的使用者資料
        this.$router.push("/Login"); // 導向登入頁面
        //console.log("使用者已登出");
      } catch (error) {
        console.error("登出失敗：", error);
      }
    },
    checkUser(){
      onAuthStateChanged(auth, (user) => {
      if (user) {
        // 使用者已登入
        //console.log("使用者已登入：", user);
        this.user = user;
        // 將使用者資訊存入 localStorage
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        // 使用者未登入
        console.log("使用者未登入");
        localStorage.removeItem("user");// 清理本地儲存的使用者資料
      }
    });
    }
  }
}
</script>
