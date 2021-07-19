<template>
  <div class="opalstack">
    <!-- <a :href="aaa" target="_blank">ppp</a> -->
    <div class="opalstack1">
      <span>仪表板</span>
      <span class='language'>
        <span @click="langfn('chinese')">中 文</span>
        <span @click="langfn('english')">English</span>
      </span>
      <div class="opalstacka flex">

        <div>
          <div>
            <div>
              <i></i>
              <span class="opalstackspan1">服务器和IP地址</span>
            </div>
            <div class="line"></div>
            <div class="clearh">
              <div>
                这些是分配给您帐户的服务器及其各自的IP地址。您将需要此信息来通过SSH和SFTP登录到服务器，获取外部DNS记录以及可能需要指定主机名和IP地址的其他任何位置。
              </div>
              <div>
                <ul>
                  <li>服务器主机名： <span class="colorred">opal3.opalstack.com</span></li>
                  <li>服务器的IP地址： <span class="colorred">23.108.108.200</span></li>
                </ul>
              </div>
            </div>
            <div class="line"></div>
            <div class="bottom">
              <div class="line"></div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>
              <i></i>
              <span class="opalstackspan1">用法</span>
            </div>
            <div class="line"></div>
            <div class="yongfa2 clearh">
              <div>
                opal3.opalstack.com
              </div>
              <div>
                <span>RAM使用</span>
                <span class="ramright">{{ ramline1 }} 兆字节</span>
              </div>
              <div class="ramline">
                <div :style="{'width':ramline1}"></div>
              </div>
              <div>
                <span>磁盘使用情况</span>
                <span class="ramright">{{ ramline2 }} GB</span>
              </div>
              <div class="ramline">
                <div :style="{'width':ramline2}"></div>
              </div>
            </div>
            <div class="line"></div>
            <div class="bottom">
              <div>
                <router-link to="/usage">
                  使用细节
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>
              <i></i>
              <span class="opalstackspan1">服务器和IP地址</span>
            </div>
            <div class="line"></div>
            <div class="clearh">
              <span>用户和应用程序目录是站点文件的存储位置。该文件系统路径将是
                <h6>/home/USER/apps/APP</h6>
                其中 <h6>USER</h6> 的用户名，并且
                <h6>APP</h6> 是应用程序的名称。您可能有很多用户，并在这些用户的主目录中的任何目录中安装应用程序。
                您可能需要先创建一个用户，然后才能安装应用程序。</span>
            </div>
            <div class="line"></div>
            <div class="bottom">
              <div>
                <router-link to="/users">
                  用户数
                </router-link>
                <router-link to="/applications">
                  应用领域
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>
              <i></i>
              <span class="opalstackspan1">域和站点路由</span>
            </div>
            <div class="line"></div>
            <div class="clearh">
              <div>
                站点路由将使域和应用程序可以像网站一样协同工作。必须先设置域和应用程序，然后才能创建站点路由。
              </div>
            </div>
            <div class="line"></div>
            <div class="bottom">
              <div>
                <router-link to="/domains">
                  域
                </router-link>
                <router-link to="/routes">
                  站点路线
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>
              <i></i>
              <span class="opalstackspan1">资料库</span>
            </div>
            <div class="line"></div>
            <div class="clearh">
              <div>
                我们提供两种托管数据库服务
              </div>
              <div>
                <ul>
                  <li>MariaDB：社区开发的MySQL关系数据库管理系统分支。</li>
                  <li>PostgreSQL：一个开源的对象关系数据库管理系统。</li>
                </ul>
              </div>
              <div> 
                   默认情况下，为任一服务添加新数据库将添加新数据库用户。您还可以选择现有的数据库用户。由应用程序安装程序创建的数据库和用户也将列出。
              </div>
            </div>

            <div class="line"></div>
            <div class="bottom">
              <div>
                <router-link to="/mariadbs">
                  玛利亚数据库
                </router-link>
                <router-link to="/psqldbs">
                  PostgreSQL的
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>
              <i></i>
              <span class="opalstackspan1">支持</span>
            </div>
            <div class="line"></div>
            <div class="clearh">
              <div>
                需要帮忙？提供以下选项
              </div>
              <div>
                <ul>
                  <li>在状态页上检查系统状态。</li>
                  <li>在社区论坛中提出问题并寻找答案。</li>
                  <li>阅读支持中心中的文档。</li>
                  <li>阅读文档或通过支持小部件提出问题。</li>
                  <li>通过电子邮件获取支持至 <a class="zhichia" href="support@opalstack.com" target="_blank">support@opalstack.com。</a></li>
                </ul>
              </div>
            </div>
            <!-- <div class="line"></div> -->
            <div class="bottom">
            </div>
          </div>
        </div>

      </div>

      <div class="Opalstack">©2021 Opalstack LLC</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        aaa: "http://localhost:8080/hualun",
        ramline1: '100%',
        ramline2: "100%",
      }
    },
    mounted() {
      var dv = document.getElementById("home-body-luyou")
      var resize2 = function() {
        var div = $("#home-body-luyou .flex")
        var divs = $("#home-body-luyou .clearh")
        var divw = div.width()
        if (divw < 1200) {
          div.css("display", "block")
          divs.css("height", "auto")
        } else {
          div.css("display", "flex")
          divs.css("height", "160px")
        }
      }
      resize2();
      wachdiv.divsize(dv, resize2, "opa")
    },
    methods: {
      langfn(lang) {
        localStorage.setItem('language', lang)
        if (lang == 'english') {
          this.$router.push({
            'path': '/en'
          })
        }
      },
      f1() {

      },
    },
    components: {

    },
  }
