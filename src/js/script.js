/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';
  
  const select = {
    templateOf: {
      books: '#template-book',
    },
    containerOf: {
      books: '.books-list',
    },
    className: {
      bookImage: '.book__image',
    },
    classActive: {
      favorite: 'favorite',
    }
  };
  const tempates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };


  function renderBooks (){
    for(let book of dataSource.books){
      const generatedHTML = tempates.books(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const menuContainer = document.querySelector(select.containerOf.books);
      menuContainer.appendChild(generatedDOM);
      
    }
  
  
  }
  const favoriteBooks = [];

  function initActions(){
    const imageBooks = document.querySelectorAll(select.className.bookImage);
    console.log(imageBooks);
    for(let imageBook of imageBooks){
      imageBook.addEventListener('click', function(event){
        event.preventDefault();
        const getID = imageBook.getAttribute('data-id');
        
        if(!favoriteBooks.includes(getID)){
          imageBook.classList.add(select.classActive.favorite);
          favoriteBooks.push(getID);
        }else{
          imageBook.classList.remove(select.classActive.favorite);
          const index = favoriteBooks.indexOf(getID);
          console.log('index: ', index);
          favoriteBooks.splice(index, 1);
        }
        
        
        
        

        console.log('favoriteBooks: ', favoriteBooks);
      });
    }
    
  }


  renderBooks();
  initActions();
}


    