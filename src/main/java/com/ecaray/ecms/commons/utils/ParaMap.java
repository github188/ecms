/*** Eclipse Class Decompiler plugin, copyright (c) 2012 Chao Chen (cnfree2000@hotmail.com) ***/
package com.ecaray.ecms.commons.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.serializer.ValueFilter;
import com.ecaray.ecms.entity.authority.User;
import com.github.pagehelper.Page;

public class ParaMap extends TreeMap {
	private static final long serialVersionUID = 1L;
	private static ValueFilter filter = new ValueFilter() {
		public Object process(Object paramObject1, String paramString,Object paramObject2){if(paramObject2==null)return"";if((paramObject2 instanceof BigDecimal)||(paramObject2 instanceof Double)||(paramObject2 instanceof Float))return new BigDecimal(paramObject2.toString());return paramObject2;}};

	public ParaMap() {
	}

	public ParaMap(Map paramMap) {
		if (paramMap == null)
			return;
		putAll(paramMap);
	}

	public Object put(Object paramObject1, Object paramObject2) {
		String str = String.valueOf(paramObject1);
		return super.put(str, paramObject2);
	}

	public Object get(Object paramObject) {
		return super.get(paramObject);
	}

	public String getString(String paramString) {
		String str = null;
		if (containsKey(paramString))
			str = String.valueOf(get(paramString));
		return str;
	}

	public Double getDouble(String paramString) {
		if (containsKey(paramString)) {
			String str = getString(paramString);
			Double localDouble = Double.valueOf(Double.parseDouble(str));
			return localDouble;
		}
		return null;
	}

	public Double getDouble(String paramString, Double paramDouble) {
		Double localDouble = getDouble(paramString);
		if (localDouble != null)
			return localDouble;
		return paramDouble;
	}

	public int getInt(String paramString, int paramInt) {
		Integer localInteger = getInteger(paramString);
		if (localInteger == null)
			return paramInt;
		return localInteger.intValue();
	}

	public int getInt(String paramString) {
		return getInt(paramString, 0);
	}

	public Integer getInteger(String paramString) {
		if (containsKey(paramString)) {
			String str = getString(paramString);
			try {
				int i = Integer.parseInt(str);
				return Integer.valueOf(i);
			} catch (Exception localException) {
				return null;
			}
		}
		return null;
	}

	public Long getLong(String paramString) {
		if (containsKey(paramString)) {
			String str = getString(paramString);
			long l = Long.parseLong(str);
			return Long.valueOf(l);
		}
		return null;
	}

	public BigDecimal getBigDecimal(String paramString) {
		BigDecimal localBigDecimal = null;
		if (containsKey(paramString)) {
			String str = getString(paramString);
			if ((str != null) && (!("".equals(str))) && (!(str.equalsIgnoreCase("null"))))
				localBigDecimal = new BigDecimal(str);
		}
		return localBigDecimal;
	}

	public List getList(String paramString) {
		Object localObject = get(paramString);
		return ((List) localObject);
	}

	public List getFields() {
		return getList("fs");
	}

	public int getFieldCount() {
		List localList = getFields();
		if (localList == null)
			return -1;
		return localList.size();
	}

	public boolean hasField(String paramString) {
		return (getFieldIndex(paramString) != -1);
	}

	public int getFieldIndex(String paramString) {
		List localList = getFields();
		if (localList == null)
			return -1;
		for (int i = 0; i < localList.size(); ++i) {
			ParaMap localParaMap = (ParaMap) localList.get(i);
			if (paramString.equals(localParaMap.getString("name")))
				return i;
		}
		return -1;
	}

	public String getField(int paramInt) {
		List localList = getFields();
		if (localList == null)
			return null;
		return String.valueOf(localList.get(paramInt));
	}

	public List getRecords() {
		return getList("rs");
	}

	public int getRecordCount() {
		List localList = getRecords();
		if (localList == null)
			return -1;
		return localList.size();
	}

	public ParaMap clone() {
		ParaMap localParaMap = new ParaMap();
		localParaMap.putAll(this);
		return localParaMap;
	}

	public Object getRecordValue(int paramInt, String paramString) {
		return getRecordValue(paramInt, getFieldIndex(paramString));
	}

	public Object getRecordValue(int paramInt1, int paramInt2) {
		if (paramInt2 < 0)
			return null;
		List localList1 = getFields();
		if ((localList1 == null) || (localList1.size() == 0) || (paramInt2 >= localList1.size()))
			return null;
		List localList2 = (List) getRecords().get(paramInt1);
		return localList2.get(paramInt2);
	}

