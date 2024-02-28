package com.touch.mobile.dark.gui.util;
import android.content.Context;
import android.content.res.TypedArray;
import android.os.Bundle;
import android.os.Parcelable;
import android.text.Editable;
import android.text.SpannableStringBuilder;
import android.text.TextWatcher;
import android.text.style.ForegroundColorSpan;
import android.util.AttributeSet;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.widget.TextView;
import androidx.appcompat.widget.AppCompatEditText;

import com.touch.mobile.dark.R;

public class MaskedEditText extends AppCompatEditText implements TextWatcher {
    public static final String SPACE = " ";
    private String allowedChars;
    private char charRepresentation;
    private String deniedChars;
    private boolean editingAfter;
    private boolean editingBefore;
    private boolean editingOnChanged;
    private View.OnFocusChangeListener focusChangeListener;
    private boolean ignore;
    private boolean initialized;
    private boolean keepHint;
    private int lastValidMaskPosition;
    private String mask;
    private int[] maskToRaw;
    protected int maxRawLength;
    private RawText rawText;
    private int[] rawToMask;
    private int selection;
    private boolean selectionChanged;

    public MaskedEditText(Context context) {
        super(context);
        init();
    }

    public MaskedEditText(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
        TypedArray attributes = context.obtainStyledAttributes(attrs, R.styleable.MaskedEditText);
        this.mask = attributes.getString(R.styleable.MaskedEditText_mask);

        this.allowedChars = attributes.getString(R.styleable.MaskedEditText_allowed_chars);
        this.deniedChars = attributes.getString(R.styleable.MaskedEditText_denied_chars);

        String representation = attributes.getString(R.styleable.MaskedEditText_char_representation);

        if (representation == null) {
            this.charRepresentation = '#';
        } else {
            this.charRepresentation = representation.charAt(0);
        }
        keepHint = attributes.getBoolean(R.styleable.MaskedEditText_keep_hint, false);
        cleanUp();
        setOnEditorActionListener(LambdaMaskedEditText.INSTANCE);
        attributes.recycle();
    }

    static /* synthetic */ boolean lambda$new$0(TextView v, int actionId, KeyEvent event) {
        return true;
    }

    public Parcelable onSaveInstanceState() {
        Parcelable superParcellable = MaskedEditText.super.onSaveInstanceState();
        Bundle state = new Bundle();
        state.putParcelable("super", superParcellable);
        state.putString("text", getRawText());
        return state;
    }

    public void onRestoreInstanceState(Parcelable state) {
        MaskedEditText.super.onRestoreInstanceState(((Bundle) state).getParcelable("super"));
        String text = ((Bundle) state).getString("text");
        Log.d("ContentValues", "onRestoreInstanceState: " + text);
        setText(text);
    }

    public void setText(CharSequence text, TextView.BufferType type) {
        MaskedEditText.super.setText(text, type);
    }

    public void setOnFocusChangeListener(View.OnFocusChangeListener listener) {
        this.focusChangeListener = listener;
    }

