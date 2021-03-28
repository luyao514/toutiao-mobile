// 用户请求模块
import request from '@/utils/request'

// 登录请求
export const login = (data) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data
  })
}
// 获取验证码请求
export const getCodeSms = (mobile) => {
  return request({
    url: '/v1_0/sms/codes/' + mobile,
    method: 'get'
  })
}

// 获取用户自己的信息请求
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    method: 'get'
  })
}
