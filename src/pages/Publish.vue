<template>
  <q-page  padding>
    <div>
      <div class="editor">
        <q-input
          v-model="title"
          float-label="Title"
        />
        <q-input
          v-model="raw"
          float-label="Content"
          type="textarea"
          placeholder="Lorem ipsum dolor sit amet..."
        />
        <q-btn color='primary' class='full-width' @click="publish()">Publish</q-btn>
      </div>
      <div class="preview" v-html="markdown">
      </div>
    </div>
  </q-page>
</template>

<script>
import marked from 'marked';
import qs from 'qs';
export default {
  computed: {
    markdown() {
      return marked(this.raw, { sanitize: true });
    },
  },
  methods: {
    publish() {
      // Retrieve data from the component.
      const { title, raw } = this;

      // Basic form validation.
      if (!title || !raw) {
        this.$q.notify({ type: 'negative', message: 'The fields cannot be empty.' });
        return;
      }

      // Becasue we're using the Quasar plugin for Axios,
      // we have the ability to access it as this.$axios.
      const params = {
        title: title,
        content: raw
      };
      this.$axios.post('/user/post', qs.stringify(params), {
        headers: {
          authorization: localStorage.getItem('Authorization'),
        },

      // Send some notifications on success or failure.
      }).then(() => {
        this.$q.notify({ type: 'positive', message: 'Your post has been published.' });
      }).catch(error => {
        console.log(error);
        this.$q.notify({ type: 'negative', message: error.response.data.error });
      });
    },
  },
  data() {
    return {
      title: '',
      raw: '',
    };
  },
};
</script>

<style lang="stylus" scoped>
.wrapper
  display flex
  min-height inherit
  width 100%
  .editor
    width 100%
    padding 1em
  .preview
    width 100%
    padding 1em
  button
    margin-top 3em
</style>
