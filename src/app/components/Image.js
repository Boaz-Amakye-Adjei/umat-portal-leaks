import { useState } from "react";

export default function ProfileImage({ studentNumber, s }) {
  const imgFormats = ["jpg", "png", "jpeg"];
  const baseUrl =
    "https://portal.umat.edu.gh//Content/FileDirectory/Student-Pictures/";

  const [formatIndex, setFormatIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(
    `${baseUrl}${studentNumber}.${imgFormats[0]}`
  );

  const handleImageError = () => {
    if (formatIndex < imgFormats.length - 1) {
      const nextFormat = formatIndex + 1;
      setFormatIndex(nextFormat);
      setImgSrc(`${baseUrl}${studentNumber}.${imgFormats[nextFormat]}`);
    } else {
      setImgSrc("/placeholder.jpg"); // Default image
    }
  };

  return (
    <img
      src={imgSrc}
      alt="Student"
      className="rounded-full bg-gray-300 mb-[8px] object-cover"
      onError={handleImageError}
      style={{ width: s, height: s }}
    />
  );
}
