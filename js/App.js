
//This is in sangeetha branch

 var app = (function() {
    var api = {
        views: {},
        models: {},
        collections: {},
        todoInput: null,
        router: null,
        todos: null,
        templates:{},
        init: function() {
          //  this.content = $("#content");//uncomment this for index.html
            this.content = $('section #todo-list');
            
            this.todos=new app.collections.Todos();
            ViewsFactory.menu();
            return this;
        },
        changeContent: function(el) {
            this.content.empty().append(el);
            return this;
        },
        title: function(str) {
            $("h1").text(str);
            return this;
        },
        getCompiledTemplate: function(templateName,callback){
            var self = this,url="",response="";
            if(this.templates && this.templates[templateName] === undefined){
                url = 'js/templates/' + templateName + '.hbs';
                $.ajax({
                    url : 'js/templates/' + templateName + '.hbs',
                    success : function(data) {
                        if (this.templates === undefined) {
                            this.templates = {};
                        }
                        this.templates[templateName] = Handlebars.compile(data);
                        callback(this.templates[templateName]);
                    }
                });
                /*fetch(url).then(function(data){
                    response = data.text();
                }).then(function(response){
                    this.templates[templateName] = Handlebars.compile(response);
                    callback(this.templates[templateName]);
                });*/
            }else{
                callback(this.templates[templateName]);
            }
            return this.templates[templateName];
        }
        
    };
    var ViewsFactory = {
        menu: function() {
            if(!this.menuView) {
                this.menuView = new api.views.menu({ 
                    el: $("header"),
                    model: api.todos
                }).on("saved", function() {
                    api.router.navigate("", {trigger: true});
                });
            }
            return this.menuView;
        },
        list: function() {
            if(!this.listView) {
                this.listView = new api.views.list({
                    model: api.todos,
                    el: $('section #todo-list'),
                });
            }   
            return this.listView;
        },
        form: function() {
            if(!this.formView) {
                this.formView = new api.views.form({
                    el: $("#todo-list"),
                    model: api.todos
                }).on("saved", function() {
                    api.router.navigate("", {trigger: true});
                })
            }
            return this.formView;
        }
    };
    // Router logic
    var Router = Backbone.Router.extend({
        routes: {
            "archive": "archive",
            "new": "newToDo",
            "edit/:index": "editToDo",
            "delete/:index": "deleteToDo",
            "": "list"
        },
        list: function(archived) {
            var view = ViewsFactory.list();
            if(view.model.length){
                $('section,footer').show();
            }else{
                $('section,footer').hide();
            }
           // api.title(archived ? "Archives:" : "Your ToDos:").changeContent(view.$el);
           // view.setMode(archived ? "archived" : null).render();
        },
        newToDo: function() {
            var view = ViewsFactory.form();
           // api.title("Create new ToDo:").changeContent(view.$el);
            view.render()
        },
        editToDo: function(index) {
            var view = ViewsFactory.form();
          //  api.title("Edit:").changeContent(view.$el);
            view.render(index);
        },
        archive: function() {
            this.list("archived");
        },
        deleteToDo: function(index) {
            api.todos.remove(api.todos.at(parseInt(index)));
            api.router.navigate("", {trigger: true});
        }
    });
    api.router = new Router();
    return api;
})();