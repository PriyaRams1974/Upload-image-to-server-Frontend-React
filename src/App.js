import {useState} from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [img, setImg] = useState()
  const [images, setImgs] = useState()
  const [PreviewImg, setPreviewImage] = useState(null)
  const [body, setbodyData1] = useState({
    name:'Priya',
  })

  const [bodyData, setbodyData] = useState({
    name:'Priya',
    age:30
  })


  const singleimg_handleChange=(event)=>{
    console.log("Event:",event)
    setImg(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]))
  }
  
let fileArr = [];
  const multipleimages_handleChange=(event)=>{
    // console.log("Event:",event)
    // console.log("type ",typeof event.target.files);
    console.log("files ",event.target.files);
    console.log("files count ",event.target.files.length);

    // for (let key in event.target.files){
    //   fileArr.push(event.target.files[key]);
    // }
    // Object.keys(event.target.files)
     let keys = Object.keys(event.target.files);
     console.log("keys",keys);
     for (let y = 0; y < keys.length; y++){
      fileArr.push(event.target.files[keys[y]]);
    }
    console.log("fileArr ",fileArr);

    setImgs(fileArr);
    setPreviewImage(URL.createObjectURL(event.target.files[0]))
  }

  const formData = (file,body={})=>{
    const formdata = new FormData();
    for (let i = 0; i< file.length; i++) {
      formdata.append('file',file[i]);
    }
    Object.keys(body).forEach((key)=>{
      console.log("data Keys",key);
      console.log("data values",body[key]);
      formdata.append(key, body[key]);
    })
    
    return formdata;

  }


  const submit = () => {
    const formdata = new FormData();
    formdata.append('file',img);
    Object.keys(body).forEach((key)=>{
      console.log("data Keys",key);
      console.log("data values",body[key]);
      formdata.append(key, body[key]);
    })

    console.log("formdata",formdata);

    axios.post('http://localhost:5001/single_img_upload',formdata,{
      headers:{ "Content-Type":"multipart/form-data"}
    }).then((res) => {
      console.log(res);
    }).catch((err)=>{
      console.log(err)
    })
  }
  const MultipleImages_submit = () => {
    const DataToServer = formData(images,bodyData);
    console.log("bodyData==>",bodyData);
    console.log("DataToServer==>",DataToServer);

    axios.post('http://localhost:5001/multiple_img_upload',DataToServer,{
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
      <input type="file" className="form-control" name="upload_file" onChange={singleimg_handleChange}/>
      {/* <input type="file" className="form-control" name="upload_file" onChange={multipleimages_handleChange} multiple accept='image/jpeg'/> */}
      <input type="file" className="form-control" name="upload_file" onChange={multipleimages_handleChange} multiple />

      <button type="button" onClick={submit}>UPLOAD Image</button>
      
      <button type="button" onClick={MultipleImages_submit}>UPLOAD Images</button>

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
