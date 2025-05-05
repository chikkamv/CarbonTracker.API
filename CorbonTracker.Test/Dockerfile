# Step 1: Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy all the .csproj files and restore dependencies (including the test project)
COPY CarbonTracker.API/*.csproj ./CarbonTracker.API/
COPY CorbonTracker.Test/*.csproj ./CorbonTracker.Test/  # Ensure test project is copied

# Restore NuGet packages
RUN dotnet restore

# Copy the rest of the files
COPY . ./

# Build and publish the application
RUN dotnet publish -c Release -o out

# Step 2: Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Set the working directory inside the container
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build /app/out ./

# Expose the port the app runs on
EXPOSE 80

# Set the entry point for the application
ENTRYPOINT ["dotnet", "CarbonTracker.API.dll"]
