package com.ecaray.ecms.commons.utils;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.lang.reflect.Field;
import java.util.*;
import java.util.Map.Entry;

/**
 * com.ecaray.imspmo.commons.utils Author ：张凌云 Mail ：zly_432503@163.com
 * 2017/4/13 12:00 说明：
 */

public class ExcelUtils {

	private static final Logger LOGGER = LoggerFactory.getLogger(ExcelUtils.class);

	public static <T> List<T> map2Bean(List<Map<Integer, Object>> list, Class<T> clz) throws Exception {
		List<T> result = new ArrayList<T>();
		for (Map<Integer, Object> map2 : list) {
			T t = clz.newInstance();
			Field fields[] = t.getClass().getDeclaredFields();
			for (Field field : fields) {
				if (field.isAnnotationPresent(ExcelRows.class)) {
					field.setAccessible(true);
					ExcelRows excelRows = field.getAnnotation(ExcelRows.class);
					Object value = map2.get(excelRows.index());
					field.set(t, value == null ? "" : value.toString());
				}
			}
			result.add(t);
		}
		return result;
	}

	public static <T> List<T> readExcel(String filePath, Class<T> clz) throws Exception {
		return map2Bean(readExcel(filePath, Postfix.XLSX), clz);
	}

	/**
	 * 
	 * 将excel转成list</br>
	 * list下标对应一行数据。map的key为excel的列的下标
	 * 
	 * @param filePath
	 * @return
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	public static List<Map<Integer, Object>> readExcel(String filePath, Postfix postfix) throws IOException {
		return readExcel(new FileInputStream(filePath), postfix);
	}

	public static List<Map<Integer, Object>> readExcel(InputStream is, Postfix postfix) throws IOException {
		if (Postfix.XLS.equals(postfix)) {
			return read(new HSSFWorkbook(is));
		} else if (Postfix.XLSX.equals(postfix)) {
			return read(new XSSFWorkbook(is));
		}
		return null;
	}

	private static List<Map<Integer, Object>> read(Workbook workbook) throws IOException {
		List<Map<Integer, Object>> list = new ArrayList<Map<Integer, Object>>();
		Sheet hssfSheet = workbook.getSheetAt(0);
		int rowstart = hssfSheet.getFirstRowNum();
		int rowEnd = hssfSheet.getLastRowNum();
		for (int i = rowstart; i <= rowEnd; i++) {
			Map<Integer, Object> rowMap = new HashMap<Integer, Object>();
			Row row = hssfSheet.getRow(i);
			if (null == row)
				continue;
			int cellStart = row.getFirstCellNum();
			int cellEnd = row.getLastCellNum();

			for (int k = cellStart; k <= cellEnd; k++) {
				Cell cell = row.getCell(k);
				if (null == cell) {
					continue;
				}

				rowMap.put(k, getValue(cell));
			}
			list.add(rowMap);
		}
		return list;
	}

	private static Object getValue(Cell cell) {
		switch (cell.getCellType()) {
		case HSSFCell.CELL_TYPE_NUMERIC: // 数字
			return cell.getNumericCellValue();
		case HSSFCell.CELL_TYPE_STRING: // 字符串
			return cell.getStringCellValue().trim();
		case HSSFCell.CELL_TYPE_BOOLEAN: // Boolean
			return cell.getBooleanCellValue();
		case HSSFCell.CELL_TYPE_FORMULA: // 公式
			return cell.getCellFormula();
		case HSSFCell.CELL_TYPE_BLANK: // 空值
			return "";
		case HSSFCell.CELL_TYPE_ERROR: // 故障
			return "";
		default:
			return "";
		}
	}

	public enum Postfix {
		XLS(".xls"), XLSX(".xlsx");
		private String value;

		private Postfix(String value) {
			this.value = value;
		}

		public String getValue() {
			return value;
		}

		public static String getPostfix(String value) {
			for (Postfix postfix : values()) {
				if (postfix.value.equals(value)) {
					return postfix.getValue();
				}
			}
			return null;
		}
	}

	public static <T> HSSFWorkbook generateExcel(List<T> list, Class<T> clz) throws Exception {
		if (null == list || list.isEmpty()) {
			LOGGER.warn("writeExcel list is empty");
			return null;
		}
		Map<Integer, String> header = buildHeader(clz.newInstance());
		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFSheet sheet = workbook.createSheet();
		HSSFRow headRow = sheet.createRow(0);
		for (Entry<Integer, String> head : header.entrySet()) {
			HSSFCell cell = headRow.createCell(head.getKey());
			cell.setCellValue(head.getValue());
		}
		int index = 1;
		for (T data : list) {
			HSSFRow row = sheet.createRow(index);
			Map<Integer, Object> fieldMap = field2Map(data);
			for (Entry<Integer, Object> field : fieldMap.entrySet()) {
				HSSFCell cell = row.createCell(field.getKey());
				Object value = field.getValue();
				cell.setCellValue(null == value ? "" : value.toString());
			}
			index++;
		}
		return workbook;
	}

	public static void writeExcel(HSSFWorkbook book, String path) throws IOException {
		CreateFileUtil.createFile(path);
		File file = new File(path);
		FileOutputStream fos = new FileOutputStream(file);
		book.write(fos);

		if (fos != null) {
			fos.flush();
			fos.close();
		}
	}

	public static <T> void writeExcel(List<T> list, Class clz, String path) throws Exception {
		writeExcel(generateExcel(list, clz), path);
	}

	/**
	 * 下标和头映射
	 * 
	 * @param obj
	 * @return
	 */
	private static Map<Integer, String> buildHeader(Object obj) {
		List<Field> list = Arrays.asList(obj.getClass().getDeclaredFields());
		Map<Integer, String> sortMap = new TreeMap<Integer, String>();
		for (int i = 0; i < list.size(); i++) {
			Field field = list.get(i);
			ExcelRows excelRows = field.getAnnotation(ExcelRows.class);
			if (null != excelRows) {
				field.setAccessible(true);
				sortMap.put(excelRows.index(), excelRows.remark());
			}
		}
		return sortMap;
	}

	/**
	 * 下标和值映射
	 * 
	 * @param obj
	 * @return
	 * @throws IllegalAccessException
	 * @throws IllegalArgumentException
	 */
	private static Map<Integer, Object> field2Map(Object obj) throws Exception {
		List<Field> list = Arrays.asList(obj.getClass().getDeclaredFields());
		Map<Integer, Object> fieldMap = new TreeMap<Integer, Object>();
		for (int i = 0; i < list.size(); i++) {
			Field field = list.get(i);
			ExcelRows excelRows = field.getAnnotation(ExcelRows.class);
			if (null != excelRows) {
				field.setAccessible(true);
				Object val = field.get(obj);
				fieldMap.put(excelRows.index(), val == null ? "" : val.toString());
			}
		}
		return fieldMap;
	}

	public static void main(String[] args) throws Exception {

		List<Map<Integer, Object>> map = readExcel("E:/area.xls", Postfix.XLS);
		List<FcboxContractInfo> list2 = map2Bean(map, FcboxContractInfo.class);
		for (FcboxContractInfo object : list2) {
			System.out.println(object);
		}
	}
}
