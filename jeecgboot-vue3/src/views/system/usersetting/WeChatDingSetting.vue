<template>
  <div :class="[`${prefixCls}`]">
    <div class="my-account">Ứng dụng bên thứ ba</div>
    <div class="account-row-item">
      <div class="account-label gray-75">Liên kết DingTalk</div>
      <span>
        <DingtalkCircleFilled :style="!bindDingData.sysUserId ? { color: '#9e9e9e' } : { color: '#007FFF' }" class="item-icon" />
        <span class="gray-75" style="margin-left: 12px">DingTalk</span>
        <span class="gray-75" style="margin-left: 8px" v-if="bindDingData.realname">{{ 'Đã liên kết: ' + bindDingData.realname }}</span>
        <span class="blue-e5 pointer" style="margin-left: 24px" @click="dingDingBind">{{ !bindDingData.sysUserId ? 'Liên kết' : 'Hủy liên kết' }}</span>
      </span>
    </div>
    <div class="account-row-item">
      <div class="account-label gray-75">Liên kết tài khoản</div>
      <span>
        <WechatFilled :style="!bindWechatData.sysUserId ? { color: '#9e9e9e' } : { color: '#1ec563' }" class="item-icon" />
        <span class="gray-75" style="margin-left: 12px">WeChat</span>
        <span class="gray-75" style="margin-left: 8px" v-if="bindWechatData.realname">{{ 'Đã liên kết: ' + bindWechatData.realname }}</span>
        <span class="blue-e5 pointer" style="margin-left: 24px" @click="wechatBind">{{ !bindWechatData.sysUserId ? 'Liên kết' : 'Hủy liên kết' }}</span>
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup name="we-chat-ding-setting">
  import { onMounted, ref, reactive, unref } from 'vue';
  import { CollapseContainer } from '/@/components/Container';
  import { bindThirdAppAccount, deleteThirdAccount, getThirdAccountByUserId } from './UserSetting.api';
  import { useUserStore } from '/@/store/modules/user';
  import { useModal } from '/@/components/Modal';
  import { DingtalkCircleFilled, createFromIconfontCN, WechatFilled } from '@ant-design/icons-vue';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Modal } from 'ant-design-vue';
  import { useDesign } from '/@/hooks/web/useDesign';

  const { prefixCls } = useDesign('j-user-tenant-setting-container');

  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2316098_umqusozousr.js',
  });
  const userStore = useUserStore();

  //绑定微信的数据
  const bindWechatData = ref<any>({});
  //绑定钉钉的数据
  const bindDingData = ref<any>({});
  //绑定企业微信的数据
  const bindEnterpriseData = ref<any>({});

  const glob = useGlobSetting();
  //第三方类型
  const thirdType = ref('');
  //第三方用户UUID
  const thirdUserUuid = ref('');
  //第三方详情
  const thirdDetail = ref<any>({});
  const { createMessage } = useMessage();
  //windows对象，用于关闭窗口事件
  const windowsIndex = ref<any>('');
  //窗口监听事件
  const receiveMessage = ref<any>('');
  
  /**
   * 初始化钉钉和企业微信数据
   */
  async function initUserDetail() {
    let values = await getThirdAccountByUserId({ thirdType: 'wechat_open,dingtalk,wechat_enterprise' });
    bindWechatData.value = "";
    bindDingData.value = "";
    bindEnterpriseData.value = "";
    if (values && values.result) {
      let result = values.result;
      for (let i = 0; i < result.length; i++) {
        setThirdDetail(result[i]);
      }
    }
  }

  /**
   * 企业微信绑定解绑事件
   */
  function wechatEnterpriseBind() {
    console.log('Sự kiện liên kết/hủy liên kết WeChat doanh nghiệp');
    let data = unref(bindEnterpriseData);
    if (!data.sysUserId) {
      onThirdLogin('wechat_enterprise');
    } else {
      deleteAccount({ sysUserId: data.sysUserId, id: data.id }, 'WeChat doanh nghiệp');
    }
  }

  /**
   * Sự kiện liên kết/hủy liên kết DingTalk
   */
  function dingDingBind() {
    let data = unref(bindDingData);
    if (!data.sysUserId) {
      onThirdLogin('dingtalk');
    } else {
      deleteAccount({ sysUserId: data.sysUserId, id: data.id }, 'DingTalk');
    }
    console.log('Sự kiện liên kết/hủy liên kết DingTalk');
  }

  /**
   * 微信绑定
   */
  function wechatBind() {
    let data = unref(bindWechatData);
    if (!data.sysUserId) {
      onThirdLogin('wechat_open');
    }else{
      deleteAccount({ sysUserId: data.sysUserId, id: data.id }, 'WeChat');
    }
  }

  /**
   * 第三方登录
   * @param source
   */
  function onThirdLogin(source) {
    let url = `${glob.uploadUrl}/sys/thirdLogin/render/${source}`;
    //窗口为不空关闭
    console.log("unref(windowsIndex) ::",unref(windowsIndex))
    if(unref(windowsIndex)){
      //确保只有一个窗口
      windowsIndex.value.close();
      //确保只有一个监听
      window.removeEventListener('message', unref(receiveMessage),false);
    }
    
    windowsIndex.value = window.open(
      url,
      `login ${source}`,
      'height=500, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no'
    );
    thirdType.value = source;
    receiveMessage.value = async function (event) {
      let token = event.data;
      if (typeof token === 'string') {
        //如果是字符串类型 说明是token信息
        if (token === 'Đăng nhập thất bại') {
          cmsFailed();
        } else if (token.includes('Liên kết số điện thoại')) {
          let strings = token.split(',');
          thirdUserUuid.value = strings[1];
          await bindThirdAccount();
        } else {
          if (token) {
            createMessage.warning('Tài khoản QiaoQiaoYun này đã được liên kết với tài khoản bên thứ ba khác, vui lòng hủy liên kết hoặc liên kết với tài khoản QiaoQiaoYun khác');
          }
        }
      } else {
        cmsFailed();
      }
      window.removeEventListener('message', unref(receiveMessage),false);
      windowsIndex.value = "";
    };
    window.addEventListener('message', unref(receiveMessage), false);
  }

  /**
   * 绑定当前用户
   */
  async function bindThirdAccount() {
    if (!unref(thirdUserUuid)) {
      cmsFailed();
      return;
    }
    let params = { thirdUserUuid: unref(thirdUserUuid), thirdType: unref(thirdType) };
    await bindThirdAppAccount(params)
      .then((res) => {
        if (res.success) {
          if (res.result) {
            setThirdDetail(res.result);
          }
        } else {
          createMessage.warning(res.message);
        }
      })
      .catch((res) => {
        createMessage.warning(res.message);
      });
  }

  /**
   * 失败提示信息
   */
  function cmsFailed() {
    createMessage.warning('Liên kết tài khoản bên thứ ba không thành công');
    return;
  }

  /**
   * 设置第三方数据
   * @param value
   */
  function setThirdDetail(value) {
    let type = value.thirdType;
    if (type == 'wechat_open') {
      bindWechatData.value = value;
    } else if (type == 'dingtalk') {
      bindDingData.value = value;
    } else if (type == 'wechat_enterprise') {
      bindEnterpriseData.value = value;
    }
  }

  /**
   * 删除第三方信息表
   * @param params
   */
  async function deleteAccount(params, text) {
    Modal.confirm({
      title: 'Hủy liên kết ' + text,
      content: 'Bạn có chắc chắn muốn hủy liên kết không?',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk: async () => {
        await deleteThirdAccount(params).then((res) =>{
          if(res.success){
            initUserDetail();
            createMessage.success(res.message)
          }else{
            createMessage.warning(res.message)
          }
        });
      },
    });
  }

  onMounted(() => {
    initUserDetail();
  });
