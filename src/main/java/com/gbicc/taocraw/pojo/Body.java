package com.gbicc.taocraw.pojo;

import java.util.List;

public class Body {
	private String pageName;
	private Module mods;
	public String getPageName() {
		return pageName;
	}
	public void setPageName(String pageName) {
		this.pageName = pageName;
	}
	public Module getMods() {
		return mods;
	}
	public void setMods(Module mods) {
		this.mods = mods;
	}
	
	public Pager getPager(){
		if(mods!=null && mods.getSortbar()!=null && mods.getSortbar().getData()!=null){
			return mods.getSortbar().getData().getPager();
		}
		return null;
	}
	
	/**
	 * TODO 由于淘宝第一页最后一排名与第二页数据是重复的，所以数据需要排除此部分数据
	 * PS:这是规则，可能会有调整。
	 * @return
	 */
	public List<Auction> getAuctions(){
		if(mods!=null && mods.getItemlist()!=null && mods.getItemlist().getData()!=null){
			Pager page=getPager();
			if(page!=null){
				List<Auction> list=mods.getItemlist().getData().getAuctions();
				if(list!=null && list.size()>page.getPageSize()){
					return list.subList(0, page.getPageSize());
				}
				return list;
			}
		}
		return null;
	}
}
