package com.iss.dao;

import java.util.*;

public interface UserDaoI {
	List<Map<String, Object>> doVerify(String uname, String pwd);	

}
