package com.gbicc.taocraw;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.gbicc.taocraw.param.QueryParam;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:applicationContext.xml"})
public class ProductTest {

	@Autowired
	private CrawPersistence crawPersistence;
	
	@Test
	public void test01(){
		try {
			QueryParam param=new QueryParam();
			param.setQ("汽车用品");
			param.setLoc("天津");
			crawPersistence.craw(param);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 双击方法 右键 junit运行
	 */
	@Test
	public void test02(){
		try {
			QueryParam param=new QueryParam();
			param.setQ("汽车用品");
			param.setLoc("杭州");//杭州 台州
			param.setSeller_type("tmall");
			crawPersistence.craw(param);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