</script>
<style lang="less">
// update-begin-author:liusq date:20230625 for: [issues/563]暗色主题部分失效
@prefix-cls: ~'@{namespace}-j-user-tenant-setting-container';
.@{prefix-cls} {
   padding: 30px 40px 0 20px;
  .account-row-item {
    align-items: center;
    /*begin 兼容暗夜模式*/
    border-bottom: 1px solid @border-color-base;
    /*end 兼容暗夜模式*/
    box-sizing: border-box;
    display: flex;
    height: 71px;
    position: relative;
  }

  .account-label {
    text-align: left;
    width: 160px;
  }

  .gray-75 {
    /*begin 兼容暗夜模式*/
    color: @text-color !important;
    /*end 兼容暗夜模式*/
  }

  .pointer {
    cursor: pointer;
  }

  .blue-e5 {
    color: #1e88e5;
  }

  .phone-margin {
    margin-left: 24px;
    margin-right: 24px;
  }

  .clearfix:after {
    clear: both;
  }

  .clearfix:before {
    content: '';
    display: table;
  }

  .my-account {
    font-size: 17px;
    font-weight: 700 !important;
    /*begin 兼容暗夜模式*/
    color: @text-color !important;
    /*end 兼容暗夜模式*/
    margin-bottom: 20px;
  }
  .item-icon {
    font-size: 16px !important;
  }
}
// update-end-author:liusq date:20230625 for: [issues/563]暗色主题部分失效
</style>
