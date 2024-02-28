package com.touch.mobile.dark;

import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import android.view.KeyEvent;

import com.wardrumstudios.utils.WarMedia;

import com.touch.mobile.dark.gui.util.Utils;

public class MainGTA extends WarMedia {
    public static MainGTA self = null;
    static String vmVersion;
    private boolean once = false;

    static {
        vmVersion = null;
        System.out.println("**** Loading SO's");
        try {
            vmVersion = System.getProperty("java.vm.version");
            System.out.println("vmVersion " + vmVersion);
            System.loadLibrary("ImmEmulatorJ");
        } catch (ExceptionInInitializerError | UnsatisfiedLinkError ignored) {
        }

        System.loadLibrary("GTASA");
        System.loadLibrary("samp");
    }

    public boolean ServiceAppCommand(String str, String str2) {
        return false;
    }
    public int ServiceAppCommandValue(String str, String str2) {
        return 0;
    }

    public void onActivityResult(int i, int i2, Intent intent) {
        super.onActivityResult(i, i2, intent);
    }

    public void onConfigurationChanged(Configuration configuration) {
        super.onConfigurationChanged(configuration);
    }

    public void onCreate(Bundle bundle) {
        if(!once) {
            once = true;
        }

        System.out.println("MainGTA onCreate");
        self = this;
        wantsMultitouch = true;
        wantsAccelerometer = true;
        super.onCreate(bundle);
        Utils.currentContext = this;
    }

    public void onDestroy() {
        System.out.println("MainGTA onDestroy");
        super.onDestroy();
    }

    public boolean onKeyDown(int i, KeyEvent keyEvent) {
        return super.onKeyDown(i, keyEvent);
    }

    public void onPause() {
        System.out.println("MainGTA onPause");
        super.onPause();
    }

    public void onRestart() {
        System.out.println("MainGTA onRestart");
        super.onRestart();
    }

    public void onResume() {
        System.out.println("MainGTA onResume");
        super.onResume();
    }

    public void onStart() {
        System.out.println("MainGTA onStart");
        super.onStart();
    }

    public void onStop() {
        System.out.println("MainGTA onStop");
        super.onStop();
    }
}