package com.touch.mobile.dark.gui.dialogs;

import android.app.Activity;
import android.content.Context;
import android.text.Editable;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.FrameLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.LinearLayoutManager;
import com.nvidia.devtech.CustomEditText;
import com.nvidia.devtech.NvEventQueueActivity;
import com.touch.mobile.dark.R;
import com.touch.mobile.dark.gui.util.CustomRecyclerView;
import com.touch.mobile.dark.gui.util.Utils;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

public class Dialog {
    private static final int DIALOG_LEFT_BTN_ID = 1;
    private static final int DIALOG_RIGHT_BTN_ID = 0;
    private static final int DIALOG_STYLE_INPUT = 1;
    private static final int DIALOG_STYLE_LIST = 2;
    private static final int DIALOG_STYLE_MSGBOX = 0;
    private static final int DIALOG_STYLE_PASSWORD = 3;
    private static final int DIALOG_STYLE_TABLIST = 4;
    private static final int DIALOG_STYLE_TABLIST_HEADER = 5;
    private final TextView mCaption;
    private final TextView mContent;
    private int mCurrentDialogId = -1;
    private int mCurrentDialogTypeId = -1;
    private String mCurrentInputText = "";
    private int mCurrentListItem = -1;
    private final CustomRecyclerView mCustomRecyclerView;
    private final ArrayList<TextView> mHeadersList;
    private final CustomEditText mInput;
    private final ConstraintLayout mInputLayout;
    private final ConstraintLayout mLeftBtn;
    private final ConstraintLayout mListLayout;
    private final ConstraintLayout mMainLayout;
    private final ScrollView mMsgBoxLayout;
    private final ConstraintLayout mRightBtn;
    private ArrayList<String> mRowsList;

    public Dialog(Activity activity) {
        this.mMainLayout = activity.findViewById(R.id.sd_dialog_main);
        this.mCaption = (TextView) activity.findViewById(R.id.sd_dialog_caption);
        this.mContent = (TextView) activity.findViewById(R.id.sd_dialog_text);
        ConstraintLayout findViewById1 = activity.findViewById(R.id.sd_button_positive);
        this.mLeftBtn = findViewById1;
        ConstraintLayout findViewById2 = activity.findViewById(R.id.sd_button_negative);
        this.mRightBtn = findViewById2;
        this.mInputLayout = activity.findViewById(R.id.sd_dialog_input_layout);
        this.mListLayout = activity.findViewById(R.id.sd_dialog_list_layout);
        this.mMsgBoxLayout = (ScrollView) activity.findViewById(R.id.sd_dialog_text_layout);
        this.mInput = (CustomEditText) activity.findViewById(R.id.sd_dialog_input);
        this.mCustomRecyclerView = (CustomRecyclerView) activity.findViewById(R.id.sd_dialog_list_recycler);
        findViewById1.setOnClickListener(view -> sendDialogResponse(1));
        findViewById2.setOnClickListener(view -> sendDialogResponse(0));
        this.mRowsList = new ArrayList<>();
        this.mHeadersList = new ArrayList<>();
        ConstraintLayout mHeadersLayout = activity.findViewById(R.id.sd_dialog_tablist_row);
        for (int i = 0; i < mHeadersLayout.getChildCount(); i++) {
            this.mHeadersList.add((TextView) mHeadersLayout.getChildAt(i));
        }
        this.mInput.setOnEditorActionListener((textView, i, keyEvent) -> {
            Editable editableText;
            if ((i != 6 && i != 5) || (editableText = this.mInput.getText()) == null) {
                return false;
            }
            this.mCurrentInputText = editableText.toString();
            return false;
        });
        this.mInput.setOnClickListener(view ->
        {
            this.mInput.requestFocus();
            ((InputMethodManager) NvEventQueueActivity.getInstance().getSystemService(Context.INPUT_METHOD_SERVICE)).showSoftInput(this.mInput, 1);
        });
        Utils.HideLayout(this.mMainLayout, false);
    }

