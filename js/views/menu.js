app.views.menu=Backbone.View.extend({
	index:false,
	template: _.template($("#tpl-menu").html()),
	events:{
	//	'click #listTodo': 'listTodos'
		'keypress #todoContent':'createTodo'
	},
    initialize: function() {
        this.render();
    },
    render: function(){
    	var self = this;
    	app.getCompiledTemplate("menuTemplate",function(compiledTemplate){ 
	    	self.$el.find('h1').after(compiledTemplate);
	        self.delegateEvents(); 
    	});
        
    },
    createTodo: function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
          event.preventDefault();
          var todoText = $(event.target).val();
          if(todoText == "") {
            alert("Empty textarea!"); return;
          }
          if(this.index !== false) {
            this.todoForEditing.set("title", title);
          } else {
            this.model.add({ title: todoText });
          }
          $(event.target).val("");
          this.trigger("saved");  
        }
    },

    listTodos:function(){
    	app.router.navigate("", {trigger: true});
    }

})