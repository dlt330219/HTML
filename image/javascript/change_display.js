// JavaScript Document

function show_table_menu(table_menu_id)
{
	table_menu = document.getElementById(table_menu_id);
	if(table_menu.className == "display_menu"){
		table_menu.className = "none_display_menu";
	}else
		table_menu.className = "display_menu";
}
function unshow_table_menu(table_menu_id)
{
	table_menu = document.getElementById(table_menu_id);
	table_menu.className = "none_display_menu";
}
function show_children(comp_name)
{
	child_div = document.getElementById(comp_name);
	if(child_div.className == "undisplay")
		child_div.className="";
	else
		child_div.className="undisplay";
}
window.alert = function(str) 
{ 
var shield = document.createElement("DIV"); 
shield.id = "shield"; 
shield.style.position = "absolute"; 
shield.style.left = "0px"; 
shield.style.top = "0px"; 
shield.style.width = "100%"; 
shield.style.height = document.body.scrollHeight+"px"; 
//弹出对话框时的背景颜色
shield.style.backgroundImage = "./image/write.jpg";  
shield.style.textAlign = "center"; 
shield.style.zIndex = "25"; 
//背景透明 IE有效 
shield.style.filter = "alpha(opacity=0%)"; 
var alertFram = document.createElement("DIV"); 
alertFram.id="alertFram"; 
alertFram.style.position = "absolute"; 
alertFram.style.left = "50%"; 
alertFram.style.top = "50%"; 
alertFram.style.marginLeft = "-225px"; 
alertFram.style.marginTop = "-75px"; 
alertFram.style.width = "450px"; 
alertFram.style.height = "150px"; 
alertFram.style.background =  "#ff0000";  
alertFram.style.textAlign = "center"; 
alertFram.style.lineHeight = "150px"; 
alertFram.style.zIndex = "300"; 
strHtml = "<ul style=\"list-style:none;margin:0px;padding:0px;width:100%\">"; 
strHtml += " <li style=\"background:#68ABE4;text-align:left;padding-left:10px;font-size:14px;font-weight:bold;height:25px;line-height:25px;border:1px solid #68ABE4;\">信息提示</li>"; 
strHtml += " <li style=\"background:#fff;text-align:center;overflow:auto;font-size:16px;height:120px;line-height:30px;border-left:1px solid #68ABE4;border-right:1px solid #68ABE4;\">"+str+"</li>"; 
strHtml += " <li style=\"background:#FDEEF4;text-align:right;font-weight:bold;border-left:1px solid #68ABE4;border-right:1px solid #68ABE4;border-bottom:1px solid #68ABE4;height:30px;line-height:25px;\"><input style=\"border:1px solid #68ABE4;width:80px;height:25px;padding-right:10px;padding-left:10px;margin-right:5px;margin-bottom:2px;\" type=\"button\" value=\"确 定\" onclick=\"doOk()\" /></li>"; 
strHtml += "</ul>"; 
alertFram.innerHTML = strHtml; 
document.body.appendChild(alertFram); 
document.body.appendChild(shield); 
var ad = setInterval("doAlpha()",5); 
this.doOk = function(){ 
alertFram.style.display = "none"; 
shield.style.display = "none"; 
} 
alertFram.focus(); 
document.body.onselectstart = function(){return false;}; 
} 