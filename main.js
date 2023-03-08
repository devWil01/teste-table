var addRowButton = document.getElementById('add-row');
addRowButton.addEventListener('click', addRow);

var addColButton = document.getElementById('add-col');
addColButton.addEventListener('click', addColumn);

function addRow() {
  var tbody = document.querySelector('tbody');
  var newRow = document.createElement('tr');
  newRow.innerHTML = '<td></td><td>R$ </td><td></td>';
  
  var newCell = document.createElement('td');
  newCell.setAttribute('contenteditable', 'true');
  newRow.appendChild(newCell);

  tbody.appendChild(newRow);

  var cells = newRow.querySelectorAll('td');
  for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', editCell);
  }
}

function addColumn() {
  var table = document.querySelector('table');
  var headers = table.querySelectorAll('thead tr th');
  var newHeader = document.createElement('th');
  newHeader.setAttribute('contenteditable', 'true');
  newHeader.innerHTML = 'Nova Coluna';
  headers[headers.length - 1].insertAdjacentElement('beforebegin', newHeader);

  var rows = table.querySelectorAll('tbody tr');
  for (var i = 0; i < rows.length; i++) {
    var newCell = document.createElement('td');
    newCell.setAttribute('contenteditable', 'true');
    rows[i].insertAdjacentElement('beforeend', newCell);
    newCell.addEventListener('click', editCell);
  }
}

function editCell() {
  var input = document.createElement('input');
  input.type = 'text';
  input.value = this.innerHTML;
  this.innerHTML = '';
  this.appendChild(input);
  input.focus();

  input.addEventListener('blur', saveCell);
  input.addEventListener('keypress', saveCellOnEnter);
}

function saveCell() {
  var value = this.value;
  var cell = this.parentNode;
  cell.innerHTML = value;
}

function saveCellOnEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    saveCell.call(this);
  }
}