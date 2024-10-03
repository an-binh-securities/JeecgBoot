import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/vi_VN';

const modules = import.meta.glob('./vi_VN/**/*.ts', { eager: true });
export default {
  message: {
    ...genMessage(modules as Recordable<Recordable>, 'vi_VN'),
    antdLocale,
  },
};
