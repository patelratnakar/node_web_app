$WebsiteName = $args[0]

$physicalPath="C:\$WebsiteName\wwwroot"
$websiteUrl=""
$guid=New-Guid

Remove-Item $physicalPath -Recurse -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $physicalPath

Invoke-WebRequest "https://github.com/patelratnakar/node_web_app/archive/refs/heads/main.zip" -OutFile .\$guid.zip
Expand-Archive .\$guid.zip .\
Move-Item .\ecommerce-shera-main\frontend\build\* $physicalPath -Force
Remove-Item .\$guid.zip
Remove-Item .\ecommerce-shera-main -Recurse -ErrorAction SilentlyContinue

$mypath = "C:\$WebsiteName"
$acl = Get-Acl $mypath
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule("IUSR","FullControl","Allow")
$acl.SetAccessRule($accessRule)
Get-ChildItem -Path $mypath -Recurse -Force | Set-Acl -AclObject $acl -Verbose

# See if a WebAppPool with this name already exists
if (Test-Path IIS:\AppPools\$WebsiteName) {Remove-WebAppPool -Name $WebsiteName}
# Create a new WebAppPool
New-WebAppPool —Name $WebsiteName

# See if a Website with this name already exists
if (Get-Website —Name $WebsiteName) { Remove-Website —Name $WebsiteName }
# Create a new Website
New-WebSite -Name $WebsiteName -Port 80 —IPAddress * —HostHeader $websiteUrl —PhysicalPath $physicalPath -ApplicationPool $WebsiteName
Set-ItemProperty "IIS:\Sites\$WebsiteName" —Name Bindings -value @{protocol="http"; bindinglnformation="*:80:$websiteUrl"}
