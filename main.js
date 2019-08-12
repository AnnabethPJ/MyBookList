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

    static removeBookFromList(el){
        if(el.classList.contains("button-red")){
            el.parentElement.parentElement.remove();
        }

    }

    static clearFields(){
        document.getElementById("title").value="";
        document.getElementById("author").value="";
        document.getElementById("isbn").value="";
    }

   /* static showMessage(message,className){
        const div=document.createElement("div");
        div.className=`alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container=document.querySelector(".container");
        const form=document.querySelector("#my-form");
        container.insertBefore(div,form);

        setTimeout(()=>
        document.querySelector(`alert-${className}`).remove(),3000);
        

    }*/
}


//Event to add book
document.getElementById("my-form").addEventListener("submit",(e)=>{
    //prevent default action of submit
    e.preventDefault();

    //copy the input values of the form
    const title=document.getElementById("title").value;
    const author=document.getElementById("author").value;
    const isbn=document.getElementById("isbn").value;

    //instantiate a book object
    const newBook=new Book(title,author,isbn);

    UI.addBookToList(newBook);

    UI.clearFields();

    UI.showMessage("New book is added","success");
});


//Event to delete book
document.querySelector("#table-body").addEventListener("click",(e)=>{
    UI.removeBookFromList(e.target);
});
