import type { DropMenu } from '../components/Dropdown';
import type { LocaleSetting, LocaleType } from '/#/config';

export const LOCALE: { [key: string]: LocaleType } = {
  VI_VN: 'zh_CN',
  EN_US: 'en',
};

export const localeSetting: LocaleSetting = {
  // Có hiển thị bộ chọn ngôn ngữ hay không
  showPicker: true,
  // Ngôn ngữ hiện tại
  locale: LOCALE.ZH_CN,
  // Ngôn ngữ mặc định
  fallback: LOCALE.ZH_CN,
  // Ngôn ngữ được phép
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
};

// Danh sách ngôn ngữ
export const localeList: DropMenu[] = [
  {
    text: 'Tiếng Việt',
    event: LOCALE.VI_VN,
  },
  {
    text: 'English',
    event: LOCALE.EN_US,
  },
];
