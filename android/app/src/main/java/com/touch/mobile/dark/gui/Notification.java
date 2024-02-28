package com.touch.mobile.dark.gui;

import android.animation.Animator;
import android.app.Activity;
import android.os.CountDownTimer;
import android.view.View;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.content.ContextCompat;

import com.touch.mobile.dark.R;
import com.touch.mobile.dark.gui.util.Utils;
import com.nvidia.devtech.NvEventQueueActivity;

import java.io.UnsupportedEncodingException;

public class Notification {
    public Activity aactivity;

    public ConstraintLayout constraintLayout;

    public View view;

    public LinearLayout main;

    public Button button;

    public ProgressBar mProgressBar;

    public TextView ruble;
    public TextView text_notif;

    public static int type, duration;

    public static String text, actionforBtn, textBtn;

    public CountDownTimer countDownTimer;

    public Notification (Activity activity) {
        aactivity = activity;
        constraintLayout = activity.findViewById(R.id.constraintLayout_notif);
        button = activity.findViewById(R.id.br_not_button);
        view = activity.findViewById(R.id.br_not_view);
        ruble = activity.findViewById(R.id.br_not_ruble);
        text_notif = activity.findViewById(R.id.br_not_text);
        main = activity.findViewById(R.id.dw_root);
        mProgressBar = activity.findViewById(R.id.br_not_progress);
        Utils.HideLayout(constraintLayout, false);
    }

    public void ShowNotification (int type, String text, int duration, String actionforBtn, String textBtn) {
        Utils.HideLayout(constraintLayout, false);
        clearData();

        this.type = type;
        this.text = text;
        this.duration = duration;
        this.actionforBtn = actionforBtn;
        this.textBtn = textBtn;

        this.text_notif.setText(this.text);

        this.mProgressBar.setMax(this.duration * 1000);
        this.mProgressBar.setProgress(this.duration * 1000);

        switch (this.type) {
            case 0:
                button.setVisibility(View.GONE);
                ruble.setVisibility(View.VISIBLE);
                view.setBackground(ContextCompat.getDrawable(aactivity, R.drawable.background_br_notification_red));
                break;
            case 1:
                button.setVisibility(View.GONE);
                ruble.setVisibility(View.VISIBLE);
                view.setBackground(ContextCompat.getDrawable(aactivity, R.drawable.background_br_notification_green));
                break;
            case 2:
                button.setVisibility(View.GONE);
                ruble.setVisibility(View.GONE);
                view.setBackground(ContextCompat.getDrawable(aactivity, R.drawable.background_br_notification_red));
                break;
            case 3:
                button.setVisibility(View.GONE);
                ruble.setVisibility(View.GONE);
                view.setBackground(ContextCompat.getDrawable(aactivity, R.drawable.background_br_notification_green));
                break;
            case 4:
                button.setVisibility(View.VISIBLE);
                ruble.setVisibility(View.GONE);
                view.setBackground(ContextCompat.getDrawable(aactivity, R.drawable.background_br_notification_orange));
                button.setBackground(ContextCompat.getDrawable(aactivity, R.drawable.button_red_square_vector));
                break;
            case 5:
                button.setVisibility(View.VISIBLE);
                ruble.setVisibility(View.GONE);
                view.setBackground(ContextCompat.getDrawable(aactivity, R.drawable.background_br_notification_orange));
                button.setBackground(ContextCompat.getDrawable(aactivity, R.drawable.button_red_square));
                break;
        }

        if (this.type == 5 || this.type == 4) {
            this.button.setText(textBtn);
            this.button.setOnClickListener(view -> {
                view.startAnimation(AnimationUtils.loadAnimation(aactivity, R.anim.button_click));
                try {
                    NvEventQueueActivity.getInstance().sendCommand((Notification.actionforBtn).getBytes("windows-1251"));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                HideNotification();
            });
        }
        startCountdown();
        Utils.ShowLayout(constraintLayout, true);
    }

    private void clearData() {
        this.text = "";
        this.type = -1;
        this.duration = -1;
        this.actionforBtn = "";
        this.textBtn = "";
    }

    public void startCountdown() {
        if (countDownTimer != null) {
            countDownTimer.cancel();
            countDownTimer = null;
        }
        countDownTimer = new CountDownTimer(mProgressBar.getProgress(), 1) {
            @Override
            public void onTick(long j) {
                mProgressBar.setProgress((int) j);
            }
            @Override
            public void onFinish() {
                HideNotification();
            }
        }.start();
    }
    public void HideNotification () {
        if (countDownTimer != null) {
            countDownTimer.cancel();
            countDownTimer = null;
        }
        constraintLayout.startAnimation(AnimationUtils.loadAnimation(aactivity, R.anim.popup_hide_notification));
        constraintLayout.setVisibility(View.GONE);
    }
}