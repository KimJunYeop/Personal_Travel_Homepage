var values = new Array();

exports.getValues = function(){
  return values;
}

exports.setValues = function(set_values){
  values = set_values;
}

exports.setClear = function(){
  values = new Array();
}
