
export default {

    install (Vue) {
        console.log('installing bookmark')
        // get axios
        const http = Vue.prototype.$http

        Vue.prototype.$loadBookmarks = function (addToVuex, advisorId) {
            console.log('loading...')
            http
            .get('/case/bookmark/'+advisorId+'/0')
            .then(response => {
                addToVuex(response.data.content)
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
    
        Vue.prototype.$deleteBookmark = function (caseId, advisorId, deleteFromVuex) {
            console.log('delete')
            http
            .delete('/case/bookmark/'+caseId+'/'+advisorId)
            .then(response => {
                deleteFromVuex(caseId)
                console.log('deleted bookmark with id ' + caseId)
            })
        }

    }
}