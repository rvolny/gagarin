<!--
  Created from /node_modules/mdbvue/src/components/pro/FileInput.vue
  Formatting is preserved from original file. Do not change.

  @formatter:off
-->
<template>
  <form>
    <div class="file-field md-form">
      <div :class="btnClass">
        <span>{{btnTitle}}</span>
        <input type="file" :multiple="multiple" @change="(e)=>fileChange(e.target.files)" />
      </div>
      <div class="file-path-wrapper">
        <input :class="inputFieldClass" type="text" :placeholder="files ? files : textFieldTitle" />
      </div>
      <div v-if="validationError" class="invalid-feedback-custom">{{validationError}}</div>
    </div>
  </form>
</template>

<script>
import classNames from 'classnames';

const FileInput = {
  props: {
    btnColor: {
      type: String,
      default: 'default'
    },
    btnTitle: {
      type: String,
      default: 'Choose file'
    },
    multiple: {
      type: Boolean,
    },
    textFieldTitle: {
      type: String,
      default: 'Upload your file'
    },
    validationError: {
      type: String
    }
  },
  $_veeValidate: {
    // fetch the current value from the innerValue defined in the component data.
    value () {
      return this.filesNative;
    }
  },
  data() {
    return {
      files: false,
      filesNative: []
    };
  },
  computed: {
    btnClass() {
      return classNames(
        'btn',
        'btn-' + this.btnColor,
        'btn-sm',
        'float-left'
      );
    },
    inputFieldClass() {
      return classNames(
        'file-path validate',
        this.files && 'valid'
      );
    }
  },
  methods: {
    fileChange(files){
      if (files.length > 0) {
        if (files.length > 1) {
          let filesNames = [];
          let filesNative = [];
          for (let i = 0; i < files.length; i++) {
            filesNames.push(files[i].name);
            filesNative.push(files[i]);
          }
          this.files = filesNames;
          this.filesNative = filesNative;
        } else {
          this.files = files[0].name;
          this.filesNative = [files[0]];
        }
      } else {
        this.files = false;
        this.filesNative = [];
      }
    }
  }
};

export default FileInput;
export { FileInput as mdbFileInput };
</script>

<style scoped>

</style>
