<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :width="800" title="Đại lý người dùng" @ok="handleSubmit" destroyOnClose>
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formAgentSchema } from './user.data';
  import { getUserAgent, saveOrUpdateAgent } from './user.api';
  // Khai báo Emits
  const emit = defineEmits(['success', 'register']);
  // Cấu hình biểu mẫu
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 180,
    schemas: formAgentSchema,
    showActionButtonGroup: false,
  });
  // Gán giá trị biểu mẫu
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    // Đặt lại biểu mẫu
    await resetFields();
    setModalProps({ confirmLoading: false });
    // Truy vấn lấy dữ liệu biểu mẫu
    const res = await getUserAgent({ userName: data.userName });
    data = res.result ? res.result : data;
    // Gán giá trị biểu mẫu
    await setFieldsValue({ ...data });
  });
  // Sự kiện gửi biểu mẫu
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // Gửi biểu mẫu
      await saveOrUpdateAgent(values);
      // Đóng cửa sổ bật lên
      closeModal();
      // Làm mới danh sách
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
