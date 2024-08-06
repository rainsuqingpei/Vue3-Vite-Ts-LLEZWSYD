import { ref } from "vue"
import $ from 'jquery'


export default function useMac() {
  const fwzCode = ref()
  const mac = ref()
  const getFwzCode = function () {
    return new Promise(function (resolve) {
      $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8801/device/deviceManage/GetFwzCode",
        dataType: "json",
        data: { token: "111", moduleCode: "fgg111" },
        success: function (data) {
          if (data.code == 0) {
            resolve(data.data.FwzCode);
          }
        },
        error: function (jqXHR) {
          console.log(jqXHR)
        },
      });
    });
  }
  const getMacCode = function () {
    return new Promise(function (resolve) {
      $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8801/device/deviceManage/gain",
        dataType: "json",
        data: { token: "111", moduleCode: "fgg111" },
        success: function (data) {
          if (data.data.macAddress) {
            resolve(data.data.macAddress);
          }
        },
        error: function (jqXHR) {
          console.log(jqXHR)
        },
      });
    });
  }

  const getMacAndFwzCode = (): void => {
    Promise.all([getFwzCode(), getMacCode()])
      .then(function (res) {
        if (res && res.length > 0) {
          fwzCode.value = res[0];
          mac.value = res[1];
          console.log(res[0], "fwzCode")
          console.log(res[1], "mac")
          // 可以考虑存到store里面
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }

  return {
    mac,
    fwzCode,
    getMacAndFwzCode
  }
}