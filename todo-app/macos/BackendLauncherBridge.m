// BackendLauncherBridge.m

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BackendLauncher, NSObject)

// Expose the startServer function to JavaScript
RCT_EXTERN_METHOD(startServer)

// Expose the stopServer function to JavaScript
RCT_EXTERN_METHOD(stopServer)

@end