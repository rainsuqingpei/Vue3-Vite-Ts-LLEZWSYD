<template>
  <div class="intro-header">
    <div>{{ $t('title') }}</div>
    <var-button type="primary" @click="changeLang('zh-cn')">{{ $t('language.zh') }}</var-button>
    <var-button type="info" @click="changeLang('en-us')">{{ $t('language.en') }}</var-button>
  </div>
  <div>{{locale}}</div>

  <nut-cell v-for="(item, index) in cellList" :key="index" :title="item" :desc="item"></nut-cell>
  <section>
    <span class="title">Varlet</span>
    <var-space :size="[10, 10]" class="space">
      <var-button>默认按钮</var-button>
      <var-button type="primary">主要按钮</var-button>
      <var-button type="info">信息按钮</var-button>
      <var-button type="success">成功按钮</var-button>
      <var-button type="warning">警告按钮</var-button>
      <var-button type="danger">危险按钮</var-button>
    </var-space>
  </section>
  <section>
    <span class="title">Vant</span>
    <div class="demo">
      <van-button type="primary">主要按钮</van-button>
      <van-button type="success">成功按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div>
  </section>
  <section>
    <span class="title">NutUI</span>
    <div class="demo">
      <nut-button type="primary">主要按钮</nut-button>
      <nut-button type="info">信息按钮</nut-button>
      <nut-button type="default">默认按钮</nut-button>
      <nut-button type="danger">危险按钮</nut-button>
      <nut-button type="warning">警告按钮</nut-button>
      <nut-button type="success">成功按钮</nut-button>
    </div>
  </section>
  <section>
    <span class="title">Modal</span>
    <div class="demo">
      <var-button type="primary" @click="openLargeModal">Open large Modal</var-button>
      <var-button type="info" @click="openSmallModal">Open Normal Modal</var-button>
    </div>
  </section>

  <nut-form ref="ruleForm" :model-value="formData">
      <nut-form-item required prop="name" :rules="[{ required: true, message: '请输入用户名' }]">
        <input v-model="formData.name" class="nut-input-text" placeholder="请输入用户名" type="text" />
      </nut-form-item>
      <nut-form-item required prop="pwd" :rules="[{ required: true, message: '请填写联系电话' }]">
        <input v-model="formData.pwd" class="nut-input-text" placeholder="请输入密码" type="password" />
      </nut-form-item>
      <nut-button block type="info" @click="submit"> 登录 </nut-button>
    </nut-form>
</template>

<script setup name="DemoPage" lang="tsx">
  import { setLang } from '@/i18n';
  import { useI18n } from 'vue-i18n';
  const { locale } = useI18n();

  // import router from '@/router';
  import { useUserStore } from '@/store/modules/user';
  import { openFactoryModal } from '@/components/Modal/index';

  let cellList = ['vue3', 'vite', 'vue-router', 'axios', 'Pinia', 'vue-i18n', 'postcss-px-to-viewport', 'varlet / vant / nutUI', 'eruda'];


  const openLargeModal = () => {
    openFactoryModal({
      renderComp: function () {
        return <div>自定义内容</div>;
      },
    }).then((res) => {
      console.log('确认成功', res);
    });
  };
  const openSmallModal = () => {
    openFactoryModal({
      size: 'normal',
      renderComp: function () {
        return <div>自定义内容</div>;
      },
    }).then((res) => {
      console.log('确认成功', res);
    });
  };


  const userStore = useUserStore();
  const formData = reactive({
    name: '1',
    pwd: '2',
  });
  const ruleForm = ref<any>(null);
  const submit = () => {
    ruleForm.value.validate().then(async ({ valid, errors }: any) => {
      if (valid) {
        const userInfo = await userStore.login();
        console.log(userInfo)
      } else {
        console.log('error submit!!', errors);
      }
    });
  };
  // 切换语言
  const changeLang = (type) => {
    setLang(type);
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/mixin.scss';

  section {
    .title {
      display: inline-block;
      margin-bottom: 40px;
      font-size: 40px;
      font-weight: 500;
    }

    &:nth-child(n) {
      .title {
        margin-top: 20px;
      }
    }

    &:first-child {
      .title {
        margin-top: 0;
      }
    }

    ::v-deep(.var-space) {
      margin-bottom: 10px !important;
    }
  }

  .demo {
    > :nth-child(n) {
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
</style>
