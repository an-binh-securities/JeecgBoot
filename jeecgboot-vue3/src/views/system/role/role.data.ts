import { FormSchema } from '/@/components/Table';
import { isRoleExist } from './role.api';
export const columns = [
  {
    title: 'Tên vai trò',
    dataIndex: 'roleName',
    width: 100,
  },
  {
    title: 'Mã vai trò',
    dataIndex: 'roleCode',
    width: 100,
  },
  {
    title: 'Thời gian tạo',
    dataIndex: 'createTime',
    width: 100,
  },
];
/**
 * Cột người dùng vai trò
 */
export const userColumns = [
  {
    title: 'Tài khoản người dùng',
    dataIndex: 'username',
  },
  {
    title: 'Tên người dùng',
    dataIndex: 'realname',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status_dictText',
    width: 80,
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: 'Tên vai trò',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'roleCode',
    label: 'Mã vai trò',
    component: 'Input',
    colProps: { span: 6 },
  },
];
/**
 * Biểu mẫu tìm kiếm người dùng vai trò
 */
export const searchUserFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: 'Tài khoản người dùng',
    component: 'Input',
    colProps: { span: 12 },
    labelWidth: 74,
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '',
    component: 'Input',
    show: false,
  },
  {
    field: 'roleName',
    label: 'Tên vai trò',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleCode',
    label: 'Mã vai trò',
    required: true,
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
    dynamicRules: ({ values, model }) => {
      console.log('values:', values);
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('Vui lòng nhập mã vai trò');
            }
            if (values) {
              return new Promise((resolve, reject) => {
                isRoleExist({ id: model.id, roleCode: value })
                  .then((res) => {
                    res.success ? resolve() : reject(res.message || 'Xác minh thất bại');
                  })
                  .catch((err) => {
                    reject(err.message || 'Xác minh thất bại');
                  });
              });
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
  {
    label: 'Ghi chú',
    field: 'description',
    component: 'InputTextArea',
  },
];

export const formDescSchema = [
  {
    field: 'roleName',
    label: 'Tên vai trò',
  },
  {
    field: 'roleCode',
    label: 'Mã vai trò',
  },
  {
    label: 'Ghi chú',
    field: 'description',
  },
];

export const roleIndexFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '',
    component: 'Input',
    show: false,
  },
  {
    label: 'Mã vai trò',
    field: 'roleCode',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: 'Đường dẫn trang chủ',
    field: 'url',
    component: 'Input',
    required: true,
    helpMessage: 'Địa chỉ truy cập của đường dẫn trang chủ',
  },
  {
    label: 'Địa chỉ thành phần',
    field: 'component',
    component: 'Input',
    helpMessage: 'Địa chỉ thành phần của đường dẫn trang chủ',
    componentProps: {
      placeholder: 'Vui lòng nhập thành phần giao diện',
    },
    required: true,
  },
  {
    field: 'route',
    label: 'Có phải là menu điều hướng không',
    helpMessage: 'Nếu không phải là menu điều hướng, cần bật để đặt làm trang chủ',
    component: 'Switch',
    defaultValue: true
  },
  {
    label: 'Ưu tiên',
    field: 'priority',
    component: 'InputNumber',
  },
  {
    label: 'Có bật không',
    field: 'status',
    component: 'JSwitch',
    componentProps: {
      options: ['1', '0'],
    },
  },
];
