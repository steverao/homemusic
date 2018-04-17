package com.iss.utils;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.core.convert.converter.Converter;
import org.springframework.format.support.FormattingConversionServiceFactoryBean;

public class MyTimeConverter implements Converter<String, Timestamp> {

	@Override
	public Timestamp convert(String stm) {
		// TODO Auto-generated method stub
		Timestamp tm=null;
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		try {
			Date dt = sdf.parse(stm);
			tm=new Timestamp(dt.getTime());
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return tm;
	}

}
