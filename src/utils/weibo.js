
/**
 * 过滤cookie
 *
 * @param {any} cookie
 * @returns
 */
export function getCookieFilter(cookie) {
  return cookie.replace(/,([^ ])/g, '; $1')
  .replace(/( expires| Max-Age| domain| path| HttpOnly)=?.*?;/g, '')
  .replace(/; HttpOnly$/, '');
}

/**
 * 过滤微博中的富文本
 *
 * @param {any} text
 * @returns
 */
function getTextFilter(text) {
  return text
  // .replace(/https?:\/\/[\w\d./]+/g, '[网页链接]')
    .replace(/<br\/>/g, '\n')
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&');
}

/**
 * 过滤有效的微博信息
 *
 * @param {any} weibo
 * @returns
 */
export function getWeiboInfo(weibo) {
  // 时间和来源
  const createdAt = weibo.created_at || '宇宙大爆炸前';
  const source = weibo.source || '火星';

  // 图片
  const pics = {
    smalls: weibo.pics ? weibo.pics.map(pic => pic.url) : [],
    larges: weibo.pics ? weibo.pics.map(pic => pic.large.url) : [],
  };

  let text = weibo.text || '这里一片荒芜...';

  let video = null;
  // 读取页面和多媒体信息
  if (weibo.page_info) {
    const page = weibo.page_info;
    if (page.type === 'video') {
      text = weibo.text ? weibo.text : `${page.page_title} ${page.content2}`;
      video = {
        url: page.media_info.stream_url,
        pic: page.page_pic.url,
      };
    }
    if (!weibo.text && page.type === 'topic') {
      text = `${page.page_title} ${page.content1}`;
    }
    if (!weibo.text && page.type === 'webpage') {
      text = `${page.page_title} ${page.content2}`;
    }
  }

  return {
    id: weibo.id,
    user: {
      profile_image_url: weibo.user.profile_image_url,
      screen_name: weibo.user.screen_name,
    },
    created_at: createdAt,
    source,
    pics,
    video,
    text: getTextFilter(text),
    bar: {
      attitudes: weibo.attitudes_count,
      comments: weibo.comments_count,
      reposts: weibo.reposts_count,
    },
  };
}

/**
 * 过滤评论数据
 *
 * @export
 * @param {any} comment
 * @returns
 */
export function getCommentInfo(comment) {
  // 时间和来源
  const createdAt = comment.created_at || '宇宙大爆炸前';
  const source = comment.source || '火星';
  const text = comment.text || '这里一片荒芜...';

  return {
    id: comment.id,
    user: {
      profile_image_url: comment.user.profile_image_url,
      screen_name: comment.user.screen_name,
    },
    created_at: createdAt,
    source,
    likes: comment.like_counts,
    text: getTextFilter(text),
  };
}

export default {
  getWeiboInfo,
  getCommentInfo,
  getCookieFilter,
};
