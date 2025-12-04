// BackendLauncher.swift

import Foundation

@objc(BackendLauncher)
class BackendLauncher: NSObject {
  
  // Storage for the running process
  var serverProcess: Process?

  @objc
  func startServer() -> Void {
    // 1. Get the path to the executable bundled in the app's Resources folder
    // Your 'todo-backend' file should be placed inside the macOS app's Resources
    guard let executablePath = Bundle.main.path(forResource: "todo-backend", ofType: nil) else {
        print("Error: todo-backend executable not found in bundle.")
        return
    }

    // 2. Configure and start the Process
    serverProcess = Process()
    serverProcess?.launchPath = executablePath
    serverProcess?.arguments = [] // Add any command-line arguments here
    
    // Attempt to launch
    do {
      try serverProcess?.run()
      print("Backend server started at \(executablePath)")
    } catch {
      print("Error starting backend server: \(error)")
    }
  }
  
  // Function to stop the process when the app closes
  @objc
  func stopServer() -> Void {
    if serverProcess?.isRunning == true {
      serverProcess?.terminate()
      serverProcess = nil
      print("Backend server terminated.")
    }
  }
}