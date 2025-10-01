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


