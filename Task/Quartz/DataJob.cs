using Microsoft.Extensions.DependencyInjection;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Task.Workers;

namespace Task.Quartz
{
    public class DataJob : IJob
    {
        private readonly IServiceScopeFactory serviceScopeFactory;
        private string Email { get; set; }
        private string Message { get; set; }
        private Attachment csv { get; set; }

        public DataJob(IServiceScopeFactory serviceScopeFactory, string Email, string Message, Attachment csv)
        {
            this.serviceScopeFactory = serviceScopeFactory;
            this.Email = Email;
            this.Message = Message;
            this.csv = csv;
        }
        public async System.Threading.Tasks.Task Execute(IJobExecutionContext context)
        {
            using (var scope = serviceScopeFactory.CreateScope())
            {
                var emailsender = scope.ServiceProvider.GetService<IEmailSender>();

                await emailsender.SendEmailAsync(Email, "TaskAPI", Message, csv);
            }
        }
    }
}
