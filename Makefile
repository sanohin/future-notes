install:
	@dotnet restore 
	@cd ClientApp
	@npm install

run:
	export ASPNETCORE_ENVIRONMENT=Development && dotnet run
