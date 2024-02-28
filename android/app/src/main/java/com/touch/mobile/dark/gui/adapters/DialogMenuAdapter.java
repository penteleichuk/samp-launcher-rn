package com.touch.mobile.dark.gui.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.recyclerview.widget.RecyclerView;
import com.touch.mobile.dark.R;
import com.touch.mobile.dark.gui.models.DataDialogMenu;
import java.util.List;

public class DialogMenuAdapter extends RecyclerView.Adapter<DialogMenuAdapter.DialogMenuHolder> {
    private List<DataDialogMenu> lDataDialogMenu;
    private OnUserClickListener onUserClickListener;
    public interface OnUserClickListener {
        void click(DataDialogMenu dataDialogMenu, View view);
    }

    public DialogMenuAdapter(List<DataDialogMenu> list, OnUserClickListener onUserClickListener) {
        this.lDataDialogMenu = list;
        this.onUserClickListener = onUserClickListener;
    }

    @Override
    public DialogMenuHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        return new DialogMenuHolder(LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.menu_item_layout, viewGroup, false));
    }

    public void onBindViewHolder(DialogMenuHolder dialogMenuHolder, int i) {
        DataDialogMenu dataDialogMenu = this.lDataDialogMenu.get(i);
        dialogMenuHolder.nameBlockButton.setText(dataDialogMenu.getNameButton());
        dialogMenuHolder.imageViewBlockButton.setImageResource(dataDialogMenu.getImgDrawableButton());
    }

    @Override
    public int getItemCount() {
        return this.lDataDialogMenu.size();
    }

    public class DialogMenuHolder extends RecyclerView.ViewHolder {
        ImageView bcgFill;
        ImageView imageViewBlockButton;
        TextView nameBlockButton;

        public DialogMenuHolder(View view) {
            super(view);
            this.nameBlockButton = (TextView) view.findViewById(R.id.item_menu_name_button);
            this.imageViewBlockButton = (ImageView) view.findViewById(R.id.item_menu_image);
            this.bcgFill = (ImageView) view.findViewById(R.id.bcg_color_fill);
            view.setOnClickListener(view2 -> DialogMenuAdapter.this.onUserClickListener.click(DialogMenuAdapter.this.lDataDialogMenu.get(DialogMenuHolder.this.getLayoutPosition()), view2));
        }
    }
}
