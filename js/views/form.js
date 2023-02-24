// views/form.js 
app.views.form = Backbone.View.extend({
    index: false,
    events: {
        'click button': 'save'
    },
    initialize: function() {
        this.render();
    },
    render: function(index) {
        var template, html = $("#tpl-form").html(),title="";
        if(typeof index == 'undefined') {
            this.index = false;
            template = _.template(html);
        } else {
            this.index = parseInt(index);
            this.todoForEditing = this.model.at(this.index);
            title = this.todoForEditing.get("title");
            template = _.template($("#tpl-form").html());
        }
        this.$el.html(template({title:title}));
        this.$el.find("textarea").focus();
        this.delegateEvents();
        return this;
    },
    save: function(e) {
        e.preventDefault();
        var title = this.$el.find("textarea").val();
        if(title == "") {
            alert("Empty textarea!"); return;
        }
        if(this.index !== false) {
            this.todoForEditing.set("title", title);
        } else {
            this.model.add({ title: title });
        }   
        this.trigger("saved");      
    }
});