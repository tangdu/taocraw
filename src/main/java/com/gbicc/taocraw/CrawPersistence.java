package com.gbicc.taocraw;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.apache.commons.lang.StringUtils;
import org.apache.http.Header;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicHeader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.ReflectUtils;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gbicc.core.SpringJdbcDao;
import com.gbicc.taocraw.craw.CarCraw;
import com.gbicc.taocraw.param.Param;
import com.gbicc.taocraw.param.QueryParam;
import com.gbicc.taocraw.parse.JsonParse;
import com.gbicc.taocraw.pojo.Auction;
import com.gbicc.taocraw.pojo.Body;
import com.gbicc.taocraw.pojo.Pager;
import com.gbicc.taocraw.util.HttpClientUtils;

@Component
public class CrawPersistence {
	private static final Logger LOGGER=LoggerFactory.getLogger(CrawPersistence.class);
	private StringBuffer root=new StringBuffer("http://s.taobao.com/search");
	private final static SimpleDateFormat DATEFORMAT=new SimpleDateFormat("yyyyMMdd");
	private List<Auction> auctions=new ArrayList<Auction>(1000);
	
	@Autowired
	private SpringJdbcDao springJdbcDao;
	
	public void craw(QueryParam param){
		long start=System.currentTimeMillis();
		CrawGroup craw = new CrawGroup();
		craw.setCraw(new CarCraw());
		craw.setParse(new JsonParse());
		//step0:传入查询参数
		init(param);
		LOGGER.error(root.toString());
		//step1:抓取分页信息
		Pager pager=getPages(craw);
		pager.setTotalPage(1);
		//step2:抓取分页数据
		spiderEach(craw,pager);
		//step2:抓取销售信息
		getMonthSale();
		//step3:保存数据
		LOGGER.error("抓取时间："+(System.currentTimeMillis()-start)/1000+"ms");
		start=System.currentTimeMillis();
		save();
		LOGGER.error("保存时间："+(System.currentTimeMillis()-start)/1000+"ms");
	}
	
	@Transactional(readOnly=false)
	private void save(){
		springJdbcDao.batchInsert(auctions, "t_crw_details", Auction.class);
	}
	
	/**
	 * 下钻取得月销售额
	 */
	private void getMonthSale(){
		long start=System.currentTimeMillis();
		CountDownLatch latch=new CountDownLatch(auctions.size());//计数器
		ExecutorService executor=Executors.newFixedThreadPool(10);
		if(auctions!=null){
			for(int i=0;i<auctions.size();i++){
				executor.execute(new SpiderSingPage(i,latch));
			}
		}
		executor.shutdown();
		try {
			latch.await();//等待完成，先阻塞
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.error("下钻时间："+(System.currentTimeMillis()-start)/1000+"ms");
	}
	
	class SpiderSingPage implements Runnable{
		int index;
		CountDownLatch latch;
		public SpiderSingPage(int index,CountDownLatch latch){
			this.index=index;
			this.latch=latch;
		}
		
		@Override
		public void run() {
			Auction auction=auctions.get(this.index);//只读多线程同时访问
			this.latch.countDown();
			String url=auction.getDetail_url();
			if(StringUtils.isNotBlank(url)){
				try {
					Thread.sleep(1000);
				} catch (Exception e) {
					e.printStackTrace();
				}
				Double xs=getXs(url);
				if(auction.getView_price()!=null){//计算商品当前销售额
					auction.setSale_amount(Double.valueOf(auction.getView_price())*xs);
				}
			}
		}
	}
	
	private Double getXs(String link){
		String t="";
		String itemId="";
		try {
			itemId=link.substring(link.lastIndexOf("?id=")+"?id=".length());
			itemId=itemId.substring(0,itemId.indexOf("&"));
			String url = "http://mdskip.taobao.com/core/initItemDetail.htm?queryMemberRight=true&isApparel=false&service3C=false&isIFC=false&tmallBuySupport=true&isAreaSell=false&cartEnable=true&progressiveSupport=false&showShopProm=false&isUseInventoryCenter=true&itemTags=321,775,843,907,1163,1478,1483,1675,2049,2059,2443,2507,2635,3974,4166,4614,4678,4811,6146,7041,8258,8578,9153,12673,13953,14082,14402,15554,17665,17793,19841,20161,20289,20545,21697,25282,28866,31618,53954,56130,56194&isForbidBuyItem=false&sellerPreview=false&tryBeforeBuy=false&household=false&offlineShop=false&sellerUserTag2=18020085113292804&itemId="
					+ itemId
					+ "&sellerUserTag=303632416&sellerUserTag3=144467031832428672&sellerUserTag4=1152930305164739971&notAllowOriginPrice=false&isSecKill=false&tgTag=false&addressLevel=2&isRegionLevel=false&callback=setMdskip&timestamp=1426515311191";
			List<Header> defaultHeaders = new ArrayList<Header>();
			BasicHeader header1 = new BasicHeader(
					"Referer",link
					);
			defaultHeaders.add(header1);
			CloseableHttpClient client = HttpClients.custom()
					.setDefaultHeaders(defaultHeaders)
					.setUserAgent(HttpClientUtils.UA).build();
			t = HttpClientUtils.getDataStr(client, url);
			t = t.substring(t.lastIndexOf("\"sellCount\":")
					+ "\"sellCount\":".length());
			t = t.substring(0, t.indexOf("},"));
			return Double.valueOf(t);
		} catch (Exception e) {
			LOGGER.error("link is "+link+"--result--"+t+" id="+itemId+" error ",e);
		}
		return 0d;
	}
	
	private void init(Param param){
		//TODO:好像是晚上是：tbindexz__20141207 白天是：staobaoz_20141207
		String initiative_id="staobaoz_"+DATEFORMAT.format(new Date());//淘宝索引日期
		root.append("?initiative_id=").append(initiative_id);
		PropertyDescriptor attrs[]=ReflectUtils.getBeanProperties(param.getClass());
		for(PropertyDescriptor p:attrs){
			try {
				Method wM = p.getReadMethod();
				Object obj=wM.invoke(param);
				if(obj!=null && !"".equals(obj.toString())){
					if("ajax".equals(p.getName()) && !(Boolean)obj){
					}else{
						root.append("&")
						.append(p.getName())
						.append("=").append(obj);
					}
				}
			} catch (Exception e) {
				LOGGER.error("Exception ",e);
			}  
		}
	}
	
	private Pager getPages(CrawGroup craw){
		StringBuffer url=new StringBuffer(root);
		Body body =craw.start(url.toString());
		auctions.addAll(body.getAuctions());
		return body.getPager();
	}
	
	//单线程
	private void spiderEach(CrawGroup craw,Pager pager){
		for(int i=2;i<=pager.getTotalPage();i++){//排除已抓取第一页
			StringBuffer url=new StringBuffer(root);
			url.append("&data-key=s");
			url.append("&data-value=").append((i-1)*pager.getPageSize());
			LOGGER.error("正在抓取第["+i+"]...."+url.toString());
			Body body = craw.start(url.toString());
			auctions.addAll(body.getAuctions());
		}
	}
	
	@SuppressWarnings("unused")
	private void print(){
		for(int i=0;i<auctions.size();i++){
			System.out.println(auctions.get(i).getRaw_title());
		}
	}
}
