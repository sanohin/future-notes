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
    public class DataInitializer
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {

            serviceProvider.GetRequiredService<DataContext>().Database.Migrate();

            var db = serviceProvider.GetRequiredService<DataContext>();
            var logger = serviceProvider.GetRequiredService<ILogger<DataInitializer>>();
            db.Database.Migrate();
            logger.LogInformation("Migration done");
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
    }
}