package com.gbicc.taocraw.parse;

import org.apache.commons.lang.StringUtils;

import com.alibaba.fastjson.JSON;
import com.gbicc.taocraw.pojo.Body;

public class HtmlParse implements Parse{
	private static final String _ST="g_page_config = {";
	private static final String _ED="g_srp_loadCss";
	public Object parseObject(String content){
		if(StringUtils.isNotBlank(content)){
			//System.out.println(content.indexOf(_ST));
			//System.out.println(content.lastIndexOf(_ED));
			String body=content.substring(content.indexOf(_ST)+_ST.length()-1,
					content.lastIndexOf(_ED));
			body=body.substring(0,body.lastIndexOf(";"));
			return JSON.parseObject(body,Body.class);
		}
		return null;
	}
}