    private void cleanUp() {
        this.initialized = false;
        generatePositionArrays();
        this.rawText = new RawText();
        this.selection = this.rawToMask[0];
        this.editingBefore = true;
        this.editingOnChanged = true;
        this.editingAfter = true;
        if (!hasHint() || this.rawText.length() != 0) {
            setText(makeMaskedText());
        } else {
            setText(makeMaskedTextWithHint());
        }
        this.editingBefore = false;
        this.editingOnChanged = false;
        this.editingAfter = false;
        this.maxRawLength = this.maskToRaw[previousValidPosition(this.mask.length() - 1)] + 1;
        this.lastValidMaskPosition = findLastValidMaskPosition();
        this.initialized = true;
        MaskedEditText.super.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            /* class com.brilliant.cr.custom.util.MaskedEditText.AnonymousClass1 */

            public void onFocusChange(View v, boolean hasFocus) {
                if (MaskedEditText.this.focusChangeListener != null) {
                    MaskedEditText.this.focusChangeListener.onFocusChange(v, hasFocus);
                }
                if (MaskedEditText.this.hasFocus()) {
                    MaskedEditText.this.selectionChanged = false;
                    MaskedEditText maskedEditText = MaskedEditText.this;
                    maskedEditText.setSelection(maskedEditText.lastValidPosition());
                }
            }
        });
    }

    private int findLastValidMaskPosition() {
        for (int i = this.maskToRaw.length - 1; i >= 0; i--) {
            if (this.maskToRaw[i] != -1) {
                return i;
            }
        }
        throw new RuntimeException("Mask must contain at least one representation char");
    }

    private boolean hasHint() {
        return getHint() != null;
    }

    public MaskedEditText(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init();
    }

    public void setMask(String mask2) {
        this.mask = mask2;
        cleanUp();
    }

    public String getMask() {
        return this.mask;
    }

    public String getRawText() {
        return this.rawText.getText();
    }

    public void setCharRepresentation(char charRepresentation2) {
        this.charRepresentation = charRepresentation2;
        cleanUp();
    }

    public char getCharRepresentation() {
        return this.charRepresentation;
    }

    private void generatePositionArrays() {
        int[] aux = new int[this.mask.length()];
        this.maskToRaw = new int[this.mask.length()];
        String charsInMaskAux = "";
        int charIndex = 0;
        for (int i = 0; i < this.mask.length(); i++) {
            char currentChar = this.mask.charAt(i);
            if (currentChar == this.charRepresentation) {
                aux[charIndex] = i;
                this.maskToRaw[i] = charIndex;
                charIndex++;
            } else {
                String charAsString = Character.toString(currentChar);
                if (!charsInMaskAux.contains(charAsString)) {
                    charsInMaskAux = charsInMaskAux.concat(charAsString);
                }
                this.maskToRaw[i] = -1;
            }
        }
        if (charsInMaskAux.indexOf(32) < 0) {
            charsInMaskAux = charsInMaskAux + SPACE;
        }
        charsInMaskAux.toCharArray();
        this.rawToMask = new int[charIndex];
        for (int i2 = 0; i2 < charIndex; i2++) {
            this.rawToMask[i2] = aux[i2];
        }
    }

    private void init() {
        addTextChangedListener(this);
    }

    public void beforeTextChanged(CharSequence s, int start, int count, int after) {
        if (!this.editingBefore) {
            this.editingBefore = true;
            if (start > this.lastValidMaskPosition) {
                this.ignore = true;
            }
            int rangeStart = start;
            if (after == 0) {
                rangeStart = erasingStart(start);
            }
            Range range = calculateRange(rangeStart, start + count);
            if (range.getStart() != -1) {
                this.rawText.subtractFromString(range);
            }
            if (count > 0) {
                this.selection = previousValidPosition(start);
            }
        }
    }

    private int erasingStart(int start) {
        while (start > 0 && this.maskToRaw[start] == -1) {
            start--;
        }
        return start;
    }

    public void onTextChanged(CharSequence s, int start, int before, int count) {
        int currentPosition;
        if (!this.editingOnChanged && this.editingBefore) {
            this.editingOnChanged = true;
            if (!this.ignore && count > 0) {
                int startingPosition = this.maskToRaw[nextValidPosition(start)];
                int count2 = this.rawText.addToString(clear(s.subSequence(start, start + count).toString()), startingPosition, this.maxRawLength);
                if (this.initialized) {
                    int i = startingPosition + count2;
                    int[] iArr = this.rawToMask;
                    if (i < iArr.length) {
                        currentPosition = iArr[startingPosition + count2];
                    } else {
                        currentPosition = 1 + this.lastValidMaskPosition;
                    }
                    this.selection = nextValidPosition(currentPosition);
                }
            }
        }
    }

    public void afterTextChanged(Editable s) {
        if (!this.editingAfter && this.editingBefore && this.editingOnChanged) {
            this.editingAfter = true;
            if (!hasHint() || (!this.keepHint && this.rawText.length() != 0)) {
                setText(makeMaskedText());
            } else {
                setText(makeMaskedTextWithHint());
            }
            this.selectionChanged = false;
            setSelection(this.selection);
            this.editingBefore = false;
            this.editingOnChanged = false;
            this.editingAfter = false;
            this.ignore = false;
        }
    }

    public boolean isKeepHint() {
        return this.keepHint;
    }

    public void setKeepHint(boolean keepHint2) {
        this.keepHint = keepHint2;
        setText(getRawText());
    }

    /* access modifiers changed from: protected */
    public void onSelectionChanged(int selStart, int selEnd) {
        if (this.initialized) {
            if (!this.selectionChanged) {
                selStart = fixSelection(selStart);
                selEnd = fixSelection(selEnd);
                if (selStart > getText().length()) {
                    selStart = getText().length();
                }
                if (selStart < 0) {
                    selStart = 0;
                }
                if (selEnd > getText().length()) {
                    selEnd = getText().length();
                }
                if (selEnd < 0) {
                    selEnd = 0;
                }
                setSelection(selStart, selEnd);
                this.selectionChanged = true;
            } else if (selStart > this.rawText.length() - 1) {
                int start = fixSelection(selStart);
                int end = fixSelection(selEnd);
                if (start >= 0 && end < getText().length()) {
                    setSelection(start, end);
                }
            }
        }
        MaskedEditText.super.onSelectionChanged(selStart, selEnd);
    }

    private int fixSelection(int selection2) {
        if (selection2 > lastValidPosition()) {
            return lastValidPosition();
        }
        return nextValidPosition(selection2);
    }

    private int nextValidPosition(int currentPosition) {
        while (currentPosition < lastValidMaskPosition && maskToRaw[currentPosition] == -1) {
            currentPosition++;
        }
        if (currentPosition > lastValidMaskPosition) return lastValidMaskPosition + 1;
        return currentPosition;
    }

    private int previousValidPosition(int currentPosition) {
        while (currentPosition >= 0 && this.maskToRaw[currentPosition] == -1) {
            currentPosition--;
            if (currentPosition < 0) {
                return nextValidPosition(0);
            }
        }
        return currentPosition;
    }

    private int lastValidPosition() {
        if (this.rawText.length() == this.maxRawLength) {
            return this.rawToMask[this.rawText.length() - 1] + 1;
        }
        return nextValidPosition(this.rawToMask[this.rawText.length()]);
    }

    private String makeMaskedText() {
        int maskedTextLength;
        int length = this.rawText.length();
        int[] iArr = this.rawToMask;
        if (length < iArr.length) {
            maskedTextLength = iArr[this.rawText.length()];
        } else {
            maskedTextLength = this.mask.length();
        }
        char[] maskedText = new char[maskedTextLength];
        for (int i = 0; i < maskedText.length; i++) {
            int rawIndex = this.maskToRaw[i];
            if (rawIndex == -1) {
                maskedText[i] = this.mask.charAt(i);
            } else {
                maskedText[i] = this.rawText.charAt(rawIndex);
            }
        }
        return new String(maskedText);
    }

    /* JADX WARNING: Code restructure failed: missing block: B:15:0x005c, code lost:
        if (r3 >= r6[r8.rawText.length()]) goto L_0x0064;
     */
    private CharSequence makeMaskedTextWithHint() {
        SpannableStringBuilder ssb = new SpannableStringBuilder();
        int maskFirstChunkEnd = this.rawToMask[0];
        int i = 0;
        while (i < this.mask.length()) {
            int mtrv = this.maskToRaw[i];
            if (mtrv == -1) {
                ssb.append(this.mask.charAt(i));
            } else if (mtrv < this.rawText.length()) {
                ssb.append(this.rawText.charAt(mtrv));
            } else {
                ssb.append(getHint().charAt(this.maskToRaw[i]));
            }
            if (this.keepHint) {
                int length = this.rawText.length();
                int[] iArr = this.rawToMask;
                if (length < iArr.length) {
                }
            }
            if (!this.keepHint) {
                if (i < maskFirstChunkEnd) {
                }
                ssb.setSpan(new ForegroundColorSpan(getCurrentHintTextColor()), i, i + 1, 0);
            }
            i++;
        }
        return ssb;
    }

    private Range calculateRange(int start, int end) {
        int newStart;
        Range range = new Range();
        int i = start;
        while (i <= end && i < this.mask.length()) {
            if (this.maskToRaw[i] != -1) {
                if (range.getStart() == -1) {
                    range.setStart(this.maskToRaw[i]);
                }
                range.setEnd(this.maskToRaw[i]);
            }
            i++;
        }
        if (end == this.mask.length()) {
            range.setEnd(this.rawText.length());
        }
        if (range.getStart() == range.getEnd() && start < end && (newStart = previousValidPosition(range.getStart() - 1)) < range.getStart()) {
            range.setStart(newStart);
        }
        return range;
    }

    private String clear(String string) {
        String str = this.deniedChars;
        if (str != null) {
            for (char c : str.toCharArray()) {
                string = string.replace(Character.toString(c), "");
            }
        }
        if (this.allowedChars == null) {
            return string;
        }
        StringBuilder builder = new StringBuilder(string.length());
        char[] charArray = string.toCharArray();
        for (char c2 : charArray) {
            if (this.allowedChars.contains(String.valueOf(c2))) {
                builder.append(c2);
            }
        }
        return builder.toString();
    }
}
