<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <p class="text-h2 font-weight-bold">書籍列表</p>
          <v-list>
            <v-list-item
              v-for="novel in novels"
              :key="novel.dirName"
              @click="goToNovel(novel)"
            >
                <v-list-item-title>{{ novel.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'NovelsList',
    data() {
      return {
        novelsListPath : '/Novels/NovelsList.json',
        // novels: ['ShadedVerdureFleetingExistence', '測試'], // 根據實際情況設置或從API獲取
        novels: [], // 根據實際情況設置或從API獲取
      };
    },
    created(){
        this.getNovelsList();
    },
    methods: {
      goToNovel(novel) {
        this.$router.push(`/NovelsList/${novel.dirName}`);
      },
      async getNovelsList(){
        const path = this.novelsListPath;
            try {
                const response = await axios.get(path);
                this.novels = response.data;
            } catch (error) {
                console.error('Error fetching the directory:', error);
            }
      }
    },
    
  };
  </script>
  