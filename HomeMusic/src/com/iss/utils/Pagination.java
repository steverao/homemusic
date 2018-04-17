package com.iss.utils;

import java.util.*;

public class Pagination {
	private int totalPageNum;
	public int getTotalPageNum() {
		return totalPageNum;
	}


	public void setTotalPageNum(int totalPageNum) {
		this.totalPageNum = totalPageNum;
	}

	private int pageSize = 8;
	private List<Map<String, Object>> data;
	
	public Pagination(List<Map<String, Object>> data) {
		this.data = data;
		this.totalPageNum = (int) Math.ceil(((float)data.size())/this.pageSize);
		System.out.println(this.totalPageNum);
	}

	
	public List<Map<String, Object>> getDateByPage(int curPageNum){
		List<Map<String, Object>> curPageData = new ArrayList<Map<String, Object>>();
		if(curPageNum < this.totalPageNum && curPageNum > 0){
			for(int i = (curPageNum - 1)*pageSize; i < curPageNum*pageSize && i < data.size(); i++){
				curPageData.add(data.get(i));
			}
		}
		return curPageData;
	}
	
	public static void main(String[] args) {
	}
}
