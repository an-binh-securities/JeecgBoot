<template>
  <div>
    <!--Tham chiếu bảng-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--Khe cắm: tiêu đề bảng-->
      <template #tableTitle>
        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> Thêm mới</a-button>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls" :disabled="isDisabledAuth('system:user:export')"> Xuất</a-button>
        <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">Nhập</j-upload-button>
        <a-button type="primary" @click="openModal(true, {})" preIcon="ant-design:hdd-outlined"> Thùng rác</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                Xóa
              </a-menu-item>
              <a-menu-item key="2" @click="batchFrozen(2)">
                <Icon icon="ant-design:lock-outlined"></Icon>
                Đóng băng
              </a-menu-item>
              <a-menu-item key="3" @click="batchFrozen(1)">
                <Icon icon="ant-design:unlock-outlined"></Icon>
                Mở khóa
              </a-menu-item>
            </a-menu>
          </template>
          <a-button
            >Thao tác hàng loạt
            <Icon icon="mdi:chevron-down"></Icon>
          </a-button>
        </a-dropdown>
      </template>
      <!--Thanh thao tác-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
    </BasicTable>
    <!--Ngăn kéo người dùng-->
    <UserDrawer @register="registerDrawer" @success="handleSuccess" />
    <!--Đổi mật khẩu-->
    <PasswordModal @register="registerPasswordModal" @success="reload" />
    <!--Đại lý người dùng-->
    <UserAgentModal @register="registerAgentModal" @success="reload" />
    <!--Thùng rác-->
    <UserRecycleBinModal @register="registerModal" @success="reload" />
    <!-- Cửa sổ bật lên người xử lý nghỉ việc -->
    <UserQuitAgentModal @register="registerQuitAgentModal" @success="reload" />
    <!-- Cửa sổ bật lên người nghỉ việc -->
    <UserQuitModal @register="registerQuitModal" @success="reload" />
  </div>
