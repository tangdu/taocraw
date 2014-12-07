package com.gbicc.taocraw;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:applicationContext.xml"})
public class ProductTest {

	@Autowired
	private CrawPersistence crawPersistence;
	
	@Test
	public void test01(){
		try {
			crawPersistence.craw();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
