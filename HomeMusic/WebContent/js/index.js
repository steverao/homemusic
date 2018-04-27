$(window).resize(function() {
	$("#player-container").css({
		position : "absolute",
		left : ($(window).width() - $("#player-container").outerWidth()) / 2,
		top : ($(window).height() - $("#player-container").outerHeight()) / 2
	});
});

$(function() {
	$(window).resize();

	// ///////////////////////////////////////////
	// 弹出最新专辑页面
	$(".box-1").click(function() {
		getLatestSpecial();
		$("#new-spe").fadeIn(500);
	});

	// 弹出新歌推荐页面
	$(".box-3").click(function() {
		getLatestSongs();
		$("#new-songs").fadeIn(500);
	});

	// 弹出搜索页
	$(".box-5").click(function() {
		$("#search").fadeIn(500);
	});

	// ///////////////////////////////////
	// 弹出歌单管理页
	$(".box-4").click(function() {
		checkUserStatus();
		var status = window.loginStatus;
		if (status == "1") {
			getUserLst();
			$("#list-mana").fadeIn(500);
		} else {
			$("#user-login").click();
		}
	});
	// 新建歌单
	$("#create").click(function() {
		$("#create-list").fadeIn(500);
	});

	// 绑定音乐播放器//
	window.player = new Player("#the-audio");
	getSongs();// //////////////////////////////////////test////////////////////
	$(".play").click(function() {
		$(".play").hide();
		$(".pause").show();
		window.player.play();
	});

	$(".pause").click(function() {
		$(".pause").hide();
		$(".play").show();
		window.player.pause();
	});

	$(".play-before").click(function() {
		window.player.lastSong();
	});

	$(".play-after").click(function() {
		window.player.nextSong();
	});

	// /////////////////////////////////////
	$(".box-12").click(function() {
		$("#play-process").fadeIn();
	});

	$("#the-audio").on("timeupdate", function() {
		getProgress();
		flushProcess();
	});

	$("#cur-pro").on("click", function(e) {
		var player = $("#the-audio")[0];
		var w = $(this).width();
		var x = e.offsetX;
		var percent = (x / w).toFixed(3);
		player.currentTime = (player.duration * percent).toFixed(0);
		$("#cur-pro").children().width(percent + "%");
	});

	$(".vol").click(function() {
		$("#play-vol").fadeIn();
	});
	setVolProcess();
	$("#cur-vol").on("click", function(e) {
		var player = $("#the-audio")[0];
		var w = $(this).width();
		var x = e.offsetX;
		var percent = (x / w).toFixed(3);
		player.volume = percent;
		$("#cur-vol").children().width((percent * 100) + "%");
	});
	// ///////////////////////////////////////

	// end!绑定音乐播放器/////

	// 显示播放列表
	$(".play-lst").click(function() {
		displayPlayLst();
		$("#play-list").fadeIn(500);
	});

	// 注销
	$("#logout").click(function() {
		$.ajax({
			type : "post",
			url : "logout.do",
			async : false,
			success : function(data) {
			}
		});
	});

	$("#user-login").click(function() {
		checkUserStatus();
		var status = window.loginStatus;
		if (status == "1") {
			swal({
				title : "您已登陆！",
				text : "It wills close in 2 seconds later!",
				type : "error",
				timer : 2000
			});
		} else {
			$("#login").fadeIn(1000);
		}
	});
	// ///////////////////////////////
	// 关闭页面
	$(".close-flip").click(function() {
		$(this).parent().fadeOut(1000);
	});

	// /新建按钮//////////////////////////
	$(".create-lst").click(function() {
		createLst();
		$("#create-cancel").click();
		getUserLst();
	});
	// //end!新建按钮/////////////////////

	// 关闭新建歌单页
	$("#create-cancel").click(function() {
		$("#create-list").fadeOut(500);
	});
	// ///////////////////////////////////////

	// 外部引用//////////////////////////////////////////////////
	// the form wrapper (includes all forms)
	var $form_wrapper = $('#form_wrapper'),
	// the current form is the one with class active
	$currentForm = $form_wrapper.children('form.active'),
	// the change form links
	$linkform = $form_wrapper.find('.linkform');

	// get width and height of each form and store them for later
	$form_wrapper.children('form').each(function(i) {
		var $theForm = $(this);
		// solve the inline display none problem when using fadeIn fadeOut
		if (!$theForm.hasClass('active'))
			$theForm.hide();
		$theForm.data({
			width : $theForm.width(),
			height : $theForm.height()
		});
	});

	// set width and height of wrapper (same of current form)
	setWrapperWidth();

	/*
	 * clicking a link (change form event) in the form makes the current form
	 * hide. The wrapper animates its width and height to the width and height
	 * of the new current form. After the animation, the new form is shown
	 */
	$linkform.bind('click', function(e) {
		var $link = $(this);
		var target = $link.attr('rel');
		$currentForm.fadeOut(400, function() {
			// remove class active from current form
			$currentForm.removeClass('active');
			// new current form
			$currentForm = $form_wrapper.children('form.' + target);
			// animate the wrapper
			$form_wrapper.stop().animate({
				width : $currentForm.data('width') + 'px',
				height : $currentForm.data('height') + 'px'
			}, 500, function() {
				// new form gets class active
				$currentForm.addClass('active');
				// show the new form
				$currentForm.fadeIn(400);
			});
		});
		e.preventDefault();
	});

	function setWrapperWidth() {
		$form_wrapper.css({
			width : $currentForm.data('width') + 'px',
			height : $currentForm.data('height') + 'px'
		});
	}

	/*
	 * for the demo we disabled the submit buttons if you submit the form, you
	 * need to check the which form was submited, and give the class active to
	 * the form you want to show
	 */
	$form_wrapper.find('input[type="submit"]').click(function(e) {
		e.preventDefault();
	});
	// end外部引用//////////////////////////////////////////////////////

	// /////绑定搜索////////////////////////
	$("#kid-search").click(function() {
		search();
	});

	// //////绑定登陆///////////////////////
	$("#submit").click(function() {
		login();
	});
});

