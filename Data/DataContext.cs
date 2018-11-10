using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using notes.Entities;

namespace notes.Data
{
    public interface Any
    {
    }

    public static class Utils
    {
        public static T Deserialize<T>(this string toDeserialize)
        {
            return JsonConvert.DeserializeObject<T>(toDeserialize);
        }

        public static string Serialize<T>(this T toSerialize)
        {
            return JsonConvert.SerializeObject(toSerialize);

        }

        public static async Task WriteToFile<T>(this DbSet<T> data, string filename) where T : class
        {
            using (var ms = System.IO.File.Create(filename))
            {
                var items = await data.ToArrayAsync();
                var sw = new StreamWriter(ms, new UnicodeEncoding());
                try
                {
                    await sw.WriteAsync(items.Serialize());
                    sw.Flush();//otherwise you are risking empty stream
                    ms.Seek(0, SeekOrigin.Begin);
                }
                finally
                {
                    sw.Dispose();

                }
            };
        }
    }
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {

            var context = serviceProvider.GetRequiredService<DataContext>();
            var logger = serviceProvider.GetRequiredService<ILogger<SeedData>>();

            context.Database.EnsureCreated();
            if (File.Exists("users.json"))
            {
                var users = File.ReadAllText("users.json").Deserialize<User[]>();
                logger.LogInformation($"seeding users {users.Serialize()}");
                context.Users.AddRange(users);
                context.SaveChanges();
            }
            else
            {
                logger.LogInformation($"no persist file");

            }
            if (File.Exists("notes.json"))
            {
                var notes = File.ReadAllText("notes.json").Deserialize<List<Note>>();
                context.Notes.AddRange(notes);
                context.SaveChanges();

            }
        }
    }
    public class DataContext : DbContext
    {

        ILogger<DataContext> logger;
        public DataContext(DbContextOptions<DataContext> options, ILogger<DataContext> lg) : base(options)
        {
            this.logger = lg;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Note> Notes { get; set; }
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            await base.SaveChangesAsync();
            var task = Notes.WriteToFile("notes.json");
            var task2 = Users.WriteToFile("users.json");
            await task;
            await task2;
            return 0;
        }
    }
}