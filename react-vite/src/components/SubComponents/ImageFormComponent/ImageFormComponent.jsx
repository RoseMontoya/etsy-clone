function ImageFormComponent({image}) {
    const [imageFile, setImageFile] = useState(image.file || "")
    const [imageUrl, setImageUrl] = useState(image.url || "")

    return (
        <>
        <div>
          <label>Image URL:</label>
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            accept="image/*, video/*"
          />

          {imageFile && imageFile.type.match(/image\/\w*/) ? (
            <img
              className="previewImagesize"
              src={imageUrl? imageUrl : URL.createObjectURL(imageFile)}
              alt={imageFile.name}
            />
          ) : null}

            {imageFile && imageFile.type.match(/video\/\w*/) ? (
            <video
              className="previewImagesize"
              src={imageUrl? imageUrl : URL.createObjectURL(imageFile)}
              alt={imageFile.name}
            />
          ) : null}
        </div>
        </>
    )

}
