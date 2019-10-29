let contain = {
	loading: 'Загрузка...',
	success: 'Cпасибо',
	failure: 'Что то пошло не так'
}

let body = document.querySelector("body"),
	createList = document.getElementById('create_List'),
	closeModal = document.querySelector('.close_modal_window'),
	form = document.querySelector(".main-form"),
	titleFormInput = document.querySelector(".form_name_input"),
	descriptionFormInput = document.querySelector(".form_description_input"),
	saveModalRec = document.querySelector(".save_modal_rec"),
	priorityItems = document.querySelector(".content_contain_items_cardPriority"),
	overlay = document.getElementById('overlay');
let warning = document.getElementById("warning");
let warningNameLength = document.getElementById("warningNameLength");
let priorityFormInput = document.querySelector(".form_priority_Input");

// Search function for input characters in task names
// The function hides those elements in the names of which there are no input search characters
document.querySelector(".set_option_letInput_inpSearch").oninput = function () {
	let val = this.value.trim().toLowerCase(),
		putElemP = document.querySelectorAll('.content_contain_items'),
		nameItems = document.querySelectorAll('.name_items');
	if (val !== '') {
		for (let i = 0; i < nameItems.length; i++) {
			if (nameItems[i].textContent.trim().toLowerCase().search(val) === -1) {
				putElemP[i].classList.add('hide');
			} else {
				putElemP[i].classList.remove('hide');
			}
		}
	} else {
		for (let i = 0; i < nameItems.length; i++) {
			putElemP[i].classList.remove('hide');
		}
	}
}

// the function opens a modal window for creating a new task
createList.addEventListener('click', function () {
	overlay.style.display = 'block';
	warning.innerHTML = "";
	warningNameLength.innerHTML = "";
});
//the function closes a modal window for creating a new task and dont save the values
closeModal.addEventListener('click', function (event) {
	event.preventDefault("");
	overlay.style.display = 'none';
	titleFormInput.value = '';
	descriptionFormInput.value = '';
	warning.innerHTML = "";
	warningNameLength.innerHTML = "";
});
// Create an object and save the input values ​​into it
let createNewRecord = {};
// The create function creates a task if all input values! = Null
saveModalRec.addEventListener('click', function (event) {
	event.preventDefault("");
	// если пустое то ничего не просходит
	if (titleFormInput.value === '' || descriptionFormInput.value === '') {
		console.log("fdsfsd");
	} else {
		// call  a function make()

		make();
	}
});
// The function creates a limit on the number of input values.


document.querySelector(".form_description_input").oninput = function () {
	let size = descriptionFormInput.value;
	if (size.length === 190) {
		warning.innerHTML = "Поле должно содержать не более 190 символов";
	} else if (size.length < 190) {
		warning.innerHTML = "";
	}
}

// The function creates a limit on the number of input values.
document.querySelector(".form_name_input").oninput = function () {
	let size = titleFormInput.value;
	if (size.length === 20) {
		warningNameLength.innerHTML = "Поле должно содержать не более 20 символов";
	} else if (size.length < 20) {
		warningNameLength.innerHTML = "";
	}
}


