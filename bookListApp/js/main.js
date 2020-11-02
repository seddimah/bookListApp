

//Book class: initializing title , author and idnumber//////////////////////////////////////////////////////
class Book {
    constructor(title, author, idnumber,dateStart,dateFinish) {
        this.title = title;
        this.author = author;
        this.idnumber = idnumber;
        this.dateStart=dateStart;
        this.dateFinish=dateFinish;
    }
}


//UI class for show Changes in web page//////////////////////////////////////////////////////////////////////////
class UI {
    //display
    static displaybooks() {

        const books = Store.getBooks();

        books.forEach((mybook) => UI.addBookToList(mybook));
    }

    //add a book to list in UI
    static addBookToList(mybook) {
        const list = document.querySelector("#bookList");
        const row = document.createElement('tr');
        row.innerHTML = `
        <td class="outputdata col-1">${mybook.idnumber}</td>
        <td class="outputdata col-3">${mybook.title}</td>
        <td class="outputdata col-2">${mybook.author}</td>
        <td class="outputdata col-2">${mybook.dateStart}</td>
        <td class="outputdata col-2">${mybook.dateFinish}</td>
        <td class="outputdata col-2"><a href="#" class="btn btn-sm delete">حذف کن</a></td>
        `;
        list.appendChild(row);
    }

    //delete a book from list in UI
    static deleteBook(el) {
        //alert("sdsd");
        if (el.classList.contains('delete')) {

            el.parentElement.parentElement.remove();//first parentelement== 4th <td> & second parentelement==<tr>
        }
    }

    //showing alert
    static showAlert(messege, clasName) {
        const div = document.createElement('div');

        div.className = `alert alert-${clasName}`;
        div.appendChild(document.createTextNode(messege));

        const container = document.querySelector('.container');
        const form = document.querySelector('.bookForm');

        container.insertBefore(div, form);

        //disappear in 3 second
        setTimeout(() => document.querySelector('.alert').remove(), 3000)
    }

    //clear fields after clicking on submit (refresh)
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#idnumber').value = '';
        document.querySelector('#dateStart').value = '';
        document.querySelector('#dateFinish').value = '';
    }
}

//Store class://////////////////////////////////////////////////////////////////////////
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }
        else {
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(idnumber) {
        //alert(idnumber)
        //alert(idnumber)
        const books = Store.getBooks();
        books.forEach((book,index)=>{
            if (book.idnumber===idnumber){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

//Event: display books//////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', UI.displaybooks);


//Event: add books//////////////////////////////////////////////////////////////////////////
document.querySelector('.bookForm').addEventListener('submit', (e) => {

    //prevent submit
    e.preventDefault();

    //get value
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const idnumber=document.querySelector('#idnumber').value;
    const dateStart=document.querySelector('#dateStart').value;
    const dateFinish=document.querySelector('#dateFinish').value;

    //validate
    if (title === '' || author === '' || idnumber === '' || dateStart==='' || dateFinish==='') {
        //alert("please fill in all fields!");
        UI.showAlert('please fill in all fields!', 'danger');
        console.log(title);
    }
    else {
        UI.showAlert('Adding books is done successfully!', 'success');
        const book = new Book(title, author, idnumber,dateStart,dateFinish);
        UI.addBookToList(book);
        Store.addBook(book);
    }


    //clear fields
    UI.clearFields();
});


//Event remove book//////////////////////////////////////////////////////////////////////////
document.querySelector('#bookList').addEventListener('click', (e) => {
    //remove book from UI
    UI.showAlert('Deleting a book is done successfully!', 'success');
    UI.deleteBook(e.target);

    //remove book from storage
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling
        .previousElementSibling.previousElementSibling.textContent);
});