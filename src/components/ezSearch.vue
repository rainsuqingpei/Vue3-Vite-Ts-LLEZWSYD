<template>
  <div class="ez-search1">
    <input v-model="searchVal" type="text" placeholder="输入关键字搜索" @keyup.enter="search" />
    <div class="search-img flex-col-row-align" @click="search">
      <img src="@/assets/images/search.png" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
withDefaults(
  defineProps<{
    show?: boolean;
    closeOnClickOverlay?: boolean;
    size?: 'normal' | 'large';
  }>(),
  {
    show: false,
    closeOnClickOverlay: false,
    size: 'large',
  },
);
const searchVal = ref('');
const emit = defineEmits<{
  (e: 'search', value: string): void;
}>();
const search = () => {
  emit('search', searchVal.value);
};
</script>

<style></style>