// ////search///////////////////////////////////////////
function search() {
	var keyword = $(".search-song").val();
	// alert(keyword);
	$
			.ajax({
				type : "post",
				url : "search.do",
				dataType : "json",
				data : {
					"keyword" : keyword,
					"page" : 1
				},
				async : false,
				success : function(dataStr) {
					// alert(dataStr);
					dataStr = eval(dataStr);
					var data = dataStr[0];
					var totalPageNum = parseInt(dataStr[1]);
					data = eval(data);
					// alert(data);
					var i = 1;
					$(".search-cont").empty();
					$(data)
							.each(
									function(index) {
										var songName = "<td class='spname-wrap lst-cont'>"
												+ "<div class='search-name'>"
												+ data[index].name
												+ "</div>"
												+ "</td>";
										var singerName = "<td class='spname-wrap lst-cont'>"
												+ "<div class='search-name'>"
												+ data[index].singer
												+ "</div>"
												+ "</td>";
										var $btn = "<div class='glyphicon glyphicon-play-circle  play-btn'>"
												+ "<div style='display:none' class='sid'>"
												+ data[index].id
												+ "</div>"
												+ "</div>";
										var $coll = "<td class='img-wrap'>"
												+ "<div class='glyphicon glyphicon-star-empty add-song coll-song'>"
												+ "<div style='display:none' class='sid'>"
												+ data[index].id + "</div>"
												+ "</div></td>"
										$(".search-cont")
												.append(
														"<tr class='scl-item'>"
																+ "<td class='img-wrap'>"
																+ "<div class='song-img'>"
																+ "<img src='"
																+ data[index].img
																+ "' class='img-thumbnail' />"
																+ "</div>"
																+ $btn
																+ "</td>"
																+ songName
																+ singerName
																+ $coll
																+ "</tr>");
									});
					$(".add-song").on("mousedown", function() {
						$("this").removeClass("glyphicon-star-empty");
						$("this").addClass("glyphicon-star");
					});

					$(".add-song").on("mouseup", function() {
						$("this").removeClass("glyphicon-star");
						$("this").addClass("glyphicon-star-empty");
					});

					$(".coll-song").on("click", function() {
						var sid = $(this).children(".sid").text();
						getCollLst(-1, sid);
						$("#song-collect").fadeIn(500);
					});

					$(".play-btn").on("click", function() {
						var sid = $(this).children(".sid").text();
						// alert(sid);
						getSongById(sid);
					});

					window.searchPage = new Page(totalPageNum);
					createPageElem(window.searchPage);
					$(".next-page").on("click", function() {
						var page = window.searchPage;
						nextPage(page);
					});

					$(".last-page").on("click", function() {
						var page = window.searchPage;
						lastPage(page);
					});

					$(".to-page").click(function() {
						var page = window.searchPage;
						var toPageNum = parseInt($(this).children().text());
						toPage(page, toPageNum);
					});
				}
			});
}
// //////////end!search/////////////////////////////////

