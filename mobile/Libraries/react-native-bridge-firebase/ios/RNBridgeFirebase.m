#import "RNBridgeFirebase.h"

#import "Firebase.h";

#import "RNBridgeFirebaseDeviceModel.h";
#import "RNBridgeFirebaseDeviceUID.h";
#import "RNBridgeFirebaseMessage.h";
#import "RNBridgeFirebaseAnalytics.h";
#import "RNBridgeFirebaseStorage.h";
#import "RNBridgeFirebaseConfig.h";
#import "RNBridgeFirebaseDatabase.h";

NSString *const RCT_FIREBASE_EVENT_REGISTER_SETTINGS = @"FirebaseRegisterSettings";
NSString *const RCT_FIREBASE_EVENT_DEVICE_REGISTERED = @"FirebaseDeviceRegistered";
NSString *const RCT_FIREBASE_EVENT_REGISTERED = @"FirebaseRegistered";
NSString *const RCT_FIREBASE_EVENT_FAILED_TO_REGISTER = @"FirebaseFailedToRegister";
NSString *const RCT_FIREBASE_EVENT_REMOTE_NOTIFICATION = @"FirebaseRemoteNotificationReceived";
NSString *const RCT_FIREBASE_EVENT_DATA_VALUE_CHANGED = @"FirebaseDatabaseValueChanged";
NSString *const RCT_FIREBASE_EVENT_DATA_CHILD_CHANGED = @"FirebaseDatabaseChildChanged";

NSString *const RCT_FIREBASE_ERROR_UNABLE_TO_REQUEST_PERMISSION = @"ERROR_UNABLE_TO_REQUEST_PERMISSIONS";
NSString *const RCT_FIREBASE_ERROR_UNKNOWN = @"ERROR_UNKNOWN";

NSString *const FIREBASE_EMIT_TO_JS = @"FirebaseEmitToJS";

@implementation RNBridgeFirebase
{
    RNBridgeFirebaseMessage *message;
    RNBridgeFirebaseAnalytics *analytics;
    RNBridgeFirebaseStorage *storage;
    RNBridgeFirebaseConfig *config;
    RNBridgeFirebaseDatabase *database;
}

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (id)init
{
    if (![[FIRApp allApps] count]) {
        [FIRApp configure];
    }
    
    message = [[RNBridgeFirebaseMessage alloc] init];
    analytics = [[RNBridgeFirebaseAnalytics alloc] init];
    storage = [[RNBridgeFirebaseStorage alloc] init];
    config = [[RNBridgeFirebaseConfig alloc] init];
    database = [[RNBridgeFirebaseDatabase alloc] init];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleEmitToJS:) name:FIREBASE_EMIT_TO_JS object:nil];

    NSDictionary *notification = [self.bridge.launchOptions objectForKey: UIApplicationLaunchOptionsRemoteNotificationKey];

    if (notification) {
        [RNBridgeFirebase didReceiveRemoteNotification:notification];
    }

    return self;
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[RCT_FIREBASE_EVENT_DEVICE_REGISTERED,
             RCT_FIREBASE_EVENT_REGISTERED,
             RCT_FIREBASE_EVENT_FAILED_TO_REGISTER,
             RCT_FIREBASE_EVENT_REMOTE_NOTIFICATION,
             RCT_FIREBASE_EVENT_DATA_VALUE_CHANGED,
             RCT_FIREBASE_EVENT_DATA_CHILD_CHANGED];
}

