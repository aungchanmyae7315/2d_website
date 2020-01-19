import Vue from 'vue'
import ImageUploader from 'vue-image-upload-resize'
export default ({ Vue }) => {
  Vue.prototype.$imageUploaderResize = ImageUploader
}