// /分页///////////////////////////////////////////////
function Page(totalPageNum) {
	this.totalPageNum = totalPageNum;
	this.curPageNum = 1;
	this.maxPageNum = totalPageNum > this.maxPageNum ? 5 : totalPageNum;
	;
	this.curMaxPageNum = this.maxPageNum;
}

function nextPage(page) {
	page.curPageNum = (page.curPageNum + 1) <= page.totalPageNum ? page.curPageNum + 1
			: page.curPageNum;
	getDataByPage(page.curPageNum);
	flushPageElem(page);
}

function lastPage(page) {
	page.curPageNum = (page.curPageNum - 1) > 0 ? page.curPageNum - 1
			: page.curPageNum;
	getDataByPage(page.curPageNum);
	flushPageElem(page);
}

function toPage(page, toPageNum) {
	page.curPageNum = toPageNum;
	getDataByPage(page.curPageNum);
	flushPageElem(page);
}

function createPageElem(page) {
	var $page = $(".pagination");
	$page.html("<li class='last-page'><a href='#'>&laquo;</a></li>");
	for (var i = 1; i <= page.curMaxPageNum; i++) {
		$page.append("<li class='to-page'><a href='#'>" + i + "</a></li>");
	}
	$page.children().eq(1).addClass("active");
	$page.append("<li class='next-page'><a href='#'>&raquo;</a></li>");
}

function flushPageElem(page) {
	var $page = $(".pagination");
	var defVal = (page.curPageNum + 2) - page.curMaxPageNum;
	if (defVal != 0) {
		var tmp = page.curMaxPageNum + defVal;
		page.curMaxPageNum = tmp > page.totalPageNum ? page.totalPageNum : tmp;
		page.curMaxPageNum = tmp < page.maxPageNum ? page.maxPageNum
				: page.curMaxPageNum;
		for (var i = page.curMaxPageNum - page.maxPageNum + 1, j = 1; i <= page.curMaxPageNum; i++, j++) {
			$page.children().eq(j).children().text(i);
		}
	}

	$page.children().each(function() {
		$(this).removeClass("active");
		if ($(this).children().text() == page.curPageNum) {
			$(this).addClass("active");
		}
	});
}

// //end！分页//////////////////////////////////////////

// /////login/////////////////////////////////////////
function login() {
	var uname = $("#username").val();
	var pwd = $("#password").val();
	$.ajax({
		type : "post",
		url : "login.do",
		dataType : "json",
		data : {
			"username" : uname,
			"password" : pwd
		},
		async : false,
		success : function(data) {
			if (data == 1) {
				swal({
					title : "登陆成功！",
					text : "It wills close in 1 seconds later!",
					type : "success",
					timer : 1500
				});
				$("#login").fadeOut(2000);
			} else if (data == 2) {
				window.location.href = 'uploadMusic.html';
			} else {
				swal({
					title : "账户或密码错误！",
					text : "It wills close in 1 seconds later!",
					type : "error",
					timer : 1000
				});
			}
		},
		error : function() {
			swal({
				title : "登录失败！",
				text : "It wills close in 1 seconds later!",
				type : "error",
				timer : 1000
			});
		}
	});
}

function checkUserStatus() {
	$.ajax({
		type : "post",
		url : "checkuserstatus.do",
		async : false,
		success : function(data) {
			// alert(data);
			window.loginStatus = data;
		}
	});
}
// ////////end！login/////////////////////////////////

