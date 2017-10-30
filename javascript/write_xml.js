// JavaScript Document

//top的事件
$(function(){
	
	var interfaceNextNode = $($('#xml_interface').children('#xmlNode').get(0));
	var isValid = true;
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
	if(nodeName == 'local_import_interfaces'){}
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
			isValid = false;
			return;
		}
	}
	else if(nodeName == 'component'){
		if(parentNode != 'components'){
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
	var node = $($('#xml_interface').children('#xmlNode').get(3));
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
	while($.trim(node.children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"").replace(/[	]/g,"") != 'entry'){
		temp = node.next();
		node.remove();
		node = temp;
	}
}
function getNodes(node,length,index){
	if($.trim(interfaceNextNode.children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"").replace(/[	]/g,"") == 'entry'){
		return;
	}
	var nodeName = node.nodeName;
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
	}
	var length = $(node).children().length;
	$(node).children().each(function(index, element) {
        getNodes($(node).children().get(index),length,index);
    });
}
function checkFile(root){
	$(root).children().each(function(index, element) {
		var nodeName = $(root).children().get(index).nodeName;
        if(nodeName == 'local_import_interfaces'){
			is_valid($(root).children().get(index),0,1,'root');	
		}
		else if(nodeName == 'component_grid_redirection_configuration'){
			
		}
		else if(nodeName == 'component_interface_tags'){
			
		}
		else{
			alert("A wrong node '" + nodeName + "' in upload file， please check the file !");
		}
    });
}
function uploadFile(root){
	$(root).children().each(function(index, element) {
        if($(root).children().get(index).nodeName == 'local_import_interfaces'){
			$('#fileTypeSelectButton').click();
			$($('#fileTypeMenu').children('ul').children('li').get(0)).click();
			getNodes($(root).children().get(index),1,0);
		}
		if($(root).children().get(index).nodeName == 'component_grid_redirection_configuration'){
			var grid_entry = $($(root).children().get(index)).children().get(0);
			$('#grid_entry').next().children('div').children('input').val($(grid_entry).attr('local_grid_name'));
			$('#grid_entry').next().next().children('div').children('input').val($(grid_entry).attr('another_comp_full_name'));
			$('#grid_entry').next().next().next().children('div').children('input').val($(grid_entry).attr('another_comp_grid_name'));
		}
		if($(root).children().get(index).nodeName == 'component_interface_tags'){
			var grid_entry = $($(root).children().get(index)).children().get(0);
			$('#interface_entry').next().children('div').children('input').val($(grid_entry).attr('status'));
			$('#interface_entry').next().next().children('div').children('input').val($(grid_entry).attr('interface_tag'));
			$('#interface_entry').next().next().next().children('div').children('input').val($(grid_entry).attr('comp_full_name'));
			$('#interface_entry').next().next().next().next().children('div').children('input').val($(grid_entry).attr('interface_name'));
		}
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
	if($(xml).find('root').length == 0 ){
		alert("The file has no 'root' node, Please check! ");
		return ;
	}
	checkFile($(xml).find('root').get(0))
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
			if($(this).parent().parent().parent().parent().attr('id')=='xml_interface' != 'xml_interface')
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
		var xml = '<?xml version="1.0" encoding="utf-8"?>\n<root>\n<local_import_interfaces>\n';
		$('#xml_interface').children('#xmlNode').each(function() {
			
            var nodeName = $.trim($(this).children('span').text());
			var node = $(this);
			var configName = $.trim(node.children('label').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"");
			if((nodeName == 'import_interface' && node.prev('div').length != 0) ){
				xml += '	</import_interface>\n';
			}
			if(configName == 'component_grid_redirection_configuration'){
				xml += '	</import_interface>\n</local_import_interfaces>\n<'+ configName + '>\n';
			}
			if(configName == 'component_interface_tags'){
				xml += '	</entry>\n</component_grid_redirection_configuration>\n<' + configName + '>\n';
			}
			var tab= '';
			if(nodeName == 'import_interface') tab='	';
			if(nodeName == 'import_connection') tab='		';
			if(nodeName == 'fields' || nodeName == 'components') tab='			';
			if(nodeName == 'field' || nodeName == 'component') tab='				';
			if(nodeName == 'entry') tab = '	';
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
			if(nodeName =='field' || nodeName =='component'){
				xml += '				</' + nodeName +'>\n';
				if(nodeName == 'field' && node.next().children('span').text() != 'field')
					xml += '			</fields>\n';
					if(nodeName == 'component' && node.next().children('span').text() != 'component')
					xml += '			</components>\n		</import_connection>\n'
			}
        });
		xml += '	</entry>\n</component_interface_tags>\n</root>';
		
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
