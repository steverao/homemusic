package com.iss.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.iss.dao.adminDao;
import com.iss.entity.Album;
import com.iss.entity.Song;
import com.iss.utils.MyTimeConverter;

@Controller
public class adminController {

	@Autowired
	private adminDao dao;

	@RequestMapping("logout")
	public String fun2(HttpSession session) {
		session.removeAttribute("user");
		return "redirect:index.html";
	}
	
	@RequestMapping("uploadMusic")
	public void fun1(String mname, String sname, @RequestParam("fileInput_photo") MultipartFile photo,
			@RequestParam("fileInput_music") MultipartFile music, HttpSession session, HttpServletResponse response)
			throws Exception {
		// 上传音乐和照片
		if (!photo.isEmpty() && !music.isEmpty()) {
			// 文件存放服务端的位置
			String photoRootPath = session.getServletContext().getRealPath("singer/upload");
			String musicRootPath = session.getServletContext().getRealPath("music/upload");

			String photoName = photo.getContentType();
			String suffix = photoName.substring(photoName.indexOf("/") + 1);
			File musicFile = new File(musicRootPath +"/"+ music.getOriginalFilename());
			File photoFile = new File(photoRootPath +"/"+ sname + "." + suffix);
			String s=music.getOriginalFilename();
			// 写文件到服务器
			music.transferTo(musicFile);
			photo.transferTo(photoFile);
			// 写文件到数据库
			Song song = new Song();
			song.setName(s.split("\\.")[0]);
			song.setSinger(sname);
			song.setUrl("music/upload/" + music.getOriginalFilename());
			song.setImg("singer/upload/" + sname + "." + suffix);
			String time = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date());
			MyTimeConverter con = new MyTimeConverter();
			song.setPubDate(con.convert(time));
			List<Map<String, Object>> lAlbum = dao.getAlbumByName(sname, mname);
			if (lAlbum.size() == 0) {
				Album album = new Album();
				album.setSinger(sname);
				album.setName(mname);
				album.setPubDate(con.convert(time));
				dao.createAlbum(album);
				lAlbum = dao.getAlbumByName(sname, mname);
			}
			song.setAid((Integer) lAlbum.get(0).get("id"));
			dao.addMusic(song);
		}
		HashMap<String, String> result = new HashMap<>();
		result.put("result", "ok");
		String json = JSON.toJSONString(result);
		response.setCharacterEncoding("utf-8");
		response.setContentType("application/json");
		try {
			response.getWriter().print(json);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
