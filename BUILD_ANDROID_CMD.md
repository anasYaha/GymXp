# GymXP — Build & Install Android APK (CMD Commands)

Run all commands in **CMD** (not PowerShell).

---

## STEP 1 — Fix Android SDK path for Gradle

```cmd
echo sdk.dir=C\:\\Users\\anasy\\AppData\\Local\\Android\\Sdk > "C:\Users\anasy\Downloads\GymXp-Anas\GymXp-Anas\apps\mobile\android\local.properties"
```

Verify it looks correct:

```cmd
type "C:\Users\anasy\Downloads\GymXp-Anas\GymXp-Anas\apps\mobile\android\local.properties"
```

Expected output:

```
sdk.dir=C\:\\Users\\anasy\\AppData\\Local\\Android\\Sdk
```

---

## STEP 2 — Set environment variables (current CMD session)

```cmd
set ANDROID_HOME=C:\Users\anasy\AppData\Local\Android\Sdk
set JAVA_HOME=C:\Program Files\Java\jdk-21.0.10
set PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\build-tools\36.0.0
```

Verify:

```cmd
adb --version
java -version
```

---

## STEP 3 — Connect your phone and verify ADB sees it

Plug your phone via USB, enable USB Debugging, tap Allow on phone. Then:

```cmd
adb devices
```

Expected — you should see your device, NOT "unauthorized":

```
List of devices attached
XXXXXXXX    device
```

If it says "unauthorized": unplug, replug USB, tap Allow on phone again.

---

## STEP 4 — Build and install the APK on your phone

```cmd
cd C:\Users\anasy\Downloads\GymXp-Anas\GymXp-Anas\apps\mobile
npx expo run:android --device
```

- Select your phone when asked (SM_A356E)
- First build takes **5–15 minutes** (Gradle downloads dependencies)
- The app will auto-install on your phone when done

---

## If you want just the APK file (no auto-install)

```cmd
cd C:\Users\anasy\Downloads\GymXp-Anas\GymXp-Anas\apps\mobile\android
gradlew.bat assembleDebug
```

APK will be saved at:

```
C:\Users\anasy\Downloads\GymXp-Anas\GymXp-Anas\apps\mobile\android\app\build\outputs\apk\debug\app-debug.apk
```

Install it manually:

```cmd
adb install -r "C:\Users\anasy\Downloads\GymXp-Anas\GymXp-Anas\apps\mobile\android\app\build\outputs\apk\debug\app-debug.apk"
```

---

## TROUBLESHOOTING

| Error                                  | Fix                                                                 |
| -------------------------------------- | ------------------------------------------------------------------- |
| `SDK location not found`             | Run Step 1 again, check `local.properties` exists                 |
| `adb: command not found`             | Run Step 2 to set PATH, then retry                                  |
| `device unauthorized`                | Unplug/replug USB, accept prompt on phone                           |
| `INSTALL_FAILED_UPDATE_INCOMPATIBLE` | `adb uninstall com.gymxp.mobile` then reinstall                   |
| `Java home is invalid`               | Your `~/.gradle/gradle.properties` is already fixed to use JDK 21 |
| Build hangs at 0%                      | Wait — Gradle is downloading. Takes up to 15 min first time        |

---

## FULL SEQUENCE (copy-paste all at once)

```cmd
echo sdk.dir=C\:\\Users\\anasy\\AppData\\Local\\Android\\Sdk > "C:\Users\anasy\Downloads\GymXp-Anas\GymXp-Anas\apps\mobile\android\local.properties"
set ANDROID_HOME=C:\Users\anasy\AppData\Local\Android\Sdk
set JAVA_HOME=C:\Program Files\Java\jdk-21.0.10
set PATH=%PATH%;%ANDROID_HOME%\platform-tools
adb devices
cd C:\Users\anasy\Downloads\GymXp-Anas\GymXp-Anas\apps\mobile
npx expo run:android --device
```
