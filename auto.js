/***********************
 * 初始化
 ***********************/
// 检查手机是否开启无障碍服务

auto();

// 请求截图权限
if (! requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}
sleep(2000);

//打开抖音

launchApp("抖音短视频");
sleep(3000);
//设置分辨率,自动缩放
setScreenMetrics(1080,2340);
//api调用地址
var url = "https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=24.7d637dce3cd7100daeac7a0918766cf8.2592000.1595670075.282335-19205497";
//截图1张图片并保存到存储卡目录
//主循环
while(true)
{
    for(var i = 0; i < 4; i++)
    {
        captureScreen("/sdcard/auto.png");
        sleep(500);

        var image = images.read("/sdcard/auto.png");
        //读取图片并转BASE64
        var base64 = images.toBase64(image);
        //发起请求
        var res = http.post(url, {
            "image": base64,
            "image_type": "BASE64",
            "face_field": "age,beauty"
        });

        //toast("状态码"+res.statusCode);

        var html = res.body.json();

        //toast(html.error_msg );

        if(html.error_msg == "SUCCESS")
        {
            toast("检测成功");
            if(html.result.face_list[0].beauty >= 60)
            {
                toast("发现美女一枚");
                sleep(200);
                //点赞
                click(988,1321);
                sleep(200);
                //关注
                click(988,1166);
                sleep(200);
                //翻页
                swipe(540,1700,540,400,100);
                sleep(200);
            }
            //toast("年龄"+html.result.face_list[0].age)
            //toast("颜值"+html.result.face_list[0].beauty)
        }
        else
        {
            toast("检测失败");
            sleep(200);
        }
            
    }
            //翻页
            swipe(540,1700,540,400,100);
            sleep(200);
}



