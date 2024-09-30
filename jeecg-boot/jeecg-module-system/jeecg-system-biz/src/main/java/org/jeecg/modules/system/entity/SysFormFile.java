package org.jeecg.modules.system.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import org.jeecgframework.poi.excel.annotation.Excel;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Date;

/**
 * @Description: Tệp bình luận biểu mẫu
 * @Author: jeecg-boot
 * @Date:   2022-07-21
 * @Version: V1.0
 */
@Data
@TableName("sys_form_file")
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@ApiModel(value="sys_form_file đối tượng", description="Tệp bình luận biểu mẫu")
public class SysFormFile {
    
    /**id*/
    @TableId(type = IdType.ASSIGN_ID)
    @ApiModelProperty(value = "id")
    private String id;
    /**Tên bảng*/
    @Excel(name = "Tên bảng", width = 15)
    @ApiModelProperty(value = "Tên bảng")
    private String tableName;
    /**Dữ liệu id*/
    @Excel(name = "Dữ liệu id", width = 15)
    @ApiModelProperty(value = "Dữ liệu id")
    private String tableDataId;
    /**Liên kết tệp id*/
    @Excel(name = "Liên kết tệp id", width = 15)
    @ApiModelProperty(value = "Liên kết tệp id")
    private String fileId;
    /**Loại tài liệu (folder: thư mục excel: excel doc: word pp: ppt image: hình ảnh archive: tài liệu khác video: video)*/
    @Excel(name = "Loại tài liệu (folder: thư mục excel: excel doc: word pp: ppt image: hình ảnh archive: tài liệu khác video: video)", width = 15)
    @ApiModelProperty(value = "Loại tài liệu (folder: thư mục excel: excel doc: word pp: ppt image: hình ảnh archive: tài liệu khác video: video)")
    private String fileType;
    /**Tên đăng nhập của người tạo*/
    @Excel(name = "Tên đăng nhập của người tạo", width = 15)
    @ApiModelProperty(value = "Tên đăng nhập của người tạo")
    private String createBy;
    /**Ngày tạo*/
    @Excel(name = "Ngày tạo", width = 20, format = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @ApiModelProperty(value = "Ngày tạo")
    private Date createTime;
}