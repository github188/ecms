package com.ecaray.ecms.commons.authorization.manager;


import com.ecaray.ecms.commons.authorization.model.TokenModel;

/**
 * com.ecaray.authority.authorization.annotation
 * Author ：zhxy
 * 2017/2/20 20:19
 * 说明：对token进行接口的操作
 */
public interface TokenManager {

    /**
     * 创建一个token关联上指定用户
     * @param userId 指定用户的id
     * @return 生成的token
     */
    public TokenModel createToken(String userId);

    /**
     * 检查token是否有效
     * @param model token
     * @return 是否有效
     */
    public boolean checkToken(TokenModel model);

    /**
     * 从字符串中解析token
     * @param authentication 加密后的字符串
     * @return
     */
    public TokenModel getToken(String authentication);

    /**
     * 清除token
     * @param userId 登录用户的id
     */
    public void deleteToken(String userId);

}