//  The function of generating blocks for the list of tasks, their removal and editing
function make() {
	let priorityFormInput = document.querySelector(".form_priority_Input");
	createNewRecord.title = titleFormInput.value;
	createNewRecord.Description = descriptionFormInput.value;
	createNewRecord.Priority = priorityFormInput.value;
	localStorage.setItem('todo', JSON.stringify(createNewRecord));
	overlay.style.display = 'none';
	// Generate markup to show the result of creating a task
	let appDiv = document.createElement('div');
	let putDiv = document.querySelector('.content_contain');
	let selectPriority = document.createElement('div');
	appDiv.classList.add('content_contain_items');
	selectPriority.classList.add("content_contain_items_lowBar");
	putDiv.appendChild(appDiv);
	let nameTask = document.createElement("span");
	let nameEditCard = document.createElement("span");
	let deckEditCard = document.createElement("span");
	let descriptionTask = document.createElement("span");
	let priorityLevel = document.createElement("span");
	let selEditCard = document.createElement("select");
	let editModalName = document.createElement("input");
	let listComplete = document.createElement('img');
	let btnSaveEdit = document.createElement('button');
	let btnCloseEdit = document.createElement('button');
	let contentCreateFormNewCard = document.createElement('div');
	let editModalDesc = document.createElement("textarea");
	let selStatusValue = document.createElement('select');
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
	editModalDesc.value = descriptionFormInput.value;;
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
	btnSaveEdit.style.display = 'none';
	// Generate markup for editing a task
	let modalEdinWindow = document.createElement('div');
	modalEdinWindow.classList.add('content_create');
	body.appendChild(modalEdinWindow);
	modalEdinWindow.style.display = 'none';
	let optionVoid = document.createElement('option');
	let optionDone = document.createElement('option');
	let optionEdit = document.createElement('option');
	let optionDelete = document.createElement('option');
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
	selStatusValue.appendChild(optionDelete);
	// Сreate a site for choosing priority when changing
	let optionEditNormal = document.createElement('option');
	let optionEditHigh = document.createElement('option');
	let optionEditLow = document.createElement('option');
	selEditCard.appendChild(optionEditHigh);
	selEditCard.appendChild(optionEditNormal);
	selEditCard.appendChild(optionEditLow);
	optionEditHigh.value = "High";
	optionEditHigh.innerHTML = "High";
	optionEditNormal.value = "Normal";
	optionEditNormal.innerHTML = "Normal";
	optionEditLow.value = "Low";
	optionEditLow.innerHTML = "Low";

	let checkDone = document.createElement('div');
	checkDone.classList.add('content_contain_items_completed')
	appDiv.insertBefore(checkDone, appDiv.childNodes[0]);
	/*The function clears the input form after creating or
	closing the function that creates the task*/
	let clearModalWindow = function clear() {
		let a = titleFormInput.value;
		for (let i = 0; i < a.length; i++) {
			titleFormInput.value = '';
			descriptionFormInput.value = '';
			priorityFormInput.value = 'Normal';
		}
	}
	clearModalWindow();
	selStatusValue.onchange = function () {
		let d = selStatusValue.value;
		// create events for editing our task
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
			editModalDesc.style.maxlength = '190';
			//create events for completion of work on a task
		} else if (d === 'Done') {
			checkDone.appendChild(listComplete);
			selStatusValue.disabled = true;
			nameTask.style.color = "#00000094";
			descriptionTask.style.color = "#00000094";
			priorityLevel.style.color = "#00000094";
			selStatusValue.style.color = "#00000094";
			//Create an event to delete a task
		} else if (d === 'Delete') {
			appDiv.style.display = 'none';
		}
	};
	// Finish changes after editing
	btnSaveEdit.addEventListener('click', function () {
		modalEdinWindow.style.display = 'none';
		appDiv.insertBefore(nameTask, appDiv.childNodes[1]);
		appDiv.insertBefore(descriptionTask, appDiv.childNodes[2]);
		appDiv.insertBefore(selectPriority, appDiv.childNodes[5]);
		nameTask.innerHTML = editModalName.value;
		descriptionTask.innerHTML = editModalDesc.value;
		priorityLevel.innerHTML = selEditCard.value;
		selStatusValue.style.display = 'block';
		selEditCard.style.display = 'none';
		// возвращаем его в положение выбора елементов
		selStatusValue.value = optionVoid.value;
	});
	// Close the modal window and does not save the result of the change.
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
}
//create a filtering function to select tasks by status and their implementation
document.querySelector(".content_filter_state_task").oninput = function () {
	let filterStateTask = document.querySelector(".content_filter_state_task");
	statusCard = document.querySelectorAll(".findRigth"),
		boxCard = document.querySelectorAll(".content_contain_items");
	let a = filterStateTask.value;
	let arr = [];
	let pushUp = '';
	for (let j = 0; j < statusCard.length; j++) {
		pushUp = statusCard[j].value;
		arr.push(pushUp);
	}
	for (let i = 0; i < arr.length; i++) {
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
}
// create a filter function to select our tasks according to priority
document.querySelector(".content_filter_state_level").oninput = function () {
	let filterStateLevel = document.querySelector(".content_filter_state_level"),
		levelPriorityCard = document.querySelectorAll(".content_contain_items_cardPriority"),
		boxCard = document.querySelectorAll(".content_contain_items");
	let x = levelPriorityCard.textContent;
	let selectPriorityLevel = filterStateLevel.value;
	let arr = [];
	let pushUp = '';
	for (let j = 0; j < levelPriorityCard.length; j++) {
		pushUp = levelPriorityCard[j].textContent;
		arr.push(pushUp);
	}
	for (let i = 0; i < arr.length; i++) {
		if (selectPriorityLevel === 'All') {
			boxCard[i].classList.remove('hide_filter_Level');
		} else if (arr[i] !== 'High' && selectPriorityLevel === 'High') {
			boxCard[i].classList.add('hide_filter_Level');
		}
		else if (arr[i] !== 'Low' && selectPriorityLevel === 'Low') {
			boxCard[i].classList.add('hide_filter_Level');
		} else if (arr[i] !== 'Normal' && selectPriorityLevel === 'Normal') {
			boxCard[i].classList.add('hide_filter_Level');
		} else {
			boxCard[i].classList.remove('hide_filter_Level');
		}
	}
}
