<template>
  <div class="br1">
    <div>hooks初学</div>
    <div>{{ count }}</div>
    <div>{{ multiple }}</div>
    <el-button @click="increase(1)">increase</el-button>
    <el-button @click="decrease(2)">decrease</el-button>
  </div>
  <div class="br1">
    <div>封装公司调用获取fwzCode和mac</div>
    <div>fwzCode:{{ fwzCode }}</div>
    <div>mac:{{ mac }}</div>
    <el-button @click="getMacAndFwzCode">点击获取fwzCode和mac</el-button>
  </div>

  <div class="br1">
    <div>封装公司调用高拍仪</div>
    <div>base64:{{ base64 }}</div>
    <div>base64Out:{{ base64Out }}</div>
    <img v-if="base64" :src="'data:image/jpg;base64,' + base64" />
    <br />
    <el-button @click="getOnePic1">点击调用且抓拍 Promise</el-button>
    <el-button @click="getOnePic2">点击调用且抓拍 async+await </el-button>
  </div>
</template>

<script setup name="Demo1" lang="ts">
import useCount from "@/hooks/useCount";
const { count, multiple, increase, decrease } = useCount(10);
// --------------------------------分隔符-----------------------------------------
import useMac from "@/hooks/useMac";
const { mac, fwzCode, getMacAndFwzCode } = useMac();
// --------------------------------分隔符-----------------------------------------
import usePhotographManage from "@/hooks/usePhotographManage";
const { base64, startPhotographManage, photograph, doPhotograph } = usePhotographManage();
const base64Out = ref("");
const getOnePic1 = function () {
  doPhotograph()
    .then(function (resolveData) {
      console.log("成功回调接受的值：", resolveData);
      // TODO 通过接口上传给后端  方法uploadFile(baseData)啥啥的
      base64Out.value = resolveData;
    })
    .catch(function (rejectData) {
      console.log("失败回调接受的值：", rejectData);
    });
};

const getOnePic2 = async function () {
  await startPhotographManage();
  try {
    let base64 = await photograph();
    console.log("成功回调接受的值：", base64);
    // TODO 通过接口上传给后端  方法uploadFile(baseData)啥啥的
    base64Out.value = base64;
  } catch (error1) {
    console.log(error1);
  }
};
</script>

<style lang="scss" scoped>
.br1 {
  border: 1px solid #333;
  margin-bottom: 20px;
  img {
    width: 200px;
    height: auto;
  }
}
</style>
