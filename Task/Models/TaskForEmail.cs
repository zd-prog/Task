using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Task.Models
{
    public class TaskForEmail
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Api { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Period { get; set; }
        public string LastUsed { get; set; }
    }
}
