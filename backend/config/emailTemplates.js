export const ENQUIRY_EMAIL_TEMPLATE = (enquiryData) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .header {
            background-color: #2563eb;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: white;
            padding: 30px;
            border-radius: 0 0 5px 5px;
        }
        .field {
            margin-bottom: 15px;
        }
        .label {
            font-weight: bold;
            color: #555;
        }
        .value {
            color: #333;
            margin-top: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #777;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Product Enquiry Received</h2>
        </div>
        <div class="content">
            <p>You have received a new enquiry from your website. Details below:</p>
            
            <div class="field">
                <div class="label">Product Name:</div>
                <div class="value">${enquiryData.productName}</div>
            </div>
            
            <div class="field">
                <div class="label">Quantity:</div>
                <div class="value">${enquiryData.quantity}</div>
            </div>
            
            <div class="field">
                <div class="label">Customer Email:</div>
                <div class="value">${enquiryData.email}</div>
            </div>
            
            <div class="field">
                <div class="label">Mobile Number:</div>
                <div class="value">${enquiryData.mobileNo}</div>
            </div>
            
            ${enquiryData.companyName ? `
            <div class="field">
                <div class="label">Company Name:</div>
                <div class="value">${enquiryData.companyName}</div>
            </div>
            ` : ''}
            
            <div class="field">
                <div class="label">Country:</div>
                <div class="value">${enquiryData.country}</div>
            </div>
            
            ${enquiryData.purpose ? `
            <div class="field">
                <div class="label">Purpose:</div>
                <div class="value">${enquiryData.purpose}</div>
            </div>
            ` : ''}
            
            ${enquiryData.requirementDetails ? `
            <div class="field">
                <div class="label">Requirement Details:</div>
                <div class="value">${enquiryData.requirementDetails}</div>
            </div>
            ` : ''}
            
            <div class="field">
                <div class="label">Submitted On:</div>
                <div class="value">${new Date().toLocaleString()}</div>
            </div>
        </div>
        <div class="footer">
            <p>This is an automated notification from TESPA Metrology</p>
        </div>
    </div>
</body>
</html>
`;

export const CONTACT_EMAIL_TEMPLATE = (contactData) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .header {
            background-color: #27a3d4;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: white;
            padding: 30px;
            border-radius: 0 0 5px 5px;
        }
        .field {
            margin-bottom: 15px;
        }
        .label {
            font-weight: bold;
            color: #555;
        }
        .value {
            color: #333;
            margin-top: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #777;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Contact Form Submission</h2>
        </div>
        <div class="content">
            <p>You have received a new contact form submission from your website. Details below:</p>
            
            <div class="field">
                <div class="label">Product / Service:</div>
                <div class="value">${contactData.product}</div>
            </div>
            
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">${contactData.name}</div>
            </div>
            
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">${contactData.email}</div>
            </div>
            
            <div class="field">
                <div class="label">Mobile:</div>
                <div class="value">${contactData.mobile}</div>
            </div>
            
            <div class="field">
                <div class="label">Enquiry Details:</div>
                <div class="value">${contactData.enquiry}</div>
            </div>
            
            ${contactData.requirement ? `
            <div class="field">
                <div class="label">Requirement:</div>
                <div class="value">${contactData.requirement}</div>
            </div>
            ` : ''}
            
            <div class="field">
                <div class="label">Submitted On:</div>
                <div class="value">${new Date().toLocaleString()}</div>
            </div>
        </div>
        <div class="footer">
            <p>This is an automated notification from TESPA Metrology</p>
        </div>
    </div>
</body>
</html>
`
