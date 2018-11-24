install:
	@cd Server && dotnet restore
	@cd Client/ClientApp && npm install
	@cd Client && dotnet restore

run:
	cd Client && export ASPNETCORE_ENVIRONMENT=Development && dotnet run &
	cd Server && export ASPNETCORE_ENVIRONMENT=Development && dotnet run
