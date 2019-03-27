import { loadavg } from "os";

export default {

    install (Vue, options) {
        console.log('installing bookmark')
        // get axios
        const http = options.http

        Vue.prototype.$loadBookmarks = function (addBookmarks) {
            console.log('loading...')
            http
            .get('/case/bookmark/7RWOAUUMIHYYTZGLFRJSMRGRYAX9QAYBJDF/0')
            .then(response => {
                addBookmarks(response.data.content)
            })
        }

        Vue.prototype.$saveBookmark = function (id) {
            console.log('save...')
            http
            .put('/case/bookmark/'+id+'/7RWOAUUMIHYYTZGLFRJSMRGRYAX9QAYBJDF')
            .then(response => {
                console.log('saved bookmark with id ' + id)
            })
        }
    
        Vue.prototype.$deleteBookmark = function (id) {
            console.log('delete')
            http
            .delete('/case/bookmark/'+id+'/7RWOAUUMIHYYTZGLFRJSMRGRYAX9QAYBJDF')
            .then(response => {
                console.log('deleted bookmark with id ' + id)
            })
        }

    }
}