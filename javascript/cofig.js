// JavaScript Document

//topform的事件
$(function(){
	var input = $('#fileTypeSelectButton').prev();
$('#fileTypeSelectButton').bind({
	click:function(){
		input.css("border-color","#25AAE1");
		if($(this).next('ul').length == 0){
			$(this).after(
			'<ul id="fileTypeMenu" class="dropdownMenu undisplay"><ul class="menu">'
        	+ '<li class="menuLi"><a href="JavaScript:void(0)" class="menuItem"><span>coupling_connections.xml</span></a></li>'
            + '<li class="menuLi"><a href="JavaScript:void(0)" class="menuItem"><span>remapping_configuration.xml</span></a></li>'
            + '</ul></ul>')
		}
		if($(this).next().hasClass("undisplay")){
			$(this).next().removeClass("undisplay");
		}else{
			$(this).next().addClass("undisplay");
		}
		$('#fileTypeMenu>ul>li').bind({
		click:function(){
			$fileType = $.trim($(this).text());
			input.val($fileType);
			input.trigger('change');
			if($fileType == 'coupling_connections.xml'){
				if($('#xml_interface').hasClass('undisplay'))
					$('#xml_interface').removeClass('undisplay')
				if(!$('#xml_remapping').hasClass('undisplay'))
					$('#xml_remapping').addClass('undisplay')
			}
			if($fileType == 'remapping_configuration.xml'){
				if($('#xml_remapping').hasClass('undisplay'))
					$('#xml_remapping').removeClass('undisplay')
				if(!$('#xml_interface').hasClass('undisplay'))
					$('#xml_interface').addClass('undisplay')
			}
			if($('#fileTypeMenu').hasClass("undisplay")){
				$('#fileTypeMenu').removeClass("undisplay");
			}else{
				$('#fileTypeMenu').addClass("undisplay");
			}
		},
		mouseover:function(){
			$(this).css({"background-color":"#25AAE1"});
		},
		mouseout:function(){
			$(this).css({"background-color":"#fff"});
		}	
		})
		$('a').bind({
			mouseover:function(){$(this).css({"color":"#fff"});},
			mouseout:function(){$(this).css({"color":"#000"});},	
		})
		
	},
	mouseover:function(){
		$(this).prev().css("border-color","#25AAE1");
		$(this).css("border-color","#25AAE1");	
	},
	mouseout:function(){
		$(this).prev().css("border-color","#ccc");
		$(this).css("border-color","#ccc");	
	}
});

$('#fileTypeInput').bind({
	click:function(){
		$(this).next().css("border-color","#25AAE1");
		$(this).next().click();
	},
	mouseout:function(){
			$(this).css("border-color","#ccc");
			$(this).next().css("border-color","#ccc");
	},
	change:function(){
		if($('#save_name').hasClass('undisplay'))
			$('#save_name').removeClass('undisplay');
		if($('#form_operation').hasClass('undisplay'))
			$('#form_operation').removeClass('undisplay');
	},
});
})

//buttomform的事件

