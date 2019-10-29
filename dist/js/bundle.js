/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./script/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./script/script.js":
/*!**************************!*\
  !*** ./script/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

var contain = {
  loading: 'Загрузка...',
  success: 'Cпасибо',
  failure: 'Что то пошло не так'
};
var body = document.querySelector("body"),
    createList = document.getElementById('create_List'),
    closeModal = document.querySelector('.close_modal_window'),
    form = document.querySelector(".main-form"),
    titleFormInput = document.querySelector(".form_name_input"),
    descriptionFormInput = document.querySelector(".form_description_input"),
    saveModalRec = document.querySelector(".save_modal_rec"),
    priorityItems = document.querySelector(".content_contain_items_cardPriority"),
    overlay = document.getElementById('overlay');
var warning = document.getElementById("warning");
var warningNameLength = document.getElementById("warningNameLength");
var priorityFormInput = document.querySelector(".form_priority_Input"); // Search function for input characters in task names
// The function hides those elements in the names of which there are no input search characters

document.querySelector(".set_option_letInput_inpSearch").oninput = function () {
  var val = this.value.trim().toLowerCase(),
      putElemP = document.querySelectorAll('.content_contain_items'),
      nameItems = document.querySelectorAll('.name_items');

  if (val !== '') {
    for (var i = 0; i < nameItems.length; i++) {
      if (nameItems[i].textContent.trim().toLowerCase().search(val) === -1) {
        putElemP[i].classList.add('hide');
      } else {
        putElemP[i].classList.remove('hide');
      }
    }
  } else {
    for (var _i = 0; _i < nameItems.length; _i++) {
      putElemP[_i].classList.remove('hide');
    }
  }
}; // the function opens a modal window for creating a new task


createList.addEventListener('click', function () {
  overlay.style.display = 'block';
  warning.innerHTML = "";
  warningNameLength.innerHTML = "";
}); //the function closes a modal window for creating a new task and dont save the values

closeModal.addEventListener('click', function (event) {
  event.preventDefault("");
  overlay.style.display = 'none';
  titleFormInput.value = '';
  descriptionFormInput.value = '';
  warning.innerHTML = "";
  warningNameLength.innerHTML = "";
}); // Create an object and save the input values ​​into it

var createNewRecord = {}; // The create function creates a task if all input values! = Null

saveModalRec.addEventListener('click', function (event) {
  event.preventDefault(""); // если пустое то ничего не просходит

  if (titleFormInput.value === '' || descriptionFormInput.value === '') {
    console.log("fdsfsd");
  } else {
    // call  a function make()
    make();
  }
}); // The function creates a limit on the number of input values.

document.querySelector(".form_description_input").oninput = function () {
  var size = descriptionFormInput.value;

  if (size.length === 190) {
    warning.innerHTML = "Поле должно содержать не более 190 символов";
  } else if (size.length < 190) {
    warning.innerHTML = "";
  }
}; // The function creates a limit on the number of input values.


document.querySelector(".form_name_input").oninput = function () {
  var size = titleFormInput.value;

  if (size.length === 20) {
    warningNameLength.innerHTML = "Поле должно содержать не более 20 символов";
  } else if (size.length < 20) {
    warningNameLength.innerHTML = "";
  }
}; //  The function of generating blocks for the list of tasks, their removal and editing


function make() {
  var priorityFormInput = document.querySelector(".form_priority_Input");
  createNewRecord.title = titleFormInput.value;
  createNewRecord.Description = descriptionFormInput.value;
  createNewRecord.Priority = priorityFormInput.value;
  localStorage.setItem('todo', JSON.stringify(createNewRecord));
  overlay.style.display = 'none'; // Generate markup to show the result of creating a task

  var appDiv = document.createElement('div');
  var putDiv = document.querySelector('.content_contain');
  var selectPriority = document.createElement('div');
  appDiv.classList.add('content_contain_items');
  selectPriority.classList.add("content_contain_items_lowBar");
  putDiv.appendChild(appDiv);
  var nameTask = document.createElement("span");
  var nameEditCard = document.createElement("span");
  var deckEditCard = document.createElement("span");
  var descriptionTask = document.createElement("span");
  var priorityLevel = document.createElement("span");
  var selEditCard = document.createElement("select");
  var editModalName = document.createElement("input");
  var listComplete = document.createElement('img');
  var btnSaveEdit = document.createElement('button');
  var btnCloseEdit = document.createElement('button');
  var contentCreateFormNewCard = document.createElement('div');
  var editModalDesc = document.createElement("textarea");
  var selStatusValue = document.createElement('select');
  selStatusValue.id = "selectId";
  selStatusValue.classList.add("findRigth");
  appDiv.appendChild(nameTask);
  appDiv.appendChild(descriptionTask);
  appDiv.appendChild(selectPriority);
  appDiv.appendChild(editModalDesc);
  appDiv.appendChild(editModalName);
  selectPriority.appendChild(priorityLevel);
  selectPriority.appendChild(selStatusValue);
  nameTask.classList.add('name_items');
  nameEditCard.classList.add('name_items');
  deckEditCard.classList.add('name_items');
  nameEditCard.innerHTML = 'Name';
  deckEditCard.innerHTML = 'Description';
  descriptionTask.classList.add('description_items');
  priorityLevel.classList.add('content_contain_items_cardPriority');
  selEditCard.classList.add("findRigth2");
  selEditCard.style.display = 'none';
  nameTask.innerHTML = titleFormInput.value;
  descriptionTask.innerHTML = descriptionFormInput.value;
  priorityLevel.innerHTML = priorityFormInput.value;
  editModalName.classList.add('setOption_letInput_Edit');
  editModalDesc.classList.add('form_description_Edit');
  editModalDesc.value = descriptionFormInput.value;
  ;
  editModalName.value = titleFormInput.value;
  editModalName.style.display = 'none';
  editModalDesc.style.display = 'none';
  listComplete.classList.add('content_contain_items_completed_img');
  listComplete.src = "img/check-solid.svg";
  contentCreateFormNewCard.classList.add('content_create_form_new_card');
  contentCreateFormNewCard.appendChild(btnSaveEdit);
  contentCreateFormNewCard.appendChild(btnCloseEdit);
  btnCloseEdit.classList.add('bntSaveList');
  btnSaveEdit.classList.add('bntSaveList');
  btnSaveEdit.innerHTML = 'Save';
  btnCloseEdit.innerHTML = 'Close';
  btnSaveEdit.style.display = 'none';
  btnSaveEdit.style.display = 'none'; // Generate markup for editing a task

  var modalEdinWindow = document.createElement('div');
  modalEdinWindow.classList.add('content_create');
  body.appendChild(modalEdinWindow);
  modalEdinWindow.style.display = 'none';
  var optionVoid = document.createElement('option');
  var optionDone = document.createElement('option');
  var optionEdit = document.createElement('option');
  var optionDelete = document.createElement('option');
  optionVoid.value = "...";
  optionVoid.innerHTML = "...";
  optionDone.value = "Done";
  optionDone.innerHTML = "Done";
  optionEdit.value = "Edit";
  optionEdit.innerHTML = "Edit";
  optionDelete.value = "Delete";
  optionDelete.innerHTML = "Delete";
  selStatusValue.appendChild(optionVoid);
  selStatusValue.appendChild(optionDone);
  selStatusValue.appendChild(optionEdit);
  selStatusValue.appendChild(optionDelete); // Сreate a site for choosing priority when changing

  var optionEditNormal = document.createElement('option');
  var optionEditHigh = document.createElement('option');
  var optionEditLow = document.createElement('option');
  selEditCard.appendChild(optionEditHigh);
  selEditCard.appendChild(optionEditNormal);
  selEditCard.appendChild(optionEditLow);
  optionEditHigh.value = "High";
  optionEditHigh.innerHTML = "High";
  optionEditNormal.value = "Normal";
  optionEditNormal.innerHTML = "Normal";
  optionEditLow.value = "Low";
  optionEditLow.innerHTML = "Low";
  var checkDone = document.createElement('div');
  checkDone.classList.add('content_contain_items_completed');
  appDiv.insertBefore(checkDone, appDiv.childNodes[0]);
  /*The function clears the input form after creating or
  closing the function that creates the task*/

  var clearModalWindow = function clear() {
    var a = titleFormInput.value;

    for (var i = 0; i < a.length; i++) {
      titleFormInput.value = '';
      descriptionFormInput.value = '';
      priorityFormInput.value = 'Normal';
    }
  };

  clearModalWindow();

  selStatusValue.onchange = function () {
    var d = selStatusValue.value; // create events for editing our task

    if (d === 'Edit') {
      modalEdinWindow.style.display = 'flex';
      modalEdinWindow.insertBefore(nameEditCard, modalEdinWindow.childNodes[0]);
      modalEdinWindow.insertBefore(editModalName, modalEdinWindow.childNodes[1]);
      modalEdinWindow.insertBefore(deckEditCard, modalEdinWindow.childNodes[3]);
      modalEdinWindow.insertBefore(editModalDesc, modalEdinWindow.childNodes[4]);
      modalEdinWindow.insertBefore(selectPriority, modalEdinWindow.childNodes[5]);
      selectPriority.insertBefore(selEditCard, selectPriority.childNodes[6]);
      modalEdinWindow.insertBefore(contentCreateFormNewCard, modalEdinWindow.childNodes[9]);
      contentCreateFormNewCard.insertBefore(btnCloseEdit, contentCreateFormNewCard.childNodes[10]);
      contentCreateFormNewCard.insertBefore(btnSaveEdit, contentCreateFormNewCard.childNodes[11]);
      editModalName.style.display = 'inline-block';
      editModalDesc.style.display = 'inline-block';
      selEditCard.style.display = 'inline-block';
      btnSaveEdit.style.display = 'block';
      btnCloseEdit.style.display = 'block';
      selStatusValue.style.display = 'none';
      nameTask.innerHTML = editModalName.value;
      editModalDesc.style.maxlength = '190'; //create events for completion of work on a task
    } else if (d === 'Done') {
      checkDone.appendChild(listComplete);
      selStatusValue.disabled = true;
      nameTask.style.color = "#00000094";
      descriptionTask.style.color = "#00000094";
      priorityLevel.style.color = "#00000094";
      selStatusValue.style.color = "#00000094"; //Create an event to delete a task
    } else if (d === 'Delete') {
      appDiv.style.display = 'none';
    }
  }; // Finish changes after editing


  btnSaveEdit.addEventListener('click', function () {
    modalEdinWindow.style.display = 'none';
    appDiv.insertBefore(nameTask, appDiv.childNodes[1]);
    appDiv.insertBefore(descriptionTask, appDiv.childNodes[2]);
    appDiv.insertBefore(selectPriority, appDiv.childNodes[5]);
    nameTask.innerHTML = editModalName.value;
    descriptionTask.innerHTML = editModalDesc.value;
    priorityLevel.innerHTML = selEditCard.value;
    selStatusValue.style.display = 'block';
    selEditCard.style.display = 'none'; // возвращаем его в положение выбора елементов

    selStatusValue.value = optionVoid.value;
  }); // Close the modal window and does not save the result of the change.

  btnCloseEdit.addEventListener('click', function () {
    modalEdinWindow.style.display = 'none';
    appDiv.insertBefore(nameTask, appDiv.childNodes[1]);
    appDiv.insertBefore(descriptionTask, appDiv.childNodes[2]);
    appDiv.insertBefore(selectPriority, appDiv.childNodes[5]);
    nameTask.style.display = 'flex';
    descriptionTask.style.display = 'flex';
    selStatusValue.style.display = 'flex';
    selStatusValue.value = optionVoid.value;
    selEditCard.style.display = 'none';
    editModalName.value = nameTask.textContent;
    editModalDesc.value = descriptionTask.textContent;
  });
} //create a filtering function to select tasks by status and their implementation


