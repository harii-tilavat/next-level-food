"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
const ImagePicker = ({ label, name }) => {
  const inputRef = useRef();
  const [pickedImage, setPickedImage] = useState();
  function handlePickImage() {
    inputRef.current.click();
  }
  async function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileUrl = await convertToBase64(file);
    setPickedImage(fileUrl);
  }
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = () => reject("File not loaded!");
      fileReader.readAsDataURL(file);
    });
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && <Image src={pickedImage} alt="Image selected by user" fill />}
        </div>

        <input ref={inputRef} type="file" id={name} accept="image/png, image/jpeg" name={name} className={classes.input} onChange={handleImageChange} required />
        <button className={classes.button} onClick={handlePickImage}>
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
