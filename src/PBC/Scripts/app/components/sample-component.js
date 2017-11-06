var data = { message: "Hello Components" }

Vue.component('sample-component', {
    template: '<p>{{message}}</p>',

    data: function () {
        return data
    }
})