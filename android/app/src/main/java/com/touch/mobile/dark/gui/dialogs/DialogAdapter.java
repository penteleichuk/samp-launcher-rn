package com.touch.mobile.dark.gui.dialogs;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView;

import com.touch.mobile.dark.R;
import com.touch.mobile.dark.gui.util.MaskedEditText;
import com.touch.mobile.dark.gui.util.Utils;

import java.util.ArrayList;

public class DialogAdapter extends RecyclerView.Adapter {
    private int mCurrentSelectedPosition = 0;
    private View mCurrentSelectedView;
    private final ArrayList<TextView> mFieldHeaders;
    private final ArrayList<String> mFieldTexts;
    private final ArrayList<ArrayList<TextView>> mFields;
    private OnClickListener mOnClickListener;
    private OnDoubleClickListener mOnDoubleClickListener;

    public interface OnClickListener {
        void onClick(int i, String str);
    }

    public interface OnDoubleClickListener {
        void onDoubleClick();
    }

    public DialogAdapter(ArrayList<String> fields, ArrayList<TextView> fieldHeaders) {
        this.mFieldTexts = fields;
        this.mFieldHeaders = fieldHeaders;
        this.mFields = new ArrayList<>();
    }

    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        return new ViewHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.dialog_item_layout, parent, false));
    }

    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        onBindViewHolder((ViewHolder) holder, position);
    }

    public void onBindViewHolder(ViewHolder holder, int position) {
        String[] headers = this.mFieldTexts.get(position).split("\t");
        ArrayList<TextView> fields = new ArrayList<>();
        for (int i = 0; i < headers.length; i++) {
            TextView field = holder.mFields.get(i);
            field.setText(Utils.transfromColors(headers[i].replace("\\t", "")));
            field.setVisibility(View.VISIBLE);
            fields.add(field);
        }
        this.mFields.add(fields);
        if (this.mCurrentSelectedPosition == position) {
            ImageView imageView = holder.mFieldBg;
            this.mCurrentSelectedView = imageView;
            imageView.setVisibility(View.VISIBLE);
            this.mOnClickListener.onClick(position, holder.mFields.get(0).getText().toString());
        } else {
            holder.mFieldBg.setVisibility(View.GONE);
        }

        holder.getView().setOnClickListener(view -> {
            if (this.mCurrentSelectedPosition != holder.getAdapterPosition()) {
                View view2 = this.mCurrentSelectedView;
                if (view2 != null) {
                    view2.setVisibility(View.GONE);
                }
                this.mCurrentSelectedPosition = holder.getAdapterPosition();
                this.mCurrentSelectedView = holder.mFieldBg;
                holder.mFieldBg.setVisibility(View.VISIBLE);
                this.mOnClickListener.onClick(holder.getAdapterPosition(), holder.mFields.get(0).getText().toString());
                return;
            }
            OnDoubleClickListener onDoubleClickListener = this.mOnDoubleClickListener;
            if (onDoubleClickListener != null) {
                onDoubleClickListener.onDoubleClick();
            }
        });
    }

    public void updateSizes() {
        int[] max = new int[4];
        for (int i = 0; i < this.mFields.size(); i++) {
            for (int j = 0; j < this.mFields.get(i).size(); j++) {
                int width = this.mFields.get(i).get(j).getWidth();
                if (max[j] < width) {
                    max[j] = width;
                }
            }
        }
        for (int i2 = 0; i2 < max.length; i2++) {
            int headerWidth = this.mFieldHeaders.get(i2).getWidth();
            Log.i("DIALOG", max[i2] + "\t" + ((Object) this.mFieldHeaders.get(i2).getText()) + MaskedEditText.SPACE + headerWidth);
            if (max[i2] < headerWidth) {
                max[i2] = headerWidth;
            }
        }
        for (int i3 = 0; i3 < this.mFields.size(); i3++) {
            for (int j2 = 0; j2 < this.mFields.get(i3).size(); j2++) {
                this.mFields.get(i3).get(j2).setWidth(max[j2]);
            }
        }
        for (int i4 = 0; i4 < this.mFieldHeaders.size(); i4++) {
            this.mFieldHeaders.get(i4).setWidth(max[i4]);
        }
    }

    public void setOnClickListener(OnClickListener onClickListener) {
        this.mOnClickListener = onClickListener;
    }

    public void setOnDoubleClickListener(OnDoubleClickListener onDoubleClickListener) {
        this.mOnDoubleClickListener = onDoubleClickListener;
    }

    public ArrayList<ArrayList<TextView>> getFields() {
        return this.mFields;
    }

    public int getItemCount() {
        return this.mFieldTexts.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public ImageView mFieldBg;
        public ArrayList<TextView> mFields = new ArrayList<>();
        private final View mView;

        public ViewHolder(View itemView) {
            super(itemView);
            this.mView = itemView;
            this.mFieldBg = (ImageView) itemView.findViewById(R.id.sd_dialog_item_bg);
            ConstraintLayout field = itemView.findViewById(R.id.sd_dialog_item_main);
            for (int i = 1; i < field.getChildCount(); i++) {
                this.mFields.add((TextView) field.getChildAt(i));
            }
        }

        public View getView() {
            return this.mView;
        }
    }
}
