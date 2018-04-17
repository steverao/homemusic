package com.iss.controller;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSON;
import com.iss.dao.UserLstDaoI;

@Controller
public class HandleSongList {
	
	@Autowired
	private UserLstDaoI dao;
	
	@RequestMapping("getuserlist")
	void getUserList(HttpServletRequest req, HttpServletResponse res){
		HttpSession ses = req.getSession();
		
		Map<String, Object> user = (Map<String, Object>)ses.getAttribute("user");
		//String uid = (String)user.get("id");
		List<Map<String, Object>> rs = dao.getUserLst(1+"");
		String json = JSON.toJSONString(rs);
		
		try {
			res.getWriter().append(json);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping("createlist")
	void createSongLst(HttpServletRequest req, HttpServletResponse res){
		String name = req.getParameter("lstname");
		
		HttpSession ses = req.getSession();
		
		Map<String, Object> user = (Map<String, Object>) ses.getAttribute("user");
		dao.doCreateLst(name, (int) user.get("id"));
	}
	
	@RequestMapping("dellst")
	void delLst(HttpServletRequest req, HttpServletResponse res){
		int lsid = Integer.parseInt(req.getParameter("lsid"));
		
		dao.doDelLst(lsid);
		//String json = "{'ret':'ok'}";
		res.setCharacterEncoding("utf-8");
		res.setContentType("application/json");

		try {
			res.getWriter().append("ok");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping("getsongsinlst")
	void getSongsInLst(HttpServletRequest req, HttpServletResponse res){
		int lsid = Integer.parseInt(req.getParameter("lsid"));
		
		List<Map<String, Object>> rs = dao.getSongsInLst(lsid);
		String json = JSON.toJSONString(rs);
		System.out.println(json);
		try {
			res.getWriter().append(json);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping("delsonginlst")
	void delSongInLst(HttpServletRequest req, HttpServletResponse res){
		int slid = Integer.parseInt(req.getParameter("slid"));
		int sid = Integer.parseInt(req.getParameter("sid"));
		
		dao.doDelSongInLst(slid, sid);
		try {
			res.getWriter().append("ok");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping("collsong")
	void collSong(HttpServletRequest req, HttpServletResponse res){
		int slid = Integer.parseInt(req.getParameter("slid"));
		int sid = Integer.parseInt(req.getParameter("sid"));
		System.out.println(slid+"----"+sid);
		dao.collSong(slid, sid);
	}
	
	@RequestMapping("collspecial")
	void collSpecial(HttpServletRequest req, HttpServletResponse res){
		int spid = Integer.parseInt(req.getParameter("spid"));
		int slid = Integer.parseInt(req.getParameter("slid"));
		List<Map<String, Object>> rs = dao.getSongsBySpid(spid);
		for (int i = 0; i < rs.size(); i++) {
			dao.collSong(slid, (int)rs.get(i).get("id"));
		}
	}
	
	@RequestMapping("getsongbyid")
	void getSongById(HttpServletRequest req, HttpServletResponse res){
		int sid = Integer.parseInt(req.getParameter("sid"));
		List<Map<String, Object>> rs = dao.getSongById(sid);
		String json = JSON.toJSONString(rs.get(0));
		try {
			res.getWriter().append(json);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping("getsongsbyslidorspid")
	void getSongsBySlidOrSpid(HttpServletRequest req, HttpServletResponse res){
		int slid = Integer.parseInt(req.getParameter("slid"));
		int spid = Integer.parseInt(req.getParameter("spid"));
		
		List<Map<String, Object>> rs;
		if(slid != -1){
			rs = dao.getSongsInLst(slid);
		}else{
			rs = dao.getSongsBySpid(spid);
		}
		String json = JSON.toJSONString(rs);
		try {
			res.getWriter().append(json);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
