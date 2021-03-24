import { AppStorage } from "./AppStorage.js";

function displayAppName() {
  const fragment = document.createDocumentFragment();
  const name = document.createElement("h1");

  name.id = "manager-title";
  name.innerText = "Article Manager";

  fragment.appendChild(name);

  return fragment;
}

class Form extends AppStorage {
  constructor() {
    super("form");
  }

  createForm() {
    const formFragmentBox = document.createDocumentFragment();
    const formFragmentsComponents = document.createDocumentFragment();
    const hr1 = document.createElement("hr");
    const hr2 = document.createElement("hr");

    formFragmentBox.appendChild(hr1);

    const formSection = document.createElement("form");

    formSection.id = "form-section";

    const titleInput = this.createTitleInput();
    const contentInput = this.createContentInput();
    const checkbox = this.createCheckBoxArea();
    const submitBtn = this.createSubmit();

    formFragmentsComponents.appendChild(titleInput);
    formFragmentsComponents.appendChild(contentInput);
    formFragmentsComponents.appendChild(checkbox);
    formFragmentsComponents.appendChild(submitBtn);
    formSection.appendChild(formFragmentsComponents);
    formFragmentBox.appendChild(formSection);
    formFragmentBox.appendChild(hr2);

    formSection.addEventListener("submit", (e) => {
      e.preventDefault();
      this.generateArticleId();
      if (Articles.storeArticle(this.state)) {
        updateArticlesFeed(this.state.visible ? 'visible' : 'hidden')
        toggleFeedTitle(this.state.visible)
        
        this.state = ""; 
        formSection.reset();
      }
    });

    return formFragmentBox;
  }

  createTitleInput() {
    const titleInput = document.createElement("input");

    titleInput.type = "text";
    titleInput.id = "form-title";
    titleInput.name = "title";
    titleInput.placeholder = "Title";
    titleInput.autofocus = "true";
    titleInput.required = "true";
    titleInput.minLength = "20";
    titleInput.maxLength = "180";

    this.storageInputsValues(titleInput);

    titleInput.value = this.state.title || "";

    return titleInput;
  }

  createContentInput() {
    const contentInput = document.createElement("textarea");

    contentInput.id = "form-content";
    contentInput.name = "content";
    contentInput.placeholder = "Content...";
    contentInput.required = "true";
    contentInput.minLength = "360";
    contentInput.maxLength = "1080";
    contentInput.cols = "100";
    contentInput.rows = "9";
    contentInput.value = this.state.content || "";

    this.storageInputsValues(contentInput);

    return contentInput;
  }

  createCheckBoxArea() {
    const checkBoxContainer = document.createElement("div");

    checkBoxContainer.id = "checkbox-area";

    this.checkBoxRadio = document.createElement("input");

    this.checkBoxRadio.type = "checkbox";
    this.checkBoxRadio.name = "visible";
    this.checkBoxRadio.id = "visible";
    this.checkBoxRadio.checked = this.state.visible;

    const checkBoxLabel = document.createElement("label");

    checkBoxLabel.htmlFor = "visible";

    const checkBoxBtnName = document.createElement("b");

    checkBoxBtnName.innerText = "Visible";

    checkBoxLabel.appendChild(checkBoxBtnName);
    checkBoxContainer.appendChild(this.checkBoxRadio);
    checkBoxContainer.appendChild(checkBoxLabel);

    checkBoxContainer.addEventListener(
      "input",
      ({ target: { checked, name } }) => {
        this.state = {
          ...this.state,
          [name]: checked,
        };
      }
    );

    return checkBoxContainer;
  }

  createSubmit() {
    const submitBtn = document.createElement("input");

    submitBtn.type = "submit";
    submitBtn.value = "Submit";
    submitBtn.id = "submit-btn";

    return submitBtn;
  }

  generateArticleId() {
    let date = Date.now();
    this.state = {
      ...this.state,
      articleId: date,
    };
  }

  storageInputsValues(element) {
    element.addEventListener("input", ({ target: { value, name } }) => {
      this.state = {
        ...this.state,
        [name]: value,
      };
    });
  }

}

class Articles extends AppStorage {
  constructor() {
    super("articles");
    this.state = {
      visibleArticles: this.state.visibleArticles || [],
      hiddenArticles: this.state.hiddenArticles || [],
    };
  }

  createArticleFeedTitleAndBtns() {
    const container = document.createDocumentFragment();
    const title = document.createElement("h2");
    const btnContainer = document.createElement("div");
    const showVisibleBtn = document.createElement("button");
    const showHiddenBtn = document.createElement("button");
    const visibleBtnText = document.createElement("h4");
    const hiddenBtnText = document.createElement("h4");

    title.innerText =  'List of Visible Articles';
    title.id = "list-title";
    btnContainer.id = "filter-articles";
    showVisibleBtn.id = "visible-articles";
    showHiddenBtn.id = "hidden-articles";
    visibleBtnText.innerText = "Visible Articles";
    hiddenBtnText.innerText = "Hidden Articles";

    showHiddenBtn.appendChild(hiddenBtnText);
    showVisibleBtn.appendChild(visibleBtnText);
    btnContainer.appendChild(showVisibleBtn);
    btnContainer.appendChild(showHiddenBtn);
    container.appendChild(title);
    container.appendChild(btnContainer);


    showVisibleBtn.addEventListener('click',()=>{
      updateArticlesFeed('visible')
      title.innerText = 'List of Visible Articles'
    })

    showHiddenBtn.addEventListener('click',()=>{
      title.innerText = 'List of Hidden Articles'
      updateArticlesFeed('hidden')
    })

    return container;
  }

