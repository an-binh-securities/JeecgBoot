import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getAllRolesListNoByTenant, getAllTenantList } from './user.api';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
export const columns: BasicColumn[] = [
  {
    title: 'Tài khoản người dùng',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: 'Tên người dùng',
    dataIndex: 'realname',
    width: 100,
  },
  {
    title: 'Ảnh đại diện',
    dataIndex: 'avatar',
    width: 120,
    customRender: render.renderAvatar,
  },
  {
    title: 'Giới tính',
    dataIndex: 'sex',
    width: 80,
    sorter: true,
    customRender: ({ text }) => {
      return render.renderDict(text, 'sex');
    },
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'birthday',
    width: 100,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    width: 100,
  },
  {
    title: 'Phòng ban',
    width: 150,
    dataIndex: 'orgCodeTxt',
  },
  {
    title: 'Phòng ban phụ trách',
    width: 150,
    dataIndex: 'departIds_dictText',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status_dictText',
    width: 80,
  },
];

export const recycleColumns: BasicColumn[] = [
  {
    title: 'Tài khoản người dùng',
    dataIndex: 'username',
    width: 100,
  },
  {
    title: 'Tên người dùng',
    dataIndex: 'realname',
    width: 100,
  },
  {
    title: 'Ảnh đại diện',
    dataIndex: 'avatar',
    width: 80,
    customRender: render.renderAvatar,
  },
  {
    title: 'Giới tính',
    dataIndex: 'sex',
    width: 80,
    sorter: true,
    customRender: ({ text }) => {
      return render.renderDict(text, 'sex');
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: 'Tài khoản',
    field: 'username',
    component: 'JInput',
    //colProps: { span: 6 },
  },
  {
    label: 'Tên',
    field: 'realname',
    component: 'JInput',
   //colProps: { span: 6 },
  },
  {
    label: 'Giới tính',
    field: 'sex',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
      placeholder: 'Vui lòng chọn giới tính',
      stringToNumber: true,
    },
    //colProps: { span: 6 },
  },
  {
    label: 'Số điện thoại',
    field: 'phone',
    component: 'Input',
    //colProps: { span: 6 },
  },
  {
    label: 'Trạng thái người dùng',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'user_status',
      placeholder: 'Vui lòng chọn trạng thái',
      stringToNumber: true,
    },
   //colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: 'Tài khoản người dùng',
    field: 'username',
    component: 'Input',
    required: true,
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
    dynamicRules: ({ model, schema }) => rules.duplicateCheckRule('sys_user', 'username', model, schema, true),
  },
  {
    label: 'Mật khẩu đăng nhập',
    field: 'password',
    component: 'StrengthMeter',
    componentProps:{
      autocomplete: 'new-password',
    },
    rules: [
      {
        required: true,
        message: 'Vui lòng nhập mật khẩu đăng nhập',
      },
      {
        pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{8,}$/,
        message: 'Mật khẩu phải bao gồm 8 ký tự, chữ hoa, chữ thường và ký tự đặc biệt!',
      },
    ],
  },
  {
    label: 'Xác nhận mật khẩu',
    field: 'confirmPassword',
    component: 'InputPassword',
    dynamicRules: ({ values }) => rules.confirmPassword(values, true),
  },
  {
    label: 'Tên người dùng',
    field: 'realname',
    required: true,
    component: 'Input',
  },
  {
    label: 'Mã công việc',
    field: 'workNo',
    required: true,
    component: 'Input',
    dynamicRules: ({ model, schema }) => rules.duplicateCheckRule('sys_user', 'work_no', model, schema, true),
  },
  {
    label: 'Chức vụ',
    field: 'post',
    required: false,
    component: 'JSelectPosition',
    componentProps: {
      labelKey: 'name',
    },
  },
  {
    label: 'Vai trò',
    field: 'selectedroles',
    component: 'ApiSelect',
    componentProps: {
      mode: 'multiple',
      api: getAllRolesListNoByTenant,
      labelField: 'roleName',
      valueField: 'id',
      immediate: false,
    },
  },
  {
    label: 'Phòng ban',
    field: 'selecteddeparts',
    component: 'JSelectDept',
    componentProps: ({ formActionType, formModel }) => {
      return {
        sync: false,
        checkStrictly: true,
        defaultExpandLevel: 2,

        onSelect: (options, values) => {
          const { updateSchema } = formActionType;
          // Cập nhật dữ liệu phòng ban phụ trách sau khi thay đổi phòng ban
          updateSchema([
            {
              field: 'departIds',
              componentProps: { options },
            },
          ]);
          //update-begin---author:wangshuai---date:2024-05-11---for:【issues/1222】Liên kết giữa "Phòng ban" và "Phòng ban phụ trách" trong giao diện chỉnh sửa người dùng---
          if(!values){
            formModel.departIds = [];
            return;
          }
          //update-end---author:wangshuai---date:2024-05-11---for:【issues/1222】Liên kết giữa "Phòng ban" và "Phòng ban phụ trách" trong giao diện chỉnh sửa người dùng---
          // Cập nhật dữ liệu phòng ban phụ trách sau khi thay đổi phòng ban
          formModel.departIds && (formModel.departIds = formModel.departIds.filter((item) => values.value.indexOf(item) > -1));
        },
      };
    },
  },
  {
    label: 'Thuê bao',
    field: 'relTenantIds',
    component: 'ApiSelect',
    componentProps: {
      mode: 'multiple',
      api: getAllTenantList,
      numberToString: true,
      labelField: 'name',
      valueField: 'id',
      immediate: false,
    },
  },
  {
    label: 'Danh tính',
    field: 'userIdentity',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: ({ formModel }) => {
      return {
        options: [
          { label: 'Người dùng bình thường', value: 1, key: '1' },
          { label: 'Cấp trên', value: 2, key: '2' },
        ],
        onChange: () => {
          formModel.userIdentity == 1 && (formModel.departIds = []);
        },
      };
    },
  },
  {
    label: 'Phòng ban phụ trách',
    field: 'departIds',
    component: 'Select',
    componentProps: {
      mode: 'multiple',
    },
    ifShow: ({ values }) => values.userIdentity == 2,
  },
  {
    label: 'Ảnh đại diện',
    field: 'avatar',
    component: 'JImageUpload',
    componentProps: {
      fileMax: 1,
    },
  },
  {
    label: 'Ngày sinh',
    field: 'birthday',
    component: 'DatePicker',
  },
  {
    label: 'Giới tính',
    field: 'sex',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
      placeholder: 'Vui lòng chọn giới tính',
      stringToNumber: true,
    },
  },
  {
    label: 'Email',
    field: 'email',
    component: 'Input',
    required: true,
    dynamicRules: ({ model, schema }) => {
      return [
        { ...rules.duplicateCheckRule('sys_user', 'email', model, schema, true)[0], trigger: 'blur' },
        { ...rules.rule('email', false)[0], trigger: 'blur' },
      ];
    },
  },
  {
    label: 'Số điện thoại',
    field: 'phone',
    component: 'Input',
    required: true,
    dynamicRules: ({ model, schema }) => {
      return [
        { ...rules.duplicateCheckRule('sys_user', 'phone', model, schema, true)[0], trigger: 'blur' },
        { pattern: /^1[3456789]\d{9}$/, message: 'Định dạng số điện thoại không đúng', trigger: 'blur' },
      ];
    },
  },
  {
    label: 'Điện thoại bàn',
    field: 'telephone',
    component: 'Input',
    rules: [{ pattern: /^0\d{2,3}-[1-9]\d{6,7}$/, message: 'Vui lòng nhập số điện thoại bàn đúng' }],
  },
  {
    label: 'Động cơ làm việc',
    field: 'activitiSync',
    defaultValue: 1,
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'activiti_sync',
      type: 'radio',
      stringToNumber: true,
    },
  },
];

