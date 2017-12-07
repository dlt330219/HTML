// JavaScript Document

//top的事件
$(function(){
	
	var interfaceNextNode = $($('#xml_interface').children('#xmlNode').get(0));
	var isValid = true;
	var dong = 1;
function is_valid(node,index,length,parentNode){
	var status = ''
	if(typeof($(node).attr('status')) != 'undefined')
		status = $(node).attr('status');
	var dafault = ''
	if(typeof($(node).attr('default')) != 'undefined')
		dafault = $(node).attr('default');
	
	if(status != '' && status != 'on' && status != 'off'){
		alert("Parse failed! The value of 'status' must be 'on' or 'off'!");
		isValid = false;
		return;
	}
	if(dafault != '' && dafault != 'all' && dafault != 'off' && dafault != 'remain'){
		alert("Parse failed! The value of 'default' must be 'all', 'off' or 'remain'!");
		isValid = false;
		return;
	}
	
	var nodeName = node.nodeName;
	if(nodeName == 'root'){}
	else if(nodeName == 'local_import_interfaces' || nodeName == 'local_grids' || nodeName == 'component_full_names_sets'){
		if(parentNode != 'root'){
			alert("Parse failed! The childrenNode of field root only must be 'local_import_interfaces','local_grids','component_full_names_sets', not the " + nodeName + "!");
			isValid = false;
			return;
		}
	}
	else if(nodeName == 'import_interface'){
		if(parentNode != 'local_import_interfaces'){
			alert("Parse failed! The parentNode of field " + nodeName + " must be 'local_import_interfaces', not the " + parentNode + "!");
			isValid = false;
			return;
		}
	}
	else if(nodeName == 'import_connection'){
		if(parentNode != 'import_interface'){
			alert("Parse failed! The parentNode of field " + nodeName + " must be 'import_interface', not the " + parentNode + "!");
			isValid = false;
			return;
		}/*
		var attra = node.attributes;
		for(var i in attra){
			alert(attra[i].name);
		}*/
	}
	else if(nodeName == 'fields' || nodeName == 'components'){
		if(parentNode != 'import_connection'){
			alert("Parse failed! The parentNode of field '" + nodeName + "' must be 'import_interface', not the '" + parentNode + "'!");
			isValid = false;
			return;
		}
		if(length > 2 || (nodeName == 'fields' && index != 0) || (nodeName == 'components' && (index != length - 1))){
			alert("Parse failed! The field 'import_interface' must be only have one 'fields' and one 'components' !");
			isValid = false;
			return;
		}
	}
	else if(nodeName == 'field'){
		if(parentNode != 'fields'){
			alert("Parse failed! The parentNode of field  must be 'fields', not the '" + parentNode + "'!");
			isValid = false;
			return;
		}
	}
	else if(nodeName == 'component'){
		if(parentNode != 'components'){
			alert("Parse failed! The parentNode of field '" + nodeName + "'  must be 'components', not the '" + parentNode + "'!");
			isValid = false;
			return;
		}
	}
	else if(nodeName == 'grids_entry'){
		if(parentNode != 'local_grids'){
			alert("Parse failed! The parentNode of field '" + nodeName + "'  must be 'local_grids', not the '" + parentNode + "'!");
			isValid = false;
			return;
		}
	}
	else if(nodeName == 'component_full_names_set'){
		if(parentNode != 'component_full_names_sets'){
			alert("Parse failed! The parentNode of field '" + nodeName + "'  must be 'component_full_names_sets', not the '" + parentNode + "'!");
			isValid = false;
			return;
		}
	}
	else if(nodeName == 'component_entry'){
		if(parentNode != 'component_full_names_set'){
			alert("Parse failed! The parentNode of field '" + nodeName + "'  must be 'component_full_names_set', not the '" + parentNode + "'!");
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
function refreshXmlNode(){
	var is_done = false;
	var node = $($('#xml_interface').children('#xmlNode').get(4));
	var temp;
	while($.trim(node.children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"").replace(/[	]/g,"") != 'components'){
		temp = node.next();
		node.remove();
		node = temp;
	}
	node = node.next();
	while(!node.hasClass('nodeSplit')){
		temp = node.next();
		node.remove();
		node = temp;
	}
	node = node.next();	
	while($.trim(node.children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"").replace(/[	]/g,"") != 'local_grids'){
		temp = node.next();
		node.remove();
		node = temp;
	}
	node = node.next().next().next();
	while($.trim(node.children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"").replace(/[	]/g,"") != 'component_full_names_sets'){
		temp = node.next();
		node.remove();
		node = temp;
	}
	node = node.next().next().next();
	while(!node.hasClass('nodeSplit')){
		temp = node.next();
		node.remove();
		node = temp;
	}
	$('[id = nameInput]').each(function(index, element) {
			$(this).val(""); 
    });
}
function getNodes(node,length,index){
	dong = 2;
	var nodeName = node.nodeName;
	if(nodeName == 'field' || nodeName == 'component' || nodeName == 'grids_entry' || nodeName == 'component_entry')
		interfaceNextNode = interfaceNextNode.next();
	if(nodeName != "root" && nodeName != "local_import_interfaces"){
	while(nodeName != $.trim(interfaceNextNode.children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"").replace(/[	]/g,""))
		interfaceNextNode = interfaceNextNode.next();
	if(index + 1 != length)
		interfaceNextNode.children('.xmlEdit').children('div').children('#add').click();
	if(nodeName == 'import_interface'){
		var name = $(node).attr('name');
		$(interfaceNextNode.children('.xmlSpan').get(0)).children('div').children('input').val(name);
		var status = $(node).attr('status');
		$(interfaceNextNode.children('.xmlSpan').get(1)).children('div').children('input').val(status);
	}
	if(nodeName == 'import_connection'){
		var status = $(node).attr('status');
		$(interfaceNextNode.children('.xmlSpan').get(0)).children('div').children('input').val(status);
	}
	if(nodeName == 'field'){
		var name = $(node).attr('name');
		$(interfaceNextNode.children('.xmlSpan').get(0)).children('div').children('input').val(name);
	}
	if(nodeName == 'component'){
		var comp_full_name = $(node).attr('comp_full_name');
		$(interfaceNextNode.children('.xmlSpan').get(0)).children('div').children('input').val(comp_full_name);
		var interface_name = $(node).attr('interface_name');
		$(interfaceNextNode.children('.xmlSpan').get(1)).children('div').children('input').val(interface_name);
	}
	if(nodeName == 'fields' || nodeName == 'components'){
		var status = $(node).attr('status');
		var dafault = $(node).attr('default');
		if(status != ""){
		$(interfaceNextNode.children('.xmlSpan').get(0)).children('div').children('input').click();
		$(interfaceNextNode.children('.xmlSpan').get(0)).children('div').children('ul').children('ul').children('#'+status).click();		
		$(interfaceNextNode.children('.xmlSpan').get(0)).children('div').children('input').mouseout();}
		if(dafault != ""){
		$(interfaceNextNode.children('.xmlSpan').get(1)).children('div').children('input').click();
		$(interfaceNextNode.children('.xmlSpan').get(1)).children('div').children('ul').children('ul').children('#'+dafault).click();
		$(interfaceNextNode.children('.xmlSpan').get(1)).children('div').children('input').mouseout();}
	}
	if(nodeName == 'grids_entry'){
		var local_grid_name = $(node).attr('local_grid_name');
		$(interfaceNextNode.children('.xmlSpan').get(0)).children('div').children('input').val(local_grid_name);
		var another_comp_full_name = $(node).attr('another_comp_full_name');
		$(interfaceNextNode.children('.xmlSpan').get(1)).children('div').children('input').val(another_comp_full_name);
		var another_comp_grid_name = $(node).attr('another_comp_grid_name');
		$(interfaceNextNode.children('.xmlSpan').get(2)).children('div').children('input').val(another_comp_grid_name);
	}
	if(nodeName == 'component_full_names_set'){
		var status = $(node).attr('status');
		$(interfaceNextNode.children('.xmlSpan').get(0)).children('div').children('input').val(status);
		var keyword = $(node).attr('keyword');
		$(interfaceNextNode.children('.xmlSpan').get(1)).children('div').children('input').val(keyword);
	}
	if(nodeName == 'component_entry'){
		var comp_full_name = $(node).attr('comp_full_name');
		$(interfaceNextNode.children('.xmlSpan').get(0)).children('div').children('input').val(comp_full_name);
		if(index + 1 == length)
			return;
	}
	}
	var length = $(node).children().length;
	$(node).children().each(function(index, element) {
        getNodes($(node).children().get(index),length,index);
    });
}
function uploadFile(root){
	$(root).children().each(function(index, element) {
        if($(root).children().get(index).nodeName == 'local_import_interfaces'){
			$('#fileTypeSelectButton').click();
			$($('#fileTypeMenu').children('ul').children('li').get(0)).click();
			//if(dong == 1)
				getNodes(root,1,0);
		}
    });
}
function parseXmlStr(xmlStr){
	//alert(xmlStr);
	try{
		var xml = $.parseXML(xmlStr);
	}catch(err){
		alert("Plese upload a well-formed xml file!");
		window.location.reload();
		return;
	}
	if($(xml).find('root').length == 0 ){
		alert("The file has no 'root' node, Please check! ");
		return ;
	}
	is_valid($(xml).find('root').get(0),0,1,"");
	if(!isValid){
		isValid = true;
		return;
	}
	interfaceNextNode = $($('#xml_interface').children('#xmlNode').get(0));
	refreshXmlNode();
	uploadFile($(xml).find('root').get(0))
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
	//alert(fileName)
    // If we use onloadend, we need to check the readyState.
	reader.onload = function (e) {
           var bytes = new Uint8Array(reader.result);
           var length = bytes.byteLength;
           for (var i = 0; i < length; i++) {
               xmlStr += String.fromCharCode(bytes[i]);
           }
		   //alert($.trim(xmlStr).replace(/[\r\n]/g,"").replace(/[ ]/g,"").replace(/[	]/g,""));
		   parseXmlStr($.trim(xmlStr).replace(/[\r\n]/g,"").replace(/[	]/g,""));
		   $('#fileName').val(fileName);
	}
    reader.readAsArrayBuffer(file);
		
	},
})
});

//buttom的事件
$(function(){
	
	function writeInterface(){
		var isNull = false;
		$('[id = nameInput]').each(function(index, element) {
			if($(this).parent().parent().parent().parent().attr('id') != 'xml_interface')
				return;
       	 	if($(this).val() == "" && !$(this).parent().parent().hasClass('undisplay')){
			isNull = true;
			}
    	});
		if(isNull){
			alert("Fields with '*' must be NotNull !");
			//return ;
		}
		var fileName = $.trim($('#fileName').val()).replace(/[\r\n]/g,"").replace(/[ ]/g,"") + '.xml';
		var xml = '<?xml version="1.0" encoding="utf-8"?>\n<root>\n';
		$('#xml_interface').children('#xmlNode').each(function() {
			
            var nodeName = $.trim($(this).children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"");
			var node = $(this);
			if((nodeName == 'import_interface' && $.trim(node.prev().children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"") != "local_import_interfaces") ){
				xml += '	</import_interface>\n';
			}
			if(nodeName == 'local_grids'){
				xml += '	</import_interface>\n</local_import_interfaces>\n';
			}
			if(nodeName == 'component_full_names_sets'){
				xml += '</local_grids>\n';
			}
			var tab= '';
			if(nodeName == 'import_interface') tab='	';
			if(nodeName == 'import_connection') tab='		';
			if(nodeName == 'fields' || nodeName == 'components') tab='			';
			if(nodeName == 'field' || nodeName == 'component') tab='				';
			if(nodeName == 'grids_entry') tab = '	';
			if(nodeName == 'component_full_names_set') tab = '	';
			if(nodeName == 'component_entry') tab = '		';
			
			xml += tab + '<' + nodeName +' ';
			$(this).children('.xmlSpan').each(function() {
				if($(this).hasClass('undisplay')){return true;}
               	var attrName = $.trim($(this).children('label').text()).substring(1).replace(/[\r\n]/g,"").replace(/[ ]/g,"");
				var attrValue = $.trim($(this).children('div').children('#nameInput').val()).replace(/[\r\n]/g,"").replace(/[ ]/g,"");
				xml += attrName + '="' + attrValue + '" ';
            });
			xml += '>\n'
			
			if(nodeName == 'fields' && node.next().children('span').text() != 'field'){
				xml += '			</fields>\n'
			}
			if(nodeName == 'components' && node.next().children('span').text() != 'component'){
				xml += '			</components>\n		</import_connection>\n'
			}
			if(nodeName =='field' || nodeName =='component' || nodeName =='grids_entry' || nodeName =='component_entry'){
				xml += tab + '</' + nodeName +'>\n';
				var nextNodeName = $.trim(node.next().children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"");
				if(nodeName == 'field' && nextNodeName != 'field')
					xml += '			</fields>\n';
				if(nodeName == 'component' && nextNodeName != 'component')
					xml += '			</components>\n		</import_connection>\n'
				if(nodeName == 'component_entry' && nextNodeName != 'component_entry')
					xml += '	</component_full_names_set>\n';
			}
        });
		xml += '</component_full_names_sets>\n</root>';
		
		saveTextAs(xml,fileName);
		window.location.reload();
	}
	function writeRemapping(){
	
	}

	
	$('#submit-btn').bind({
		click:function(){
			
			if($('#fileName').val() == "")
			{
				alert("The file name must be NotNULL !");
				return;
			}
			var xml_type = $('#fileTypeInput').val();
			if(xml_type == 'coupling_connections.xml')
				writeInterface();
		},
	});
})
