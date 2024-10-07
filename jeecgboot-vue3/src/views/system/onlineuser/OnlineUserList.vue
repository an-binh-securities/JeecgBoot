<template>
  <BasicTable @register="registerTable" :rowSelection="rowSelection">
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" />
    </template>
  </BasicTable>
</template>

<script lang="ts" name="online-user" setup>
import { BasicTable, TableAction } from '/@/components/Table';
import { columns, searchFormSchema } from './OnlineUser.data';
import { list, forceLogout } from './OnlineUser.api';
import { useListPage } from '/@/hooks/system/useListPage';
import { useMessage } from "/@/hooks/web/useMessage";
// Các tham số và phương thức chung của trang danh sách
const { prefixCls, tableContext, onImportXls, onExportXls } = useListPage({
  designScope: 'online-user',
  tableProps: {
    // rowKey mặc định là id sẽ gây ra trùng lặp key, dẫn đến dữ liệu trùng lặp trên trang
    rowKey: 'token',
    // title: 'Người dùng trực tuyến',
    api: list,
    columns: columns,
    formConfig: {
      schemas: searchFormSchema,
      labelWidth: 150,
    },
    actionColumn: {
      width: 120,
    },
    rowSelection: null,
  },
});
const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;
const $message = useMessage();

// Cột hành động
function getTableAction(record) {
  return [
    {
      label: 'Buộc thoát',
      popConfirm: {
        title: 'Buộc người dùng thoát?',
        confirm: handleForce.bind(null, record),
      },
    },
  ];
}

/**
 * Buộc thoát
 * @param record
 */
function handleForce(record) {
  forceLogout({ token: record.token }).then((res) => {
    if (res.success) {
      reload();
      $message.createMessage.success('Buộc người dùng "' + record.realname + '" thoát thành công!');
    } else {
      $message.createMessage.warn(res.message);
    }
  });
}
</script>

<style scoped>

</style>
