const puppeteer = require("puppeteer-core");
const fs = require("fs");
const axios = require("axios");

// 下载视频的站点
const websites = {
  snapany: 'https://snapany.com/',
}

// 设置文件下载地址
const downloadPath = "D:\\B站视频\\";
const sleep = (time) => {
  return new Promise((revolve) => {
    setTimeout(() => {
      revolve();
    }, time);
  });
};
(async () => {
  let urlsFromBilibili = [
    // {
    //   name: "难熬的30分钟",
    //   date: "2022年03月19日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1qL411w7g8/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "带儿子去洗澡。",
    //   date: "2022年03月19日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1qY411n72r/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "全职奶爸",
    //   date: "2022年03月27日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1mS4y127pP/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "干儿子过生日，认亲！",
    //   date: "2022年04月04日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1oF41137yz/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "王富贵第一次跑美团众包，看看他水平如何！",
    //   date: "2022年05月08日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV11B4y1C7BN/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "又是一年龙虾季，哥儿几个小酌一杯！",
    //   date: "2022年05月17日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1yv4y1N7Nv/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "带儿子去打疫苗",
    //   date: "2022年05月19日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1Ev4y1A7M1/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "第一次换摩托车机油",
    //   date: "2022年05月21日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1k34y1E7hR/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "看爸爸吃泡面，我口水直流",
    //   date: "2022年05月28日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1eY4y1L7ET/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "4个月大小伙第一次吃西瓜",
    //   date: "2022年06月11日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1iW4y1k7Ax/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "4个月21天学会了翻身",
    //   date: "2022年06月16日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1134y1576D/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "小家伙玩抽纸",
    //   date: "2022年06月18日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1Fg411X7sv/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "小家伙人生第一次坐地铁",
    //   date: "2022年06月19日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1QL4y1A7m6/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "5个月小伙，做儿保",
    //   date: "2022年06月24日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1ZU4y1D7gR/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "给儿子剃头",
    //   date: "2022年06月25日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1US4y1H7S3/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "洗澡",
    //   date: "2022年06月26日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1Rv4y1M7hM/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "小朋友生病了，去看医生",
    //   date: "2022年07月14日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1A94y1Q7aZ/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "铝型材DIY赛车支架",
    //   date: "2022年07月14日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1JG411p7vo/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "半岁小伙会爬了",
    //   date: "2022年07月29日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV17r4y1j78k/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "周末去麓湖晒太阳",
    //   date: "2022年08月07日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1vr4y15744/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "喂儿子吃米糊糊",
    //   date: "2022年08月12日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1vg411k7sC/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },

    // {
    //   name: "公司就地解散，兄弟们江湖再见！",
    //   date: "2022年08月24日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV18B4y1z7HN/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "和兄弟们一起夜游兴隆湖",
    //   date: "2022年08月28日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1GG4y1k7o8/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "父子俩吃地瓜干",
    //   date: "2022年10月12日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1xd4y117GT/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    {
      name: "小黄人喝牛奶",
      date: "2022年10月13日",
      originUrl:
        "https://www.bilibili.com/video/BV1c8411s7UK/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    // {
    //   name: "啃苹果🍎",
    //   date: "2022年10月16日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1ie411V7cJ/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "从爸爸嘴里抢东西吃",
    //   date: "2022年10月27日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1uR4y1Q7jW/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "拍拍爸爸的大肚子",
    //   date: "2022年10月30日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1Ae4y1m7MP/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "儿子第一次叫爸爸",
    //   date: "2022年12月03日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV11P4y197ze/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "#我的世界杯",
    //   date: "2022年12月09日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1944y1S7vV/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "小家伙今天一岁啦！",
    //   date: "2023年01月25日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1Ns4y147st/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "儿子会走路啦，真厉害！",
    //   date: "2023年02月09日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1Xs4y1Y7G4/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "小朋友第一次去动物园",
    //   date: "2023年07月16日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1sW4y1d7jC/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "相约三岔湖",
    //   date: "2023年09月16日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1bh4y1A7wp/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "和家人一起逛北京",
    //   date: "2023年10月14日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1gG4112733/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "老妹儿步入婚姻，家人跨越三千公里去送亲，祝福她！",
    //   date: "2023年10月15日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1YN4y117no/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "和亲家一起去东郊记忆遛娃",
    //   date: "2023年12月12日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1oa4y197sP/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    // {
    //   name: "看，飞机！",
    //   date: "2023年12月24日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1Ag4y1k7E9/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    {
      name: "蓉漂小夫妻省吃俭用一整年，只为年底能带儿子吃顿好的",
      date: "2023年12月31日",
      originUrl:
        "https://www.bilibili.com/video/BV1Ci4y167ca/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "陪儿子认字母，老父亲感到很幸福",
      date: "2024年01月08日",
      originUrl:
        "https://www.bilibili.com/video/BV1DT4y1H71V/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: '2岁小伙逛商场爬"动车"！',
      date: "2024年01月13日",
      originUrl:
        "https://www.bilibili.com/video/BV1tw411J7Gq/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "爸爸妈妈今天都要去打工，我去托儿所",
      date: "2024年01月16日",
      originUrl:
        "https://www.bilibili.com/video/BV1pN4y1p7Xd/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    // {
    //   name: "带儿子参加隔壁幼儿园新年游园日",
    //   date: "2024年01月20日",
    //   originUrl:
    //     "https://www.bilibili.com/video/BV1yk4y1D76Y/?vd_source=df2cb1e9149005e356cd32b684793f86",
    // },
    {
      name: "儿子今天拜干亲，哥儿几个喝两杯",
      date: "2024年01月21日",
      originUrl:
        "https://www.bilibili.com/video/BV1VV41197ou/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "小家伙今天2岁啦！去西岭雪山玩雪",
      date: "2024年01月26日",
      originUrl:
        "https://www.bilibili.com/video/BV18Q4y1c7tg/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "过年放烟花",
      date: "2024年02月10日",
      originUrl:
        "https://www.bilibili.com/video/BV1j2421A7qH/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "这技术，很难相信他才2岁",
      date: "2024年03月13日",
      originUrl:
        "https://www.bilibili.com/video/BV1ZK421479v/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "川菜博物馆打麻将",
      date: "2024年03月17日",
      originUrl:
        "https://www.bilibili.com/video/BV1cr421H7Ti/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "去公园喂鸽子打网球",
      date: "2024年03月17日",
      originUrl:
        "https://www.bilibili.com/video/BV1GK421v7Yz/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "蓉漂夫妻为省10元杀鸡费，竟然选择自己动手！",
      date: "2024年03月23日",
      originUrl:
        "https://www.bilibili.com/video/BV16m411R7jo/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "春暖花开，和儿子一起享受阳光",
      date: "2024年03月25日",
      originUrl:
        "https://www.bilibili.com/video/BV12u4m1T7EJ/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "蓉漂二代步入人生新阶段：幼儿园",
      date: "2024年04月02日",
      originUrl:
        "https://www.bilibili.com/video/BV1vm411z7hA/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "一家三口剥胡豆，生活平淡又幸福",
      date: "2024年04月02日",
      originUrl:
        "https://www.bilibili.com/video/BV1ft421n7ss/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "蓉漂夫妻难得同一天休息，陪儿子去游乐园玩",
      date: "2024年04月07日",
      originUrl:
        "https://www.bilibili.com/video/BV1mq421w7fa/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "和兄弟们一起露营两河森林公园",
      date: "2024年04月13日",
      originUrl:
        "https://www.bilibili.com/video/BV1X15iezEfR/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "短短两个星期，2岁小伙已经适应幼儿园新生活",
      date: "2024年04月17日",
      originUrl:
        "https://www.bilibili.com/video/BV17DLueQEjW/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "2岁小伙摆脱分离焦虑，每天嚷着要去幼儿园",
      date: "2024年04月26日",
      originUrl:
        "https://www.bilibili.com/video/BV1o2nPeQEmJ/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "2岁小伙爱玩水，让他在街头水坑玩个够！",
      date: "2024年05月01日",
      originUrl:
        "https://www.bilibili.com/video/BV1AF7Le6ERR/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "去老表的新店祝贺，祝他事业腾飞",
      date: "2024年05月02日",
      originUrl:
        "https://www.bilibili.com/video/BV1xS7seLEEy/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
    {
      name: "一家三口精打细算，骑车十几公里去华阳买肉",
      date: "2024年05月05日",
      originUrl:
        "https://www.bilibili.com/video/BV1BG7DezETc/?vd_source=df2cb1e9149005e356cd32b684793f86",
    },
  ];

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    defaultViewport: {
      width: 900,
      height: 900
    },
  });

  async function downloadMp4(url, name, page) {
    console.log('开始下载视频', name);
    try {
      const { data } = await axios.get(url, {
        responseType: "arraybuffer",
      });
      fs.writeFileSync(`${downloadPath}/${name}`, data, "binary");
      console.log("下载视频成功");
    } catch (err) {
      console.error("文件保存失败", err);
    }
    page.close();
  }

  for (const [index, item] of urlsFromBilibili.entries()) {
    const page = await browser.newPage();
    page.on("console", msg => console.log("PAGE LOG:", msg.text()));
    console.log('执行任务', item.name);
    await page.goto("https://snapany.com/zh/bilibili");
    await page.waitForSelector('.relative.w-full input');
    const input = await page.$('.relative.w-full input');
    await input.type(item.originUrl);
    const button = await page.$('.inline-flex.items-center.justify-center.whitespace-nowrap.rounded-md.ring-offset-background.transition-colors.bg-primary.text-primary-foreground.text-base.font-normal');
    await button.click();
    await page.waitForSelector('.inline-flex.items-center.justify-center.whitespace-nowrap.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.bg-primary.text-primary-foreground.h-10.px-4.py-2');
    const downloadLink = await page.$eval('.inline-flex.items-center.justify-center.whitespace-nowrap.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.bg-primary.text-primary-foreground.h-10.px-4.py-2', el => el.href);
    console.log('获取到下载链接', downloadLink);

    const name = `${index + 1}.` + item.name + '_' + item.date + '.mp4';
    await downloadMp4(downloadLink, name, page);
    sleep(120000)
    // Add additional logic for error handling, retrying, etc.
  }

  await browser.close();
})();
