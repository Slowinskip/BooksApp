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
  };
  const tempates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  }


  function renderBooks (){
    for(let book of dataSource.books){
      const generatedHTML = tempates.books(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const menuContainer = document.querySelector(select.containerOf.books);
      menuContainer.appendChild(generatedDOM);
      
    }
  }
  renderBooks();
}


    