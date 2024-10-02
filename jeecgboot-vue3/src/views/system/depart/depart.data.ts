import { FormSchema } from '/@/components/Form';

// Biểu mẫu cơ bản của bộ phận
export function useBasicFormSchema() {
  const basicFormSchema: FormSchema[] = [
    {
      field: 'departName',
      label: 'Tên cơ quan',
      component: 'Input',
      componentProps: {
        placeholder: 'Vui lòng nhập tên cơ quan/bộ phận',
      },
      rules: [{ required: true, message: 'Tên cơ quan không được để trống' }],
    },
    {
      field: 'parentId',
      label: 'Bộ phận cấp trên',
      component: 'TreeSelect',
      componentProps: {
        treeData: [],
        placeholder: 'Không có',
        dropdownStyle: { maxHeight: '200px', overflow: 'auto' },
      },
    },
    {
      field: 'orgCode',
      label: 'Mã cơ quan',
      component: 'Input',
      componentProps: {
        placeholder: 'Vui lòng nhập mã cơ quan',
      },
    },
    {
      field: 'orgCategory',
      label: 'Loại cơ quan',
      component: 'RadioButtonGroup',
      componentProps: { options: [] },
    },
    {
      field: 'departOrder',
      label: 'Thứ tự',
      component: 'InputNumber',
      componentProps: {},
    },
    {
      field: 'mobile',
      label: 'Điện thoại',
      component: 'Input',
      componentProps: {
        placeholder: 'Vui lòng nhập điện thoại',
      },
    },
    {
      field: 'fax',
      label: 'Fax',
      component: 'Input',
      componentProps: {
        placeholder: 'Vui lòng nhập fax',
      },
    },
    {
      field: 'address',
      label: 'Địa chỉ',
      component: 'Input',
      componentProps: {
        placeholder: 'Vui lòng nhập địa chỉ',
      },
    },
    {
      field: 'memo',
      label: 'Ghi chú',
      component: 'InputTextArea',
      componentProps: {
        placeholder: 'Vui lòng nhập ghi chú',
      },
    },
  ];
  return { basicFormSchema };
}

// Tùy chọn loại cơ quan
export const orgCategoryOptions = {
  // Bộ phận cấp một
  root: [{ value: '1', label: 'Công ty' }],
  // Bộ phận con
  child: [
    { value: '2', label: 'Bộ phận' },
    { value: '3', label: 'Vị trí' },
  ],
};
