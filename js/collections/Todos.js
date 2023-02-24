app.collections.Todos = Backbone.Collection.extend({
	model:app.models.Todo,
	initialize: function(){
		/*this.add({title:"Read Javascript",archived:false,done:true});
		this.add({title:"Complete Backbone app",archived:false,done:false});
		this.add({title:"Start Reactjs",archived:false,done:false});
		this.add({title:"Revamp Backbone App to React",archived:false,done:false});*/
		this.add({title:"Read Javascript",done:false});
		this.add({title:"Complete Backbone app",done:false});
		this.add({title:"Start Reactjs",done:false});
		this.add({title:"Revamp Backbone App to React",done:false});
	},
	up: function(index) {
        if(index > 0) {
            var tmp = this.models[index-1];
            this.models[index-1] = this.models[index];
            this.models[index] = tmp;
            this.trigger("change");
        }
    },
    down: function(index) {
        if(index < this.models.length-1) {
            var tmp = this.models[index+1];
            this.models[index+1] = this.models[index];
            this.models[index] = tmp;
            this.trigger("change");
        }
    },
	/*archive: function(archived, index) {
        this.at(index).set("archived", archived);
    },*/
    changeStatus: function(done, index) {
        this.at(index).set("done", done);
    },

    deleteTodo: function(index){
    	this.remove(this.models.at(parseInt(index)));
    	this.at(index).destroy();
    }
})