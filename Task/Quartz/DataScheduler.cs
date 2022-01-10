using Quartz;
using Quartz.Impl;
using System;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Task.Quartz
{
    public class DataScheduler
    {
        public static async void Start(IServiceProvider serviceProvider, int minutes, int hours, int days)
        {
            IScheduler scheduler = await StdSchedulerFactory.GetDefaultScheduler();
            scheduler.JobFactory = (global::Quartz.Spi.IJobFactory)serviceProvider.GetService<JobFactory>();
            await scheduler.Start();

            IJobDetail jobDetail = JobBuilder.Create<DataJob>().Build();
            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity("MailingTrigger", "default")
                .StartNow()
                .WithCronSchedule($"{minutes} {hours} */{days} * *")
                .Build();

            await scheduler.ScheduleJob(jobDetail, trigger);
        }
    }
}
