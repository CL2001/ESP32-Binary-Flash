import("https://cdn.jsdelivr.net/npm/esptool-js@0.4.0/+esm")
  .then(module => {
    const ESPLoader = module.ESPLoader;
    console.log("✅ esptool-js loaded");

    const firmwarePath = "firmware/.pio/build/esp32doit-devkit-v1/firmware.bin";
    const log = msg => {
      const pre = document.getElementById("log");
      pre.textContent += msg + "\n";
      console.log(msg);
    };

    document.getElementById("connect").onclick = async () => {
      try {
        if (!navigator.serial) {
          log("❌ Web Serial API is not supported in this browser.");
          return;
        }
        log("🔌 Requesting serial port...");
        let port;
        try {
          port = await navigator.serial.requestPort();
        } catch (err) {
          if (err.name === "NotFoundError") {
            log("❌ No port selected. Please connect an ESP32 and select it in the dialog.");
            return;
          }
          throw err;
        }

        if (!port.getInfo) {
          port.getInfo = () => ({ usbVendorId: 0, usbProductId: 0 });
        }
        console.log("Port", port.getInfo());

        await port.open({ baudRate: 115200 });
        log("Port opened, initializing loader...");

        let loader;
        try {
          loader = new ESPLoader(port, { baudrate: 115200, debug: log });
        } catch (err) {
          log("❌ Failed to instantiate ESPLoader: " + err.message);
          throw err;
        }
        await loader.initialize().catch(err => {
          throw new Error("Loader initialization failed: " + err.message);
        });
        log("Connected to " + loader.chipName);

        // Fetch firmware
        log("Fetching firmware: " + firmwarePath);
        const response = await fetch(firmwarePath);
        if (!response.ok) throw new Error("Cannot fetch firmware: " + response.status);
        const buffer = await response.arrayBuffer();
        log("Firmware loaded, size: " + buffer.byteLength + " bytes");

        // Flash firmware
        await loader.flashData(new Uint8Array(buffer), 0x1000);
        log("✅ Flash complete!");
      } catch (err) {
        log("❌ Error: " + err.message);
        console.error(err);
      }
    };
  })
  .catch(err => {
    console.error("❌ Failed to load esptool-js:", err);
    log("❌ Failed to load esptool-js: " + err.message);
  });