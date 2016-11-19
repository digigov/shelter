#import "RNBridgeFirebaseDatabase.h";

#import "Firebase.h";
#import "RNBridgeFirebase.h";

@implementation RNBridgeFirebaseDatabase
{
    FIRDatabaseReference *databaseReference;
    NSMutableDictionary *valueListener;
    NSMutableDictionary *childAddedListener;
    NSMutableDictionary *childRemovedListener;
    NSMutableDictionary *childChangedListener;
    NSMutableDictionary *childMovedListener;
}

- (id)init
{
    databaseReference = [[FIRDatabase database] reference];
    valueListener = [NSMutableDictionary dictionary];
    childAddedListener = [NSMutableDictionary dictionary];
    childRemovedListener = [NSMutableDictionary dictionary];
    childChangedListener = [NSMutableDictionary dictionary];
    childMovedListener = [NSMutableDictionary dictionary];
    
    return self;
}

- (void)addChild:(NSString*)path
         resolver:(RCTPromiseResolveBlock)resolve
         rejecter:(RCTPromiseRejectBlock)reject
{
    resolve([[databaseReference child:path] childByAutoId].key);
}

- (void)setValue:(NSString*)path
           data:(NSDictionary *)data
        resolver:(RCTPromiseResolveBlock)resolve
        rejecter:(RCTPromiseRejectBlock)reject
{
    [[databaseReference child:path] setValue:[data objectForKey:@"value"] withCompletionBlock:^(NSError * _Nullable error, FIRDatabaseReference * _Nonnull ref) {
        if (error) {
            reject(RCT_FIREBASE_ERROR_UNKNOWN, [error localizedDescription], error);
        } else {
            resolve([NSNumber numberWithBool:true]);
        }
    }];
}

- (void)getValue:(NSString*)path
   resolver:(RCTPromiseResolveBlock)resolve
   rejecter:(RCTPromiseRejectBlock)reject
{
    [[databaseReference child:path] observeSingleEventOfType:FIRDataEventTypeValue withBlock:^(FIRDataSnapshot * _Nonnull snapshot) {
        resolve(@{
                  @"key": snapshot.key,
                  @"value": snapshot.value,
                  @"hasChildren": @([snapshot hasChildren]),
                  @"exists": @([snapshot exists]),
                  @"childrenCount": @(snapshot.childrenCount),
                  @"priority": snapshot.priority,
                  });
    } withCancelBlock:^(NSError * _Nonnull error) {
        reject(RCT_FIREBASE_ERROR_UNKNOWN, [error localizedDescription], error);
    }];
}

- (void)removeValue:(NSString*)path
           resolver:(RCTPromiseResolveBlock)resolve
           rejecter:(RCTPromiseRejectBlock)reject
{
    [[databaseReference child:path] removeValueWithCompletionBlock:^(NSError * _Nullable error, FIRDatabaseReference * _Nonnull ref) {
        if (error) {
            reject(RCT_FIREBASE_ERROR_UNKNOWN, [error localizedDescription], error);
        } else {
            resolve([NSNumber numberWithBool:true]);
        }
    }];
}

- (void)updateChildren:(NSDictionary*)child
              resolver:(RCTPromiseResolveBlock)resolve
              rejecter:(RCTPromiseRejectBlock)reject
{
    [databaseReference updateChildValues:child withCompletionBlock:^(NSError * _Nullable error, FIRDatabaseReference * _Nonnull ref) {
        if (error) {
            reject(RCT_FIREBASE_ERROR_UNKNOWN, [error localizedDescription], error);
        } else {
            resolve([NSNumber numberWithBool:true]);
        }
    }];
}

+ (NSMutableDictionary *)toDictionary:(FIRDataSnapshot *)snapshot
{
    NSMutableDictionary *data = [NSMutableDictionary dictionary];
    
    [data setObject:snapshot.key forKey:@"key"];
    [data setObject:snapshot.value forKey:@"value"];
    [data setObject:@([snapshot hasChildren]) forKey:@"hasChildren"];
    [data setObject:@([snapshot exists]) forKey:@"exists"];
    [data setObject:@(snapshot.childrenCount) forKey:@"childrenCount"];
    [data setObject:snapshot.priority forKey:@"priority"];
    
    return data;
}

- (void)addValueListener:(NSString *)path resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject
{
    FIRDatabaseHandle handler = [[databaseReference child:path] observeEventType:FIRDataEventTypeValue withBlock:^(FIRDataSnapshot * _Nonnull snapshot) {
        
        NSMutableDictionary *body = [[self class] toDictionary: snapshot];
        [body setObject:@(FIRDataEventTypeValue) forKey:@"type"];
        [body setObject:path forKey:@"path"];
        
        [[NSNotificationCenter defaultCenter] postNotificationName:FIREBASE_EMIT_TO_JS
                                                            object:self
                                                          userInfo:@{
                                                                     @"name": RCT_FIREBASE_EVENT_DATA_VALUE_CHANGED,
                                                                     @"body": body,
                                                                     }];
    } withCancelBlock:^(NSError * _Nonnull error) {
        NSLog(@"%@", [error localizedDescription]);
    }];
    
    [valueListener setObject:@(handler) forKey:path];
    
    resolve([NSNumber numberWithBool:true]);
}

- (void)removeValueListener:(NSString *)path resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject
{
    [databaseReference removeObserverWithHandle:[valueListener objectForKey:path]];
    
    resolve([NSNumber numberWithBool:true]);
}

- (FIRDatabaseHandle)addListener:(NSString *)path event:(FIRDataEventType)event
{
    FIRDatabaseHandle handler = [[databaseReference child:path] observeEventType:event withBlock:^(FIRDataSnapshot * _Nonnull snapshot) {
        
        NSMutableDictionary *body = [[self class] toDictionary: snapshot];
        [body setObject:@(event) forKey:@"type"];
        [body setObject:path forKey:@"path"];
        
        [[NSNotificationCenter defaultCenter] postNotificationName:FIREBASE_EMIT_TO_JS
                                                            object:self
                                                          userInfo:@{
                                                                     @"name": RCT_FIREBASE_EVENT_DATA_CHILD_CHANGED,
                                                                     @"body": body,
                                                                     }];
    } withCancelBlock:^(NSError * _Nonnull error) {
        NSLog(@"%@", [error localizedDescription]);
    }];
    
    return handler;
}

- (void)addChildListener:(NSString *)path resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject
{
    [childAddedListener setObject:@([self addListener:path event:FIRDataEventTypeChildAdded]) forKey:path];
    [childRemovedListener setObject:@([self addListener:path event:FIRDataEventTypeChildRemoved]) forKey:path];
    [childChangedListener setObject:@([self addListener:path event:FIRDataEventTypeChildChanged]) forKey:path];
    [childMovedListener setObject:@([self addListener:path event:FIRDataEventTypeChildMoved]) forKey:path];

    resolve([NSNumber numberWithBool:true]);
}

- (void)removeChildListener:(NSString *)path resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject
{
    [databaseReference removeObserverWithHandle:[childAddedListener objectForKey:path]];
    [databaseReference removeObserverWithHandle:[childRemovedListener objectForKey:path]];
    [databaseReference removeObserverWithHandle:[childChangedListener objectForKey:path]];
    [databaseReference removeObserverWithHandle:[childMovedListener objectForKey:path]];

    resolve([NSNumber numberWithBool:true]);
}

@end
