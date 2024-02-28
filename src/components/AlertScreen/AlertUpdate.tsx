import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setAlertUpdating } from '../../actions/alertActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAlertUpdate } from '../../selectors/alertSelectors';
import { AlertLauncher } from '../AlertLauncher/AlertLauncher';

export const AlertUpdate = React.memo(() => {
  const show = useAppSelector(selectAlertUpdate);

  const dispatch = useDispatch();

  const onPressCancel = useCallback(async () => {
    dispatch(setAlertUpdating(false));
  }, []);

  const onConfirmPressed = useCallback(() => {
    dispatch(setAlertUpdating(false));
  }, []);

  return (
    <AlertLauncher
      show={show}
      title="Внимание"
      useNativeDriver={true}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      message="Доступно новая версия лаунчера. Для комфортной игры на нашем проекте, советуем обновить приложения"
      showConfirmButton={true}
      confirmText="Обновить"
      showCancelButton={true}
      cancelText="Позже"
      onCancelPressed={onConfirmPressed}
      onConfirmPressed={onPressCancel}
    />
  );
});
