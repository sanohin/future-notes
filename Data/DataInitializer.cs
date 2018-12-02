using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace notes.Data
{

    public class DataInitializer
    {
        public static void Initialize(IWebHost host)
        {

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var logger = services.GetRequiredService<ILogger<DataInitializer>>();

                try
                {
                    services.GetRequiredService<DataContext>().Database.Migrate();
                    logger.LogInformation("Migration done");

                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "An error occurred seeding the DB.");
                }
            }
        }
    }
}