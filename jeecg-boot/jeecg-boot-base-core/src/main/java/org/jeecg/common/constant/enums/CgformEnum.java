package org.jeecg.common.constant.enums;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Enum biểu mẫu online được sử dụng trong trình tạo mã
 * @author: jeecg-boot
 */
public enum CgformEnum {

    /**
     * Đơn bảng
     */
    ONE(1, "one", "/jeecg/code-template-online", "default.one", "Phong cách cổ điển", new String[]{"vue3","vue","vue3Native"}),

    /**
     * Đa bảng
     */
    MANY(2, "many", "/jeecg/code-template-online", "default.onetomany", "Phong cách cổ điển" ,new String[]{"vue"}),
    /**
     * Đa bảng (phong cách jvxe)
     */
    JVXE_TABLE(2, "jvxe", "/jeecg/code-template-online", "jvxe.onetomany", "Phong cách mặc định" ,new String[]{"vue3","vue","vue3Native"}),

    /**
     * Đa bảng (phong cách erp)
     */
    ERP(2, "erp", "/jeecg/code-template-online", "erp.onetomany", "Phong cách ERP" ,new String[]{"vue3","vue","vue3Native"}),
    /**
     * Đa bảng (phong cách bảng lồng)
     */
    INNER_TABLE(2, "innerTable", "/jeecg/code-template-online", "inner-table.onetomany", "Phong cách bảng lồng" ,new String[]{"vue3","vue"}),
    /**
     * Đa bảng (phong cách tab)
     */
    TAB(2, "tab", "/jeecg/code-template-online", "tab.onetomany", "Phong cách Tab" ,new String[]{"vue3","vue"}),
    /**
     * Danh sách cây
     */
    TREE(3, "tree", "/jeecg/code-template-online", "default.tree", "Danh sách cây" ,new String[]{"vue3","vue","vue3Native"});

    /**
     * Loại 1/đơn bảng 2/một đối nhiều 3/cây
     */
    int type;
    /**
     * Mã định danh
     */
    String code;
    /**
     * Đường dẫn mẫu trình tạo mã
     */
    String templatePath;
    /**
     * Đường dẫn mẫu trình tạo mã
     */
    String stylePath;
    /**
     * Tên phong cách mẫu
     */
    String note;
    /**
     * Hỗ trợ phong cách mã vue3: mã gói vue3 vue3Native: mã gốc vue3 vue: mã vue2
     */
    String[] vueStyle;

    /**
     * Constructor
     *
     * @param type Loại 1/đơn bảng 2/một đối nhiều 3/cây
     * @param code Mã mẫu
     * @param templatePath Đường dẫn mẫu
     * @param stylePath Đường dẫn con mẫu
     * @param note
     * @param vueStyle Hỗ trợ phong cách mã
     */
    CgformEnum(int type, String code, String templatePath, String stylePath, String note, String[] vueStyle) {
        this.type = type;
        this.code = code;
        this.templatePath = templatePath;
        this.stylePath = stylePath;
        this.note = note;
        this.vueStyle = vueStyle;
    }

    /**
     * Lấy đường dẫn mẫu theo mã
     *
     * @param code
     * @return
     */
    public static String getTemplatePathByConfig(String code) {
        return getCgformEnumByConfig(code).templatePath;
    }


    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getTemplatePath() {
        return templatePath;
    }

    public void setTemplatePath(String templatePath) {
        this.templatePath = templatePath;
    }

    public String getStylePath() {
        return stylePath;
    }

    public void setStylePath(String stylePath) {
        this.stylePath = stylePath;
    }

    public String[] getVueStyle() {
        return vueStyle;
    }

    public void setVueStyle(String[] vueStyle) {
        this.vueStyle = vueStyle;
    }

    /**
     * Tìm enum theo mã
     *
     * @param code
     * @return
     */
    public static CgformEnum getCgformEnumByConfig(String code) {
        for (CgformEnum e : CgformEnum.values()) {
            if (e.code.equals(code)) {
                return e;
            }
        }
        return null;
    }

    /**
     * Tìm tất cả theo loại
     *
     * @param type
     * @return
     */
    public static List<Map<String, Object>> getJspModelList(int type) {
        List<Map<String, Object>> ls = new ArrayList<Map<String, Object>>();
        for (CgformEnum e : CgformEnum.values()) {
            if (e.type == type) {
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("code", e.code);
                map.put("note", e.note);
                ls.add(map);
            }
        }
        return ls;
    }


}
