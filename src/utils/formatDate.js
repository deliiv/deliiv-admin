export const formateDate = (str) => {
  var date = new Date(str);
  var day = date.getDate();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var dateStr = year + "/" + month + "/" + day;
  return dateStr;
};

export const formatTime = (time) => {
  var date = new Date(time);
  var newTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return newTime;
};
