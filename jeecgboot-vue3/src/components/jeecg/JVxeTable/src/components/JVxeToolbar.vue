<template>
  <div :class="boxClass">
    <vxe-toolbar ref="xToolbarRef" :custom="custom">
      <!-- Công cụ nút -->
      <template #buttons>
        <div :class="`${prefixCls}-button div`" :size="btnSize">
          <slot v-if="showPrefix" name="toolbarPrefix" :size="btnSize" />
          <a-button v-if="showAdd" type="primary" preIcon="ant-design:plus-outlined" :disabled="disabled" :loading="deleting" @click="trigger('add')">
            <span>Thêm mới</span>
          </a-button>
          <a-button v-if="showSave" preIcon="ant-design:save-outlined" :disabled="disabled" @click="trigger('save')">
            <span>Lưu</span>
          </a-button>
          <template v-if="deleting || selectedRowIds.length > 0">
            <Popconfirm v-if="showRemove" :title="`Bạn có chắc chắn muốn xóa ${selectedRowIds.length} mục này không?`" :disabled="deleting" @confirm="onRemove">
              <a-button preIcon="ant-design:minus-outlined" :disabled="disabled" :loading="deleting">Xóa</a-button>
            </Popconfirm>
            <template v-if="showClearSelection">
              <a-button preIcon="ant-design:delete-outlined" @click="trigger('clearSelection')">Xóa lựa chọn</a-button>
            </template>
          </template>
          <slot v-if="showSuffix" name="toolbarSuffix" :size="btnSize" />
          <a v-if="showCollapse" style="margin-left: 4px" @click="toggleCollapse">
            <span>{{ collapsed ? 'Mở rộng' : 'Thu gọn' }}</span>
            <Icon :icon="collapsed ? 'ant-design:down-outlined' : 'ant-design:up-outlined'" />
          </a>
        </div>
      </template>
    </vxe-toolbar>
  </div>
</template>

<script lang="ts" setup>
  import { computed, inject, ref, onMounted } from 'vue';
  // noinspection ES6UnusedImports
  import { Popconfirm } from 'ant-design-vue';
  import { VxeToolbarInstance } from 'vxe-table';
  import { Icon } from '/@/components/Icon';
  import { propTypes } from '/@/utils/propTypes';

  const props = defineProps({
    size: propTypes.string,
    disabled: propTypes.bool.def(false),
    custom: propTypes.bool.def(false),
    toolbarConfig: propTypes.object,
    disabledRows: propTypes.object,
    hasBtnAuth: propTypes.func,
    selectedRowIds: propTypes.array.def(() => []),
  });
  const emit = defineEmits(['save', 'add', 'remove', 'clearSelection', 'register']);
  const xToolbarRef = ref({} as VxeToolbarInstance);
  const prefixCls = `${inject('prefixCls')}-toolbar`;
  const boxClass = computed(() => [
    prefixCls,
    {
      [`${prefixCls}-collapsed`]: collapsed.value,
    },
  ]);
  // Có thu gọn hay không
  const collapsed = ref(true);
  // Các nút được cấu hình
  const btns = computed(() => {
    let { btn, btns } = props.toolbarConfig || {};
    btns = btn || btns || ['add', 'remove', 'clearSelection'];
    // Loại bỏ các nút không có quyền
    return btns.filter((btn) => {
      // Mã cấu hình xóa hàng loạt mặc định của hệ thống là batch_delete, cần tương thích ở đây
      if (btn === 'remove') {
        //update-begin-author:taoyan date:2022-6-1 for: VUEN-1162 Nút con không được kiểm soát
        return hasBtnAuth(btn) && hasBtnAuth('batch_delete');
        //update-end-author:taoyan date:2022-6-1 for: VUEN-1162 Nút con không được kiểm soát
      }
      return hasBtnAuth(btn);
    });
  });
  const showAdd = computed(() => btns.value.includes('add'));
  const showSave = computed(() => btns.value.includes('save'));
  const showRemove = computed(() => btns.value.includes('remove'));
  // Các slot được cấu hình
  const slots = computed(() => props.toolbarConfig?.slot || ['prefix', 'suffix']);
  const showPrefix = computed(() => slots.value.includes('prefix'));
  const showSuffix = computed(() => slots.value.includes('suffix'));
  // Có hiển thị nút xóa lựa chọn hay không
  const showClearSelection = computed(() => {
    if (btns.value.includes('clearSelection')) {
      // Chỉ hiển thị nút xóa lựa chọn khi có hàng bị vô hiệu hóa
      // Vì hàng bị vô hiệu hóa sẽ ngăn chặn việc chọn hàng, dẫn đến không thể hủy chọn tất cả
      // return Object.keys(props.disabledRows).length > 0
    }
    return false;
  });
  // Có hiển thị nút thu gọn hay không
  const showCollapse = computed(() => btns.value.includes('collapse'));
  // Kích thước nút
  const btnSize = computed(() => (props.size === 'tiny' ? 'small' : null));
  
  onMounted(() => {
    // Đăng ký vxe-toolbar
    emit('register', {
      xToolbarRef,
    });
  });
  
  // Kiểm tra nút đã được cấp quyền hay chưa
  function hasBtnAuth(key: string) {
    return props.hasBtnAuth ? props.hasBtnAuth(key) : true;
  }
  
  /** Kích hoạt sự kiện */
  function trigger(name) {
    emit(name);
  }
  
  // Chuyển đổi thu gọn
  function toggleCollapse() {
    collapsed.value = !collapsed.value;
  }
  
  // 【TV360X-1975】Trong thiết kế Online, khi có nhiều trường, do việc đồng bộ xóa các bảng khác dẫn đến thời gian xóa kéo dài, vì vậy thêm loading xóa, để tránh hiểu nhầm rằng nút xóa không hoạt động
  const deleting = ref(false);
  
  let deleteTimer: any = null
  
  function onRemove() {
    trigger('remove')
    deleting.value = true;
    if (deleteTimer) {
      clearTimeout(deleteTimer)
    }
    deleteTimer = setTimeout(() => deleting.value = false, 300);
  }

</script>
