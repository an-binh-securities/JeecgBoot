import type { DropMenu } from '../components/Dropdown';
import type { LocaleSetting, LocaleType } from '/#/config';

export const LOCALE: { [key: string]: LocaleType } = {
  VI_VN: 'vi_VN',
  EN_US: 'en',
};

export const localeSetting: LocaleSetting = {
  // Có hiển thị bộ chọn ngôn ngữ hay không
  showPicker: true,
  // Ngôn ngữ hiện tại
  locale: LOCALE.VI_VN,
  // Ngôn ngữ mặc định
  fallback: LOCALE.VI_VN,
  // Ngôn ngữ được phép
  availableLocales: [LOCALE.VI_VN, LOCALE.EN_US],
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
