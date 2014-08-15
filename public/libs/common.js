function showBg(target) {
  var bh = $('body').height();
  var bw = $('body').width();
  $('#target').css({
    height: bh,
    width: bw,
    display: "block"
  })
}
function closeBg(target) {
  $('#target').hide();
}