// ////得到用户歌单/////////////////////////////////////
function getUserLst() {
	$
			.ajax({
				type : "post",
				url : "getuserlist.do",
				async : false,
				success : function(data) {
					// alert(data);
					$(".song-list").empty();
					data = eval(data);
					$(data)
							.each(
									function(index) {

										var pbtn = "<td class='img-wrap'>"
												+ "<div class='song-img'>"
												+ "<img src='"
												+ data[index].img
												+ "' class='img-thumbnail' />"
												+ "</div>"
												+ "<div class='play-btn'>"
												+ "<i class='fa fa-play-circle-o' aria-hidden='true'></i>"
												+ "<div style='display:none' class='lsid'>"
												+ data[index].id + "</div>"
												+ "</div>" + "</td>";
										var name = "<td class='spname-wrap lst-cont'>"
												+ "<div style='display:none' class='lsid'>"
												+ data[index].id
												+ "</div>"
												+ "<div class='special-name'>"
												+ data[index].name
												+ "</div>"
												+ "</td>";

										var del = "<td class='img-wrap del-btn'>"
												+ "<div style='display:none' class='lsid'>"
												+ data[index].id
												+ "</div>"
												+ "<div class='glyphicon glyphicon-trash del-lst'></div>"
												+ "</td>";
										$(".song-list").append(
												"<tr>" + pbtn + name + del
														+ "</tr>");
									});
					$(".lst-cont").on("click", function() {
						$(".cont-lst").fadeIn(1000);
					});

					$(".del-btn").on("click", function() {
						var id = $(this).find(".lsid").text();
						swal({
							title : "确定删除?",
							text : "你将删除该文件",
							type : "warning",
							showCancelButton : true,
							confirmButtonColor : "#DD6B55",
							confirmButtonText : "确定删除",
							closeOnConfirm : false
						}, function() {
							$.ajax({
								type : "post",
								url : "dellst.do",
								dataType : "text",
								data : {
									"lsid" : id
								},
								async : false,
								success : function(data) {
									swal({
										title : "已删除!",
										text : "你已删除！",
										type : "success",
										timer : 1000
									});
								}
							});
							getUserLst();
						});

						/*
						 * if(confirm("确认删除？"+id)){
						 *  }
						 */
					});

					$(".lst-cont").on("click", function() {
						var lsid = $(this).find(".lsid").text();
						displayLst(lsid);
					});

					$(".play-btn").on("click", function() {
						var slid = $(this).children(".lsid").text();
						// alert(slid);
						getSongsBySlidOrSpid(slid, -1);
						$(".play").hide();
						$(".pause").show();
					});
				}
			});
}
// /////end!用户歌单///////////////////////////////////

// /////新建歌单//////////////////////////////////////
function createLst() {
	var lstname = $(".lst-name").val();
	$.ajax({
		type : "post",
		url : "createlist.do",
		async : false,
		dataType : "json",
		data : {
			"lstname" : lstname
		}
	});
}
// //////////end!新建歌单////////////////////////////

