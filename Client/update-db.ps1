dotnet ef migrations add $(Get-Date -Format FileDateTime) -c LeanwareContext -o Data/Migrations
