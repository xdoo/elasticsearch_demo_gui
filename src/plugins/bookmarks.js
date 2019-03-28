
export default {

    install (Vue) {
        console.log('installing bookmark')
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

        Vue.prototype.$saveBookmark = function (caseId, advisorId) {
            console.log('save...')
            http
            .put('/case/bookmark/'+caseId+'/'+advisorId)
            .then(response => {
                console.log('saved bookmark with id ' + caseId)
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