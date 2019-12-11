function simpleDateFormatter(str) {
  let date;
  try {
    date = new Date(str);
  } catch (e) {
    return '';
  }
  const fullYear = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return `${fullYear}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export {
  simpleDateFormatter
}