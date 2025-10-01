ESP32-Binary-Flash
=========================================
The goal of this project is to be able to flash a prexisting firmware to an esp32 board using a javascript web server.
Modifications can be made to the firmware and compiled using the instructions at the bottom of this file. The goal it to then be able to flash this firmware through a webserver in an intuitive non technical way to mimic software updates made by end users.


# Compile the firmware after modifications
## First time set up
Download pipx and add to path
```bash
sudo apt install pipx
pipx ensurepath
```
Install plaform io
```bash
pipx install platformio
```

Open a new terminal and verify the install is successful.
You should see the PlatformIO Core version printed, e.g., 'PlatformIO Core, version 6.x.x'.
```bash
pio --version
```

## Compile
1. Compile the Firmware
Compile using the following command
```bash
pio run --project-dir ./firmware
```


# Run the webserver (not ready yet)
## First time set up
Download pipx and add to path
```bash
sudo apt install nodejs npx
```

## Run
Run this command in the terminal
```bash
npx serve -l 8000 .
```

Open chrome
```bash
google-chrome-stable
```
Then open `http://localhost:8000/index.html` in a web browser of your choosing



# Run command line
## First time set up
```bash
sudo apt install python3-poetry
```

## Run
```bash
poetry install
poetry run esptool --chip esp32s3 --port /dev/ttyACM0 --baud 115200 write_flash -z 0x0000 ./firmware/.pio/build/esp32s3-wroom-1-n16r8/bootloader.bin 0x8000 ./firmware/.pio/build/esp32s3-wroom-1-n16r8/partitions.bin 0x10000 ./firmware/.pio/build/esp32s3-wroom-1-n16r8/firmware.bin
```


