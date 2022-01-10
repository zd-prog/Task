using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Task.Models;

namespace Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public TaskController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("{id:int}")]
        [HttpGet]
        public JsonResult Get(int id)
        {
            DataTable table = new DataTable();
            using (SqliteConnection connection = new SqliteConnection())
            {
                connection.ConnectionString = "Data Source=task.db";
                connection.Open();
                using (SqliteCommand command = new SqliteCommand())
                {
                    command.Connection = connection;
                    command.CommandText = $"select * from Task where UserId = {id}";
                    SqliteDataReader reader = command.ExecuteReader();
                    table.Load(reader);

                    reader.Close();
                    connection.Close();
                }
            }

            return new JsonResult(table);
        }
      


        [HttpPost]
        public JsonResult Post(TaskForEmail task)
        {
            DataTable table = new DataTable();
            using (SqliteConnection connection = new SqliteConnection())
            {
                connection.ConnectionString = "Data Source=task.db";
                connection.Open();
                using (SqliteCommand command = new SqliteCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "insert into Task(UserId, API, Name, " +
                        "Description, Period, LastUsed) VALUES('" + task.UserId + "', '" +
                        task.Api + "', '" + task.Name + "', '" + task.Description +
                        "', '" + task.Period + "', '" + task.LastUsed +"')";
                    SqliteDataReader reader = command.ExecuteReader();
                    table.Load(reader);

                    reader.Close();
                    connection.Close();
                }
            }

            return new JsonResult("Added successfully");
        }

        [HttpPut]
        public JsonResult Update(TaskForEmail task)
        {
            DataTable table = new DataTable();
            using (SqliteConnection connection = new SqliteConnection())
            {
                connection.ConnectionString = "Data Source=task.db";
                connection.Open();
                using (SqliteCommand command = new SqliteCommand())
                {
                    command.Connection = connection;
                    command.CommandText = $"update Task set UserId = {task.UserId}, API='{task.Api}', Name = '{task.Name}', " +
                        $"Description = '{task.Description}', Period = '{task.Period}', LastUsed = '{task.LastUsed}' where Id = {task.Id}";
                    SqliteDataReader reader = command.ExecuteReader();
                    table.Load(reader);

                    reader.Close();
                    connection.Close();
                }
            }

            return new JsonResult("Updated successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            DataTable table = new DataTable();
            using (SqliteConnection connection = new SqliteConnection())
            {
                connection.ConnectionString = "Data Source=task.db";
                connection.Open();
                using (SqliteCommand command = new SqliteCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "delete from Task where Id =" + id;
                    SqliteDataReader reader = command.ExecuteReader();
                    table.Load(reader);

                    reader.Close();
                    connection.Close();
                }
            }

            return new JsonResult("Deleted successfully");
        }
    }
}
