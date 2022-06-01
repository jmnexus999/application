const Cryptr = require("cryptr");
const cryptr = new Cryptr("T");
var nodemailer = require("nodemailer");
const cola = require("../databases");

// module.exports = async function  (data)  {
//   console.log("kheeee",data);
// }

module.exports = {
  async emailsending(datos) {
    // se obtiene los datos de la cuenta de
    const idc = 1;
    const consulta = await cola.query("SELECT * FROM correo WHERE id=?", [idc]);
    const cdata = consulta[0];

    cdata.pass = await cryptr.decrypt(cdata.pass);

    contenHTML = `
        <!DOCTYPE html PUBLIC "" "">
        <html xmlns="">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="x-apple-disable-message-reformatting" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="color-scheme" content="light" />
            <meta name="supported-color-schemes" content="light" />
            <title></title>
            <style type="text/css" rel="stylesheet" media="all">
            /* Base ------------------------------ */
            
            @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
            body {
            width: 100% !important;
            height: 100%;
            margin: 0;
            -webkit-text-size-adjust: none;
            }
            
            a {
            color: #3869D4;
            }
            
            a img {
            border: none;
            }
            
            td {
            word-break: break-word;
            }
            
            .preheader {
            display: none !important;
            visibility: hidden;
            mso-hide: all;
            font-size: 1px;
            line-height: 1px;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            }
            /* Type ------------------------------ */
            
            body,
            td,
            th {
            font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
            }
            
            h1 {
            margin-top: 0;
            color: #ffffff;
            font-size: 22px;
            font-weight: bold;
            text-align: left;
            }
            
            h2 {
            margin-top: 0;
            color: #ffffff;
            font-size: 16px;
            font-weight: bold;
            text-align: left;
            }
            
            h3 {
            margin-top: 0;
            color: #ffffff;
            font-size: 14px;
            font-weight: bold;
            text-align: left;
            }
            
            td,
            th {
            font-size: 16px;
            }
            
            p,
            ul,
            ol,
            blockquote {
            margin: .4em 0 1.1875em;
            font-size: 16px;
            line-height: 1.625;
            }
            
            p.sub {
            font-size: 13px;
            }
            /* Utilities ------------------------------ */
            
            .align-right {
            text-align: right;
            }
            
            .align-left {
            text-align: left;
            }
            
            .align-center {
            text-align: center;
            }
            
            .u-margin-bottom-none {
            margin-bottom: 0;
            }
            /* Buttons ------------------------------ */
            
            .button {
            background-color: #3869D4;
            border-top: 10px solid #3869D4;
            border-right: 18px solid #3869D4;
            border-bottom: 10px solid #3869D4;
            border-left: 18px solid #3869D4;
            display: inline-block;
            color: #FFF;
            text-decoration: none;
            border-radius: 3px;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
            -webkit-text-size-adjust: none;
            box-sizing: border-box;
            }
            
            .button--green {
            background-color: #22BC66;
            border-top: 10px solid #22BC66;
            border-right: 18px solid #22BC66;
            border-bottom: 10px solid #22BC66;
            border-left: 18px solid #22BC66;
            }
            
            .button--red {
            background-color: #FF6136;
            border-top: 10px solid #FF6136;
            border-right: 18px solid #FF6136;
            border-bottom: 10px solid #FF6136;
            border-left: 18px solid #FF6136;
            }
            
            @media only screen and (max-width: 500px) {
            .button {
                width: 100% !important;
                text-align: center !important;
            }
            }
            /* Attribute list ------------------------------ */
            
            .attributes {
            margin: 0 0 21px;
            }
            
            .attributes_content {
            background-color: #000000;
            padding: 16px;
            }
            
            .attributes_item {
            padding: 0;
            }
            /* Related Items ------------------------------ */
            
            .related {
            width: 100%;
            margin: 0;
            padding: 25px 0 0 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            }
            
            .related_item {
            padding: 10px 0;
            color: #CBCCCF;
            font-size: 15px;
            line-height: 18px;
            }
            
            .related_item-title {
            display: block;
            margin: .5em 0 0;
            }
            
            .related_item-thumb {
            display: block;
            padding-bottom: 10px;
            }
            
            .related_heading {
            border-top: 1px solid #CBCCCF;
            text-align: center;
            padding: 25px 0 10px;
            }
            /* Discount Code ------------------------------ */
            
            .discount {
            width: 100%;
            margin: 0;
            padding: 24px;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            background-color: #F4F4F7;
            border: 2px dashed #CBCCCF;
            }
            
            .discount_heading {
            text-align: center;
            }
            
            .discount_body {
            text-align: center;
            font-size: 15px;
            }
            /* Social Icons ------------------------------ */
            
            .social {
            width: auto;
            }
            
            .social td {
            padding: 0;
            width: auto;
            }
            
            .social_icon {
            height: 20px;
            margin: 0 8px 10px 8px;
            padding: 0;
            }
            /* Data table ------------------------------ */
            
            .purchase {
            width: 100%;
            margin: 0;
            padding: 35px 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            }
            
            .purchase_content {
            width: 100%;
            margin: 0;
            padding: 25px 0 0 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            }
            
            .purchase_item {
            padding: 10px 0;
            color: #51545E;
            font-size: 15px;
            line-height: 18px;
            }
            
            .purchase_heading {
            padding-bottom: 8px;
            border-bottom: 1px solid #EAEAEC;
            }
            
            .purchase_heading p {
            margin: 0;
            color: #85878E;
            font-size: 12px;
            }
            
            .purchase_footer {
            padding-top: 15px;
            border-top: 1px solid #EAEAEC;
            }
            
            .purchase_total {
            margin: 0;
            text-align: right;
            font-weight: bold;
            color: #333333;
            }
            
            .purchase_total--label {
            padding: 0 15px 0 0;
            }
            
            body {
            background-color: #F2F4F6;
            color: #000000;
            }
            
            p {
            color: #000000;
            }
            
            .email-wrapper {
            width: 100%;
            margin: 0;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            background-color: #F2F4F6;
            }
            
            .email-content {
            width: 100%;
            margin: 0;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            }
            /* Masthead ----------------------- */
            
            .email-masthead {
            padding: 25px 0;
            text-align: center;
            }
            
            .email-masthead_logo {
            width: 94px;
            }
            
            .email-masthead_name {
            font-size: 16px;
            font-weight: bold;
            color: #A8AAAF;
            text-decoration: none;
            text-shadow: 0 1px 0 white;
            }
            /* Body ------------------------------ */
            
            .email-body {
            width: 100%;
            margin: 0;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            }
            
            .email-body_inner {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            -premailer-width: 570px;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            background-color: #ffffff;
            }
            
            .email-footer {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            -premailer-width: 570px;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            text-align: center;
            }
            
            .email-footer p {
            color: #A8AAAF;
            }
            
            .body-action {
            width: 100%;
            margin: 30px auto;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            text-align: center;
            }
            
            .body-sub {
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #EAEAEC;
            }
            
            .content-cell {
            padding: 45px;
            }
            /*Media Queries ------------------------------ */
            
            @media only screen and (max-width: 600px) {
            .email-body_inner,
            .email-footer {
                width: 100% !important;
            }
            }
            

            p,
            ul,
            ol,
            blockquote,
            h1,
            h2,
            h3,
            span,
            .purchase_item {
                color: #000000 !important;
            }
            .attributes_content,
            .discount {
                background-color: #ffffff !important;
            }
            .email-masthead_name {
                text-shadow: none !important;
            }
            }
            
            :root {
            color-scheme: light;
            supported-color-schemes: light;
            }
            </style>
            <!--[if mso]>
            <style type="text/css">
            .f-fallback  {
                font-family: Arial, sans-serif;
            }
            </style>
        <![endif]-->
        </head>
        <body>
        
        <table class="email-footer" width="570" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
            <td class="email-content" >
                <h1> Buen Dia ${datos.nombre} ${datos.apellido},</h1>
                
            </td>
            </tr>
            <tr height="50px">
            <td class="align-left">
                <br> Gracias por participar en el Concurso de DISAVEN CA, esta es una copia del recibo de su reciente participación.</br>
            </td>
            </tr>
        </table>                
        
            <span class="preheader">Este es un correo con el recibo de su participación en el concurso de DISAVEN.</span>
            <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
                <td align="center" >
                <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">

                    <!-- Email Body -->
                    <tr>
                    <td class="email-body" width="450" cellpadding="0" cellspacing="0">
                        <table class="email-body_inner" align="center" width="450" cellpadding="0" cellspacing="0" role="presentation">
                        <!-- Body content -->
                        <tr>
                            <td class="content-cell">
                            <div class="f-fallback">
                            
                                <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                    <td class="attributes_content">
                                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                        <tr>
                                        <td align="center">
                                            <b class="fs-1 fw-bold">Concurso DISAVEN</b>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td align="center">
                                            <b class="fs-1">RECIBO</b>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td align="center">
                                        <b class="fs-1">Fecha del Concurso 21/12/2022</b>
                                        </td>
                                    </tr>
                                    </table>
                                    </td>
                                </tr>
                                </table>
                                <!-- Action -->
                                <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                    <td align="center">
                                        <tr >
                                        <td align="center">
                                            <div class="container p-4 text-center" style="background-color: #ffcc00 ;">
                                            <b class="fs-2">Número de Ticket: ${datos.id}</b>
                                            </div>
                                        </td>
                                        </tr>
                                    </td>
                                </tr>
                                </table>
                                <table class="purchase" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                    <h3>Fecha del Ticket:</h3>
                                    </td>
                                    <td>
                                    <h3 class="align-right">${datos.creado}</h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <h3>Nombre:</h3>
                                    </td>
                                    <td>
                                    <h3 class="align-right">${datos.nombre} ${datos.apellido}</h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <h3>Identificación:</h3>
                                    </td>
                                    <td>
                                    <h3 class="align-right">${datos.cedula}</h3>
                                    </td>
                                </tr>                          
                                <tr>
                                <tr>
                                    <td>
                                    <h3>Número de contacto:</h3>
                                    </td>
                                    <td>
                                    <h3 class="align-right">${datos.numcontacto}</h3>
                                    </td>
                                </tr>                          
                                <tr>
                                    <td>
                                    <h3>Email:</h3>
                                    </td>
                                    <td>
                                    <h3 class="align-right">${datos.email}</h3>
                                    </td>
                                </tr>                          
                                <tr>
                                    <td>
                                    <h3>Pago:</h3>
                                    </td>
                                    <td>
                                    <h3 class="align-right">${datos.monto}</h3>
                                    </td>
                                </tr>  
                                <tr>
                                    <td>
                                    <h3>Método de pago:</h3>
                                    </td>
                                    <td>
                                    <h3 class="align-right">${datos.mpago}</h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <h3>Referencia:</h3>
                                    </td>
                                    <td>
                                    <h3 class="align-right">${datos.ref}</h3>
                                    </td>
                                </tr>                          

                                <hr> 

                                <table class="body" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                    <td align="center">
                                        <tr>
                                            <td align="center">
                                            <div class="container p-2 text-center";">
                                                <b class="fs-2">${datos.ciudad} - ${datos.pais}</b>
                                            </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                            <div class="container p-2 text-center";">
                                                <b class="fs-2">${datos.comentario}</b>
                                            </div>
                                            </td>
                                        </tr>
                                        <hr>   
                                        <tr>
                                            <td align="center">
                                            <div class="container p-2 text-center";">
                                                <p class="text-center lh-1">- DEV NO VALIDO -</p>
                                            </div>
                                            </td>
                                        </tr> 
                                    </td>
                                    </tr>
                                </table>

                                <!-- Sub copy -->

                            </div>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                    <table class="body-sub" role="presentation">
                    <tr>
                    <td>
                        <p class="f-fallback sub">Gracias por participar.</p>
                    </td>
                    </tr>
                    </table>
                    <tr>
                    <td>
                        <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                            <td class="content-cell" align="center">
                            <p class="f-fallback sub align-center">
                                DISAVEN CA
                                <br>J-50179465-0
                                <br>Caracas -Venezuela
                            </p>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            </table>
        </body>
        </html>
    `;
    if (cdata.secure == "true") {
      cdata.secure = true;
    } else {
      cdata.secure = false;
    }
    var transporter = nodemailer.createTransport({
      host: cdata.smtp,
      port: cdata.port,
      secure: cdata.secure,
      auth: {
        user: cdata.user,
        pass: cdata.pass,
      },
    });

    var mailOptions = {
      from: cdata.user,
      to: datos.email,
      subject: `Ticket ${datos.id} del Concurso DISAVEN`,
      // text: "¡Hola Mundo!",
      html: contenHTML,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("no se envio email", error);
      }
    });
  },
  async emailsendingm(datos, ticketv, totalv) {
    // se obtiene los datos de la cuenta de
    const idc = 1;
    const consulta = await cola.query("SELECT * FROM correo WHERE id=?", [idc]);
    const cdata = consulta[0];

    cdata.pass = await cryptr.decrypt(cdata.pass);

    contenHTML = `
          <!DOCTYPE html PUBLIC "" "">
          <html xmlns="">
          <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta name="x-apple-disable-message-reformatting" />
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <meta name="color-scheme" content="light" />
              <meta name="supported-color-schemes" content="light" />
              <title></title>
              <style type="text/css" rel="stylesheet" media="all">
              /* Base ------------------------------ */
              
              @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
              body {
              width: 100% !important;
              height: 100%;
              margin: 0;
              -webkit-text-size-adjust: none;
              }
              
              a {
              color: #3869D4;
              }
              
              a img {
              border: none;
              }
              
              td {
              word-break: break-word;
              }
              
              .preheader {
              display: none !important;
              visibility: hidden;
              mso-hide: all;
              font-size: 1px;
              line-height: 1px;
              max-height: 0;
              max-width: 0;
              opacity: 0;
              overflow: hidden;
              }
              /* Type ------------------------------ */
              
              body,
              td,
              th {
              font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
              }
              
              h1 {
              margin-top: 0;
              color: #ffffff;
              font-size: 22px;
              font-weight: bold;
              text-align: left;
              }
              
              h2 {
              margin-top: 0;
              color: #ffffff;
              font-size: 16px;
              font-weight: bold;
              text-align: left;
              }
              
              h3 {
              margin-top: 0;
              color: #ffffff;
              font-size: 14px;
              font-weight: bold;
              text-align: left;
              }
              
              td,
              th {
              font-size: 16px;
              }
              
              p,
              ul,
              ol,
              blockquote {
              margin: .4em 0 1.1875em;
              font-size: 16px;
              line-height: 1.625;
              }
              
              p.sub {
              font-size: 13px;
              }
              /* Utilities ------------------------------ */
              
              .align-right {
              text-align: right;
              }
              
              .align-left {
              text-align: left;
              }
              
              .align-center {
              text-align: center;
              }
              
              .u-margin-bottom-none {
              margin-bottom: 0;
              }
              /* Buttons ------------------------------ */
              
              .button {
              background-color: #3869D4;
              border-top: 10px solid #3869D4;
              border-right: 18px solid #3869D4;
              border-bottom: 10px solid #3869D4;
              border-left: 18px solid #3869D4;
              display: inline-block;
              color: #FFF;
              text-decoration: none;
              border-radius: 3px;
              box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
              -webkit-text-size-adjust: none;
              box-sizing: border-box;
              }
              
              .button--green {
              background-color: #22BC66;
              border-top: 10px solid #22BC66;
              border-right: 18px solid #22BC66;
              border-bottom: 10px solid #22BC66;
              border-left: 18px solid #22BC66;
              }
              
              .button--red {
              background-color: #FF6136;
              border-top: 10px solid #FF6136;
              border-right: 18px solid #FF6136;
              border-bottom: 10px solid #FF6136;
              border-left: 18px solid #FF6136;
              }
              
              @media only screen and (max-width: 500px) {
              .button {
                  width: 100% !important;
                  text-align: center !important;
              }
              }
              /* Attribute list ------------------------------ */
              
              .attributes {
              margin: 0 0 21px;
              }
              
              .attributes_content {
              background-color: #000000;
              padding: 16px;
              }
              
              .attributes_item {
              padding: 0;
              }
              /* Related Items ------------------------------ */
              
              .related {
              width: 100%;
              margin: 0;
              padding: 25px 0 0 0;
              -premailer-width: 100%;
              -premailer-cellpadding: 0;
              -premailer-cellspacing: 0;
              }
              
              .related_item {
              padding: 10px 0;
              color: #CBCCCF;
              font-size: 15px;
              line-height: 18px;
              }
              
              .related_item-title {
              display: block;
              margin: .5em 0 0;
              }
              
              .related_item-thumb {
              display: block;
              padding-bottom: 10px;
              }
              
              .related_heading {
              border-top: 1px solid #CBCCCF;
              text-align: center;
              padding: 25px 0 10px;
              }
              /* Discount Code ------------------------------ */
              
              .discount {
              width: 100%;
              margin: 0;
              padding: 24px;
              -premailer-width: 100%;
              -premailer-cellpadding: 0;
              -premailer-cellspacing: 0;
              background-color: #F4F4F7;
              border: 2px dashed #CBCCCF;
              }
              
              .discount_heading {
              text-align: center;
              }
              
              .discount_body {
              text-align: center;
              font-size: 15px;
              }
              /* Social Icons ------------------------------ */
              
              .social {
              width: auto;
              }
              
              .social td {
              padding: 0;
              width: auto;
              }
              
              .social_icon {
              height: 20px;
              margin: 0 8px 10px 8px;
              padding: 0;
              }
              /* Data table ------------------------------ */
              
              .purchase {
              width: 100%;
              margin: 0;
              padding: 35px 0;
              -premailer-width: 100%;
              -premailer-cellpadding: 0;
              -premailer-cellspacing: 0;
              }
              
              .purchase_content {
              width: 100%;
              margin: 0;
              padding: 25px 0 0 0;
              -premailer-width: 100%;
              -premailer-cellpadding: 0;
              -premailer-cellspacing: 0;
              }
              
              .purchase_item {
              padding: 10px 0;
              color: #51545E;
              font-size: 15px;
              line-height: 18px;
              }
              
              .purchase_heading {
              padding-bottom: 8px;
              border-bottom: 1px solid #EAEAEC;
              }
              
              .purchase_heading p {
              margin: 0;
              color: #85878E;
              font-size: 12px;
              }
              
              .purchase_footer {
              padding-top: 15px;
              border-top: 1px solid #EAEAEC;
              }
              
              .purchase_total {
              margin: 0;
              text-align: right;
              font-weight: bold;
              color: #333333;
              }
              
              .purchase_total--label {
              padding: 0 15px 0 0;
              }
              
              body {
              background-color: #F2F4F6;
              color: #000000;
              }
              
              p {
              color: #000000;
              }
              
              .email-wrapper {
              width: 100%;
              margin: 0;
              padding: 0;
              -premailer-width: 100%;
              -premailer-cellpadding: 0;
              -premailer-cellspacing: 0;
              background-color: #F2F4F6;
              }
              
              .email-content {
              width: 100%;
              margin: 0;
              padding: 0;
              -premailer-width: 100%;
              -premailer-cellpadding: 0;
              -premailer-cellspacing: 0;
              }
              /* Masthead ----------------------- */
              
              .email-masthead {
              padding: 25px 0;
              text-align: center;
              }
              
              .email-masthead_logo {
              width: 94px;
              }
              
              .email-masthead_name {
              font-size: 16px;
              font-weight: bold;
              color: #A8AAAF;
              text-decoration: none;
              text-shadow: 0 1px 0 white;
              }
              /* Body ------------------------------ */
              
              .email-body {
              width: 100%;
              margin: 0;
              padding: 0;
              -premailer-width: 100%;
              -premailer-cellpadding: 0;
              -premailer-cellspacing: 0;
              }
              
              .email-body_inner {
              width: 570px;
              margin: 0 auto;
              padding: 0;
              -premailer-width: 570px;
              -premailer-cellpadding: 0;
              -premailer-cellspacing: 0;
              background-color: #ffffff;
              }
              
              .email-footer {
              width: 570px;
              margin: 0 auto;
              padding: 0;
              -premailer-width: 570px;
              -premailer-cellpadding: 0;
              -premailer-cellspacing: 0;
              text-align: center;
              }
              
              .email-footer p {
              color: #A8AAAF;
              }
              
              .body-action {
              width: 100%;
              margin: 30px auto;
              padding: 0;
              -premailer-width: 100%;
              -premailer-cellpadding: 0;
              -premailer-cellspacing: 0;
              text-align: center;
              }
              
              .body-sub {
              margin-top: 25px;
              padding-top: 25px;
              border-top: 1px solid #EAEAEC;
              }
              
              .content-cell {
              padding: 45px;
              }
              /*Media Queries ------------------------------ */
              
              @media only screen and (max-width: 600px) {
              .email-body_inner,
              .email-footer {
                  width: 100% !important;
              }
              }
              
  
              p,
              ul,
              ol,
              blockquote,
              h1,
              h2,
              h3,
              span,
              .purchase_item {
                  color: #000000 !important;
              }
              .attributes_content,
              .discount {
                  background-color: #ffffff !important;
              }
              .email-masthead_name {
                  text-shadow: none !important;
              }
              }
              
              :root {
              color-scheme: light;
              supported-color-schemes: light;
              }
              </style>
              <!--[if mso]>
              <style type="text/css">
              .f-fallback  {
                  font-family: Arial, sans-serif;
              }
              </style>
          <![endif]-->
          </head>
          <body>
          
          <table class="email-footer" width="570" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
              <td class="email-content" >
                  <h1> Buen Dia ${datos.nombre} ${datos.apellido},</h1>
                  
              </td>
              </tr>
              <tr height="50px">
              <td class="align-left">
                  <br> Gracias por participar en el Concurso de DISAVEN CA, esta es una copia del recibo de su reciente participación.</br>
              </td>
              </tr>
          </table>                
          
              <span class="preheader">Este es un correo con el recibo de su participación en el concurso de DISAVEN.</span>
              <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                  <td align="center" >
                  <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
  
                      <!-- Email Body -->
                      <tr>
                      <td class="email-body" width="450" cellpadding="0" cellspacing="0">
                          <table class="email-body_inner" align="center" width="450" cellpadding="0" cellspacing="0" role="presentation">
                          <!-- Body content -->
                          <tr>
                              <td class="content-cell">
                              <div class="f-fallback">
                              
                                  <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                      <td class="attributes_content">
                                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                          <tr>
                                          <td align="center">
                                              <b class="fs-1 fw-bold">Concurso DISAVEN</b>
                                          </td>
                                          </tr>
                                          <tr>
                                          <td align="center">
                                              <b class="fs-1">RECIBO</b>
                                          </td>
                                          </tr>
                                          <tr>
                                          <td align="center">
                                          <b class="fs-1">Fecha del Concurso 21/12/2022</b>
                                          </td>
                                      </tr>
                                      </table>
                                      </td>
                                  </tr>
                                  </table>
                                  <!-- Action -->
                                  <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                      <td align="center">
                                          <tr >
                                          <td align="center">
                                              <div class="container p-4 text-center" style="background-color: #ffcc00 ;">
                                              <b class="fs-2">Número de Ticket: ${ticketv}</b>
                                              </div>
                                          </td>
                                          </tr>
                                      </td>
                                  </tr>
                                  </table>
                                  <table class="purchase" width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                      <td>
                                      <h3>Fecha del Ticket:</h3>
                                      </td>
                                      <td>
                                      <h3 class="align-right">${datos.creado}</h3>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td>
                                      <h3>Nombre:</h3>
                                      </td>
                                      <td>
                                      <h3 class="align-right">${datos.nombre} ${datos.apellido}</h3>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td>
                                      <h3>Identificación:</h3>
                                      </td>
                                      <td>
                                      <h3 class="align-right">${datos.cedula}</h3>
                                      </td>
                                  </tr>                          
                                  <tr>
                                  <tr>
                                      <td>
                                      <h3>Número de contacto:</h3>
                                      </td>
                                      <td>
                                      <h3 class="align-right">${datos.numcontacto}</h3>
                                      </td>
                                  </tr>                          
                                  <tr>
                                      <td>
                                      <h3>Email:</h3>
                                      </td>
                                      <td>
                                      <h3 class="align-right">${datos.email}</h3>
                                      </td>
                                  </tr>                          
                                  <tr>
                                      <td>
                                        <h3>Pago:</h3>
                                      </td>
                                      <td>
                                        <h3 class="align-right">${datos.monto}</h3>
                                      </td>
                                  </tr>  
                                    <tr>
                                        <td>
                                            <h3>Total venta:</h3>
                                        </td>
                                        <td>
                                            <h3 class="align-right">${totalv}</h3>
                                        </td>
                                    </tr>  
                                    <tr>
                                        <td>
                                            <h3>Método de pago:</h3>
                                        </td>
                                        <td>
                                            <h3 class="align-right">${datos.mpago}</h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h3>Referencia:</h3>
                                        </td>
                                        <td>
                                            <h3 class="align-right">${datos.ref}</h3>
                                        </td>
                                    </tr>                          
  
                                  <hr> 
  
                                  <table class="body" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                      <tr>
                                      <td align="center">
                                          <tr>
                                              <td align="center">
                                              <div class="container p-2 text-center";">
                                                  <b class="fs-2">${datos.ciudad} - ${datos.pais}</b>
                                              </div>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td align="center">
                                              <div class="container p-2 text-center";">
                                                  <b class="fs-2">${datos.comentario}</b>
                                              </div>
                                              </td>
                                          </tr>
                                          <hr>   
                                          <tr>
                                              <td align="center">
                                              <div class="container p-2 text-center";">
                                                  <p class="text-center lh-1">- DEV NO VALIDO -</p>
                                              </div>
                                              </td>
                                          </tr> 
                                      </td>
                                      </tr>
                                  </table>
  
                                  <!-- Sub copy -->
  
                              </div>
                              </td>
                          </tr>
                          </table>
                      </td>
                      </tr>
                      <table class="body-sub" role="presentation">
                      <tr>
                      <td>
                          <p class="f-fallback sub">Gracias por participar.</p>
                      </td>
                      </tr>
                      </table>
                      <tr>
                      <td>
                          <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                              <td class="content-cell" align="center">
                              <p class="f-fallback sub align-center">
                                  DISAVEN CA
                                  <br>J-50179465-0
                                  <br>Caracas -Venezuela
                              </p>
                              </td>
                          </tr>
                          </table>
                      </td>
                      </tr>
                  </table>
                  </td>
              </tr>
              </table>
          </body>
          </html>
      `;
    if (cdata.secure == "true") {
      cdata.secure = true;
    } else {
      cdata.secure = false;
    }
    var transporter = nodemailer.createTransport({
      host: cdata.smtp,
      port: cdata.port,
      secure: cdata.secure,
      auth: {
        user: cdata.user,
        pass: cdata.pass,
      },
    });

    var mailOptions = {
      from: cdata.user,
      to: datos.email,
      subject: `Ticket ${datos.id} del Concurso DISAVEN`,
      // text: "¡Hola Mundo!",
      html: contenHTML,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("no se envio email", error);
      }
    });
  },
};
