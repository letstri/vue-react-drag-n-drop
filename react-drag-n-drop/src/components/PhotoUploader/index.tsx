import React, { useMemo, useRef, useState } from 'react';
import './style.scss';

function PhotoUploader({ value, onChange }: { value: Array<File>; onChange: (files: Array<File>) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragStarted, setDragStarted] = useState(false);

  const uploadFile = (files: FileList | null) => {
    if (files) {
      onChange([...value, ...Array.from(files)])
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }

    setDragStarted(false);
  };

  const removePhoto = (index: number) => {
    onChange(value.filter((p: File, i: number) => i !== index));
  };

  const getSrc = (photo: File) => URL.createObjectURL(photo);

  const needToUpload = useMemo(() => 3 - value.length, [value]);

  const uploadText = useMemo(() => {
    if (needToUpload > 0) {
      return `Загрузите ${needToUpload} ${needToUpload === 1 ? 'вашу фотографию' : 'ваши фотографии'}`;
    }

    if (needToUpload === 0) {
      return 'Вы загрузили все фотографии';
    }

    return 'Вы загрузили слишком много фотографий';
  }, [needToUpload]);

  return (
    <div className="photo-uploader">
      <div
        className={`photo-uploader__wrapper${isDragStarted ? 'photo-uploader__wrapper--drag' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          className="photo-uploader__input"
          title=""
          multiple
          onChange={(e) => {
            uploadFile(e.currentTarget.files);
          }}
          onDragEnter={() => setDragStarted(true)}
          onDragLeave={() => setDragStarted(false)}
        />
        {isDragStarted ? '' : uploadText}
        {isDragStarted && (
          <img
            className="photo-uploader__icon"
            src={require('../../assets/images/upload.svg')}
            alt="Upload"
          />
        )}
      </div>
      <div className="photo-uploader__photos">
        {value.map((photo, index) => (
          <div
            key={index}
            className="photo-uploader__photo"
          >
            <button
              className="photo-uploader__remove"
              onClick={() => removePhoto(index)}
            />
            <img
              src={getSrc(photo)}
              alt={`Фотография ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoUploader;
