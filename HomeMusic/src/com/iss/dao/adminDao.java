package com.iss.dao;

import java.util.List;
import java.util.Map;

import com.iss.entity.Album;
import com.iss.entity.Song;

public interface adminDao {
	public void addMusic(Song song);
	
	public List<Map<String, Object>> getAlbumByName(String singer,String name);
	
	public void createAlbum(Album album);
	
}
