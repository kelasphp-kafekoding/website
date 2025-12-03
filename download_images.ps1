$basePath = 'd:\websitephp\public\assets\images\materi'

$images = @(
    @{url='https://miro.medium.com/v2/resize:fit:1050/1*DM5BGSBLQ_eL5wfvr6ANhw.png'; name='if-statement.png'},
    @{url='https://miro.medium.com/v2/resize:fit:1050/1*6LSVRg7hDKVnWOqBcHSTKg.jpeg'; name='else-statement.jpeg'},
    @{url='https://miro.medium.com/v2/resize:fit:1050/1*vXWOkg9cav5KuG1gd41p7A.png'; name='jenis-perulangan.png'},
    @{url='https://miro.medium.com/v2/resize:fit:1050/1*5MEyv8w1IHha14kfjo8qJA.png'; name='for-loop.png'},
    @{url='https://miro.medium.com/v2/resize:fit:1050/1*pszZf38KjMM3KYdct7yXnw.png'; name='while-loop.png'},
    @{url='https://miro.medium.com/v2/resize:fit:1050/0*JplysxXxs3QIj_qT'; name='do-while-flowchart.png'},
    @{url='https://miro.medium.com/v2/resize:fit:1050/1*B-jnCGALocuCx30O1Bkidg.png'; name='do-while-php.png'}
)

foreach($img in $images) {
    $outPath = Join-Path $basePath $img.name
    Write-Host "Downloading $($img.name)..."
    Invoke-WebRequest -Uri $img.url -OutFile $outPath -ErrorAction SilentlyContinue
}

Write-Host 'Done! Files:'
Get-ChildItem $basePath | Select-Object Name, Length
