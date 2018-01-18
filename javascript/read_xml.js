$(function(){
	var isValid = true;
	function is_valid(node,index,length,parentNode){
	var nodeName = node.nodeName;
	if(nodeName == 'Components'){}
	else if(nodeName == 'Online_Model'){
		if(parentNode != 'Components' && parentNode != 'Online_Model'){
			alert("Parse failed! The parentNode of field '" + nodeName + "' must be 'Online_Model' or the 'Components', not the '" + parentNode + "'!");
			isValid = false;
			return;
		}
		
	}
	else{
		alert("A wrong node '" + nodeName + "' in upload file， please check the file !");
		isValid = false;
		return;
	}
	
	
	var length = $(node).children().length;
	$(node).children().each(function(index, element) {
		if(isValid){
        	is_valid($(node).children().get(index),index,length,nodeName);
		}
    });
	
}
	var after_str = "";
	function uploadFile(node){
		var name = $(node).attr('full_name');
		var type = $(node).attr('comp_type');
		var processes = $(node).attr('processes');
		after_str += '<li>' + name + '</br>type:' + type + '</br>processes:' + processes;
		
		var length = $(node).children().length;
		$(node).children().each(function(index, element) {
			if(index == 0) after_str += '<ul>';
			uploadFile($(node).children().get(index));
			if(index == length - 1)
				after_str += '</ul>';
			after_str += '</li>';
		});
	}
	function parseXmlStr(xmlStr){
	try{
		var xml = $.parseXML(xmlStr);
	}catch(err){
		alert("Plese upload a well-formed xml file!");
		window.location.reload();
		return;
	}
	if($(xml).find('Components').length == 0 ){
		alert("The file must have one root node 'Components', Please check! ");
		return ;
	}
	is_valid($(xml).find('Components').get(0),0,1,"");
	if(!isValid){
		isValid = true;
		return;
	}
	uploadFile($(xml).find('Online_Model').get(0))
	//alert(after_str);
	$('#org').append(after_str);
	$("#org").jOrgChart({
            chartElement : '#chart',
            dragAndDrop  : true
        });
}

// 加载xml文档
$('#submit-upload').bind({
	click:function(){
	var xmlStr = "";
	var files = document.getElementById('upload').files;
    if (!files.length) {
      alert('Please select a file!');
      return;
    }
    var file = files[0];
	var fileName = $('#upload').val().split("\\").pop();  
	var fileType = fileName.substr(fileName.length-4,fileName.length);
	if(fileType != '.xml'){
		alert('Upload failed! Please upload a xml file !');
		window.location.reload();
		return;	
	}
    fileName = fileName.substring(0, fileName.lastIndexOf("."));
	var reader = new FileReader();
    // If we use onloadend, we need to check the readyState.
	reader.onload = function (e) {
           var bytes = new Uint8Array(reader.result);
           var length = bytes.byteLength;
           for (var i = 0; i < length; i++) {
               xmlStr += String.fromCharCode(bytes[i]);
           }
		   //alert($.trim(xmlStr).replace(/[\r\n]/g,"").replace(/[ ]/g,"").replace(/[	]/g,""));
		   parseXmlStr($.trim(xmlStr).replace(/[\r\n]/g,"").replace(/[	]/g,""));
	}
    reader.readAsArrayBuffer(file);
		
	},
})
})