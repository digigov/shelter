module.exports = function() {
  return (Math.random() * 0x1000000000 % 36).toString(36) + (Math.random() * 0x1000000000 % 36).toString(36) + (new Date().getTime() - 1262304000000).toString(36);
}