<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="Thùng rác người dùng" :showOkBtn="false" width="1000px" destroyOnClose @fullScreen="handleFullScreen">
    <BasicTable @register="registerTable" :rowSelection="rowSelection" :scroll="scroll">
      <!--Khe cắm: tiêu đề bảng-->
      <template #tableTitle>
        <a-dropdown v-if="checkedKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                Xóa hàng loạt
              </a-menu-item>
              <a-menu-item key="1" @click="batchHandleRevert">
                <Icon icon="ant-design:redo-outlined"></Icon>
                Khôi phục hàng loạt
              </a-menu-item>
            </a-menu>
          </template>
          <a-button
            >Thao tác hàng loạt
            <Icon icon="ant-design:down-outlined"></Icon>
          </a-button>
        </a-dropdown>
      </template>
      <!--Cột thao tác-->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="getTableAction(record)" />
        </template>
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, toRaw, unref, watch } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { recycleColumns } from './user.data';
  import { getRecycleBinList, putRecycleBin, deleteRecycleBin } from './user.api';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createConfirm } = useMessage();
  // 声明Emits
  const emit = defineEmits(['success', 'register']);
  const checkedKeys = ref<Array<string | number>>([]);
  const [registerModal] = useModalInner(() => {
    checkedKeys.value = [];
  });
  const scroll = ref({ y: 0 });
  //注册table数据
  const [registerTable, { reload }] = useTable({
    api: getRecycleBinList,
    columns: recycleColumns,
    rowKey: 'id',
    striped: true,
    useSearchForm: false,
    showTableSetting: false,
    clickToRowSelect: false,
    bordered: true,
    showIndexColumn: false,
    pagination: true,
    tableSetting: { fullScreen: true },
    canResize: false,
    actionColumn: {
      width: 150,
      title: 'Thao tác',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
      fixed: undefined,
    },
  });
  // update-begin--author:liaozhiyang---date:20240704---for：【TV360X-1657】系统用户回收站弹窗分页展示在可视区内
  const handleFullScreen = (maximize) => {
    setTableHeight(maximize);
  };
  const setTableHeight = (maximize) => {
    const clientHeight = document.documentElement.clientHeight;
    scroll.value = {
      y: clientHeight - (maximize ? 300 : 500),
    };
  };
  setTableHeight(false);
  watch(
    checkedKeys,
    (newValue, oldValue) => {
      if (checkedKeys.value.length && oldValue.length == 0) {
        scroll.value = {
          y: scroll.value.y - 50,
        };
      } else if (checkedKeys.value.length == 0 && oldValue.length) {
        scroll.value = {
          y: scroll.value.y + 50,
        };
      }
    },
    { deep: true }
  );
  // update-end--author:liaozhiyang---date:20240704---for：【TV360X-1657】系统用户回收站弹窗分页展示在可视区内
  /**
   * 选择列配置
   */
  const rowSelection = {
    type: 'checkbox',
    columnWidth: 50,
    selectedRowKeys: checkedKeys,
    onChange: onSelectChange,
  };
  /**
   * 选择事件
   */
  function onSelectChange(selectedRowKeys: (string | number)[]) {
    checkedKeys.value = selectedRowKeys;
  }
  /**
   * 还原事件
   */
  async function handleRevert(record) {
    await putRecycleBin({ userIds: record.id }, reload);
    emit('success');
  }
  /**
   * 批量还原事件
   */
  function batchHandleRevert() {
    handleRevert({ id: toRaw(unref(checkedKeys)).join(',') });
  }
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteRecycleBin({ userIds: record.id }, reload);
  }
  /**
   * Sự kiện xóa hàng loạt
   */
  function batchHandleDelete() {
    createConfirm({
      iconType: 'warning',
      title: 'Xóa',
      content: 'Bạn có chắc chắn muốn xóa vĩnh viễn không? Sau khi xóa sẽ không thể khôi phục!',
      onOk: () => handleDelete({ id: toRaw(unref(checkedKeys)).join(',') }),
      onCancel() {},
    });
  }
  // Lấy sự kiện cột thao tác
  function getTableAction(record) {
    return [
      {
        label: 'Khôi phục',
        icon: 'ant-design:redo-outlined',
        popConfirm: {
          title: 'Bạn có chắc chắn muốn khôi phục',
          confirm: handleRevert.bind(null, record),
        },
      },
      {
        label: 'Xóa hoàn toàn',
        icon: 'ant-design:scissor-outlined',
        popConfirm: {
          title: 'Bạn có chắc chắn muốn xóa',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
</script>
