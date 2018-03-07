package com.ecaray.ecms.services.common;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.ExcelExportUtil;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.commons.utils.StrUtils;

@Service
public class ExcelExportService {
	
	private static final String ctmContractExportPath = "/template/ctmContractExport.xlsx";
	private static final String cwaAttdance = "/template/cwaAttdance.xlsx";
	private static final String cwaAttdanceByMonth = "/template/cwaAttdancebyMonth.xlsx";

	/**
	 * 导出合同
	 */
	public byte[] exportRefundRecord(ParaMap inMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Workbook workbook = ExcelExportUtil.getTemplateFile(ctmContractExportPath);
		Sheet sheet = workbook.getSheetAt(0);
		ExcelExportUtil.fillRowList(sheet, 1, 11, (List<ParaMap>) inMap.get("data"));
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		workbook.write(out);
		byte[] buf = out.toByteArray();
		out.close();
		String fileName = "合同导出" + DateUtil.format(DateUtil.now(), "yyyy-MM-dd") + ".xlsx";
		setHttpResponseInfo(fileName, null, request, response);
		return buf;
	}
	
	/**
	 * 导出考勤报表
	 */
	public byte[] exportUserSubmitAttendanceList(ParaMap inMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Workbook workbook = ExcelExportUtil.getTemplateFile(cwaAttdance);
		Sheet sheet = workbook.getSheetAt(0);
		workbook.setSheetName(0,inMap.getString("month") + "考勤报表");
		workbook.setSheetName(1,inMap.getString("month") + "考勤详情");
		ExcelExportUtil.fillRowList(sheet, 2, 22, (List<ParaMap>) inMap.get("total"));
		Sheet sheet1 = workbook.getSheetAt(1);
		ExcelExportUtil.fillRowData(sheet1, 0,(ParaMap)inMap.get("head"));
		ExcelExportUtil.fillRowData(sheet1, 1,(ParaMap)inMap.get("head"));
		ExcelExportUtil.fillRowList(sheet1, 2, 96, (List<ParaMap>) inMap.get("record"));
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		workbook.write(out);
		byte[] buf = out.toByteArray();
		out.close();
		String fileName = "考勤报表" + "_" + DateUtil.format(DateUtil.now(), "yyyy-MM-dd") + ".xlsx";
		setHttpResponseInfo(fileName, null, request, response);
		return buf;
	}
	
	/**
	 * 导出考勤报表
	 */
	public byte[] exportUserAttendanceMonth(ParaMap inMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Workbook workbook = ExcelExportUtil.getTemplateFile(cwaAttdanceByMonth);
		Sheet sheet = workbook.getSheetAt(0);
		ExcelExportUtil.fillRowList(sheet, 1, 32, (List<ParaMap>) inMap.get("data"));
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		workbook.write(out);
		byte[] buf = out.toByteArray();
		out.close();
		String fileName = "考勤报表" + "_" + DateUtil.format(DateUtil.now(), "yyyy-MM-dd") + ".xlsx";
		setHttpResponseInfo(fileName, null, request, response);
		return buf;
	}
	
	private void setHttpResponseInfo(String fileName, String contentType, HttpServletRequest request, HttpServletResponse response) throws IOException {
		String userAgent = request.getHeader("USER-AGENT");
//		if (StrUtils.isNotNull(userAgent) && userAgent.contains("Firefox")) {
//			fileName = new String(fileName.getBytes(), "ISO-8859-1");
//		} else {
//			fileName = URLEncoder.encode(fileName, "UTF-8");
//			fileName = fileName.replaceAll("\\+", "%20");// 去掉空格字符
//		}
//		
		fileName = URLEncoder.encode(fileName, "UTF-8");
		fileName = fileName.replaceAll("\\+", "%20");// 去掉空格字符
		if (StrUtils.isNull(contentType))
			response.setContentType("application/vnd.ms-excel");
		else
			response.setContentType(contentType);
		response.setHeader("Access-Control-Expose-Headers", "Content-disposition");
		response.setHeader("Content-disposition", "attachment;filename=\"" + fileName + "\"");
	}
}
