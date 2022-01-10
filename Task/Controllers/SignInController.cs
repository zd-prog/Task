using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Task.Models;

namespace Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignInController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public SignInController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public JsonResult SignIn(User user)
        {
            DataTable table = new DataTable();
            using (SqliteConnection connection = new SqliteConnection())
            {
                connection.ConnectionString = "Data Source=task.db";
                connection.Open();
                using (SqliteCommand command = new SqliteCommand())
                {
                    command.Connection = connection;
                    command.CommandText = $"select * from User where Email='{user.Email}' and Password='{user.Password}'";
                    SqliteDataReader reader = command.ExecuteReader();
                    table.Load(reader);

                    reader.Close();
                    connection.Close();
                }
            }

            if (table.Rows.Count != 0)
            {
                return new JsonResult(table);
            }
            else
            {
                return new JsonResult("No such user!");
            }
        }
    }
}
