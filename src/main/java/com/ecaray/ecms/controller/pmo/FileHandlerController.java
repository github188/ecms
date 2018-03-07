package com.ecaray.ecms.controller.pmo;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.services.common.FileService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * com.ecaray.imspmo.controller
 * Author ：zhxy
 * 2017/4/4 11:40
 * 说明：文件上传下载
 */
@Api(description = "PMO/文件管理")
@Controller
@RequestMapping("file")
public class FileHandlerController {
    @Autowired
    public FileService fileService;

    public FileHandlerController(FileService fileService) {
        this.fileService = fileService;
    }

    /**
     * Author ：zhxy
     * 说明：富文本文件上传，filename 需要重新设置
     */
    @RequestMapping(value = "/upload",method = RequestMethod.POST)
    public @ResponseBody  Result  fileName0(@RequestParam("content0") CommonsMultipartFile file) throws IOException {
        return fileService.fileUpload("image",file);
    }


    /**
     * Author ：zhxy
     * 说明：下载文件
     */
    @Authorization
    @RequestMapping(value = "/download",method = RequestMethod.GET)
    public Result fileDownload(String fileName,HttpServletResponse response,HttpServletRequest req) {
        return fileService.getFile("image",fileName,null,req,response);
    }
}