document.querySelector(".content_filter_state_task").oninput = function () {
  var filterStateTask = document.querySelector(".content_filter_state_task");
  statusCard = document.querySelectorAll(".findRigth"), boxCard = document.querySelectorAll(".content_contain_items");
  var a = filterStateTask.value;
  var arr = [];
  var pushUp = '';

  for (var j = 0; j < statusCard.length; j++) {
    pushUp = statusCard[j].value;
    arr.push(pushUp);
  }

  for (var i = 0; i < arr.length; i++) {
    if (a === 'All') {
      boxCard[i].classList.remove('hide_filter_status');
    } else if (arr[i] === 'Done' && a === 'Open') {
      boxCard[i].classList.add('hide_filter_status');
    } // вот єто не так работает
    else if (arr[i] !== 'Done' && a === 'Done') {
        boxCard[i].classList.add('hide_filter_status');
      } else {
        boxCard[i].classList.remove('hide_filter_status');
      }
  }
}; // create a filter function to select our tasks according to priority


document.querySelector(".content_filter_state_level").oninput = function () {
  var filterStateLevel = document.querySelector(".content_filter_state_level"),
      levelPriorityCard = document.querySelectorAll(".content_contain_items_cardPriority"),
      boxCard = document.querySelectorAll(".content_contain_items");
  var x = levelPriorityCard.textContent;
  var selectPriorityLevel = filterStateLevel.value;
  var arr = [];
  var pushUp = '';

  for (var j = 0; j < levelPriorityCard.length; j++) {
    pushUp = levelPriorityCard[j].textContent;
    arr.push(pushUp);
  }

  for (var i = 0; i < arr.length; i++) {
    if (selectPriorityLevel === 'All') {
      boxCard[i].classList.remove('hide_filter_Level');
    } else if (arr[i] !== 'High' && selectPriorityLevel === 'High') {
      boxCard[i].classList.add('hide_filter_Level');
    } else if (arr[i] !== 'Low' && selectPriorityLevel === 'Low') {
      boxCard[i].classList.add('hide_filter_Level');
    } else if (arr[i] !== 'Normal' && selectPriorityLevel === 'Normal') {
      boxCard[i].classList.add('hide_filter_Level');
    } else {
      boxCard[i].classList.remove('hide_filter_Level');
    }
  }
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map