using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace Server
{
    public class Startup
    {
        private static ProxyOptions SPA = new ProxyOptions
        {
            Scheme = "http",
            Host = "web",
            Port = "80"
        };
        private static ProxyOptions API = new ProxyOptions
        {
            Scheme = "http",
            Host = "client",
            Port = "80"
        };
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.Map("/api", e => e.RunProxy(API));
            app.MapWhen(s => !s.Request.Path.StartsWithSegments("/api"), r => r.RunProxy(SPA));
        }
    }
}
