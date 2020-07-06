export function getTime(timeStamp) {
  timeStamp = typeof timeStamp == 'string' ? +timeStamp : timeStamp
  var targetTime = new Date(timeStamp)
  var nowTimeStamp = new Date()
  var targetYear = targetTime.getFullYear()
  var targetMount = targetTime.getMonth() + 1
  var targetDate = targetTime.getDate()
  var nowYear = nowTimeStamp.getFullYear()
  var nowMount = nowTimeStamp.getMonth() + 1
  var nowDate = nowTimeStamp.getDate()
  var targetHour = targetTime.getHours()
  var targetMinute = targetTime.getMinutes()
  targetMount = targetMount < 10 ? '0' + targetMount : targetMount
  targetDate = targetDate < 10 ? '0' + targetDate : targetDate
  targetHour = targetHour < 10 ? '0' + targetHour : targetHour
  targetMinute = targetMinute < 10 ? '0' + targetMinute : targetMinute
  if (nowYear == targetYear && nowMount == targetMount && nowDate == targetDate) {
    return `${targetHour}:${targetMinute}`
  } else {
    return `${targetYear}-${targetMount}-${targetDate} ${targetHour}:${targetMinute}`
  }

}

export function getDate(timeStamp) {
  var targetTime = new Date(timeStamp)
  var targetYear = targetTime.getFullYear()
  var targetMount = targetTime.getMonth() + 1
  var targetDate = targetTime.getDate()
  return `${targetYear}-${targetMount}-${targetDate}`
}
