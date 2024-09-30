import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/sys/checkRule/list',
  delete = '/sys/checkRule/delete',
  deleteBatch = '/sys/checkRule/deleteBatch',
  exportXls = 'sys/checkRule/exportXls',
  importXls = 'sys/checkRule/importExcel',
  checkByCode = '/sys/checkRule/checkByCode',
  save = '/sys/checkRule/add',
  edit = '/sys/checkRule/edit',
}

/**
 * Địa chỉ xuất
 */
export const exportUrl = Api.exportXls;
/**
 * Địa chỉ nhập
 */
export const importUrl = Api.importXls;

/**
 * Truy vấn danh sách
 * @param params
 */
export const getCheckRuleList = (params) => {
  return defHttp.get({ url: Api.list, params });
};

/**
 * Xóa
 * @param params
 * @param handleSuccess
 */
export const deleteCheckRule = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.delete, data: params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * Xóa hàng loạt
 * @param params
 */
export const batchDeleteCheckRule = (params, handleSuccess) => {
  Modal.confirm({
    title: 'Xác nhận xóa',
    content: 'Bạn có muốn xóa dữ liệu đã chọn không',
    okText: 'Xác nhận',
    cancelText: 'Hủy',
    onOk: () => {
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};

/**
 * Kiểm tra giá trị truyền vào có hợp lệ theo mã quy tắc code
 * @param ruleCode
 * @param value
 */
export const validateCheckRule = (ruleCode, value) => {
  value = encodeURIComponent(value);
  let params = { ruleCode, value };
  return defHttp.get({ url: Api.checkByCode, params }, { isTransformResponse: false });
};

/**
 * Lưu
 * @param params
 */
export const saveCheckRule = (params) => {
  return defHttp.post({ url: Api.save, params });
};

/**
 * Cập nhật
 * @param params
 */
export const updateCheckRule = (params) => {
  return defHttp.put({ url: Api.edit, params });
};
