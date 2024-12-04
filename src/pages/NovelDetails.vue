<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <p class="text-h2 font-weight-bold">{{ novelContent.title }}</p>
                <v-list>
                    <v-list-item 
                        v-for="(chapter,chapterKey) in novelContent.chapters" 
                        :key="chapterKey" 
                        @click="goToChapter(chapterKey)"
                    >
                        <v-list-item-title>{{ chapterKey + ' - ' +chapter.title}}</v-list-item-title>
                    </v-list-item>
                </v-list>
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
        };
    },
    mounted() {
        this.getContents();
    },
    methods: {
        goToChapter(chapterKey) {
            
            this.$router.push({ 
                name: '/ChapterDetails',
                params: {
                    novel: this.novel, 
                    chapter: chapterKey,
                }
            });
        },
        async getContents() {
            const path = `/Novels/${this.novel}/contents.json`
            try {
                const response = await axios.get(path);
                this.novelContent = response.data;
            } catch (error) {
                console.error('Error get the Contents:', error);
            }
        },
    },
};
</script>