export const formPasswordSchema: FormSchema[] = [
  {
    label: 'Tài khoản người dùng',
    field: 'username',
    component: 'Input',
    componentProps: { readOnly: true },
  },
  {
    label: 'Mật khẩu đăng nhập',
    field: 'password',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: 'Vui lòng nhập mật khẩu đăng nhập',
    },
    rules: [
      {
        required: true,
        message: 'Vui lòng nhập mật khẩu đăng nhập',
      },
      {
        pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{8,}$/,
        message: 'Mật khẩu phải bao gồm 8 ký tự, chữ hoa, chữ thường và ký tự đặc biệt!',
      },
    ],
  },
  {
    label: 'Xác nhận mật khẩu',
    field: 'confirmPassword',
    component: 'InputPassword',
    dynamicRules: ({ values }) => rules.confirmPassword(values, true),
  },
];

export const formAgentSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'userName',
    label: 'Tên người dùng',
    component: 'Input',
    componentProps: {
      readOnly: true,
      allowClear: false,
    },
  },
  {
    field: 'agentUserName',
    label: 'Tên người dùng đại lý',
    required: true,
    component: 'JSelectUser',
    componentProps: {
      rowKey: 'username',
      labelKey: 'realname',
      maxSelectCount: 10,
    },
  },
  {
    field: 'startTime',
    label: 'Thời gian bắt đầu đại lý',
    component: 'DatePicker',
    required: true,
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: 'Vui lòng chọn thời gian bắt đầu đại lý',
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'endTime',
    label: 'Thời gian kết thúc đại lý',
    component: 'DatePicker',
    required: true,
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: 'Vui lòng chọn thời gian kết thúc đại lý',
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'status',
    label: 'Trạng thái',
    component: 'JDictSelectTag',
    defaultValue: '1',
    componentProps: {
      dictCode: 'valid_status',
      type: 'radioButton',
    },
  },
];

