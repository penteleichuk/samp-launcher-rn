package com.touch.mobile.dark.gui;

import android.app.Activity;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.widget.*;

import androidx.constraintlayout.widget.ConstraintLayout;

import com.touch.mobile.dark.R;
import com.touch.mobile.dark.gui.util.Utils;
import com.touch.mobile.dark.gui.util.SeekArc;
import java.util.Formatter;

public class Speedometer {
    public Activity activity;
    public TextView mCarHP;
    public ImageView mEngine;
    public TextView mFuel;
    public ConstraintLayout mInputLayout;
    public ImageView mLight;
    public ImageView mLock;
    public TextView mMileage;
    public TextView mSpeed;
    public SeekArc mSpeedLine;

    public Speedometer(Activity activity){
        ConstraintLayout relativeLayout = activity.findViewById(R.id.speedometer);
        mInputLayout = relativeLayout;
        mSpeed = activity.findViewById(R.id.speed_text);
        mFuel = activity.findViewById(R.id.speed_fuel_text);
        mCarHP = activity.findViewById(R.id.speed_car_hp_text);
        mMileage = activity.findViewById(R.id.textView2);
        mSpeedLine = activity.findViewById(R.id.speed_line);
        mEngine = activity.findViewById(R.id.speed_engine_ico);
        mLock = activity.findViewById(R.id.speed_lock_ico);
        Utils.HideLayout(relativeLayout, false);
    }

    public void UpdateSpeedInfo(int speed, int fuel, int hp, int mileage, int engine, int light, int belt, int lock){
        hp= (int) hp/10;
        mFuel.setText(new Formatter().format("%d", Integer.valueOf(fuel)).toString());
        mMileage.setText(new Formatter().format("%06d", Integer.valueOf(mileage)).toString());
        mCarHP.setText(new Formatter().format("%d%s", Integer.valueOf(hp), "%").toString());
        mSpeedLine.setProgress(speed);
        mSpeed.setText(String.valueOf(speed));
 
        if(speed <= 80) {
            mSpeedLine.setProgressColor(Color.parseColor("#94C57B"));
        }
        else if(speed > 80 && speed <= 150) {
            mSpeedLine.setProgressColor(Color.parseColor("#f9c750"));
        } else if(speed > 150) {
            mSpeedLine.setProgressColor(Color.parseColor("#f36055"));
        }

        if(engine == 1)
            mEngine.setColorFilter(Color.parseColor("#9beb9b"), PorterDuff.Mode.SRC_IN);
        else
            mEngine.setColorFilter(Color.parseColor("#ff6d55"), PorterDuff.Mode.SRC_IN);
        if(lock == 1)
            mLock.setColorFilter(Color.parseColor("#9beb9b"), PorterDuff.Mode.SRC_IN);
        else
            mLock.setColorFilter(Color.parseColor("#ff6d55"), PorterDuff.Mode.SRC_IN);
    }

    public void ShowSpeed() {
        Utils.ShowLayout(mInputLayout, false);
    }

    public void HideSpeed() {
        Utils.HideLayout(mInputLayout, false);
    }
}