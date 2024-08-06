import { ref } from "vue"
import $ from 'jquery'

// 后续可以加上loading
export default function usePhotographManage() {
  const base64 = ref("")
  const closePhotographManage = function () {
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:8801/device/photographManage/close",
      dataType: "json",
      data: { token: '111' },

      success: function (data: any) {
        console.log(data);
      },
      error: function (jqXHR: any) {
        console.log("Error: " + jqXHR.status);
      },
    });
  }
  const startPhotographManage = function () {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8801/device/photographManage/open",
        dataType: "json",
        data: { token: '111' },

        success: function (data: any) {
          console.log(data);
          resolve(data)
        },
        error: function (jqXHR: any) {
          console.log("Error: " + jqXHR.status);
          reject(jqXHR.status)
        },
      });
    })
  }
  const photograph = function () {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8801/device/photographManage/photograph",
        dataType: "json",
        data: {
          token: "111",
        },
        success: function (data: any) {
          if (data.code == 0 && data.data.imgData != -1) {
            base64.value = data.data.imgData
            resolve(data.data.imgData)
          } else {
            base64.value = ""
            reject(data.data.imgData)
          }
          closePhotographManage();
        },
        error: function (jqXHR: any) {
          console.log("Error: " + jqXHR.status);
          reject(jqXHR.status)
          closePhotographManage();
        },
      });
    })
  }
  const doPhotograph = function () {
    return new Promise(function (resolve, reject) {
      startPhotographManage()
        .then(function () {
          photograph()
            .then(function (resolveData) {
              resolve(resolveData)
            })
            .catch(function (rejectData) {
              reject(rejectData)
            });
        })
        .catch(function () {
          closePhotographManage()
        });
    })
  }

  return {
    base64,
    startPhotographManage,
    photograph,
    doPhotograph
  }
}