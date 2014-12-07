package com.gbicc.taocraw.util;

import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

public class HttpClientUtils {
	public static final String UA = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11";
	public static final String ENCODING="UTF-8";
	
	private HttpClientUtils(){}
	public static CloseableHttpClient getDefaultClient(){
		CloseableHttpClient client = HttpClients.custom().setUserAgent(UA).build();
		return client;
	}
	
	public static String getDataStr(String url){
		String body=null;
		HttpGet httpGet = new HttpGet(url);
		CloseableHttpResponse response=null;
		CloseableHttpClient client=null;
		try {
			client=getDefaultClient();
			response = client.execute(httpGet);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				HttpEntity entity = response.getEntity();
				if (entity != null) {
					body= EntityUtils.toString(entity, ENCODING);
					EntityUtils.consume(entity);
				}
			}else{
				System.out.println("ERROR");
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally{
			httpGet.abort();
			httpGet.releaseConnection();
			try {
				if(client!=null)
					client.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return body;
	}
	
	//TODO 
	public String postDataStr(HttpClient client,String url){
		return null;
	}
}
