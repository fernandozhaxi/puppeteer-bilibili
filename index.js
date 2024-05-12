const puppeteer = require("puppeteer-core");

(async () => {
  const urlsFromBilibili = [
    {
      name: "难熬的30分钟",
      date: "2022年03月19日 19:43:50",
      originUrl:
        "https://www.bilibili.com/video/BV1qL411w7g8/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "带儿子去洗澡。",
      date: "2022年03月19日 22:10:56",
      originUrl:
        "https://www.bilibili.com/video/BV1qY411n72r/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "全职奶爸",
      date: "2022年03月27日 13:04:46",
      originUrl:
        "https://www.bilibili.com/video/BV1mS4y127pP/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "干儿子过生日，认亲！",
      date: "2022年04月04日 14:05:29",
      originUrl:
        "https://www.bilibili.com/video/BV1oF41137yz/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "王富贵第一次跑美团众包，看看他水平如何！",
      date: "2022年05月08日 17:40:20",
      originUrl:
        "https://www.bilibili.com/video/BV11B4y1C7BN/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "又是一年龙虾季，哥儿几个小酌一杯！",
      date: "2022年05月17日 16:27:54",
      originUrl:
        "https://www.bilibili.com/video/BV1yv4y1N7Nv/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "带儿子打针",
      date: "2022年05月19日 10:49:13",
      originUrl:
        "https://www.bilibili.com/video/BV1Ev4y1A7M1/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "王富贵第一次换机油，熟练得让人心疼",
      date: "2022年05月21日 19:58:42",
      originUrl:
        "https://www.bilibili.com/video/BV1k34y1E7hR/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "关于我用白象拌面给儿子开胃这件事",
      date: "2022年05月28日 10:28:12",
      originUrl:
        "https://www.bilibili.com/video/BV1eY4y1L7ET/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "4个月了，吃西瓜",
      date: "2022年06月11日 19:19:45",
      originUrl:
        "https://www.bilibili.com/video/BV1iW4y1k7Ax/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "4月+21，翻身！",
      date: "2022年06月16日 22:32:07",
      originUrl:
        "https://www.bilibili.com/video/BV1134y1576D/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "618，买纸",
      date: "2022年06月18日 22:31:18",
      originUrl:
        "https://www.bilibili.com/video/BV1Fg411X7sv/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "小家伙人生第一次坐地铁",
      date: "2022年06月19日 21:46:00",
      originUrl:
        "https://www.bilibili.com/video/BV1QL4y1A7m6/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "5个月小伙，做儿保",
      date: "2022年06月24日 22:59:03",
      originUrl:
        "https://www.bilibili.com/video/BV1ZU4y1D7gR/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "给儿子剃头",
      date: "2022年06月25日 21:38:41",
      originUrl:
        "https://www.bilibili.com/video/BV1US4y1H7S3/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "洗澡",
      date: "2022年06月26日 18:54:31",
      originUrl:
        "https://www.bilibili.com/video/BV1Rv4y1M7hM/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "小朋友生病了，看看医生吃吃药",
      date: "2022年07月14日 22:02:01",
      originUrl:
        "https://www.bilibili.com/video/BV1A94y1Q7aZ/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "铝型材DIY赛车支架",
      date: "2022年07月14日 22:33:09",
      originUrl:
        "https://www.bilibili.com/video/BV1JG411p7vo/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "半岁小伙，开爬！",
      date: "2022年07月29日 09:16:05",
      originUrl:
        "https://www.bilibili.com/video/BV17r4y1j78k/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "周末，麓湖，晒太阳",
      date: "2022年08月07日 14:57:58",
      originUrl:
        "https://www.bilibili.com/video/BV1vr4y15744/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "喂儿子吃米糊糊",
      date: "2022年08月12日 15:04:31",
      originUrl:
        "https://www.bilibili.com/video/BV1vg411k7sC/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },

    {
      name: "公司就地解散，兄弟们江湖再见！",
      date: "2022年08月24日 23:37:48",
      originUrl:
        "https://www.bilibili.com/video/BV18B4y1z7HN/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "滴，打卡",
      date: "2022年08月28日 08:56:46",
      originUrl:
        "https://www.bilibili.com/video/BV1GG4y1k7o8/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "父子俩吃地瓜干",
      date: "2022年10月12日 20:09:59",
      originUrl:
        "https://www.bilibili.com/video/BV1xd4y117GT/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "小黄人喝牛奶",
      date: "2022年10月13日 21:29:56",
      originUrl:
        "https://www.bilibili.com/video/BV1c8411s7UK/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "啃苹果🍎",
      date: "2022年10月16日 18:39:14",
      originUrl:
        "https://www.bilibili.com/video/BV1ie411V7cJ/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "父口夺食",
      date: "2022年10月27日 21:55:04",
      originUrl:
        "https://www.bilibili.com/video/BV1uR4y1Q7jW/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "我和我的大肚爹",
      date: "2022年10月30日 20:07:16",
      originUrl:
        "https://www.bilibili.com/video/BV1Ae4y1m7MP/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "他会叫爸爸了",
      date: "2022年12月03日 19:56:35",
      originUrl:
        "https://www.bilibili.com/video/BV11P4y197ze/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "#我的世界杯",
      date: "2022年12月09日 22:44:57",
      originUrl:
        "https://www.bilibili.com/video/BV1944y1S7vV/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "小家伙今天一岁啦！",
      date: "2023年01月25日 23:05:20",
      originUrl:
        "https://www.bilibili.com/video/BV1Ns4y147st/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "一步两步，学会走路",
      date: "2023年02月09日 19:52:42",
      originUrl:
        "https://www.bilibili.com/video/BV1Xs4y1Y7G4/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "小朋友第一次去动物园",
      date: "2023年07月16日 21:22:27",
      originUrl:
        "https://www.bilibili.com/video/BV1sW4y1d7jC/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "相约三岔湖",
      date: "2023年09月16日 23:07:35",
      originUrl:
        "https://www.bilibili.com/video/BV1bh4y1A7wp/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "和家人一起逛北京",
      date: "2023年10月14日 10:00:00",
      originUrl:
        "https://www.bilibili.com/video/BV1gG4112733/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "老妹儿步入婚姻，家人跨越三千公里去送亲，祝福她！",
      date: "2023年10月15日 14:34:16",
      originUrl:
        "https://www.bilibili.com/video/BV1YN4y117no/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "东郊记忆遛娃",
      date: "2023年12月12日 22:49:30",
      originUrl:
        "https://www.bilibili.com/video/BV1oa4y197sP/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "看，飞机！",
      date: "2023年12月24日 21:06:53",
      originUrl:
        "https://www.bilibili.com/video/BV1Ag4y1k7E9/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "蓉漂小夫妻省吃俭用一整年，只为年底能带儿子吃顿好的",
      date: "2023年12月31日 21:51:49",
      originUrl:
        "https://www.bilibili.com/video/BV1Ci4y167ca/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "陪儿子认字母，老父亲感到很幸福",
      date: "2024年01月08日 22:18:13",
      originUrl:
        "https://www.bilibili.com/video/BV1DT4y1H71V/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: '2岁小伙逛商场爬"动车"！',
      date: "2024年01月13日 15:29:19",
      originUrl:
        "https://www.bilibili.com/video/BV1tw411J7Gq/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "爸爸妈妈去上班，我上托儿所",
      date: "2024年01月16日 20:07:58",
      originUrl:
        "https://www.bilibili.com/video/BV1pN4y1p7Xd/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "隔壁幼儿园团年了！带儿子去看看",
      date: "2024年01月20日 13:04:28",
      originUrl:
        "https://www.bilibili.com/video/BV1yk4y1D76Y/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "儿子今天拜干亲，哥儿几个喝两杯",
      date: "2024年01月21日 16:12:42",
      originUrl:
        "https://www.bilibili.com/video/BV1VV41197ou/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "小家伙2岁啦！带他去西岭雪山玩~",
      date: "2024年01月26日 14:49:09",
      originUrl:
        "https://www.bilibili.com/video/BV18Q4y1c7tg/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "过年啦朋友们，新年快乐呀",
      date: "2024年02月10日 20:03:14",
      originUrl:
        "https://www.bilibili.com/video/BV1j2421A7qH/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "这技术，很难相信他才2岁",
      date: "2024年03月13日 21:23:50",
      originUrl:
        "https://www.bilibili.com/video/BV1ZK421479v/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "走！去川菜博物馆吃粑粑，打麻将！",
      date: "2024年03月17日 22:23:08",
      originUrl:
        "https://www.bilibili.com/video/BV1cr421H7Ti/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "带儿子去公园喂鸽子打网球",
      date: "2024年03月17日 22:34:27",
      originUrl:
        "https://www.bilibili.com/video/BV1GK421v7Yz/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "蓉漂夫妻为省10元杀鸡费，竟然选择自己动手！",
      date: "2024年03月23日 22:50:13",
      originUrl:
        "https://www.bilibili.com/video/BV16m411R7jo/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "这么好的天气，与其去打工浪费生命，不如和儿子一起享受阳光",
      date: "2024年03月25日 13:38:49",
      originUrl:
        "https://www.bilibili.com/video/BV12u4m1T7EJ/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "蓉漂二代步入人生新阶段：幼儿园",
      date: "2024年04月02日 19:30:36",
      originUrl:
        "https://www.bilibili.com/video/BV1vm411z7hA/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "一家三口剥胡豆，生活平淡又幸福",
      date: "2024年04月02日 21:20:18",
      originUrl:
        "https://www.bilibili.com/video/BV1ft421n7ss/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "蓉漂夫妻难得同一天休息，陪儿子去游乐园玩",
      date: "2024年04月07日 00:26:52",
      originUrl:
        "https://www.bilibili.com/video/BV1mq421w7fa/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "休闲时光：和兄弟们一起露营两河森林公园",
      date: "2024年04月13日 23:33:17",
      originUrl:
        "https://www.bilibili.com/video/BV1X15iezEfR/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "短短两个星期，2岁小伙已经适应幼儿园新生活",
      date: "2024年04月17日 12:03:48",
      originUrl:
        "https://www.bilibili.com/video/BV17DLueQEjW/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "2岁小伙摆脱分离焦虑，每天嚷着要去幼儿园",
      date: "2024年04月26日 12:50:01",
      originUrl:
        "https://www.bilibili.com/video/BV1o2nPeQEmJ/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "2岁小伙爱玩水，让他在街头水坑玩个够！",
      date: "2024年05月01日 20:34:11",
      originUrl:
        "https://www.bilibili.com/video/BV1AF7Le6ERR/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "去老表的新店祝贺，祝他事业腾飞",
      date: "2024年05月02日 23:54:24",
      originUrl:
        "https://www.bilibili.com/video/BV1xS7seLEEy/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "一家三口精打细算，骑车十几公里去华阳囤肉",
      date: "2024年05月05日 12:59:42",
      originUrl:
        "https://www.bilibili.com/video/BV1BG7DezETc/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "母亲节，妈妈去打工，爸爸带我逛公园！",
      date: "2024年05月12日 22:50:28",
      originUrl:
        "https://www.bilibili.com/video/BV1nZMYeiEwa/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
  ];

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    defaultViewport: {
        width: 900,
        height: 900
    },
  });

  const sleep = (time) => {
    return new Promise((revolve) => {
      setTimeout(() => {
        revolve();
      }, time);
    });
  };

  // 设置文件下载地址
  const downloadPath = "F:\\迅雷下载\\B站视频\\";

  urlsFromBilibili.forEach(async (item, index) => {
    if (index > 0) return;
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    await client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: downloadPath,
    });
    await page.goto("https://snapany.com/zh/bilibili");

    // 获取输入框
    const inputNodes = await page.$$(".relative.w-full input");

    const input = inputNodes[0]
    // 聚焦输入框
    input.focus();
    // 输入原始链接
    await input.type(item.originUrl);

    // 获取到提交按钮
    const buttonNodes = await page.$$(".inline-flex.items-center.justify-center.whitespace-nowrap.rounded-md.ring-offset-background.transition-colors.bg-primary.text-primary-foreground.text-base.font-normal")
    const button = buttonNodes[0]
    button.click();

    await sleep(3000);

    // 获取到下载连接
    const downloadNodes = await page.$$(
      ".inline-flex.items-center.justify-center.whitespace-nowrap.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.bg-primary.text-primary-foreground.h-10.px-4.py-2"
    );
    const downloadBtn = downloadNodes[0]
    // 模拟用户点击
    // downloadBtn.click();

    console.log('downloadBtn',downloadBtn)
    downloadBtn.download = 'file' + new Date().valueOf()
    downloadBtn.href = downloadBtn.href + '?response-content-type=application/octet-stream'
    downloadBtn.click()

    page.on("console", async (msg) => {
        for (let i = 0; i < msg.args().length; ++i)
            console.log(`${i}: ${msg.args()[i]}`);
    });

    // 监听所有的请求
    // page.on("response", async (response) => {
    //   const request = response.request();
    //   const url = request.url();
    //   const status = response.status();
    //   const headers = response.headers();
    //   // 在这里可以根据需要进行进一步处理
    //   if (url.startsWith("https://upos-sz-mirrorali.bilivideo.com")) {
    //     console.log("响应url = ", url);
    //     // if (status === 200) {
    //     //   const contentDisposition = headers["content-disposition"];
    //     //   const fileNameMatch =
    //     //     contentDisposition &&
    //     //     contentDisposition.match(/filename=["']?([^'"\s]+)["']?/i);
    //     //   const fileName = fileNameMatch && fileNameMatch[1];
    //     //   if (fileName) {
    //     //     console.log("文件名:", fileName);
    //     //     // 判断文件是否下载完成
    //     //     const filePath = downloadPath + fileName;
    //     //     let isFinish = false;
    //     //     const now = Date.now();
    //     //     while (!isFinish) {
    //     //         sleep(1000)
    //     //       // 如果有文件，且后缀满足我们的要求
    //     //       if (fs.existsSync(filePath)) {
    //     //         console.log("文件下载完成");
    //     //         isFinish = true;
    //     //         page.close()
    //     //       } else {
    //     //         console.log("文件下载进行中");
    //     //       }
    //     //       // 如果文件超过10min还没下载成功，就抛出错误
    //     //       if (!isFinish && Date.now() - now >= 10 * 60 * 1000) {
    //     //         throw new Error("download file timeout");
    //     //       }
    //     //     }
    //     //     // 记录一下耗时
    //     //     console.log(`time spend: time=${Date.now() - now}`);
    //     //   } else {
    //     //     page.close()
    //     //     console.log("无法获取文件名");
    //     //   }
    //     // } else {
    //     //   page.close()
    //     //   console.log("请求出错:", status);
    //     // }
    //   }
    // });

    // browser.on('targetcreated', async (target) => {
    //     let s = target.url();
    //     //the test opens an about:blank to start - ignore this
    //     if (s == 'about:blank') {
    //         return;
    //     }
    //     console.log('targetcreated 获取到的路径',s)
    //     //unencode the characters after removing the content type
    //     s = s.replace("data:text/csv;charset=utf-8,", "");
    //     //clean up string by unencoding the %xx
    //     // ...
    //     fs.writeFile("/tmp/download.csv", s, function(err) {
    //         if(err) {
    //             console.log(err);
    //             return;
    //         }
    //         console.log("The file was saved!");
    //     });
    // });
  });

//   await browser.close();
})();
