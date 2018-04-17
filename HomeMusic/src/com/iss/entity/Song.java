package com.iss.entity;

import java.sql.Timestamp;

public class Song {
	private Integer id;
	private String name;
	private String singer;
	private Timestamp pubDate;
	private String url;
	private String img;
	private Integer aid;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSinger() {
		return singer;
	}
	public void setSinger(String singer) {
		this.singer = singer;
	}
	public Timestamp getPubDate() {
		return pubDate;
	}
	public void setPubDate(Timestamp pubDate) {
		this.pubDate = pubDate;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public Integer getAid() {
		return aid;
	}
	public void setAid(Integer aid) {
		this.aid = aid;
	}
	@Override
	public String toString() {
		return "Song [id=" + id + ", name=" + name + ", singer=" + singer + ", pubDate=" + pubDate + ", url=" + url
				+ ", img=" + img + ", aid=" + aid + "]";
	}
	
}
