FROM microsoft/dotnet:2.1-sdk
WORKDIR /usr/src/app

COPY *.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

WORKDIR /usr/src/app/out
EXPOSE 80
ENTRYPOINT ["dotnet", "Server.dll"]
