<template>
    <div class="homepage">
        <!-- <button @click="showGlobalModal">全局弹窗自定义</button> -->
        <!-- 头部 -->
        <appheader title="积分购"></appheader>

        <!-- 轮播广告 -->
        <!-- <carousel id="swiperView" classpage="app-pagination" :list="imglist" v-if="!loading">
        </carousel> -->

        <!-- TAB切换区 -->
        <!-- <ul class="tab-menu v-flexbox" v-if="!loading">
            <li class="v-flexbox-item tab-item" v-for="item in tablist" @click="sordBy(item.key)" :class="[{active:$index === activeIndex}]">
                <a v-if="$index > 2" @click.prevent="activeIndex=$index" :class="{ markUp: mark.up, markDown: mark.down }">{{item.title}}</a>
                <a v-else @click.prevent="activeIndex=$index">{{item.title}}</a>
            </li>
        </ul> -->

        <!-- 商品内容区 -->
        <!-- <section class="main-container" v-if="!loading">
            <ul class="itemBox">
                <li class="item" v-for="item in shoplist">
                    <a v-link="{name:'goods',query:{id:item.id}}">
                        <img :src="item.cover" :style="{ width:item.imgwh +'px',height:item.imgwh +'px' }">
                        <div class="info">
                            <p class="title nowrap-multi">{{item.title}}</p>
                        </div>
                        <div class="msg">
                            <p class="state">
                                <span class="percentage">开奖进度{{progress($index)}}</span>
                                <span class="progress"> <i class="ongoing" :style="{width:progress($index)}"></i></span>
                            </p>
                            <p class="btn">
                                <span class="add" @click.stop.prevent="addCart">+清单</span>
                            </p>
                        </div>
                    </a>
                </li>
            </ul>
        </section> -->

        <!--模态框-->
        <!-- <globalmodal :globalmodal.sync="globalModal"></globalmodal> -->

        <!-- Loading -->
        <!-- <loading :show="loading"></loading> -->

    </div>
</template>

<script>
    import Mock from 'mockjs';
    // 生成商品列数据
    Mock.mock('shoplist.json', {
        retcode: 1,
        retmsg: '查询成功',
        data: {
            'total': 1,
            'records': 10,
            'page': 1,
            'rows|10': [{
                'id|+1': 1,
                'sid|+1': 1,
                'remainmember': '@natural(100, 1000)',
                'joinedmember': '@natural(100, 1000)',
                'totalmember': '@natural(100, 1000)',
                'title': '@title(6, 50)',
                'cover': '@image(200x200, #ff6666, Hello)'
            }]
        }
    })

    // 生成轮播数据
    const imgdata = Mock.mock({
        'list|3': [{
            'id|+1': 1,
            'src': '@image(640x400, #ffcc33, #333,Banner)',
        }]
    })

    // import Appheader from './common/Header.vue';
    // import Loading from '../components/Loading.vue';
    // import Globalmodal from '../components/globalmodal.vue';
    // import Carousel from '../components/carousel.vue';

    export default {
        data() {
            return {
                isflag        : false,   //用于tab切换的最后一个标识
                scroll        : true,    //用于判断是否滚动
                activeIndex   : 0,      //用于默认active样式
                page          : 1,      //当前页数
                mark          : { up: false, down: false },  //用于判断价格升降序
                tablist       : [{ title: "默认", key: '1' }, { title: "销量", key: '2' }, { title: "上新", key: '3' }, { title: "价格", key: '4' }],  //tab数据
                shoplist      : [],     //列表数据
                imglist       : [],     //轮播数据
                globalModal   : {},     //自定义弹层
                loading       : true
            }
        },
        ready() {
            let self = this;
            self.loadshow = true;
            // this.$parent.toast.content = 'toast  2.0s...';
        },
        route: {
            data() {
                let self = this;
                /*轮播图片*/
                self.imgSwiper();
                /*加载首页数据*/
                self.getAjaxData();
                /*滚动加载*/
                $(window).on('scroll', () => {
                    self.getScrollData();
                });
            },
            deactivate(transition) {
                $(window).off('scroll');
                transition.next();
            }
        },
        methods: {

            /**
             * 请求数据
             * @return {[type]} [description]
             */
            getAjaxData() {
                let self = this;
                self.$http.get('shoplist.json').then(function (response) {
                    self.scroll = true;
                    let data = response.data;
                    if (data.retcode == 1) {
                        console.log(self.page);
                        self.loading = false;
                        let jsonData = data.data.rows;

                        if (self.page == 1) {
                            self.shoplist = jsonData
                        } else {
                            self.shoplist = self.shoplist.concat(jsonData);
                        }
                    }

                }, function (response) {
                    // error callback
                });
            },

            /**
             * 滚动加载数据
             * @return {[type]} [description]
             */
            getScrollData() {
                let self = this;
                if (self.scroll) {
                    let totalheight = parseFloat(window.innerHeight) + parseFloat(window.scrollY);
                    if (document.body.clientHeight <= totalheight + 200) {
                        self.scroll = false;
                        self.page++;
                        if (self.page <= 5) {
                            self.getAjaxData()
                        }
                    }
                }
            },

            /**
             * 计算开奖进度
             * @param  {[type]} index [description]
             * @return {[type]}       [description]
             */
            progress(index) {
                let self = this;
                let totalprogress = 0,
                    remainmember = self.shoplist[index].remainmember,
                    totalmember = self.shoplist[index].totalmember;

                totalprogress = Math.round(remainmember / totalmember * 100) + '%';

                return totalprogress;
            },

            /**
             * 价格升降序
             * @param  {[type]} key [description]
             * @return {[type]}     [description]
             */
            sordBy(key) {
                let self = this;
                self.shoplist = [];
                self.page = 1;

                self.getAjaxData();

                if (key == 4) {
                    self.isflag = !self.isflag;

                    if (this.isflag) {
                        self.mark.up = true;
                        self.mark.down = false;
                        // alert('up')
                    } else {
                        // alert('down')
                        self.mark.down = true;
                        self.mark.up = false;
                    }

                } else {
                    self.mark.up = self.mark.down = false;
                }
            },

            /**
             * 加入清单
             * [addCart description]
             */
            addCart() {
                console.log("加入清单成功");
            },

            /**
             * 轮播广告
             * @return {[type]} [description]
             */
            imgSwiper() {
                let self = this;
                self.$nextTick(() => {
                    self.$set('imglist', imgdata.list);
                });
            },

            /**
             * 弹出层组件
             * @return {[type]} [description]
             */
            showGlobalModal: function () {
                this.globalModal = {
                    rd: Math.random(),
                    title: 'title',
                    content: 'content',
                    alert: true,
                    confirmFn: function () {
                        console.log('自定义confirmFn' + Math.random());
                    },
                    cancelFn: function () {
                        console.log('自定义cancelFn' + Math.random());
                    }
                }
            }
        },
        components: {
            // Appheader,
            // Loading,
            // Globalmodal,
            // Carousel
        },
    }
</script>
