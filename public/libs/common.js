function loadWaiting(dom, hintString) {
  dom.removeClass("survey-hide");
  var hint = hintString || '';
  dom.html("<div class='loading-wrapper'><div class='loading'>{0}</div></div>".format(hint)).css({top:"0px", left:"0px"});
}


function addMask(maskName,area){
  var domTmp = jQuery(maskName);
  domTmp.show();
  domTmp.width(jQuery(area).width());
  loadWaiting(domTmp);
}
