export class Head {
  static displayAppName() {
    const fragment = document.createDocumentFragment();
    const name = document.createElement("h1");
    name.id = "manager-title";
    name.innerText = "Article Manager";
    fragment.appendChild(name);
    return fragment;
  }
}

export class Form {
  static createForm() {
    const formFragmentBox = document.createDocumentFragment();
    const formFragmentsComponents = document.createDocumentFragment();
    const hr1 = document.createElement("hr");
    const hr2 = document.createElement("hr");
    formFragmentBox.appendChild(hr2);
    const formSection = document.createElement("form");
    formSection.id = "form-section";

    formFragmentsComponents.appendChild(this.createTitleInput());
    formFragmentsComponents.appendChild(this.createContentInput());
    formFragmentsComponents.appendChild(this.createCheckBoxArea());
    formFragmentsComponents.appendChild(this.createSubmit());
    formSection.appendChild(formFragmentsComponents);
    formFragmentBox.appendChild(formSection);
    formFragmentBox.appendChild(hr1);

    formSection.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(this.createContentInput().value);
    });
    return formFragmentBox;
  }

  static createTitleInput() {
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "form-title";
    titleInput.name = "title";
    titleInput.placeholder = "Title";
    titleInput.autofocus = "true";
    titleInput.required = "true";
    titleInput.minLength = "20";
    titleInput.maxLength = "180";

    return titleInput;
  }

  static createContentInput() {
    const contentInput = document.createElement("textarea");
    contentInput.id = "form-content";
    contentInput.name = "content";
    contentInput.placeholder = "Content...";
    contentInput.required = "true";
    contentInput.minLength = "360";
    contentInput.maxLength = "1080";
    contentInput.cols = "100";
    contentInput.rows = "9";
    return contentInput;
  }

  static createCheckBoxArea() {
    const checkBoxContainer = document.createElement("div");
    checkBoxContainer.id = "checkbox-area";
    const checkBoxRadio = document.createElement("input");
    checkBoxRadio.type = "checkbox";
    checkBoxRadio.name = "visible";
    checkBoxRadio.id = "visible";
    const checkBoxLabel = document.createElement("label");
    checkBoxLabel.htmlFor = "visible";
    const checkBoxBtnName = document.createElement("b");
    checkBoxBtnName.innerText = "Visible";
    checkBoxLabel.appendChild(checkBoxBtnName);
    checkBoxContainer.appendChild(checkBoxRadio);
    checkBoxContainer.appendChild(checkBoxLabel);

    return checkBoxContainer;
  }

  static createSubmit() {
    const submitBtn = document.createElement("input");
    submitBtn.type = "submit";
    submitBtn.value = "Submit";
    submitBtn.id = "submit-btn";
    return submitBtn;
  }
}
