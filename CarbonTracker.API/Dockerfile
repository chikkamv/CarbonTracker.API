
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

COPY . .

RUN dotnet restore CarbonTracker.API/CarbonTracker.API.sln

RUN dotnet publish CarbonTracker.API/CarbonTracker.API.sln -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

COPY --from=build /out .

EXPOSE 80

ENTRYPOINT ["dotnet", "CarbonTracker.API.dll"]