</template>
<script lang="ts" name="system-user" setup>
  //ts语法
  import { ref, computed, unref } from 'vue';
  import { BasicTable, TableAction, ActionItem } from '/@/components/Table';
  import UserDrawer from './UserDrawer.vue';
  import UserRecycleBinModal from './UserRecycleBinModal.vue';
  import PasswordModal from './PasswordModal.vue';
  import UserAgentModal from './UserAgentModal.vue';
  import JThirdAppButton from '/@/components/jeecg/thirdApp/JThirdAppButton.vue';
  import UserQuitAgentModal from './UserQuitAgentModal.vue';
  import UserQuitModal from './UserQuitModal.vue';
  import { useDrawer } from '/@/components/Drawer';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { columns, searchFormSchema } from './user.data';
  import { listNoCareTenant, deleteUser, batchDeleteUser, getImportUrl, getExportUrl, frozenBatch } from './user.api';
  import {usePermission} from "/@/hooks/web/usePermission";

  const { createMessage, createConfirm } = useMessage();
  const { isDisabledAuth } = usePermission();
  // đăng ký drawer
  const [registerDrawer, { openDrawer }] = useDrawer();
  // model thùng rác
  const [registerModal, { openModal }] = useModal();
  // model mật khẩu
  const [registerPasswordModal, { openModal: openPasswordModal }] = useModal();
  // model đại lý
  const [registerAgentModal, { openModal: openAgentModal }] = useModal();
  // model đại lý nghỉ việc
  const [registerQuitAgentModal, { openModal: openQuitAgentModal }] = useModal();
  // model danh sách người dùng nghỉ việc
  const [registerQuitModal, { openModal: openQuitModal }] = useModal();

  // Các tham số và phương thức chung của trang danh sách
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    designScope: 'user-list',
    tableProps: {
      title: 'Danh sách người dùng',
      api: listNoCareTenant,
      columns: columns,
      size: 'small',
      formConfig: {
        // labelWidth: 200,
        schemas: searchFormSchema,
      },
      actionColumn: {
        width: 120,
      },
      beforeFetch: (params) => {
        return Object.assign({ column: 'createTime', order: 'desc' }, params);
      },
    },
    exportConfig: {
      name: 'Danh sách người dùng',
      url: getExportUrl,
    },
    importConfig: {
      url: getImportUrl,
    },
  });

  // đăng ký dữ liệu bảng
  const [registerTable, { reload, updateTableDataRecord }, { rowSelection, selectedRows, selectedRowKeys }] = tableContext;

  /**
   * Sự kiện thêm mới
   */
  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
      showFooter: true,
      tenantSaas: false,
    });
  }
  /**
   * Sự kiện chỉnh sửa
   */
  async function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
      showFooter: true,
      tenantSaas: false,
    });
  }
  /**
   * Chi tiết
   */
  async function handleDetail(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
      showFooter: false,
      tenantSaas: false,
    });
  }
  /**
   * Sự kiện xóa
   */
  async function handleDelete(record) {
    if ('admin' == record.username) {
      createMessage.warning('Tài khoản quản trị viên không được phép thao tác này!');
      return;
    }
    await deleteUser({ id: record.id }, reload);
  }
  /**
   * Sự kiện xóa hàng loạt
   */
  async function batchHandleDelete() {
    let hasAdmin = unref(selectedRows).filter((item) => item.username == 'admin');
    if (unref(hasAdmin).length > 0) {
      createMessage.warning('Tài khoản quản trị viên không được phép thao tác này!');
      return;
    }
    await batchDeleteUser({ ids: selectedRowKeys.value }, () => {
      selectedRowKeys.value = [];
      reload();
    });
  }
  /**
   * Gọi lại thành công
   */
  function handleSuccess() {
    reload();
  }

  /**
   * Mở cửa sổ bật lên thay đổi mật khẩu
   */
  function handleChangePassword(username) {
    openPasswordModal(true, { username });
  }
  /**
   * Mở cửa sổ bật lên đại lý
   */
  function handleAgentSettings(userName) {
    openAgentModal(true, { userName });
  }
  /**
   * Đóng băng/giải phóng
   */
  async function handleFrozen(record, status) {
    if ('admin' == record.username) {
      createMessage.warning('Tài khoản quản trị viên không được phép thao tác này!');
      return;
    }
    await frozenBatch({ ids: record.id, status: status }, reload);
  }
  /**
   * Đóng băng/giải phóng hàng loạt
   */
  function batchFrozen(status) {
    let hasAdmin = selectedRows.value.filter((item) => item.username == 'admin');
    if (unref(hasAdmin).length > 0) {
      createMessage.warning('Tài khoản quản trị viên không được phép thao tác này!');
      return;
    }
    createConfirm({
      iconType: 'warning',
      title: 'Xác nhận thao tác',
      content: 'Bạn có muốn ' + (status == 1 ? 'giải phóng' : 'đóng băng') + ' tài khoản đã chọn không?',
      onOk: async () => {
        await frozenBatch({ ids: unref(selectedRowKeys).join(','), status: status }, reload);
      },
    });
  }

  /**
   * Đồng bộ DingTalk và WeChat gọi lại
   */
  function onSyncFinally({ isToLocal }) {
    // Đồng bộ về local thì làm mới dữ liệu
    if (isToLocal) {
      reload();
    }
  }

  /**
   * Cột thao tác
   */
  function getTableAction(record): ActionItem[] {
    return [
      {
        label: 'Chỉnh sửa',
        onClick: handleEdit.bind(null, record),
        // ifShow: () => hasPermission('system:user:edit'),
      },
    ];
  }
  /**
   * Cột thao tác thả xuống
   */
  function getDropDownAction(record): ActionItem[] {
    return [
      {
        label: 'Chi tiết',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: 'Mật khẩu',
        //auth: 'user:changepwd',
        onClick: handleChangePassword.bind(null, record.username),
      },
      {
        label: 'Xóa',
        popConfirm: {
          title: 'Bạn có chắc chắn muốn xóa',
          confirm: handleDelete.bind(null, record),
        },
      },
      {
        label: 'Đóng băng',
        ifShow: record.status == 1,
        popConfirm: {
          title: 'Bạn có chắc chắn muốn đóng băng?',
          confirm: handleFrozen.bind(null, record, 2),
        },
      },
      {
        label: 'Giải phóng',
        ifShow: record.status == 2,
        popConfirm: {
          title: 'Bạn có chắc chắn muốn giải phóng?',
          confirm: handleFrozen.bind(null, record, 1),
        },
      },
      {
        label: 'Đại lý',
        onClick: handleAgentSettings.bind(null, record.username),
      },
    ];
  }

  /**
   * Nghỉ việc
   * @param userName
   */
  function handleQuit(userName) {
    // mở cửa sổ bật lên đại lý nghỉ việc
    openQuitAgentModal(true, { userName });
  }
</script>

<style scoped></style>
