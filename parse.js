var items = {};

$(function() {
	for (var i = 0; i < traders_data_items.length; i++) {
		var temp = traders_data_items[i];
		items[temp.item] = {
			buy: temp.buy,
			sell: temp.sell
		};
	}
});
