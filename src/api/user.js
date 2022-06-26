import http from '@/utils/http'
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
