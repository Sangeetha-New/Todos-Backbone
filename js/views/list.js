app.views.list = Backbone.View.extend({
    //mode: null,
    completedTodos:[],
    events: {},
    initialize: function() {
        var handler = _.bind(this.render, this);
        this.model.bind('change', handler);
        this.model.bind('add', handler);
        this.model.bind('remove', handler);
        this.render();
    },
    events: {
        'click a[data-up]': 'priorityUp',
        'click a[data-down]': 'priorityDown',
       // 'click a[data-archive]': 'archive',
       // 'click input[data-status]': 'changeStatus'
         'click input.todoDone': 'changeStatus',
         'click .deleteTodo':'deleteTodo',
       //  'click .clearDoneTodo':'deleteCompletedTodos'
    },
    render: function() {
        var listHtml = '', 
        self = this;
        //var template = _.template($("#tpl-list-item").html());
        self.completedTodos=new Set();
        app.getCompiledTemplate("listViewTemplate",function(compiledTemplate){  
            self.model.each(function(todo, index) {
                if(todo.get('done')){ self.completedTodos.add(index); }              
                var templateObject = { 
                    title: todo.get("title"),
                    index: index,
                    done: todo.get("done") ? "yes" : "no",
                    doneChecked: todo.get("done")  ? 'checked' : "",
                    doneClass: todo.get("done")  ? new Handlebars.SafeString('class="strikeTodo"') : ""
                }
                listHtml += compiledTemplate(templateObject); 
            });
            self.$el.html(listHtml);
            self.changeFooter();
            self.delegateEvents();
        });
        
        /*self.completedTodos=[];
        this.model.each(function(todo, index) {
            if(todo.get('done')){ self.completedTodos.push(index); }
            html += template({ 
                title: todo.get("title"),
                index: index,
                done: todo.get("done") ? "yes" : "no",
                doneChecked: todo.get("done")  ? 'checked=="checked"' : "",
                doneClass: todo.get("done")  ? 'class="strikeTodo"' : ""
            });
        });
        this.$el.html(html);
        this.changeFooter();
        this.delegateEvents();*/
        return this;
    },

    priorityUp: function(e) {
        var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index"));
        this.model.up(index);
    },
    priorityDown: function(e) {
        var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index"));
        this.model.down(index);
    },
    archive: function(e) {
        var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index"));
        this.model.archive(this.mode !== "archive", index); 
    },
    changeStatus: function(e) {
        var index = parseInt(e.target.parentNode.getAttribute("data-index"));
        this.model.changeStatus(e.target.checked, index);       
    },
    changeFooter: function(){
        if(this.model.length){
            $('section,footer').show();
        }else{
            $('section,footer').hide();
        }
        $('footer #todoSelected').html(this.completedTodos.size);
        this.completedTodos.size>0?$('footer .clearDoneTodo').show():$('footer .clearDoneTodo').hide();
        //bind event
        $('footer').on('click', '.clearDoneTodo',this.deleteCompletedTodos.bind(this));
        $('section').on('click', '#selectAllTodo',this.selectAllTodo.bind(this));
    },
    deleteTodo: function(e) {
        var index = parseInt(e.target.parentNode.getAttribute("data-index"));
        this.model.deleteTodo(index);
    },
    deleteCompletedTodos: function(e) {
        /*for(let i=0;i<this.completedTodos.length;i++){
            this.model.deleteTodo(this.completedTodos[i]);
        }*/
        for(const i of this.completedTodos.keys()){
            this.model.deleteTodo(i);
        }
    },
    selectAllTodo: function(e){
        for(let i=0;i<this.model.length;i++){
            if(e.target.checked){
                this.model.changeStatus(true, i);   
            }else{
                this.model.changeStatus(false, i); 
            }
        }
    },
    setMode: function(mode) {
        this.mode = mode;
        return this;
    }
});