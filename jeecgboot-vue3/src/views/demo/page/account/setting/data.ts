import { FormSchema } from '/@/components/Form/index';
import { rules } from '/@/utils/helper/validator';

export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: '基本设置',
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: '安全设置',
    component: 'SecureSetting',
  },
  /* {
    key: '3',
    name: '账号绑定',
    component: 'AccountBind',
  },
  {
    key: '4',
    name: '新消息通知',
    component: 'MsgNotify',
  },*/
];

// 基础设置 form
export const baseSetschemas: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'realname',
    component: 'Input',
    label: '昵称',
    colProps: { span: 18 },
  },
  {
    field: 'sex',
    label: '性别',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
      placeholder: '请选择性别',
      stringToNumber: true,
    },
    colProps: { span: 18 },
  },
  {
    label: '生日',
    field: 'birthday',
    component: 'DatePicker',
    colProps: { span: 18 },
  },
  {
    field: 'email',
    component: 'Input',
    label: '邮箱',
    colProps: { span: 18 },
  },
  {
    field: 'phone',
    component: 'Input',
    label: '联系电话',
    dynamicRules: ({ model, schema }) => {
      return [
        { ...rules.duplicateCheckRule('sys_user', 'phone', model, schema, false)[0] },
        { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式有误' },
      ];
    },
    colProps: { span: 18 },
  },
];

// 安全设置 list
export const secureSettingList: ListItem[] = [
  {
    key: '1',
    title: 'Mật khẩu tài khoản',
    description: 'Độ mạnh mật khẩu hiện tại: Mạnh',
    extra: 'Chỉnh sửa',
  },
  {
    key: '2',
    title: 'Số điện thoại bảo mật',
    description: 'Đã liên kết số điện thoại: 138****8293',
    extra: 'Chỉnh sửa',
  },
  {
    key: '3',
    title: 'Câu hỏi bảo mật',
    description: 'Chưa thiết lập câu hỏi bảo mật, câu hỏi bảo mật có thể bảo vệ tài khoản hiệu quả',
    extra: 'Chỉnh sửa',
  },
  {
    key: '4',
    title: 'Email dự phòng',
    description: 'Đã liên kết email: ant***sign.com',
    extra: 'Chỉnh sửa',
  },
  {
    key: '5',
    title: 'Thiết bị MFA',
    description: 'Chưa liên kết thiết bị MFA, sau khi liên kết, có thể thực hiện xác nhận hai bước',
    extra: 'Chỉnh sửa',
  },
];

// 账号绑定 list
export const accountBindList: ListItem[] = [
  {
    key: '1',
    title: '绑定淘宝',
    description: '当前未绑定淘宝账号',
    extra: '绑定',
    avatar: 'ri:taobao-fill',
    color: '#ff4000',
  },
  {
    key: '2',
    title: '绑定支付宝',
    description: '当前未绑定支付宝账号',
    extra: '绑定',
    avatar: 'fa-brands:alipay',
    color: '#2eabff',
  },
  {
    key: '3',
    title: '绑定钉钉',
    description: '当前未绑定钉钉账号',
    extra: '绑定',
    avatar: 'ri:dingding-fill',
    color: '#2eabff',
  },
];

// 新消息通知 list
export const msgNotifyList: ListItem[] = [
  {
    key: '1',
    title: '账户密码',
    description: '其他用户的消息将以站内信的形式通知',
  },
  {
    key: '2',
    title: '系统消息',
    description: '系统消息将以站内信的形式通知',
  },
  {
    key: '3',
    title: '待办任务',
    description: '待办任务将以站内信的形式通知',
  },
];
