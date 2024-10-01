package org.jeecg.common.system.vo;

import lombok.Data;

/**
 * Thực thể tham số truy vấn từ điển
 * @author: jeecg-boot
 */
@Data
public class DictQuery {
    /**
     * Tên bảng
     */
    private String table;
    /**
     * Cột lưu trữ
     */
    private String code;

    /**
     * Cột hiển thị
     */
    private String text;

    /**
     * Từ khóa truy vấn
     */
    private String keyword;

    /**
     * Giá trị của cột lưu trữ dùng để truy vấn hiển thị lại
     */
    private String codeValue;

}