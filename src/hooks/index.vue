<template>
  <component
    :is="drawer ? 'el-drawer' : 'el-dialog'"
    v-model="popupVisible"
    v-bind="$attrs"
    :width="width"
    draggable
    :size="isFullscreen ? '100%' : width"
    :fullscreen="isFullscreen"
    align-center
    :destroy-on-close="false"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="popup-header flx-justify-between">
        <div :id="titleId" :class="titleClass">{{ title }}</div>
        <div class="header-btn">
          <SvgIcon
            :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'"
            :icon-style="{ width: '16px', height: '16px' }"
            @click="switchFullScreen"
          />
          <el-icon @click="close"><Close /></el-icon>
        </div>
      </div>
    </template>

    <slot></slot>

    <template v-if="$slots.footer || showConfirmBtn || showCancelBtn" #footer>
      <el-button v-if="showCancelBtn" @click="handleCancel">{{ cancelBtnText }}</el-button>
      <el-button v-if="showConfirmBtn" type="primary" @click="handleConfirm">{{ confirmBtnText }}</el-button>
      <slot name="footer"></slot>
    </template>
  </component>
</template>

<script setup lang="ts" name="Popup">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgIcon from "@/components/SvgIcon/index.vue";
import { ref, computed, watch } from "vue";

interface PopupProps {
  modelValue: boolean;
  width?: string;
  title: string;
  drawer?: boolean;
  fullscreen?: boolean;
  confirmBtnText?: string;
  cancelBtnText?: string;
  showConfirmBtn?: boolean;
  showCancelBtn?: boolean;
}

const props = withDefaults(defineProps<PopupProps>(), {
  modelValue: false,
  title: "",
  drawer: false,
  confirmBtnText: "确 定",
  cancelBtnText: "取 消",
  showConfirmBtn: true,
  showCancelBtn: true,
  width: "520px",
  fullscreen: false
});

const popupVisible = computed({
  get() {
    return props.modelValue;
  },
  set(val: boolean) {
    emit("update:modelValue", val);
  }
});

// const defineEmits(['confirm', 'cancel'])
type EmitProps = {
  (e: "update:modelValue", val: boolean): void;
  (e: "update:fullscreen", val: boolean): void;
  (e: "confirm"): void;
  (e: "cancel"): void;
};
const emit = defineEmits<EmitProps>();

const handleConfirm = () => {
  emit("confirm");
};

const handleCancel = () => {
  popupVisible.value = false;
  emit("cancel");
};

const isFullscreen = ref(false);
watch(
  () => props.modelValue,
  () => {
    isFullscreen.value = !!props.fullscreen;
  },
  { immediate: true }
);

const switchFullScreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

defineExpose({
  handleCancel
});
</script>

<style lang="scss" scoped></style>
