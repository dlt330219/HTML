// JavaScript Document
$(function(){
	$(document).bind("click",function(e){
		var e = e || window.event;
		var target = $(e.target) || $(e.srcElement);
		if($.trim(target.attr('id')).substring(0,8) != 'edgepath' 
			&& target.attr('id') != 'detail' && target.parent().attr('id') != 'detail'
			&& !target.hasClass('hovertable')
			&& !target.parent().hasClass('hovertable')
			&& !target.parent().hasClass('hovertable')
			&& !target.parent().parent().parent().hasClass('hovertable')){
			if(!$('#detail').hasClass("undisplay")){
				$('#detail').addClass('undisplay'); 
			}
		}
	})
var links = [];
var currentNode;
function connection(){

var nodes = {};

links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

var width = 800,
    height = 600;

var force = d3.layout.force()//layout将json格式转化为力学图可用的格式
    .nodes(d3.values(nodes))//设定节点数组
    .links(links)//设定连线数组
    .size([width, height])//作用域的大小
    .linkDistance(200)//连接线长度
    .charge(-1500)//顶点的电荷数。该参数决定是排斥还是吸引，数值越小越互相排斥
    .on("tick", tick)//指时间间隔，隔一段时间刷新一次画面
    .start();//开始转换
if($("#svg").length > 0){
	$("#svg").remove();
}
var svg = d3.select("body").append("svg")
	.attr("id","svg")
    .attr("width", width)
    .attr("height", height);

//箭头
var marker=
    svg.append("marker")
    //.attr("id", function(d) { return d; })
    .attr("id", "resolved")
    .attr("markerUnits","strokeWidth")//设置为strokeWidth箭头会随着线的粗细发生变化
    .attr("markerUnits","userSpaceOnUse")
    .attr("viewBox", "0 -5 10 10")//坐标系的区域
    .attr("refX",32)//箭头坐标
    .attr("refY", -1)
    .attr("markerWidth", 12)//标识的大小
    .attr("markerHeight", 12)
    .attr("orient", "auto")//绘制方向，可设定为：auto（自动确认方向）和 角度值
    .attr("stroke-width",4)//箭头宽度
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")//箭头的路径
    .attr('fill','#999')//箭头颜色
	;

//设置连接线    
var edges_line = svg.selectAll("edges_line")
    .data(force.links())
    .enter().append("path")
    .attr({
          'd': function(d) {return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y},
          'id':function(d,i) {return 'edgepath'+i;}})
    .style("stroke","#999")
    .style("stroke-width",1.0)//线条粗细
    .attr("marker-end", "url(#resolved)" )//根据箭头标记的id号标记箭头
	.on("click",function(d){
		showDetail(d.rela)
		/*
		var height = 400;
		var width = 600;
		var top = (window.screen.availHeight - 30 - height) / 2;
		var left = (window.screen.availWidth - 10 - width) / 2;
		window.open('detail.html?rela=' + d.rela,'interface detail', 'height='+ height +', width='+ width +',top='+ top  + ',left='+ left +', toolbar=no,location=no,scrollbars=yes');*/
	});
	/*
	//设置连接线上的文字
var edges_text = svg.append("g").selectAll(".edgelabel")
.data(force.links())
.enter()
.append("text")
.style("pointer-events", "none")
//.attr("class","linetext")
.attr({  'class':'edgelabel',
               'id':function(d,i){return 'edgepath'+i;},
               'dx':30,
               'dy':0,
               //'font-size':10,
               'fill-opacity':0.0
               });

//设置线条上的文字
edges_text.append('textPath')
.attr('xlink:href',function(d,i) {return '#edgepath'+i})
.text(function(d){return d.rela;})
.style("display","none");*/

//圆圈
var circle = svg.append("g").selectAll("circle")
    .data(force.nodes())//表示使用force.nodes数据
    .enter().append("circle")
    .style("fill",function(node){
		if(node.name == currentNode || node.name == currentNode)
			return "#e62f2d";
		return "#68ABE4";	
	})
    .style('stroke',function(node){
		if(node.name == currentNode || node == currentNode)
			return "#b7acac";
		return "#68ABE4";
	})
    .attr("r", 28)//设置圆圈半径
	
    .on("click",function(node){
        //单击时让连接线加粗
        edges_line.style("stroke-width",function(line){
            console.log(line);
            if(line.source.name == node.name || line.target.name == node.name){
                return 4;
            }else{
                return 0.5;
            }
        });
        //d3.select(this).style('stroke-width',2);
		edges_line.style("stroke",function(line){
			console.log(line);
            if(line.source.name==node.name ){
                return "#FF8000";
            }if(line.target.name==node.name){
                return "#9C0";
            }
			return "#999";
		})
    })
	/*
	.on("mouseover",function(node){
		edges_text.style("fill-opacity",function(line){
			if(line.source.name==node.name || line.target.name==node.name)
			return 1.0;
		})
	})
	.on("mouseout",function(node){
		edges_text.style("fill-opacity",function(line){
			if(line.source.name==node.name || line.target.name==node.name)
			return 0.0;
		})
	})*/
    .call(force.drag);//将当前选中的元素传到drag函数中，使顶点可以被拖动
    /*
     circle.append("text")  
    .attr("dy", ".35em")  
    .attr("text-anchor", "middle")//在圆圈内添加文字  
    .text(function(d) { 
        //console.log(d);
        return d.name; 
    }); */ 

  //圆圈的提示文字
  /*
  circle.append("svg:title")  
        .text(function(node) { 
            var link=links[node.index];
            if(node.name==link.source.name && link.rela=="主营产品"){
                return "双击可查看详情"
            }
         });  */
/* 矩形
var rect=svg.append("rect")
         .attr({"x":100,"y":100,
                "width":100,"height":50,
                "rx":5,//水平圆角
                "ry":10//竖直圆角
             })
          .style({
             "stroke":"red",
             "stroke-width":1,
             "fill":"yellow"
});*/
var text = svg.append("g").selectAll("text")
    .data(force.nodes())
    //返回缺失元素的占位对象（placeholder），指向绑定的数据中比选定元素集多出的一部分元素。
    .enter()
    .append("text")
    .attr("dy", ".35em")  
    .attr("text-anchor", "middle")//在圆圈中加上数据  
    .style('fill',"#333")
	.attr('x',function(d){
        // console.log(d.name+"---"+ d.name.length);
        var re_en = /[a-zA-Z]+/g;
        //如果是全英文，不换行
        if(d.name.match(re_en)){
             d3.select(this).append('tspan')
             .attr('x',0)
             .attr('y',2)
             .text(function(){return d.name;});
        }
        //如果小于四个字符，不换行
        else if(d.name.length<=4){
             d3.select(this).append('tspan')
            .attr('x',0)
            .attr('y',2)
            .text(function(){return d.name;});
        }else{
            var top=d.name.substring(0,4);
            var bot=d.name.substring(4,d.name.length);

            d3.select(this).text(function(){return '';});

            d3.select(this).append('tspan')
                .attr('x',0)
                .attr('y',-7)
                .text(function(){return top;});

            d3.select(this).append('tspan')
                .attr('x',0)
                .attr('y',10)
                .text(function(){return bot;});
        }
        //直接显示文字    
        /*.text(function(d) { 
        return d.name; */
    });

/*  将文字显示在圆圈的外面 
var text2 = svg.append("g").selectAll("text")
     .data(force.links())
    //返回缺失元素的占位对象（placeholder），指向绑定的数据中比选定元素集多出的一部分元素。
    .enter()
    .append("text")
    .attr("x", 150)//设置文字坐标
    .attr("y", ".50em")
    .text(function(d) { 
        //console.log(d);
        //return d.name; 
        //return d.rela;
        console.log(d);
        return  '1111';
    });*/
function tick() {
  //path.attr("d", linkArc);//连接线
  circle.attr("transform", transform1);//圆圈
  text.attr("transform", transform2);//顶点文字
  //edges_text.attr("transform", transform3);
  //text2.attr("d", linkArc);//连接线文字
  //console.log("text2...................");
  //console.log(text2);
  //edges_line.attr("x1",function(d){ return d.source.x; });
  //edges_line.attr("y1",function(d){ return d.source.y; });
  //edges_line.attr("x2",function(d){ return d.target.x; });
  //edges_line.attr("y2",function(d){ return d.target.y; });
    
  //edges_line.attr("x",function(d){ return (d.source.x + d.target.x) / 2 ; });
  //edges_line.attr("y",function(d){ return (d.source.y + d.target.y) / 2 ; });


  edges_line.attr('d', function(d) { 
      var path='M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y;
      return path;
  });  
  /*  
  //连接线上注释的位置
  edges_text.attr('transform',function(d,i){
        if (d.target.x<d.source.x){
            bbox = this.getBBox();
            rx = bbox.x+bbox.width/2;
            ry = bbox.y+bbox.height/2;
            return 'rotate(180 '+rx+' '+ry+')';
        }
        else {
            return 'rotate(0)';
        }
   });*/
}

//设置连接线的坐标,使用椭圆弧路径段双向编码
function linkArc(d) {
    //var dx = d.target.x - d.source.x,
  // dy = d.target.y - d.source.y,
     // dr = Math.sqrt(dx * dx + dy * dy);
  //return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
  //打点path格式是：Msource.x,source.yArr00,1target.x,target.y  
  
  return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y
}
//设置圆圈和文字的坐标
function transform1(d) {
  return "translate(" + d.x + "," + d.y + ")";
}
function transform2(d) {
      return "translate(" + (d.x) + "," + d.y + ")";
}
}
function showDetail(rela){
	$('#detail').children().each(function(index, element) {
        $(this).remove();
    });
	if($('#detail').hasClass("undisplay")){
		$('#detail').removeClass('undisplay'); 
	}
	$('#detail').append(rela);
	$('tr').bind({
		mouseover:function(){
			$(this).css({"background-color":"#ffff66"});
		},
		mouseout:function(){
			$(this).css({"background-color":"#d4e3e5"});
		}	
	});
}
var isValid = true;
function is_valid(node,index,length,parentNode){
	var nodeName = node.nodeName;
	if(nodeName == 'Component'){}
	else if(nodeName == 'import_interfaces' || nodeName == 'export_interfaces'){
		if(parentNode != 'Component'){
			alert("Parse failed! The parentNode of field '" + nodeName + "' must be the 'Component', not the '" + parentNode + "'!");
			isValid = false;
			return;
		}
		if(length != 1){
			alert("Parse failed! The field '" + nodeName + "' must be have only one, please check!");
			isValid = false;
			return;
		}
	}
	else if(nodeName == 'interface'){
		if(parentNode != 'import_interfaces' && parentNode != 'export_interfaces'){
			alert("Parse failed! The parentNode of field '" + nodeName + "' must be the 'import_interfaces' or the 'export_interfaces', not the '" + parentNode + "'!");
			isValid = false;
			return;
		}
		
	}
	else if(nodeName == 'fields'){
		if(parentNode != 'interface'){
			alert("Parse failed! The parentNode of field '" + nodeName + "' must be the 'interface', not the '" + parentNode + "'!");
			isValid = false;
			return;
		}
		
	}
	else if(nodeName == 'field'){
		if(parentNode != 'fields'){
			alert("Parse failed! The parentNode of field '" + nodeName + "' must be the 'fields', not the '" + parentNode + "'!");
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
function uploadFile(node,import_nodes,export_nodes){
	var comp_name = $(node).attr('name');
	currentNode = comp_name;
	$(import_nodes).children().each(function(index, element) {//import_interface
		var dst_interface = $(this).attr('interface_name');
		$(this).children().each(function(index, element) {//fields
			var rela = '';
			var fields_node_comp_name = $(this).attr('comp_full_name');
			var src_interface = $(this).attr('interface_name');
			var temp = '<tr><td>'+ src_interface +'</td><td>' + dst_interface +'</td><td>';
			rela += '<div class="tablename">imported by ' + comp_name + ' from ' + fields_node_comp_name + '</div><table class="hovertable"><tr><th>src interface name</th><th>dst interface name</th><th>field name</th></tr>';
			
			$(this).children().each(function(index, element) {
				if(index != 0)
					temp += ", ";
                temp += $(this).attr('name') + ' ';
            });
			temp += '</td></tr>'
			rela += temp;
			rela += '</table>';
			var has_link = false;
			for(var i = 0; i < links.length; i++){
				if($.trim(links[i]["source"]) == $.trim(fields_node_comp_name) && $.trim(links[i]["target"]) == $.trim(comp_name)){
					links[i]["rela"] = $.trim(links[i]["rela"]).substring(0,$.trim(links[i]["rela"]).length-8);
					links[i]["rela"] += temp;
					links[i]["rela"] += '</table>'
					//alert(links[i]["rela"])
					has_link = true;
					break;
				}
			}
			if(!has_link)
				links.push({source: fields_node_comp_name, target: comp_name, rela: rela});
        });
	});
	$(export_nodes).children().each(function(index, element) {
		var src_interface = $(this).attr('interface_name');
		$(this).children().each(function(index, element) {
			var rela = '';
            var fields_node_comp_name = $(this).attr('comp_full_name');
			var dst_interface = $(this).attr('interface_name');
			var temp = '<tr><td>'+ src_interface +'</td><td>' + dst_interface +'</td><td>';
			rela += '<div class="tablename">exported by ' + comp_name + ' to ' + fields_node_comp_name + '</div><table class="hovertable"><tr><th>src interface name</th><th>dst interface name</th><th>field name</th></tr>';
			$(this).children().each(function(index, element) {
				if(index != 0)
					temp += ", ";
                temp += $(this).attr('name') + ' ';
            });
			temp += '</td></tr>';
			rela += temp + '</table>';
			var has_link = false;
			for(var i = 0; i < links.length; i++){
				if($.trim(links[i]["target"]) == $.trim(fields_node_comp_name) && $.trim(links[i]["source"]) == $.trim(comp_name)){
					links[i]["rela"] = $.trim(links[i]["rela"]).substring(0,$.trim(links[i]["rela"]).length-8);
					links[i]["rela"] += temp;
					links[i]["rela"] += '</table>'
					//alert(links[i]["rela"])
					has_link = true;
					break;
				}
			}
			if(!has_link)
				links.push({source: comp_name, target: fields_node_comp_name, rela: rela});
				
			var link1 = '',link2 = '',a = 0,b = 0,flag = false;
			for(var i = 0; i < links.length; i++){
				if($.trim(links[i]["source"]) == $.trim(comp_name) && $.trim(links[i]["target"]) == $.trim(fields_node_comp_name)){
					link1 = links[i]["rela"]
					a = i;
				}
				if($.trim(links[i]["source"]) == $.trim(fields_node_comp_name) && $.trim(links[i]["target"]) == $.trim(comp_name)){
					link2 = links[i]["rela"];
					b = i;
					flag = true;
				}
			}
			if(flag && !has_link){
				links[a]["rela"] = link2 + link1;
				links[b]["rela"] = link2 + link1;
			} 
			if(flag && has_link){
				links[b]["rela"] = links[a]["rela"]
			}
        });
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
	//init links
	var length = links.length;
	for (var i = 0; i < length; i++) {
		links.pop();
    }
	
	if($(xml).find('Component').length == 0 ){
		alert("The file must have one root node 'Component', Please check! ");
		return ;
	}
	is_valid($(xml).find('Component').get(0),0,1,"");
	if(!isValid){
		isValid = true;
		return;
	}
	
	uploadFile($(xml).find('Component').get(0),$(xml).find('import_interfaces').get(0),$(xml).find('export_interfaces').get(0));
	//show connection
	connection();
}

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