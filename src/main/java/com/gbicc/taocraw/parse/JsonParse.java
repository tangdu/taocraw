package com.gbicc.taocraw.parse;

import org.apache.commons.lang.StringUtils;

import com.alibaba.fastjson.JSON;
import com.gbicc.taocraw.pojo.Body;

public class JsonParse implements Parse{

	@Override
	public Object parseObject(String content) {
		if(StringUtils.isNotBlank(content)){
			//System.out.println(content);
			return JSON.parseObject(content,Body.class);
		}
		return null;
	}
}
