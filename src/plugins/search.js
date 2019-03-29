export default {

    install (Vue) {
        console.log('installing search')
        // get axios
        const http = Vue.prototype.$http

        Vue.prototype.$pageSearch = function (setResult, query, page) {
            this.$http
            .get('/case/search/'+ query + '/' + page)
            .then(response => {
                setResult(response.data)
            })
        }
    }
}