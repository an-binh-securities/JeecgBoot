import { BasicColumn, FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
  {
    title: 'Tiêu đề',
    width: 150,
    dataIndex: 'titile',
  },
  {
    title: 'Loại tin nhắn',
    dataIndex: 'msgCategory',
    width: 100,
    customRender: ({ text }) => {
      return render.renderDict(text, 'msg_category');
    },
  },
  {
    title: 'Người gửi',
    width: 100,
    dataIndex: 'sender',
  },
  {
    title: 'Mức độ ưu tiên',
    dataIndex: 'priority',
    width: 70,
    customRender: ({ text }) => {
      const color = text == 'L' ? 'blue' : text == 'M' ? 'yellow' : 'red';
      return render.renderTag(render.renderDict(text, 'priority'), color);
    },
  },
  {
    title: 'Đối tượng thông báo',
    dataIndex: 'msgType',
    width: 100,
    customRender: ({ text }) => {
      return render.renderDict(text, 'msg_type');
    },
  },
  {
    title: 'Trạng thái phát hành',
    dataIndex: 'sendStatus',
    width: 70,
    customRender: ({ text }) => {
      const color = text == '0' ? 'red' : text == '1' ? 'green' : 'gray';
      return render.renderTag(render.renderDict(text, 'send_status'), color);
    },
  },
  {
    title: 'Thời gian phát hành',
    width: 100,
    dataIndex: 'sendTime',
  },
  {
    title: 'Thời gian hủy bỏ',
    width: 100,
    dataIndex: 'cancelTime',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'titile',
    label: 'Tiêu đề',
    component: 'JInput',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'msgCategory',
    label: 'Loại tin nhắn',
    required: true,
    component: 'JDictSelectTag',
    defaultValue: '1',
    componentProps: {
      type: 'radio',
      dictCode: 'msg_category',
      placeholder: 'Vui lòng chọn loại',
    },
  },
  {
    field: 'titile',
    label: 'Tiêu đề',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: 'Vui lòng nhập tiêu đề',
    },
    // update-begin--author:liaozhiyang---date:20240701---for：【TV360X-1632】标题过长保存报错，长度校验
    dynamicRules() {
      return [
        {
          validator: (_, value) => {
            return new Promise<void>((resolve, reject) => {
              if (value.length > 100) {
                reject('Dài nhất 100 ký tự');
              }
              resolve();
            });
          },
        },
      ];
    },
    // update-end--author:liaozhiyang---date:20240701---for：【TV360X-1632】标题过长保存报错，长度校验
  },
  {
    field: 'msgAbstract',
    label: 'Tóm tắt',
    component: 'InputTextArea',
    required: true,
  },
  // {
  //   field: 'endTime',
  //   label: 'Ngày kết thúc',
  //   component: 'DatePicker',
  //   componentProps: {
  //     showTime: true,
  //     valueFormat: 'YYYY-MM-DD HH:mm:ss',
  //     placeholder: 'Vui lòng chọn ngày kết thúc',
  //   },
  //   dynamicRules: ({ model }) => rules.endTime(model.startTime, true),
  // },
  {
    field: 'msgType',
    label: 'Người nhận',
    defaultValue: 'ALL',
    component: 'JDictSelectTag',
    required: true,
    componentProps: {
      type: 'radio',
      dictCode: 'msg_type',
      placeholder: 'Vui lòng chọn phạm vi phát hành',
    },
  },
  {
    field: 'userIds',
    label: 'Người dùng chỉ định',
    component: 'JSelectUser',
    required: true,
    componentProps: {
      rowKey: 'id',
      // update-begin--author:liaozhiyang---date:20240701---for：【TV360X-1627】通知公告用户选择组件没翻译
      labelKey: 'realname',
      // update-end--author:liaozhiyang---date:20240701---for：【TV360X-1627】通知公告用户选择组件没翻译
    },
    ifShow: ({ values }) => values.msgType == 'USER',
  },
  {
    field: 'priority',
    label: 'Mức độ ưu tiên',
    defaultValue: 'H',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'priority',
      type: 'radio',
      placeholder: 'Vui lòng chọn mức độ ưu tiên',
    },
  },
  {
    field: 'msgContent',
    label: 'Nội dung',
    component: 'Input',
    render: render.renderTinymce,
  },
];
