export default {

    install (Vue) {
        console.log('installing search')
        // get axios
        const http = Vue.prototype.$http

        Vue.prototype.$pageSearch = function (setResult, query, page) {
            this.$http
            .get('/search/'+ query + '/' + page)
            .then(response => {
                setResult(response.data)
            })
        }

        Vue.prototype.$pageSuggestionSearch = function (setResult, query, advisorId, page) {
            this.$http
            .get('/search/suggestionterm/'+ query + '/' + advisorId + '/' + page)
            .then(response => {
                setResult(response.data)
            })
        }

        Vue.prototype.$simpleSuggest = function (setResult, query) {
            this.$http
            .get('/search/simplesuggest/'+ query)
            .then(response => {
                setResult(response.data)
            })
        }

        Vue.prototype.$complexSuggest = function (setResult, query, advisorId) {
            this.$http
            .get('/search/complexsuggest/'+ query + '/' + advisorId)
            .then(response => {
                setResult(response.data)
            })
        }
    }
}