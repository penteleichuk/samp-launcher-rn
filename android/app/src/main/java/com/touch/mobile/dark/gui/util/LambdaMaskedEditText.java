package com.touch.mobile.dark.gui.util;

import android.view.KeyEvent;
import android.widget.TextView;

public final class LambdaMaskedEditText implements TextView.OnEditorActionListener {
    public static final LambdaMaskedEditText INSTANCE = new LambdaMaskedEditText();

    private LambdaMaskedEditText() {}

    public final boolean onEditorAction(TextView textView, int i, KeyEvent keyEvent) {
        return MaskedEditText.lambda$new$0(textView, i, keyEvent);
    }
}
