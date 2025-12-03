@echo off
cd /d "d:\websitephp\public\assets\images\materi"

echo Downloading if-statement.png...
curl -L -o if-statement.png "https://miro.medium.com/v2/resize:fit:1050/1*DM5BGSBLQ_eL5wfvr6ANhw.png"

echo Downloading else-statement.jpeg...
curl -L -o else-statement.jpeg "https://miro.medium.com/v2/resize:fit:1050/1*6LSVRg7hDKVnWOqBcHSTKg.jpeg"

echo Downloading jenis-perulangan.png...
curl -L -o jenis-perulangan.png "https://miro.medium.com/v2/resize:fit:1050/1*vXWOkg9cav5KuG1gd41p7A.png"

echo Downloading for-loop.png...
curl -L -o for-loop.png "https://miro.medium.com/v2/resize:fit:1050/1*5MEyv8w1IHha14kfjo8qJA.png"

echo Downloading while-loop.png...
curl -L -o while-loop.png "https://miro.medium.com/v2/resize:fit:1050/1*pszZf38KjMM3KYdct7yXnw.png"

echo Downloading do-while-flowchart.png...
curl -L -o do-while-flowchart.png "https://miro.medium.com/v2/resize:fit:1050/0*JplysxXxs3QIj_qT"

echo Downloading do-while-php.png...
curl -L -o do-while-php.png "https://miro.medium.com/v2/resize:fit:1050/1*B-jnCGALocuCx30O1Bkidg.png"

echo All done!
dir
pause
