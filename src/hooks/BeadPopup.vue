<template>
  <Popup
    v-model="popupVisible"
    :title="popupTitle"
    :show-confirm-btn="popupProps.action != 'view'"
    :show-cancel-btn="popupProps.action != 'view'"
    @confirm="handleSubmit"
  >
    <el-form
      ref="formDataRef"
      label-width="110px"
      label-suffix=" :"
      :rules="rules"
      :disabled="popupProps.action == 'view'"
      :model="popupProps.row"
      :hide-required-asterisk="popupProps.action == 'view'"
    >
      <el-form-item label="床位号" prop="beadNumber">
        <el-input v-model="popupProps.row.beadNumber" clearable />
      </el-form-item>
      <el-form-item label="品牌" prop="brand">
        <el-input v-model="popupProps.row.brand" clearable />
      </el-form-item>
      <el-form-item label="型号" prop="model">
        <el-input v-model="popupProps.row.model" clearable />
      </el-form-item>
    </el-form>
  </Popup>
</template>

<script setup lang="ts" name="BeadPopup">
import { reactive, ref, Ref } from "vue";
import { usePopup } from "@/hooks/usePopup";
import { FormInstance } from "element-plus";
import { Location } from "@/api/interface/location";
import Popup from "@/components/Popup/index.vue";

const rules = reactive({
  beadNumber: [{ required: true, message: "请输入床位号" }]
});

const formDataRef = ref<FormInstance>();
const { popupVisible, popupTitle, popupProps, openPopup, handleSubmit } = usePopup<Location.BeadInfo>(
  formDataRef as Ref<FormInstance>
);

defineExpose({
  openPopup
});
</script>
