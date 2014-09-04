var items = [];
var types = {};
var mode = "All";
//var special = ["Ammunition", "Clothing", "Helicopter Armed", "Military Armed", "Trucks Armed", "Weapons"];

$(function() {
	var displayTable = $(".display");

	for (var i = 0; i < traders_data_items_new.length; i++) {
		var temp = traders_data_items_new[i];

		var name = temp.item;
		var buy = temp.buy;
		var sell = temp.sell;
		// var store = temp.desc;
		var type = temp.category;
		var nick = name.replace(" ", "");

		items.push([name, buy, sell, type, nick]);

		if ( typeof (types[type]) == "undefined") {
			types[type] = [];
		}
		types[type].push([name, buy, sell, type, nick]);
	}

	var keys = Object.keys(types);
	keys.sort();

	for (var i = 0; i < keys.length; i++) {
		var tempLink = $('<button type="button" class="btn">').html(keys[i]);
		tempLink.addClass("btn-default");
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
			"sType" : "money"
		}, {
			"sTitle" : "Sell",
			"sType" : "money"
		}, {
			"sTitle" : "Type"
		}, {
			"bVisible" : false
		}],
		"bDestroy" : true
	});

	$(".dataTables_wrapper").addClass("col-md-10");
	$("label input").addClass("form-control").attr("placeholder", "Item Classname Ex: LRR, SUV, UH1H");

	$("tr:contains('Hero')").css("background-color", "#90EE90");
	$("tr:contains('Bandit')").css("background-color", "#EE9090");
	$("tr:contains('Friendly')").css("background-color", "#eeee90");

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

$.extend($.fn.DataTable.ext.oSort, {
	"money" : function(a) {
		return a;
	},
	"money-asc" : function(x, y) {
		x = convert(x);
		y = convert(y);
		return Number(x) - Number(y);
	},
	"money-desc" : function(x, y) {
		x = convert(x);
		y = convert(y);
		return Number(y) - Number(x);
	}
});