// ////显示歌单内容///////////////////////////////////
function displayLst(lsid) {
	$("#ls-id").text(lsid);
	$
			.ajax({
				type : "post",
				url : "getsongsinlst.do",
				dataType : "json",
				data : {
					"lsid" : lsid
				},
				async : false,
				success : function(data) {
					// alert(data);
					var $cnt = $(".lst-dp");
					$cnt.empty();
					var i = 1;
					$(data)
							.each(
									function(index) {
										var sid = "<div style='display:none' class='sid'>"
												+ data[index].id + "</div>";
										var num = "<td>" + sid + (i++)
												+ ".</td>";
										var song = "<td class='opt-song'>"
												+ "<div class='opt-song-name'>"
												+ data[index].name
												+ "</div>"
												+ "<div class='cont-opt'>"
												+ "<span class='glyphicon glyphicon-headphones span-style'></span>"
												+ "<span class='glyphicon glyphicon-star-empty span-style coll-song'></span>"
												+ "<span class='glyphicon glyphicon-trash span-style del-song'></span>"
												+ "</div>" + "</td>";
										var singer = "<td>"
												+ data[index].singer + "</td>";
										$cnt.append("<tr>" + num + song
												+ singer + "</tr>");
									});

					$(".lst-dp tr").on("mouseover", function() {
						$(this).find(".opt-song-name").hide();
						$(this).find(".cont-opt").show();
					});

					$(".lst-dp tr").on("mouseout", function() {
						$(this).find(".cont-opt").hide();
						$(this).find(".opt-song-name").show();
					});

					$(".del-song").on(
							"click",
							function() {
								var slid = $("#ls-id").text();
								var sid = $(this).parent().parent().siblings()
										.eq(0).children(".sid").text();
								delSongInLst(slid, sid);
							});

					/* 收藏歌曲 */
					$(".coll-song").on(
							"click",
							function() {
								checkUserStatus();
								var status = window.loginStatus;
								if (status == "1") {
									var sid = $(this).parent().parent()
											.siblings().eq(0).children(".sid")
											.text();
									getCollLst(-1, sid);
									$("#song-collect").fadeIn(500);
								} else {
									$("#user-login").click();
								}
							});
				}
			});
}
// ////end!显示歌单内容///////////////////////////////

// ///删除收藏夹中歌曲////////////////////////////////////////
function delSongInLst(slid, sid) {
	swal({
		title : "Are you sure?",
		text : "You will not be able to recover this imaginary file!",
		type : "warning",
		showCancelButton : true,
		confirmButtonColor : "#DD6B55",
		confirmButtonText : "Yes, delete it!",
		closeOnConfirm : false
	}, function() {
		$.ajax({
			type : "post",
			url : "delsonginlst.do",
			async : false,
			dataType : "text",
			data : {
				"slid" : slid,
				"sid" : sid
			},
			success : function(data) {
				swal({
					title : "已删除!",
					text : "你已删除！",
					type : "success",
					timer : 1000
				});

			}
		});
		displayLst(slid);
	});
	/*
	 * if(confirm("确认删除该歌曲?")){
	 *  }
	 */
}
// //end！删除收藏夹中歌曲////////////////////////////////////

// //获取最新专辑//////////////////////////////////////////////
function getLatestSpecial() {
	$
			.ajax({
				type : "post",
				url : "getlatestspecial.do",
				async : false,
				success : function(data) {
					// alert(data);
					data = eval(data);
					var $spls = $(".special-lst");
					$spls.empty();
					$(data)
							.each(
									function(index) {
										var img = "<td class='img-wrap'>"
												+ "<div class='song-img'>"
												+ "<img src='"
												+ data[index].img
												+ "' class='img-thumbnail' />"
												+ "</div>"
												+ "<div class='play-btn'>"
												+ "<i class='fa fa-play-circle-o' aria-hidden='true'></i>"
												+ "<div style='display:none' class='spid'>"
												+ data[index].id + "</div>"
												+ "</div>" + "</td>";
										var spname = "<td class='spname-wrap'>"
												+ "<div class='special-name'>"
												+ data[index].singer + "-"
												+ data[index].name + "</div>"
												+ "</td>";
										var col = "<td class='img-wrap'>"
												+ "<div style='display:none' class='spid'>"
												+ data[index].id
												+ "</div>"
												+ "<div class='glyphicon glyphicon-star-empty add-song coll-song'></div>"
												+ "</td>";
										$spls.append("<tr class='scl-item'>"
												+ img + spname + col + "</tr>");
									});

					$(".coll-song").on("click", function() {
						checkUserStatus();
						var status = window.loginStatus;
						if (status == "1") {
							var spid = $(this).siblings().eq(0).text();
							getCollLst(spid, -1);
							$("#song-collect").fadeIn(500);
						} else {
							$("#user-login").click();
						}
					});

					$(".play-btn").on("click", function() {
						var spid = $(this).children(".spid").text();
						// alert("spid" + spid);
						getSongsBySlidOrSpid(-1, spid);
						$(".play").hide();
						$(".pause").show();
					});
				}
			});
}
// /end!获取最新专辑///////////////////////////////////////////

