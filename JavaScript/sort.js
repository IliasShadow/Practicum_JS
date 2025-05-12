let createSortArr = (data) => {
    let sortArr = [];
    let sortSelects = data.getElementsByTagName('select');
    for (let i = 0; i < sortSelects.length; i++) {
        let keySort = sortSelects[i].value;
        if (keySort == 0) {
            break;
        }
        let desc = document.getElementById(sortSelects[i].id + 'Desc').checked;
        sortArr.push(
          {column: keySort - 1, 
           order: desc}
        ); 
    }
    return sortArr; 
};
let sortTable = (idTable, data) => {
    let sortArr = createSortArr(data);
    if (sortArr.length === 0) {
        return false;
    }
    let table = document.getElementById(idTable);
    let rowData = Array.from(table.rows);
    rowData.shift();
    rowData.sort((first, second) => {
        for(let i in sortArr) {
            let key = sortArr[i].column;
            let ord = sortArr[i].order;
            
                    if (first.cells[key].innerHTML == second.cells[key].innerHTML) {
                        continue;
                    }
                    if (key==4 || key==5) {
                        if (Number(first.cells[key].innerHTML) > Number(second.cells[key].innerHTML)) {
                            let res=(ord)?-1:1;
                            return res;
                        }
                        else if (Number(first.cells[key].innerHTML) < Number(second.cells[key].innerHTML)){
                            let res=(ord)?1:-1;
                            return res;
                        }
                        break;
                    } else {
                        if (first.cells[key].innerHTML > second.cells[key].innerHTML) {
                            let res=(ord)?-1:1;
                            return res;
                        } else if (first.cells[key].innerHTML < second.cells[key].innerHTML){
                            let res=(ord)?1:-1;
                            return res;
                        }
                    }
            
        }
        return 0;
    });
    rowData.forEach(item => {
        table.append(item);
    });
}
let clearSortTable = (data) => {
    let sortSelects = data.getElementsByTagName('select');
    for (let i = 0; i < sortSelects.length; i++) {   
        sortSelects[i].value = 'Нет';
        sortSelects[i].selectedIndex = 0;
        document.getElementById(sortSelects[i].id + 'Desc').checked = false;
    }
    changeNextSelect('fieldsSecond', document.getElementById('fieldsFirst'));
    filterTable(buildings, 'list', document.getElementById('filter'));
}