- (NSDictionary *)constantsToExport
{
    NSString *firebaseToken = [[FIRInstanceID instanceID] token];

    return @{
             @"deviceToken": @"",
             @"firebaseToken": firebaseToken ? firebaseToken : @"",
             @"deviceModel": [RNBridgeFirebaseDeviceModel name],
             @"deviceName": [[UIDevice currentDevice] name],
             @"deviceUid": [RNBridgeFirebaseDeviceUID uid],
             @"appVersion": [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"],
             @"EVENT": @{
                     @"DEVICE_REGISTERED": RCT_FIREBASE_EVENT_DEVICE_REGISTERED,
                     @"REGISTERED": RCT_FIREBASE_EVENT_REGISTERED,
                     @"FAILED_TO_REGISTER": RCT_FIREBASE_EVENT_FAILED_TO_REGISTER,
                     @"REMOTE_NOTIFICATION": RCT_FIREBASE_EVENT_REMOTE_NOTIFICATION,
                     @"DATA_VALUE_CHANGED": RCT_FIREBASE_EVENT_DATA_VALUE_CHANGED,
                     @"DATA_CHILD_CHANGED": RCT_FIREBASE_EVENT_DATA_CHILD_CHANGED,
                     },
             @"ERROR": @{
                     @"UNKNOWN": RCT_FIREBASE_ERROR_UNKNOWN
                     },
             @"DATA_CHILD": @{
                     @"ADDED": @(FIRDataEventTypeChildAdded),
                     @"REMOVED": @(FIRDataEventTypeChildRemoved),
                     @"CHANGED": @(FIRDataEventTypeChildChanged),
                     @"MOVED": @(FIRDataEventTypeChildMoved),
                     },
             @"CONFIG_SOURCE": @{
                     @"REMOTE": @(FIRRemoteConfigSourceRemote),
                     @"DEFAULT": @(FIRRemoteConfigSourceDefault),
                     @"STATIC": @(FIRRemoteConfigSourceStatic),
                     }
             };
}

- (void)handleEmitToJS:(NSNotification *)notification
{
    NSDictionary *userInfo = notification.userInfo;
    [self sendEventWithName:[userInfo valueForKey:@"name"] body:[userInfo valueForKey:@"body"]];
}

// [START message]
+ (void)didRegisterUserNotificationSettings:(__unused UIUserNotificationSettings *)notificationSettings
{
    if ([UIApplication instancesRespondToSelector:@selector(registerForRemoteNotifications)]) {
        [[UIApplication sharedApplication] registerForRemoteNotifications];
        [[NSNotificationCenter defaultCenter] postNotificationName:RCT_FIREBASE_EVENT_REGISTER_SETTINGS
                                                            object:self
                                                          userInfo:@{@"notificationSettings": notificationSettings}];
    }
}

+ (void)didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)token
{
    [[NSNotificationCenter defaultCenter] postNotificationName:RCT_FIREBASE_EVENT_DEVICE_REGISTERED
                                                        object:self
                                                      userInfo:@{@"token" : token}];
}

+ (void)didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
    [[NSNotificationCenter defaultCenter] postNotificationName:RCT_FIREBASE_EVENT_FAILED_TO_REGISTER
                                                        object:self
                                                      userInfo:error];
}

+ (void)didReceiveRemoteNotification:(NSDictionary *)notification
{
    [[NSNotificationCenter defaultCenter] postNotificationName:RCT_FIREBASE_EVENT_REMOTE_NOTIFICATION
                                                        object:self
                                                      userInfo:notification];
}

RCT_EXPORT_METHOD(registerDevice:(NSDictionary *)permissions
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [message registerDevice:permissions resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(subscribeToTopic: (NSString*) topic)
{
    [message subscribeToTopic:topic];
}

RCT_EXPORT_METHOD(unsubscribeFromTopic: (NSString*) topic)
{
    [message unsubscribeFromTopic:topic];
}
// [END message]

// [START analytics]
RCT_EXPORT_METHOD(reportCrash: (NSString*) message)
{
    FIRCrashLog(message);
}

RCT_EXPORT_METHOD(setUserId: (NSString*) userId)
{
    [FIRAnalytics setUserID:userId];
}

RCT_EXPORT_METHOD(setUserProperty: (NSString*)name property: (NSString*)property)
{
    [FIRAnalytics setUserPropertyString:property forName:name];
}

RCT_EXPORT_METHOD(logEvent: (NSString*)name property: (NSDictionary*)parameters)
{
    [FIRAnalytics logEventWithName:name parameters:parameters];
}

RCT_EXPORT_METHOD(setEnabled: (BOOL)enabled)
{
    [[FIRAnalyticsConfiguration sharedInstance] setAnalyticsCollectionEnabled:enabled];
}
// [END analytics]

// [START storage]
RCT_EXPORT_METHOD(uploadJPG:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [storage uploadJPG:params resolver:resolve rejecter:reject];
}
// [END storage]

// [START config]
RCT_EXPORT_METHOD(getStringConfig:(NSString*)name
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [config getString:name resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getNumberConfig:(NSString*)name
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [config getNumber:name resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getBooleanConfig:(NSString*)name
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [config getBoolean:name resolver:resolve rejecter:reject];
}
// [END config]

// [START database]
RCT_EXPORT_METHOD(addDataChild:(NSString*)path
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [database addChild:path resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(setDataValue:(NSString*)path
                  data:(NSDictionary *) data
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [database setValue:path data:data resolver:resolve rejecter:reject];
}
RCT_EXPORT_METHOD(getDataValue:(NSString*)path
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [database getValue:path resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(removeDataValue:(NSString*)path
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [database removeValue:path resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(addDataValueListener:(NSString*)path
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [database addValueListener:path resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(removeDataValueListener:(NSString*)path
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [database removeValueListener:path resolver:resolve rejecter:reject];
}


RCT_EXPORT_METHOD(addDataChildListener:(NSString*)path
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [database addChildListener:path resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(removeDataChildListener:(NSString*)path
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [database removeChildListener:path resolver:resolve rejecter:reject];
}
// [END database]

@end
