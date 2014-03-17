window.Trellino.Views.BoardShowView = Backbone.CompositeView.extend({
	template: JST["boards/show"],
	
	initialize: function () {
		this.model.lists().fetch();
		this.listenTo(this.model.lists(), "add sync", this.render);
	},
	
	events: {
		"click .addList" : "addList"
	},
	
	render: function () {
		var renderedContent = this.template({
			board: this.model,
			// lists: this.model.lists(),
		})
		this.$el.html(renderedContent)
		
		this.renderLists();
		
		this.$("#lists").sortable({
			
		});
		
	    // this.$('ul.list_list').sortable({
	    //   tolerance: 'pointer',
	    //   start: function (event, ui) {
	    //     $(ui.item).toggleClass('dragged');
	    //   },
	    //   stop: function (event, ui) {
	    //     $(ui.item).toggleClass('dragged');
	    //     that._realignBoard($(event.target));
	    //   }
	    // });
	    // 
	    // var flexwidth = (this.collection.length > 1 ? 270 * this.collection.length : 280);
	    // this.$el.find('#list_index').outerWidth(flexwidth);
		
		return this
	},
	
    renderLists: function () {
      this.model.lists().each(function (list) {
        var view = new Trellino.Views.ListShow({
          model: list
        });
        this.addSubView('#lists', view.render());
      }, this);
    },
	
	addList: function() {
		var listTitle = this.$(".add-list").val();
		this.model.lists().create({
			title: listTitle,
			board_id: this.model.id,
			rank: this.model.lists().length+1
		});
	},
	
    _realignBoard: function ($ul) {
      var listItems = $ul.find('li');

      var rankIndex = 1;
      $(listItems).each(function (index, item) {
        if ($(item).hasClass('list_entry')) {
          var list = Trellino.lists.get($(item).data('id'));
          list.set({
            rank: rankIndex
          });
          list.save({
            silent: true
          });
          rankIndex++;
        }
      });
    }
	
})