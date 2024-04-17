<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <meta name="robots" content="noindex, nofollow">

  <title>Generador de Cotización</title>
  <!-- Bootstrap CSS -->
  <!-- <link href="node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
   -->
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">


  <!-- Vue.js CDN -->
  <script src="https://unpkg.com/vue@3.2.20"></script>
</head>

<body class="container" style="max-width:700px">
    <div id="app" class="container mt-5">
        <h1 class="mb-4">Generador de Cotización</h1>
        <form @submit.prevent="generateQuote">
            <!-- Grouping Business and Client Name -->
            <div class="row mb-2">
                <div class="col-md-6">
                    <label for="clientBusinessName" class="form-label">Nombre del Negocio:</label>
                    <input type="text" class="form-control" v-model="clientBusinessName" value="Mi Negocio"
                        placeholder="Ingrese el nombre del negocio" required>
                </div>
                <div class="col-md-6">
                    <label for="clientName" class="form-label">Nombre del Cliente:</label>
                    <input type="text" class="form-control" v-model="clientName" value="Demo"
                        placeholder="Ingrese el nombre del cliente" required>
                </div>
            </div>
    
            <!-- Quote Type -->
            <div class="mb-2">
                <label for="quoteType" class="form-label">Tipo de Cotización:</label>
                <select class="form-select" v-model="quoteType">
                    <option selected value="mensual">Implementación</option>
                    <option value="trimestral">Costo Trimestral</option>
                    <option value="semestral">Costo Semestral</option>
                </select>
            </div>
    
            <!-- Monthly Setup Cost -->
            <div class="mb-2">
                <label for="monthlySetupCost" class="form-label">Costo de Implementación:</label>
                <input type="number" class="form-control" v-model.number="monthlySetupCost"
                    placeholder="Ingrese el costo mensual de setup">
            </div>
    
            <!-- Grouping User Count and Date of Quote -->
            <div class="row mb-2">
                <div class="col-md-6">
                    <label for="userCount" class="form-label">Número de Usuarios:</label>
                    <input type="number" class="form-control" v-model.number="userCount" value="15"
                        placeholder="Ingrese el número de usuarios" required>
                </div>
                <div class="col-md-6">
                    <label for="quoteDate" class="form-label">Fecha de Cotización:</label>
                    <input type="text" class="form-control" v-model="quoteDate" readonly>
                </div>
            </div>
    
            <!-- Proposal Number -->
            <div class="mb-2">
                <label for="proposalNumber" class="form-label">ID Cotización:</label>
                <input type="text" class="form-control" v-model="proposalNumber" readonly>
            </div>
    
            <!-- Generate Quote Button -->
            <button type="submit" class="btn btn-primary">Generar Cotización</button>
        </form>
    </div>
    

  <script>
    const app = Vue.createApp({
      data() {
        return {
          branding: 'Steambox',
          brandingLLC: 'Steambox Messaging Platform',
          brandingSite: 'https://steamboxchat.com',
          brandingPhone: '+1 (302) 803-5360',
          fullAddress: 'Ponce de Leon Blvd, Miami, FL',
          terms: 'https://steamboxchat.com/terms',
          privacy: 'https://steamboxchat.com/privacy',



          clientName: 'Cinthya Medina',
          clientBusinessName: 'Veritradecorp',
          quoteType: 'semestral',
          monthlySetupCost: 179,
          userCount: 4,
          quoteDate: '',
          proposalNumber: '',


        }
      },
      mounted() {
        this.generateQuoteDate();
        this.generateProposalNumber();
      },
      methods: {
        getValidUntilDate(startDate) {
          const dateParts = startDate.split('/');
          const day = parseInt(dateParts[0], 10) + 7;
          const month = parseInt(dateParts[1], 10);
          const year = parseInt(dateParts[2], 10);
          const validUntilDate = new Date(year, month - 1, day);
          const formattedDay = String(validUntilDate.getDate()).padStart(2, '0');
          const formattedMonth = String(validUntilDate.getMonth() + 1).padStart(2, '0');
          const formattedYear = validUntilDate.getFullYear();
          return `${formattedDay}/${formattedMonth}/${formattedYear}`;
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



        generateQuote() {
          let totalCost = 0;
          let setupCost = 0;

          // Calculate setup cost based on monthly setup cost
          setupCost = this.monthlySetupCost || 0;

          if (this.quoteType === 'mensual') {
            // For monthly type, total cost is just the setup cost
            totalCost = setupCost;
          } else if (this.quoteType === 'trimestral') {
            // For quarterly type, total cost is 6 months - 120 USD for semi-annual cost
            totalCost = (69 * 6) - 120;
          } else if (this.quoteType === 'semestral') {
            // For semi-annual type, total cost is 6 months * 69 USD
            totalCost = 69 * 6;
          }

          // Add setup cost to total cost for quarterly and semi-annual types
          if (this.quoteType !== 'mensual') {
            totalCost += setupCost;
          }

          const quoteHTML = this.generateQuoteHTML(setupCost, totalCost);
          const newTab = window.open();
          newTab.document.body.innerHTML = quoteHTML;
          newTab.document.head.innerHTML = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cotización</title>
        <!-- Bootstrap CSS -->
        <link href="node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="preload" href="https://unpkg.com/vue@3.2.20" as="script">


    `;
        },



        generateQuoteHTML(setupCost, totalCost) {
  let totalLabel = '';
  let setupDescription = '';
  let remainingAmount = 0;

  if (this.quoteType === 'mensual') {
    totalLabel = 'Costo Total Mensual';
    setupDescription = '*Si abonas 1 mes y optas por continuar con un plan se abona la diferencia 5 días antes de cumplir el mes.';
  } else if (this.quoteType === 'trimestral') {
    totalLabel = 'Costo Total Trimestral';
    setupDescription = '*La implementación se abona 1 sola vez al empezar cualquier plan o se puede emplear como un pago mensual.';
    remainingAmount = totalCost - setupCost; // Calculate remaining amount for trimestral plan
  } else if (this.quoteType === 'semestral') {
    totalLabel = 'Costo Total Semestral';
    setupDescription = '*La implementación se abona 1 sola vez al empezar cualquier plan o se puede emplear como un pago mensual.';
    remainingAmount = totalCost - setupCost; // Calculate remaining amount for semi-annual plan
  }

          return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cotización - ${this.clientBusinessName} - ${this.quoteDate} </title>
    <!-- Include Bootstrap CSS -->
    <!-- <link href="node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"> -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">



    <style>
      body,h1,h2{color:#333}body{font-family:"Open Sans",sans-serif;background-image:url('letterhead_background.jpg');background-size:cover;margin:0;padding:0;font-size:14px}.container{max-width:800px;margin:30px auto;border-radius:8px;font-size:14px;border:.4px solid #ddd;contain:content}.section{margin-top:30px;margin-bottom:30px;padding:0 4%}ul{padding-left:20px}.link{color:#0366d6;text-decoration:none}.header{margin-bottom:20px;border-bottom:.4px solid #ddd}table{width:100%;border-collapse:collapse}td,th{padding:8px;text-align:left;border-bottom:1px solid #ddd}.total-row{font-weight:700}@media print{.container{max-width:100%}}
    </style>
</head>
<body>
<div class="container">
    <div class="py-4 px-3 row header">
      <div class="gap-4 align-items-center justify-content-between d-flex flex-row-reverse">
        <div class="justify-content-end d-flex"><img src="https://steamboxchat.com/steambox.png"style="width: 35px;height: 35px;" class="img-fluid"> <p class="fs-4 mb-0 text-start"><strong>${this.branding}</strong></div><span class="small">${this.brandingSite} <br> <i class="bi bi-whatsapp"></i> ${this.brandingPhone} <br> ${this.fullAddress}</small></div>
    </div>

    <div class="section">
    <p><strong>ID:</strong> ${this.proposalNumber}</p>
    <p><strong>Fecha:</strong> ${this.quoteDate} (Válido hasta ${this.getValidUntilDate(this.quoteDate)})</p>
    <p><strong>Cliente:</strong> ${this.clientBusinessName}</p>
    </div>

    <div class="section">
    <p class="my-4">Estimado/a ${this.clientName},<br>
    aquí te compartimos nuestra propuesta detallada para la implementación de Steambox Chat. A continuación, encontrarás el desglose de costos.</p>
    </div>

    
    <div class="section">
        <h5 class="mt-3">Desglose de Costos:</h5>
        <table>
            <thead>
                <tr>
                    <th>Descripción</th>
                    <th>Costo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Número de Usuarios</td>
                    <td>${this.userCount}</td>
                </tr>
                <tr>
                    <td>Steamboxchat acceso Web/Mobile (Max. 15 agentes)</td>
                    <td>Gratis</td>
                </tr>
                <tr>
                    <td>Costo de Implementación</td>
                    <td>$${setupCost} USD</td>
                </tr>
            </tbody>
            <tfoot>
                    <tr class="total-row">
                        <td>${totalLabel}</td>
                        <td>$${totalCost} USD</td>
                    </tr>
                </tfoot>
                
              </table>

 
            <small class="mt-3 mb-0"> ${setupDescription}<br></small>
            ${this.quoteType === 'semestral' || this.quoteType === 'trimestral' ? `<small>*Costo al renovar el plan elegido: $${remainingAmount} USD</small>` : ''}
         
</div>


<div class="section pb-5">
    
        <h5 class="mb-2">Notas Adicionales:</h5>
        <ul>
            <li class="mb-2">Steambox Chat ofrece soporte 24/7. Cumplimos con nuestro Acuerdo de Nivel de Servicio (SLA), asegurando que su consulta sea atendida en un máximo de 6 horas comparado a competidores. Consulte nuestros <a href="${this.terms}" class="link">términos y condiciones</a> para más detalles.</li>
            <li class="mb-2"><strong>Reduccion de costos: </strong> Recomendamos el plan semestral equivalente a $69 USD por mes ya que es escalable y permite acelerar el retorno de inversión comparado a otras soluciones. </li>
            <li class="mb-2">Garantizamos la total privacidad de sus datos según las regulaciones GDPR, con servidores ubicados en Europa. Consulte nuestra <a href="${this.privacy}" class="link">política de privacidad</a> para más detalles.</li>
            <li class="mb-2"><strong>Otros servicios: </strong> Incluir personal para prospeción / atención al cliente y personalizar Steambox luego de adquirir un plan.</li>
        </ul>
</div>
 
 </div>
 <div class="container mt-5">
  
  <div class="section mt-5">
<div class="d-flex justify-content-center flex-column">
  <img src="https://steamboxchat.com/resources/img/chat-flow-mobile.avif" class="img-fluid mb-5 align-self-center" style=" max-width: 37em; max-height: 37em;">
<div>
    <h5 class="mt-3">Beneficios Incluidos:</h5>
    <ul class="pb-5">
      <li class="mb-2"><strong>Solución a Problemas de WhatsApp:</strong> Previene la pérdida de datos, elimina contactos duplicados y mejora el seguimiento de clientes.</li>
<li class="mb-2"><strong>Automatización de Respuesta y Menú Interactivo:</strong> Ofrece un menú interactivo con respuestas automáticas y derivación a distintas unidades.</li>
<li class="mb-2"><strong>Centralización del Número Principal de WhatsApp:</strong> Mejora el branding y facilita el contacto con los clientes a través de su canal preferido, con una alta tasa de apertura.</li>
<li class="mb-2"><strong>Bandeja de Seguimiento Personalizada:</strong> Proporciona a los agentes una bandeja organizada para seguimiento eficiente de conversaciones atendidas.</li>
<li class="mb-2"><strong>Chat para Sitio Web, Email y Telegram:</strong> Brinda atención instantánea a visitantes del sitio web y a consultas por Telegram y correo electrónico.</li>
<li class="mb-2"><strong>Accesos Independientes vía Mobile y Desktop:</strong> Permite a los agentes acceder de forma independiente desde dispositivos móviles y de escritorio, asegurando flexibilidad y productividad en cualquier lugar.</li>
    </ul>


</div>

  </div>`;
        }
      },
    });

    app.mount('#app');
  </script>
</body>

</html>