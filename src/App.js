import {useState} from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [img, setImg] = useState()
  const [PreviewImg, setPreviewImage] = useState(null)


  const handleChange=(event)=>{
    console.log("Event:",event)
    setImg(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]))
  }


  const submit = () => {
    const formdata = new FormData();
    formdata.append('file',img);
    formdata.append('data', { name: 'Priya' });

    console.log("formdata",formdata);

    axios.post('http://localhost:5001/single_img_upload',formdata,{
      headers:{ "Content-Type":"multipart/form-data"}
    }).then((res) => {
      console.log(res);
    }).catch((err)=>{
      console.log(err)
    })
  }



  return (
    <div className="App">
      <div class="container" >
      <input type="file" className="form-control" name="upload_file" onChange={handleChange}/>
      <button type="button" onClick={submit}>UPLOAD</button>
      {/* {PreviewImg !== null ? */}
      <div>
          <img class="previewimg" src={PreviewImg} alt="UploadImage" />
                {/* : null} */}
                </div>
      </div>
    </div>
  );
}

export default App;
