package com.abs.demo.mapper;

import java.util.List;

import com.abs.demo.entity.AbsTest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * @Description: Phòng IT test chức năng tạo gen form
 * @Author: jeecg-boot
 * @Date:   2024-10-01
 * @Version: V1.0
 */
@Mapper
public interface AbsTestMapper extends BaseMapper<AbsTest> {

}