</script>

<style scoped>
  .opalstack {
    cursor: default;
    padding: 0 12px;
  }

  .opalstack1>span {
    display: inline-block;
    height: 58px;
    padding-left: 44px;
    line-height: 70px;
    font-size: 20px;
  }

  .language {
    float: right;
    margin-right: 30px;
    right: 20px;
  }

  .language span {
    margin-left: 20px;
    cursor: pointer;
    font-size: 18px;
    color: #0000FF;
  }

  .opalstacka {
    min-width: 300px;
    display: flex;
    flex-wrap: wrap;
    /* height: 324px; */
    /* flex-direction: column; */
  }

  .opalstacka>div {
    /* flex-grow:10; */
    /* 让第这个元素的宽度为其他元素的的多少倍： */
    flex: 0 0 33.33333%;
    vertical-align: top;
    /* height: 100%; */
    /* height: 350px; */
  }

  .opalstacka>div>div {
    background-color: #fff;
    /* text-indent:1.5em; */
    border: 12px solid #ececf1;
    font-size: 14px;
    padding: 20px 20px 0 20px;
  }

  .opalstacka .line {
    height: 2px;
    background-color: #ececf1;
    /* margin: 20px 0; */
  }

  .opalstacka>div>div>div:nth-child(1) {
    margin-top: 0px;
  }

  .opalstacka>div>div>div {
    /* margin-top: 20px; */
  }

  .opalstacka .bottom {
    /* width: calc(100% - 40px); */
    position: relative;
    height: 60px;
    bottom: 0px;
  }

  .opalstacka .bottom .line {
    margin-bottom: 0;
  }

  .opalstacka .bottom>div {
    position: absolute;
    right: 0;
  }

  .opalstacka .bottom a {
    display: inline-block;
    color: #4f60e0;
    padding: 0 5px;
    margin-right: 20px;
    height: 60px;
    line-height: 60px;
  }

  .opalstackspan1 {
    display: inline-block;
    height: 40px;
    font-size: 18px;
  }

  .colorred {
    color: #ce4747;
  }

  .opalstack .yongfa2>div {
    margin-bottom: 10px;
    font-size: 16px;
  }

  .opalstack .yongfa2 .ramline {
    font-size: 0px;
    border-radius: 2px;
    height: 6px;
    background-color: #ececf1;
    margin-bottom: 30px;
  }

  .opalstack .ramline>div {
    display: inline-block;
    border-radius: 2px;
    height: 6px;
    background-color: #1dc9b7;
  }

  .opalstack .ramright {
    float: right;
  }

  .opalstack h6 {
    margin: 0;
    font-size: 14px;
    display: inline-block;
    color: #ce4747;
    margin-block-end: 0;
    margin-block-start: 0;
  }

  .zhichia {
    cursor: pointer;
    color: #4f60e0;
  }

  .opalstack .clearh {
    padding: 20px 0;
    height: 140px;
  }

  .Opalstack {
    padding: 0 0 20px 20px;
  }
</style>
