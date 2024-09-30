import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Icon } from '/@/components/Icon';
import { duplicateCheck } from '../user/user.api';
import { ajaxGetDictItems ,checkPermDuplication } from './menu.api';
import { render } from '/@/utils/common/renderUtils';

const isDir = (type) => type === 0;
const isMenu = (type) => type === 1;
const isButton = (type) => type === 2;

// 定义可选择的组件类型
export enum ComponentTypes {
  Default = 'layouts/default/index',
  IFrame = 'sys/iframe/FrameBlank',
}

export const columns: BasicColumn[] = [
  {
    title: 'Tên menu',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: 'Loại menu',
    dataIndex: 'menuType',
    width: 150,
    customRender: ({ text }) => {
      return render.renderDict(text, 'menu_type');
    },
  },
  {
    title: 'Biểu tượng',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: 'Thành phần',
    dataIndex: 'component',
    align: 'left',
    width: 150,
  },
  {
    title: 'Đường dẫn',
    dataIndex: 'url',
    align: 'left',
    width: 150,
  },
  {
    title: 'Sắp xếp',
    dataIndex: 'sortNo',
    width: 50,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: 'Tên menu',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'menuType',
    label: 'Loại menu',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: ({ formActionType, formModel }) => {
      return {
        options: [
          { label: 'Menu cấp 1', value: 0 },
          { label: 'Menu con', value: 1 },
          { label: 'Nút/Quyền', value: 2 },
        ],
        onChange: (e) => {
          const { updateSchema, clearValidate } = formActionType;
          const label = isButton(e) ? 'Nút/Quyền' : 'Tên menu';
          // Xóa xác minh
          clearValidate();
          updateSchema([
            {
              field: 'name',
              label: label,
            },
            {
              field: 'url',
              required: !isButton(e),
            },
          ]);
          // update-begin---author:wangshuai ---date:20220729  for：[VUEN-1834] Chỉ có menu cấp 1 mới có giá trị mặc định, khi là menu con thì xóa------------
          if (isMenu(e) && !formModel.id && (formModel.component=='layouts/default/index' || formModel.component=='layouts/RouteView')) {
            formModel.component = '';
          }
          // update-end---author:wangshuai ---date:20220729  for：[VUEN-1834] Chỉ có menu cấp 1 mới có giá trị mặc định, khi là menu con thì xóa------------
        },
      };
    },
  },
  {
    field: 'name',
    label: 'Tên menu',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: 'Menu cha',
    component: 'TreeSelect',
    required: true,
    componentProps: {
      // update-begin---author:wangshuai ---date:20230829  for: replaceFields đã lỗi thời, sử dụng fieldNames thay thế------------
      fieldNames: {
        label: 'name',
        key: 'id',
        value: 'id',
      },
      // update-end---author:wangshuai ---date:20230829  for: replaceFields đã lỗi thời, sử dụng fieldNames thay thế------------
      dropdownStyle: {
        maxHeight: '50vh',
      },
      getPopupContainer: (node) => node?.parentNode,
    },
    ifShow: ({ values }) => !isDir(values.menuType),
  },
  {
    field: 'url',
    label: 'Đường dẫn truy cập',
    component: 'Input',
    required: true,
    // update-begin-author:liusq date:2023-06-06 for: [issues/5008] Thiết lập quyền dữ liệu bảng con không có hiệu lực
    ifShow: ({ values }) => !(values.component === ComponentTypes.IFrame && values.internalOrExternal),
    // update-begin-author:zyf date:2022-11-02 for: Cho phép đường dẫn trùng lặp trong router hợp nhất
    dynamicRules: ({ model, schema,values }) => {
       return checkPermDuplication(model, schema,  values.menuType !== 2?true:false);
    },
    // update-end-author:zyf date:2022-11-02 for: Cho phép đường dẫn trùng lặp trong router hợp nhất
    // update-end-author:liusq date:2022-06-06 for: [issues/5008] Thiết lập quyền dữ liệu bảng con không có hiệu lực
  },
  {
    field: 'component',
    label: 'Thành phần frontend',
    component: 'Input',
    componentProps: {
      placeholder: 'Vui lòng nhập thành phần frontend',
    },
    defaultValue:'layouts/default/index',
    required: true,
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'componentName',
    label: 'Tên thành phần',
    component: 'Input',
    componentProps: {
      placeholder: 'Vui lòng nhập tên thành phần',
    },
    helpMessage: [
      'Tên này nên giống với thuộc tính name của thành phần vue.',
      'Tên thành phần không được trùng lặp, chủ yếu dùng cho chức năng cache router.',
      'Nếu tên thành phần không giống với thuộc tính name của thành phần vue, sẽ dẫn đến cache router không hoạt động.',
      'Không bắt buộc, để trống sẽ tự động tạo dựa trên đường dẫn truy cập.',
    ],
    defaultValue: '',
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'frameSrc',
    label: 'Địa chỉ Iframe',
    component: 'Input',
    rules: [
      { required: true, message: 'Vui lòng nhập địa chỉ Iframe' },
      { type: 'url', message: 'Vui lòng nhập địa chỉ url hợp lệ' },
    ],
    ifShow: ({ values }) => !isButton(values.menuType) && values.component === ComponentTypes.IFrame,
  },
  {
    field: 'redirect',
    label: 'Địa chỉ chuyển hướng mặc định',
    component: 'Input',
    ifShow: ({ values }) => isDir(values.menuType),
  },
  {
    field: 'perms',
    label: 'Dấu hiệu ủy quyền',
    component: 'Input',
    ifShow: ({ values }) => isButton(values.menuType),
    // dynamicRules: ({ model }) => {
    //   return [
    //     {
    //       required: false,
    //       validator: (_, value) => {
    //         return new Promise((resolve, reject) => {
    //           let params = {
    //             tableName: 'sys_permission',
    //             fieldName: 'perms',
    //             fieldVal: value,
    //             dataId: model.id,
    //           };
    //           duplicateCheck(params)
    //             .then((res) => {
    //               res.success ? resolve() : reject(res.message || 'Xác minh thất bại');
    //             })
    //             .catch((err) => {
    //               reject(err.message || 'Xác minh thất bại');
    //             });
    //         });
    //       },
    //     },
    //   ];
    // },
  },
  {
    field: 'permsType',
    label: 'Chính sách ủy quyền',
    component: 'RadioGroup',
    defaultValue: '1',
    helpMessage: ['Có thể xem/truy cập (ủy quyền sau khi có thể xem/truy cập)', 'Có thể chỉnh sửa (bị vô hiệu hóa khi không được ủy quyền)'],
    componentProps: {
      options: [
        { label: 'Có thể xem/truy cập', value: '1' },
        { label: 'Có thể chỉnh sửa', value: '2' },
      ],
    },
    ifShow: ({ values }) => isButton(values.menuType),
  },
  {
    field: 'status',
    label: 'Trạng thái',
    component: 'RadioGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: 'Hiệu lực', value: '1' },
        { label: 'Vô hiệu', value: '0' },
      ],
    },
    ifShow: ({ values }) => isButton(values.menuType),
  },
  {
    field: 'icon',
    label: 'Biểu tượng menu',
    component: 'IconPicker',
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'sortNo',
    label: 'Sắp xếp',
    component: 'InputNumber',
    defaultValue: 1,
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'route',
    label: 'Có phải menu router',
    component: 'Switch',
    defaultValue: true,
    componentProps: {
      checkedChildren: 'Có',
      unCheckedChildren: 'Không',
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'hidden',
    label: 'Ẩn router',
    component: 'Switch',
    defaultValue: 0,
    componentProps: {
      checkedChildren: 'Có',
      unCheckedChildren: 'Không',
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'hideTab',
    label: 'Ẩn Tab',
    component: 'Switch',
    defaultValue: 0,
    componentProps: {
      checkedChildren: 'Có',
      unCheckedChildren: 'Không',
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'keepAlive',
    label: 'Có cache router',
    component: 'Switch',
    defaultValue: false,
    componentProps: {
      checkedChildren: 'Có',
      unCheckedChildren: 'Không',
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'alwaysShow',
    label: 'Router hợp nhất',
    component: 'Switch',
    defaultValue: false,
    componentProps: {
      checkedChildren: 'Có',
      unCheckedChildren: 'Không',
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'internalOrExternal',
    label: 'Cách mở',
    component: 'Switch',
    defaultValue: false,
    componentProps: {
      checkedChildren: 'Bên ngoài',
      unCheckedChildren: 'Bên trong',
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
];

export const dataRuleColumns: BasicColumn[] = [
  {
    title: 'Tên quy tắc',
    dataIndex: 'ruleName',
    width: 150,
  },
  {
    title: 'Trường quy tắc',
    dataIndex: 'ruleColumn',
    width: 100,
  },
  {
    title: 'Giá trị quy tắc',
    dataIndex: 'ruleValue',
    width: 100,
  },
];

export const dataRuleSearchFormSchema: FormSchema[] = [
  {
    field: 'ruleName',
    label: 'Tên quy tắc',
    component: 'Input',
    // colProps: { span: 6 },
  },
  {
    field: 'ruleValue',
    label: 'Giá trị quy tắc',
    component: 'Input',
    // colProps: { span: 6 },
  },
];

export const dataRuleFormSchema: FormSchema[] = [
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'ruleName',
    label: 'Tên quy tắc',
    component: 'Input',
    required: true,
  },
  {
    field: 'ruleColumn',
    label: 'Trường quy tắc',
    component: 'Input',
    ifShow: ({ values }) => {
      const ruleConditions = Array.isArray(values.ruleConditions) ? values.ruleConditions[0] : values.ruleConditions;
      return ruleConditions !== 'USE_SQL_RULES';
    },
  },
  {
    field: 'ruleConditions',
    label: 'Điều kiện quy tắc',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: ajaxGetDictItems,
      params: { code: 'rule_conditions' },
      labelField: 'text',
      valueField: 'value',
      getPopupContainer: (node) => document.body,
    },
  },
  // update-begin--author:liaozhiyang---date:20240724---for：【TV360X-1864】Thêm biến hệ thống
  {
    field: 'ruleValue',
    component: 'JInputSelect',
    label: 'Giá trị quy tắc',
    required: true,
    componentProps: {
      selectPlaceholder: 'Có thể chọn biến hệ thống',
      inputPlaceholder: 'Vui lòng nhập',
      getPopupContainer: () => document.body,
      selectWidth: '200px',
      options: [
        {
          label: 'Tài khoản người dùng đăng nhập',
          value: '#{sys_user_code}',
        },
        {
          label: 'Tên người dùng đăng nhập',
          value: '#{sys_user_name}',
        },
        {
          label: 'Ngày hiện tại',
          value: '#{sys_date}',
        },
        {
          label: 'Thời gian hiện tại',
          value: '#{sys_time}',
        },
        {
          label: 'Phòng ban người dùng đăng nhập',
          value: '#{sys_org_code}',
        },
        {
          label: 'Phòng ban người dùng sở hữu',
          value: '#{sys_multi_org_code}',
        },
        {
          label: 'Người dùng đăng nhập thuê',
          value: '#{tenant_id}',
        },
      ],
    },
  },
  // update-end--author:liaozhiyang---date:20240724---for：【TV360X-1864】Thêm biến hệ thống
  {
    field: 'status',
    label: 'Trạng thái',
    component: 'RadioButtonGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: 'Vô hiệu', value: '0' },
        { label: 'Hiệu lực', value: '1' },
      ],
    },
  },
];
