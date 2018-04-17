package com.iss.dao;

import java.util.*;

public interface UserLstDaoI {
	List<Map<String, Object>> getUserLst(String uid);
	
	int doCreateLst(String slname, int uid);
	
	int doDelLst(int lsid);
	
	List<Map<String, Object>> getSongsInLst(int lsid);
	
	int doDelSongInLst(int slid, int sid);
	
	int collSong(int slid, int sid);
	
	List<Map<String, Object>> getSongById(int sid);
	
	List<Map<String, Object>> getSongsBySpid(int spid);
}
