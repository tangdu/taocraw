package com.gbicc.taocraw;

import java.util.List;

import org.junit.Test;

import com.gbicc.taocraw.craw.CarCraw;
import com.gbicc.taocraw.parse.HtmlParse;
import com.gbicc.taocraw.parse.JsonParse;
import com.gbicc.taocraw.pojo.Auction;
import com.gbicc.taocraw.pojo.Body;
import com.gbicc.taocraw.pojo.Pager;
/**
 * 测试抓取
 * 经分析：
 * 淘宝分析是如下规则：
 * 计算data-value公式=(n-1)*dataSize 详细请看tsrp.js[_doSubmit][7332]
 * 抓取说明：由于淘宝对商品分页有限制 各种商品每页展示内容不一样 在a.js中能到
 * "pager": {
                "pageSize": 44, 
                "totalPage": 100, 
                "currentPage": 1, 
                "totalCount": 4400
            }, 
 * 分析得出控制分布参数为：data-key='s' ,data-value
 * 抓取流程：
 * 根据分页规则得到每页的data-value,然后每个页面做抓取就行
 * by tangdu
 */
public class SimpleTest {

	CrawGroup carCrawMain = new CrawGroup();
	@Test
	public void test01(){
		try {
			String url = "http://s.taobao.com/search?q=+++%C6%FB%B3%B5%D3%C3%C6%B7&commend=all&ssid=s5-e&search_type=item&sourceId=tb.index&spm=1.7274553.1997520841.1&initiative_id=tbindexz_20141206";
			carCrawMain.setCraw(new CarCraw());
			carCrawMain.setParse(new HtmlParse());
			//
			Body body = carCrawMain.start(url);
			List<Auction> auctions=body.getMods().getItemlist().getData().getAuctions();
			print(auctions);
			
			System.out.println("-----------------------------------");
			//根据配置 得到分页数据
			String purl="http://s.taobao.com/search?data-key=s&ajax=true&_ksTS=1417879074120_1329&q=+%C6%FB%B3%B5%D3%C3%C6%B7&commend=all&ssid=s5-e&search_type=item&sourceId=tb.index&spm=1.7274553.1997520841.1&initiative_id=tbindexz_20141206&tab=all&bcoffset=1&s=132";
			Pager page=body.getMods().getSortbar().getData().getPager();
			for(int i=99;i<=page.getTotalPage();i++){
				purl+="&data-value="+(i-1)*page.getPageSize();
				System.out.println("++++++++++++++++++++++++++++++++++++");
				getPage(purl);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	Body getPage(String url){
		carCrawMain.setParse(new JsonParse());
		Body body= carCrawMain.start(url);
		List<Auction> auctions=body.getMods().getItemlist().getData().getAuctions();
		print(auctions);
		return body;
	}
	void print(List<Auction> auctions){
		for(Auction c:auctions){
			System.out.println(c.getRaw_title()+"--"+c.getReserve_price()+"--"+c.getNick());
		}
	}
}
