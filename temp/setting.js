var md5 = require('MD5');
var checkObj = function (object, nest, defaultVal) {
	var ret = true;
	var res = object;
	var nest = nest.split('.');
	var def = defaultVal || '';
	for (var i = 0; i < nest.length; i++) {
		if (!res[nest[i]]) {
			ret = false;
			break;
		}
		res = res[nest[i]];
	}
	//return [ret, res];
	return (ret ? res : def)
};
var setting = {
	digital_media : {
		counter : 0,
		path : './data/digital_media/',
		name : 'digital_media',
		fields : ["i", "tr"],
		rowIdentity : function (values) {
			var me = setting.digital_media,
				idx = 5,
				ret = me.name + '_' + me.counter + '_' + new Date().getTime();

			if (values[idx]) ret = md5(values[idx]);
			me.counter++;

			return ret;
		},
		formatter_args : undefined,
		result : undefined,
		formatter : function (tracker, data, callback) {
			var me = setting.digital_media;

			me.file = tracker;
			me.formatter_args = arguments;

			var d = undefined;
			try {
				d = JSON.parse(data);
			} catch (e) {
				return callback({}, me)
			}

			var c = [
				"tr:tracker_digital_media",
				"i:account",
				"i:datetime",
				"i:description",
				"i:full_text",
				"i:href",
				"i:keywords",
				"i:link",
				"i:media",
				"i:title"
			];
			var v = [
				'', //tracker,
				checkObj(d, 'account'),
				checkObj(d, 'datetime'),
				checkObj(d, 'description'),
				checkObj(d, 'full_text'),
				checkObj(d, 'href'),
				checkObj(d, 'keywords', []).toString(),
				checkObj(d, 'link'),
				checkObj(d, 'media'),
				checkObj(d, 'title')
			];

			me.result = {
				columns : c,
				values : v,
				rowId : me.rowIdentity(v)
			};

			if (callback && typeof callback == "function") return callback(me.result, me);
			else return me.result;
		}
	},
	youtube : {
		counter : 0,
		path : './data/youtube/',
		name : 'youtube',
		fields : ["i", "r", "tr"],
		rowIdentity : function (values,id) {
			var me = setting.youtube,
				idx = 2,
				ret = me.name + '_' + me.counter + '_' + new Date().getTime();

			if (values[idx]) ret = values[idx];
			me.counter++;

			return id;
		},
		formatter_args : undefined,
		result : undefined,
		formatter : function (tracker, data, callback) {
			var me = setting.youtube;

			me.file = tracker;
			me.formatter_args = arguments;

			var d = undefined;
			try {
				d = JSON.parse(data);
			} catch (e) {
				return callback({}, me)
			}
			var _id = checkObj(d, 'id');
			var c = [
				"tr:tracker_youtube",
				"i:etag",
				"i:kind",
				"i:chd_etag",
				"i:chd_id",
				"i:chd_kind",
				"i:chd_sn_title",
				"i:chd_sn_pub_at",
				"i:chd_sn_desc",
				"i:chd_sn_local_desc",
				"i:chd_sn_local_title",
				"i:chd_snth_def",
				"i:chd_snth_high",
				"i:chd_snth_medium",
				"i:chd_st_com",
				"i:chd_st_hidsub",
				"i:chd_st_sub",
				"i:chd_st_vid",
				"i:chd_st_view",
				"i:cd_cap",
				"i:cd_def",
				"i:cd_dim",
				"i:cd_dur",
				"i:cd_lic",
				"i:cd_region_r",
				"i:cd_region_block",
				"i:sn_cat_id",
				"i:sn_pubat",
				"i:sn_chId",
				"i:sn_chTitle",
				"i:sn_title",
				"i:sn_desc",
				"i:sn_live_bcast",
				"i:sn_local_desc",
				"i:sn_local_title",
				"i:snth_def_h",
				"i:snth_def_url",
				"i:snth_def_w",
				"i:snth_high_h",
				"i:snth_high_url",
				"i:snth_high_w",
				"i:snth_max_h",
				"i:snth_max_url",
				"i:snth_max_w",
				"i:snth_med_h",
				"i:snth_med_url",
				"i:snth_med_w",
				"i:snth_std_h",
				"i:snth_std_url",
				"i:snth_std_w",
				"i:status_embed",
				"i:status_lic",
				"i:status_privacy",
				"i:status_public",
				"i:status_upload",
				"i:st_comment",
				"i:st_dislike",
				"i:st_fav",
				"i:st_like",
				"i:st_view",
				"r:rv_etag",
				"r:rv_kind",
				"r:rv_nextpagetoken",
				"r:rv_p_resultspp",
				"r:rv_p_total"
			];
			var v = [
				'', //tracker,
				checkObj(d, 'etag'),
				checkObj(d, 'kind'),
				checkObj(d, 'channelDetail.etag'),
				checkObj(d, 'channelDetail.id'),
				checkObj(d, 'channelDetail.kind'),
				checkObj(d, 'channelDetail.snippet.title'),
				checkObj(d, 'channelDetail.snippet.publishedAt'),
				checkObj(d, 'channelDetail.snippet.description'),
				checkObj(d, 'channelDetail.snippet.localized.description'),
				checkObj(d, 'channelDetail.snippet.localized.title'),
				checkObj(d, 'channelDetail.snippet.thumbnails.default.url'),
				checkObj(d, 'channelDetail.snippet.thumbnails.high.url'),
				checkObj(d, 'channelDetail.snippet.thumbnails.medium.url'),
				checkObj(d, 'channelDetail.statistics.commentCount'),
				checkObj(d, 'channelDetail.statistics.hiddenSubscriberCount'),
				checkObj(d, 'channelDetail.statistics.subscriberCount'),
				checkObj(d, 'channelDetail.statistics.videoCount'),
				checkObj(d, 'channelDetail.statistics.viewCount'),
				checkObj(d, 'contentDetails.caption'),
				checkObj(d, 'contentDetails.definition'),
				checkObj(d, 'contentDetails.dimension'),
				checkObj(d, 'contentDetails.duration'),
				checkObj(d, 'contentDetails.licensedContent'),
				checkObj(d, 'contentDetails.regionRestriction'),
				checkObj(d, 'contentDetails.regionRestriction.blocked'),
				checkObj(d, 'snippet.categoryId'),
				checkObj(d, 'snippet.publishedAt'),
				checkObj(d, 'snippet.channelId'),
				checkObj(d, 'snippet.channelTitle'),
				checkObj(d, 'snippet.title'),
				checkObj(d, 'snippet.description'),
				checkObj(d, 'snippet.liveBroadcastContent'),
				checkObj(d, 'snippet.localized.description'),
				checkObj(d, 'snippet.localized.title'),
				checkObj(d, 'snippet.thumbnails.default.height'),
				checkObj(d, 'snippet.thumbnails.default.url'),
				checkObj(d, 'snippet.thumbnails.default.width'),
				checkObj(d, 'snippet.thumbnails.high.height'),
				checkObj(d, 'snippet.thumbnails.high.url'),
				checkObj(d, 'snippet.thumbnails.high.width'),
				checkObj(d, 'snippet.thumbnails.maxres.height'),
				checkObj(d, 'snippet.thumbnails.maxres.url'),
				checkObj(d, 'snippet.thumbnails.maxres.width'),
				checkObj(d, 'snippet.thumbnails.medium.height'),
				checkObj(d, 'snippet.thumbnails.medium.url'),
				checkObj(d, 'snippet.thumbnails.medium.width'),
				checkObj(d, 'snippet.thumbnails.standard.height'),
				checkObj(d, 'snippet.thumbnails.standard.url'),
				checkObj(d, 'snippet.thumbnails.standard.width'),
				checkObj(d, 'status.embeddable'),
				checkObj(d, 'status.license'),
				checkObj(d, 'status.privacyStatus'),
				checkObj(d, 'status.publicStatsViewable'),
				checkObj(d, 'status.uploadStatus'),
				checkObj(d, 'statistics.commentCount'),
				checkObj(d, 'statistics.dislikeCount'),
				checkObj(d, 'statistics.favoriteCount'),
				checkObj(d, 'statistics.likeCount'),
				checkObj(d, 'statistics.viewCount'),
				checkObj(d, 'relatedVideo.etag'),
				checkObj(d, 'relatedVideo.kind'),
				checkObj(d, 'relatedVideo.nextPageToken'),
				checkObj(d, 'relatedVideo.pageInfo.resultsPerPage'),
				checkObj(d, 'relatedVideo.pageInfo.totalResults')
			];

			checkObj(d, 'relatedVideo.items', []).forEach(function (item, i) {
				c.push(
					"r:rv_items_kind_" + i,
					"r:rv_items_id_" + i,
					"r:rv_items_sn_pubat_" + i,
					"r:rv_items_sn_chid_" + i,
					"r:rv_items_sn_title_" + i,
					"r:rv_items_sn_desc_" + i,
					"r:rv_items_sn_th_def_" + i,
					"r:rv_items_snth_h_" + i,
					"r:rv_items_snth_m_" + i,
					"r:rv_items_sn_ch_title_" + i,
					"r:rv_items_sn_live_bcast_" + i
				);
				v.push(
					checkObj(item, 'id.kind'),
					checkObj(item, 'id.videoId'),
					checkObj(item, 'snippet.publishedAt'),
					checkObj(item, 'snippet.channelId'),
					checkObj(item, 'snippet.title'),
					checkObj(item, 'snippet.description'),
					checkObj(item, 'snippet.thumbnails.default.url'),
					checkObj(item, 'snippet.thumbnails.high.url'),
					checkObj(item, 'snippet.thumbnails.medium.url'),
					checkObj(item, 'snippet.channelTitle'),
					checkObj(item, 'snippet.liveBroadcastContent')
				)
			});

			me.result = {
				columns : c,
				values : v,
				rowId : me.rowIdentity(v,_id)
			};

			if (callback && typeof callback == "function") return callback(me.result, me);
			else return me.result;
		}
	},
	facebook : {
		counter : 0,
		path : './data/facebook/',
		name : 'facebook',
		fields : ["a", "p", "tr"],
		rowIdentity : function (values) {
			var me = setting.facebook,
				ret = me.name + '_' + me.counter + '_' + new Date().getTime();

			if (values) ret = values;
			me.counter++;

			return ret;
		},
		formatter_args : undefined,
		result : undefined,
		formatter : function (tracker, data, callback) {
			var me = setting.facebook;

			me.result = [];
			me.file = tracker;
			me.formatter_args = arguments;

			var d = undefined;
			try {
				d = JSON.parse(data);
			} catch (e) {
				return callback([], me)
			}

			var c = [
				"tr:tracker_facebook",
				"a:account",
				"a:total_fans",
				"a:id",
				"a:desc",
				"a:can_post",
				"a:cat"
			];
			var v = [
				'', //tracker,
				checkObj(d, 'about.account'),
				checkObj(d, 'statistic.total_fans'),
				checkObj(d, 'about.id'),
				checkObj(d, 'about.about'),
				checkObj(d, 'about.can_post'),
				checkObj(d, 'about.category'),
			];

			checkObj(d, 'about.category_list', []).forEach(function(cat, i){
				c.push('a:catlist_id_' + i, 'a:catlist_name_' + i);
				v.push(cat.id, cat.name)
			});

			c.push(
				"a:checkins",
				"a:comp_overview",
				"a:c_id",
				"a:c_offset_x",
				"a:c_offset_y",
				"a:source",
				"a:c_cover_id",
				"a:c_desc",
				"a:has_added_app",
				"a:is_community_page",
				"a:is_published",
				"a:likes",
				"a:link",
				"a:city",
				"a:country",
				"a:latitude",
				"a:longitude",
				"a:zip",
				"a:name",
				"a:lot",
				"a:street",
				"a:valet",
				"a:talk_about",
				"a:username",
				"a:website",
				"a:were_here"
			);
			v.push(
				checkObj(d, 'about.checkins'),
				checkObj(d, 'about.company_overview'),
				checkObj(d, 'about.cover.id'),
				checkObj(d, 'about.cover.offset_x'),
				checkObj(d, 'about.cover.offset_y'),
				checkObj(d, 'about.source'),
				checkObj(d, 'about.cover.cover_id'),
				checkObj(d, 'about.cover.description'),
				checkObj(d, 'about.has_added_app'),
				checkObj(d, 'about.is_community_page'),
				checkObj(d, 'about.is_published'),
				checkObj(d, 'about.likes'),
				checkObj(d, 'about.link'),
				checkObj(d, 'about.location.city'),
				checkObj(d, 'about.location.country'),
				checkObj(d, 'about.location.latitude'),
				checkObj(d, 'about.location.longitude'),
				checkObj(d, 'about.parking.zip'),
				checkObj(d, 'about.name'),
				checkObj(d, 'about.parking.lot'),
				checkObj(d, 'about.parking.street'),
				checkObj(d, 'about.parking.vallet'),
				checkObj(d, 'about.talking_about_count'),
				checkObj(d, 'about.username'),
				checkObj(d, 'about.website'),
				checkObj(d, 'about.were_here_count')
			);

			checkObj(d, 'post', []).forEach(function(post, i) {
				var cc = [
					"p:id",
					"p:from_cat",
					"p:from_id",
					"p:from_name"
				];
				var vv = [
					checkObj(post, 'id'),
					checkObj(post, 'from.category'),
					checkObj(post, 'from.category.id'),
					checkObj(post, 'from.category.name')
				];
				checkObj(post, 'from.category_list', []).forEach(function(cat, i){
					cc.push('p:from_catlist_id_' + i, 'p:from_catlist_name_' + i);
					vv.push(cat.id, cat.name)
				});
				cc.push(
					"p:msg",
					"p:pic",
					"p:link",
					"p:icon",
					"p:priv_value",
					"p:priv_descr",
					"p:priv_friends",
					"p:priv_allow",
					"p:priv_deny",
					"p:type",
					"p:status_type",
					"p:object_id",
					"p:created_time",
					"p:updated_time",
					"p:is_hidden"
				);
				vv.push(
					post.message,
					post.picture,
					post.link,
					post.icon,
					checkObj(post, 'privacy.value'),
					checkObj(post, 'privacy.description'),
					checkObj(post, 'privacy.friends'),
					checkObj(post, 'privacy.allow'),
					checkObj(post, 'privacy.deny'),
					post.type,
					post.status_type,
					post.object_id,
					post.created_time,
					post.updated_time,
					post.is_hidden
				);
				checkObj(post, 'likes.data', []).forEach(function(like, i){
					cc.push('p:likes_id_' + i, 'p:likes_name_' + i);
					vv.push(like.id, like.name)
				});
				cc.push(
					"p:likes_after",
					"p:likes_before",
					"p:likes_next",
					"p:com_after",
					"p:com_before"
				);
				vv.push(
					checkObj(post, 'likes.paging.cursors.after'),
					checkObj(post, 'likes.paging.cursors.before'),
					checkObj(post, 'likes.paging.next'),
					checkObj(post, 'comments.paging.cursors.next'),
					checkObj(post, 'comments.paging.cursors.next')
				);
				checkObj(post, 'comments.data', []).forEach(function(comment, i){
					cc.push(
						"p:com_id_" + i,
						"p:com_from_id_" + i,
						"p:com_from_name_" + i,
						"p:com_message_" + i,
						"p:com_canremove_" + i,
						"p:com_created_" + i,
						"p:com_like_" + i,
						"p:com_user_likes_" + i
					);
					vv.push(
						comment.id,
						checkObj(comment, 'from.id'),
						checkObj(comment, 'from.name'),
						comment.message,
						comment.can_remove,
						comment.created_time,
						comment.like_count,
						comment.user_likes
					)
				});

				cc.push.apply(cc, c);
				vv.push.apply(vv, v);

				me.result.push({
					columns : cc,
					values : vv,
					rowId : me.rowIdentity(checkObj(post, 'id'))
				})
			});

			if (callback && typeof callback == "function") return callback(me.result, me);
			else return me.result;
		}
	},
	twitter : {
		counter : 0,
		path : './data/twitter/',
		name : 'twitter',
		fields : ["i", "e", "rt", "u", "tr"],
		rowIdentity : function (values) {
			var me = setting.twitter,
				idx = 2,
				ret = me.name + '_' + me.counter + '_' + new Date().getTime()

			if (values[idx]) ret = values[idx];
			me.counter++;

			return ret;
		},
		formatter_args : undefined,
		result : undefined,
		formatter : function (tracker, data, callback) {
			var me = setting.twitter;

			me.file = tracker;
			me.formatter_args = arguments;

			var d = undefined;
			try {
				d = JSON.parse(data);
			} catch (e) {
				return callback({}, me)
			}
			var c = [
				"tr:tracker_twitter",
				"i:id",
				"i:id_str",
				"i:possibly_sensitive",
				"i:created_at",
				"i:date",
				"i:fav_count",
				"i:rt_count",
				"i:irt_screen_name",
				"i:irt_status_id",
				"i:irt_status_id_str",
				"i:irt_u_id",
				"i:irt_u_id_str",
				"tr:trainer_global_sentiment",
				"i:source",
				"i:txt",
				"i:truncated",
				"i:scopes",
				"i:scopes_pl_ids",
				"i:favd",
				"i:gender",
				"i:keywords",
				"i:lang",
				"i:meta_iso_lang",
				"i:meta_result_type",
				"i:geo_type",
				//"i:geo_cords",
				//"i:cords",
				"i:cords_type",
				"i:pl_attributes",
				"i:pl_country",
				"i:pl_country_code",
				"i:pl_full_name",
				"i:pl_id",
				"i:pl_name",
				"i:pl_type",
				"i:pl_url",
				"i:pl_bb_type"
			];
			var v = [
				'', //tracker,
				d.id,
				d.id_str,
				d.possibly_sensitive,
				d.created_at,
				d.date,
				d.favorite_count,
				d.retweet_count,
				d.in_reply_to_screen_name,
				d.in_reply_to_status_id,
				d.in_reply_to_status_id_str,
				d.in_reply_to_user_id,
				d.in_reply_to_user_id_str,
				d.sentiment,
				d.source,
				d.text,
				d.truncated,
				d.scopes,
				checkObj(d, 'scopes.place_ids'),
				d.favorited,
				d.gender,
				checkObj(d, 'keywords', []).toString(),
				d.lang,
				checkObj(d, 'metadata.iso_language_code'),
				checkObj(d, 'metadata.result_type'),
				checkObj(d, 'geo.type'),
				//checkObj(d, 'geo.coordinates', []).toString(),
				//checkObj(d, 'coordinates.coordinates', []).toString(),
				checkObj(d, 'coordinates.type'),
				checkObj(d, 'place.attributes'),
				checkObj(d, 'place.country'),
				checkObj(d, 'place.country_code'),
				checkObj(d, 'place.full_name'),
				checkObj(d, 'place.id'),
				checkObj(d, 'place.name'),
				checkObj(d, 'place.type'),
				checkObj(d, 'place.url'),
				checkObj(d, 'place.bounding_box.type')
			];

			checkObj(d, 'geo.coordinates', []).forEach(function (geoCords, i) {
				c.push(
					"i:geo_cords_" + i
				);
				v.push(
					geoCords
				);
			});
			
			checkObj(d, 'coordinates.coordinates', []).forEach(function (cords, i) {
				c.push(
					"i:cords_" + i
				);
				v.push(
					cords
				);
			});
			
			var coordinates = checkObj(d, 'place.bounding_box.coordinates', []);
			if (coordinates[0]) {
				coordinates[0].forEach(function (coordinate, i) {
					c.push("i:pl_bb_cords_" + i);
					v.push(coordinate.toString());
				});
			}

			checkObj(d, 'entities.hashtags', []).forEach(function (hashtag, i) {
				c.push(
					"e:ht_idc_" + i,
					"e:ht_txt_" + i
				);
				v.push(
					checkObj(hashtag, 'indices', []).toString(),
					hashtag.text
				);
			});
			checkObj(d, 'entities.media', []).forEach(function (media, i) {
				c.push(
					"e:mdu_" + i,
					"e:meu_" + i,
					"e:m_id_" + i,
					"e:m_id_str_" + i,
					"e:m_idc_" + i,
					"e:m_m_url_" + i,
					"e:m_url_https_" + i,
					"e:msl_h_" + i,
					"e:msl_resize_" + i,
					"e:msl_w_" + i,
					"e:msm_h_" + i,
					"e:msm_resize_" + i,
					"e:msm_w_" + i,
					"e:mss_h_" + i,
					"e:mss_resize_" + i,
					"e:mss_w_" + i,
					"e:mst_h_" + i,
					"e:mst_resize_" + i,
					"e:mst_w_" + i,
					"e:msst_id_" + i,
					"e:msst_id_str_" + i,
					"e:msu_id_" + i,
					"e:msu_id_str_" + i,
					"e:m_type_" + i,
					"e:m_url_" + i
				);
				v.push(
					media.display_url,
					media.expanded_url,
					media.id,
					media.id_str,
					media.indices.toString(),
					media.media_url,
					media.media_url_https,
					media.sizes_large_h,
					media.sizes_large_resize,
					media.sizes_large_w,
					media.sizes_medium_h,
					media.sizes_medium_resize,
					media.sizes_medium_w,
					media.sizes_small_h,
					media.sizes_small_resize,
					media.sizes_small_w,
					media.sizes_thumb_h,
					media.sizes_thumb_resize,
					media.sizes_thumb_w,
					media.source_status_id,
					media.source_status_id_str,
					media.source_user_id,
					media.source_user_id_str,
					media.type,
					media.url
				);
			});
			checkObj(d, 'entities.symbols', []).forEach(function (symbol, i) {
				c.push(
					"e:sym_idc_" + i,
					"e:sym_txt_" + i
				);
				v.push(
					checkObj(symbol, 'indices', []).toString(),
					symbol.text
				);
			});
			checkObj(d, 'entities.urls', []).forEach(function (url, i) {
				c.push(
					"e:u_d_u_" + i,
					"e:u_e_u_" + i,
					"e:u_idc_" + i,
					"e:u_url_" + i
				);
				v.push(
					url.display_url,
					url.expanded_url,
					checkObj(url, 'indices', []).toString(),
					url.url
				);
			});
			checkObj(d, 'entities.user_mentions', []).forEach(function (mention, i) {
				c.push(
					"e:um_id_" + i,
					"e:um_id_str_" + i,
					"e:um_idc_" + i,
					"e:um_name_" + i,
					"e:um_screen_name_" + i
				);
				v.push(
					mention.id,
					mention.id_str,
					checkObj(mention, 'indices', []).toString(),
					mention.name,
					mention.screen_name
				);
			});

			c.push("rt:status");
			v.push(d.retweeted);

			if (checkObj(d, 'retweeted_status')) {
				c.push(
					"rt:cords",
					"rt:cords_type",
					"rt:created_at"
				);
				v.push(
					checkObj(d, 'retweeted_status.coordinates.coordinates', []).toString(),
					checkObj(d, 'retweeted_status.coordinates.type'),
					checkObj(d, 'retweeted_status.created_at')
				);

				checkObj(d, 'retweeted_status.entities.hashtags', []).forEach(function (hashtag, i) {
					c.push(
						"rt:e_ht_idc_" + i,
						"rt:e_ht_txt_" + i
					);
					v.push(
						checkObj(hashtag, 'indices', []).toString(),
						checkObj(hashtag, 'text')
					)
				});
				checkObj(d, 'retweeted_status.entities.media', []).forEach(function (media, i) {
					c.push(
						"rt:e_mdu_" + i,
						"rt:e_meu_" + i,
						"rt:e_m_id_" + i,
						"rt:e_m_id_str_" + i,
						"rt:e_m_idc_" + i,
						"rt:e_m_m_url_" + i,
						"rt:e_m_m_url_https_" + i,
						"rt:e_msl_h_" + i,
						"rt:e_msl_resize_" + i,
						"rt:e_msl_w_" + i,
						"rt:e_msm_h_" + i,
						"rt:e_msm_resize_" + i,
						"rt:e_msm_w_" + i,
						"rt:e_mss_h_" + i,
						"rt:e_mss_resize_" + i,
						"rt:e_mss_w_" + i,
						"rt:e_mst_h_" + i,
						"rt:e_mst_resize_" + i,
						"rt:e_mst_w_" + i,
						"rt:e_msst_id_" + i,
						"rt:e_msst_id_str_" + i,
						"rt:e_msu_id_" + i,
						"rt:e_msu_id_str_" + i,
						"rt:e_m_type_" + i,
						"rt:e_m_url_" + i
					);
					v.push(
						media.display_url,
						media.expanded_url,
						media.id,
						media.id_str,
						checkObj(media, 'indices', []).toString(),
						media.media_url,
						media.media_url_https,
						media.sizes_large_h,
						media.sizes_large_resize,
						media.sizes_large_w,
						media.sizes_medium_h,
						media.sizes_medium_resize,
						media.sizes_medium_w,
						media.sizes_small_h,
						media.sizes_small_resize,
						media.sizes_small_w,
						media.sizes_thumb_h,
						media.sizes_thumb_resize,
						media.sizes_thumb_w,
						media.source_status_id,
						media.source_status_id_str,
						media.source_user_id,
						media.source_user_id_str,
						media.type,
						media.url
					);
				});
				checkObj(d, 'retweeted_status.entities.urls', []).forEach(function (url, i) {
					c.push(
						"rt:e_u_d_u_" + i,
						"rt:e_u_e_u_" + i,
						"rt:e_u_idc_" + i,
						"rt:e_u_url_" + i
					);
					v.push(
						url.display_url,
						url.expanded_url,
						checkObj(url, 'indices', []).toString(),
						url.url
					);
				});

				checkObj(d, 'retweeted_status.entities.user_mentions', []).forEach(function (mention, i) {
					c.push(
						"rt:e_um_id_" + i,
						"rt:e_um_id_str_" + i,
						"rt:e_um_idc_" + i,
						"rt:e_um_name_" + i,
						"rt:e_um_screen_name_" + i
					);
					v.push(
						mention.id,
						mention.id_str,
						checkObj(mention, 'indices', []).toString(),
						mention.name,
						mention.screen_name
					);
				});

				c.push(
					"rt:fav_count",
					"rt:favd",
					"rt:geo_cords",
					"rt:geo_type",
					"rt:id",
					"rt:id_str",
					"rt:irt_screen_name",
					"rt:irt_status_id",
					"rt:irt_status_id_str",
					"rt:irt_u_id",
					"rt:irt_u_id_str",
					"rt:lang",
					"rt:meta_isolang",
					"rt:meta_result_type",
					"rt:pl_attributes",
					//"rt:pl_bb_cords",
					"rt:pl_bb_type",
					"rt:pl_country",
					"rt:pl_country_code",
					"rt:pl_full_name",
					"rt:pl_id",
					"rt:pl_name",
					"rt:pl_pl_type",
					"rt:pl_url",
					"rt:possibly_sensitive",
					"rt:rt_count",
					"rt:rted",
					"rt:scopes_pl_ids",
					"rt:source",
					"rt:txt",
					"rt:truncated",
					"rt:u_co_enabled",
					"rt:u_created_at",
					"rt:u_default_profile",
					"rt:u_dp_image",
					"rt:u_description",
					"rt:u_edu_display_url",
					"rt:u_edu_expanded_url",
					"rt:u_edu_idc",
					"rt:u_edu_url",
					"rt:u_euu_display_url",
					"rt:u_euu_expanded_url",
					"rt:u_euu_idc",
					"rt:u_euu_url",
					"rt:u_fav_count",
					"rt:u_f_request_sent",
					"rt:u_f_ers_count",
					"rt:u_f_ing",
					"rt:u_friends_count",
					"rt:u_geo_enabled",
					"rt:u_id",
					"rt:u_id_str",
					"rt:u_i_t_e",
					"rt:u_i_tor",
					"rt:u_lang",
					"rt:u_listed_count",
					"rt:u_loc",
					"rt:u_name",
					"rt:u_notifications",
					"rt:up_bg_c",
					"rt:up_bg_im_url",
					"rt:up_bg_im_url_https",
					"rt:up_bg_tile",
					"rt:up_banner_url",
					"rt:up_im_url",
					"rt:up_im_url_https",
					"rt:up_link_c",
					"rt:up_loc_attributes",
					"rt:up_loc_full_name",
					"rt:up_loc_id",
					"rt:up_loc_name",
					"rt:up_loc_pl_type",
					"rt:up_loc_url",
					"rt:up_sb_border_c",
					"rt:up_sb_fill_c",
					"rt:up_txt_c",
					"rt:up_use_bg_image",
					"rt:u_protected",
					"rt:u_screen_name",
					"rt:u_statuses_count",
					"rt:u_time_zone",
					"rt:u_url",
					"rt:u_utc_offset",
					"rt:u_verified"
				);
				v.push(
					checkObj(d, 'retweeted_status.favorite_count'),
					checkObj(d, 'retweeted_status.favorited'),
					checkObj(d, 'retweeted_status.geo.coordinates'),
					checkObj(d, 'retweeted_status.geo.type'),
					checkObj(d, 'retweeted_status.id'),
					checkObj(d, 'retweeted_status.id_str'),
					checkObj(d, 'retweeted_status.in_reply_to_screen_name'),
					checkObj(d, 'retweeted_status.in_reply_to_status_id'),
					checkObj(d, 'retweeted_status.in_reply_to_status_id_str'),
					checkObj(d, 'retweeted_status.in_reply_to_user_id'),
					checkObj(d, 'retweeted_status.in_reply_to_user_id_str'),
					checkObj(d, 'retweeted_status.lang'),
					checkObj(d, 'retweeted_status.metadata_iso_language_code'),
					checkObj(d, 'retweeted_status.metadata_result_type'),
					checkObj(d, 'retweeted_status.place.attributes'),
					//checkObj(d, 'retweeted_status.place.bounding_box.coordinates'),
					checkObj(d, 'retweeted_status.place.bounding_box.type'),
					checkObj(d, 'retweeted_status.place.country'),
					checkObj(d, 'retweeted_status.place.country_code'),
					checkObj(d, 'retweeted_status.place.full_name'),
					checkObj(d, 'retweeted_status.place.id'),
					checkObj(d, 'retweeted_status.place.name'),
					checkObj(d, 'retweeted_status.place.place_type'),
					checkObj(d, 'retweeted_status.place.url'),
					checkObj(d, 'retweeted_status.possibly_sensitive'),
					checkObj(d, 'retweeted_status.retweet_count'),
					checkObj(d, 'retweeted_status.retweeted'),
					checkObj(d, 'retweeted_status.scopes.place_ids0'),
					checkObj(d, 'retweeted_status.source'),
					checkObj(d, 'retweeted_status.text'),
					checkObj(d, 'retweeted_status.truncated'),
					checkObj(d, 'retweeted_status.user.contributors_enabled'),
					checkObj(d, 'retweeted_status.user.created_at'),
					checkObj(d, 'retweeted_status.user.default_profile'),
					checkObj(d, 'retweeted_status.user.default_profile_image'),
					checkObj(d, 'retweeted_status.user.description'),
					checkObj(d, 'retweeted_status.user.entities.description_urls_display_url'),
					checkObj(d, 'retweeted_status.user.entities.description_urls_expanded_url'),
					checkObj(d, 'retweeted_status.user.entities.description_urls_indices'),
					checkObj(d, 'retweeted_status.user.entities.description_urls_url'),
					checkObj(d, 'retweeted_status.user.entities.url_urls_display_url'),
					checkObj(d, 'retweeted_status.user.entities.url_urls_expanded_url'),
					checkObj(d, 'retweeted_status.user.entities.url_urls_indices'),
					checkObj(d, 'retweeted_status.user.entities.url_urls_url'),
					checkObj(d, 'retweeted_status.user.favourites_count'),
					checkObj(d, 'retweeted_status.user.follow_request_sent'),
					checkObj(d, 'retweeted_status.user.followers_count'),
					checkObj(d, 'retweeted_status.user.following'),
					checkObj(d, 'retweeted_status.user.friends_count'),
					checkObj(d, 'retweeted_status.user.geo_enabled'),
					checkObj(d, 'retweeted_status.user.id'),
					checkObj(d, 'retweeted_status.user.id_str'),
					checkObj(d, 'retweeted_status.user.is_translation_enabled'),
					checkObj(d, 'retweeted_status.user.is_translator'),
					checkObj(d, 'retweeted_status.user.lang'),
					checkObj(d, 'retweeted_status.user.listed_count'),
					checkObj(d, 'retweeted_status.user.location'),
					checkObj(d, 'retweeted_status.user.name'),
					checkObj(d, 'retweeted_status.user.notifications'),
					checkObj(d, 'retweeted_status.user.profile_background_color'),
					checkObj(d, 'retweeted_status.user.profile_background_image_url'),
					checkObj(d, 'retweeted_status.user.profile_background_image_url_https'),
					checkObj(d, 'retweeted_status.user.profile_background_tile'),
					checkObj(d, 'retweeted_status.user.profile_banner_url'),
					checkObj(d, 'retweeted_status.user.profile_image_url'),
					checkObj(d, 'retweeted_status.user.profile_image_url_https'),
					checkObj(d, 'retweeted_status.user.profile_link_color'),
					checkObj(d, 'retweeted_status.user.profile_location_attributes'),
					checkObj(d, 'retweeted_status.user.profile_location_full_name'),
					checkObj(d, 'retweeted_status.user.profile_location_id'),
					checkObj(d, 'retweeted_status.user.profile_location_name'),
					checkObj(d, 'retweeted_status.user.profile_location_place_type'),
					checkObj(d, 'retweeted_status.user.profile_location_url'),
					checkObj(d, 'retweeted_status.user.profile_sidebar_border_color'),
					checkObj(d, 'retweeted_status.user.profile_sidebar_fill_color'),
					checkObj(d, 'retweeted_status.user.profile_text_color'),
					checkObj(d, 'retweeted_status.user.profile_use_background_image'),
					checkObj(d, 'retweeted_status.user.protected'),
					checkObj(d, 'retweeted_status.user.screen_name'),
					checkObj(d, 'retweeted_status.user.statuses_count'),
					checkObj(d, 'retweeted_status.user.time_zone'),
					checkObj(d, 'retweeted_status.user.url'),
					checkObj(d, 'retweeted_status.user.utc_offset'),
					checkObj(d, 'retweeted_status.user.verified')
				);
			}
			
			var rtCoordinates = checkObj(d, 'retweeted_status.place.bounding_box.coordinates', []);
			if (rtCoordinates[0]) {
				rtCoordinates[0].forEach(function (rtCoordinates, i) {
					c.push("rt:pl_bb_cords_" + i);
					v.push(rtCoordinates.toString());
				});
			}

			c.push(
				"u:co_enabled",
				"u:created_at",
				"u:default_profile",
				"u:dp_image",
				"u:description"
			);
			v.push(
				checkObj(d, 'user.contributors_enabled'),
				checkObj(d, 'user.created_at'),
				checkObj(d, 'user.default_profile'),
				checkObj(d, 'user.default_profile_image'),
				checkObj(d, 'user.description')
			);

			checkObj(d, 'user.entities.description.urls', []).forEach(function (url, i) {
				c.push(
					"u:edu_d_u_" + i,
					"u:edu_e_u_" + i,
					"u:edu_idc_" + i,
					"u:edu_url_" + i
				);
				v.push(
					url.display_url,
					url.expanded_url,
					checkObj(url, 'indices', []).toString(),
					url.url
				);
			});
			checkObj(d, 'user.entities.url.urls', []).forEach(function (url, i) {
				c.push(
					"u:euu_d_u_" + i,
					"u:euu_e_u_" + i,
					"u:euu_idc_" + i,
					"u:euu_url_" + i
				);
				v.push(
					url.display_url,
					url.expanded_url,
					checkObj(url, 'indices', []).toString(),
					url.url
				);
			});

			c.push(
				"u:fav_count",
				"u:f_request_sent",
				"u:f_ers_count",
				"u:f_ing",
				"u:friends_count",
				"u:geo_enabled",
				"u:id",
				"u:id_str",
				"u:i_t_e",
				"u:i_tor",
				"u:lang",
				"u:listed_count",
				"u:loc",
				"u:name",
				"u:notifications",
				"u:pro_bg_c",
				"u:pro_bg_im_url",
				"u:pro_bg_im_url_https",
				"u:pro_bg_tile",
				"u:pro_banner_url",
				"u:pro_im_url",
				"u:pro_im_url_https",
				"u:pro_link_c",
				"u:pro_loc_attributes",
				"u:pro_loc_full_name",
				"u:pro_loc_id",
				"u:pro_loc_name",
				"u:pro_loc_pl_type",
				"u:pro_loc_url",
				"u:pro_sb_border_c",
				"u:pro_sb_fill_c",
				"u:pro_txt_c",
				"u:pro_use_bg_image",
				"u:protected",
				"u:screen_name",
				"u:statuses_count",
				"u:time_zone",
				"u:url",
				"u:utc_offset",
				"u:verified"
			);
			v.push(
				checkObj(d, 'user.favourites_count'),
				checkObj(d, 'user.follow_request_sent'),
				checkObj(d, 'user.followers_count'),
				checkObj(d, 'user.following'),
				checkObj(d, 'user.friends_count'),
				checkObj(d, 'user.geo_enabled'),
				checkObj(d, 'user.id'),
				checkObj(d, 'user.id_str'),
				checkObj(d, 'user.is_translation_enabled'),
				checkObj(d, 'user.is_translator'),
				checkObj(d, 'user.lang'),
				checkObj(d, 'user.listed_count'),
				checkObj(d, 'user.location'),
				checkObj(d, 'user.name'),
				checkObj(d, 'user.notifications'),
				checkObj(d, 'user.profile_background_color'),
				checkObj(d, 'user.profile_background_image_url'),
				checkObj(d, 'user.profile_background_image_url_https'),
				checkObj(d, 'user.profile_background_tile'),
				checkObj(d, 'user.profile_banner_url'),
				checkObj(d, 'user.profile_image_url'),
				checkObj(d, 'user.profile_image_url_https'),
				checkObj(d, 'user.profile_link_color'),
				checkObj(d, 'user.profile_location_attributes'),
				checkObj(d, 'user.profile_location_full_name'),
				checkObj(d, 'user.profile_location_id'),
				checkObj(d, 'user.profile_location_name'),
				checkObj(d, 'user.profile_location_place_type'),
				checkObj(d, 'user.profile_location_url'),
				checkObj(d, 'user.profile_sidebar_border_color'),
				checkObj(d, 'user.profile_sidebar_fill_color'),
				checkObj(d, 'user.profile_text_color'),
				checkObj(d, 'user.profile_use_background_image'),
				checkObj(d, 'user.protected'),
				checkObj(d, 'user.screen_name'),
				checkObj(d, 'user.statuses_count'),
				checkObj(d, 'user.time_zone'),
				checkObj(d, 'user.url'),
				checkObj(d, 'user.utc_offset'),
				checkObj(d, 'user.verified')
			);

			me.result = {
				columns : c,
				values : v,
				rowId : me.rowIdentity(v)
			};

			if (callback && typeof callback == "function") return callback(me.result, me);
			else return me.result;
		}
	}
};

module.exports = setting;
