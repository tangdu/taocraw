package com.gbicc.taocraw;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.gbicc.core.SpringJdbcDao;
import com.gbicc.taocraw.pojo.Auction;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:applicationContext.xml"})
@Transactional(readOnly=false)
public class MyTest {

	@Autowired
	private SpringJdbcDao springJdbcDao;
	
	@Test
	public void ttt(){
		List<Auction> list=new ArrayList<Auction>();
		Auction auction=new Auction();
		auction.setComment_url("ddddddddddd");
		list.add(auction);
		springJdbcDao.batchInsert(list, "t_crw_details", Auction.class);
	}
}
