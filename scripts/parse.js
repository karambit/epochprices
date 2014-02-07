var items = [];
var types = {};
var mode = "All";

$(function() {
	var displayTable = $(".display");

	for (var i = 0; i < traders_data_items.length; i++) {
		var temp = traders_data_items[i];

		var name = JSON.parse(temp.item)[0];
		var buy = format(JSON.parse(temp.buy));
		var sell = format(JSON.parse(temp.sell));
		var store = temp.desc;
		var type = temp.name;

		items.push([name, buy, sell, store, type]);

		if ( typeof (types[type]) == "undefined") {
			types[type] = [];
		}
		types[type].push([name, buy, sell, store, type]);
	}

	var keys = Object.keys(types);
	keys.sort();

	for (var i = 0; i < keys.length; i++) {
		var tempLink = $('<button type="button" class="btn btn-default">').html(keys[i]);
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
	if (m == "All") {
		dataSource = items;
	} else {
		dataSource = types[m];
	}

	$(".table").dataTable({
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
			"sTitle" : "Store"
		}, {
			"sTitle" : "Type"
		}],
		"bDestroy" : true
	});

	$(".dataTables_wrapper").addClass("col-md-10");
	$("label input").addClass("form-control").attr("placeholder", "Item Classname Ex: LRR, SUV, UH1H");

	$("tr:contains('Hero')").css("background-color", "#90EE90");
	$("tr:contains('Bandit')").css("background-color", "#EE9090");
}

function convert(x) {
	x = x.replace("x ", "");
	x = x.replace("Briefcase", "000000");
	x = x.replace("Gold", "0000");
	x = x.replace("Silver", "00");
	x = x.replace("Tin", "");
	return x;
}

function format(item) {
	var amount = item[0];

	// handles only 10oz, not briefs
	if (item[1].indexOf("100oz") == -1 && item[1].indexOf("10oz") != -1) {
		amount += "0";
	}

	return amount + "x " + item[1].replace(/Item|Bar|10oz|100oz/gi, "");
}

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