  createUlBody(type) {
    const {visibleArticles,hiddenArticles} = this.state;
    const unorderedList = document.createElement("ul");
    const articlesFeed = document.createDocumentFragment();

    if(type === 'visible'){
      for(let article of visibleArticles){
        articlesFeed.appendChild(this.createArticle(article))
      }
    }

    else if(type === 'hidden'){
      for(let article of hiddenArticles){
        articlesFeed.appendChild(this.createArticle(article))
      }
    }

    unorderedList.id = "articles-list";
    unorderedList.appendChild(articlesFeed)

    return unorderedList;
  }

  createArticle(article) {
    const li = document.createElement('li');
    const articleBox = document.createElement('div');
    const articleTitle = document.createElement('div');
    const articleTitleText = document.createElement('h3');
    const articleContent = document.createElement('div');
    const articleActiveBtnsBox = document.createElement('div');
    const editBtn = document.createElement('button');
    const editBtnIcon = document.createElement('i')
    const deleteBtn = document.createElement('button');
    const deleteBtnIcon = document.createElement('i');
    const changeVsbltyBtn = document.createElement('button');
    const changeVsbltyBtnIcon = document.createElement('i')
    const saveEdittingBtn = document.createElement('button');
    const saveEdittingBtnIcon = document.createElement('i')

    li.id = article.articleId
    articleBox.className = 'article-box'
    articleTitle.className = 'article-title';
    articleTitleText.innerText = article.title;
    articleContent.className = 'article-content';
    articleContent.innerText = article.content
    articleActiveBtnsBox.className = 'active-btns';
    editBtn.className = 'edit-btn';
    editBtnIcon.className = 'far fa-edit';
    deleteBtn.classList = 'delete-btn';
    deleteBtnIcon.classList = 'fas fa-trash';
    changeVsbltyBtn.className = article.visible ? 'change-vsbl-btn show' : 'change-vsbl-btn hide';
    changeVsbltyBtnIcon.className = article.visible ? 'far fa-eye' : 'far fa-eye-slash';
    saveEdittingBtn.className ='save-edit';
    saveEdittingBtn.disabled = true
    saveEdittingBtnIcon.className='far fa-save';

    saveEdittingBtn.appendChild(saveEdittingBtnIcon);
    changeVsbltyBtn.appendChild(changeVsbltyBtnIcon);
    deleteBtn.appendChild(deleteBtnIcon);
    editBtn.appendChild(editBtnIcon);
    articleActiveBtnsBox.appendChild(editBtn)
    articleActiveBtnsBox.appendChild(deleteBtn)
    articleActiveBtnsBox.appendChild(changeVsbltyBtn)
    articleActiveBtnsBox.appendChild(saveEdittingBtn);
    articleTitle.appendChild(articleTitleText);
    articleBox.appendChild(articleTitle);
    articleBox.appendChild(articleContent);
    articleBox.appendChild(articleActiveBtnsBox);
    li.appendChild(articleBox);

    deleteBtn.addEventListener('click',()=>{
      this.deleteArticle(li)
    })

    return li;
  }

  createArticleFeedBody() {
    const fragment = document.createDocumentFragment();
    const ulBody = this.createUlBody('visible');

    fragment.appendChild(this.createArticleFeedTitleAndBtns());
    fragment.appendChild(ulBody)
  
    return fragment;
  }


 static storeArticle(article) {
    const { visibleArticles, hiddenArticles } = JSON.parse(localStorage.getItem('articles'));
    const massiveArray = visibleArticles.concat(hiddenArticles);
    const filteredArticlesTitle = massiveArray.filter(
      (art) =>
        art.title.toLowerCase().trim() === article.title.toLowerCase().trim()
    ).length;

    if (article.visible && !filteredArticlesTitle) {
      visibleArticles.unshift(article);
    } 
    
    else if (!article.visible && !filteredArticlesTitle) {
      hiddenArticles.unshift(article);
    }
    
    else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Error!`,
        text: `An article with such title already exists, please modify it.`,
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }


    Swal.fire({
      icon: "success",
      title: `Success`,
      message: "An article has been successfully created!",
      showConfirmButton: false,
      timer: 1500,
    });
   localStorage.setItem('articles', JSON.stringify({visibleArticles,hiddenArticles}))
    return true;
  }

  deleteArticle(deletedArticle){
    const feed = document.getElementById('articles-list')
    const {visibleArticles,hiddenArticles} = this.state
    const newVisibleArticles = visibleArticles.filter(art=>art.articleId != deletedArticle.id)
    const newHiddenArticles = hiddenArticles.filter(art=>art.articleId != deletedArticle.id)
    if(newVisibleArticles.length !== visibleArticles.length){
     this.state = {
       ...this.state,
       visibleArticles : newVisibleArticles
     }
    }
    else if(newHiddenArticles.length !== hiddenArticles.length){
      this.state = {
        ...this.state,
        hiddenArticles : newHiddenArticles
      }
    }
    feed.removeChild(deletedArticle)
  }
}

export function displayAppComponents() {
  const name = displayAppName();
  const form = new Form();
  const articles = new Articles();

  document.body.appendChild(name);
  document.body.appendChild(form.createForm());
  document.body.appendChild(articles.createArticleFeedBody());
}


function updateArticlesFeed(type){
  const oldFeed = document.getElementById('articles-list')
  const updatedFeed = new Articles();

  document.body.removeChild(oldFeed)
  document.body.appendChild(updatedFeed.createUlBody(type))
}

function toggleFeedTitle(type){
const title = document.getElementById('list-title');
if(type){
  title.innerText = 'List of Visible Articles'
}
else if(!type){
  title.innerText = 'List of Hidden Articles'
}
}


