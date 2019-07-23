let rootNode = document.getElementById('root');
let list = document.getElementById('todoList');
const input = document.querySelector('input')
const addButton = document.getElementById('addToList');
const maxListItems = 10;
let count = 0;
let srcEl;
let data = [{
    text: 'Find the cat',
    done: false
},
{
    text: 'Prepare cat\'s carry',
    done: false
},
{
    text: 'Bathe a cat',
    done: false
}
];
function newElement() {
    if (count < maxListItems) {
        let li = document.createElement('li');
        let inputValue = document.getElementById('toDoEl').value;
        if (inputValue === '' || inputValue === null) {
            alert('Enter your action!');
        } else {
            li.innerHTML = `
				<div class = 'flex-wrap'>
					<div class='action'>
						<input type='checkbox' id='check'>
						${inputValue}
						<i class='material-icons input-box edit-btn'>edit</i>
					</div>
					<i class='material-icons input-box remove-btn'>delete</i>
				</div>`;
            let ul = document.getElementById('list');
            ul.appendChild(li);
            document.getElementById('toDoEl').value = '';
        }
        count += 1;
        console.log(count);
    } else {
        let header = document.getElementById('main-header');
        header.innerHTML = `<h3>Maximum item per list are created</h3>`;
    }
}

addButton.addEventListener('click', addToList);
input.addEventListener('input', inputOnChangeHandler);

function inputOnChangeHandler() {
    addButton.classList.remove('disabled');
    if (!input.value) {
        addButton.classList.add('disabled');
    }
}

function addToList() {
    if (input.value) {
        data.push({
            text: input.value,
            done: false
        });
        drawListItem({
            text: input.value,
            done: false
        }, data.length - 1);
        input.value = null;
        addButton.classList.add('disabled');
    }
}

//Actions

function checkItemList(i) {
    data[i].done = true;
    renderList();
}

function editListItem(i, value) {
    data[i]['text'] = value;
    renderList();
}

function deleteListItem(i) {
    data.splice(i, 1);
    renderList();
}

//Drag and drop

function dragStart(e) {
    srcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave(e) {
    e.stopPropagation();
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function dragDrop(e) {
    if (srcEl !== this) {
        srcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}

function dragEnd() {
    getData();
    renderList();
}

//Render functions

function drawListItem(item, i) {
    const alert = document.getElementsByClassName('alert');
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    const edit = createIcon('edit');
    const remove = createIcon('delete');
    const p = document.createElement('p')

    remove.setAttribute('id', 'delete');
    li.setAttribute('draggable', true);
    li.classList.add('draggable');
    if (!item.done) {
        checkbox.addEventListener('change', function () {
            checkItemList(i);
        })
    } else {
        checkbox.setAttribute('disabled', '');
        li.classList.add('checked');
    }
    checkbox.setAttribute('type', 'checkbox');
    item.done ? checkbox.setAttribute('checked', '') : null;
    applyDragListeners(li);
    edit.addEventListener('click', function () {
        const li = document.querySelectorAll('li');
        const parent = this.parentElement;
        const input = document.createElement('input');
        const save = createIcon('save');

        li.forEach(item => {
            item.removeAttribute('draggable');
        })
        input.classList.add('edit_input');
        input.value = data[i].text;
        while (parent.lastChild) {
            parent.removeChild(parent.lastChild);
        }
        parent.appendChild(input);
        save.addEventListener('click', function () {
            const inputEdit = this.parentElement.firstChild.value;
            editListItem(i, inputEdit);
        })
        parent.appendChild(save);
    })
    remove.addEventListener('click', function () {
        const $this = this;
        removeItemHandler(i, $this);
    });

    li.appendChild(checkbox);
    p.textContent = item.text;
    li.appendChild(p);
    li.appendChild(edit);
    li.appendChild(remove);
    list.appendChild(li);

    if (data.length === maxListItems) {
        input.setAttribute('disabled', true);
        alert[0].style.opacity = 1;
    } else {
        input.removeAttribute('disabled');
        alert[0].style.opacity = 0;
    }
}

function applyDragListeners(el) {
    el.addEventListener('dragstart', dragStart, false);
    el.addEventListener('dragenter', dragEnter, false);
    el.addEventListener('dragover', dragOver, false);
    el.addEventListener('dragleave', dragLeave, false);
    el.addEventListener('drop', dragDrop, false);
    el.addEventListener('dragend', dragEnd, false);
}

function getData() {
    let list = document.getElementById('todoList');
    let done = document.querySelectorAll('input[type=checkbox]');
    let newData = [];
    list.childNodes.forEach((node, i) => {
        let text = '';
        let doneItem = done[i].checked;
        node.childNodes.forEach((item) => {
            if (item.tagName === 'P') {
                text = item.textContent
            }
        })
        newData.push({
            text: text,
            done: doneItem
        });
    });
    data = newData;
}

function removeItemHandler(i, $this) {
    deleteListItem(i)
    const parent = $this.parentNode;
    parent.remove();
}

function renderList() {
    list.innerHTML = '';
    data.forEach(function (item, i) {
        drawListItem(item, i);
    })
}

function createIcon(text) {
    const i = document.createElement('i');
    i.classList.add('material-icons');
    i.textContent = text;
    return i;
}

renderList();