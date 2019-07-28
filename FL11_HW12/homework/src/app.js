const rootNode = document.getElementById('root');
let todoItems = [];

const storage = {
    add(description) {
        const id = 'task_' + +new Date();
        const item = { description, id, isDone: false };
        todoItems.push(item);
        localStorage.setItem('todoItems', JSON.stringify(todoItems));
        return todoItems;
    },

    getAll() {
        return JSON.parse(localStorage.getItem('todoItems'));
    },

    getById(id) {
        return this.getAll().find(item => item.id === id);
    },

    getDone() {
        return this.getAll().filter(item => item.isDone === true);
    },

    getUndone() {
        return this.getAll().filter(item => item.isDone === false);
    },

    getSorted() {
        return this.getUndone().concat(this.getDone());
    },

    setAsDoneById(id) {
        const updatedList = this.getAll().map(item => {
            if (item.id === id) {
                item.isDone = true;
            }

            return item;
        });

        localStorage.setItem('todoItems', JSON.stringify(updatedList));
        return todoItems;
    },

    changeDescription(id, description) {
        const updatedList = this.getAll().map(item => {
            if (item.id === id) {
                item.description = description;
            }

            return item;
        });

        localStorage.setItem('todoItems', JSON.stringify(updatedList));
        return todoItems;
    },

    removeById(id) {
        const updatedList = this.getAll().filter(item => item.id !== id);
        localStorage.setItem('todoItems', JSON.stringify(updatedList));
        return todoItems;
    }
};

const createElement = (tag, attributes = {}, innerText = '') => {
    const element = document.createElement(tag);

    if (Object.keys(attributes).length) {
        for (let key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                element.setAttribute(key, attributes[key]);
            }
        }
    }

    if (innerText) {
        element.appendChild(document.createTextNode(innerText));
    }

    return element;
};

const template = {
    main(todoItems) {
        const section = createElement('section', { 'id': 'main-section' });
        const header = createElement('h1', {}, 'Simple TODO application');
        const addNewBtn = createElement('button', { 'id': 'add-new-task' }, 'Add new task');
        const todoList = createElement('ul', { 'id': 'todo-list' });
        const emptyList = createElement('p', { 'class': 'empty-todo' }, 'TODO is empty');
        addNewBtn.onclick = () => {
            window.location.hash = '/add';
        };

        section.appendChild(header);
        section.appendChild(addNewBtn);
        section.appendChild(todoList);
        section.appendChild(emptyList);

        if (todoItems.length) {
            for (let item of todoItems) {
                const li = createElement('li', { 'id': item.id });
                const checkbox = createElement('button', {
                    'class': item.isDone ? 'checkbox-done' : 'checkbox-undone'
                });
                const todoText = createElement('button', {
                    'class': 'todo-text',
                    'title': 'Click to edit'
                }, item.description);
                const remove = createElement('button', { 'class': 'remove' });

                checkbox.onclick = () => {
                    if (checkbox.className === 'checkbox-undone') {
                        checkbox.className = 'checkbox-done';
                        storage.setAsDoneById(item.id);
                        todoList.appendChild(li);
                    }
                };

                todoText.onclick = () => {
                    window.location.hash = `/modify/${item.id}`;
                };

                remove.onclick = () => {
                    li.remove();
                    storage.removeById(item.id);
                };

                li.appendChild(checkbox);
                li.appendChild(todoText);
                li.appendChild(remove);

                todoList.appendChild(li);
            }
        }
        return section;
    },

    add() {
        const section = createElement('section', { 'id': 'add-section' });
        const header = createElement('h1', {}, 'Add task');
        const input = createElement('input', {
            'type': 'text',
            'placeholder': 'Task description'
        });
        const footer = createElement('footer');
        const cancel = createElement('button', { 'class': 'cancel-btn' }, 'Cancel');
        const save = createElement('button', {
            'class': 'save-changes-btn',
            'disabled': 'true'
        }, 'Save changes');
        input.onchange = input.onkeyup = () => {
            const description = input.value.trim();

            save.disabled = !description;

            if (event.code === 'Enter' && description) {
                save.click();
            }
        };
        cancel.onclick = () => {
            window.location.hash = '/main';
        };
        save.onclick = () => {
            storage.add(input.value.trim());
            window.location.hash = '/main';
        };
        footer.appendChild(cancel);
        footer.appendChild(save);
        section.appendChild(header);
        section.appendChild(input);
        section.appendChild(footer);
        return section;
    },

    modify(task) {
        const section = this.add();
        section.id = 'modify-section';
        section.querySelector('h1').textContent = 'Modify item';
        section.querySelector('input').value = task.description;
        section.querySelector('.save-changes-btn').onclick = () => {
            storage.changeDescription(task.id, section.querySelector('input').value.trim());
            window.location.hash = '/main';
        };
        return section;
    }
};

const route = {
    load() {
        const hash = window.location.hash;
        if (hash.endsWith('/add')) {
            this.add();
        } else if ((/\/modify\/task_\d+$/).test(hash)) {
            const id = hash.slice(hash.lastIndexOf('/') + 1);
            this.modify(id);
        } else {
            this.main();
        }
    },

    main() {
        window.history.pushState('', '/', window.location.pathname);
        document.title = 'Main page';
        rootNode.innerHTML = '';
        rootNode.appendChild(template.main(todoItems));
    },

    add() {
        document.title = 'Add new task';
        rootNode.innerHTML = '';
        rootNode.appendChild(template.add());
    },

    modify(id) {
        const item = storage.getById(id);
        document.title = `Modify ${item.description}`;
        rootNode.innerHTML = '';
        rootNode.appendChild(template.modify(item));
    }
};

window.onload = window.onhashchange = () => {
    if (localStorage.getItem('todoItems')) {
        todoItems = storage.getSorted();
    }

    route.load();
};