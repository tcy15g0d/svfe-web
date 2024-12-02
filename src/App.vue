<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
  <!-- <component :is="layoutComponent">
    <router-view />
  </component> -->
</template>

<!-- <script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import oldLayout from '@/layouts/old.vue';
import defaultLayout from '@/layouts/default.vue';

const route = useRoute();
const layout = computed(() => {
  const metaLayout = route.meta.layout;
  console.log(metaLayout);
  return metaLayout === 'old' ? 'oldLayout' : 'defaultLayout';
});

</script> -->

<!-- <script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import oldLayout from '@/layouts/old.vue';
import defaultLayout from '@/layouts/default.vue';

export default {
  components: {
    oldLayout,
    defaultLayout,
  },
  setup() {
    const route = useRoute();
    // 計算要使用的 Layout 元件
    const layoutComponent = computed(() => {
      return route.meta.layout === 'old' ? oldLayout : defaultLayout;
    });
    return { layoutComponent };
  },
};
</script> -->

<!-- <script setup>
  //
</script> -->