	public String getRecordString(int paramInt, String paramString) {
		return getRecordString(paramInt, getFieldIndex(paramString));
	}

	public String getRecordString(int paramInt1, int paramInt2) {
		Object localObject = getRecordValue(paramInt1, paramInt2);
		if (localObject == null)
			return null;
		return localObject.toString();
	}

	public Integer getRecordInteger(int paramInt, String paramString) {
		return getRecordInteger(paramInt, getFieldIndex(paramString));
	}

	public Integer getRecordInteger(int paramInt1, int paramInt2) {
		String str = getRecordString(paramInt1, paramInt2);
		if ((StrUtils.isNull(str)) || (!(StrUtils.isInteger(str))))
			return null;
		return Integer.valueOf(Integer.parseInt(str));
	}

	public int getRecordInt(int paramInt1, String paramString, int paramInt2) {
		return getRecordInt(paramInt1, getFieldIndex(paramString), paramInt2);
	}

	public int getRecordInt(int paramInt, String paramString) {
		return getRecordInt(paramInt, getFieldIndex(paramString));
	}

	public int getRecordInt(int paramInt1, int paramInt2, int paramInt3) {
		Integer localInteger = getRecordInteger(paramInt1, paramInt2);
		if (localInteger == null)
			return paramInt3;
		return localInteger.intValue();
	}

	public int getRecordInt(int paramInt1, int paramInt2) {
		return getRecordInt(paramInt1, paramInt2, 0);
	}

	public Double getRecordDouble(int paramInt, String paramString) {
		return getRecordDouble(paramInt, getFieldIndex(paramString));
	}

	public Double getRecordDouble(int paramInt1, int paramInt2) {
		String str = getRecordString(paramInt1, paramInt2);
		if (StrUtils.isNull(str))
			return null;
		BigDecimal localBigDecimal = new BigDecimal(str);
		return Double.valueOf(localBigDecimal.doubleValue());
	}

	public BigDecimal getRecordBigDecimal(int paramInt, String paramString) {
		return getRecordBigDecimal(paramInt, getFieldIndex(paramString));
	}

	public BigDecimal getRecordBigDecimal(int paramInt1, int paramInt2) {
		String str = getRecordString(paramInt1, paramInt2);
		return new BigDecimal(str);
	}

	public double getRecordDoubleBase(int paramInt, String paramString) {
		return getRecordDoubleBase(paramInt, getFieldIndex(paramString));
	}

	public double getRecordDoubleBase(int paramInt1, int paramInt2, double paramDouble) {
		Double localDouble = getRecordDouble(paramInt1, paramInt2);
		if (localDouble == null)
			return paramDouble;
		return localDouble.doubleValue();
	}

	public double getRecordDoubleBase(int paramInt1, int paramInt2) {
		return getRecordDoubleBase(paramInt1, paramInt2, 0.0D);
	}

	public Date getRecordDateTime(int paramInt, String paramString1, String paramString2) {
		return getRecordDateTime(paramInt, getFieldIndex(paramString1), paramString2);
	}

	public Date getRecordDateTime(int paramInt, String paramString) {
		return getRecordDateTime(paramInt, getFieldIndex(paramString));
	}

	public Date getRecordDateTime(int paramInt1, int paramInt2, String paramString) {
		String str = getRecordString(paramInt1, paramInt2);
		return StrUtils.stringToDate(str, paramString);
	}

	public Date getRecordDateTime(int paramInt1, int paramInt2) {
		return getRecordDateTime(paramInt1, paramInt2, "yyyy-MM-dd HH:mm:ss");
	}

	public boolean getRecordBool(int paramInt, String paramString) {
		return getRecordBool(paramInt, getFieldIndex(paramString));
	}

	public boolean getRecordBool(int paramInt1, int paramInt2) {
		String str = StrUtils.trim(getRecordString(paramInt1, paramInt2));
		if (str == null)
			return false;
		if (str.equals(""))
			return false;
		return StrUtils.paramExists("true;1;yes;ok", str, true);
	}

	public boolean setRecordValue(int paramInt, String paramString, Object paramObject) {
		return setRecordValue(paramInt, getFieldIndex(paramString), paramObject);
	}

