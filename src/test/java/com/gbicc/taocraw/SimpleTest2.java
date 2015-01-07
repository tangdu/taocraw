package com.gbicc.taocraw;

import java.beans.PropertyDescriptor;
import java.net.URLEncoder;

import org.junit.Test;
import org.springframework.cglib.core.ReflectUtils;
import org.springframework.util.Log4jConfigurer;

import com.gbicc.taocraw.param.QueryParam;

public class SimpleTest2 {

	@Test
	public void test22() {
		try {
			//%C6%FB%B3%B5%D3%C3%C6%B7
			//%C6%FB%B3%B5%D3%C3%C6%B7
			//%E6%B1%BD%E8%BD%A6%E7%94%A8%E5%93%81
			String a = URLEncoder.encode("汽车用品", "UTF-8");
			a = URLEncoder.encode(a, "UTF-8");
			System.out.println(a);
			QueryParam param=new QueryParam();
			Class clz=param.getClass();
			PropertyDescriptor a2[]=ReflectUtils.getBeanProperties(clz);
			System.out.println(a2.length);
			Log4jConfigurer.initLogging("classpath:log4j.properties");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
