package com.ecaray.ecms.commons.utils;

import java.io.*;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;


/**
 * 
* @Title: CompressUtil.java 
* @Package com.ecaray.authmanager.utils
* @Description:  
* @author zhxy
* @date 2016年11月19日 下午8:43:33
* @version V1.0  
* <p>
* </p>
* </p>
* Copyright : 2015-2016 
*</p>
 */
public class CompressUtil {
	
	private static final int BUFFEREDSIZE = 1024;
	/*************
	 * 解压缩 ZIP文件
	 * @param zipFileName zip文件路径
	 * @param extPlace	解压路径
	 * @throws Exception
	 */
	public static void unzip(String zipFileName, String extPlace) throws Exception {
		ZipFile zipFile = null;
	    try {  
	        (new File(extPlace)).mkdirs();  
	        File f = new File(zipFileName);  
	        zipFile = new ZipFile(zipFileName);  
	        if((!f.exists()) && (f.length() <= 0)) {  
	            throw new Exception("要解压的文件不存在!");  
	        }  
	        String strPath, gbkPath, strtemp;  
	        File tempFile = new File(extPlace);  
	        strPath = tempFile.getAbsolutePath();  
	        Enumeration<?> e = zipFile.entries();  
	        while(e.hasMoreElements()){  
	            ZipEntry zipEnt = (ZipEntry) e.nextElement();  
	            gbkPath=zipEnt.getName();  
	            if(zipEnt.isDirectory()){  
	                strtemp = strPath + File.separator + gbkPath;  
	                File dir = new File(strtemp);  
	                dir.mkdirs();  
	                continue;  
	            } else {  
	                //读写文件  
	                InputStream is = zipFile.getInputStream(zipEnt);  
	                BufferedInputStream bis = new BufferedInputStream(is);  
	                gbkPath=zipEnt.getName();  
	                strtemp = strPath + File.separator + gbkPath;  
	              
	                //建目录  
	                String strsubdir = gbkPath;  
	                for(int i = 0; i < strsubdir.length(); i++) {  
	                    if(strsubdir.substring(i, i + 1).equalsIgnoreCase("/")) {  
	                        String temp = strPath + File.separator + strsubdir.substring(0, i);  
	                        File subdir = new File(temp);  
	                        if(!subdir.exists())  
	                        subdir.mkdir();  
	                    }  
	                }  
	                FileOutputStream fos = new FileOutputStream(strtemp);  
	                BufferedOutputStream bos = new BufferedOutputStream(fos);  
	                int c;  
	                while((c = bis.read()) != -1) {  
	                    bos.write((byte) c);  
	                }  
	                bos.close();
	                fos.close();
	            }  
	        }
	    } catch(Exception e) {  
	        e.printStackTrace();  
	        throw e;  
	    }finally{
	    	if(zipFile!=null){
	    		zipFile.close();
	    	}
	    } 
	}

	/** 
	 * 压缩zip格式的压缩文件 
	 * @param inputFilename 压缩的文件或文件夹及详细路径 
	 * @param zipFilename 输出文件名称及详细路径 
	 * @throws IOException 
	 */  
	public static void zip(String inputFilename, String zipFilename) throws IOException {  
	    zip(new File(inputFilename), zipFilename);  
	}  
	  
	/** 
	 * 压缩zip格式的压缩文件 
	 * @param inputFile 需压缩文件 
	 * @param zipFilename 输出文件及详细路径 
	 * @throws IOException 
	 */  
	public static void zip(File inputFile, String zipFilename) throws IOException {  
	    ZipOutputStream out = new ZipOutputStream(new FileOutputStream(zipFilename));  
	    try {  
	        zip(inputFile, out, "");  
	    } catch (IOException e) {  
	        throw e;  
	    } finally {  
	        out.close();  
	    }  
	}  
	  
	/** 
	 * 压缩zip格式的压缩文件 
	 * @param inputFile 需压缩文件 
	 * @param out 输出压缩文件 
	 * @param base 结束标识 
	 * @throws IOException 
	 */  
	private static void zip(File inputFile, ZipOutputStream out, String base) throws IOException {  
	    if (inputFile.isDirectory()) {  
	        File[] inputFiles = inputFile.listFiles();  
	        out.putNextEntry(new ZipEntry(base + "/"));  
	        base = base.length() == 0 ? "" : base + "/";  
	        for (int i = 0; i < inputFiles.length; i++) {  
	            zip(inputFiles[i], out, base + inputFiles[i].getName());  
	        }  
	    } else {  
	        if (base.length() > 0) {  
	            out.putNextEntry(new ZipEntry(base));  
	        } else {  
	            out.putNextEntry(new ZipEntry(inputFile.getName()));  
	        }  
	        FileInputStream in = new FileInputStream(inputFile);  
	        try {  
	            int c;  
	            byte[] by = new byte[BUFFEREDSIZE];  
	            while ((c = in.read(by)) != -1) {  
	                out.write(by, 0, c);  
	            }  
	        } catch (IOException e) {  
	            throw e;  
	        } finally {  
	            in.close();  
	        }  
	    }  
	}  

	public static void main(String[] args) throws Exception {
		String path1 = "D:/Downloads/download.zip";
		String path2 = "D:/Downloads";
		CompressUtil.unzip(path1, path2);
	}
}