	public boolean setRecordValue(int paramInt1, int paramInt2, Object paramObject) {
		if (paramInt2 < 0)
			return false;
		List localList1 = getFields();
		if ((localList1 == null) || (localList1.size() == 0) || (paramInt2 >= localList1.size()))
			return false;
		List localList2 = (List) getRecords().get(paramInt1);
		localList2.set(paramInt2, paramObject);
		return true;
	}

	public String toString() {
		return JSON.toJSONString(this, filter, new SerializerFeature[0]);
	}

	public List<ParaMap> getListObj() {
		ArrayList localArrayList = new ArrayList();
		List localList = getFields();
		for (int i = 0; i < getRecordCount(); ++i) {
			ParaMap localParaMap = new ParaMap();
			for (int j = 0; j < localList.size(); ++j) {
				Object localObject = localList.get(j);
				String str = localObject.toString();
				if (localObject instanceof ParaMap)
					str = ((ParaMap) localObject).getString("name");
				localParaMap.put(str, getRecordValue(i, j));
			}
			localArrayList.add(localParaMap);
		}
		return localArrayList;
	}

	public byte[] getBytes(String paramString) {
		byte[] arrayOfByte = null;
		if (containsKey(paramString))
			arrayOfByte = (byte[]) (byte[]) get(paramString);
		return arrayOfByte;
	}

	public int locate(String paramString, Object paramObject, boolean paramBoolean1, boolean paramBoolean2) {
		int i = -1;
		int j = getRecordCount();
		int k = getFieldIndex(paramString);
		if ((j <= 0) || (StrUtils.isNull(paramString)) || (k == -1))
			return i;
		int l = ((paramObject == null) || (StrUtils.isNull(paramObject.toString()))) ? 1 : 0;
		String str1 = (paramBoolean1) ? paramObject.toString().toLowerCase() : (l != 0) ? null : paramObject.toString();
		for (int i1 = 0; i1 < j; ++i1) {
			String str2 = getRecordString(i1, k);
			if (l != 0) {
				if (!(StrUtils.isNull(str2)))
					continue;
				i = i1;
				break;
			}
			if (!(StrUtils.isNotNull(str2)))
				continue;
			if (paramBoolean1)
				str2 = str2.toLowerCase();
			if ((paramBoolean2) && (str2.indexOf(str1) != -1)) {
				i = i1;
				break;
			}
			if ((paramBoolean2) || (!(str2.equals(str1))))
				continue;
			i = i1;
			break;
		}
		return i;
	}

	public int locate(String paramString, Object paramObject) {
		return locate(paramString, paramObject, false, false);
	}

	public static ParaMap ObjToParaMap(Object o) throws Exception{
		ParaMap map = new ParaMap();
		List<Field> fieldList = new ArrayList<>() ;
		Class tempClass = o.getClass();
		while (tempClass !=null && !tempClass.getName().toLowerCase().equals("java.lang.object")){//当父类为null的时候说明到达了最上层的父类(Object类).
		      fieldList.addAll(Arrays.asList(tempClass.getDeclaredFields()));
		      tempClass = tempClass.getSuperclass(); //得到父类,然后赋给自己
		}
		
		for (int i = 0; i < fieldList.size(); i++) {
			Field f = fieldList.get(i);
			f.setAccessible(true);
			Object val = f.get(o);
			if(val != null)
				map.put(f.getName(), val);
		}
		return map;
	}
	
	
	 public static Object map2PO(Map<String,Object> map,Object o) throws Exception{  
	        if (!map.isEmpty()) {  
	            for (String k : map.keySet()) {  
	                Object v = "";  
	                if (!k.isEmpty()) {  
	                    v = map.get(k);  
	                }  
	                Field[] fields = null;  
	                fields = o.getClass().getDeclaredFields();  
	                String clzName = o.getClass().getSimpleName();  
	                for (Field field : fields) {  
	                    int mod = field.getModifiers();  
	                    if(Modifier.isStatic(mod) || Modifier.isFinal(mod)){  
	                        continue;  
	                    }  
	                    if (field.getName().toUpperCase().equals(k)) {  
	                        field.setAccessible(true);  
	                        field.set(o, v);  
	                    }  
	  
	                }  
	            }  
	        }  
	        return o;  
	    }  
	
	public static ParaMap getPageHelperMap(Object o,Page<?> page){
		ParaMap map = new ParaMap();
		map.put("object", o);
		map.put("page", page);
		map.put("pageNum", page.getPageNum());
		return map;
	}
	
	public static void main(String[] paramArrayOfString) throws Exception {
	}
}