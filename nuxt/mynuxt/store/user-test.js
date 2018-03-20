// import Cookies from 'js-cookie';
export const state = () => ({
    test: 'test-vuex'
})
export const mutations = {
    logout (state, vm) {
        console.log('arguments',...arguments)
    }
}