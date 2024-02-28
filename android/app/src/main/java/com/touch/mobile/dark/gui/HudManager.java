package com.touch.mobile.dark.gui;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.view.View;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.constraintlayout.widget.ConstraintLayout;

import com.nvidia.devtech.NvEventQueueActivity;
import com.touch.mobile.dark.R;
import com.touch.mobile.dark.gui.util.Utils;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.ArrayList;
import java.util.Formatter;

public class HudManager {
    public Activity activity;
    public ConstraintLayout hud_layout;

    public TextView hud_money;
    public TextView hud_ammo;
    public TextView hud_bonus_text;
    public TextView hud_name;

    public ImageView hud_weapon;

    public ImageView hud_menu;
    public ImageView hud_inv;
    public ImageView hud_donate;
    public ImageView hud_bonus_img;

    public ArrayList<ImageView> hud_wanted;

    public ProgressBar progressHP;
    public ProgressBar progressArmor;
    public ProgressBar progressEat;

    private int indexInv = 4;

    public HudManager(Activity aactivity) {
        activity = aactivity;
        hud_layout = aactivity.findViewById(R.id.hud_main);
        hud_layout.setVisibility(View.GONE);

        progressArmor = aactivity.findViewById(R.id.hud_armor_pb);
        progressHP = aactivity.findViewById(R.id.hud_health_pb);
        progressEat = aactivity.findViewById(R.id.hud_eat);

        hud_money = aactivity.findViewById(R.id.hud_money);
        hud_ammo = aactivity.findViewById(R.id.hud_ammo);
        hud_weapon = aactivity.findViewById(R.id.hud_weapon);
        hud_menu = aactivity.findViewById(R.id.hud_menu);
        hud_inv = aactivity.findViewById(R.id.hud_inv);
        hud_donate = aactivity.findViewById(R.id.hud_donate);
        hud_bonus_img = aactivity.findViewById(R.id.hud_bonus_img);
        hud_bonus_text = aactivity.findViewById(R.id.hud_bonus_text);
        hud_name = aactivity.findViewById(R.id.hud_name);

        hud_wanted = new ArrayList<>();
        hud_wanted.add(activity.findViewById(R.id.hud_star_1));
        hud_wanted.add(activity.findViewById(R.id.hud_star_2));
        hud_wanted.add(activity.findViewById(R.id.hud_star_3));
        hud_wanted.add(activity.findViewById(R.id.hud_star_4));
        hud_wanted.add(activity.findViewById(R.id.hud_star_5));
        hud_wanted.add(activity.findViewById(R.id.hud_star_6));
        hud_menu.setOnClickListener( view -> {
            NvEventQueueActivity.getInstance().showMenu();
            NvEventQueueActivity.getInstance().togglePlayer(1);
        });
        hud_inv.setOnClickListener(view -> {
            try {
                NvEventQueueActivity.getInstance().sendRPC(1, String.valueOf(4).getBytes("windows-1251"), 4);
            } catch(Exception e) {}
        });
        hud_donate.setOnClickListener(view -> {
            try {
                NvEventQueueActivity.getInstance().sendRPC(1, String.valueOf(6).getBytes("windows-1251"), 6);
            } catch(Exception ignored) {}
        });
    }

    @SuppressLint("DefaultLocale")
    public void UpdateHudInfo(int health, int armour, int hunger, int weaponid, int ammo, int ammoinclip, int money, int wanted, int checkX2, String name, int id)
    {
        progressHP.setProgress(health);
        progressArmor.setProgress(armour);
        progressEat.setProgress(hunger);

        DecimalFormat formatter=new DecimalFormat();
        DecimalFormatSymbols symbols= DecimalFormatSymbols.getInstance();
        symbols.setGroupingSeparator('.');
        formatter.setDecimalFormatSymbols(symbols);
        hud_money.setText(formatter.format(money));

        if(checkX2 > 1) {
            hud_bonus_img.setVisibility(View.VISIBLE);
            hud_bonus_text.setText(String.format("x%d", checkX2));
        }

        hud_name.setText(String.format("ID:%d %s", id, name));

        switch(weaponid) {
            case 16:
            case 17:
            case 18:
                hud_ammo.setText(String.format("%d", ammo));
                break;
            case 22:
            case 23:
                hud_ammo.setText(String.format("%d/%d", ammo + 17 - ammoinclip , ammoinclip));
                break;
            case 27:
            case 24:
                hud_ammo.setText(String.format("%d/%d", ammo + 7 - ammoinclip, ammoinclip));
                break;
            case 25:
            case 33:
            case 34:
            case 35:
            case 36:
            case 39:
                hud_ammo.setText(String.format("%d/%d", ammo, 1));
                break;
            case 26:
                hud_ammo.setText(String.format("%d/%d", ammo + 2 - ammoinclip, ammoinclip));
                break;
            case 29:
            case 30:
                hud_ammo.setText(String.format("%d/%d", ammo + 30 - ammoinclip, ammoinclip));
                break;
            case 28:
            case 32:
            case 31:
                hud_ammo.setText(String.format("%d/%d", ammo + 50 - ammoinclip, ammoinclip));
                break;
            case 37:
            case 38:
            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
                hud_ammo.setText(String.format("%d/%d", ammo + 366 - ammoinclip, ammoinclip));
                break;
            default:
                hud_ammo.setText(String.valueOf(' '));
        }

        int d_id = activity.getResources().getIdentifier(new Formatter().format("weapon_%d", Integer.valueOf(weaponid)).toString(), "drawable", activity.getPackageName());
        hud_weapon.setImageResource(d_id);

        hud_weapon.setOnClickListener(v -> NvEventQueueActivity.getInstance().onWeaponChanged());
        if(wanted > 6) wanted = 6;
        for (int i2 = 0; i2 < wanted; i2++) {
            hud_wanted.get(i2).setBackgroundResource(R.drawable.ic_y_star);
        }

    }

    public void ShowHud()
    {
        Utils.ShowLayout(hud_layout, false);
    }

    public void HideHud()
    {
        Utils.HideLayout(hud_layout, false);
    }

}
