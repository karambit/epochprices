var items = [];
var types = {};
var mode = "All";
var special = ["Ammunition", "Clothing", "Helicopter Armed", "Military Armed", "Trucks Armed", "Weapons"];

$(function() {
	var displayTable = $(".display");

	for (var i = 0; i < traders_data_items_new.length; i++) {
		var temp = traders_data_items_new[i];

		var name = temp.item;
		var buy = temp.buy;
		var sell = temp.sell;
		var type = temp.category;
		var trader;

		if ( typeof temp.trader === 'undefined') {
			trader = "Normal";
		} else {
			trader = temp.trader;
		}
		var nick = name.replace(" ", "");

		items.push([name, buy, sell, type, trader, nick]);

		if ( typeof (types[type]) == "undefined") {
			types[type] = [];
		}
		types[type].push([name, buy, sell, type, trader, nick]);
	}

	var keys = Object.keys(types);
	keys.sort();

	for (var i = 0; i < keys.length; i++) {
		var tempLink = $('<button type="button" class="btn">').html(keys[i]);
		if (special.contains(keys[i])) {
			tempLink.addClass("btn-info");
		} else if (keys[i].indexOf("Black") != -1) {
			tempLink.addClass("btn-danger");
		} else {
			tempLink.addClass("btn-default");
		}
		$(".typelist").append(tempLink);
	}

	switchTables(mode);

	$("button").click(function(ab) {
		switchTables($(this).html());
	});
});

function switchTables(m) {
	$(".table").empty();

	var dataSource;
	if (m.indexOf("All") != -1) {
		dataSource = items;
	} else {
		dataSource = types[m];
	}

	var dataTable = $(".table").dataTable({
		"bPaginate" : false,
		"bLengthChange" : false,
		"bFilter" : true,
		"bInfo" : false,
		"bAutoWidth" : false,
		"aaData" : dataSource,
		"aoColumns" : [{
			"sTitle" : "Name"
		}, {
			"sTitle" : "Buy",
		}, {
			"sTitle" : "Sell",
		}, {
			"sTitle" : "Type"
		}, {
			"sTitle" : "Trader"
		}, {
			"bVisible" : false
		}],
		"bDestroy" : true,
		"oLanguage" : {
			"sSearch" : "Quick Search: "
		}
	});

	$(".dataTables_wrapper").addClass("col-md-10");
	$("label input").addClass("form-control").attr("placeholder", "Item Classname Ex: LRR, SUV, UH1H");

	$("tr:contains('Hero Trader')").css("background-color", "#90EE90");
	$("tr:contains('Bandit Trader')").css("background-color", "#EE9090");

	$("td").click(function() {
		switchTables("All");
		var clicked = $(this).html();
		$("input").val(clicked);
		dataTable.fnFilter(clicked);
	});
}

Array.prototype.contains = function(obj) {
	var i = this.length;
	while (i--) {
		if (this[i] === obj) {
			return true;
		}
	}
	return false;
};