// ///获得新歌推荐//////////////////////////////////////////////
function getLatestSongs() {
	$
			.ajax({
				type : "post",
				url : "getlatestsongs.do",
				async : false,
				success : function(data) {
					// alert(data);
					data = eval(data);
					var $spls = $(".new-song-lst");
					$spls.empty();
					$(data)
							.each(
									function(index) {
										var img = "<td class='img-wrap'>"
												+ "<div class='song-img'>"
												+ "<img src='"
												+ data[index].img
												+ "' class='img-thumbnail' />"
												+ "</div>"
												+ "<div class='glyphicon glyphicon-play-circle  play-btn'>"
												+ "<div style='display:none' class='sid'>"
												+ data[index].id + "</div>"
										"</div>" + "</td>";
										var sname = "<td class='spname-wrap'>"
												+ "<div class='special-name'>"
												+ data[index].singer + "-"
												+ data[index].name + "</div>"
												+ "</td>";
										var col = "<td class='img-wrap'>"
												+ "<div style='display:none' class='sid'>"
												+ data[index].id
												+ "</div>"
												+ "<div class='glyphicon glyphicon-star-empty add-song coll-song'></div>"
												+ "</td>";
										$spls.append("<tr class='scl-item'>"
												+ img + sname + col + "</tr>");
									});

					$(".coll-song").on("click", function() {
						checkUserStatus();
						var status = window.loginStatus;
						if (status == "1") {
							var sid = $(this).siblings().eq(0).text();
							getCollLst(-1, sid);
							$("#song-collect").fadeIn(500);
						} else {
							$("#user-login").click();
						}
					});

					$(".play-btn").on("click", function() {
						var sid = $(this).children(".sid").text();
						// alert(sid);
						getSongById(sid);
						$(".play").hide();
						$(".pause").show();
					});
				}
			});
}
// ///end!获取新歌推荐//////////////////////////////////////////

// ///收藏歌曲//////////////////////////////////////////////////
function collSong(sid, slid) {
	$.ajax({
		type : "post",
		url : "collsong.do",
		async : false,
		dataType : "json",
		data : {
			"sid" : sid,
			"slid" : slid
		}
	});
}
// //end！收藏歌曲//////////////////////////////////////////////

// //收藏专辑///////////////////////////////////////////////////
function collSpecial(spid, slid) {
	$.ajax({
		type : "post",
		url : "collspecial.do",
		async : false,
		dataType : "json",
		data : {
			"spid" : spid,
			"slid" : slid
		}
	});
}
// edn!收藏专辑/////////////////////////////////////////////////

// ////获取收藏列表/////////////////////////////////////////////
function getCollLst(spid, sid) {
	$(".content").find(".spid").text(spid);
	$(".content").find(".song-id").text(sid);
	$.ajax({
		type : "post",
		url : "getuserlist.do",
		async : false,
		success : function(data) {
			// alert(data);
			data = eval(data);
			var $cnt = $(".coll-lst");
			$cnt.empty();
			$(data).each(
					function(index) {
						var pbtn = "<td class='img-wrap'>"
								+ "<div class='song-img'>" + "<img src='"
								+ data[index].img
								+ "' class='img-thumbnail' />" + "</div>"
								+ "</td>";
						var name = "<td class='spname-wrap lst-cont'>"
								+ "<div style='display:none' class='slid'>"
								+ data[index].id + "</div>"
								+ "<div class='special-name'>"
								+ data[index].name + "</div>" + "</td>";

						$cnt.append("<tr>" + pbtn + name + "</tr>");
					});

			$(".lst-cont").on(
					"click",
					function() {
						var spid = $(this).parents(".content").find(".spid")
								.text();
						var sid = $(this).parents(".content").find(".song-id")
								.text();
						var slid = $(this).find(".slid").text();
						// alert(slid+"---+"+sid +"----+"+spid);
						if (spid != -1) {
							collSpecial(spid, slid);
						} else {
							collSong(sid, slid);
						}
						// $(".close-flip").click();
						$(this).parents(".collect-container").children(
								".close-flip").click();
					});
		}
	});
}
// ///end收藏列表//////////////////////////////////////////////

