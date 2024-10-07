import { BasicColumn, FormSchema } from '/@/components/Table';

const dbDriverMap = {
  // MySQL 数据库
  '1': { dbDriver: 'com.mysql.jdbc.Driver' },
  //MySQL5.7+ 数据库
  '4': { dbDriver: 'com.mysql.cj.jdbc.Driver' },
  // Oracle
  '2': { dbDriver: 'oracle.jdbc.OracleDriver' },
  // SQLServer 数据库
  '3': { dbDriver: 'com.microsoft.sqlserver.jdbc.SQLServerDriver' },
  // marialDB 数据库
  '5': { dbDriver: 'org.mariadb.jdbc.Driver' },
  // postgresql 数据库
  '6': { dbDriver: 'org.postgresql.Driver' },
  // 达梦 数据库
  '7': { dbDriver: 'dm.jdbc.driver.DmDriver' },
  // 人大金仓 数据库
  '8': { dbDriver: 'com.kingbase8.Driver' },
  // 神通 数据库
  '9': { dbDriver: 'com.oscar.Driver' },
  // SQLite 数据库
  '10': { dbDriver: 'org.sqlite.JDBC' },
  // DB2 数据库
  '11': { dbDriver: 'com.ibm.db2.jcc.DB2Driver' },
  // Hsqldb 数据库
  '12': { dbDriver: 'org.hsqldb.jdbc.JDBCDriver' },
  // Derby 数据库
  '13': { dbDriver: 'org.apache.derby.jdbc.ClientDriver' },
  // H2 数据库
  '14': { dbDriver: 'org.h2.Driver' },
  // 其他数据库
  '15': { dbDriver: '' },
};
const dbUrlMap = {
  // MySQL 数据库
  '1': { dbUrl: 'jdbc:mysql://127.0.0.1:3306/jeecg-boot?characterEncoding=UTF-8&useUnicode=true&useSSL=false' },
  //MySQL5.7+ 数据库
  '4': {
    dbUrl:
      'jdbc:mysql://127.0.0.1:3306/jeecg-boot?characterEncoding=UTF-8&useUnicode=true&useSSL=false&tinyInt1isBit=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Shanghai',
  },
  // Oracle
  '2': { dbUrl: 'jdbc:oracle:thin:@127.0.0.1:1521:ORCL' },
  // SQLServer 数据库
  '3': { dbUrl: 'jdbc:sqlserver://127.0.0.1:1433;SelectMethod=cursor;DatabaseName=jeecgboot' },
  // Mariadb 数据库
  '5': { dbUrl: 'jdbc:mariadb://127.0.0.1:3306/jeecg-boot?characterEncoding=UTF-8&useSSL=false' },
  // Postgresql 数据库
  '6': { dbUrl: 'jdbc:postgresql://127.0.0.1:5432/jeecg-boot' },
  // 达梦 数据库
  '7': { dbUrl: 'jdbc:dm://127.0.0.1:5236/?jeecg-boot&zeroDateTimeBehavior=convertToNull&useUnicode=true&characterEncoding=utf-8' },
  // 人大金仓 数据库
  '8': { dbUrl: 'jdbc:kingbase8://127.0.0.1:54321/jeecg-boot' },
  // 神通 数据库
  '9': { dbUrl: 'jdbc:oscar://192.168.1.125:2003/jeecg-boot' },
  // SQLite 数据库
  '10': { dbUrl: 'jdbc:sqlite://opt/test.db' },
  // DB2 数据库
  '11': { dbUrl: 'jdbc:db2://127.0.0.1:50000/jeecg-boot' },
  // Hsqldb 数据库
  '12': { dbUrl: 'jdbc:hsqldb:hsql://127.0.0.1/jeecg-boot' },
  // Derby 数据库
  '13': { dbUrl: 'jdbc:derby://127.0.0.1:1527/jeecg-boot' },
  // H2 数据库
  '14': { dbUrl: 'jdbc:h2:tcp://127.0.0.1:8082/jeecg-boot' },
  // 其他数据库
  '15': { dbUrl: '' },
};

export const columns: BasicColumn[] = [
  {
    title: 'Tên nguồn dữ liệu',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: 'Loại cơ sở dữ liệu',
    dataIndex: 'dbType_dictText',
    width: 200,
  },
  {
    title: 'Lớp trình điều khiển',
    dataIndex: 'dbDriver',
    width: 200,
  },
  {
    title: 'Địa chỉ nguồn dữ liệu',
    dataIndex: 'dbUrl',
  },
  {
    title: 'Tên người dùng',
    dataIndex: 'dbUsername',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: 'Tên nguồn dữ liệu',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'dbType',
    label: 'Loại cơ sở dữ liệu',
    component: 'JDictSelectTag',
    colProps: { span: 8 },
    componentProps: () => {
      return {
        dictCode: 'database_type',
      };
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'code',
    label: 'Mã nguồn dữ liệu',
    component: 'Input',
    required: true,
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
  {
    field: 'name',
    label: 'Tên nguồn dữ liệu',
    component: 'Input',
    required: true,
  },
  {
    field: 'dbType',
    label: 'Loại cơ sở dữ liệu',
    component: 'JDictSelectTag',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        dictCode: 'database_type',
        onChange: (e: any) => {
          formModel = Object.assign(formModel, dbDriverMap[e], dbUrlMap[e]);
        },
      };
    },
  },
  {
    field: 'dbDriver',
    label: 'Lớp trình điều khiển',
    required: true,
    component: 'Input',
  },
  {
    field: 'dbUrl',
    label: 'Địa chỉ nguồn dữ liệu',
    required: true,
    component: 'Input',
  },
  {
    field: 'dbUsername',
    label: 'Tên người dùng',
    required: true,
    component: 'Input',
  },
  {
    field: 'dbPassword',
    label: 'Mật khẩu',
    required: true,
    component: 'InputPassword',
    slot: 'pwd',
  },
  {
    field: 'remark',
    label: 'Ghi chú',
    component: 'InputTextArea',
  },
];
