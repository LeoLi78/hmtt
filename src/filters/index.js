import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
// 将时间相对化
export const dateformat = (time) => {
  return dayjs(time).fromNow()
}
