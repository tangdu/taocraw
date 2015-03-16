package com.gbicc.taocraw;

import java.util.ArrayList;
import java.util.List;

import org.apache.http.Header;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicHeader;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.gbicc.core.SpringJdbcDao;
import com.gbicc.taocraw.pojo.Auction;
import com.gbicc.taocraw.util.HttpClientUtils;

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
	
	@Test
	public void est(){
		String url="http://mdskip.taobao.com/core/initItemDetail.htm?queryMemberRight=true&isApparel=false&service3C=false&isIFC=false&tmallBuySupport=true&isAreaSell=false&cartEnable=true&progressiveSupport=false&showShopProm=false&isUseInventoryCenter=true&itemTags=321,775,843,907,1163,1478,1483,1675,2049,2059,2443,2507,2635,3974,4166,4614,4678,4811,6146,7041,8258,8578,9153,12673,13953,14082,14402,15554,17665,17793,19841,20161,20289,20545,21697,25282,28866,31618,53954,56130,56194&isForbidBuyItem=false&sellerPreview=false&tryBeforeBuy=false&household=false&offlineShop=false&sellerUserTag2=18020085113292804&itemId=43705838150&sellerUserTag=303632416&sellerUserTag3=144467031832428672&sellerUserTag4=1152930305164739971&notAllowOriginPrice=false&isSecKill=false&tgTag=false&addressLevel=2&isRegionLevel=false&callback=setMdskip&timestamp=1426515311191";
		List<Header> defaultHeaders=new ArrayList<Header>();
		BasicHeader header1=new BasicHeader("Referer", "http://detail.tmall.com/item.htm?id=43705838150&ad_id=&am_id=&cm_id=140105335569ed55e27b&pm_id=&abbucket=14");
		defaultHeaders.add(header1);
		CloseableHttpClient client = HttpClients.custom()
				.setDefaultHeaders(defaultHeaders)
				.setUserAgent(HttpClientUtils.UA).build();
		String t=HttpClientUtils.getDataStr(client,url);
		t=t.substring(t.lastIndexOf("\"sellCount\":")+"\"sellCount\":".length());
		t=t.substring(0,t.indexOf("},"));
		System.out.println(t);
	}
}
