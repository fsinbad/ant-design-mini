import { useEvent } from 'functional-mini/component';
import { mountComponent } from '../../_util/component';
import { useComponentEvent } from '../../_util/hooks/useComponentEvent';
import { useHandleCustomEvent } from '../../_util/hooks/useHandleCustomEvent';
import { useFormItem } from '../use-form-item';
import { FormImageUploadDefaultProps, FormImageUploadProps } from './props';

const FormImageUpload = (props: FormImageUploadProps) => {
  const { formData, emit } = useFormItem(props);
  const { triggerEvent } = useComponentEvent(props);

  useHandleCustomEvent('onChange', (value) => {
    emit('onChange', value);
    triggerEvent('change', value);
  });

  useEvent(
    'handleUpload',
    (localFile) => {
      if (!props.onUpload) {
        throw new Error('need props onUpload');
      }
      return props.onUpload(localFile);
    },
    {
      handleResult: true,
    }
  );

  useEvent(
    'handleRemove',
    (file) => {
      if (props.onRemove) {
        return props.onRemove(file);
      }
    },
    {
      handleResult: true,
    }
  );

  useHandleCustomEvent('onPreview', (file, e) => {
    triggerEvent('preview', file, e);
  });

  useEvent(
    'handleBeforeUpload',
    (localFileList) => {
      if (props.onBeforeUpload) {
        return props.onBeforeUpload(localFileList);
      }
    },
    {
      handleResult: true,
    }
  );

  useHandleCustomEvent('onChooseImageError', (err, e) => {
    triggerEvent('chooseImageError', err, e);
  });

  return {
    formData,
  };
};

mountComponent(FormImageUpload, FormImageUploadDefaultProps);
