using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Task.Workers
{
    public class EmailSender : IEmailSender
    {
        public System.Threading.Tasks.Task SendEmailAsync(string email, string subject, string message, Attachment csv)
        {
			var from = "taskapi936@gmail.com";
			var pass = "taskAPI936";
			SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
			client.DeliveryMethod = SmtpDeliveryMethod.Network;
			client.UseDefaultCredentials = false;
			client.Credentials = new System.Net.NetworkCredential(from, pass);
			client.EnableSsl = true;
			var mail = new MailMessage(from, email);
			mail.Subject = subject;
			mail.Body = message;
			mail.IsBodyHtml = true;
			mail.Attachments.Add(csv);
			return client.SendMailAsync(mail);
        }
    }
}
