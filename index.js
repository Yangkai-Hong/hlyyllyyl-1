function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
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
            var checkbox = document.createElement("input");
            checkbox.setAttribute('type','checkbox');
            checkbox.setAttribute('class','checkbox');

			var img=document.createElement("img");
			img.src=actual_JSON[i].img;
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

            var each_row = document.createElement("tr");
            each_row.appendChild(checkbox);
            each_row.appendChild(imagine);
            each_row.appendChild(title);
            each_row.appendChild(authors);
            each_row.appendChild(year);
            each_row.appendChild(price);
            each_row.appendChild(publisher);
            each_row.appendChild(category);

            var element = document.getElementById("json_content");
            element.appendChild(each_row);
		}
    });
}

function Search()
{
    var m = document.getElementById('link_id').value;
    var searchArea = document.querySelectorAll(".title");
    var result = 0;
    for (var i=0;i<searchArea.length;i++){
        if(m == searchArea[i].innerHTML){
            document.getElementById("boundary1").style.display = "none";
            document.getElementById("json_content").style.display = "inline";
            //console.log(searchArea[i].innerHTML);
            searchArea[i].parentElement.style.backgroundColor = "yellow";
            result = 1;
        }
            else{
            searchArea[i].parentElement.style.backgroundColor = "#FFFFFF";
        }
    }
    //after loop finish do...
    if(result == 0){
        dynamic();
        document.getElementById("boundary1").style.display = "inline";
        document.getElementById("json_content").style.display = "none";
    }
    if(m == ""){
        reloadPage();
    }
}

function Filter()
{
    var e = document.getElementById("f_content");
    var strFilter = e.options[e.selectedIndex].text;
    var filterArea = document.querySelectorAll(".category");
    var f_result = 0;

    if(strFilter == "All"){
        reloadPage();
    }
    else {
        document.getElementById("boundary1").style.display = "none";
        document.getElementById("json_content").style.display = "table";
        for (var i = 0; i < filterArea.length; i++) {
            if (filterArea[i].innerHTML != strFilter) {
                filterArea[i].parentElement.style.display = "none";
                f_result += 0;
            }
            else {
                filterArea[i].parentElement.style.display = "table-row";
                f_result += 1;
            }
            //console.log(filterArea[i].innerHTML);
        }
    }
    //after loop finish do...
    console.log(f_result);
    if(f_result == 0){
        dynamic_filter();
        document.getElementById("boundary1").style.display = "inline";
        document.getElementById("json_content").style.display = "none";
    }
}

function Add() {
    var checkboxs = document.querySelectorAll(".checkbox");
    var len = document.getElementById("num").innerHTML.length;
    var j = document.getElementById("num").innerHTML.substring(1,len);
    j = parseInt(j);
    //console.log(j);
    for(var i=0;i<checkboxs.length;i++){
        if(checkboxs[i].checked == true){
            j = j+1;
        }
    }
    document.getElementById("num").innerHTML = "("+j+")";
}

function Reset() {
    var r = confirm("Reset the cart?");
    if (r==true)
    {
        document.getElementById("num").innerHTML = "(0)";
    }
    else{}
}

function reloadPage()
{
    window.location.reload()
}

function dynamic(){
    var searchText = document.getElementById("link_id").value;
    document.getElementById("dynamic").innerHTML = "Your search \"" + searchText + "\" did not match any title of books.";
    document.getElementById("example1").innerHTML = "· The Arts: A Visual Encyclopedia";
    document.getElementById("example2").innerHTML = "· The Hunger Games";
}

function dynamic_filter() {
    var filterText = document.getElementById("f_content").value;
    document.getElementById("dynamic").innerHTML = "Your filter \"" + filterText + "\" did not contain any books.";
    document.getElementById("example1").innerHTML = "· Art";
    document.getElementById("example2").innerHTML = "· Health";
}