package com.gbicc.taocraw;

import com.gbicc.taocraw.craw.Craw;
import com.gbicc.taocraw.parse.Parse;
import com.gbicc.taocraw.pojo.Body;

public class CrawGroup {
	private Craw craw;
	private Parse parse;
	
	public Body start(String url){
		String html=craw.getBody(url);
		Object obj=parse.parseObject(html);
		if(obj==null){
			throw new IllegalArgumentException("解析对象为空!");
		}
		return (Body) obj;
	}

	public void setCraw(Craw craw) {
		this.craw = craw;
	}

	public void setParse(Parse parse) {
		this.parse = parse;
	}
}
