<template>
  <!-- 选择类型弹窗 -->
  <div class="alert-Dialog">
    <el-dialog title="提示" v-model="localOpMessageShow2" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="content">
        <div class="blue_con_wrap">
          <div class="blue_con" @click="chooseType('card')">刷身份证</div>
          <div class="blue_con" @click="chooseType('code')"> 输入<br />统一社会信用代码 </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = withDefaults(
  defineProps<{
    opMessageShow2: boolean;
  }>(),
  {
    opMessageShow2: false,
  },
);
watch(() => props.opMessageShow2, (val) => {
  localOpMessageShow2.value = val
})
const localOpMessageShow2 = ref(false);
const emit = defineEmits<{
  (e: 'chooseType', type: string): void;
}>();
const chooseType = (type: string) => {
  localOpMessageShow2.value = false;
  emit('chooseType', type);
};
</script>

<style scoped></style>
