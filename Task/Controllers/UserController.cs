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
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            using (SqliteConnection connection = new SqliteConnection())
            {
                connection.ConnectionString = "Data Source=task.db";
                connection.Open();
                using (SqliteCommand command = new SqliteCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "select * from User";
                    SqliteDataReader reader = command.ExecuteReader();
                    table.Load(reader);

                    reader.Close();
                    connection.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(User user)
        {
            DataTable table = new DataTable();
            using (SqliteConnection connection = new SqliteConnection())
            {
                connection.ConnectionString = "Data Source=task.db";
                connection.Open();
                using (SqliteCommand command = new SqliteCommand())
                {
                    command.Connection = connection;
                    command.CommandText = $"insert into User(Name, Password, Email, Role) values ('{user.Name}', '{user.Password}', '{user.Email}', 'User')";
                    SqliteDataReader reader = command.ExecuteReader();
                    table.Load(reader);

                    reader.Close();
                    connection.Close();
                }
            }

            return new JsonResult("Added successfully");
        }

        

    }
}
