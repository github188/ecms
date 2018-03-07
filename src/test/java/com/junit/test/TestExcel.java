package com.junit.test;

import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.*;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.dao.mapper.cwa.CwaUserHolidayMapper;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.cwa.CwaUserHoliday;
import com.ecaray.ecms.services.authority.UserService;

@Service
public class TestExcel extends BaseJunit4Test {
	
	@Autowired
	CwaUserHolidayMapper mapper;
	@Autowired
	UserService userService;

	@Test
	public void testHoliday() {
		String filepath = "C:/Users/Administrator/Desktop/holiday1.xlsx";
		String fileType = filepath.substring(filepath.lastIndexOf(".") + 1, filepath.length());
		Workbook wb = null;
		InputStream is = null;
		try {
			is = new FileInputStream(filepath);
			if (fileType.equals("xls")) {
				wb = new HSSFWorkbook(is);
			} else if (fileType.equals("xlsx")) {
				wb = new XSSFWorkbook(is);
			} else {
				System.out.println("读取的不是excel文件");
			}
			Sheet sheet = wb.getSheetAt(0);

			int rowSize = sheet.getLastRowNum() + 1;
			for (int j = 0; j < rowSize; j++) {// 遍历行
				Row row = sheet.getRow(j);
				if (row == null) {
					continue;
				}
				
				Cell cell0 = row.getCell(0);
				if(cell0.getCellType() != Cell.CELL_TYPE_STRING){
					cell0.setCellType(Cell.CELL_TYPE_STRING);
				}
				String usercode = row.getCell(0).getStringCellValue();
				User user = userService.selectUserByUsercode(usercode);
				String userid = user.getId();
				Cell cell1 = row.getCell(1);
				if(cell1.getCellType() != Cell.CELL_TYPE_STRING){
					cell1.setCellType(Cell.CELL_TYPE_STRING);
				}
				String lasttakeoff = row.getCell(1).getStringCellValue();
				double lasttakeoff1 = Double.parseDouble(lasttakeoff);
				
				Cell cell2 = row.getCell(2);
				if(cell2.getCellType() != Cell.CELL_TYPE_STRING){
					cell2.setCellType(Cell.CELL_TYPE_STRING);
				}
				String addtakeoff = row.getCell(2).getStringCellValue();
				double addtakeoff1 = Double.parseDouble(addtakeoff);
				Cell cell3 = row.getCell(3);
				if(cell3.getCellType() != Cell.CELL_TYPE_STRING){
					cell3.setCellType(Cell.CELL_TYPE_STRING);
				}
				String subtakeoff = row.getCell(3).getStringCellValue();
				double subtakeoff1 = Double.parseDouble(subtakeoff);
				Cell cell4 = row.getCell(4);
				if(cell4.getCellType() != Cell.CELL_TYPE_STRING){
					cell4.setCellType(Cell.CELL_TYPE_STRING);
				}
				String lastannul = row.getCell(4).getStringCellValue();
				double lastannul1 = Double.parseDouble(lastannul);
				Cell cell5 = row.getCell(5);
				if(cell5.getCellType() != Cell.CELL_TYPE_STRING){
					cell5.setCellType(Cell.CELL_TYPE_STRING);
				}
				String annul = row.getCell(5).getStringCellValue();
				double annul1 = Double.parseDouble(annul);
				CwaUserHoliday holiday = new CwaUserHoliday();
				holiday.setUserId(userid);
				holiday.setAddTakeoff(addtakeoff1);
				holiday.setAnnual(annul1);
				holiday.setLastAnnual(lastannul1);
				holiday.setLastTakeoff(lasttakeoff1);
				holiday.setSubTakeoff(subtakeoff1);
				mapper.insertSelective(holiday);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
	
	
	public static void main(String[] args) throws Exception {
        String dbur1 = "jdbc:odbc:driver={Microsoft Access Driver (*.mdb)};DBQ=F://ZKTeco//ZKTime5.0//att2000.mdb";  
        Connection conn = DriverManager.getConnection(dbur1, "Admin", "");  
        Statement stmt = conn.createStatement();  
        ResultSet rs = stmt.executeQuery("select * from Table1");  
        while (rs.next()) {  
            System.out.println(rs.getString(1));  
        }  
        rs.close();  
        stmt.close();  
        conn.close();  
	}
}
