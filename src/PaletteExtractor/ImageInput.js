import './styles/ImageInput.css'
import { FaUpload } from 'react-icons/fa'
import { useImgState } from '../App'
import { useEffect } from 'react'

const ImageInput = () => {
  const [imageUrl, setImageUrl] = useImgState()

  useEffect(() => {
    setImageUrl((prevState) => ({
      imgUrl: prevState.imgUrl,
      active: true,
    }))
  }, [setImageUrl])

  const onImageChange = (e) => {
    console.log(e.target.files)
    if (e.target.files.length === 0) return
    let img = e.target.files[0]
    setImageUrl({ imgUrl: URL.createObjectURL(img), active: true })
  }

  return (
    <div className="imageInputWrapper" data-testid={'image'}>
      {imageUrl ? (
        <div className="imgWrapper">
          <img src={imageUrl.imgUrl} alt="Uploaded file" />{' '}
        </div>
      ) : null}
      <div className="inputWrapper">
        <label htmlFor="fileUpload" className="fileUpload">
          <FaUpload className="icon" />
          Upload file
        </label>
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          onChange={onImageChange}
        />
      </div>
    </div>
  )
}

export default ImageInput
