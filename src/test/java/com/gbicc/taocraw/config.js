/*
 * Copyright 2014, KISSY v1.42 MIT Licensed build time: Feb 19 17:22
 */
(function(c) {
	function s(a, f, d, g, b, i) {
		var e = a.getName();
		if (m && b[e])
			"circular dependencies found: " + d;
		else if (!i[e])
			if (i[e] = 1, "css" === a.getType())
				g[e] || (a.status = 4, f.push(a), g[e] = 1);
			else if (a = a.getRequiredMods(), m && (b[e] = 1, d.push(e)), c
					.each(a, function(a) {
								s(a, f, d, g, b, i)
							}), m)
				d.pop(), delete b[e]
	}
	var m;
	c.importStyle = function(a) {
		var f = c.Loader.Utils, a = f.getModNamesAsArray(a), a = f
				.normalizeModNames(c, a), d = [], g = c.Env.host.document, b = c.Config, i = {}, e = [], t = {}, u = {};
		m = b.debug;
		c.each(a, function(a) {
					a = c.Loader.Utils.createModuleInfo(c, a);
					s(a, d, e, i, t, u)
				});
		if (d.length)
			if (b.combine) {
				for (var a = b.comboPrefix, f = b.comboSep, v = b.comboMaxFileNum, b = b.comboMaxUrlLength, n = "", o = "", j = [], h = [], p = 0; p < d.length; p++) {
					var q = d[p], k = q.getPackage(), r = k
							.getPrefixUriForCombo(), l = q.getFullPath();
					if (!k.isCombine() || !c.startsWith(l, r))
						g.writeln('<link href="' + l + '"  rel="stylesheet"/>');
					else if (l = l.slice(r.length).replace(/\?.*$/, ""), j
							.push(q), h.push(l), 1 === j.length)
						n = r + a, k.getTag()
								&& (o = "?t=" + encodeURIComponent(k.getTag())
										+ ".css");
					else if (h.length > v
							|| n.length + h.join(f).length + o.length > b
							|| j[0].getPackage() !== k)
						j.pop(), h.pop(), g
								.writeln('<link href="' + (n + h.join(f) + o)
										+ '"  rel="stylesheet"/>'), j = [], h = [], p--
				}
				h.length
						&& g.writeln('<link href="' + (n + h.join(f) + o)
								+ '"  rel="stylesheet"/>')
			} else
				c.each(d, function(a) {
							g.writeln('<link href="' + a.getFullPath()
									+ '"  rel="stylesheet"/>')
						})
	}
})(KISSY);
(function(e) {
	function n() {
		for (var e = document.getElementsByTagName("meta"), n = [], r = 0; e.length > r; r++) {
			var o = e[r];
			o && o.name && ("data-spm" == o.name || "spm-id" == o.name)
					&& n.push(o.content)
		}
		return document.body && document.body.getAttribute("data-spm")
				&& n.push(document.body.getAttribute("data-spm")), n = n.length
				? n.join(".")
				: 0, n && -1 == n.indexOf(".") && (n += ".0"), n
	}
	function r(e, n) {
		var r = {};
		for (var o in e)
			r[o] = e[o];
		for (var o in n)
			r[o] = n[o];
		return r
	}
	if (!e.JSTracker) {
		var o = n(), t = e.g_config && e.g_config.startTime || +new Date;
		e.JSTracker = {
			_configs : {
				sampling : 100,
				spm : o,
				debug : -1 != location.href.indexOf("jt_debug"),
				nick : "",
				url : "",
				ignore : []
			}
		}, e.JSTracker.config = function(n, r) {
			return n || r ? r
					? (e.JSTracker._configs[n] = r, void 0)
					: e.JSTracker._configs[n] : e.JSTracker._configs
		};
		var c = function(n) {
			var r = "jsFeImage_" + +new Date, o = e[r] = new Image;
			o.onload = o.onerror = function() {
				e[r] = null
			}, o.src = n, o = null
		}, a = function() {
			return "https:" == location.protocol
					? "https://log.mmstat.com/ued.1.1.2?"
					: "http://gm.mmstat.com/ued.1.1.2?"
		}();
		e.JSTracker.send = function(n) {
			var o, i = "";
			if ("" !== e.JSTracker._configs.nick)
				i = e.JSTracker._configs.nick;
			else
				try {
					o = /_nk_=([^;]+)/.exec(document.cookie)
							|| /_w_tb_nick=([^;]+)/.exec(document.cookie)
							|| /lgc=([^;]+)/.exec(document.cookie), o
							&& (i = decodeURIComponent(o[1]))
				} catch (s) {
				}
			var d = {
				msg : "",
				file : "",
				line : 0,
				delay : +new Date - t,
				category : "",
				spm : e.JSTracker._configs.spm,
				sampling : e.JSTracker._configs.sampling,
				url : location.href,
				ua : navigator.userAgent,
				scrolltop : document.documentElement
						&& document.documentElement.scrollTop || document.body
						&& document.body.scrollTop || 0,
				screen : screen.width + "x" + screen.height,
				nick : i
			};
			e.JSTracker._configs.url && (d.url = e.JSTracker._configs.url);
			var g = r(d, n), m = [];
			g.url != location.href && m.push("[u" + g.url + "]"), g.delay > 0
					&& m.push("[t" + g.delay + "]"), g.category
					&& m.push("[c" + g.category + "]"), g.spm
					&& m.push("[s" + g.spm + "]"), g.sampling
					&& m.push("[r" + g.sampling + "]"), g.msg && m.push(g.msg), m = m
					.join("");
			var u = 1 >= Math.random() * g.sampling;
			try {
				for (var l = 0; e.JSTracker._configs.ignore.length > l; l++) {
					var f = e.JSTracker._configs.ignore[l];
					f.test(n.msg) && (u = !1)
				}
			} catch (s) {
				e.JSTracker.send({
							category : "IgnoreErr",
							url : "http://jstracker/0.1/"
						})
			}
			(u || e.JSTracker._configs.debug)
					&& c(a
							+ [
									"type=9",
									"id=jstracker",
									"v=1.0.11",
									"nick=" + g.nick,
									"msg=" + encodeURIComponent(m),
									"file=" + encodeURIComponent(g.file),
									"ua=" + encodeURIComponent(g.ua),
									"line=" + g.line,
									"scrolltop=" + g.scrolltop,
									"screen=" + screen.width + "x"
											+ screen.height,
									"t=" + (new Date).valueOf()].join("&")), e.JSTracker._configs.debug
					&& console && console.log(g)
		};
		var i = ["log", "info", "debug", "warn", "error"];
		for (var s in i) {
			var d = i[s];
			e.JSTracker[d] = function(n) {
				return function() {
					var r = Array.prototype.slice.call(arguments, 0), o = r
							.join("");
					e.JSTracker.send({
								category : n.toUpperCase(),
								msg : o
							})
				}
			}(d)
		}
		var g = e.onerror;
		e.onerror = function(n, r, o) {
			g && g(n, r, o), e.JSTracker.send({
						msg : n,
						file : r,
						line : o
					})
		};
		var m = function() {
			var n = {}, r = "";
			if (e.performance) {
				var o = e.performance.timing;
				n.dns = o.domainLookupEnd - o.domainLookupStart, n.con = o.connectEnd
						- o.connectStart, n.req = o.responseStart
						- o.requestStart, n.res = o.responseEnd
						- o.responseStart, n.dcl = o.domContentLoadedEventEnd
						- o.domLoading, n.onload = o.loadEventStart
						- o.domLoading, n.type = window.performance.navigation.type;
				try {
					r = JSON.stringify(n)
				} catch (t) {
				}
			}
			e.JSTracker.send({
						msg : r,
						category : "__PV"
					})
		};
		window.addEventListener ? (document.addEventListener(
				"DOMContentLoaded", function() {
					o = n(), e.JSTracker._configs.spm = o
				}, !1), window.addEventListener("load", m, !1)) : (document
				.attachEvent("onreadystatechange", function() {
					"complete" === document.readyState
							&& document.detachEvent("onreadystatechange",
									arguments.callee), o = n(), e.JSTracker._configs.spm = o
				}), window.attachEvent("onload", m))
	}
})(window);
function g_srp_getGlobalValue(s, r) {
	var e = window.g_page_config || {};
	return s ? e[s] || r : e
}
function g_srp_getInitMods() {
	if (!arguments.callee.__return) {
		var s = Search.get("appName"), r = g_srp_getGlobalValue("pageName", ""), e = g_srp_getPageUI(r), p = e.modMap
				|| {}, i = g_srp_getGlobalValue("mods", {}), a = [], n = [], c = KISSY
				.keys(p), t = g_srp_getValidFieldNames(), o = t.concat(c);
		o = KISSY.unique(o), KISSY.each(o, function(e) {
					if (i[e]) {
						var c, t = p[e];
						c = t ? s + "/p/" + r + "/" + t : s + "/c/ui/" + e
								+ "/", a.push(c), n.push({
									name : e
								})
					}
				}), arguments.callee.__return = {
			appInitName : [s + "/p/" + r + "/app"],
			modInitNames : a,
			modsConfig : n
		}
	}
	return arguments.callee.__return
}
function g_srp_getValidFieldNames() {
	return ["p4p", "header", "tab", "menulist", "shopstar", "shopcombo",
			"shopcombotip", "tips", "phonenav", "sc", "spuseries", "vbaby",
			"nav", "related", "sortbar", "personalbar", "apasstips",
			"spucombo", "itemlist", "noresult", "navtablink", "bottomsearch",
			"pager", "feedback", "supertab", "sctabframe", "debugbar"]
}
function g_srp_setPageUI(s, r) {
	Search.set("pageConfig_" + s, {
				pageName : s,
				modMap : r
			})
}
function g_srp_getPageUI(s) {
	s = s || "";
	var r = Search.get("pageConfig_" + s) || {};
	return r
}
function g_srp_loadCss() {
	var s = g_srp_getInitMods(), r = s.appInitName, e = s.modInitNames, p = r
			.concat(e);
	KISSY.importStyle(p)
}
function g_srp_init() {
	var s = g_srp_getInitMods(), r = s.appInitName, e = s.modInitNames, p = r
			.concat(e), i = s.modsConfig;
	KISSY.use(p, function(s, r) {
				var p = arguments;
				KISSY.ready(function() {
							var a = g_srp_getGlobalValue();
							window.g_page_config = null;
							{
								var n = 2;
								a.mods
							}
							s.each(e, function(s, r) {
										i[r].CONSTRUCTOR = p[n + r]
									}), a.modsConfig = i;
							var c = new r({
										el : "#main",
										data : a
									});
							Search.set("app", c)
						})
			})
}
!function(s, r) {
	function e(r) {
		var e = s.Config && s.Config.packages && s.Config.packages.srp
				&& s.Config.packages.srp.base || r.base;
		-1 !== e.indexOf("taobao.net") && s.config({
					packages : [{
								name : "tbc",
								path : "http://g.assets.daily.taobao.net/tbc/",
								debug : !1,
								ignorePackageNameInUri : !0
							}]
				}), s.config({
					modules : {
						lazyload : {
							alias : "gallery/lazyload/1.0/"
						}
					}
				})
	}
	var p = r.Search = r.Search || {};
	p.config = function(r) {
		if (!r || !r.name || !r.base || "undefined" === r.combine)
			throw new Error("Search.config options error");
		s.log("config Search"), s.log("xcake.base:" + r.base), s
				.log("xcake.name:" + r.name), s.log("xcake.combine:"
				+ r.combine), s.config({
					combine : r.combine,
					comboMaxFileNum : 100,
					packages : [{
								name : r.name,
								base : r.base,
								ignorePackageNameInUri : !0,
								debug : !0,
								combine : r.combine
							}]
				}), p.set("appName", r.name), e(r), KISSY.config("modules", {
					"srp/_0" : {
						requires : ["srp/_1", "srp/_2", "srp/_1b", "srp/_19",
								"srp/_1c", "srp/_1a", "srp/_5", "srp/_3",
								"srp/_8", "srp/_6", "xtemplate/runtime"]
					},
					"srp/_1" : {
						requires : ["srp/c/app/base.css", "node", "event",
								"base"]
					},
					"srp/_2" : {
						requires : ["srp/_1d"]
					},
					"srp/_3" : {
						requires : ["srp/_7"]
					},
					"srp/_4" : {
						requires : ["srp/_1"]
					},
					"srp/_5" : {
						requires : ["io", "overlay", "event", "ua"]
					},
					"srp/_6" : {
						requires : ["srp/c/app/responsive.css"]
					},
					"srp/_8" : {
						requires : ["srp/c/libs/nprogress/nprogress.css"]
					},
					"srp/_9" : {
						requires : ["srp/c/ui/apasstips/index.css", "srp/_4",
								"xtemplate/runtime"]
					},
					"srp/_a" : {
						requires : ["srp/c/ui/bottomsearch/index.css",
								"srp/_4", "xtemplate/runtime"]
					},
					"srp/_b" : {
						requires : ["srp/c/ui/debugbar/index.css", "srp/_4",
								"xtemplate/runtime", "dom", "event", "cookie"]
					},
					"srp/_c" : {
						requires : [
								"srp/c/ui/feedback/advice2visual/index.css",
								"xtemplate/runtime", "srp/_d", "io", "srp/_e",
								"tbc/mini-login/1.4.2/index"]
					},
					"srp/_f" : {
						requires : ["srp/c/ui/feedback/index.css", "srp/_4",
								"xtemplate/runtime", "srp/_g", "dom", "event",
								"cookie", "overlay"]
					},
					"srp/_h" : {
						requires : ["srp/c/ui/header/index.css", "node", "ua",
								"cookie", "xtemplate/runtime", "srp/_4"]
					},
					"srp/_i" : {
						requires : ["srp/c/ui/itemlist/index.css", "json",
								"xtemplate/runtime", "datalazyload", "srp/_1g",
								"srp/_1j", "srp/_4",
								"srp/c/ui/itemlist/thumb/index.css", "srp/_1i"]
					},
					"srp/_j" : {
						requires : ["srp/c/ui/menulist/index.css", "srp/_4",
								"xtemplate/runtime"]
					},
					"srp/_k" : {
						requires : ["srp/c/ui/nav/index.css", "node",
								"srp/_1e", "xtemplate/runtime", "srp/_1a",
								"srp/_4", "srp/c/ui/nav/breadcrumbs/index.css",
								"srp/c/ui/nav/common/index.css", "event",
								"srp/c/ui/nav/overlay/index.css"]
					},
					"srp/_l" : {
						requires : ["srp/c/ui/navtablink/index.css", "srp/_4",
								"xtemplate/runtime", "io",
								"srp/c/ui/navtablink/popup/index.css",
								"srp/_1i"]
					},
					"srp/_m" : {
						requires : ["srp/c/ui/noresult/index.css", "srp/_4",
								"xtemplate/runtime"]
					},
					"srp/_n" : {
						requires : ["srp/c/ui/p4p/index.css", "srp/_4",
								"datalazyload"]
					},
					"srp/_o" : {
						requires : ["srp/c/ui/pager/index.css",
								"xtemplate/runtime", "event", "srp/_4"]
					},
					"srp/_p" : {
						requires : ["srp/c/ui/personalbar/index.css", "srp/_4",
								"xtemplate/runtime"]
					},
					"srp/_q" : {
						requires : ["srp/c/ui/phonenav/index.css", "srp/_4",
								"xtemplate/runtime"]
					},
					"srp/_r" : {
						requires : ["srp/c/ui/related/index.css", "srp/_4",
								"xtemplate/runtime"]
					},
					"srp/_s" : {
						requires : ["srp/c/ui/sc/index.css",
								"xtemplate/runtime", "srp/_4", "dom"]
					},
					"srp/_t" : {
						requires : ["srp/c/ui/sctabframe/index.css",
								"xtemplate/runtime", "srp/_4"]
					},
					"srp/_u" : {
						requires : ["srp/c/ui/shopcombo/index.css", "srp/_4",
								"xtemplate/runtime"]
					},
					"srp/_v" : {
						requires : ["srp/c/ui/shopcombotip/index.css",
								"srp/_4", "xtemplate/runtime"]
					},
					"srp/_10" : {
						requires : ["srp/c/ui/shopstar/index.css",
								"xtemplate/runtime", "srp/_4"]
					},
					"srp/_11" : {
						requires : ["srp/c/ui/sortbar/index.css",
								"xtemplate/runtime", "srp/_4",
								"srp/c/ui/sortbar/price-rank/index.css", "dom",
								"overlay"]
					},
					"srp/_12" : {
						requires : ["srp/c/ui/spucombo/index.css",
								"xtemplate/runtime", "srp/_4"]
					},
					"srp/_13" : {
						requires : ["srp/c/ui/spuseries/index.css",
								"xtemplate/runtime", "srp/_4", "base"]
					},
					"srp/_14" : {
						requires : ["srp/c/ui/supertab/index.css",
								"xtemplate/runtime", "srp/_4"]
					},
					"srp/_15" : {
						requires : ["srp/c/ui/tab/index.css", "srp/_4",
								"xtemplate/runtime"]
					},
					"srp/_16" : {
						requires : ["srp/c/ui/tips/index.css", "srp/_4",
								"xtemplate/runtime"]
					},
					"srp/_17" : {
						requires : ["srp/c/ui/vbaby/index.css", "node",
								"xtemplate/runtime", "io", "srp/_4"]
					},
					"srp/_18" : {
						requires : ["dom", "event"]
					},
					"srp/_19" : {
						requires : ["srp/_2"]
					},
					"srp/_1a" : {
						requires : ["node", "ua"]
					},
					"srp/_1b" : {
						requires : ["json"]
					},
					"srp/_1e" : {
						requires : ["srp/c/widgets/baike/index.css", "base",
								"xtemplate/runtime", "srp/_1f", "node", "json"]
					},
					"srp/_1g" : {
						requires : ["xtemplate/runtime", "srp/_1h",
								"srp/c/widgets/icon-popup/index.css", "dom",
								"srp/_1i"]
					},
					"srp/_1i" : {
						requires : ["overlay"]
					},
					"srp/_1j" : {
						requires : ["srp/c/widgets/shopcard/index.css", "io",
								"xtemplate/runtime", "srp/_1k", "srp/_1i"]
					},
					"srp/_1l" : {
						requires : ["srp/_0", "srp/p/bigtabsrp/app.css",
								"srp/c/icons/btn.css",
								"srp/c/icons/service.css",
								"srp/c/icons/supple.css",
								"srp/c/icons/fest.css", "xtemplate/runtime"]
					},
					"srp/_1m" : {
						requires : ["srp/_0", "srp/p/find-brand/app.css",
								"srp/c/icons/btn.css",
								"srp/c/icons/service.css",
								"srp/c/icons/supple.css",
								"srp/c/icons/fest.css", "xtemplate/runtime"]
					},
					"srp/_1n" : {
						requires : [
								"srp/p/find-brand/c/brand-detail/index.css",
								"xtemplate/runtime", "srp/_4"]
					},
					"srp/_1o" : {
						requires : [
								"srp/p/find-brand/c/brand-record/index.css",
								"xtemplate/runtime", "srp/_4"]
					},
					"srp/_1p" : {
						requires : ["srp/p/find-brand/c/discussion/index.css",
								"xtemplate/runtime", "srp/_4"]
					},
					"srp/_1q" : {
						requires : ["srp/p/find-brand/c/evaluate/index.css",
								"xtemplate/runtime", "srp/_4"]
					},
					"srp/_1r" : {
						requires : ["srp/p/find-brand/c/header/index.css",
								"xtemplate/runtime", "srp/_4"]
					},
					"srp/_1s" : {
						requires : ["srp/p/find-brand/c/info/index.css",
								"xtemplate/runtime", "srp/_4"]
					},
					"srp/_1t" : {
						requires : [
								"srp/p/find-brand/c/ranking-list/index.css",
								"xtemplate/runtime", "srp/_4"]
					},
					"srp/_1u" : {
						requires : [
								"srp/p/find-brand/c/star-product/index.css",
								"xtemplate/runtime", "srp/_4"]
					},
					"srp/_1v" : {
						requires : ["srp/_0", "srp/c/icons/btn.css",
								"srp/c/icons/service.css",
								"srp/c/icons/supple.css",
								"srp/c/icons/fest.css", "xtemplate/runtime"]
					},
					"srp/_20" : {
						requires : ["srp/p/floor/c/floors/index.css", "srp/_4",
								"datalazyload", "srp/_1g", "srp/_1j",
								"xtemplate/runtime"]
					},
					"srp/_21" : {
						requires : ["srp/_0", "srp/p/i2i/app.css",
								"srp/c/icons/btn.css",
								"srp/c/icons/service.css",
								"srp/c/icons/supple.css",
								"srp/c/icons/fest.css", "xtemplate/runtime"]
					},
					"srp/_22" : {
						requires : ["srp/p/i2i/c/recitem/index.css",
								"xtemplate/runtime", "srp/_4"]
					},
					"srp/_23" : {
						requires : ["srp/p/i2i/c/singleauction/index.css",
								"xtemplate/runtime", "srp/_4"]
					},
					"srp/_24" : {
						requires : ["srp/p/i2i/c/sortbar/index.css",
								"xtemplate/runtime", "srp/_4"]
					},
					"srp/_25" : {
						requires : ["srp/_0", "srp/c/icons/btn.css",
								"srp/c/icons/service.css",
								"srp/c/icons/supple.css",
								"srp/c/icons/fest.css", "xtemplate/runtime"]
					},
					"srp/_26" : {
						requires : ["srp/_0", "srp/c/icons/btn.css",
								"srp/c/icons/service.css",
								"srp/c/icons/supple.css",
								"srp/c/icons/fest.css", "xtemplate/runtime"]
					},
					"srp/_27" : {
						requires : ["srp/p/mysearch/c/explain/index.css",
								"xtemplate/runtime", "srp/_4"]
					},
					"srp/_28" : {
						requires : ["srp/p/mysearch/c/grid/index.css",
								"xtemplate/runtime", "srp/_4", "datalazyload",
								"io"]
					},
					"srp/_29" : {
						requires : ["srp/p/mysearch/c/myblock/index.css",
								"xtemplate/runtime", "srp/_4"]
					},
					"srp/_2a" : {
						requires : ["srp/_0", "srp/c/icons/btn.css",
								"srp/c/icons/service.css",
								"srp/c/icons/supple.css",
								"srp/c/icons/fest.css", "xtemplate/runtime"]
					},
					"srp/_2b" : {
						requires : ["srp/p/page0/c/desc/index.css",
								"xtemplate/runtime", "srp/_4"]
					},
					"srp/_2c" : {
						requires : ["srp/p/page0/c/itemlist/index.css",
								"datalazyload", "xtemplate/runtime", "srp/_4",
								"srp/_19"]
					},
					"srp/c/app/app-base" : {
						alias : "srp/_0"
					},
					"srp/c/app/base" : {
						alias : "srp/_1"
					},
					"srp/c/app/env" : {
						alias : "srp/_2"
					},
					"srp/c/app/history" : {
						alias : "srp/_3"
					},
					"srp/c/app/mod-base" : {
						alias : "srp/_4"
					},
					"srp/c/app/requester" : {
						alias : "srp/_5"
					},
					"srp/c/app/responsive" : {
						alias : "srp/_6"
					},
					"srp/c/libs/history" : {
						alias : "srp/_7"
					},
					"srp/c/libs/nprogress/nprogress" : {
						alias : "srp/_8"
					},
					"srp/c/ui/apasstips/index" : {
						alias : "srp/_9"
					},
					"srp/c/ui/bottomsearch/index" : {
						alias : "srp/_a"
					},
					"srp/c/ui/debugbar/index" : {
						alias : "srp/_b"
					},
					"srp/c/ui/feedback/advice2visual/index" : {
						alias : "srp/_c"
					},
					"srp/c/ui/feedback/advice2visual/index.xtpl" : {
						alias : "srp/_d"
					},
					"srp/c/ui/feedback/html2canvas/index" : {
						alias : "srp/_e"
					},
					"srp/c/ui/feedback/index" : {
						alias : "srp/_f"
					},
					"srp/c/ui/feedback/tpl/index.xtpl" : {
						alias : "srp/_g"
					},
					"srp/c/ui/header/index" : {
						alias : "srp/_h"
					},
					"srp/c/ui/itemlist/index" : {
						alias : "srp/_i"
					},
					"srp/c/ui/menulist/index" : {
						alias : "srp/_j"
					},
					"srp/c/ui/nav/index" : {
						alias : "srp/_k"
					},
					"srp/c/ui/navtablink/index" : {
						alias : "srp/_l"
					},
					"srp/c/ui/noresult/index" : {
						alias : "srp/_m"
					},
					"srp/c/ui/p4p/index" : {
						alias : "srp/_n"
					},
					"srp/c/ui/pager/index" : {
						alias : "srp/_o"
					},
					"srp/c/ui/personalbar/index" : {
						alias : "srp/_p"
					},
					"srp/c/ui/phonenav/index" : {
						alias : "srp/_q"
					},
					"srp/c/ui/related/index" : {
						alias : "srp/_r"
					},
					"srp/c/ui/sc/index" : {
						alias : "srp/_s"
					},
					"srp/c/ui/sctabframe/index" : {
						alias : "srp/_t"
					},
					"srp/c/ui/shopcombo/index" : {
						alias : "srp/_u"
					},
					"srp/c/ui/shopcombotip/index" : {
						alias : "srp/_v"
					},
					"srp/c/ui/shopstar/index" : {
						alias : "srp/_10"
					},
					"srp/c/ui/sortbar/index" : {
						alias : "srp/_11"
					},
					"srp/c/ui/spucombo/index" : {
						alias : "srp/_12"
					},
					"srp/c/ui/spuseries/index" : {
						alias : "srp/_13"
					},
					"srp/c/ui/supertab/index" : {
						alias : "srp/_14"
					},
					"srp/c/ui/tab/index" : {
						alias : "srp/_15"
					},
					"srp/c/ui/tips/index" : {
						alias : "srp/_16"
					},
					"srp/c/ui/vbaby/index" : {
						alias : "srp/_17"
					},
					"srp/c/utils/imgmagic" : {
						alias : "srp/_18"
					},
					"srp/c/utils/logger" : {
						alias : "srp/_19"
					},
					"srp/c/utils/stat" : {
						alias : "srp/_1a"
					},
					"srp/c/utils/timing" : {
						alias : "srp/_1b"
					},
					"srp/c/utils/utils" : {
						alias : "srp/_1c"
					},
					"srp/c/utils/webp" : {
						alias : "srp/_1d"
					},
					"srp/c/widgets/baike/index" : {
						alias : "srp/_1e"
					},
					"srp/c/widgets/baike/tpl.xtpl" : {
						alias : "srp/_1f"
					},
					"srp/c/widgets/icon-popup/index" : {
						alias : "srp/_1g"
					},
					"srp/c/widgets/icon-popup/index.xtpl" : {
						alias : "srp/_1h"
					},
					"srp/c/widgets/popup/index" : {
						alias : "srp/_1i"
					},
					"srp/c/widgets/shopcard/index" : {
						alias : "srp/_1j"
					},
					"srp/c/widgets/shopcard/shopcard.xtpl" : {
						alias : "srp/_1k"
					},
					"srp/p/bigtabsrp/app" : {
						alias : "srp/_1l"
					},
					"srp/p/find-brand/app" : {
						alias : "srp/_1m"
					},
					"srp/p/find-brand/c/brand-detail/index" : {
						alias : "srp/_1n"
					},
					"srp/p/find-brand/c/brand-record/index" : {
						alias : "srp/_1o"
					},
					"srp/p/find-brand/c/discussion/index" : {
						alias : "srp/_1p"
					},
					"srp/p/find-brand/c/evaluate/index" : {
						alias : "srp/_1q"
					},
					"srp/p/find-brand/c/header/index" : {
						alias : "srp/_1r"
					},
					"srp/p/find-brand/c/info/index" : {
						alias : "srp/_1s"
					},
					"srp/p/find-brand/c/ranking-list/index" : {
						alias : "srp/_1t"
					},
					"srp/p/find-brand/c/star-product/index" : {
						alias : "srp/_1u"
					},
					"srp/p/floor/app" : {
						alias : "srp/_1v"
					},
					"srp/p/floor/c/floors/index" : {
						alias : "srp/_20"
					},
					"srp/p/i2i/app" : {
						alias : "srp/_21"
					},
					"srp/p/i2i/c/recitem/index" : {
						alias : "srp/_22"
					},
					"srp/p/i2i/c/singleauction/index" : {
						alias : "srp/_23"
					},
					"srp/p/i2i/c/sortbar/index" : {
						alias : "srp/_24"
					},
					"srp/p/mainsrp/app" : {
						alias : "srp/_25"
					},
					"srp/p/mysearch/app" : {
						alias : "srp/_26"
					},
					"srp/p/mysearch/c/explain/index" : {
						alias : "srp/_27"
					},
					"srp/p/mysearch/c/grid/index" : {
						alias : "srp/_28"
					},
					"srp/p/mysearch/c/myblock/index" : {
						alias : "srp/_29"
					},
					"srp/p/page0/app" : {
						alias : "srp/_2a"
					},
					"srp/p/page0/c/desc/index" : {
						alias : "srp/_2b"
					},
					"srp/p/page0/c/itemlist/index" : {
						alias : "srp/_2c"
					}
				})
	};
	var i = {};
	p.set = function(s, r) {
		i[s] = r
	}, p.get = function(s) {
		return i[s]
	}
}(KISSY, this), g_srp_setPageUI("page0", {
			itemlist : "c/itemlist/",
			desc : "c/desc/"
		}), g_srp_setPageUI("mysearch", {
			grid : "c/grid/",
			myblock : "c/myblock/",
			explain : "c/explain/"
		}), g_srp_setPageUI("i2i", {
			singleauction : "c/singleauction/",
			sortbar : "c/sortbar/",
			recitem : "c/recitem/"
		}), g_srp_setPageUI("floor", {
			floors : "c/floors/"
		}), g_srp_setPageUI("find-brand", {
			header : "c/header/",
			"brand-detail" : "c/brand-detail/",
			discussion : "c/discussion/",
			evaluate : "c/evaluate/",
			"star-product" : "c/star-product/",
			"brand-record" : "c/brand-record/",
			"ranking-list" : "c/ranking-list/",
			info : "c/info/"
		}), setTimeout(function() {
	var s = "\n\nAngular;	Backbone;	Console;		Dir;			Express;	Fork;		Grunt;		Haslayout;		Iconfont;\nJsonp;		Kissy;		Localstorage;	Media query;	Npm;		Opacity;	Prototype;	Querystring;	Referer;\nSeajs;		Trim;		Underscore;		Vim;			Worker;		Xss;		Yslow;		Zepto;\n\n\u5982\u679c\u4f60\u5bf9\u4e0a\u976226\u4e2a\u5355\u8bcd\u90fd\u80fd\u8bf4\u51fa\u4e2a\u6240\u4ee5\u7136\u6765\uff0c\u4f60\u5c31\u662f\u6211\u4eec\u8981\u627e\u7684\u4eba\uff0c\u8d76\u5feb\u52a0\u5165\u6211\u4eec\u5427\uff01\n\n\u5b98\u7f51\u62db\u8058\u5165\u53e3\uff1ahttp://job.alibaba.com/zhaopin/position_detail.htm?positionId=5242\n\u9762\u8bd5\u5b98\u76f4\u90ae\uff1a%cyuchun@taobao.com\n\n";
	window.console && "function" == typeof console.log
			&& window.console.log(s, "color:red")
}, 0);