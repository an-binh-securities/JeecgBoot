import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'Tên phân loại',
    dataIndex: 'name',
    width: 350,
    align: 'left',
  },
  {
    title: 'Mã phân loại',
    dataIndex: 'code',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: 'Tên',
    field: 'name',
    component: 'JInput',
    colProps: { span: 6 },
  },
  {
    label: 'Mã',
    field: 'code',
    component: 'JInput',
    colProps: { span: 6 },
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
    label: 'Nút cha',
    field: 'pid',
    component: 'TreeSelect',
    componentProps: {
      //update-begin---author:wangshuai ---date:20230829  for：replaceFields已过期，使用fieldNames代替------------
      fieldNames: {
      //update-end---author:wangshuai ---date:20230829  for：replaceFields已过期, sử dụng fieldNames thay thế------------
        value: 'key',
      },
      dropdownStyle: {
        maxHeight: '50vh',
      },
      getPopupContainer: () => document.body,
    },
    show: ({ values }) => {
      return values.pid !== '0';
    },
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
  {
    label: 'Tên phân loại',
    field: 'name',
    required: true,
    component: 'Input',
  },
];
