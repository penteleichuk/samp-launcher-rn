package com.touch.mobile.dark.gui.util;

public class RawText {
    private String text = "";

    public void subtractFromString(Range range) {
        String firstPart = "";
        String lastPart = "";
        if (range.getStart() > 0 && range.getStart() <= this.text.length()) {
            firstPart = this.text.substring(0, range.getStart());
        }
        if (range.getEnd() >= 0 && range.getEnd() < this.text.length()) {
            lastPart = this.text.substring(range.getEnd(), this.text.length());
        }
        this.text = firstPart.concat(lastPart);
    }

    public int addToString(String newString, int start, int maxLength) {
        String firstPart = "";
        String lastPart = "";
        if (newString == null || newString.equals("")) {
            return 0;
        }
        if (start < 0) {
            throw new IllegalArgumentException("Start position must be non-negative");
        } else if (start <= this.text.length()) {
            int count = newString.length();
            if (start > 0) {
                firstPart = this.text.substring(0, start);
            }
            if (start >= 0 && start < this.text.length()) {
                String str = this.text;
                lastPart = str.substring(start, str.length());
            }
            if (this.text.length() + newString.length() > maxLength) {
                count = maxLength - this.text.length();
                newString = newString.substring(0, count);
            }
            this.text = firstPart.concat(newString).concat(lastPart);
            return count;
        } else {
            throw new IllegalArgumentException("Start position must be less than the actual text length");
        }
    }

    public String getText() {
        return this.text;
    }

    public int length() {
        return this.text.length();
    }

    public char charAt(int position) {
        return this.text.charAt(position);
    }
}
