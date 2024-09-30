package org.jeecg.config.firewall.interceptor.enums;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 
 * @author: qinfeng
 * @date: 2023/09/04 11:44
 */
public enum LowCodeUrlsEnum {
    /**
     * Yêu cầu cấu hình biểu mẫu online TODO Thêm, sửa, xóa
     */
    NEW_LOW_APP_ADD_URL("/online/cgform/api/addAll", "Thêm biểu mẫu online"),
    NEW_LOW_APP_EDIT_URL("/online/cgform/api/editAll", "Sửa biểu mẫu online"),
    ONLINE_DB_SYNC("/online/cgform/api/doDbSynch/**/**", "Đồng bộ cơ sở dữ liệu biểu mẫu online"),
    ONLINE_DEL_BATCH("/online/cgform/head/deleteBatch", "Xóa hàng loạt biểu mẫu online"),
    ONLINE_DELETE("/online/cgform/head/delete", "Xóa biểu mẫu online"),
    ONLINE_REMOVE("/online/cgform/head/removeRecord", "Loại bỏ biểu mẫu online"),
    ONLINE_COPY("/online/cgform/head/copyOnline", "Tạo chế độ xem biểu mẫu online"),
    ONLINE_TABLE("/online/cgform/head/copyOnlineTable", "Sao chép bảng biểu mẫu online"),
    ONLINE_BUTTON_AI_TEST("/online/cgform/button/aitest", "Tạo dữ liệu nút tùy chỉnh biểu mẫu online"),
    ONLINE_BUTTON_ADD("/online/cgform/button/add", "Thêm nút tùy chỉnh biểu mẫu online"),
    ONLINE_BUTTON_EDIT("/online/cgform/button/edit", "Sửa nút tùy chỉnh biểu mẫu online"),
    ONLINE_BUTTON_DEL("/online/cgform/button/deleteBatch", "Xóa nút tùy chỉnh biểu mẫu online"),
    ONLINE_ENHANCE_JS("/online/cgform/head/enhanceJs/**", "Tăng cường JS biểu mẫu online"),
    ONLINE_ENHANCE_JAVA("/online/cgform/head/enhanceJava/**", "Tăng cường JAVA biểu mẫu online"),
    /**
     * Yêu cầu cấu hình báo cáo online
     */
    ONLINE_CG_REPORT_ADD("/online/cgreport/head/add", "Thêm báo cáo online"),
    ONLINE_CG_REPORT_EDIT("/online/cgreport/head/editAll", "Sửa báo cáo online"),
    ONLINE_CG_REPORT_DEL("/online/cgreport/head/delete", "Xóa báo cáo online"),
    ONLINE_CG_REPORT_PARSE_SQL("/online/cgreport/head/parseSql", "Phân tích SQL báo cáo online"),
    /**
     * Yêu cầu cấu hình biểu đồ online
     */
    ONLINE_GRAPH_REPORT_ADD("/online/graphreport/head/add", "Thêm biểu đồ online"),
    ONLINE_GRAPH_REPORT_EDIT("/online/graphreport/head/edit", "Sửa biểu đồ online"),
    ONLINE_GRAPH_REPORT_DEL("/online/graphreport/head/deleteBatch", "Xóa biểu đồ online"),
    ONLINE_GRAPH_REPORT_PARSE_SQL("/online/cgreport/head/parseSql", "Phân tích SQL biểu đồ online"),

    /**
     * Yêu cầu cấu hình màn hình lớn
     */
    BIG_SCREEN_DB_ADD("/bigscreen/bigScreenDb/add", "Thêm nguồn dữ liệu màn hình lớn"),
    BIG_SCREEN_DB_EDIT("/bigscreen/bigScreenDb/edit", "Sửa nguồn dữ liệu màn hình lớn"),
    BIG_SCREEN_DB_DEL("/bigscreen/bigScreenDb/delete", "Xóa nguồn dữ liệu màn hình lớn"),
    BIG_SCREEN_DB_TEST_CONNECTION("/bigscreen/bigScreenDb/testConnection", "Kiểm tra kết nối nguồn dữ liệu màn hình lớn"),
//    BIG_SCREEN_SAVE("/bigscreen/visual/save", "Thêm màn hình lớn"),
//    BIG_SCREEN_EDIT("/bigscreen/visual/update", "Sửa màn hình lớn"),
//    BIG_SCREEN_COPY("/bigscreen/visual/copy", "Sao chép màn hình lớn"),
//    BIG_SCREEN_REMOVE("/bigscreen/visual/remove", "Loại bỏ màn hình lớn"),
//    BIG_SCREEN_DEL("/bigscreen/visual/deleteById", "Xóa màn hình lớn"),

    /**
     * Yêu cầu cấu hình bảng điều khiển
     */
    DRAG_DB_ADD("/drag/onlDragDataSource/add", "Thêm nguồn dữ liệu bảng điều khiển"),
    DRAG_DB_TEST_CONNECTION("/drag/onlDragDataSource/testConnection", "Kiểm tra kết nối nguồn dữ liệu bảng điều khiển"),
    DRAG_PARSE_SQL("/drag/onlDragDatasetHead/queryFieldBySql", "Phân tích SQL tập dữ liệu bảng điều khiển"),
    DRAG_DATASET_ADD("/drag/onlDragDatasetHead/add", "Thêm tập dữ liệu bảng điều khiển");

    /**
     * Yêu cầu cấu hình khác
     */

    private String url;
    private String title;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    LowCodeUrlsEnum(String url, String title) {
        this.url = url;
        this.title = title;
    }

    /**
     * Lấy số lượng có sẵn theo mã
     *
     * @return
     */
    public static List<String> getLowCodeInterceptUrls() {
        return Arrays.stream(LowCodeUrlsEnum.values()).map(LowCodeUrlsEnum::getUrl).collect(Collectors.toList());
    }

}