$(function(){
	$('.xmlNode').bind({
		mouseover:function(){
			var edit = $($(this).children('div').get(0)).children();
			if(edit.parent().hasClass('xmlEdit') && edit.hasClass('undisplay'))
				edit.removeClass('undisplay');
		},
		mouseout:function(){
			var edit = $($(this).children('div').get(0)).children();
			if(edit.parent().hasClass('xmlEdit') && !edit.hasClass('undisplay'))
				edit.addClass('undisplay');
		}
	})
	function fold(node){
		if(node.children('span').children('.unfold').hasClass('undisplay')){
			node.children('span').children('.unfold').removeClass('undisplay');
			node.children('span').children('.fold').addClass('undisplay');
				
		}
		else{
			node.children('span').children('.unfold').addClass('undisplay');
			node.children('span').children('.fold').removeClass('undisplay');
		}
	};
	function getIsFold(node){
		if(node.children('span').children('.unfold').hasClass('undisplay')){
			return true;
		}
		else{
			return false;
		}
	};
	function foldFields(nextNode,isFold){
		while($.trim(nextNode.children('span').text()) != 'components'){
			if(isFold && !nextNode.hasClass('undisplay'))
				nextNode.addClass('undisplay');
			if(!isFold && nextNode.hasClass('undisplay'))
				nextNode.removeClass('undisplay');
			nextNode = nextNode.next()
		}
	};
	function foldComponents(nextNode,isFold){
		while($.trim(nextNode.children('span').text()) != 'import_connection' && !nextNode.hasClass('nodeSplit')){
			if(isFold && !nextNode.hasClass('undisplay'))
				nextNode.addClass('undisplay');
			if(!isFold && nextNode.hasClass('undisplay'))
				nextNode.removeClass('undisplay');
			nextNode = nextNode.next();
		}
	};
	function foldDirection(nextNode,isFold){
		while($.trim(nextNode.children('span').text()) != 'import_connection' && !nextNode.hasClass('nodeSplit')){			
			if(!isFold){
				if($.trim(nextNode.children('span').text()) == 'fields' && nextNode.hasClass('undisplay')){
					nextNode.removeClass('undisplay');
					foldFields(nextNode.next(),getIsFold(nextNode.children('span')));
				}
				if($.trim(nextNode.children('span').text()) == 'components' && nextNode.hasClass('undisplay')){
					nextNode.removeClass('undisplay');
					foldComponents(nextNode.next(),getIsFold(nextNode.children('span')));
				}
			}
			else{
				if(!nextNode.hasClass('undisplay')){
					nextNode.addClass('undisplay');
				}
			}
			nextNode = nextNode.next();
		}
	};
	function foldInterface(nextNode,isFold){
		while($.trim(nextNode.children('span').text()) != 'import_interface' && !nextNode.hasClass('nodeSplit')){
			if(!isFold){
				if($.trim(nextNode.children('span').text()) == 'import_connection' && nextNode.hasClass('undisplay')){
					nextNode.removeClass('undisplay');
					foldDirection(nextNode.next(),getIsFold(nextNode.children('span')));
				}
			}
			else{
				if(!nextNode.hasClass('undisplay')){
					nextNode.addClass('undisplay');
				}
			}
			nextNode = nextNode.next();
			
		}
	};
	function foldInterfaces(nextNode,isFold){
		while(!nextNode.hasClass('nodeSplit') && $.trim(nextNode.next().children('span').text()) != 'local_grids' ){
			if(!isFold){
				if($.trim(nextNode.children('span').text()) == 'import_interface' && nextNode.hasClass('undisplay')){
					nextNode.removeClass('undisplay');
					foldInterface(nextNode.next(),getIsFold(nextNode.children('span')));
				}
			}
			else{
				if(!nextNode.hasClass('undisplay')){
					nextNode.addClass('undisplay');
				}
			}
			nextNode = nextNode.next();
			
		}
	};
	function foldGrids(nextNode,isFold){
		while(!nextNode.hasClass('nodeSplit')){
			if(isFold && !nextNode.hasClass('undisplay'))
				nextNode.addClass('undisplay');
			if(!isFold && nextNode.hasClass('undisplay'))
				nextNode.removeClass('undisplay');
			nextNode = nextNode.next()
		}
	};
	function foldCompSet(nextNode,isFold){
		while($.trim(nextNode.children('span').text()) == 'component_entry'){
			if(isFold && !nextNode.hasClass('undisplay'))
				nextNode.addClass('undisplay');
			if(!isFold && nextNode.hasClass('undisplay'))
				nextNode.removeClass('undisplay');
			nextNode = nextNode.next()
		}
	};
	function foldCompSets(nextNode,isFold){
		while($.trim(nextNode.children('span').text()) == 'component_full_names_set' || $.trim(nextNode.children('span').text()) == 'component_entry'){			
			if(!isFold){
				if($.trim(nextNode.children('span').text()) == 'component_full_names_set' && nextNode.hasClass('undisplay')){
					nextNode.removeClass('undisplay');
					foldCompSet(nextNode.next(),getIsFold(nextNode.children('span')));
				}
			}
			else{
				if(!nextNode.hasClass('undisplay')){
					nextNode.addClass('undisplay');
				}
			}
			nextNode = nextNode.next();
		}
	};
	function foldRemappingFields(nextNode,isFold){
		while(!nextNode.hasClass('nodeSplit')){
			if(isFold && !nextNode.hasClass('undisplay'))
				nextNode.addClass('undisplay');
			if(!isFold && nextNode.hasClass('undisplay'))
				nextNode.removeClass('undisplay');
			nextNode = nextNode.next();
		}
	};
	function foldVAlgo(nextNode,isFold){
		while($.trim(nextNode.children('span').text()) == 'parameter'){
			if(isFold && !nextNode.hasClass('undisplay'))
				nextNode.addClass('undisplay');
			if(!isFold && nextNode.hasClass('undisplay'))
				nextNode.removeClass('undisplay');
			nextNode = nextNode.next();
		}
	};
	function foldHAlgo(nextNode,isFold){
		while($.trim(nextNode.children('span').text()) == 'parameter'){
			if(isFold && !nextNode.hasClass('undisplay'))
				nextNode.addClass('undisplay');
			if(!isFold && nextNode.hasClass('undisplay'))
				nextNode.removeClass('undisplay');
			nextNode = nextNode.next();
		}
	};
	function foldHWeights(nextNode,isFold){
		while($.trim(nextNode.children('span').text()) == 'file'){
			if(isFold && !nextNode.hasClass('undisplay'))
				nextNode.addClass('undisplay');
			if(!isFold && nextNode.hasClass('undisplay'))
				nextNode.removeClass('undisplay');
			nextNode = nextNode.next();
		}
	};
	function foldRemappingAlgo(nextNode,isFold){
		while($.trim(nextNode.children('span').text()) != 'remapping_fields'){
			if(!isFold){
				if($.trim(nextNode.children('span').text()) == 'H2D_algorithm' && nextNode.hasClass('undisplay')){
					nextNode.removeClass('undisplay');
					foldHAlgo(nextNode.next(),getIsFold(nextNode.children('span')));
				}
				if($.trim(nextNode.children('span').text()) == 'V1D_algorithm' && nextNode.hasClass('undisplay')){
					nextNode.removeClass('undisplay');
					foldVAlgo(nextNode.next(),getIsFold(nextNode.children('span')));
				}
				if($.trim(nextNode.children('span').text()) == 'H2D_weights' && nextNode.hasClass('undisplay')){
					nextNode.removeClass('undisplay');
					foldHWeights(nextNode.next(),getIsFold(nextNode.children('span')));
				}
			}
			else{
				if(!nextNode.hasClass('undisplay')){
					nextNode.addClass('undisplay');
				}
			}
			nextNode = nextNode.next();
		}
	};
	function foldRemappingSetting(nextNode,isFold){
		while(!nextNode.hasClass('nodeSplit')){
			if(!isFold){
				if($.trim(nextNode.children('span').text()) == 'remapping_algorithms' && nextNode.hasClass('undisplay')){
					nextNode.removeClass('undisplay');
					foldRemappingAlgo(nextNode.next(),getIsFold(nextNode.children('span')));
				}
				if($.trim(nextNode.children('span').text()) == 'remapping_fields' && nextNode.hasClass('undisplay')){
					nextNode.removeClass('undisplay');
					foldRemappingFields(nextNode.next(),getIsFold(nextNode.children('span')));
				}
			}
			else{
				if(!nextNode.hasClass('undisplay')){
					nextNode.addClass('undisplay');
				}
			}
			nextNode = nextNode.next();
		}
	};
	
	$('[id = xmlItem]').bind({
		click:function(){
			var nodeName = $.trim($(this).text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"");
			fold($(this));
			var nextNode = $(this).parent().next();
			
			if(nodeName == 'fields'){
				foldFields(nextNode,getIsFold($(this)));
			}
			if(nodeName == 'components'){
				foldComponents(nextNode,getIsFold($(this)));
			}
			if(nodeName == 'import_connection'){
				foldDirection(nextNode,getIsFold($(this)));
			}
			if(nodeName == 'import_interface'){
				foldInterface(nextNode,getIsFold($(this)));
			}
			if(nodeName == 'local_import_interfaces'){
				foldInterfaces(nextNode,getIsFold($(this)));
			}
			if(nodeName == 'local_grids'){
				foldGrids(nextNode,getIsFold($(this)));
			}
			if(nodeName == 'component_full_names_set'){
				foldCompSet(nextNode,getIsFold($(this)));
			}
			if(nodeName == 'component_full_names_sets'){
				foldCompSets(nextNode,getIsFold($(this)));
			}
			if(nodeName == 'remapping_fields'){
				foldRemappingFields(nextNode,getIsFold($(this)));
			}
			if(nodeName == 'H2D_algorithm'){
				foldHAlgo(nextNode,getIsFold($(this)));
			}
			if(nodeName == 'V1D_algorithm'){
				foldVAlgo(nextNode,getIsFold($(this)));
			}
			if(nodeName == 'H2D_weights'){
				foldHWeights(nextNode,getIsFold($(this)));
			}
			if(nodeName == 'remapping_algorithms'){
				foldRemappingAlgo(nextNode,getIsFold($(this)));
			}
			if(nodeName == 'remapping_setting'){
				foldRemappingSetting(nextNode,getIsFold($(this)));
			}
		},
	})
	$('[id = add]').bind({
		click:function(){
			var nodeName = $.trim($(this).parent().parent().prev('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"");
			var interface, redirection, fields, components, grid_entry, componen_set, component_entry, lastNode,
			remapping_setting,remapping_algorithms,H2D_algorithm,V1d_algorithm,H2D_weights,remapping_fields,Hparameter,Vparameter,file;
			lastNode = $('#xml_interface').children('div:last-child').prev();
			var interface_last;
			var interRedirection = lastNode;
			var currentNode = $(this).parent().parent().parent();
			var next_node = $(this).parent().parent().parent().next();
			var next_node_name = $.trim(next_node.children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"");
			$('[id = xmlNode]').each(function() {
				var name = $.trim($(this).children('span').text());
                if(name == 'import_interface'){
					interface = $(this).clone(true);
					$(interface.children('div').get(1)).children('div').children().val("");
					$(interface.children('div').get(2)).children('div').children().val("");
				}
				if(name == 'import_connection'){
					redirection = $(this).clone(true);
					$(redirection.children('div').get(1)).children('div').children().val("");
				}
				if(name == 'fields'){
					fields = $(this).clone(true);
					$(fields.children('div').get(0)).children('div').children().val("");
					if($(fields.children('div').get(1)).hasClass('undisplay'))
						$(fields.children('div').get(1)).removeClass('undisplay');
					$(fields.children('div').get(1)).children('div').children().val("");
					
				}
				if(name == 'components'){
					components = $(this).clone(true);
					$(components.children('div').get(0)).children('div').children().val("");
					if($(components.children('div').get(1)).hasClass('undisplay'))
						$(components.children('div').get(1)).removeClass('undisplay');
					$(components.children('div').get(1)).children('div').children().val("");
				} 
				if(name == 'local_grids'){
					interface_last = $(this).prev().prev();
					grid_entry = $(this).next().clone(true);
					$(grid_entry.children('div').get(1)).children('div').children().val("");
					$(grid_entry.children('div').get(2)).children('div').children().val("");
					$(grid_entry.children('div').get(3)).children('div').children().val("");
				}
				if(name == 'component_full_names_set'){
					component_set = $(this).clone(true);
					$(component_set.children('div').get(1)).children('div').children().val("");
					$(component_set.children('div').get(2)).children('div').children().val("");
					component_entry = $(this).next().clone(true);
					$(component_entry.children('div').get(1)).children('div').children().val("");
				}
				
				if(name == 'remapping_setting'){
					remapping_setting = $(this).clone(true);
					$(remapping_setting.children('div').get(1)).children('div').children().val("");
				}
				if(name == 'remapping_algorithms'){
					remapping_algorithms = $(this).clone(true);
					$(remapping_algorithms.children('div').get(0)).children('div').children().val("");
				}
				if(name == 'H2D_algorithm'){
					H2D_algorithm = $(this).clone(true);
					$(H2D_algorithm.children('div').get(0)).children('div').children().val("");
					$(H2D_algorithm.children('div').get(1)).children('div').children().val("");
				}
				if(name == 'parameter'){
					Hparameter = $(this).clone(true);
					$(Hparameter.children('div').get(1)).children('div').children().val("");
					$(Hparameter.children('div').get(2)).children('div').children().val("");
					Vparameter = $(this).clone(true);
					$(Vparameter.children('div').get(1)).children('div').children().val("");
					$(Vparameter.children('div').get(2)).children('div').children().val("");
				}
				if(name == 'V1D_algorithm'){
					V1D_algorithm = $(this).clone(true);
					$(V1D_algorithm.children('div').get(0)).children('div').children().val("");
					$(V1D_algorithm.children('div').get(1)).children('div').children().val("");
				}
				if(name == 'H2D_weights'){
					H2D_weights = $(this).clone(true);
					$(H2D_weights.children('div').get(0)).children('div').children().val("");
				}
				if(name == 'file'){
					file = $(this).clone(true);
					$(file.children('div').get(1)).children('div').children().val("");
				}
				if(name == 'remapping_fields'){
					remapping_fields = $(this).clone(true);
					$(remapping_fields.children('div').get(1)).children('div').children().val("");
					$(remapping_fields.children('div').get(2)).children('div').children().val("");
				}
				
            });
			if(nodeName == 'import_interface'){
				interface_last.after(components);
				interface_last.after(fields);
				interface_last.after(redirection);
				interface_last.after(interface);
				interface_last.after('<div class="nodeSplit"></div>')
			}
			var temp = currentNode;
			while(temp.next().length != 0 && !temp.next().hasClass('nodeSplit')){
				temp = temp.next();
			}
			if(temp.next().hasClass('nodeSplit')){
				interRedirection = temp;
			}
			if(nodeName == 'import_connection'){
				interRedirection.after(components);
				interRedirection.after(fields);
				interRedirection.after(redirection);
			}
			if(nodeName == 'component_full_names_set'){
				lastNode.after(component_entry);
				lastNode.after(component_set);
			}
			if(nodeName == 'component_entry'){
				currentNode.after(component_entry);
			}
			if(nodeName == 'grids_entry'){
				currentNode.after(grid_entry);
			}
			if(nodeName == 'parameter'){
				currentNode.after(Hparameter);
			}
			if(nodeName == 'file'){
				currentNode.after(file);
			}
			if(nodeName == 'remapping_setting'){
				$('#xml_remapping').children('div:last-child').after(remapping_setting);
				$('#xml_remapping').children('div:last-child').after(remapping_algorithms);
				$('#xml_remapping').children('div:last-child').after(H2D_algorithm);
				$('#xml_remapping').children('div:last-child').after(Hparameter);
				$('#xml_remapping').children('div:last-child').after(V1D_algorithm);
				$('#xml_remapping').children('div:last-child').after(Vparameter);
				$('#xml_remapping').children('div:last-child').after(H2D_weights);
				$('#xml_remapping').children('div:last-child').after(file);
				$('#xml_remapping').children('div:last-child').after(remapping_fields);
				$('#xml_remapping').children('div:last-child').after('<div class="nodeSplit"></div>')
			}
		}
	})
	$('[id=del]').bind({
		click:function(){
			var nodeName = $.trim($(this).parent().parent().prev('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"");
			var currentNode = $(this).parent().parent().parent();
			var count = 0;
			$('[id = xmlNode]').each(function() {
                if($.trim($(this).children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"") == nodeName){
					count += 1;
				}
            });
			var is_del = false;
			if((nodeName=='import_connection' && $.trim(currentNode.prev().children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"") != 'import_interface') || (nodeName=='import_interface' && count > 1)){
				is_del = true;
				
			}
			if(nodeName == 'import_connection' && $.trim(currentNode.prev().children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"") == 'import_interface'){
				var temp = currentNode.next();
				while($.trim(temp.children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"") != 'import_connection' && !temp.hasClass('nodeSplit')){
					temp = temp.next()
				}
				if($.trim(temp.children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"") == 'import_connection')
					is_del = true;
			}
			if(nodeName == 'component_full_names_set' && count > 1)
				is_del = true;
			if(is_del){
				var nextNode = currentNode.next();
				var temp;
				currentNode.remove();
				while($.trim(nextNode.children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"") != "" && $.trim(nextNode.children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"") != nodeName && !nextNode.hasClass('nodeSplit')){
					temp = nextNode;
					nextNode = nextNode.next();
					temp.remove()
				}
			}
			if(nodeName == 'import_interface' && nextNode.hasClass('nodeSplit')){
				nextNode.remove();
			}
			if(nodeName == 'grids_entry' && count > 1){
				currentNode.remove();
			}
			if(nodeName == 'component_entry'){
				var prevNode = $.trim(currentNode.prev().children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"");
				var nextNode = $.trim(currentNode.next().children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"");
				if(prevNode == nodeName || nextNode == nodeName)
					currentNode.remove();
			}
			if(nodeName == 'file' && count > 1){
				currentNode.remove();
			}
			if(nodeName == 'parameter'){
				var prevNode = $.trim(currentNode.prev().children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"");
				var nextNode = $.trim(currentNode.next().children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"");
				if(prevNode == nodeName || nextNode == nodeName)
					currentNode.remove();
			}
			if(nodeName == 'remapping_setting' && count > 1){
				var nextNode = currentNode.next();
				var temp;
				currentNode.remove();
				while(!nextNode.hasClass('nodeSplit')){
					temp = nextNode;
					nextNode = nextNode.next();
					temp.remove()
				}
				nextNode.remove();
			}
			
		},
	})
	$('[id=statusSelectButton]').bind({
		click:function(){
			$(this).prev().css("border-color","#25AAE1");
			if($(this).next('ul').length == 0){
			$(this).after(
			'<ul class="xmlDropdownMenu undisplay"><ul class="menu">'
             + '<li id="on" class="menuLi"><a href="JavaScript:void(0)" onclick="" class="menuItem"><span>on</span></a></li>'
			 + '<li id="off" class="menuLi"><a href="JavaScript:void(0)" onclick="" class="menuItem"><span>off</span></a></li>'
			 + '</ul></ul>')
			}
			var selectMenu = $(this).next();
			if(selectMenu.hasClass("undisplay")){
				selectMenu.removeClass("undisplay");
			}else{
				selectMenu.addClass("undisplay");
			}
			var input = $(this).prev();
			selectMenu.children('ul').children('li').bind({
			click:function(){
			$text = $.trim($(this).text());
			$(this).parent().parent().prev().prev().val($text);
			//input.attr('placeholder','');
			if(selectMenu.hasClass("undisplay")){
				selectMenu.removeClass("undisplay");
			}else{
				selectMenu.addClass("undisplay");
			}
			/*when status is off ,the field default is display
			var defaultNode = $(this).parent().parent().parent().parent().next();
			var childNode = $(this).parent().parent().parent().parent().parent().next();
			if($text == "off"){
				if(defaultNode.length != 0 && $.trim(defaultNode.children('label').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"")=='*default')
				{
					if(!defaultNode.hasClass('undisplay'))
						defaultNode.addClass('undisplay');
				}
				if($.trim($(this).parent().parent().parent().parent().prev('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"") == 'fields'){
				while($.trim(childNode.children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"") != 'components'){
					if(!childNode.hasClass('undisplay'))
						childNode.addClass('undisplay')
					childNode = childNode.next();
				}}
				if($.trim($(this).parent().parent().parent().parent().prev('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"") == 'components'){
				while(!childNode.hasClass('nodeSplit')){
					if(!childNode.hasClass('undisplay'))
						childNode.addClass('undisplay')
					childNode = childNode.next();
				}}
			}else{
				if(defaultNode.length != 0 && $.trim(defaultNode.children('label').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"")=='*default'){
					if(defaultNode.hasClass('undisplay'))
						defaultNode.removeClass('undisplay');
				}
				if($.trim($(this).parent().parent().parent().parent().prev('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"") == 'fields' && isFieldsFold == false){
				while($.trim(childNode.children('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"") != 'components'){
					if(childNode.hasClass('undisplay'))
						childNode.removeClass('undisplay')
					childNode = childNode.next();
				}}
				if($.trim($(this).parent().parent().parent().parent().prev('span').text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"") == 'components' && isCompFold == false){
				while(!childNode.hasClass('nodeSplit')){
					if(childNode.hasClass('undisplay'))
						childNode.removeClass('undisplay')
					childNode = childNode.next();
				}}
			}*/
			},
			mouseover:function(){
				$(this).css({"background-color":"#25AAE1"});
			},
			mouseout:function(){
				$(this).css({"background-color":"#fff"});
			}	
			})
			$('a').bind({
				mouseover:function(){$(this).css({"color":"#fff"});},
				mouseout:function(){$(this).css({"color":"#000"});},	
			})
		},
		mouseover:function(){
			$(this).prev().css("border-color","#25AAE1");
			$(this).css("border-color","#25AAE1");	
		},
		mouseout:function(){
			$(this).prev().css("border-color","#ccc");
			$(this).css("border-color","#ccc");	
		}
	});
	
	$('[id=defaultSelectButton]').bind({
		click:function(){
			var xmlnode = $(this).parent().parent().parent();
			var nodeText = $.trim(xmlnode.children('span').text());
			$(this).prev().css("border-color","#25AAE1");
			if($(this).next('ul').length == 0){
			$(this).after(
			'<ul class="xmlDropdownMenu undisplay"><ul class="menu defaultMenu">'
             + '<li id="all" class="menuLi"><a href="JavaScript:void(0)" onclick="" class="menuItem"><span>all</span></a></li>'
			 + '<li id="off" class="menuLi"><a href="JavaScript:void(0)" onclick="" class="menuItem"><span>off</span></a></li>'
			 + '<li id="remain" class="menuLi"><a href="JavaScript:void(0)" onclick="" class="menuItem"><span>remain</span></a></li>'
			 + '</ul></ul>')
			}
			var selectMenu = $(this).next();
			if(selectMenu.hasClass("undisplay")){
				selectMenu.removeClass("undisplay");
			}else{
				selectMenu.addClass("undisplay");
			}
			var input = $(this).prev();
			selectMenu.children('ul').children('li').bind({
			click:function(){
			var dafault = $.trim($(this).text());
			$(this).parent().parent().prev().prev().val(dafault);
			//input.attr('placeholder','');
			if(selectMenu.hasClass("undisplay")){
				selectMenu.removeClass("undisplay");
			}else{
				selectMenu.addClass("undisplay");
			}
			
			if(dafault == 'off'){
				var fold = $(this).parent().parent().parent().parent().prev().prev().children('span').children('.fold');
				
				var childname;
				var name;
				if(nodeText == "fields"){
					childname = 'field';
					name = 'name';
					if(!fold.hasClass('undisplay')){					
						fold.addClass('undisplay');
						fold.prev().removeClass('undisplay');
					}
				}
				if(nodeText == "components"){
					childname = 'component';
					name = 'comp_full_name';
					if(!fold.hasClass('undisplay')){					
						fold.addClass('undisplay');
						fold.prev().removeClass('undisplay');
					}
				}
				if($.trim(xmlnode.next('div').children('span').text()) != "field" 
					&& $.trim(xmlnode.next('div').children('span').text()) != "component"){
				var afterNode ='<div  id="xmlNode" class="xmlNode">'
				+ '<span class="xmlItemEdit" style="padding-left:112px;">'+childname+'</span>'
				+ '<div class="xmlEdit"><div class="undisplay">'
                + '<button id="'+ childname + 'add" type="button" class="xmlEditButton">+</button>'
                + '<button id="'+ childname + 'del" type="button" class="xmlEditButton">-</button></div></div>'
				+ '<div class="xmlSpan"><label for="nameInput" class="control-label"><font color="red">*</font>'+ name +'</label>'
				+ '<div class="xmlText">'
				+ '<input type="text" id="nameInput" name="nameInput" class="xmlInput form-control"'
				+ ' placeholder="input the node name" autocomplete="off"/></div></div>';
				if(nodeText == 'components'){
					afterNode += '<div class="xmlSpan"><label for="nameInput" class="control-label"><font color="red">*</font>interface_name</label>'
				+ '<div class="xmlText">'
				+ '<input type="text" id="nameInput" name="nameInput" class="xmlInput form-control"'
				+ ' placeholder="input the node name" autocomplete="off"/></div></div>';
				}
				afterNode += '</div>';
				xmlnode.after(afterNode);
				$('.xmlNode').bind({
					mouseover:function(){
						var edit = $($(this).children('div').get(0)).children();
						if(edit.parent().hasClass('xmlEdit') && edit.hasClass('undisplay'))
							edit.removeClass('undisplay');
					},
					mouseout:function(){
						var edit = $($(this).children('div').get(0)).children();
						if(edit.parent().hasClass('xmlEdit') && !edit.hasClass('undisplay'))
							edit.addClass('undisplay');
					}
				})
				
				$('#'+ childname + 'add').bind({
					click:function(){
						var addNode = $(this).parent().parent().parent();
						var cloneNode = addNode.clone(true)
						$(cloneNode.children('div').get(1)).children('div').children().val("");
						addNode.after(cloneNode);
					},	
				}) 
				
				$('#' + childname + 'del').bind({
					click:function(e){
						var delNode = $(this).parent().parent().parent();
						if(
						delNode.next().children('span').text() == 'field'
						||delNode.prev().children('span').text() == 'field' 
						||delNode.next().children('span').text() == 'component'
						||delNode.prev().children('span').text() == 'component')
							delNode.remove();
						else{
							alert("Can't Delete! (when the "+ childname +"s dafault is 'off', '"+childname + "' must be filled in more than once)");
							e.preventDefault();
						}
					},	
				}) 
			}
			}else{
				while($.trim(xmlnode.next('div').children('span').text()) == "field" 
					|| $.trim(xmlnode.next('div').children('span').text()) == "component"){
						xmlnode.next().remove();
				}
			}
			},
			mouseover:function(){
				$(this).css({"background-color":"#25AAE1"});
			},
			mouseout:function(){
				$(this).css({"background-color":"#fff"});
			}	
			})
			$('a').bind({
				mouseover:function(){$(this).css({"color":"#fff"});},
				mouseout:function(){$(this).css({"color":"#000"});},	
			})
		},
		mouseover:function(){
			$(this).prev().css("border-color","#25AAE1");
			$(this).css("border-color","#25AAE1");	
		},
		mouseout:function(){
			$(this).prev().css("border-color","#ccc");
			$(this).css("border-color","#ccc");	
		}
	});
	$('[id = nameInput]').bind({
		click:function(){
			if($(this).hasClass('xmlSelectInput')){
			$(this).next().css("border-color","#25AAE1");
			var dropDownType = $.trim($(this).parent().prev('label').text()).substring(1).replace(/[\r\n]/g,"").replace(/[ ]/g,"");
			if(dropDownType == 'status'){
				$(this).next().click();
			}
			if(dropDownType == 'default'){
				$(this).next().click();
			}
			if(dropDownType == 'specification'){
				$(this).next().click();
			}
			}
		},
		mouseout:function(){
			$(this).css("border-color","#ccc");
			$(this).next().css("border-color","#ccc");
		},
		change:function(){
			var fieldName = $.trim($(this).parent().prev().text()).replace(/[\r\n]/g,"").replace(/[ ]/g,"");
			if(fieldName == "*status" && ($(this).val()!= 'on' && $(this).val()!= 'off')){
				alert("This field value just can be 'on' or 'off' !");
				$(this).val('');
			}
			if(fieldName == "*default" && ($(this).val()!= 'all' && $(this).val()!= 'off' && $(this).val()!= 'remain')){
				alert("This field value just can be 'all', 'off' or 'remain' !");
				$(this).val('');
			}
		},
	});
	$('[id = specSelectButton]').bind({
		click:function(){
			var xmlnode = $(this).parent().parent().parent();
			var nodeText = $.trim(xmlnode.children('span').text());
			$(this).prev().css("border-color","#25AAE1");
			if($(this).next('ul').length == 0){
			$(this).after(
			'<ul class="xmlDropdownMenu undisplay"><ul class="menu defaultMenu">'
             + '<li id="default" class="menuLi"><a href="JavaScript:void(0)" onclick="" class="menuItem"><span>default</span></a></li>'
			 + '<li id="type" class="menuLi"><a href="JavaScript:void(0)" onclick="" class="menuItem"><span>type</span></a></li>'
			 + '<li id="name" class="menuLi"><a href="JavaScript:void(0)" onclick="" class="menuItem"><span>name</span></a></li>'
			 + '</ul></ul>')
			}
			var selectMenu = $(this).next();
			if(selectMenu.hasClass("undisplay")){
				selectMenu.removeClass("undisplay");
			}else{
				selectMenu.addClass("undisplay");
			}
			var input = $(this).prev();
			selectMenu.children('ul').children('li').bind({
			click:function(){
			var specification = $.trim($(this).text());
			$(this).parent().parent().prev().prev().val(specification);
			//input.attr('placeholder','');
			if(selectMenu.hasClass("undisplay")){
				selectMenu.removeClass("undisplay");
			}else{
				selectMenu.addClass("undisplay");
			}
			
			if(specification == 'type' || specification == 'name'){
				var fold = $(this).parent().parent().parent().parent().prev().prev().children('span').children('.fold');
				
				var childname;
				var name;
				if(nodeText == "remapping_fields"){
					childname = 'entry';
					name = 'value';
					if(!fold.hasClass('undisplay')){					
						fold.addClass('undisplay');
						fold.prev().removeClass('undisplay');
					}
				}
				if($.trim(xmlnode.next('div').children('span').text()) != "entry"){
				var afterNode ='<div  id="xmlNode" class="xmlNode">'
				+ '<span class="xmlItemEdit" style="padding-left:56px;width:184px;">entry</span>'
				+ '<div class="xmlEdit"><div class="undisplay">'
                + '<button id="'+ childname + 'add" type="button" class="xmlEditButton">+</button>'
                + '<button id="'+ childname + 'del" type="button" class="xmlEditButton">-</button></div></div>'
				+ '<div class="xmlSpan"><label for="nameInput" class="control-label"><font color="red">*</font>value</label>'
				+ '<div class="xmlText">'
				+ '<input type="text" id="nameInput" name="nameInput" class="xmlInput form-control"'
				+ ' placeholder="input the node value" autocomplete="off"/></div></div></div>';
				xmlnode.after(afterNode);
				$('.xmlNode').bind({
					mouseover:function(){
						var edit = $($(this).children('div').get(0)).children();
						if(edit.parent().hasClass('xmlEdit') && edit.hasClass('undisplay'))
							edit.removeClass('undisplay');
					},
					mouseout:function(){
						var edit = $($(this).children('div').get(0)).children();
						if(edit.parent().hasClass('xmlEdit') && !edit.hasClass('undisplay'))
							edit.addClass('undisplay');
					}
				})
				
				$('#'+ childname + 'add').bind({
					click:function(){
						var addNode = $(this).parent().parent().parent();
						var cloneNode = addNode.clone(true)
						$(cloneNode.children('div').get(1)).children('div').children().val("");
						addNode.after(cloneNode);
					},	
				}) 

				
				$('#' + childname + 'del').bind({
					click:function(e){
						var delNode = $(this).parent().parent().parent();
						if(
						delNode.next().children('span').text() == 'entry'
						||delNode.prev().children('span').text() == 'entry')
							delNode.remove();
						else{
							alert("Can't Delete! (when the "+ childname +"s dafault is 'off', '"+childname + "' must be filled in more than once)");
							e.preventDefault();
						}
					},	
				}) 
			}
			}else{
				while($.trim(xmlnode.next('div').children('span').text()) == "entry"){
						xmlnode.next().remove();
				}
			}
			},
			mouseover:function(){
				$(this).css({"background-color":"#25AAE1"});
			},
			mouseout:function(){
				$(this).css({"background-color":"#fff"});
			}	
			})
			$('a').bind({
				mouseover:function(){$(this).css({"color":"#fff"});},
				mouseout:function(){$(this).css({"color":"#000"});},	
			})
		},
		mouseover:function(){
			$(this).prev().css("border-color","#25AAE1");
			$(this).css("border-color","#25AAE1");	
		},
		mouseout:function(){
			$(this).prev().css("border-color","#ccc");
			$(this).css("border-color","#ccc");	
		}
	});

})


