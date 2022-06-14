/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';
  
  const select = {
    dataSource: {
      data: dataSource.books,
      detailsAdults: 'adults',
      nonFiction: 'nonFiction',
    },
    templateOf: {
      books: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      book: '.book a',
      filters: '.filters',
    },
    className: {
      bookImage: '.book__image',
      
    },
    classActive: {
      favorite: 'favorite',
      hidden: 'hidden',
    }
  };
  const tempates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };


  function renderBooks (){
    for(let book of dataSource.books){
      const generatedHTML = tempates.books(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const menuContainer = document.querySelector(select.containerOf.booksList);
      menuContainer.appendChild(generatedDOM);
      
    }
  
  
  }
  const favoriteBooks = [];
  const filters = [];

  function bookFilter() {
    const dataBooks = dataSource.books;
    const bookArray = [];
    
    for(let dataBook of dataBooks){
      console.log('dataBook:', dataBook);
      let shouldBeHidden = false;
      
      for(let filter of filters){
        if(!dataBook.details[filter]){
          console.log('filter', filter);
          shouldBeHidden = true;
          bookArray.push(dataBook.id);
          console.log('bookArray: ', bookArray);
          break;
        }
          
      }

      
      if(shouldBeHidden == true){
        const bookImage = document.querySelector('.book__image[data-id="' + bookArray.id + '"]');
        // bookImage.classList.add(select.className.hidden);
        console.log('bookImage: ', bookImage);  
      } else if (shouldBeHidden == false){
        const bookImage = document.querySelector('[data-id="' + bookArray.id + '"]');
        // bookImage.classList.remove(select.classActive.hidden); 
      }
    }
  }


  function initActions(){
    const imageBooks = document.querySelectorAll(('.book a'));
    const book = document.querySelector(select.containerOf.booksList);
    console.log(book);
    
    book.addEventListener('click', function (event){
      event.preventDefault(); 
      console.log(favoriteBooks);
      if(event.target.offsetParent.classList.contains('book__image')){
        //console.log('works');
        for(let imageBook of imageBooks){
          imageBook.addEventListener('click', function(event){
        
            const getID = event.target.offsetParent.getAttribute('data-id');
        
            if(!favoriteBooks.includes(getID)){
              imageBook.classList.add(select.classActive.favorite);
              favoriteBooks.push(getID);
            }else{
              imageBook.classList.remove(select.classActive.favorite);
              const index = favoriteBooks.indexOf(getID);
              //console.log('index: ', index);
              favoriteBooks.splice(index, 1);
            }
          });
        }
      }
    });

    const form = document.querySelector(select.containerOf.filters);
    //console.log('form: ', form);
    form.addEventListener('click', function(event){
      const filter = event.target;
      if(filter.tagName == 'INPUT' && filter.type == 'checkbox' && filter.name == 'filter'){
        //console.log('value: ', filter.value);
        if(filter.checked == true){
          //console.log('true');
          const value = filter.value;
          filters.push(value);
          //console.log('filters: ', filters);
        }else{
          const value = filter.value;
          const removeValue = filters.indexOf(value);
          filters.splice(removeValue, 1);
          //console.log('filters: ', filters);
        }
        bookFilter();
      }
    });
    
  }

  


    
        
        
        

  console.log('favoriteBooks: ', favoriteBooks);
  
  

    
  


  renderBooks();
  initActions();
}