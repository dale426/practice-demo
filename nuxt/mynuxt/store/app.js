import {otherRouter, appRouter} from '~/assets/js/router-copy';
import Util from '~/assets/js/libs/util';
import Cookies from 'js-cookie';
import Vue from 'vue';
// import api from "@/api"

export const state = () => ({
    cachePage: [],
    lang: '',
    isFullScreen: false,
    openedSubmenuArr: [],  // 要展开的菜单数组
    menuTheme: 'dark', // 主题
    themeColor: '',
    pageOpenedList: [{
      title: '首页',
      path: '',
      name: 'home_index'
    }],
    currentPageName: '',
    currentPath: [
      {
        title: '首页',
        path: '',
        name: 'home_index'
      }
    ],  // 面包屑数组
    menuList: [],
    actBtnList: [], //权限按钮数组
    routers: [
      otherRouter,
      ...appRouter
    ],
    tagsList: [...otherRouter.children],
    messageCount: 0,
    dontCache: ['text-editor', 'artical-publish'],  // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
    sourceMenuData:[],
    closePageName: '',
    historyRoute: ['home_index']
  });

  export const mutations = {
    setTagsList (state, list) {
      state.tagsList.push(...list);
    },
    setSourceMenuData (state, list){
      state.sourceMenuData.push(...list)
    },
    setClosePage(state, value) {
      state.closePageName = value;
    },
    updateMenulist (state) {

      let accessCode = parseInt(Cookies.get('access'));
      let menuList = [];

      let orList =  state.sourceMenuData[0].childs
      orList.forEach((item, index) =>{
        if(item.act&&item.act!==''){
          state.actBtnList.push(item.act)
        }
        item.childs.forEach((ite,n)=>{
          if(ite.act&&ite.act!==''){
            state.actBtnList.push(ite.act)
          }
          ite.childs.forEach((it,z)=>{
            if(it.act&&it.act!==''){
              state.actBtnList.push(it.act)
            }
          })
        })
      })
      appRouter.forEach((item, index) => {
        for(var i=0;i<orList.length;i++){
           if(orList[i].nodeName == item.title){
             for(var j=0;j<orList[i].childs.length;j++){
               for(var z=0;z<item.children.length;z++){
                     if(orList[i].childs[j].nodeName==item.children[z].title){
                       item.children[z].isPass = true
                     }
               }
             }
             menuList.push(item)
           }
        }
      });
      menuList.forEach((item,index) => {
       const passMenu =   item.children.filter(ite=>{
          if(ite.isPass){
            return item
          }
        })
        item.children=passMenu
      })

      state.menuList = menuList;


    },
    changeMenuTheme (state, theme) {
      state.menuTheme = theme;
    },
    changeMainTheme (state, mainTheme) {
      state.themeColor = mainTheme;
    },
    addOpenSubmenu (state, name) {
      let hasThisName = false;
      let isEmpty = false;
      if (name.length === 0) {
        isEmpty = true;
      }
      if (state.openedSubmenuArr.indexOf(name) > -1) {
        hasThisName = true;
      }
      if (!hasThisName && !isEmpty) {
        state.openedSubmenuArr.push(name);
      }
    },
    closePage (state, name) {
      state.cachePage.forEach((item, index) => {
        if (item === name) {
          state.cachePage.splice(index, 1);
        }
      });
    },
    initCachepage (state) {
      if (localStorage.cachePage) {
        state.cachePage = JSON.parse(localStorage.cachePage);
      }
    },
    removeTag (state, name) {
      console.log('name',name);
      state.pageOpenedList.map((item, index) => {
        if (item.name === name) {
          state.pageOpenedList.splice(index, 1);
        }
      });
      state.historyRoute.forEach((item, index)=>{
        if (item === name) {
          state.historyRoute.splice(index, 1)
        }
      })
    },
    getHistroyRoute (state, name) {
      state.historyRoute.push(name)
    },
    pageOpenedList (state, get) {
      let openedPage = state.pageOpenedList[get.index];
      if (get.argu) {
        openedPage.argu = get.argu;
      }
      if (get.query) {
        openedPage.query = get.query;
      }
      state.pageOpenedList.splice(get.index, 1, openedPage);
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    clearAllTags (state) {
      state.pageOpenedList.splice(1);
      state.cachePage.length = 0;
      state.historyRoute = [];
      state.historyRoute = ['home_index'];
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    clearOtherTags (state, vm) {
      let currentName = vm.$route.name;
      let currentIndex = 0;
      state.pageOpenedList.forEach((item, index) => {
        if (item.name === currentName) {
          currentIndex = index;
        }
      });
      if (currentIndex === 0) {
        state.pageOpenedList.splice(1);
      } else {
        state.pageOpenedList.splice(currentIndex + 1);
        state.pageOpenedList.splice(1, currentIndex - 1);
      }
      let newCachepage = state.cachePage.filter(item => {
        return item === currentName;
      });
      state.cachePage = newCachepage;
      state.historyRoute = ['home_index'];
      state.historyRoute.push(currentName);
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    setOpenedList (state) {
      state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
    },
    setCurrentPath (state, pathArr) {
      state.currentPath = pathArr;
    },
    setCurrentPageName (state, name) {
      state.currentPageName = name;
    },
    setAvator (state, path) {
      localStorage.avatorImgPath = path;
    },
    switchLang (state, lang) {
      state.lang = lang;
      Vue.config.lang = lang;
    },
    clearOpenedSubmenu (state) {
      state.openedSubmenuArr.length = 0;
    },
    setMessageCount (state, count) {
      state.messageCount = count;
    },
    increateTag (state, tagObj) {
      if (!Util.oneOf(tagObj.name, state.dontCache)) {
        state.cachePage.push(tagObj.name);
        localStorage.cachePage = JSON.stringify(state.cachePage);
      }
      state.pageOpenedList.push(tagObj);
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    }
  }
 
