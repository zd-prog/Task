using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Task.Workers
{
    interface IEmailSender
    {
        System.Threading.Tasks.Task SendEmailAsync(string email, string subject, string message, Attachment scv);
    }
}
