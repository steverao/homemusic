package com.iss.dao;

import java.util.*;

import com.iss.entity.Song;

public interface SongDaoI {
	List<Map<String, Object>> doSearch(String _parameter);
	
	List<Map<String, Object>> getLatestSongs();
	
	List<Map<String, Object>> getLatestSpecial();
}
