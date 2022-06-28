import http from '@/utils/http'
import store from '@/store'
/**
 *
 * @param {*} mobile
 * @returns
 */
export const getSmsCode = (mobile) => {
  return http({
    url: `/sms/codes/${mobile}`
  })
}
/**
 *
 * @param {mobile,code} data
 * @return promise
 */
export const login = ({ mobile, code }) => {
  return http({
    method: 'post',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}
/**
 *获取用户个人资料"
 * @returns
 */
export const getUserInfo = () => {
  return http({
    url: 'user',
    // 当只有路径没有headers时，请求不成功：解决查看文档接口看有什么要求再加入相应的。
    headers: {
      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}
