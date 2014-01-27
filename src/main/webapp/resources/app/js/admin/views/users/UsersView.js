define(function (require) {
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');
    var $ = require('jquery');
    var _ = require('underscore');

    var Users = require('app/js/admin/collections/Users');
    var User = require('app/js/admin/models/User');
    var UserRowView = require('app/js/admin/views/users/UserRowView');

    var userTable = require('text!app/js/admin/templates/users/userTable.hbs');

    return Backbone.View.extend({
        events: {
            'click #btn-user-create': '_create'
        },
        bindings: {
            '#username': 'username',
            '#email': 'email',
            '#firstName': 'firstName',
            '#lastName': 'lastName'
        },

        userTableTemplate: Handlebars.compile(userTable),

        initialize: function () {
            this.listenTo(this.collection, 'sync add', this.renderTable);
            this.listenTo(this.collection, 'all', function () {
                //console.log(arguments);
            });
            this.model = new User();
        },
        render: function () {
            this.$el.html(this.userTableTemplate());
            this.stickit();
            return this;
        },
        renderTable: function () {
            var $tbody = this.$('tbody');
            this.collection.each(function (user) {
                $tbody.append(new UserRowView({
                    model: user
                }).render().el)
            });
            return this;
        },

        _create: function () {
            console.log(this.model);
            this.collection.add(this.model);
            this.model = new User();
        }
    });
});