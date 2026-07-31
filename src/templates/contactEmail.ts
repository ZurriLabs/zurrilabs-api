export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildFieldRow = (label: string, value: string): string => `
              <tr>
                <td style="padding:14px 20px;border-bottom:1px solid #1a2238;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:#5b6b8f;padding-bottom:6px;">${escapeHtml(label)}</td>
                    </tr>
                    <tr>
                      <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#e6edf7;">${value}</td>
                    </tr>
                  </table>
                </td>
              </tr>`;

const buildMessageBlock = (message: string): string => `
              <tr>
                <td style="padding:20px;background-color:#0a0f1f;border:1px solid #1a2238;border-radius:8px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:#00D4FF;padding-bottom:10px;">Mensaje</td>
                    </tr>
                    <tr>
                      <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#e6edf7;white-space:pre-wrap;">${escapeHtml(message)}</td>
                    </tr>
                  </table>
                </td>
              </tr>`;

export function contactEmailTemplate(data: ContactEmailData): string {
  const { name, email, phone, company, service, budget, message } = data;

  const rows: string[] = [];
  rows.push(buildFieldRow("Nombre", escapeHtml(name)));
  rows.push(
    buildFieldRow(
      "Email",
      `<a href="mailto:${escapeHtml(email)}" style="color:#00D4FF;text-decoration:none;">${escapeHtml(email)}</a>`,
    ),
  );
  if (phone && phone.trim()) {
    rows.push(buildFieldRow("Teléfono", escapeHtml(phone)));
  }
  if (company && company.trim()) {
    rows.push(buildFieldRow("Empresa", escapeHtml(company)));
  }
  if (service && service.trim()) {
    rows.push(buildFieldRow("Servicio solicitado", escapeHtml(service)));
  }
  if (budget && budget.trim()) {
    rows.push(buildFieldRow("Presupuesto", escapeHtml(budget)));
  }

  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: propuesta de ${name}`)}`;

  return `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Nueva propuesta recibida — ZURRILABS</title>
  </head>
  <body style="margin:0;padding:0;background-color:#05070d;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#05070d;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background-color:#0a0f1f;border:1px solid #1a2238;border-radius:12px;overflow:hidden;">

            <tr>
              <td style="padding:36px 40px 28px 40px;border-bottom:1px solid #1a2238;background:linear-gradient(180deg,#0a0f1f 0%,#05070d 100%);">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;letter-spacing:6px;color:#ffffff;">ZURRILABS</td>
                  </tr>
                  <tr>
                    <td style="padding-top:10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:#00D4FF;">Nueva propuesta recibida</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 24px 8px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#0d1426;border:1px solid #1a2238;border-radius:10px;">
                  ${rows.join("")}
                  <tr>
                    <td style="padding:14px 20px;"></td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:8px 24px 28px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  ${buildMessageBlock(message)}
                </table>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:0 24px 36px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center" style="border-radius:8px;background-color:#0066FF;background-image:linear-gradient(90deg,#0066FF 0%,#00D4FF 100%);">
                      <a href="${escapeHtml(replyHref)}" target="_blank" style="display:inline-block;padding:14px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;letter-spacing:0.5px;color:#ffffff;text-decoration:none;border-radius:8px;">Responder &rarr;</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 40px 28px 40px;border-top:1px solid #1a2238;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;line-height:1.5;color:#5b6b8f;text-align:center;">Este mensaje llegó desde el formulario de contacto de zurrilabs.com</td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
