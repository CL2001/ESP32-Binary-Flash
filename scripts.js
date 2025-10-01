import { ESPLoader } from "https://cdn.jsdelivr.net/npm/esptool-js@0.4.2/dist/web/index.min.js";

// Internal firmware path (relative to website root)
const firmwarePath = "firmware/firmware.bin";

const log = msg => {
  document.getElementById("log").textContent += msg + "\n";
};

document.getElementById("connect").onclick = async () => {
  try {
    // Ask user to select ESP32 serial port
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });

    const loader = new ESPLoader(port, { baudrate: 115200, debug: log });
    await loader.initialize();
    log("Connected to " + loader.chipName);

    // Fetch firmware from internal path
    const response = await fetch(firmwarePath);
    if (!response.ok) throw new Error("Cannot fetch firmware at " + firmwarePath);
    const buffer = await response.arrayBuffer();
    log("Firmware loaded: " + firmwarePath);

    // Flash firmware at 0x1000
    await loader.flashData(new Uint8Array(buffer), 0x1000);
    log("✅ Flash complete!");
  } catch (e) {
    log("❌ " + e.message);
  }
};
