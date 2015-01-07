package com.gbicc.taocraw;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

@Component
public class CrawPersistence {
	private static final Logger LOGGER=LoggerFactory.getLogger(CrawPersistence.class);
	private StringBuffer root=new StringBuffer("http://s.taobao.com/search");
	private final static SimpleDateFormat DATEFORMAT=new SimpleDateFormat("yyyyMMdd");
	private List<Auction> auctions=new ArrayList<Auction>(1000);
	
	@Autowired
	private SpringJdbcDao springJdbcDao;
	
	public void craw(){
		long start=System.currentTimeMillis();
		CrawGroup craw = new CrawGroup();
		craw.setCraw(new CarCraw());
		craw.setParse(new JsonParse());
		//step0:传入查询参数
		QueryParam param=new QueryParam();
		param.setQ("汽车用品");
		param.setLoc("天津");
		init(param);
		//step1:抓取分页信息
		Pager pager=getPages(craw);
		//step2:抓取分页数据
		spiderEach(craw,pager);
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
