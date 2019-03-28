
export default {

    install (Vue) {
        console.log('installing cases')
        // get axios
        const http = Vue.prototype.$http

        Vue.prototype.$loadBookmarks = function (addBookmarks, advisorId) {
            console.log('loading...')
            http
            .get('/case/bookmark/'+advisorId+'/0')
            .then(response => {
                addBookmarks(response.data.content)
            })
        }
    }
}