<template>
  <v-app>
    <!-- drawer 跟 app bar -->
    <v-navigation-drawer v-model="drawer">
      <v-sheet class="pa-4" color="grey-lighten-4">
          <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

          <div>john@google.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
          <v-list-item v-for="[icon, text] in links" :key="icon" :prepend-icon="icon" :title="text"
              link></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click="drawerHandler"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Application Bar</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <!-- <AppFooter /> -->
  </v-app>
</template>

<script>
  export default {
        data: () => ({
            cards: ['Today', 'Yesterday'],
            drawer: false,
            links: [
                ['mdi-inbox-arrow-down', 'Inbox'],
                ['mdi-send', 'Send'],
                ['mdi-delete', 'Trash'],
                ['mdi-alert-octagon', 'Spam'],
            ],
        }),

        methods: {
            drawerHandler(){
                console.log("drawer：",this.drawer);
                this.drawer = !this.drawer;
            },
        }
    }
</script>
