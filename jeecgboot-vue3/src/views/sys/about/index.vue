<template>
  <PageWrapper title="关于">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          <a :href="GITHUB_URL" target="_blank">
          <!--  {{ name }}-->
            JeecgBoot
          </a>
          Là low-code 2.x, SpringCloud, Ant Design&Vue, Mybatis-plus, Shiro, JWT, hỗ trợ microservices. Trình tạo mã mạnh mẽ cho phép tạo mã frontend và backend chỉ với một cú nhấp chuột, thực hiện phát triển low-code! JeecgBoot dẫn đầu mô hình phát triển low-code mới OnlineCoding -> Trình tạo mã -> MERGE thủ công, giúp các dự án Java giải quyết 70% công việc lặp lại, cho phép phát triển tập trung hơn vào nghiệp vụ, vừa nhanh chóng nâng cao hiệu quả, tiết kiệm chi phí phát triển, đồng thời không mất đi tính linh hoạt! Một loạt các khả năng low-code: Biểu mẫu Online, Báo cáo Online, Biểu đồ Online, Thiết kế biểu mẫu, Thiết kế quy trình, Thiết kế báo cáo, Thiết kế màn hình lớn, v.v...
        </span>
      </div>
    </template>
    <Description @register="infoRegister" class="enter-y" />
    <Description @register="register" class="my-4 enter-y" />
    <Description @register="registerDev" class="enter-y" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { h } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Description, DescItem, useDescription } from '/@/components/Description/index';
  import { GITHUB_URL, SITE_URL, DOC_URL } from '/@/settings/siteSetting';

  const { pkg, lastBuildTime } = __APP_INFO__;

  const { dependencies, devDependencies, name, version } = pkg;

  const schema: DescItem[] = [];
  const devSchema: DescItem[] = [];

  const commonTagRender = (color: string) => (curVal) => h(Tag, { color }, () => curVal);
  const commonLinkRender = (text: string) => (href) => h('a', { href, target: '_blank' }, text);

  const infoSchema: DescItem[] = [
    {
      label: '版本',
      field: 'version',
      render: commonTagRender('blue'),
    },
    {
      label: '最后编译时间',
      field: 'lastBuildTime',
      render: commonTagRender('blue'),
    },
    {
      label: '文档地址',
      field: 'doc',
      render: commonLinkRender('文档地址'),
    },
    {
      label: '预览地址',
      field: 'preview',
      render: commonLinkRender('预览地址'),
    },
    {
      label: 'Github',
      field: 'github',
      render: commonLinkRender('Github'),
    },
  ];

  const infoData = {
    version,
    lastBuildTime,
    doc: DOC_URL,
    preview: SITE_URL,
    github: GITHUB_URL,
  };

  Object.keys(dependencies).forEach((key) => {
    schema.push({ field: key, label: key });
  });

  Object.keys(devDependencies).forEach((key) => {
    devSchema.push({ field: key, label: key });
  });

  const [register] = useDescription({
    title: '生产环境依赖',
    data: dependencies,
    schema: schema,
    column: 3,
  });

  const [registerDev] = useDescription({
    title: '开发环境依赖',
    data: devDependencies,
    schema: devSchema,
    column: 3,
  });

  const [infoRegister] = useDescription({
    title: '项目信息',
    data: infoData,
    schema: infoSchema,
    column: 2,
  });
</script>
