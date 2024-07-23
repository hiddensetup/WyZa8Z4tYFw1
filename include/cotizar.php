<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote Generator</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <script src="https://unpkg.com/vue@3.2.20"></script>
  <style>
    textarea {
      font-family: 'Courier New', Courier, monospace;
      white-space: pre-wrap;
    }

    .markdown {
      font-family: Arial, sans-serif;
      white-space: pre-wrap;
    }

    .markdown code {
      background-color: #f8f9fa;
      padding: 2px 4px;
      border-radius: 4px;
    }

    .markdown .bold {
      font-weight: bold;
    }

    .markdown .italic {
      font-style: italic;
    }

    .markdown .strikethrough {
      text-decoration: line-through;
    }

    .markdown .code {
      background-color: #f8f9fa;
      padding: 2px 4px;
      border-radius: 4px;
      font-family: 'Courier New', Courier, monospace;
    }
  </style>
</head>
<body class="py-5 container">
  <div id="app" class="col">
    <h1 class="mb-4">Quote Generator</h1>
    <form @submit.prevent="generateQuote">
      <div class="row mb-2">
        <div class="col-md-6">
          <label for="branding" class="form-label">Brand Name:</label>
          <input type="text" class="form-control" v-model="branding" placeholder="Enter the brand name">
        </div>
        <div class="col-md-6">
          <label for="logo" class="form-label">Logo:</label>
          <input type="file" class="form-control" accept="image/*" @change="handleLogoUpload">
          <img v-if="logo" :src="logo" alt="Logo" class="img-fluid mt-2" style="max-width: 100px;">
        </div>
      </div>
      
      <div class="row mb-2">
        <div class="col-md-4">
          <label for="clientBusinessName" class="form-label">Business Name:</label>
          <input type="text" class="form-control" v-model="clientBusinessName" placeholder="Enter the business name" required>
        </div>
        <div class="col-md-4">
          <label for="clientBusinessAddress" class="form-label">Business Address:</label>
          <input type="text" class="form-control" v-model="clientBusinessAddress" placeholder="Enter the business address">
        </div>
        <div class="col-md-4">
          <label for="clientBusinessPhone" class="form-label">Phone:</label>
          <input type="text" class="form-control" v-model="clientBusinessPhone" placeholder="Enter the contact phone">
        </div>
      </div>

      <div class="row mb-2">
        <div class="col-md-4">
          <label for="clientName" class="form-label">Client Name:</label>
          <input type="text" class="form-control" v-model="clientName" placeholder="Enter the client name" required>
        </div>
        <div class="col-md-4">
          <label for="quoteDate" class="form-label">Quote Date:</label>
          <input type="text" class="form-control" v-model="quoteDate" readonly>
        </div>
        <div class="col-md-4">
          <label for="proposalNumber" class="form-label">Quote ID:</label>
          <input type="text" class="form-control" v-model="proposalNumber" readonly>
        </div>
      </div>

      <div class="mb-2">
        <label for="productDetails" class="form-label">Product Details:</label>
        <div v-for="(product, index) in products" :key="index" class="mb-2 row">

          <div class="gap-3 align-items-center col-md-4 d-flex">
           <button type="button" class="btn-close p-2" @click="removeProduct(index)"></button>
            <input type="text" class="form-control mb-1" v-model="product.name" placeholder="Product Name" required>
          </div>
          <div class="col-md-4">
            <input type="number" class="form-control mb-1" v-model.number="product.quantity" placeholder="Quantity" required>
          </div>
          <div class="col-md-4">
            <input type="number" class="form-control mb-1" v-model.number="product.price" placeholder="Price" required>
          </div>
     
        </div>
        <button type="button" class="btn btn-primary w-100" @click="addProduct">Add Item</button>
      </div>

      <div class="row mb-2">
        <div class="col-md-6">
          <label for="additionalNotes" class="form-label">Additional Notes:</label>
          <textarea class="mb-2 form-control" id="additionalNotes" v-model="additionalNotes" rows="3" placeholder="Enter additional notes, use ~strikethrough~, _italic_, *bold* or ```code``` for formatting..."></textarea>
        </div>
        <div class="col-md-6">
          <label for="companyName" class="form-label">Company Name:</label>
          <input type="text" class="form-control" v-model="companyName" placeholder="Enter the company's name">
        </div>
      </div>

      <div class="row mb-2">
        <div class="col-md-6">
          <label for="companyAddress" class="form-label">Company Address:</label>
          <input type="text" class="form-control" v-model="companyAddress" placeholder="Enter the company's address">
        </div>
        <div class="col-md-6">
          <label for="companyEmail" class="form-label">Company Email:</label>
          <input type="email" class="form-control" v-model="companyEmail" placeholder="Enter the company's email">
        </div>
      </div>

      <div class="mb-2">
        <label for="agentContactInfo" class="form-label">Agent Contact Information:</label>
        <input type="text" class="form-control" v-model="agentContactInfo" placeholder="Enter the agent's contact information" required>
      </div>
      <button type="submit" class="btn btn-primary">Generate Quote</button>
    </form>
  </div>

  <script>
    const app = Vue.createApp({
      data() {
        return {
          branding: 'Routin',
          clientBusinessName: 'CUSTOMER BUSINESS LLC',
          clientBusinessAddress: '#1234 CUSTOMER ST., CLIENT CITY, COUNTRY',
          clientBusinessPhone: '+1234567890',
          clientName: 'Jhon Doe',
          quoteDate: '',
          proposalNumber: '',
          products: [
    {
        name: 'Gestión Multi-Agente',
        quantity: 1,
        price: 500
    },
    {
        name: 'Integración API de WhatsApp',
        quantity: 1,
        price: 200
    },
    {
        name: 'Automatización de Mensajes',
        quantity: 1,
        price: 250
    },
    {
        name: 'CRM Integrado',
        quantity: 1,
        price: 350
    },
    {
        name: 'Soporte Técnico Premium',
        quantity: 1,
        price: 400
    },
    {
        name: 'Personalización y Configuración',
        quantity: 1,
        price: 275
    }],
          additionalNotes: '🔒 Disclaimer: Routin Cloud is not responsible for any data loss or errors in communication. Ensure compliance with local regulations and data privacy laws. 🚫📉 For more details, contact support at example@routin.cloud. 💬 \n\n To format text use symbols like WhatsApp: *bold*, _italic_, ~strikethrough~, and add emojis 😊 for extra expression.',
          companyName: 'ROUTIN CLOUD APP',
          companyAddress: '#1234 CLIENT CITY, DEMO, COUNTRY',
          companyWebsite: 'https://routin.cloud',
          companyPhone: '+1234567890',
          companyEmail: 'example@routin.cloud',
          agentContactInfo: 'Frank, frank@frank.com | 5491165900208',
          logoURL: null,

        };
      },
      mounted() {
        this.generateQuoteDate();
        this.generateProposalNumber();
      },
      methods: {
        convertMarkdownToHTML(text) {
          return text
            .replace(/~(.*?)~/g, '<del>$1</del>') // Strikethrough
            .replace(/\*(.*?)\*/g, '<strong>$1</strong>') // Bold
            .replace(/_(.*?)_/g, '<em>$1</em>') // Italic
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>') // Code block
            .replace(/`([^`]+)`/g, '<code>$1</code>'); // Inline code
        },
        generateQuoteDate() {
          const currentDate = new Date();
          const day = String(currentDate.getDate()).padStart(2, '0');
          const month = String(currentDate.getMonth() + 1).padStart(2, '0');
          const year = currentDate.getFullYear();
          this.quoteDate = `${day}/${month}/${year}`;
        },
        generateProposalNumber() {
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
          let proposalNumber = '';
          for (let i = 0; i < 14; i++) {
            proposalNumber += characters.charAt(Math.floor(Math.random() * characters.length));
          }
          this.proposalNumber = proposalNumber;
        },
        addProduct() {
          this.products.push({
            name: '',
            quantity: 0,
            price: 0
          });
        },
        removeProduct(index) {
          this.products.splice(index, 1);
        },
        handleLogoUpload(event) {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              this.logoURL = e.target.result; // Store the logo URL
            };
            reader.readAsDataURL(file); // Read the file as a data URL
          }
        },
        generateQuote() {
          let totalCost = this.products.reduce((sum, product) => sum + (product.quantity * product.price), 0);

          const quoteHTML = this.generateQuoteHTML(totalCost);
          const newTab = window.open();
          newTab.document.body.innerHTML = quoteHTML;
          newTab.document.head.innerHTML = `
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Quote - ${this.clientBusinessName} - ${this.quoteDate}</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    `;
        },
        generateQuoteHTML(totalCost) {
          const notesHTML = this.convertMarkdownToHTML(this.additionalNotes);
          const productsRows = this.products.map(product => `
      <tr>
        <td>${product.name}</td>
        <td class="text-center">${product.quantity}</td>
        <td class="text-end">$${product.price.toFixed(2)}</td>
        <td class="text-end">$${(product.quantity * product.price).toFixed(2)}</td>
      </tr>
    `).join('');

          return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quote - ${this.clientBusinessName} - ${this.quoteDate}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
    <div class="container-fluid py-3">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="card border-0">
                    <div class="card-body px-4 py-0">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <div class="d-flex gap-2">
                                <img src="${this.logoURL || 'https://routin.cloud/favicon.png'}" alt="Logo" class="img-fluid" style="width: 58px;height:58px">
                                <div>
                                <h2 class="h4 text-primary mt-2 mb-0">${this.branding}</h2>
                                <p class="small text-muted"> ${this.companyAddress}</p>
                                 </div>
                            </div>
                            <h1 class="display-6">Quote</h1>
                        </div>
                        
                        <div class="justify-content-between d-flex mb-4">
                            <p class="mb-1"><strong>Date:</strong> ${this.quoteDate}</p>
                            <p class="mb-0"><strong>Quote ID:</strong> <span>${this.proposalNumber}</span></p>
                        </div>
                        
                        <div class="gap-3 m-auto d-flex justify-content-center mb-4">
                            <div class="col">
                                <div class="card h-100">
                                    <div class="small card-body">
                                        <h6 class="card-title text-uppercase text-muted">To</h6>
                                        <p class="card-text mb-1"> ${this.clientName}</p>
                                        <p class="card-text mb-1"> ${this.clientBusinessName}</p>
                                        <p class="card-text mb-0">${this.clientBusinessAddress}</p>
                                        <p class="card-text mb-0"> ${this.clientBusinessPhone}</p>

                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card h-100">
                                    <div class="small card-body">
                                        <h6 class="card-title text-uppercase text-muted">Prepared by</h6>
                                        <p class="card-text mb-1"> ${this.companyName}</p>
                                        <p class="card-text mb-1"> ${this.companyAddress}</p>
                                        <p class="card-text mb-1"> ${this.companyPhone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="table-responsive mb-4">
                            <table class="table table-hover">
                                <thead class="table-light">
                                    <tr>
                                        <th scope="col">Item</th>
                                        <th scope="col" class="text-center">Quantity</th>
                                        <th scope="col" class="text-end">Unit Price</th>
                                        <th scope="col" class="text-end">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${productsRows}
                                </tbody>
                                <tfoot>
                                    <tr class="table-active">
                                        <th colspan="3" class="text-end">Total:</th>
                                        <th class="text-end">$${totalCost.toFixed(2)}</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        
                        <div class="bg-light p-3 rounded">
                            <h6 class="text-uppercase text-muted mb-2">Additional Notes</h6>
                            <p class="small mb-0 markdown">${notesHTML}</p>
                        </div>
                         <div class="mt-4">
                                    <div class="card-body">
                                        <div class="small d-flex justify-content-between flex-wrap">
                                            <div class="text-start mb-3 mb-md-0">
                                                <p class="small mb-1">If you have any inquiries concerning this quote, do not hesitate to reach out to us </p>
                                            </div>
                                          
                                            <div class="text-start mb-3 mb-md-0">
                                                <p class="small mb-1"><a href="${this.companyWebsite}" target="_blank">${this.companyWebsite}</a></p>
                                            </div>
                                          
                                    
                                        </div>
                                    </div>
                                </div>

                    </div>
                               
                             
                </div>
            </div>
        </div>
    </div>
    
</body>
</html>`;
        }
      }

    });
    app.mount('#app');
  </script>
</body>

</html>