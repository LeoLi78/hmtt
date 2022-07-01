import http from '@/utils/http'
/**
 *获取我的频道
 * @returns
 */
export const getMyChannels = () => {
  return http({
    url: 'user/channels'
  })
}
// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => {
  return http({
    url: 'articles',
    params: { channel_id, timestamp }
  })
}

export const getAllArticleList = () => {
  return http({
    url: 'channels'
  })
}

export const saveChannels = (channels) => {
  return http({
    url: 'user/channels',
    method: 'put',
    data: {
      channels
    }
  })
}
