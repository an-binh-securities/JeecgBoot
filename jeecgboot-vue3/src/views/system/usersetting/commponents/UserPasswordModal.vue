<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="Đổi mật khẩu" @ok="handleSubmit" destroyOnClose :width="400">
    <a-form class="antd-modal-form" ref="formRef" :model="formState" :rules="validatorRules">
      <a-form-item name="phone">
        <div class="black font-size-13">Xác minh số điện thoại</div>
        <div class="pass-padding">
          <a-input placeholder="Vui lòng nhập số điện thoại" v-model:value="formState.phone" />
        </div>
      </a-form-item>
      <a-form-item name="smscode">
        <CountdownInput v-model:value="formState.smscode" placeholder="Vui lòng nhập mã xác minh 6 chữ số" :sendCodeApi="sendCodeApi" />
      </a-form-item>
      <a-form-item name="password">
        <span class="black font-size-13">Mật khẩu mới</span>
        <div class="pass-padding">
          <a-input-password v-model:value="formState.password" placeholder="Mật khẩu mới" autocomplete="new-password" />
        </div>
        <span class="gray-9e font-size-13">8-20 ký tự, bao gồm chữ cái và số</span>
      </a-form-item>
    </a-form>
  </BasicModal>
</template>
<script lang="ts" name="user-pass-word-modal" setup>
  import { ref, computed, unref, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Rule } from '/@/components/Form/index';
  import { updateUserPassword } from '../UserSetting.api';
  import { useMessage } from "/@/hooks/web/useMessage";
  import { useUserStore, useUserStoreWithOut } from "/@/store/modules/user";
  import { getCaptcha } from "@/api/sys/user";
  import { SmsEnum } from "@/views/sys/login/useLogin";
  import { CountdownInput } from '/@/components/CountDown';
  import { defHttp } from "@/utils/http/axios";

  const { createMessage, createErrorModal } = useMessage();
  //用户名
  const username = ref<string>('')
  const formRef = ref();
  const formState = reactive({
    oldpassword:'',
    password:'',
    smscode:'',
    phone:'',
  });
  // 声明Emits
  const emit = defineEmits(['success', 'register']);
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    username.value = data.record.username
    Object.assign(formState, { password:'', smscode:'', phone:'',})
  });
  const userStore = useUserStore();
  const validatorRules: Record<string, Rule[]> = {
    password: [{ required: true, validator: checkPassword }, { pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,20})$/, message: '8-20 ký tự, bao gồm chữ cái và số' }],
    phone: [{ required: true, message: 'Vui lòng nhập số điện thoại' }],
    smscode: [{ required: true, message: 'Vui lòng nhập mã xác minh 6 chữ số' }],
  };

  //表单提交事件
  async function handleSubmit() {
    try {
      let values = await formRef.value.validateFields();
      setModalProps({ confirmLoading: true });
      //提交表单
      values.username = unref(username);
      await updateUserPassword(values).then((res) =>{
        if(res.success){
          createMessage.info({
            content: 'Đổi mật khẩu thành công, vui lòng đăng nhập lại! Tự động đăng xuất sau 3 giây',
            duration: 3
          })
          //3s后返回登录页面
          setTimeout(()=>{
            userStore.logout(true);
          },3000)
          //关闭弹窗
          closeModal();
        }else{
          createMessage.warn(res.message);
        }
      });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  /**
   * 验证新密码是否为空
   */
  function checkPassword(_rule: Rule, value: string) {
    if(value === ''){
      return Promise.reject('Vui lòng nhập mật khẩu mới');
    }
    return Promise.resolve();
  }

  /**
   * 倒计时执行前的函数
   */
  function sendCodeApi() {
    return new Promise((resolve, reject) => {
      let params = { mobile: formState.phone };
      defHttp.post({ url: "/sys/sendChangePwdSms", params }, { isTransformResponse: false }).then((res) => {
        if (res.success) {
          resolve(true);
        } else {
          createErrorModal({ title: 'Lỗi', content: res.message || 'Lỗi không xác định' });
          reject();
        }
      }).catch((res)=>{
        createErrorModal({ title: 'Lỗi', content: res.message || 'Lỗi không xác định' });
        reject();
      });
    });
  }
</script>
<style lang="less" scoped>
  .black {
    color: @text-color;
  }
  .font-size-13 {
    font-size: 13px;
    line-height: 15px;
  }
  .gray-9e {
    color: #9e9e9e;
  }
  .float-left {
    float: left;
  }
  .pass-padding {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .antd-modal-form {
    padding: 10px 24px 10px 24px;
  }
  :deep(.ant-form-item){
    margin-bottom: 10px;
  }
</style>
