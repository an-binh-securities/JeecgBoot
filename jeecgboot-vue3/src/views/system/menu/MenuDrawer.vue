<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" showFooter :width="adaptiveWidth" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" class="menuForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, useAttrs } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema, ComponentTypes } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { list, saveOrUpdateMenu } from './menu.api';
  import { useDrawerAdaptiveWidth } from '/@/hooks/jeecg/useAdaptiveWidth';
  import { useI18n } from "/@/hooks/web/useI18n";
  // 声明Emits
  const emit = defineEmits(['success', 'register']);
  const { adaptiveWidth } = useDrawerAdaptiveWidth();
  const attrs = useAttrs();
  const isUpdate = ref(true);
  const menuType = ref(0);
  const isButton = (type) => type === 2;
  const [registerForm, { setProps, resetFields, setFieldsValue, updateSchema, validate, clearValidate }] = useForm({
    labelCol: {
      md: { span: 8 },
      sm: { span: 10 },
    },
    wrapperCol: {
      md: { span: 16 },
      sm: { span: 14 },
    },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    menuType.value = data?.record?.menuType;

    // Lấy thông tin cây thả xuống
    const treeData = await list();
    updateSchema([
      {
        field: 'parentId',
        // update-begin--author:liaozhiyang---date:20240306---for：【QQYUN-8379】Quản lý menu quốc tế hóa
        componentProps: { treeData: translateMenu(treeData, 'name') },
        // update-end--author:liaozhiyang---date:20240306---for：【QQYUN-8379】Quản lý menu quốc tế hóa
      },
      {
        field: 'name',
        label: isButton(unref(menuType)) ? 'Nút/Quyền' : 'Tên menu',
      },
      {
        field: 'url',
        required: !isButton(unref(menuType)),
        componentProps: {
          onChange: (e) => onUrlChange(e.target.value),
        },
      },
    ]);

    // Dù là thêm mới hay chỉnh sửa, đều có thể thiết lập giá trị biểu mẫu
    if (typeof data.record === 'object') {
      let values = { ...data.record };
      setFieldsValue(values);
      onUrlChange(values.url);
    }
    // Trong trường hợp loại nút, khi chỉnh sửa thì xóa xác minh địa chỉ
    if (menuType.value == 2) {
      clearValidate();
    }
    // Vô hiệu hóa biểu mẫu
    setProps({ disabled: !attrs.showFooter });
  });
  // Lấy tiêu đề cửa sổ bật lên
  const getTitle = computed(() => (!unref(isUpdate) ? 'Thêm mới menu' : 'Chỉnh sửa menu'));
  // Sự kiện gửi
  async function handleSubmit() {
    try {
      const values = await validate();
      // iframe tương thích
      if (ComponentTypes.IFrame === values.component) {
        values.component = values.frameSrc;
      }
      setDrawerProps({ confirmLoading: true });
      // Gửi biểu mẫu
      await saveOrUpdateMenu(values, unref(isUpdate));
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

  /** Khi url thay đổi, đặt tên thành phần placeholder động */
  function onUrlChange(url) {
    let placeholder = '';
    let httpUrl = url;
    if (url != null && url != '') {
      if (url.startsWith('/')) {
        url = url.substring(1);
      }
      url = url.replaceAll('/', '-');
      // Đánh dấu đặc biệt
      url = url.replaceAll(':', '@');
      placeholder = `${url}`;
    } else {
      placeholder = 'Vui lòng nhập tên thành phần';
    }
    updateSchema([{ field: 'componentName', componentProps: { placeholder } }]);
    // update-begin---author:wangshuai ---date:20230204  for：[QQYUN-4058] Thêm xử lý thông minh cho menu------------
    if (httpUrl != null && httpUrl != '') {
      if (httpUrl.startsWith('http://') || httpUrl.startsWith('https://')) {
        setFieldsValue({ component: httpUrl });
      }
    }
    // update-end---author:wangshuai ---date:20230204  for：[QQYUN-4058] Thêm xử lý thông minh cho menu------------
  }

  /**
  * 2024-03-06
  * liaozhiyang
  * Dịch tên menu
  */
  function translateMenu(data, key) {
    if (data?.length) {
      const { t } = useI18n();
      data.forEach((item) => {
        if (item[key]) {
          if (item[key].includes("t('") && t) {
            item[key] = new Function('t', `return ${item[key]}`)(t);
          }
        }
        if (item.children?.length) {
          translateMenu(item.children, key);
        }
      });
    }
    return data;
  }
</script>
