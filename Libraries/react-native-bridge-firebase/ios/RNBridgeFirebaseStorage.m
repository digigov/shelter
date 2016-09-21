#import "RNBridgeFirebaseStorage.h"

#import "Firebase.h";
#import "RNBridgeFirebase.h";

@implementation RNBridgeFirebaseStorage

- (void)uploadJPG:(NSDictionary *)params
         resolver:(RCTPromiseResolveBlock)resolve
         rejecter:(RCTPromiseRejectBlock)reject
{
    
    NSString *path = [RCTConvert NSString:params[@"path"]];
    NSString *base64 = [RCTConvert NSString:params[@"base64"]];
    FIRStorage *storage = [FIRStorage storage];
    
    FIRStorageReference *storageRef = [storage reference];
    FIRStorageReference *imageRef = [storageRef child:path];
    FIRStorageMetadata *metadata = [[FIRStorageMetadata alloc] init];
    [metadata setContentType:@"image/jpeg"];
    
    NSData *data = [[NSData alloc]initWithBase64EncodedString:base64 options:NSDataBase64DecodingIgnoreUnknownCharacters];
    
    FIRStorageUploadTask *uploadTask = [imageRef putData:data metadata:metadata completion:^(FIRStorageMetadata *metadata, NSError *error) {
        if (error == nil) {
            NSURL *url = metadata.downloadURL;
            resolve(url.absoluteString);
            return;
        }
        
        reject(RCT_FIREBASE_ERROR_UNKNOWN, @"Failed to upload jpg", error);
    }];
}

@end