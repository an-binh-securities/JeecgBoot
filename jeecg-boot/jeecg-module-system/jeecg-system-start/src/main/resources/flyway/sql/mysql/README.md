# SQL File Naming Rules
`V[YYYYMMDD]_[SequenceNumber]__[ModuleAbbreviation]_[OperationType]_[BusinessDescription].sql`

For example:
```
V20240104_1__easyoa_add_field_attendance.sql
R__202402_drag_update_template.sql
```


### SQL Naming Rules Explanation
- 1. For scripts that need to be executed only once, start with an uppercase "V".
- 2. For scripts that need to be executed multiple times, start with an uppercase "R". For example, R__clean.sql. Scripts starting with "R" will be executed whenever they are changed.
- 3. Scripts starting with "V" have a higher priority than those starting with "R".

### Naming Rules Example
Refer to the blog:
https://blog.csdn.net/Jiao1225/article/details/129590660