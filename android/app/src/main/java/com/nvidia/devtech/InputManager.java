package com.nvidia.devtech;

import android.app.Activity;
import android.text.Editable;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.touch.mobile.dark.R;
import java.util.ArrayList;

public class InputManager {
    private Runnable mAnimTask = null;
    private Button mButtonHistoryNext = null;
    private Button mButtonHistoryPrev = null;
    private Button mButtonSlash = null;
    private Activity mContext = null;
    private int mCurrentHistoryMessage = 0;
    private HeightProvider mHeightProvider = null;
    private EditText mInputEt = null;
    private ArrayList<String> mInputHistory = null;
    private LinearLayout mInputLayout = null;
    private boolean mIsShowing = false;
    private final int mMaxHistory = 20;
    private String mSavedInput = null;

    public interface InputListener {
        void OnInputEnd(String str);
    }

    static /* synthetic */ int access$108(InputManager inputManager) {
        int i = inputManager.mCurrentHistoryMessage;
        inputManager.mCurrentHistoryMessage = i + 1;
        return i;
    }

    static /* synthetic */ int access$110(InputManager inputManager) {
        int i = inputManager.mCurrentHistoryMessage;
        inputManager.mCurrentHistoryMessage = i - 1;
        return i;
    }

    public boolean IsShowing() {
        return this.mIsShowing;
    }

    public InputManager(Activity activity) {
        this.mContext = activity;
        this.mInputLayout = (LinearLayout) activity.findViewById(R.id.main_input);
        this.mInputEt = (EditText) this.mContext.findViewById(R.id.main_et_input);
        this.mButtonSlash = (Button) this.mContext.findViewById(R.id.main_but_input_slash);
        this.mButtonHistoryPrev = (Button) this.mContext.findViewById(R.id.main_but_input_prev);
        this.mButtonHistoryNext = (Button) this.mContext.findViewById(R.id.main_but_input_next);
        this.mInputHistory = new ArrayList<>();
        this.mButtonSlash.setOnClickListener(new View.OnClickListener() {
            /* class com.nvidia.devtech.InputManager.AnonymousClass1 */

            public void onClick(View view) {
                InputManager.this.mInputEt.getText().insert(InputManager.this.mInputEt.getSelectionStart(), "/");
            }
        });
        this.mButtonHistoryPrev.setOnClickListener(new View.OnClickListener() {
            /* class com.nvidia.devtech.InputManager.AnonymousClass2 */

            public void onClick(View view) {
                InputManager.access$110(InputManager.this);
                if (InputManager.this.mCurrentHistoryMessage < 0) {
                    InputManager.this.mCurrentHistoryMessage = 0;
                }
                if (InputManager.this.mCurrentHistoryMessage <= 0) {
                    InputManager.this.mInputEt.setText("");
                    return;
                }
                InputManager.this.mInputEt.setText((CharSequence) InputManager.this.mInputHistory.get(InputManager.this.mCurrentHistoryMessage - 1));
                InputManager.this.mInputEt.setSelection(InputManager.this.mInputEt.getText().length());
            }
        });
        this.mButtonHistoryNext.setOnClickListener(new View.OnClickListener() {
            /* class com.nvidia.devtech.InputManager.AnonymousClass3 */

            public void onClick(View view) {
                InputManager.access$108(InputManager.this);
                if (InputManager.this.mCurrentHistoryMessage - 1 >= InputManager.this.mInputHistory.size()) {
                    InputManager.access$110(InputManager.this);
                }
                if (InputManager.this.mCurrentHistoryMessage > 0) {
                    InputManager.this.mInputEt.setText((CharSequence) InputManager.this.mInputHistory.get(InputManager.this.mCurrentHistoryMessage - 1));
                    InputManager.this.mInputEt.setSelection(InputManager.this.mInputEt.getText().length());
                }
            }
        });
        this.mInputEt.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            /* class com.nvidia.devtech.InputManager.AnonymousClass4 */

            public boolean onEditorAction(TextView textView, int i, KeyEvent keyEvent) {
                Editable text;
                if ((i != 6 && i != 5) || (text = InputManager.this.mInputEt.getText()) == null) {
                    return false;
                }
                String obj = text.toString();
                InputManager.this.mInputEt.setText("");
                InputManager.this.OnInputEnd(obj);
                return false;
            }
        });
        HideInputLayout();
    }

    public void onHeightChanged(int i) {
        FrameLayout.LayoutParams layoutParams = (FrameLayout.LayoutParams) this.mInputLayout.getLayoutParams();
        layoutParams.setMargins(0, 0, 0, i);
        this.mInputLayout.setLayoutParams(layoutParams);
    }

    public void ShowInputLayout() {
        this.mIsShowing = true;
        this.mInputLayout.setVisibility(4);
        this.mInputEt.requestFocus();
        ((InputMethodManager) this.mContext.getSystemService("input_method")).showSoftInput(this.mInputEt, 1);
        Runnable runnable = this.mAnimTask;
        if (runnable != null) {
            this.mInputLayout.removeCallbacks(runnable);
            this.mAnimTask = null;
        }
        Runnable r0 = new Runnable() {
            /* class com.nvidia.devtech.InputManager.AnonymousClass5 */

            public void run() {
                InputManager.this.mInputLayout.setVisibility(0);
                InputManager.this.mInputEt.requestFocus();
            }
        };
        this.mAnimTask = r0;
        this.mInputLayout.postDelayed(r0, 60);
        this.mCurrentHistoryMessage = 0;
        String str = this.mSavedInput;
        if (str != null) {
            this.mInputEt.setText(str);
            EditText editText = this.mInputEt;
            editText.setSelection(editText.getText().length());
        }
    }

    public void HideInputLayout() {
        this.mCurrentHistoryMessage = 0;
        if (this.mInputEt.getEditableText() != null) {
            this.mSavedInput = this.mInputEt.getEditableText().toString();
        }
        Runnable runnable = this.mAnimTask;
        if (runnable != null) {
            this.mInputLayout.removeCallbacks(runnable);
            this.mAnimTask = null;
        }
        if (this.mContext.getCurrentFocus() != null) {
            ((InputMethodManager) this.mContext.getSystemService("input_method")).hideSoftInputFromWindow(this.mContext.getCurrentFocus().getWindowToken(), 0);
        }
        this.mInputLayout.setVisibility(8);
        this.mIsShowing = false;
    }

    /* access modifiers changed from: private */
    /* access modifiers changed from: public */
    private void OnInputEnd(String str) {
        if (this.mInputHistory.size() >= 20) {
            ArrayList<String> arrayList = this.mInputHistory;
            arrayList.remove(arrayList.size() - 1);
        }
        this.mInputHistory.add(0, str);
        ((InputListener) this.mContext).OnInputEnd(str);
    }
}
