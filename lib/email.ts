import { Resend } from 'resend';

let resendInstance: Resend | null = null;

function getResend(): Resend {
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

const FROM_EMAIL = process.env.EMAIL_FROM || 'From The Ascendant <readings@fromtheascendant.com>';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function sendMagicLinkEmail(email: string, token: string): Promise<void> {
  const magicLink = `${APP_URL}/auth/verify?token=${token}`;

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Your login link for From The Ascendant',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: Georgia, 'Times New Roman', serif;
              line-height: 1.7;
              color: #2d2d2d;
              max-width: 560px;
              margin: 0 auto;
              padding: 40px 20px;
              background-color: #faf9f7;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
            }
            .header h1 {
              font-size: 24px;
              font-weight: normal;
              letter-spacing: 0.5px;
              margin: 0;
            }
            .content {
              background: white;
              padding: 40px;
              border: 1px solid #e8e6e3;
            }
            .button {
              display: inline-block;
              background-color: #2d2d2d;
              color: white !important;
              text-decoration: none;
              padding: 14px 32px;
              font-family: system-ui, sans-serif;
              font-size: 14px;
              letter-spacing: 0.5px;
              margin: 24px 0;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              font-size: 13px;
              color: #9a9a9a;
            }
            .link-fallback {
              font-size: 13px;
              color: #6b6b6b;
              word-break: break-all;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>From The Ascendant</h1>
          </div>
          <div class="content">
            <p>Welcome.</p>
            <p>Click the button below to sign in to your account. This link will expire in 15 minutes.</p>
            <p style="text-align: center;">
              <a href="${magicLink}" class="button">Sign In</a>
            </p>
            <p class="link-fallback">
              Or copy this link:<br>
              ${magicLink}
            </p>
          </div>
          <div class="footer">
            <p>If you didn't request this email, you can safely ignore it.</p>
          </div>
        </body>
      </html>
    `,
    text: `Sign in to From The Ascendant\n\nClick this link to sign in: ${magicLink}\n\nThis link expires in 15 minutes.\n\nIf you didn't request this email, you can safely ignore it.`,
  });
}

export async function sendWeeklyReadingEmail(
  email: string,
  reading: string,
  sunSign: string | null
): Promise<void> {
  const signDisplay = sunSign || 'your sign';

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Your week from the Ascendant',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: Georgia, 'Times New Roman', serif;
              line-height: 1.8;
              color: #2d2d2d;
              max-width: 560px;
              margin: 0 auto;
              padding: 40px 20px;
              background-color: #faf9f7;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
              padding-bottom: 20px;
              border-bottom: 1px solid #e8e6e3;
            }
            .header h1 {
              font-size: 24px;
              font-weight: normal;
              letter-spacing: 0.5px;
              margin: 0;
            }
            .header p {
              font-size: 14px;
              color: #6b6b6b;
              margin: 8px 0 0 0;
            }
            .content {
              background: white;
              padding: 40px;
              border: 1px solid #e8e6e3;
            }
            .reading {
              font-size: 16px;
              white-space: pre-wrap;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              font-size: 13px;
              color: #9a9a9a;
            }
            .footer a {
              color: #6b6b6b;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>From The Ascendant</h1>
            <p>Your weekly reading for ${signDisplay}</p>
          </div>
          <div class="content">
            <div class="reading">${reading.replace(/\n/g, '<br>')}</div>
          </div>
          <div class="footer">
            <p>From The Ascendant is the written home of The Ascendant.</p>
            <p><a href="${APP_URL}/settings">Manage your preferences</a></p>
          </div>
        </body>
      </html>
    `,
    text: `Your week from the Ascendant\n\n${reading}\n\n---\nFrom The Ascendant is the written home of The Ascendant.\nManage your preferences: ${APP_URL}/settings`,
  });
}
