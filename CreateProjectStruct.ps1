# Define the base directory
$baseDirectory = "D:\Projects\TaskFlow\server\seref"

# Define the name variable (change this as per your project)
$name = "seref"

# Create main source directory
$srcDirectory = Join-Path -Path $baseDirectory -ChildPath "src"
New-Item -Path $srcDirectory -ItemType Directory -Force
Write-Output "Created directory: $srcDirectory"

# Define folders and files
$foldersToCreate = @("config", "controllers", "models", "routes", "services", "utils")
$filesToCreate = @("app.js", "index.js")

# Create folders inside src directory
foreach ($folderName in $foldersToCreate) {
    $folderPath = Join-Path -Path $srcDirectory -ChildPath $folderName
    New-Item -Path $folderPath -ItemType Directory -Force
    Write-Output "Created directory: $folderPath"

    # Create specific files for project name
    if ($folderName -eq "models" -or $folderName -eq "services" -or $folderName -eq "controllers"-or $folderName -eq "routes") {
        $filePrefix = $name.ToLower()
        $fileSuffix = $folderName.TrimEnd('s')
        $filePath = Join-Path -Path $folderPath -ChildPath "$filePrefix.$fileSuffix.js"
        New-Item -Path $filePath -ItemType File -Force
        Write-Output "Created file: $filePath"
    }
}

# Create index.js file in controllers, models, and services folders
foreach ($folderName in @("controllers", "models", "services")) {
    $indexFilePath = Join-Path -Path (Join-Path -Path $srcDirectory -ChildPath $folderName) -ChildPath "index.js"
    New-Item -Path $indexFilePath -ItemType File -Force
    Write-Output "Created file: $indexFilePath"
}

# Create files inside src directory
foreach ($fileName in $filesToCreate) {
    $filePath = Join-Path -Path $srcDirectory -ChildPath $fileName
    New-Item -Path $filePath -ItemType File -Force
    Write-Output "Created file: $filePath"
}

# Create config.js file inside config folder
$configFilePath = Join-Path -Path $srcDirectory -ChildPath "config\config.js"
New-Item -Path $configFilePath -ItemType File -Force
Write-Output "Created file: $configFilePath".

# Create .env file inside base folder
$envFilePath = Join-Path -Path $baseDirectory -ChildPath ".env"
New-Item -Path $envFilePath -ItemType File -Force
Write-Output "Created file: $envFilePath"

# Change working directory to src
Set-Location -Path $baseDirectory

# Initialize npm project with default values
Invoke-Expression -Command "npm init -y"

# Install packages
Invoke-Expression -Command "npm install express dotenv mongoose http-status"
