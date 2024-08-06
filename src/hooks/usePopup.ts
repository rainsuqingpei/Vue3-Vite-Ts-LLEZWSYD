import { Popup } from "./interface";
import { reactive, toRefs, ref, computed, Ref, UnwrapRef } from "vue";
import { ElMessage, FormInstance } from "element-plus";

/**
 * @description usePopup 使用popup弹窗操作方法封装
 * @param {T} T 表单数据接口类型
 * @param {FormInstance} formInstance 表单实例
 */
export const usePopup = <T>(formInstance: Ref<FormInstance>) => {
  const state = reactive<Popup.PopupStateProps>({
    // 弹窗显示隐藏
    popupVisible: false
  });

  // 父组件传递的参数
  const popupProps = ref<Popup.PopupProps<T>>({
    action: "",
    row: {}
  });

  const popupTitle = computed(() => {
    let actionValue = popupProps.value.action;
    let titleValue = popupProps.value.title;
    return titleValue ? titleValue : actionValue == "add" ? "新增" : actionValue === "edit" ? "编辑" : "详情";
  });

  /**
   * @description 接收父组件传过来的参数
   */
  const openPopup = (params: UnwrapRef<Popup.PopupProps<T>>) => {
    popupProps.value = params;
    state.popupVisible = true;
    formInstance.value?.resetFields();
  };

  /**
   * @description 提交数据（新增/编辑）
   */
  const handleSubmit = () => {
    formInstance.value!.validate(async (valid: boolean, invalidFields: any) => {
      console.log(formInstance.value);
      if (valid) {
        // console.log(refreshData);
        // console.log(ElMessage);
        try {
          let data = await popupProps.value.api!(popupProps.value.row);
          popupProps.value.dataCallBack && popupProps.value.dataCallBack(data);
          ElMessage.success({ message: `${popupTitle.value}成功！` });
          refreshData();
          state.popupVisible = false;
        } catch (error) {
          console.log(error);
        }
      } else {
        // 表单验证失败后，自动定位到失败的位置
        Object.keys(invalidFields).forEach((key, i) => {
          const propName = invalidFields[key][0].field;
          if (i == 0) {
            formInstance.value.scrollToField(propName);
          }
        });
      }
    });
  };

  /**
   * @description 刷新数据
   */
  const refreshData = async () => {
    if (Array.isArray(popupProps.value.refreshData)) {
      // 并发刷新多条数据
      let concurrency: Function[] = [];
      popupProps.value.refreshData.forEach(item => concurrency.push(item()));
      Promise.all(concurrency);
    } else {
      // 刷新单条数据
      popupProps.value.refreshData!();
    }
  };
  return {
    ...toRefs(state),
    popupTitle,
    popupProps,
    openPopup,
    handleSubmit
  };
};
