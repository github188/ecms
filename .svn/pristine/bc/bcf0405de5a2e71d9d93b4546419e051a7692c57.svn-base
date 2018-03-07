package com.ecaray.ecms.services.common;

import java.awt.Image;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Iterator;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.entity.sys.SysDownload;


@Service
public class FileService {
	
	@Value("${file.path}")
	private String path;
	
	
	public Result fileUpload(String range, CommonsMultipartFile file) throws IOException {
		// 用来检测程序运行时间
		String fileName = DataUtil.uuidData();
		String picType = file.getContentType().split("/")[1];
		OutputStream os = null;
		InputStream is = null;
		try {
			if (!StringUtils.isEmpty(picType)) {
				fileName = fileName + "." + picType;
			}
			String filePath = path + "/" + range + "/" + fileName;

			File outFile = new File(filePath);
			if (!outFile.exists())
				outFile.createNewFile();
			// 获取输出流
			os = new FileOutputStream(outFile);
			// 获取输入流 CommonsMultipartFile 中可以直接得到文件的流
			is = file.getInputStream();
			int temp;
			// 一个一个字节的读取并写入
			while ((temp = is.read()) != (-1)) {
				os.write(temp);
			}

		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return Result.failed("file upload error");
		} finally {
			if (os != null) {
				os.flush();
				os.close();
			}
			if (is != null) {
				is.close();
			}
		}
		return Result.success().addObject(fileName);
	}

