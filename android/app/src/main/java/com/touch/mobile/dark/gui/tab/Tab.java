package com.touch.mobile.dark.gui.tab;

import android.app.Activity;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.view.animation.AnimationUtils;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView;
import com.touch.mobile.dark.R;
import com.touch.mobile.dark.gui.util.LinearLayoutManagerWrapper;
import com.touch.mobile.dark.gui.util.Utils;
import com.nvidia.devtech.NvEventQueueActivity;
import java.util.ArrayList;
import java.util.List;

public class Tab {
    public ImageView mClearImg;
    public ConstraintLayout mInputLayout;
    public TextView mOnline;
    public List<PlayerData> mPlayerData;
    public RecyclerView mPlayersList;
    public EditText mSearch;
    public ImageView mSearchImg;
    private TabAdapter mTabAdapter;
    public Activity aactivity;

    public Tab(Activity activity) {
        aactivity = activity;
        ConstraintLayout constraintLayout = (ConstraintLayout) activity.findViewById(R.id.hassle_tab_main);
        mInputLayout = constraintLayout;
        EditText editText = (EditText) activity.findViewById(R.id.search_view);
        mSearch = editText;
        editText.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void afterTextChanged(Editable editable) {
                mTabAdapter.getFilter().filter(editable);
                setVisibleIconInSearchView(editable.toString());
            }
        });
        mSearchImg = activity.findViewById(R.id.icon_search_view);
        mClearImg = activity.findViewById(R.id.icon_clear_search_text);

        mClearImg.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                clearEditText(view);
            }
        });
        mSearchImg.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                clearEditText(view);
            }
        });
        mOnline = (TextView) activity.findViewById(R.id.players_list_value_players);
        mPlayersList = (RecyclerView) activity.findViewById(R.id.players_list);
        ArrayList arrayList = new ArrayList();
        mPlayerData = arrayList;
        mTabAdapter = new TabAdapter(arrayList);
        ((Button) activity.findViewById(R.id.players_list_close)).setOnClickListener(new View.OnClickListener() {
            public final void onClick(View view) {
                view.startAnimation(AnimationUtils.loadAnimation(aactivity, R.anim.button_click));
                close(activity, view);
            }
        });
        Utils.HideLayout(constraintLayout, false);
    }

    public void clearEditText(View view) {
        mSearch.setText("");
        setVisibleIconInSearchView("");
    }

    public void close(Activity activity, View view) {
        ((InputMethodManager) activity.getSystemService("input_method")).hideSoftInputFromWindow(view.getWindowToken(), 0);
        Utils.HideLayout(mInputLayout, true);
        NvEventQueueActivity.getInstance().onTabClose();
        this.mPlayersList.getRecycledViewPool().clear();
        TabAdapter adapter = (TabAdapter) this.mPlayersList.getAdapter();
        if (adapter != null) {
            adapter.notifyDataSetChanged();
        }
        this.mPlayerData.clear();
    }

    public void clearStat() {
        this.mPlayerData.clear();
    }

    public void setStat(Integer id, String name, Integer score, Integer ping, Integer clist) {
        this.mPlayerData.add(new PlayerData(id.intValue(), name, score.intValue(), ping.intValue(), clist.intValue()));
    }

    public void show(boolean isAnim) {
        TextView textView = this.mOnline;
        textView.setText(this.mPlayerData.size() + "/1000");
        mTabAdapter = new TabAdapter(this.mPlayerData);
        mPlayersList.setLayoutManager(new LinearLayoutManagerWrapper(NvEventQueueActivity.getInstance()));
        mPlayersList.setAdapter(this.mTabAdapter);
        mSearch.setText("");
        setVisibleIconInSearchView("");
        Utils.ShowLayout(this.mInputLayout, isAnim);
    }

    public void setVisibleIconInSearchView(String str) {
        if (str.isEmpty()) {
            this.mSearchImg.setVisibility(View.VISIBLE);
            this.mClearImg.setVisibility(View.INVISIBLE);
            return;
        }
        this.mSearchImg.setVisibility(View.INVISIBLE);
        this.mClearImg.setVisibility(View.VISIBLE);
    }

    public ConstraintLayout getInputLayout() {
        return this.mInputLayout;
    }
}