export const formQuitAgentSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'userName',
    label: 'Tên người dùng',
    component: 'Input',
    componentProps: {
      readOnly: true,
      allowClear: false,
    },
  },
  {
    field: 'agentUserName',
    label: 'Người giao nhận',
    //required: true,
    component: 'JSelectUser',
    componentProps: {
      rowKey: 'username',
      labelKey: 'realname',
      maxSelectCount: 1,
    },
  },
  {
    field: 'startTime',
    label: 'Thời gian bắt đầu giao nhận',
    component: 'DatePicker',
    //required: true,
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: 'Vui lòng chọn thời gian bắt đầu giao nhận',
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'endTime',
    label: 'Thời gian kết thúc giao nhận',
    component: 'DatePicker',
    //required: true,
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: 'Vui lòng chọn thời gian kết thúc giao nhận',
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'status',
    label: 'Trạng thái',
    component: 'JDictSelectTag',
    defaultValue: '1',
    componentProps: {
      dictCode: 'valid_status',
      type: 'radioButton',
    },
  },
];

//Danh sách người dùng thuê
export const userTenantColumns: BasicColumn[] = [
  {
    title: 'Tài khoản người dùng',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: 'Tên người dùng',
    dataIndex: 'realname',
    width: 100,
  },
  {
    title: 'Ảnh đại diện',
    dataIndex: 'avatar',
    width: 120,
    customRender: render.renderAvatar,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    width: 100,
  },
  {
    title: 'Phòng ban',
    width: 150,
    dataIndex: 'orgCodeTxt',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    width: 80,
    customRender: ({ text }) => {
      if (text === '1') {
        return 'Bình thường';
      } else if (text === '3') {
        return 'Đang phê duyệt';
      } else {
        return 'Đã từ chối';
      }
    },
  },
];

//Biểu mẫu tìm kiếm người dùng thuê
export const userTenantFormSchema: FormSchema[] = [
  {
    label: 'Tài khoản',
    field: 'username',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: 'Tên',
    field: 'realname',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: 'Giới tính',
    field: 'sex',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
      placeholder: 'Vui lòng chọn giới tính',
      stringToNumber: true,
    },
    colProps: { span: 6 },
  },
];
