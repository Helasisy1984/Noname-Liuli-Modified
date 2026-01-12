$content = Get-Content -Path "extension.js" -Raw
$pattern = "'enableQianhuanAudio': \{[\s\S]*?name: ""启用千幻语音集成""[\s\S]*?""intro"": ""皮肤切换后自动读取千幻聆音的语音资源，需要安装千幻聆音扩展""[\s\S]*?\},"
$newContent = $content -replace $pattern, ""
Set-Content -Path "extension.js.new" -Value $newContent 