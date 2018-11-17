
#!/bin/bash
dotnet ef migrations add `date "+%m%d%Y%H%M%S"` -o Data/Migrations
