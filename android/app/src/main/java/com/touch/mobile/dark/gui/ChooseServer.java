package com.touch.mobile.dark.gui;

import android.app.Activity;
import android.widget.FrameLayout;
import android.widget.TextView;
import com.touch.mobile.dark.R;
import com.touch.mobile.dark.gui.util.Utils;
import com.nvidia.devtech.NvEventQueueActivity;
import java.util.Formatter;

public class ChooseServer {
    FrameLayout serverLayout;
    TextView percentText;
    Activity aactivity;
    int type;

    public ChooseServer(Activity activity){
        aactivity = activity;
        serverLayout = activity.findViewById(R.id.br_serverselect_layout);
        percentText = activity.findViewById(R.id.br_ls_progress);
        type = NvEventQueueActivity.getInstance().getLastServer();
        Utils.HideLayout(serverLayout, false);
    }

    public void Update(int percent) {
        if (percent <= 100)
            percentText.setText(new Formatter().format("%d%s", percent, "%").toString());
        else {
            Utils.HideLayout(serverLayout, true);
        }
    }

    public void Show() {
        Utils.ShowLayout(serverLayout, false);
    }
}