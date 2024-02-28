package com.touch.mobile.dark.gui.util;
import android.content.Context;
import android.util.AttributeSet;
import android.view.MotionEvent;
import androidx.recyclerview.widget.RecyclerView;

public class CustomRecyclerView extends RecyclerView {
    private boolean mEnableScrolling = true;

    public CustomRecyclerView(Context context) {
        super(context);
    }

    public CustomRecyclerView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public CustomRecyclerView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    public boolean onInterceptTouchEvent(MotionEvent motionEvent) {
        if (isEnableScrolling()) {
            return CustomRecyclerView.super.onInterceptTouchEvent(motionEvent);
        }
        return false;
    }

    public boolean onTouchEvent(MotionEvent motionEvent) {
        if (isEnableScrolling()) {
            return CustomRecyclerView.super.onTouchEvent(motionEvent);
        }
        return false;
    }

    public int getScrollForRecycler() {
        return computeVerticalScrollOffset();
    }

    public boolean isEnableScrolling() {
        return this.mEnableScrolling;
    }

    public void setEnableScrolling(boolean z) {
        this.mEnableScrolling = z;
    }
}
