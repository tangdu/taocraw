package com.gbicc.taocraw.pojo;

import java.util.List;

public class ItemListData {
	private String banner;
	private List<Auction>  auctions;
	public String getBanner() {
		return banner;
	}
	public void setBanner(String banner) {
		this.banner = banner;
	}
	public List<Auction> getAuctions() {
		return auctions;
	}
	public void setAuctions(List<Auction> auctions) {
		this.auctions = auctions;
	}
}