// //播放器对象////////////////////////////////////////////////
function Player(selector) {
	this.player = $(selector)[0];
	this.curPlay = 0;
	this.playLst = new Array();

	Player.prototype.play = function() {
		if (this.playLst.length != 0) {
			if (!this.player.src) {
				this.player.src = this.playLst[this.curPlay].url;
			}
			this.player.play();
		}
	}
	Player.prototype.pause = function() {
		this.player.pause();
	}
	Player.prototype.addSong = function(obj) {
		this.playLst.push(obj);
	}
	Player.prototype.addSongAndPlay = function(obj) {
		this.playLst.push(obj);
		this.curPlay = this.playLst.length - 1;
		this.player.src = this.playLst[this.curPlay].url;
		this.player.play();
	}
	Player.prototype.addSongs = function(objs) {
		this.playLst = objs;
		this.curPlay = 0;
		this.player.src = this.playLst[this.curPlay].url;
		this.player.play();
	}
	Player.prototype.delSong = function(index) {
		this.playLst.splice(index, 1);
	}
	Player.prototype.nextSong = function() {
		this.curPlay = (this.curPlay + 1) % this.playLst.length;
		this.player.src = this.playLst[this.curPlay].url;
		this.player.play();
	}
	Player.prototype.lastSong = function() {
		this.curPlay = (this.curPlay - 1 + this.playLst.length)
				% this.playLst.length;
		this.player.src = this.playLst[this.curPlay].url;
		this.player.play();
	}
	Player.prototype.updateVolume = function(val) {
		if (0 < val && val <= 10) {
			this.player.volume = val;
		}
	}
	Player.prototype.updateProcess = function(percent) {
		this.player.currentTime = (percent * this.player.duration).toFixed(0);
	}
}
// //end播放器对象/////////////////////////////////////////////

// ////test//////////////////////////////////////////////////
function getSongs() {
	$.ajax({
		type : "post",
		url : "getlatestsongs.do",
		async : false,
		success : function(data) {
			// alert(data);
			data = eval(data);
			$(data).each(function(index) {
				window.player.addSong(data[index]);
			});

			// alert(window.player.playLst);
		}
	});
}
// ///end!test///////////////////////////////////////////////

// /////通过歌曲id获得歌曲对象/////////////////////////////////
function getSongById(sid) {
	$.ajax({
		type : "post",
		url : "getsongbyid.do",
		async : false,
		dataType : "json",
		data : {
			"sid" : sid
		},
		success : function(data) {
			// alert(data);
			data = eval(data);
			window.player.addSongAndPlay(data);
		}
	});
}
// ////end!歌曲id获得歌曲对象//////////////////////////////////

// /////通过歌单id或专辑id获得歌曲对象//////////////////////////
function getSongsBySlidOrSpid(slid, spid) {
	$.ajax({
		type : "post",
		url : "getsongsbyslidorspid.do",
		async : false,
		dataType : "json",
		data : {
			"slid" : slid,
			"spid" : spid
		},
		success : function(data) {
			// alert(data);
			data = eval(data);
			window.player.addSongs(data);
		}
	});
}
// /////end歌单id或专辑id获得歌曲对象///////////////////////////

// ////显示播放列表////////////////////////////////////////////
function displayPlayLst() {
	var arr = window.player.playLst;
	var $cnt = $(".play-cnt");
	var i = 1;
	$cnt.empty();
	$(arr)
			.each(
					function(index) {
						var sid = "<div style='display:none' class='sid'>"
								+ arr[index].id + "</div>";
						var num = "<td>" + sid + (i++) + ".</td>";
						var song = "<td class='opt-song'>"
								+ "<div class='opt-song-name'>"
								+ arr[index].name
								+ "</div>"
								+ "<div class='cont-opt'>"
								+ "<span class='glyphicon glyphicon-star-empty span-style coll-song'></span>"
								+ "<span class='glyphicon glyphicon-trash span-style del-song'></span>"
								+ "</div>" + "</td>";
						var singer = "<td>" + arr[index].singer + "</td>";
						$cnt.append("<tr>" + num + song + singer + "</tr>");
					});

	$(".play-cnt tr").on("mouseover", function() {
		$(this).find(".opt-song-name").hide();
		$(this).find(".cont-opt").show();
	});

	$(".play-cnt tr").on("mouseout", function() {
		$(this).find(".cont-opt").hide();
		$(this).find(".opt-song-name").show();
	});

	$(".del-song").on(
			"click",
			function() {
				var slid = $("#ls-id").text();
				var sid = $(this).parent().parent().siblings().eq(0).children(
						".sid").text();
				// delSongInLst(slid, sid);
			});

	/* 收藏歌曲 */
	$(".coll-song").on("click", function() {
		checkUserStatus();
		var status = window.loginStatus;
		if (status == "1") {
			getCollLst();
			$("#song-collect").fadeIn(500);
		} else {
			$("#user-login").click();
		}
	});
}
// ///end!显示播放列表/////////////////////////////////////////

