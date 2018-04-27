package com.iss.controller;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSON;
import com.iss.dao.SongDaoI;
import com.iss.utils.Pagination;

import java.io.IOException;
import java.util.*;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
public class SongsOfController {
	
	@Autowired
	private SongDaoI dao;

	@RequestMapping("search")
	void doSearch(HttpServletRequest req, HttpServletResponse res){
		//获取参数
		String keyword = req.getParameter("keyword");
		int curPageNum = Integer.parseInt(req.getParameter("page"));
		
		HttpSession ses = req.getSession();
		List<Map<String, Object>> rs = dao.doSearch(keyword);
		Pagination searchPage = new Pagination(rs);
		ses.setAttribute("serachPage", searchPage);
		String json = JSON.toJSONString(searchPage.getDateByPage(1));
		String[] tmp = {json, searchPage.getTotalPageNum()+""};
		String data = JSON.toJSONString(tmp);
		try {
			res.getWriter().append(data);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping("topage")
	void toPage(HttpServletRequest req, HttpServletResponse res){
		
		int curPageNum = Integer.parseInt(req.getParameter("pageNum"));
		HttpSession ses = req.getSession();
		
		Pagination page = (Pagination) ses.getAttribute("searchPage");
		
		String json = JSON.toJSONString(page.getDateByPage(curPageNum));
		
		try {
			res.getWriter().append(json);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping("getlatestsongs")
	void getLatestSong(HttpServletRequest req, HttpServletResponse res){
		HttpSession ses = req.getSession();
		
		List<Map<String, Object>> rs = dao.getLatestSongs();
		String json = JSON.toJSONString(rs);
		try {
			res.getWriter().append(json);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping("getlatestspecial")
	void getLastestSpecial(HttpServletRequest req, HttpServletResponse res){
		List<Map<String, Object>> rs = dao.getLatestSpecial();
		String json = JSON.toJSONString(rs);
		try {
			res.getWriter().append(json);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
}
