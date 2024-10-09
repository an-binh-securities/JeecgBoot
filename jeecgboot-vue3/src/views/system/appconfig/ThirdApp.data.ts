//第三方app配置表单
import { FormSchema } from '/@/components/Form';

//第三方app表单
export const thirdAppFormSchema: FormSchema[] = [
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: 'thirdType',
    field: 'thirdType',
    component: 'Input',
    show: false,
  },
  {
    label: 'Agentld',
    field: 'agentId',
    component: 'Input',
    required: true,
  },
  {
    label: 'AppKey',
    field: 'clientId',
    component: 'Input',
    required: true,
  },
  {
    label: 'AppSecret',
    field: 'clientSecret',
    component: 'Input',
    required: true,
  },
  {
    label: 'agentAppSecret',
    field: 'agentAppSecret',
    component: 'Input',
    ifShow: false,
  },{
    label: 'Kích hoạt',
    field: 'status',
    component: 'Switch',
    componentProps:{
      checkedChildren:'Tắt',
      checkedValue:1,
      unCheckedChildren:'Bật',
      unCheckedValue: 0
    },
    defaultValue: 1
  },{
    label: 'Mã thuê bao',
    field: 'tenantId',
    component: 'Input',
    show: false,
  },
];
