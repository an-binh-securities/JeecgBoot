import { Ref } from 'vue';
import { duplicateCheckDelay } from '/@/views/system/user/user.api';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { findTree } from '/@/utils/common/compUtils';

// Thông tin người dùng columns
export const userInfoColumns: BasicColumn[] = [
  {
    title: 'Tài khoản người dùng',
    dataIndex: 'username',
    width: 150,
  },
  {
    title: 'Tên người dùng',
    dataIndex: 'realname',
    width: 180,
  },
  {
    title: 'Bộ phận',
    dataIndex: 'orgCode',
    width: 200,
  },
  {
    title: 'Giới tính',
    dataIndex: 'sex_dictText',
    width: 80,
  },
  {
    title: 'Điện thoại',
    dataIndex: 'phone',
    width: 120,
  },
];

// Thông tin người dùng tìm kiếm điều kiện biểu mẫu
export const userInfoSearchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: 'Tài khoản người dùng',
    component: 'Input',
  },
];

// Vai trò bộ phận columns
export const departRoleColumns: BasicColumn[] = [
  {
    title: 'Tên vai trò bộ phận',
    dataIndex: 'roleName',
    width: 100,
  },
  {
    title: 'Mã vai trò bộ phận',
    dataIndex: 'roleCode',
    width: 100,
  },
  {
    title: 'Bộ phận',
    dataIndex: 'departId_dictText',
    width: 100,
  },
  {
    title: 'Ghi chú',
    dataIndex: 'description',
    width: 100,
  },
];

// Vai trò bộ phận tìm kiếm điều kiện biểu mẫu
export const departRoleSearchFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: 'Tên vai trò bộ phận',
    component: 'Input',
  },
];

// Vai trò bộ phận cửa sổ bật lên form biểu mẫu
export const departRoleModalFormSchema: FormSchema[] = [
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'roleName',
    label: 'Tên vai trò bộ phận',
    component: 'Input',
    rules: [
      { required: true, message: 'Tên vai trò bộ phận không được để trống!' },
      { min: 2, max: 30, message: 'Độ dài từ 2 đến 30 ký tự', trigger: 'blur' },
    ],
  },
  {
    field: 'roleCode',
    label: 'Mã vai trò bộ phận',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
    dynamicRules: ({ model }) => {
      return [
        { required: true, message: 'Mã vai trò bộ phận không được để trống!' },
        { min: 0, max: 64, message: 'Độ dài không quá 64 ký tự', trigger: 'blur' },
        {
          validator: (_, value) => {
            if (/[\u4E00-\u9FA5]/g.test(value)) {
              return Promise.reject('Mã vai trò bộ phận không được nhập ký tự Trung Quốc!');
            }
            return new Promise((resolve, reject) => {
              let params = {
                tableName: 'sys_depart_role',
                fieldName: 'role_code',
                fieldVal: value,
                dataId: model.id,
              };
              duplicateCheckDelay(params)
                .then((res) => {
                  res.success ? resolve() : reject(res.message || 'Kiểm tra thất bại');
                })
                .catch((err) => {
                  reject(err.message || 'Xác minh thất bại');
                });
            });
          },
        },
      ];
    },
  },
  {
    field: 'description',
    label: 'Mô tả',
    component: 'Input',
    rules: [{ min: 0, max: 126, message: 'Độ dài không quá 126 ký tự', trigger: 'blur' }],
  },
];

// Biểu mẫu thông tin cơ bản
export function useBaseInfoForm(treeData: Ref<any[]>) {
  const descItems: DescItem[] = [
    {
      field: 'departName',
      label: 'Tên cơ quan',
    },
    {
      field: 'parentId',
      label: 'Bộ phận cấp trên',
      render(val) {
        if (val) {
          let data = findTree(treeData.value, (item) => item.key == val);
          return data?.title ?? val;
        }
        return val;
      },
    },
    {
      field: 'orgCode',
      label: 'Mã cơ quan',
    },
    {
      field: 'orgCategory',
      label: 'Loại cơ quan',
      render(val) {
        if (val === '1') {
          return 'Công ty';
        } else if (val === '2') {
          return 'Bộ phận';
        } else if (val === '3') {
          return 'Vị trí';
        }
        return val;
      },
    },
    {
      field: 'departOrder',
      label: 'Thứ tự',
    },

    {
      field: 'mobile',
      label: 'Số điện thoại',
    },
    {
      field: 'address',
      label: 'Địa chỉ',
    },
    {
      field: 'memo',
      label: 'Ghi chú',
    },
  ];

  return { descItems };
}
