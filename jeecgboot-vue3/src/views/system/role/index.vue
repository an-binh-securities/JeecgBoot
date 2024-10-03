<template>
  <BasicTable @register="registerTable">
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> Thêm mới</a-button>
      <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> Xuất</a-button>
      <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">Nhập</j-upload-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="batchHandleDelete">
              <Icon icon="ant-design:delete-outlined"></Icon>
              Xóa
            </a-menu-item>
          </a-menu>
        </template>
        <a-button
          >Thao tác hàng loạt
          <Icon icon="mdi:chevron-down"></Icon>
        </a-button>
      </a-dropdown>
    </template>
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
    </template>
  </BasicTable>
  <!--角色用户表格-->
  <RoleUserTable @register="roleUserDrawer" />
  <!--角色编辑抽屉-->
  <RoleDrawer @register="registerDrawer" @success="reload" :showFooter="showFooter" />
  <!--角色详情-->
  <RoleDesc @register="registerDesc"></RoleDesc>
  <!--角色菜单授权抽屉-->
  <RolePermissionDrawer @register="rolePermissionDrawer" />
  <!--角色首页配置-->
  <RoleIndexModal @register="registerIndexModal" />
</template>
<script lang="ts" name="system-role" setup>
  import { ref } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { useModal } from '/@/components/Modal';
  import RoleDrawer from './components/RoleDrawer.vue';
  import RoleDesc from './components/RoleDesc.vue';
  import RolePermissionDrawer from './components/RolePermissionDrawer.vue';
  import RoleIndexModal from './components/RoleIndexModal.vue';
  import RoleUserTable from './components/RoleUserTable.vue';
  import { columns, searchFormSchema } from './role.data';
  import { list, deleteRole, batchDeleteRole, getExportUrl, getImportUrl } from './role.api';
  import { useListPage } from '/@/hooks/system/useListPage';
  const showFooter = ref(true);
  const [roleUserDrawer, { openDrawer: openRoleUserDrawer }] = useDrawer();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerIndexModal, { openModal: openIndexModal }] = useModal();
  const [rolePermissionDrawer, { openDrawer: openRolePermissionDrawer }] = useDrawer();
  const [registerDesc, { openDrawer: openRoleDesc }] = useDrawer();

  /**
   * Thanh công cụ
   */
  function getTableAction(record) {
    return [
      {
        label: 'Người dùng',
        onClick: handleUser.bind(null, record),
      },
      {
        label: 'Ủy quyền',
        onClick: handlePerssion.bind(null, record),
      },
      {
        label: 'Chỉnh sửa',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: 'Chi tiết',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: 'Xóa',
        popConfirm: {
          title: 'Bạn có chắc chắn muốn xóa không',
          confirm: handleDelete.bind(null, record),
        },
      },
      {
        label: 'Cấu hình trang chủ',
        onClick: handleIndexConfig.bind(null, record.roleCode),
      },
    ];
  }

  /**
  * Thanh công cụ thả xuống
  */
  function getDropDownAction(record) {
    return [
      {
        label: 'Chỉnh sửa',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: 'Chi tiết',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: 'Xóa',
        popConfirm: {
          title: 'Bạn có chắc chắn muốn xóa không',
          confirm: handleDelete.bind(null, record),
        },
      },
      {
        label: 'Cấu hình trang chủ',
        onClick: handleIndexConfig.bind(null, record.roleCode),
      },
    ];
  }
</script>
