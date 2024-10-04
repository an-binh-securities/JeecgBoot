import {BasicColumn, FormSchema} from '/@/components/Table';

const statusOptions = [
  {label: 'Vô hiệu hóa', value: '0'},
  {label: 'Kích hoạt', value: '1'},
]

export const columns: BasicColumn[] = [
  {
    title: 'Tên bảng được phép',
    dataIndex: 'tableName',
  },
  {
    title: 'Tên trường được phép',
    dataIndex: 'fieldName',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    customRender({ text }) {
      const find = statusOptions.find(opt => opt.value === text);
      return find?.label || 'Không xác định';
    }
  },
  {
    title: 'Thời gian tạo',
    dataIndex: 'createTime',
  }
];

export const searchFormSchema: FormSchema[] = [
  {
    label: 'Tên bảng được phép',
    field: 'tableName',
    component: 'Input',
    labelWidth: 150,
  },
  {
    label: 'Tên trường được phép',
    field: 'fieldName',
    component: 'Input',
  },
  {
    label: 'Trạng thái',
    field: 'status',
    component: 'Select',
    componentProps: {
      options: statusOptions,
    },
    labelWidth: 100,
  },
];

export const formSchema: FormSchema[] = [
  { label: '', field: 'id', component: 'Input', show: false },
  {
    label: 'Tên bảng được phép',
    field: 'tableName',
    component: 'Input',
    required: true,
  },
  {
    label: 'Tên trường được phép',
    field: 'fieldName',
    component: 'Input',
    required: true,
    helpMessage: 'Nhiều trường được phân tách bằng dấu phẩy',
  },
  {
    label: 'Trạng thái',
    field: 'status',
    component: 'Select',
    defaultValue: '1',
    componentProps: {
      options: statusOptions,
    },
  },
];
