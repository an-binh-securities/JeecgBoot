package org.jeecg.modules.system.model;

import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @Title: DuplicateCheckVo
 * @Description: VO kiểm tra trùng lặp
 * @Author 张代浩
 * @Date 2019-03-25
 * @Version V1.0
 */
@Data
@ApiModel(value="Mô hình dữ liệu kiểm tra trùng lặp",description="Mô hình dữ liệu kiểm tra trùng lặp")
public class DuplicateCheckVo implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * Tên bảng
     */
    @ApiModelProperty(value="Tên bảng",name="tableName",example="sys_log")
    private String tableName;
    
    /**
     * Tên trường
     */
    @ApiModelProperty(value="Tên trường",name="fieldName",example="id")
    private String fieldName;
    
    /**
     * Giá trị trường
     */
    @ApiModelProperty(value="Giá trị trường",name="fieldVal",example="1000")
    private String fieldVal;
    
    /**
     * ID dữ liệu
    */
    @ApiModelProperty(value="ID dữ liệu",name="dataId",example="2000")
    private String dataId;

}