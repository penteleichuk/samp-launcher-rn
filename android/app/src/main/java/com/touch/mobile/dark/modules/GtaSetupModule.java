package com.touch.mobile.dark.modules;

import android.app.Activity;
import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.touch.mobile.dark.MainGTA;

public class GtaSetupModule extends ReactContextBaseJavaModule {

    ReactApplicationContext context = getReactApplicationContext();

    GtaSetupModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void startGame(Promise promise) {
        try {
            Activity activity = getCurrentActivity();

            Intent intent = new Intent(context, MainGTA.class);
            assert activity != null;
            intent.putExtras(activity.getIntent());
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent);
            activity.finish();

        } catch (Exception e) {
            promise.reject("Error", e);
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "GtaSetupModule";
    }
}
