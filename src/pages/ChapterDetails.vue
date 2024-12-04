<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h2">{{ chapter }}</v-card-title>
            <v-card-text>
                <v-card
                    v-for="(sections,sectionsKey) in currentChapters.sections" 
                    :key="sectionsKey" 
                >
                <v-card-title class="text-h5" >{{ sectionsKey}}</v-card-title>
                    <v-card-text v-html="content[sections]">
                    </v-card-text>
                </v-card>
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import { marked } from 'marked';

export default {
    name: 'ChapterDetails',
    props: ['novel', 'chapter'],
    data() {
        return {
            chapterFullStory: [],
            novelContent: [],
            currentChapters: [],
            content:{},
        };
    },
    async mounted() {
        await this.getContents()
        await this.getChapterFullStory()
    },
    methods: {
        async getChapterFullStory() {
            //console.log('this.currentChapters.sections', this.currentChapters.sections);

            Object.entries(this.currentChapters.sections).forEach(([sectionsKey, value]) => {
                //console.log(`Key: ${sectionsKey}, Value: ${value}`);
                //console.log('section', sectionsKey)
                this.getChapterStory(value);
            });
        },
        async getChapterStory(section) {
            const sectionPath = `/Novels/${this.novel}/${this.chapter}/${section}.md`;
            //console.log("sectionPath",sectionPath);
              try {
                const response = await axios.get(sectionPath);
                this.content[section] = marked(response.data);
              } catch (error) {
                console.error('Error fetching the chapter content:', error);
              }
        },
        async getContents() {
            const path = `/Novels/${this.novel}/contents.json`
            try {
                const response = await axios.get(path);
                this.novelContent = response.data;
                //console.log('novelContent', this.novelContent);
                this.novelContent.chapters
                // 篩選出選中的章節
                this.currentChapters = this.novelContent.chapters[this.chapter];
                //console.log('currentChapters', this.currentChapters);
            } catch (error) {
                console.error('Error get the Contents:', error);
            }
        },
    },
};
</script>
