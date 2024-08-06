<template>
  <Popup
    top="30vh"
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
      <el-form-item label="位置名称" prop="displayName">
        <el-input v-model="popupProps.row.displayName" placeholder="请输入位置名称" clearable />
      </el-form-item>
      <el-form-item label="位置编号" prop="displayCode">
        <el-input v-model="popupProps.row.displayCode" placeholder="请输入位置编号" clearable />
      </el-form-item>
      <el-form-item label="位置类型" prop="locationSubType">
        <el-radio-group v-model="popupProps.row.locationSubType">
          <el-radio v-for="item of baseStore.dict.locationsubtype" :key="item.id" :label="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </Popup>
</template>

<script setup lang="ts" name="LocationPopup">
import { reactive, ref, Ref } from "vue";
import { usePopup } from "@/hooks/usePopup";
import { FormInstance } from "element-plus";
import { Location } from "@/api/interface/location";
import Popup from "@/components/Popup/index.vue";
import { useBaseStore } from "@/stores/modules/base";

const baseStore = useBaseStore();
const rules = reactive({
  displayName: [{ required: true, message: "请输入位置名称" }],
  displayCode: [{ required: true, message: "请输入位置编号" }]
});

const formDataRef = ref<FormInstance>();
const { popupVisible, popupTitle, popupProps, openPopup, handleSubmit } = usePopup<Location.LocationInfo>(
  formDataRef as Ref<FormInstance>
);

defineExpose({
  openPopup
});
</script>
