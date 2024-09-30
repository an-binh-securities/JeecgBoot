package org.jeecg.modules.system.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * Biểu mẫu đăng nhập
 *
 * @Author scott
 * @since  2019-01-18
 */
@ApiModel(value="Đối tượng đăng nhập", description="Đối tượng đăng nhập")
public class SysLoginModel {
    @ApiModelProperty(value = "Tài khoản")
    private String username;
    @ApiModelProperty(value = "Mật khẩu")
    private String password;
    @ApiModelProperty(value = "Mã xác nhận")
    private String captcha;
    @ApiModelProperty(value = "Key mã xác nhận")
    private String checkKey;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCaptcha() {
        return captcha;
    }

    public void setCaptcha(String captcha) {
        this.captcha = captcha;
    }

	public String getCheckKey() {
		return checkKey;
	}

	public void setCheckKey(String checkKey) {
		this.checkKey = checkKey;
	}
    
}