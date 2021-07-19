<template>
  <div class="opalstack">
    <!-- <a :href="aaa" target="_blank">ppp</a> -->
    <div class="opalstack1">
      <span>Dashboard</span>
      <span class='language'>
        <span @click="langfn('chinese')">中 文</span>
        <span @click="langfn('english')">English</span>
      </span>
      <div class="opalstacka flex">

        <div>
          <div>
            <div>
              <i></i>
              <span class="opalstackspan1">Servers and IP Addresses </span>
            </div>
            <div class="line"></div>
            <div class="clearh">
              <div>
                These are the servers and their respective IP addresses that are assigned to your account. You'll need this information to log in to the server over SSH and SFTP, for external DNS records, and anywhere else that you might need to specify a hostname and IP address.
              </div>
              <div>
                <ul>
                  <li>Server hostname: <span class="colorred">opal3.opalstack.com</span></li>
                  <li>Server IP address:  <span class="colorred">23.108.108.200</span></li>
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
              <span class="opalstackspan1">Usage</span>
            </div>
            <div class="line"></div>
            <div class="yongfa2 clearh">
              <div>
                opal3.opalstack.com
              </div>
              <div>
                <span>RAM Usage </span>
                <span class="ramright">{{ ramline1 }}  MB </span>
              </div>
              <div class="ramline">
                <div :style="{'width':ramline1}"></div>
              </div>
              <div>
                <span>Disk Usage </span>
                <span class="ramright">{{ ramline2 }} GB</span>
              </div>
              <div class="ramline">
                <div :style="{'width':ramline2}"></div>
              </div>
            </div>
            <div class="line"></div>
            <div class="bottom">
              <div>
                <router-link to="/en/usage">
                  Usage Details
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>
              <i></i>
              <span class="opalstackspan1">Users and Applications</span>
            </div>
            <div class="line"></div>
            <div class="clearh">
              <span>Users and application directories are where your sites' files are stored. The filesystem path will be
                <h6> /home/USER/apps/APP</h6>
                where <h6>USER</h6>  is the username, and
                <h6> APP </h6> is the application name. You may have many users, and install applications within any of those users' home directories. You will need to create a user before you may install applications.
              </span>
            </div>
            <div class="line"></div>
            <div class="bottom">
              <div>
                <router-link to="/en/users">
                  Users
                </router-link>
                <router-link to="/en/applications">
                  Applications
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>
              <i></i>
              <span class="opalstackspan1">Domains and Site Routes</span>
            </div>
            <div class="line"></div>
            <div class="clearh">
              <div>
                Site Routes will make domains and applications work together as a website. Setting up a domain and application is required before you can create a site route.
              </div>
            </div>
            <div class="line"></div>
            <div class="bottom">
              <div>
                <router-link to="/en/domains">
                  Domains
                </router-link>
                <router-link to="/en/routes">
                  Site Routes
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>
              <i></i>
              <span class="opalstackspan1">Databases</span>
            </div>
            <div class="line"></div>
            <div class="">
              <div>
                We provide two varieties of managed database services:
              </div>
              <div>
                <ul>
                  <li>MariaDB: a community-developed fork of the MySQL relational database management system.</li>
                  <li>PostgreSQL: an open-source object-relational database management system.</li>
                </ul>
              </div>
            </div>
            <div> Adding a new database for either service will add a new database user by default. You also have the option of selecting an existing database user.
                  Databases and users created by application installers will be listed as well.
            </div>
            <!-- <div class="line"></div> -->
            <div class="bottom">
              <div>
                <router-link to="/en/mariadbs">
                  MariaDB
                </router-link>
                <router-link to="/en/psqldbs">
                  PostgreSQL
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>
              <i></i>
              <span class="opalstackspan1">Support</span>
            </div>
            <div class="line"></div>
            <div class="clearh">
              <div>
                Need help? The following options are available:
              </div>
              <div>
                <ul>
                  <li>Check system status at the status page.</li>
                  <li>Ask questions and search for answers in the Community Forum.</li>
                  <li>Read documentation in the support center.</li>
                  <li>Read documentation or ask a question via the support widget.</li>
                  <li>Get support via email to <a class="zhichia" href="support@opalstack.com" target="_blank">support@opalstack.com。</a></li>
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
        if (lang == 'chinese') {
          this.$router.push({
            'path': '/'
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
