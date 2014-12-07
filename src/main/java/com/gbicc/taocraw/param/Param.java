package com.gbicc.taocraw.param;

/**
 * 通用查询参数
 * @author tangdu
 *
 */
public abstract class Param {
	static enum DESC{
		RENQI_DESC("renqi-desc"),SALE_DESC("sale-desc"),
		CREDIT_DESC("credit-desc"),PRICE_ASC("price-asc"),
		PRICE_DESC("price-desc"),TOTAL_ASC("total-asc"),TOTAL_DESC("total-desc"),
		DEFAULT("default");
		
		private String desc;
		private DESC(String desc){
			this.desc=desc;
		}
		private String getDesc(){
			return this.desc;
		}
	}
	// 返回json数据
	boolean ajax = true;
	String suggest = "history_1";
	String source = "suggest";
	// 淘宝索引日期
	String initiative_id;
	// 排序
	String sort;
	//所有宝贝 -all  双十二活动-double12  天猫-mall 二手-old...
	String tab = "all";
	// 查询条件
	String q;
	// 地区
	String loc;
	//默认启用偏移，不知道干嘛的。加了就和网页分页是一样的。
	String bcoffset="1";
	
	/******** 查询条件不带则为空，两个以上条件则累加 *********/
	// 品牌
	String ppath;
	// 支持货化付款 1-支持
	String support_cod;
	// 包邮 1-包邮
	String baoyou;
	// 二手 1-二手
	String filterFineness;
	// 正品 1-正品
	String user_type;
	// 天猫 tmall-天猫
	String seller_type;
	// 24小时发货 1-24小时发货
	String consign_date;

	/*********************************************/
	
	public boolean isAjax() {
		return ajax;
	}

	public void setAjax(boolean ajax) {
		this.ajax = ajax;
	}

	public String getSuggest() {
		return suggest;
	}

	public void setSuggest(String suggest) {
		this.suggest = suggest;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getInitiative_id() {
		return initiative_id;
	}

	public void setInitiative_id(String initiative_id) {
		this.initiative_id = initiative_id;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(DESC d) {
		this.sort = d.getDesc();
	}

	public String getTab() {
		return tab;
	}

	public void setTab(String tab) {
		this.tab = tab;
	}

	public String getQ() {
		return q;
	}

	public void setQ(String q) {
		this.q = q;
	}

	public String getLoc() {
		return loc;
	}

	public void setLoc(String loc) {
		this.loc = loc;
	}

	public String getPpath() {
		return ppath;
	}

	public void setPpath(String ppath) {
		this.ppath = ppath;
	}

	public String getSupport_cod() {
		return support_cod;
	}

	public void setSupport_cod(String support_cod) {
		this.support_cod = support_cod;
	}

	public String getBaoyou() {
		return baoyou;
	}

	public void setBaoyou(String baoyou) {
		this.baoyou = baoyou;
	}

	public String getFilterFineness() {
		return filterFineness;
	}

	public void setFilterFineness(String filterFineness) {
		this.filterFineness = filterFineness;
	}

	public String getUser_type() {
		return user_type;
	}

	public void setUser_type(String user_type) {
		this.user_type = user_type;
	}

	public String getSeller_type() {
		return seller_type;
	}

	public void setSeller_type(String seller_type) {
		this.seller_type = seller_type;
	}

	public String getConsign_date() {
		return consign_date;
	}

	public void setConsign_date(String consign_date) {
		this.consign_date = consign_date;
	}

	public String getBcoffset() {
		return bcoffset;
	}

	public void setBcoffset(String bcoffset) {
		this.bcoffset = bcoffset;
	}
	
}
