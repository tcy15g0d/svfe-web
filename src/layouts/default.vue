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
              v-bind="props" 
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
import axios from 'axios';

export default {
  data: () => ({
    drawer: false,

    menusPath : '/menus.json',
    menus: [],
    open: [],
    selectedItem:'',
  }),
  created(){
    this.getMenus();
    this.restoreState();
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
      if(localStorage.getItem('drawer') == null){
        localStorage.setItem('drawer',this.drawer);
      }
      this.drawer = localStorage.getItem('drawer');
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
      this.setOpen();
    },
    setOpen(){
      sessionStorage.setItem("open", JSON.stringify(this.open));
    }
  }
}
</script>
