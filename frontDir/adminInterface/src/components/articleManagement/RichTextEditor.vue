<template>  
    <div class="editor-container">  
      <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" />  
      <Editor  
        v-model="valueHtml"  
        :style="style"  
        :defaultConfig="editorConfig"  
        @onCreated="handleCreated"  
      />  
    </div>  
  </template>  
    
  <script setup lang="ts">  
  import { shallowRef, computed, onBeforeUnmount } from 'vue';  
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import '@wangeditor/editor/dist/css/style.css'; // 引入wangEditor的CSS  
    
  const props = defineProps({  
    modelValue: {  
      type: String,  
      required: true,  
    },  
    toolbarConfig: {  
      type: Object,  
      default: {},  
    },  
    editorConfig: {  
      type: Object,  
      default: () => ({  
        placeholder: '请输入内容...',  
        // 其他配置...  
      }),  
    },  
    height: {  
      type: String,  
      default: '300px',  
    },  
  });  
    
  const emits = defineEmits(['update:modelValue']);  
    
  const valueHtml = computed({  
    get() {  
      return props.modelValue;  
    },  
    set(value) {  
      emits('update:modelValue', value);  
    },  
  });  
    
  const style = computed(() => ({  
    height: props.height,  
    'overflow-y': 'hidden',  
  }));  
    
  const editorRef = shallowRef<any>(null);  
    
  const handleCreated = (editor: any) => {  
    editorRef.value = editor;  
  };  
    
  onBeforeUnmount(() => {  
    const editor = editorRef.value;  
    if (editor) {  
      editor.destroy();  
    }  
  });  
  </script>  
    
  <style scoped>  
  .editor-container {  
    border: 1px solid #ccc;  
  }  
  </style>