var map = new BMap.Map("mp");

  map.centerAndZoom(new BMap.Point(112.926769,28.230655),15);//根据坐标初始化地图
  map.enableScrollWheelZoom(true);
  map.addControl(new BMap.NavigationControl()); //平移缩放控件
  map.addControl(new BMap.ScaleControl()); //比例尺
  map.addControl(new BMap.OverviewMapControl()); //缩略地图
  map.addControl(new BMap.MapTypeControl()); //地图类型
  map.setCurrentCity("湖南"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
  //添加标注
  map.clearOverlays()
  positions.forEach(position => {
    x = Number(position.x);
    y = Number(position.y);
    mid = position.mid;
    console.log(mid)
    if(x&&y){
      var marker = new BMap.Marker(new BMap.Point(x,y))
      marker.disableMassClear();
      map.addOverlay(marker);
      var label = new BMap.Label(mid,{
          offset:new BMap.Size(-30,-30),});
          label.setStyle({border:"0"});
      label.hide();//隐藏文本标注
    }
    marker.setLabel(label)
    marker.addEventListener("mouseover",function(){
      label.show();
    });
    marker.addEventListener("mouseout",function(){
      label.hide();
    });
    marker.addEventListener("click",function(){
        var e={};
        e.e=$(this),
            e.ke=$user.ke
            e.mid=marker.getLabel().content,//monitor id
            e.auth=$user.auth_token,//authkey
            e.mon=$.ccio.mon[e.ke+e.mid+e.auth];//monitor configuration
            var user
            if($.users[e.auth]){user=$.users[e.auth]}else{user=$user}
            if(!user){
                user=$user
            }
            if($("#monitor_live_"+e.mid+user.auth_token).length===0||$.ccio.mon[e.ke+e.mid+user.auth_token].watch!==1){
                    $.ccio.cx({f:'monitor',ff:'watch_on',id:e.mid},user)
                }else{
                    $("#main_canvas").animate({scrollTop:$("#monitor_live_"+e.mid+user.auth_token).offset().top-($('#main_header').height()+10)},500);
                }
              })
    });
    var local = new BMap.LocalSearch(map,{
      renderOptions:{map:map,panel:"searchlist"},
      pageCapacity:4
    })
    $("input#search").bind("input onchange",function(){
      $("#searchlist").hide()
      var keyword = []
      var str = String($(this).val())
      keyword.push(str)
      // console.log(keyword)
      local.search(keyword)
      if($("#search").val()){
        $("#searchlist").show()
      }
      
    })

    