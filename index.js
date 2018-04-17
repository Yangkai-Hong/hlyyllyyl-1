function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function init() {
    loadJSON(function(response) {
        // Parse JSON string into object
        var actual_JSON = JSON.parse(response);
        for(var i=0;i<actual_JSON.length;i++){
            var checkBox = document.createElement("input");
            checkBox.setAttribute('type','checkbox');
            checkBox.setAttribute('class','checkbox');
            var checkbox = document.createElement("td");
            checkbox.appendChild(checkBox);

			var img=document.createElement("img");
			img.src=actual_JSON[i].img;
			img.setAttribute('class','thumbnail');
            var imagine = document.createElement("td");
            imagine.appendChild(img);

            var title = document.createElement("td");
            title.innerHTML = actual_JSON[i].title;
            title.setAttribute('class','title');

            var authors = document.createElement("td");
            authors.innerHTML = actual_JSON[i].authors;

            var year = document.createElement("td");
            year.innerHTML = actual_JSON[i].year;

            var price = document.createElement("td");
            price.innerHTML = actual_JSON[i].price;

            var publisher = document.createElement("td");
            publisher.innerHTML = actual_JSON[i].publisher;

            var category = document.createElement("td");
            category.innerHTML = actual_JSON[i].category;
            category.setAttribute('class','category');

            var tableRow = document.createElement("tr");
            tableRow.appendChild(checkbox);
            tableRow.appendChild(imagine);
            tableRow.appendChild(title);
            tableRow.appendChild(authors);
            tableRow.appendChild(year);
            tableRow.appendChild(price);
            tableRow.appendChild(publisher);
            tableRow.appendChild(category);

            var element = document.getElementById("jsonContent");
            element.appendChild(tableRow);
		}
    });
}

function search()
{
    filter();

    var searchText = document.getElementById('searchText').value.toLowerCase();
    //console.log(m);
    var pattern = new RegExp(searchText);
    var searchArea = document.querySelectorAll(".title");
    var numMatch = 0;

    var e = document.getElementById("filterText");
    var strFilter = e.options[e.selectedIndex].text;
    var filterArea = document.querySelectorAll(".category");

    document.getElementById("boundary").style.display = "none";
    document.getElementById("jsonContent").style.display = "table-row-group";

    if(searchText == ""){
        numMatch = 10;
        for (var i=0;i<searchArea.length;i++){
            searchArea[i].parentElement.style.backgroundColor = "#FFFFFF";
        }
    }
    else {
        for (var i = 0; i < filterArea.length; i++) {
            if (strFilter == "Category" || filterArea[i].innerHTML == strFilter) {
                var result = pattern.test(searchArea[i].innerHTML.toLowerCase());
                if (result == true) {
                    searchArea[i].parentElement.style.backgroundColor = "yellow";
                    numMatch += 1;
                }
                else {
                    searchArea[i].parentElement.style.backgroundColor = "#FFFFFF";
                    numMatch += 0;
                }
            }
            else {
            }
        }
    }
    //after loop finish do...
    //console.log(num_title_match);
    if(numMatch == 0){
        showSearchBoundary();
    }
}

function filter()
{
    var e = document.getElementById("filterText");
    var strFilter = e.options[e.selectedIndex].text;
    var filterArea = document.querySelectorAll(".category");
    var filterResult = 0;

    document.getElementById("boundary").style.display = "none";
    document.getElementById("jsonContent").style.display = "table-row-group";

    if(strFilter == "Category"){
        for (var i = 0; i < filterArea.length; i++) {
            filterArea[i].parentElement.style.display = "table-row";
        }
        filterResult = 10;
    }
    else {
        for (var i = 0; i < filterArea.length; i++) {
            if (filterArea[i].innerHTML != strFilter) {
                filterArea[i].parentElement.style.display = "none";
                filterResult += 0;
            }
            else {
                filterArea[i].parentElement.style.display = "table-row";
                filterResult += 1;
            }
            //console.log(filterArea[i].innerHTML);
        }
    }
    //after loop finish do...
    //console.log(f_result);
    if(filterResult == 0){
        showFilterBoundary();
    }
}

function addBook() {
    var checkBoxs = document.querySelectorAll(".checkbox");
    var element = document.getElementById("bookNum").innerHTML;
    var actualNum = element.substring(1,element.length);
    actualNum = parseInt(actualNum);
    //console.log(j);
    for(var i=0; i<checkBoxs.length; i++){
        if(checkBoxs[i].checked == true){
            actualNum += 1;
            checkBoxs[i].checked = false;
        }
    }
    document.getElementById("bookNum").innerHTML = "("+actualNum+")";
}

function resetCart() {
    var confirmWindow = confirm("Reset the cart?");
    var checkBoxs = document.querySelectorAll(".checkbox");

    if (confirmWindow == true)
    {
        document.getElementById("bookNum").innerHTML = "(0)";
        for(var i=0;i<checkBoxs.length;i++){
            checkBoxs[i].checked = false;
        }
    }
    else{}
}

function showSearchBoundary(){
    var searchText = document.getElementById("searchText").value;

    var e = document.getElementById("filterText");
    var strFilter = e.options[e.selectedIndex].text;
    var filterArea = document.querySelectorAll(".category");

    var searchArea = document.querySelectorAll(".title");

    var caseList = [];

    for(var i=0;i<filterArea.length;i++){
        if(strFilter == "Category"){
            caseList.push("The Arts: A Visual Encyclopedia");
            caseList.push("The Hunger Games");
        }
        else if (filterArea[i].innerHTML == strFilter) {
            caseList.push(searchArea[i].innerHTML);
        }
    }
    //console.log(caseList);
    var case1 = caseList[0];
    var case2 = caseList[1];

    document.getElementById("boundaryText").innerHTML = "Your search term \"" + searchText + "\" does not appear in any title of books in " + "\"" + strFilter + "\"";
    document.getElementById("case1").innerHTML = "· " + case1;
    document.getElementById("case2").innerHTML = "· " + case2;

    document.getElementById("boundary").style.display = "inline";
    document.getElementById("jsonContent").style.display = "none";

    if(strFilter == "Information Technology"){
        showFilterBoundary();
    }
}

function showFilterBoundary() {
    var filterText = document.getElementById("filterText").value;
    document.getElementById("boundaryText").innerHTML = "Your filter term \"" + filterText + "\" does not contain any books.";
    document.getElementById("case1").innerHTML = "· Art";
    document.getElementById("case2").innerHTML = "· Health";

    document.getElementById("boundary").style.display = "inline";
    document.getElementById("jsonContent").style.display = "none";
}

function enterSearch(e) {
    if (e.keyCode == 13) {
        document.getElementById("searchButton").click();
        document.getElementById("searchText").blur();
    }
}

function enterFilter(e){
    if (e.keyCode == 13){
        document.getElementById("filterButton").click();
        document.getElementById("filterText").blur();
    }
}
