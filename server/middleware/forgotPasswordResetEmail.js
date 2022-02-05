const moment = require('moment');
const sendEmail = (email, securityCode) => {
  const mailjet = require("node-mailjet").connect(
    "6899d8eca2c5adbab6c3b06b5e5e151a",
    "1758d2cffa591f6d9ed0ef8a81c428c6"
  );
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "gotuu.app@gmail.com",
          Name: "Gotuu",
        },
        To: [
          {
            Email: email,
            Name: 'Aunsh',
          },
        ],
        Subject: "Reset Password",
        TextPart: "Greetings from Mailjet!",
        HTMLPart: `
        <!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title></title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    table, td, div, h1, p {font-family: Arial, sans-serif;}
  </style>
</head>
<body style="margin:0;padding:0;">
  <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
    <tr>
      <td align="center" style="padding:0;">
        <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
          <tr style="height: 10px;">
            <td align="center" style="padding:5px 0 5px 0;background:#2e2e2e;">
                <img src='https://i.postimg.cc/mDXch8wx/gotuu-Logo-Login.png' alt="" width="60" style="height:auto;display:block;" />
                <h1 style="font-size:20px;margin:5px 0 5px 0;font-family:Arial,sans-serif;color:#fff;">Reset Password</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 30px 25px 30px;">
              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                <tr>
                  <td style="padding:0 0 20px 0;color:#153643;" align="center">
                    <h1 style="font-size:18px;margin:0 0 20px 0;font-family:Arial,sans-serif; color: gray;">Your reset code is:</h1>
                    <h2 style="font-size:14px;margin:0 0 20px 0;font-family:Arial,sans-serif; color: rgb(64, 64, 64);">${securityCode}</h2>
                    <p style="margin:0 0 20px 0;font-size:14px;line-height:24px;font-family:Arial,sans-serif; color: gray;">Date: ${moment().format(
                      "DD/MM/YYYY"
                    )} | Time: ${moment().format(
          "hh:mm a"
        )} | Reset Code Validity:10 minutes.</p>
                  </td>
                </tr>
                <tr>
                    <td style="padding:0 0 20px 0;color:#153643;" align="center">
                        <div style="border: 1px solid gray;"></div>
                    </td>
                </tr>
                <tr>
                  <td style="padding:0;">
                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                      <tr>
                        <td style="width:260px;padding:0;vertical-align:top;color:#153643;">
                          <h1 style="font-size:15px;margin:0 0 20px 0;font-family:Arial,sans-serif; color: gray;" align="center">Tips for a new password: </h1>
                          <p style="margin:0 0 12px 0;font-size:13px;line-height:24px;font-family:Arial,sans-serif;">
                            <ol style="margin:0 0 12px 0;font-size:13px;line-height:24px;font-family:Arial,sans-serif;">
                                <li>Password should be of at least 8 characters or more</li>
                                <li>Password should contain special characters such as '!', '@', '#" and numbers</li>
                                <li>Avoid disclosing your password to anyone.</li>
                                <li>Avoid having common places and words as your password.</li>
                            </ol>
                          </p>
                          <p style="margin:0;font-size:13px;line-height:24px;font-family:Arial,sans-serif;" align="center"><a href="https://blog.avast.com/strong-password-ideas"  target="_blank" rel="noreferrer" style="color:#31c22a;text-decoration:underline;">How to create a strong password</a></p>
                          <p style="margin:0;font-size:10px;line-height:24px;font-family:Arial,sans-serif;" align="center"><a href="https://blog.avast.com/strong-password-ideas"  target="_blank" rel="noreferrer" style="color:#bababa;text-decoration:none;"Unsubscribe</a></p>
                          <p style="color:#bababa;margin:0;font-size:10px;line-height:10px;font-family:Arial,sans-serif;" align="center">	&copy; Gotuu 2022</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
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
        `,
      },
    ],
  });
  request
    .then((result) => {
      console.log('Email Sent');
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
}

module.exports = {
  sendEmail,
};
