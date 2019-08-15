//Book class
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
//UI class
class UI{
    //method display
    static displayBooks(){
        const books=Store.getBooks();
        books.forEach((book)=>UI.addBookToList(book));

    }
    //method to add book to list
    static addBookToList(book){

        const list=document.querySelector("#table-body");
        const row=document.createElement("tr");

        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><button class="button-red">X</button></td>`;

        list.appendChild(row);
    }
    //method to remov book from list
    static removeBookFromList(el){
        if(el.classList.contains("button-red")){
            el.parentElement.parentElement.remove();
            
        }

    }
    //method to clear the input
    static clearFields(){
        document.getElementById("title").value="";
        document.getElementById("author").value="";
        document.getElementById("isbn").value="";
    }
    //method to show alert messages
    static showMessage(message,classname){
        const div=document.createElement("div");
        div.className=`alert-${classname}`;
        div.appendChild(document.createTextNode(message));

        const formSection=document.querySelector("#form-section");
        const form=document.querySelector("#my-form");
        formSection.insertBefore(div,form);

        setTimeout(()=>document.querySelector(`.alert-${classname}`).remove(),3000);
    }
}
//Store class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }
        else{
            books=JSON.parse(localStorage.getItems('books'));
        }
        return books;
    }

    static addBooks(book){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));

    }

    static removeBook(isbn){
        const books=Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        });
        
        localStorage.setItem('books',JSON.stringify(books));
    }
}


//Event to add book
document.getElementById("my-form").addEventListener("submit",(e)=>{
    //prevent default action of submit
    e.preventDefault();

    //copy the input values of the form
    const title=document.getElementById("title").value;
    const author=document.getElementById("author").value;
    const isbn=document.getElementById("isbn").value;

    //validate
    if(title==''||author==''||isbn==''){
        //alert("Please fill in al the fields");
        UI.showMessage("Please fill all the fields","danger")

    }
    else{
        const newBook=new Book(title,author,isbn);

        UI.addBookToList(newBook);

        UI.clearFields();

        UI.showMessage("New book is added","success");
    }
});


//Event to delete book
document.querySelector("#table-body").addEventListener("click",(e)=>{
    UI.removeBookFromList(e.target);
    UI.showMessage(`Record with title "${e.target.parentElement.parentElement.childNodes[1].textContent}"  has been deleted`,"danger");
});

