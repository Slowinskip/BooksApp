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
        
        imageBook.classList.add('favorite');
        event.preventDefault();
        
        const getID = imageBook.getAttribute('data-id');
        console.log(getID);

        favoriteBooks.push(getID);

        console.log('favoriteBooks: ', favoriteBooks);
      });
    }
    
  }


  renderBooks();
  initActions();
}


    