$(function () {
  const dom = {
    new: $('.todo__new input'),
    add: $('.todo__add'),
    tasks: $('.todo__list'),
    count: $('.count'),
  }

  const arrTasks = []

  $(dom.add).click(function (e) {
    e.preventDefault()
    const newTaskText = dom.new.val()
    if (newTaskText && isNotHaveTask(newTaskText, arrTasks)) {
      addTask(newTaskText, arrTasks)
      dom.new.val('')
      renderTasks(arrTasks)
    }
  })

  const addTask = (text, list) => {
    const task = {
      id: Date.now(),
      text: text,
      isComplete: false,
    }

    list.push(task)
    console.log(list)
  }

  const isNotHaveTask = (text, list) => {
    let isNotHave = true

    list.forEach(task => {
      if (task.text === text) {
        alert('Задача уже есть!')
        isNotHave = false
      }
    })
    return isNotHave
  }

  const renderTasks = list => {
    const htmlList = []

    list.forEach(task => {
      const cls = task.isComplete
        ? 'todo__task todo__task_complete'
        : 'todo__task'
      const isChecked = task.isComplete ? 'checked' : ''

      const taskHtml = `
        <div id="${task.id}" class="${cls}">
        <label class="todo__checkbox">
            <input type="checkbox" ${isChecked}>
            <div class="todo__checkbox-div"></div>
        </label>
        <div class="todo__task-text">
            ${task.text}
        </div>
        <div class="todo__task-del">-</div>
    </div>`

      htmlList.unshift(taskHtml)
    })

    dom.tasks.html(htmlList.join(''))
    renderTasksCount(list)
  }

  $(dom.tasks).click(function (e) {
    const target = e.target
    if (target.classList.contains('todo__checkbox-div')) {
      const taskId = target.parentElement.parentElement.getAttribute('id')
      changeTaskStatus(taskId, arrTasks)
      renderTasks(arrTasks)
    }

    if (target.classList.contains('todo__task-del')) {
      const taskId = target.parentElement.getAttribute('id')
      deleteTask(taskId, arrTasks)
      renderTasks(arrTasks)
    }
  })

  const changeTaskStatus = (id, list) => {
    list.forEach(task => {
      if (task.id == id) {
        task.isComplete = !task.isComplete
      }
    })
  }

  const deleteTask = (id, list) => {
    list.forEach((task, idx) => {
      if (task.id == id) {
        list.splice(idx, 1)
      }
    })
  }

  const renderTasksCount = list => {
    dom.count.text(`${list.length}`)
  }

  const deleteAllTasks = (list) => {
    list.length = 0
  }

  $('.todo__tasks-clear-all').click(function(e) {
    deleteAllTasks(arrTasks)
    renderTasks(arrTasks)
  })
})
