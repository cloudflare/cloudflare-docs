// --- Global Device Configuration ---
DEFINE DEVICE_ID = "IGUARD_14.4_BATTALION_001"
DEFINE GPRS_APN = "your_gprs_apn"
DEFINE SATELLITE_PROFILE = "your_satellite_profile"
DEFINE ALERT_RECIPIENT_PHONE = "+1234567890"
DEFINE ALERT_RECIPIENT_EMAIL = "alerts@yourcommand.com"
DEFINE IMAGE_RESOLUTION = "1920x1080"
DEFINE VIDEO_DURATION_ON_EVENT = "15_seconds"
DEFINE MOTION_THRESHOLD = 50 // Sensitivity for motion sensor
DEFINE HEARTBEAT_INTERVAL = 3600 // Send status every hour (seconds)

// --- Initialize System ---
FUNCTION setup()
    // Initialize Power Management
    CALL PowerManager.init()
    CALL PowerManager.monitorBattery()

    // Initialize Communication Modules
    CALL GPRS.init(GPRS_APN)
    CALL Satellite.init(SATELLITE_PROFILE)
    CALL GPS.init()

    // Initialize Sensors
    CALL Camera.init(IMAGE_RESOLUTION)
    CALL MotionSensor.init(MOTION_THRESHOLD)
    CALL IRSensor.init()
    CALL AcousticSensor.init()
    CALL EnvironmentalSensors.init()

    // Load saved settings from Flash Storage
    CALL ConfigManager.loadSettings()

    LOG("Device setup complete. Ready for operation.")
END FUNCTION

// --- Main Operating Loop ---
FUNCTION loop()
    // Check for incoming commands (e.g., from command center)
    CALL CommsManager.checkIncomingCommands()

    // Monitor for motion events
    IF MotionSensor.detectMotion() THEN
        CALL handleMotionEvent()
    END IF

    // Monitor for acoustic events
    IF AcousticSensor.detectSoundEvent() THEN
        CALL handleAcousticEvent()
    END IF

    // Perform scheduled tasks
    CALL performScheduledTasks()

    // Sleep for a short period to save power
    CALL System.sleep(100_milliseconds)
END FUNCTION

// --- Event Handlers ---
FUNCTION handleMotionEvent()
    LOG("Motion detected! Capturing evidence.")
    CALL IRSensor.activate() // Ensure night vision is ready

    // Capture Image
    IMAGE eventImage = Camera.captureImage()
    CALL StorageManager.saveImage(eventImage)
    CALL CommsManager.sendAlert(ALERT_RECIPIENT_EMAIL, "MOTION ALERT", "Motion detected at " + GPS.getLocation(), eventImage)

    // Capture Video (if configured)
    VIDEO eventVideo = Camera.recordVideo(VIDEO_DURATION_ON_EVENT)
    CALL StorageManager.saveVideo(eventVideo)
    // Send video via GPRS/Satellite (might be large, could send thumbnail first)
    // CALL CommsManager.sendVideo(ALERT_RECIPIENT_EMAIL, "MOTION VIDEO", eventVideo)

    CALL IRSensor.deactivate()
END FUNCTION

FUNCTION handleAcousticEvent()
    LOG("Significant sound event detected! Analyzing.")
    // Depending on sophistication, could classify sound (e.g., gunshot, vehicle)
    STRING soundType = AcousticSensor.analyzeSound()

    IF soundType == "GUNSHOT" OR soundType == "EXPLOSION" THEN
        IMAGE eventImage = Camera.captureImage()
        CALL StorageManager.saveImage(eventImage)
        CALL CommsManager.sendAlert(ALERT_RECIPIENT_PHONE, "CRITICAL ACOUSTIC ALERT: " + soundType, "Event at " + GPS.getLocation(), eventImage)
    END IF
END FUNCTION

// --- Scheduled Tasks ---
FUNCTION performScheduledTasks()
    IF System.currentTime() % HEARTBEAT_INTERVAL == 0 THEN
        CALL sendHeartbeat()
    END IF

    // Check for software updates
    IF ConfigManager.isUpdateAvailable() THEN
        CALL updateFirmware()
    END IF

    // Manage storage (e.g., delete oldest files if full)
    CALL StorageManager.manageStorage()
END FUNCTION

FUNCTION sendHeartbeat()
    LOCATION currentLocation = GPS.getLocation()
    BATTERY_STATUS currentBattery = PowerManager.getBatteryStatus()
    ENVIRONMENTAL_DATA envData = EnvironmentalSensors.readData()

    STRING statusMessage = "Device " + DEVICE_ID + " OK. Loc: " + currentLocation.latitude + "," + currentLocation.longitude +
                           " Bat: " + currentBattery.level + "%. Temp: " + envData.temperature + "C."

    // Try GPRS first, fall back to Satellite if GPRS fails
    IF GPRS.isAvailable() THEN
        CALL GPRS.sendMessage(ALERT_RECIPIENT_EMAIL, "HEARTBEAT", statusMessage)
    ELSE IF Satellite.isAvailable() THEN
        CALL Satellite.sendMessage(ALERT_RECIPIENT_EMAIL, "HEARTBEAT", statusMessage)
    ELSE
        LOG_ERROR("Heartbeat failed: No communication link available.")
    END IF
END FUNCTION

// --- Communication Management (Simplified) ---
MODULE CommsManager
    FUNCTION checkIncomingCommands()
        // Poll GPRS for commands
        // Poll Satellite for commands
        // Parse commands (e.g., "TAKE_PIC", "CHANGE_SETTING", "REQUEST_STATUS")
        // Execute corresponding actions
    END FUNCTION

    FUNCTION sendAlert(recipient, subject, message, attachment = NULL)
        // Prioritize GPRS for speed, fall back to Satellite for reliability
        IF GPRS.isAvailable() THEN
            CALL GPRS.sendData(recipient, subject, message, attachment)
        ELSE IF Satellite.isAvaila
