<!-- <template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>{{ novel }} Directory</h2>
          <v-card>
            <v-card-text v-html="directory"></v-card-text>
          </v-card>
          <v-list>
            <v-list-item
              v-for="chapter in chapters"
              :key="chapter"
              @click="goToChapter(chapter)"
            >
                <v-list-item-title>{{ chapter }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </template> -->
<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <p class="text-h2 font-weight-bold">{{ novelContent.title }}</p>
                <!-- <v-card>
                    <v-card-text v-html="directory"></v-card-text>
                </v-card> -->
                <v-list>
                    <v-list-item 
                        v-for="(chapter,chapterKey) in novelContent.chapters" 
                        :key="chapterKey" 
                        @click="goToChapter(chapterKey)"
                    >
                        <v-list-item-title>{{ chapterKey + ' - ' +chapter.title}}</v-list-item-title>
                    </v-list-item>
                </v-list>
                <!-- <div v-if="chapterFiles.length">
                    <h3>Files in {{ selectedChapter }}</h3>
                    <v-list>
                        <v-list-item 
                            v-for="file in chapterFiles" 
                            :key="file"
                            @click="goToChapter(file)"
                        >
                            <v-list-item-title>{{ file }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </div> -->
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import { marked } from 'marked';

export default {
    name: 'NovelDetails',
    props: ['novel'],
    data() {
        return {
            novelContent:[],

            // directory: '',
            // chapters: ['序', '初訪居酒屋','飯途','亂心歸途'], // 根據實際情況設置或從API獲取
            // chapters: ['第一章-初見阿傑(0526)', '第二章'],
            // chapterFiles: ['序', '初訪居酒屋', '飯途', '亂心歸途'],
            // selectedChapter: '',
        };
    },
    mounted() {
        // this.fetchDirectory();
        this.getContents();
    },
    methods: {
        // async fetchDirectory() {
        //     const path = `/Novels/${this.novel}/章節目錄.md`;
        //     try {
        //         const response = await axios.get(path);
        //         this.directory = marked(response.data);
        //     } catch (error) {
        //         console.error('Error fetching the directory:', error);
        //     }
        // },
        goToChapter(chapterKey) {
            // console.log(`${this.$route.fullPath}/${chapter}`);
            this.$router.push({ 
                name: '/ChapterDetails',
                params: {
                    novel: this.novel, 
                    chapter: chapterKey,
                }
            });
            // this.$router.push(`${this.$route.fullPath}/${chapter}`);
        },
        // async fetchChapterFiles(chapter) {

        //     this.selectedChapter = chapter;
        //     console.log("chapter", chapter);
        //     try {
        //         // 嘗試訪問 public 資料夾中的檔案
        //         //   const path = `/Novels/${this.novel}/${chapter}`;
        //         //   const response = await axios.get(path);
        //         //   console.log("path",path);
        //         //   console.log("response.data",response.data);
        //         //   const files = response.data; // 假設這裡返回的是檔案列表
        //         //   this.chapterFiles = files;
        //     } catch (error) {
        //         console.error('Error fetching chapter files:', error);
        //     }
        // },
        async getContents() {
            const path = `/Novels/${this.novel}/contents.json`
            try {
                const response = await axios.get(path);
                // console.log('path',path);
                // console.log('readJson：',response.data);
                this.novelContent = response.data;
            } catch (error) {
                console.error('Error get the Contents:', error);
            }
        },
    },
};
</script>