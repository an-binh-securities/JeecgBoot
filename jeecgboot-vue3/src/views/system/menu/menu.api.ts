import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/sys/permission/list',
  save = '/sys/permission/add',
  edit = '/sys/permission/edit',
  delete = '/sys/permission/delete',
  deleteBatch = '/sys/permission/deleteBatch',
  ruleList = '/sys/permission/queryPermissionRule',
  ruleSave = '/sys/permission/addPermissionRule',
  ruleEdit = '/sys/permission/editPermissionRule',
  ruleDelete = '/sys/permission/deletePermissionRule',
  checkPermDuplication = '/sys/permission/checkPermDuplication',
}

/**
 * Giao diện danh sách
 * @param params
 */
export const list = (params) => {
  return defHttp.get({ url: Api.list, params });
}

/**
 * Xóa menu
 */
export const deleteMenu = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.delete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * Xóa hàng loạt menu
 * @param params
 */
export const batchDeleteMenu = (params, handleSuccess) => {
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
 * Lưu hoặc cập nhật menu
 * @param params
 */
export const saveOrUpdateMenu = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};
/**
 * Giao diện danh sách quyền dữ liệu menu
 * @param params
 */
export const dataRuleList = (params) => defHttp.get({ url: Api.ruleList, params });
/**
 * Lưu hoặc cập nhật quy tắc dữ liệu
 * @param params
 */
export const saveOrUpdateRule = (params, isUpdate) => {
  let url = isUpdate ? Api.ruleEdit : Api.ruleSave;
  return defHttp.post({ url: url, params });
};

/**
 * Xóa quyền dữ liệu
 */
export const deleteRule = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.ruleDelete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * Lấy giá trị từ điển theo mã
 * @param params
 */
export const ajaxGetDictItems = (params) => defHttp.get({ url: `/sys/dict/getDictItems/${params.code}` });

/**
 * Kiểm tra trùng lặp duy nhất
 * @param params
 */
export const getCheckPermDuplication = (params) => defHttp.get({ url: Api.checkPermDuplication, params }, { isTransformResponse: false });

/**
 * Kiểm tra menu có tồn tại
 * @param model
 * @param schema
 * @param required
 */
export const checkPermDuplication=(model, schema, required?)=>{
  return [
    {
      validator: (_, value) => {
        if (!required) {
          return Promise.resolve();
        }
        if (!value && required) {
          return Promise.reject(`Vui lòng nhập ${schema.label}`);
        }
        return new Promise<void>((resolve, reject) => {
          getCheckPermDuplication({
            id: model.id,
            url:model.url,
            alwaysShow:model.alwaysShow
          }).then((res) => {
              res.success ? resolve() : reject(res.message || 'Kiểm tra thất bại');
          }).catch((err) => {
              reject(err.message || 'Xác minh thất bại');
          });
        });
      },
    },
  ];
}
