import { FormSchema } from '/@/components/Table';
import { render } from "/@/utils/common/renderUtils";
import { getToken } from '/@/utils/auth';

// Danh sách
export const columns = [
  {
    title: 'Tài khoản người dùng',
    align: "center",
    dataIndex: 'username',
    customRender: ({ text, record }) => {
      let token = getToken();
      if (record.token === token) {
        return text + '（tôi）'
      }
      return text
    },
  }, {
    title: 'Tên người dùng',
    align: "center",
    dataIndex: 'realname'
  }, {
    title: 'Ảnh đại diện',
    align: "center",
    width: 120,
    dataIndex: 'avatar',
    customRender: render.renderAvatar,
  }, {
    title: 'Sinh nhật',
    align: "center",
    dataIndex: 'birthday'
  }, {
    title: 'Giới tính',
    align: "center",
    dataIndex: 'sex',
    customRender: ({ text }) => {
      return render.renderDict(text, 'sex');
    }
  }, {
    title: 'Số điện thoại',
    align: "center",
    dataIndex: 'phone'
  }
];

// Khu vực tìm kiếm
export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: 'Tài khoản người dùng',
    component: 'Input',
    colProps: { span: 6 },
  }
];
