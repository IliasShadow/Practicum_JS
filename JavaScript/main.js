let createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}
let setSortSelect = (arr, sortSelect) => {
    sortSelect.append(createOption('Нет', 0));
    for (let i in arr) {
        sortSelect.append(createOption(arr[i], Number(i) + 1));
    }
}
let setSortSelects = (data, dataForm) => { 
    let head = Object.keys(data[0]);
    let allSelect = dataForm.getElementsByTagName('select');
    for(let j = 0; j < allSelect.length; j++) {
        setSortSelect(head, allSelect[j]);
        if (j > 0) {
            allSelect[j].disabled = true;
        }
    }
}
let changeNextSelect = (nextSelectId, curSelect) => {
    let nextSelect = document.getElementById(nextSelectId);
    nextSelect.disabled = false;
    nextSelect.innerHTML = curSelect.innerHTML;
    if (curSelect.value != 0) {
       nextSelect.remove(curSelect.value);
    } else {
        nextSelect.disabled = true;
    }
}
document.addEventListener("DOMContentLoaded", function() {
    createTable(buildings, 'list');
    let clearFilt = document.getElementById('clearFilter');
    document.getElementById('find').onclick = function() {
        filterTable(buildings, "list", document.getElementById("filter"))
    }
    document.getElementById('clearFilter').onclick = function(){
        clearFilter("list", buildings, document.getElementById("filter"));
        clearSortTable(document.getElementById('sort'));
    }
    setSortSelects(buildings,document.getElementById("sort"));
    document.getElementById("fieldsFirst").onchange = function() {
        changeNextSelect('fieldsSecond', document.getElementById('fieldsFirst'));
    };
    document.getElementById("sortTable").onclick = function() {
        sortTable('list', document.getElementById('sort'));
    };
});