// ////获取进度条值////////////////////////////////////////////
function getProgress() {
	var thePlayer = window.player.player;
	var percent = (thePlayer.currentTime / thePlayer.duration).toFixed(3);
	var val = 100 * percent;
	$("#cur-pro").children().width(val + "%");
}
// ////end获取进度条值/////////////////////////////////////////

// /////设置时间////////////////////////////////////////////////
function flushProcess() {
	var pro = $(".play-pro");
	var thePlayer = window.player.player;
	var sec = (thePlayer.currentTime % 60).toFixed(0);
	var mil = (thePlayer.currentTime / 60).toFixed(0);
	var tsec = (thePlayer.duration % 60).toFixed(0);
	var tmil = (thePlayer.duration / 60).toFixed(0);
	pro.text(mil + ":" + sec + "/" + tmil + ":" + tsec);
}
// /////end！设置时间///////////////////////////////////////////

// ////设置音量条////////////////////////////
function setVolProcess() {
	var thePlayer = window.player.player;
	$("#cur-vol").children().width(thePlayer.volume + "%");
}
// ////end音量条/////////////////////////////

// ///得到对应页的数据/////////////////////////
function getDataByPage(pageNum) {
	$
			.ajax({
				type : "post",
				url : "topage.do",
				async : false,
				dataType : "json",
				data : {
					"pageNum" : pageNum
				},
				success : function(data) {
					// alert(dataStr);
					dataStr = eval(dataStr);
					var data = dataStr[0];
					var totalPageNum = parseInt(dataStr[1]);
					data = eval(data);
					// alert(data);
					var i = 1;
					$(".search-cont").empty();
					$(data)
							.each(
									function(index) {
										var songName = "<td class='spname-wrap lst-cont'>"
												+ "<div class='search-name'>"
												+ data[index].name
												+ "</div>"
												+ "</td>";
										var singerName = "<td class='spname-wrap lst-cont'>"
												+ "<div class='search-name'>"
												+ data[index].singer
												+ "</div>"
												+ "</td>";
										var $btn = "<div class='glyphicon glyphicon-play-circle  play-btn'>"
												+ "<div style='display:none' class='sid'>"
												+ data[index].id
												+ "</div>"
												+ "</div>";
										var $coll = "<td class='img-wrap'>"
												+ "<div class='glyphicon glyphicon-star-empty add-song coll-song'></div></td>"
										$(".search-cont")
												.append(
														"<tr class='scl-item'>"
																+ "<td class='img-wrap'>"
																+ "<div class='song-img'>"
																+ "<img src='"
																+ data[index].img
																+ "' class='img-thumbnail' />"
																+ "</div>"
																+ $btn
																+ "</td>"
																+ songName
																+ singerName
																+ $coll
																+ "</tr>");
									});
					$(".add-song").on("mousedown", function() {
						$("this").removeClass("glyphicon-star-empty");
						$("this").addClass("glyphicon-star");
					});

					$(".add-song").on("mouseup", function() {
						$("this").removeClass("glyphicon-star");
						$("this").addClass("glyphicon-star-empty");
					});

					$(".coll-song").on("click", function() {
						getCollLst();
						$("#song-collect").fadeIn(500);
					});
				}
			});
}
// ///end!得到对应页的数据/////////////////////
