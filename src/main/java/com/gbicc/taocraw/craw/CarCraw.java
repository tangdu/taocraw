package com.gbicc.taocraw.craw;

import com.gbicc.taocraw.util.HttpClientUtils;

public class CarCraw implements Craw{

	public String getBody(String url){
		return HttpClientUtils.getDataStr(url);
	}
}