    public void show(int dialogId, int dialogTypeId, String caption, String content, String leftBtnText, String rightBtnText) {
        clearDialogData();
        this.mCurrentDialogId = dialogId;
        this.mCurrentDialogTypeId = dialogTypeId;
        if (dialogTypeId == 0) {
            this.mInputLayout.setVisibility(View.GONE);
            this.mListLayout.setVisibility(View.GONE);
            this.mMsgBoxLayout.setVisibility(View.VISIBLE);
        }
        else if(dialogTypeId == 1 || dialogTypeId == 3)
        {
            this.mInputLayout.setVisibility(View.VISIBLE); // выполняется инпут
            this.mMsgBoxLayout.setVisibility(View.VISIBLE);
            this.mListLayout.setVisibility(View.GONE);
        }
        else
        {
            this.mInputLayout.setVisibility(View.GONE);
            this.mMsgBoxLayout.setVisibility(View.GONE); // LIST, TABLIST, TABLIST_HEADER
            this.mListLayout.setVisibility(View.VISIBLE);
            loadTabList(content);
            ArrayList<String> fixFieldsForDialog = Utils.fixFieldsForDialog(this.mRowsList);
            this.mRowsList = fixFieldsForDialog;
            DialogAdapter adapter = new DialogAdapter(fixFieldsForDialog, this.mHeadersList);
            adapter.setOnClickListener((i, str) -> { this.mCurrentListItem = i;
            this.mCurrentInputText = str; });
            adapter.setOnDoubleClickListener(() -> sendDialogResponse(1));
            this.mCustomRecyclerView.setLayoutManager(new LinearLayoutManager((Context) NvEventQueueActivity.getInstance()));
            this.mCustomRecyclerView.setAdapter(adapter);
            if (dialogTypeId != 2) {
                CustomRecyclerView customRecyclerView = this.mCustomRecyclerView;
                adapter.getClass();
                customRecyclerView.post(() -> adapter.updateSizes());
            }
        }
        this.mCaption.setText(Utils.transfromColors(caption));
        this.mContent.setText(Utils.transfromColors(content));
        ((TextView) this.mLeftBtn.getChildAt(0)).setText(Utils.transfromColors(leftBtnText));
        ((TextView) this.mRightBtn.getChildAt(0)).setText(Utils.transfromColors(rightBtnText));
        if (rightBtnText.equals("")) { this.mRightBtn.setVisibility(View.GONE); }
        else { this.mRightBtn.setVisibility(View.VISIBLE); }
        Utils.ShowLayout(this.mMainLayout, true);
    }

    public void hideWithoutReset() {
        Utils.HideLayout(this.mMainLayout, false);
    }

    public void showWithOldContent() {
        Utils.ShowLayout(this.mMainLayout, false);
    }

    public void sendDialogResponse(int btnId) {
        if (!this.mCurrentInputText.equals(this.mInput.getText().toString())) {
            this.mCurrentInputText = this.mInput.getText().toString();
        }
        ((InputMethodManager) NvEventQueueActivity.getInstance().getSystemService(Context.INPUT_METHOD_SERVICE)).hideSoftInputFromWindow(this.mInput.getWindowToken(), 0);
        try {
            NvEventQueueActivity.getInstance().sendDialogResponse(btnId, this.mCurrentDialogId, this.mCurrentListItem, this.mCurrentInputText.getBytes("windows-1251"));
            Utils.HideLayout(this.mMainLayout, true);
        }
        catch (UnsupportedEncodingException e){
            e.printStackTrace();
        }
    }

    private void loadTabList(String content) {
        String[] strings = content.split("\n");
        for (int i = 0; i < strings.length; i++) {
            if (this.mCurrentDialogTypeId == 5 && i == 0) {
                String[] headers = strings[i].split("\t");
                for (int j = 0; j < headers.length; j++) {
                    this.mHeadersList.get(j).setText(Utils.transfromColors(headers[j]));
                    this.mHeadersList.get(j).setVisibility(View.VISIBLE);
                }
            } else {
                this.mRowsList.add(strings[i]);
            }
        }
    }

    private void clearDialogData() {
        this.mInput.setText("");
        this.mCurrentDialogId = -1;
        this.mCurrentDialogTypeId = -1;
        this.mCurrentListItem = -1;
        this.mRowsList.clear();
        for (int i = 0; i < this.mHeadersList.size(); i++) {
            this.mHeadersList.get(i).setVisibility(View.GONE);
        }
    }

    public void onHeightChanged(int height) {
        FrameLayout.LayoutParams params = (FrameLayout.LayoutParams) this.mMainLayout.getLayoutParams();
        params.setMargins(0, 0, 0, height);
        this.mMainLayout.setLayoutParams(params);
    }
}
