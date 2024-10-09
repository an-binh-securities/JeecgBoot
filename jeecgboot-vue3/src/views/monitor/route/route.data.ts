import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'ID tuyến đường',
    dataIndex: 'routerId',
    width: 200,
    align: 'left',
  },
  {
    title: 'Tên tuyến đường',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: 'URI tuyến đường',
    dataIndex: 'uri',
    width: 200,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    slots: { customRender: 'status' },
    width: 150,
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: 'ID tuyến đường',
    component: 'Input',
    required: true,
  },
  {
    field: 'name',
    label: 'Tên tuyến đường',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'uri',
    label: 'URI tuyến đường',
    component: 'Input',
  },
  {
    field: 'predicates',
    label: 'Điều kiện tuyến đường',
    slot: 'predicates',
    component: 'Input',
  },
];
