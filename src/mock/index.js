import Mock from 'weimockjs'
import authMe from './json/authMe.json'

// 获取用户信息
Mock.mock(new RegExp('/authorityMock/me', 'i'), 'get', authMe)

export default Mock