	public Result springUpload(String range, HttpServletRequest request) throws IllegalStateException, IOException {
		String fileName = DataUtil.uuidData();
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
				request.getSession().getServletContext());
		if (multipartResolver.isMultipart(request)) {
			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
			Iterator iter = multiRequest.getFileNames();
			while (iter.hasNext()) {
				MultipartFile file = multiRequest.getFile(iter.next().toString());
				if (file != null) {
					String name = file.getContentType().split("/")[1];
					fileName = fileName + "." + name;
					String filepath = path + "/" + range + "/" + fileName;
					String rootPath = path + "/" + range;
					File rootFile = new File(rootPath);
					if (!rootFile.exists()) {
						rootFile.mkdirs();
					}
					File outFile = new File(filepath);
					if (!outFile.exists())
						outFile.createNewFile();
					// 上传
					file.transferTo(outFile);
				}
			}
		}
		return Result.success().addObject(fileName);
	}
	
	public String newSpringUpload(String range, HttpServletRequest request) throws IllegalStateException, IOException {
		String fileName = DataUtil.uuidData();
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
				request.getSession().getServletContext());
		if (multipartResolver.isMultipart(request)) {
			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
			Iterator iter = multiRequest.getFileNames();
			while (iter.hasNext()) {
				MultipartFile file = multiRequest.getFile(iter.next().toString());
				if (file != null) {
					String filepath = path + "/" + range + "/" + fileName;
					String rootPath = path + "/" + range;
					File rootFile = new File(rootPath);
					if (!rootFile.exists()) {
						rootFile.mkdirs();
					}
					File outFile = new File(filepath);
					if (!outFile.exists())
						outFile.createNewFile();
					// 上传
					file.transferTo(outFile);
				}
			}
		}
		return fileName;
	}

	/**
	 * 文件下载
	 */
	public Result getFile(String src,String fileName,String realName,HttpServletRequest request,HttpServletResponse response) {
		InputStream inputStream = null;
		OutputStream os = null;
		realName = StrUtils.isNull(realName) ? fileName : realName;
		try {
			String agent = request.getHeader("USER-AGENT");
			if (agent.indexOf("Mozilla") != -1){
				realName = new String(realName.getBytes("UTF-8"), "iso-8859-1");
			} else {
				realName = URLEncoder.encode(realName, "UTF-8");
			}
			response.setCharacterEncoding("utf-8");
			response.setContentType("multipart/form-data");
			response.setHeader("Content-Disposition", "attachment;fileName=" + realName);
			String filePath = path + "/" + src + "/" + fileName;
			File file = new File(filePath);
			if (!file.exists()) {
				file = new File(filePath + "." + realName.split("[.]")[1]);
	        } 
        	inputStream = new FileInputStream(file);
			os = response.getOutputStream();
			byte[] b = new byte[2048];
			int length;
			while ((length = inputStream.read(b)) > 0) {
				os.write(b, 0, length);
			}
		} catch (Exception e) {
			return Result.failed("文件未找到！");
		} finally {
			try {
				if (os != null) {
					os.close();
				}
				if (inputStream != null) {
					inputStream.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return Result.success();
	}
	
	/**
	 * 下载图片 重载1
	 */
	public Result getImg(String fileName,String src,Integer w,Integer h,HttpServletResponse resp,HttpServletRequest req) throws IOException {
		SysDownload download = new SysDownload();
		download.setWidth(w);
		download.setHeight(h);
		download.setFileName(fileName);
		download.setFileSrc(src);
		download.setResp(resp);
		download.setReq(req);
		return getImg(download);
	}
	
	/**
	 * 下载图片
	 */
	public Result getImg(SysDownload download) throws IOException {
		InputStream inputStream = null;
		try {
			String fileSrc = download.getFileSrc();
			String fileName = download.getFileName();
			HttpServletResponse resp = download.getResp();
			HttpServletRequest request = download.getReq();
			String agent = request.getHeader("USER-AGENT");
			if (agent.indexOf("Mozilla") != -1){
				fileName = new String(fileName.getBytes("UTF-8"), "iso-8859-1");
			} else {
				fileName = URLEncoder.encode(fileName, "UTF-8");
			}
			resp.setHeader("Content-Disposition", "attachment;fileName=" + fileName);
			File file = new File(path + "/" + fileSrc + "/" + fileName);
			inputStream = new FileInputStream(file);
			Integer w = download.getWidth();
			Integer h = download.getHeight();
//			createImage(inputStream,w,h,resp.getOutputStream());
			String aft = "jpg";
			String[] names = fileName.split("[.]");
			if (names.length > 1) {
				aft = names[1];
			}
			resp.setContentType("image/" + aft);
			if (aft.equals("gif") || aft.equals("png")) {
				byte[] b = new byte[2048];
				int length;
				while ((length = inputStream.read(b)) > 0) {
					resp.getOutputStream().write(b, 0, length);
				}
			} else {
				resp.getOutputStream().write(getThumbnail(inputStream,aft,w,h));
			}
		} catch (Exception e) {
			return Result.failed("下载错误！");
		} finally {
			if (inputStream != null) {
				inputStream.close();
			}
		}
		return Result.success();
	}
	
	public static byte[] getThumbnail(InputStream paramInputStream, String aft,Integer w, Integer h) throws IOException {
		BufferedImage localBufferedImage1 = ImageIO.read(paramInputStream);
		int width = localBufferedImage1.getWidth();  
        int height = localBufferedImage1.getHeight(); 
        w =  w == null ? width :w;
        h =  h == null ? height :h;
		BufferedImage localBufferedImage2 = new BufferedImage(w, h, 1);
		ByteArrayOutputStream localByteArrayOutputStream = new ByteArrayOutputStream();
		localBufferedImage2.getGraphics().drawImage(localBufferedImage1, 0, 0, w, h, null);
		ImageIO.write(localBufferedImage2, aft, localByteArrayOutputStream);
		byte[] arrayOfByte = localByteArrayOutputStream.toByteArray();
		localByteArrayOutputStream.close();
		return arrayOfByte;
	}
	
	/**
	 * 缩放图片
	 */
	public void createImage(InputStream in,Integer w,Integer h,OutputStream out) throws IOException {
		BufferedImage bufferedImage = ImageIO.read(in);
		int width = bufferedImage.getWidth();  
        int height = bufferedImage.getHeight(); 
        w =  w == null ? width :w;
        h =  h == null ? height :h;
		BufferedImage bufferedImage1 = new BufferedImage(w, h, BufferedImage.TYPE_INT_BGR);
		Image image = bufferedImage.getScaledInstance(w, h, Image.SCALE_SMOOTH);
		bufferedImage1.getGraphics().drawImage(image, 0, 0, null);
		ImageIO.write(bufferedImage1, "jpg", out);
	}
}
