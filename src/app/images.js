
import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import Resizer from "react-image-file-resizer";
const [products, setProducts] = useState([]);
const [picture, setPicture] = useState();
const [readablePicture, setReadablePicture] = useState("");
const [showImagePreviewModal, setShowImagePreviewModal] = useState(false);
const [currentImagePreviewUrl, setCurrentImagePreviewUrl] = useState("");
const [uploading, setUploading] = useState(false);

const uploadImages = async (e) => {
  const files = e.target.files;

  let allUploadedFiles = updatingProduct
  ? updatingProduct?.images || []
  : product
  ? product?.images || []
  : [];

  if (files) {
    // check if the total combined images exceed 4
    const totalImages = allUploadedFiles?.length + files?.length;
    if (totalImages > 4) {
      toast.error("You can upload maximum 4 images");
      return;
    }

    setUploading(true);
    const uploadPromises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const promise = new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          1280,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            fetch(`${process.env.REACT_APP_API_ENNDPOINT}/admin/upload/image`, {
              method: "POST",
              body: JSON.stringify({ image: uri }),
            })
              .then((response) => response.json())
              .then((data) => {
                allUploadedFiles.unshift(data);
                resolve();
              })
              .catch((err) => {
                console.log("image upload err => ", err);
                resolve();
              });
          },
          "base64"
        );
      });
      uploadPromises.push(promise);
    }

    Promise.all(uploadPromises)
      .then(() => {
        updatingProduct
          ? setUpdatingProduct({
              ...updatingProduct,
              images: allUploadedFiles,
            })
          : setProduct({ ...product, images: allUploadedFiles });
        setUploading(false);
      })
      .catch((err) => {
        console.log("image upload err => ", err);
        setUploading(false);
      });
  }
};

const deleteImage = (public_id) => {
  setUploading(true);
  fetch(`${process.env.API}/admin/upload/image`, {
    method: "PUT",
    body: JSON.stringify({ public_id }),
  })
    .then((response) => response.json())
    .then((data) => {
      const filteredImages = updatingProduct
        ? updatingProduct?.images?.filter(
            (image) => image?.public_id !== public_id
          )
        : product?.images?.filter((image) => image?.public_id !== public_id);

      updatingProduct
        ? setUpdatingProduct({ ...updatingProduct, images: filteredImages })
        : setProduct({ ...product, images: filteredImages });
    })
    .catch((err) => {
      console.log("image delete err => ", err);
    })
    .finally(() => setUploading(false));
};
