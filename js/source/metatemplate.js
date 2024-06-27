function Metatemplate() {
  this.templateform = false;

  this.selectQuery = function (selectNames) {
    return document.querySelector(this.templateform + " " + selectNames);
  };

  this.selectQueryAll = function (selectNames) {
    return document.querySelectorAll(this.templateform + " " + selectNames);
  };

  this.payload = function (id) {
    let parameters = [];
    this.templateform = id;

    let form = this.selectQuery("");

    const language = this.selectQuery(".Language").value;
    const imageUrl = this.selectQuery(".ImageUrl").value;

    const values = Object.fromEntries(
      Array.from(form.elements).map((x) => {
        const input = x;
        return [input.name ?? input.id, input.value];
      })
    );

    let variables = this.selectQueryAll(".Variables input");

    variables.forEach((variable) => {
      if (variable.value !== "") {
        parameters.push(variable.value);
      }
    });

    return {
      type: "template",
      template_name: values.LoadedTemplate,
      language: language,
      variables: parameters,
      BodyTemplate: this.selectQuery(".BodyTemplate").value,
      image_url: imageUrl, // Ensure this is correctly set to template.image_url
      // footer_text: this.selectQuery('.FooterTemplate').value // Include footer text in payload
    };
  };

  this.init = function (id) {
    this.templateform = id;
    var $this = this;
    const remVariable = $this.selectQuery(".RemVariableButton");
    const templateNameInput = this.selectQuery(".TemplateName");
    const addButton = this.selectQuery(".AddButton");
    const loadedTemplateSelect = this.selectQuery(".LoadedTemplate");
    const loadedTemplateDiv = loadedTemplateSelect.parentElement;
    const variablesDiv = this.selectQuery(".Variables .variables");
    const addVariable = this.selectQuery(".AddVariableButton");
    const bodyTemplateInput = this.selectQuery(".BodyTemplate");
    const languageSelect = this.selectQuery(".Language");
    const imageUrlInput = this.selectQuery(".ImageUrl");
    const buttonsDiv = this.selectQuery(".Buttons");
    const footerTemplateInput = this.selectQuery(".FooterTemplate"); // New line for footer text input


    // Create an img element to display the image
    const imageDisplay = document.createElement("img");
    imageDisplay.style.maxWidth = "38px"; // Set the size of the image square
    imageDisplay.style.height = "38px"; // Ensure it is a square
    imageDisplay.style.objectFit = "cover"; // Ensure the image covers the square without distortion
    imageDisplay.style.borderRadius = "8px 0px 0px 8px"; // Apply border-radius
    imageDisplay.style.border = ".8px solid var(--chat-border-color)"; // Apply border
    imageDisplay.style.padding = "0.58px"; // Apply padding
    imageUrlInput.insertAdjacentElement("beforebegin", imageDisplay);

    let loadedTemplates = {};

    function addVariables() {
      const inputElements = $this.selectQueryAll(".variables input");
      if (inputElements.length >= 3) {
        return;
      }

      const el = document.createElement("input");
      el.setAttribute("style", "margin: 2px 2px;");
      const length = inputElements.length;
      el.value = `{{${length + 1}}}`;
      variablesDiv.appendChild(el);
    }

    function addTemplateName() {
      const templateName = templateNameInput.value;
      if (!templateName) {
        return;
      }

      // Check if template name already exists
      if (templateName in loadedTemplates) {
        const templateBody = loadedTemplates[templateName];
        languageSelect.value = templateBody.language;
        bodyTemplateInput.value = templateBody.template;
        footerTemplateInput.textContent = templateBody.footer; // Update footer text content
      } else {
        const option = document.createElement("option");
        option.text = templateName;
        loadedTemplateSelect.value = option.text;
        loadedTemplates[templateName] = {
          language: "",
          template: "",
          footer: "", // Add this line
        };
      }

      templateNameInput.value = "";
    }

    function loadTemplates() {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const templatesData = JSON.parse(this.responseText).data;

          // Clear existing options
          loadedTemplateSelect.innerHTML = "";

          // Populate the LoadedTemplate select with options from meta_templates.json
          templatesData.forEach((template) => {
            const option = document.createElement("option");
            option.value = template.name;
            option.textContent = template.name; // Display template name
            loadedTemplateSelect.appendChild(option);
          });

          // Trigger change event to initialize the textarea with the first template's body
          if (templatesData.length > 0) {
            const firstTemplateName = templatesData[0].name;
            loadedTemplateSelect.value = firstTemplateName;
            loadedTemplateSelect.dispatchEvent(new Event("change"));
          }
        }
      };
      xhttp.open("GET", "uploads/meta_templates.json", true);
      xhttp.send();
    }

    loadedTemplateSelect.addEventListener("change", function () {
      const selectedTemplateName = this.value;
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const selectedTemplateData = JSON.parse(this.responseText).data;
          const selectedTemplate = selectedTemplateData.find(
            (template) => template.name === selectedTemplateName
          );
          if (selectedTemplate) {
            const firstBodyComponent = selectedTemplate.components.find(
              (component) => component.type === "BODY"
            );
            const text = firstBodyComponent ? firstBodyComponent.text : "";
            bodyTemplateInput.value = text;
            languageSelect.value = selectedTemplate.language;

            // Check for header component with image
            const headerComponent = selectedTemplate.components.find(
              (component) =>
                component.type === "HEADER" && component.format === "IMAGE"
            );
            if (
              headerComponent &&
              headerComponent.example &&
              headerComponent.example.header_handle
            ) {
              imageDisplay.src = headerComponent.example.header_handle[0];
              imageUrlInput.value = "";
            } else {
              imageDisplay.src = "";
              imageUrlInput.value = "";
            }

            // Clear existing button inputs
            buttonsDiv.innerHTML = "";

            // Populate button values
            const buttonsComponents = selectedTemplate.components.filter(
              (component) => component.type === "BUTTONS" && component.buttons
            );
            buttonsComponents.forEach((buttonsComponent) => {
              if (buttonsComponent.buttons) {
                buttonsComponent.buttons.forEach((button, index) => {
                  const buttonElement = document.createElement("p");
                  buttonElement.className = `api-dynamic-button Button${index}`;
                  buttonElement.name = `Button${index}Text`;
                  buttonElement.textContent = button.text;
                  buttonsDiv.appendChild(buttonElement);
                });
              }
            });

            // Populate footer text if it exists
            const footerComponent = selectedTemplate.components.find(
              (component) => component.type === "FOOTER"
            );
            if (footerComponent) {
              footerTemplateInput.textContent = footerComponent.text; // Update footer text content
            } else {
              footerTemplateInput.textContent = "";
            }
          }
        }
      };
      xhttp.open("GET", "uploads/meta_templates.json", true);
      xhttp.send();
    });

    bodyTemplateInput.addEventListener("blur", function (event) {
      const currentTemplate = bodyTemplateInput.value;
      for (const templateName in loadedTemplates) {
        const templateBody = loadedTemplates[templateName];
        if (currentTemplate === templateBody.template) {
          loadedTemplateSelect.value = templateName;
          languageSelect.value = templateBody.language;
          footerTemplateInput.textContent = templateBody.footer; // Update footer text content
          return;
        }
      }
    });

    addVariable.addEventListener("click", addVariables);
    // Remove input an event listener to the button
    remVariable.addEventListener("click", function () {
      // Remove the last input element
      const varInput = $this.selectQueryAll(".variables input");
      const varInputTotal = varInput.length;
      if (varInputTotal > 1) {
        varInput[varInput.length - 1].remove();
        varInputTotal.value = `{{1}}`;
      }
      SBChat.showResponse("Variable Removed");
    });

    loadTemplates();
  };
}
